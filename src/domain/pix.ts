import { and, eq, isNotNull, isNull, lt, sql } from "drizzle-orm";
import { db, tenantTransaction, withTenant } from "@/db";
import { auditLog, orders, tenants } from "@/db/schema";
import { type Ctx, DomainError, assertRole, isUuid } from "@/lib/ctx";
import { cifrar, decifrar } from "@/lib/segredo";
import { ErroMp, type TokensMp, appMp, cancelarPixMp, contaMp, criarPixMp, pagamentoMp, renovarTokenMp } from "@/lib/mercadopago";
import { pixPayload } from "@/lib/pix";
import { audit } from "./stock";
import { liberaParaFila } from "./orders";
import { avisarCliente } from "./aviso";

// Pix do pedido. Com a conta do Mercado Pago ligada, cada pedido no Pix vira uma cobrança própria, com o
// valor certo, e o pedido fica pago sozinho quando o Mercado Pago confirma. Sem ela (ou se o Mercado Pago
// falhar), vale o Pix na chave da empresa, conferido à mão no extrato, como sempre foi.

const PRAZO_MS = 24 * 60 * 60 * 1000;
/** Pedido do site no Pix: o cliente tem 15 minutos para pagar; depois a cobrança vence e o pedido é cancelado. */
export const PRAZO_PAGAR_MS = 15 * 60 * 1000;
// folga antes de cancelar: um Pix pago no último minuto ainda pode estar sendo processado
const FOLGA_MS = 2 * 60 * 1000;
// a cobrança no Mercado Pago vale no mínimo 30 minutos (lib/mercadopago.ts), mesmo com o prazo do pedido sendo 15
const COBRANCA_MIN_MS = 30 * 60 * 1000;

/** Código Pix na chave da empresa (sem confirmação automática). */
export function orderPix(t: { pixKey: string; pixName: string; pixCity: string }, order: { number: number; totalCents: number }) {
  if (!t.pixKey) return null;
  return pixPayload({ key: t.pixKey, name: t.pixName, city: t.pixCity, amountCents: order.totalCents, txid: `PED${order.number}` });
}

export async function conectarMercadoPago(ctx: Ctx, token: string) {
  assertRole(ctx, "dono");
  const t = token.trim();
  if (!/^(APP_USR|TEST)-[\w-]{20,}$/.test(t)) throw new DomainError("Cole o Access Token inteiro (começa com APP_USR- ou TEST-).");
  return ligarConta(ctx, { accessToken: t, refreshToken: null, expiraEm: null }, "token");
}

/** Pelo botão "Conectar com Mercado Pago": o dono autorizou na conta dele e o retorno trouxe os tokens. */
export async function conectarMercadoPagoOAuth(ctx: Ctx, tokens: TokensMp) {
  assertRole(ctx, "dono");
  return ligarConta(ctx, tokens, "oauth");
}

type Ligacao = { accessToken: string; refreshToken: string | null; expiraEm: Date | null };

async function ligarConta(ctx: Ctx, l: Ligacao, como: "token" | "oauth") {
  let conta: { nome: string };
  try {
    conta = await contaMp(l.accessToken);
  } catch (e) {
    if (e instanceof ErroMp) throw new DomainError(e.tokenInvalido ? "O Mercado Pago não aceitou este token. Confira se copiou o Access Token certo." : `${e.message} Tente de novo em instantes.`);
    throw e;
  }
  await tenantTransaction(ctx, async (tx) => {
    await tx
      .update(tenants)
      .set({ mpTokenEnc: cifrar(l.accessToken), mpRefreshEnc: l.refreshToken ? cifrar(l.refreshToken) : null, mpExpiraEm: l.expiraEm, mpConta: conta.nome })
      .where(eq(tenants.id, ctx.tenantId));
    await audit(tx, ctx, "empresa.mp_conectar", "tenant", ctx.tenantId, { conta: conta.nome, como, teste: l.accessToken.startsWith("TEST-") || undefined });
  });
  return conta;
}

// renova quando faltam menos de 30 dias; o token do OAuth vale 180
const RENOVAR_ANTES_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Token da empresa para chamar o Mercado Pago, renovado se estiver perto de vencer.
 * shortcut: só renova quando o Pix é usado; loja que passar 150 dias sem Pix no Mercado Pago precisa conectar de
 * novo. Trocar por uma tarefa diária se isso acontecer.
 */
export async function tokenMp(tenantId: string, t: { mpTokenEnc: string; mpRefreshEnc: string | null; mpExpiraEm: Date | null }) {
  const atual = decifrar(t.mpTokenEnc);
  const app = appMp();
  if (!app || !t.mpRefreshEnc || !t.mpExpiraEm || t.mpExpiraEm.getTime() - Date.now() > RENOVAR_ANTES_MS) return atual;
  try {
    const novo = await renovarTokenMp(app, decifrar(t.mpRefreshEnc));
    await withTenant(tenantId, () =>
      db
        .update(tenants)
        .set({ mpTokenEnc: cifrar(novo.accessToken), mpRefreshEnc: cifrar(novo.refreshToken), mpExpiraEm: novo.expiraEm })
        .where(eq(tenants.id, tenantId)),
    );
    return novo.accessToken;
  } catch (e) {
    // o token atual ainda vale até vencer; a próxima chamada tenta renovar de novo
    console.error(`[pix] renovação do token do Mercado Pago da empresa ${tenantId} falhou:`, (e as Error).message);
    return atual;
  }
}

export async function desconectarMercadoPago(ctx: Ctx) {
  assertRole(ctx, "dono");
  await tenantTransaction(ctx, async (tx) => {
    await tx.update(tenants).set({ mpTokenEnc: null, mpRefreshEnc: null, mpExpiraEm: null, mpConta: null }).where(eq(tenants.id, ctx.tenantId));
    await audit(tx, ctx, "empresa.mp_desconectar", "tenant", ctx.tenantId);
  });
}

// lido dentro do escopo da empresa; as chamadas ao Mercado Pago ficam fora da transação, para não segurar o banco
const lerPedido = (tenantId: string, orderId: string) =>
  withTenant(tenantId, async () => {
    const [t] = await db
      .select({ name: tenants.name, slug: tenants.slug, pixKey: tenants.pixKey, pixName: tenants.pixName, pixCity: tenants.pixCity, mpTokenEnc: tenants.mpTokenEnc, mpRefreshEnc: tenants.mpRefreshEnc, mpExpiraEm: tenants.mpExpiraEm })
      .from(tenants)
      .where(eq(tenants.id, tenantId));
    const [o] = await db
      .select({
        number: orders.number,
        status: orders.status,
        createdAt: orders.createdAt,
        paymentMethod: orders.paymentMethod,
        totalCents: orders.totalCents,
        cashPartCents: orders.cashPartCents,
        pixConfirmedAt: orders.pixConfirmedAt,
        mpPaymentId: orders.mpPaymentId,
        mpPixCode: orders.mpPixCode,
        mpAmountCents: orders.mpAmountCents,
        mpExpiresAt: orders.mpExpiresAt,
      })
      .from(orders)
      .where(and(eq(orders.tenantId, tenantId), eq(orders.id, orderId)));
    return t && o ? { t, o } : null;
  });

/**
 * Código Pix para o cliente pagar este pedido, ou null se não há Pix a pagar. `automatico` diz se a
 * confirmação vem sozinha (Mercado Pago) ou se alguém precisa conferir no extrato.
 */
export async function pixDoPedido(tenantId: string, orderId: string): Promise<{ codigo: string; automatico: boolean } | null> {
  if (!isUuid(orderId)) return null;
  const lido = await lerPedido(tenantId, orderId);
  if (!lido) return null;
  const { t, o } = lido;
  if (o.paymentMethod !== "pix" || o.pixConfirmedAt || !["aguardando_pagamento", "aberto", "em_rota", "entregue"].includes(o.status)) return null;
  // pedido do site esperando o Pix: a cobrança vence no fim dos 15 minutos, e depois disso não há o que pagar
  const limite = o.status === "aguardando_pagamento" ? o.createdAt.getTime() + PRAZO_PAGAR_MS : null;
  if (limite && limite <= Date.now()) return null;
  const valor = o.totalCents - o.cashPartCents;
  const naChave = orderPix(t, { number: o.number, totalCents: valor });
  const semMp = naChave ? { codigo: naChave, automatico: false } : null;
  if (!t.mpTokenEnc) return semMp;

  // a cobrança que já existe serve enquanto o valor é o mesmo e falta tempo para vencer
  if (o.mpPixCode && o.mpAmountCents === valor && o.mpExpiresAt && o.mpExpiresAt.getTime() > Date.now() + (limite ? 60_000 : 10 * 60_000))
    return { codigo: o.mpPixCode, automatico: true };

  try {
    const token = await tokenMp(tenantId, { ...t, mpTokenEnc: t.mpTokenEnc });
    // o total mudou (entrega parcial): a cobrança antiga não pode mais ser paga
    if (o.mpPaymentId && o.mpAmountCents !== valor) await cancelarPixMp(token, o.mpPaymentId).catch(() => {});
    const expiraEm = new Date(limite ?? Date.now() + PRAZO_MS);
    const novo = await criarPixMp(token, {
      valorCents: valor,
      referencia: orderId,
      // shortcut: o Mercado Pago exige um e-mail do pagador e o pedido não tem; vai um endereço do pedido. Conferir no sandbox.
      emailPagador: `pedido${o.number}@${t.slug}.pedidos.com.br`,
      expiraEm,
      // mesmo pedido, mesmo valor, mesmo dia = mesma cobrança, mesmo com duas telas pedindo ao mesmo tempo
      chave: `${orderId}:${valor}:${Math.floor(Date.now() / PRAZO_MS)}`,
    });
    await withTenant(tenantId, () =>
      db
        .update(orders)
        .set({ mpPaymentId: novo.id, mpPixCode: novo.codigo, mpAmountCents: valor, mpExpiresAt: expiraEm })
        .where(and(eq(orders.id, orderId), isNull(orders.pixConfirmedAt))),
    );
    return { codigo: novo.codigo, automatico: true };
  } catch (e) {
    // Mercado Pago fora ou token revogado: o pedido não fica sem Pix, vai o da chave
    console.error(`[pix] cobrança do pedido ${orderId} no Mercado Pago falhou:`, (e as Error).message);
    return semMp;
  }
}

/**
 * Pergunta ao Mercado Pago se o Pix do pedido foi pago e, se foi, marca o pedido como pago. Só aceita o
 * pagamento que é deste pedido e deste valor. Devolve true se o pedido está pago.
 */
export async function conferirPixMp(tenantId: string, orderId: string): Promise<boolean> {
  if (!isUuid(orderId)) return false;
  const lido = await lerPedido(tenantId, orderId);
  if (!lido) return false;
  const { t, o } = lido;
  if (o.pixConfirmedAt) return true;
  if (!t.mpTokenEnc || !o.mpPaymentId || o.paymentMethod !== "pix") return false;
  let p: Awaited<ReturnType<typeof pagamentoMp>>;
  try {
    p = await pagamentoMp(await tokenMp(tenantId, { ...t, mpTokenEnc: t.mpTokenEnc }), o.mpPaymentId);
  } catch (e) {
    console.error(`[pix] consulta do pedido ${orderId} no Mercado Pago falhou:`, (e as Error).message);
    return false;
  }
  if (!p.pago || p.referencia !== orderId || p.valorCents !== o.mpAmountCents) return false;
  const liberado = await tenantTransaction({ tenantId }, async (tx) => {
    const [ok] = await tx
      .update(orders)
      .set({
        pixConfirmedAt: new Date(),
        pixConfirmedBy: null,
        status: liberaParaFila,
        // pago depois de cancelado (o Mercado Pago estava fora quando o prazo venceu): o valor volta ao cliente
        pixDevolverCents: sql`case when ${orders.status} = 'cancelado' then ${p.valorCents} else 0 end`,
      })
      .where(and(eq(orders.id, orderId), eq(orders.mpPaymentId, o.mpPaymentId!), isNull(orders.pixConfirmedAt)))
      .returning({ id: orders.id, devolver: orders.pixDevolverCents });
    // sem pessoa: quem confirmou foi o Mercado Pago
    if (ok) await tx.insert(auditLog).values({ tenantId, userId: null, action: "pedido.pix_mercadopago", entity: "order", entityId: orderId, data: { pagamento: o.mpPaymentId, valor: p.valorCents, ...(ok.devolver ? { pixDevolver: ok.devolver } : {}) } });
    return !!ok;
  });
  // o pedido que esperava o Pix foi para a fila: o cliente fica sabendo
  if (liberado && o.status === "aguardando_pagamento") void avisarCliente(tenantId, orderId, "pago");
  return true;
}

/**
 * Pedidos do site que passaram do prazo sem o Pix cair: antes de cancelar, pergunta uma última vez ao Mercado
 * Pago (o pagamento pode ter caído agora). Só vale para cobrança do Mercado Pago; na chave Pix comum quem
 * confere é a loja, que pode ter recebido e ainda não olhado o extrato. Roda quando a loja ou o cliente abre
 * a fila, o painel, os pedidos ou o acompanhamento: sem tarefa agendada, e nada fica preso por muito tempo.
 */
/** Cancela no Mercado Pago a cobrança do pedido. Devolve false se não deu (já paga, ou o Mercado Pago fora). */
async function cancelarCobranca(tenantId: string, orderId: string) {
  const lido = await lerPedido(tenantId, orderId);
  if (!lido?.t.mpTokenEnc || !lido.o.mpPaymentId) return true;
  try {
    await cancelarPixMp(await tokenMp(tenantId, { ...lido.t, mpTokenEnc: lido.t.mpTokenEnc }), lido.o.mpPaymentId);
    return true;
  } catch (e) {
    console.error(`[pix] cancelar a cobrança do pedido ${orderId} falhou:`, (e as Error).message);
    return false;
  }
}

/**
 * Pedido do site no Pix sem como gerar o código (Mercado Pago fora e sem chave Pix): em vez de esperar um pagamento
 * que o cliente não tem como fazer, entra na fila e o Pix é pago na entrega.
 */
export const liberarSemPix = (tenantId: string, orderId: string) =>
  withTenant(tenantId, () =>
    db
      .update(orders)
      .set({ status: "aberto" })
      .where(and(eq(orders.tenantId, tenantId), eq(orders.id, orderId), eq(orders.status, "aguardando_pagamento"))),
  );

export async function cancelarPixVencidos(tenantId: string) {
  const vencidos = await withTenant(tenantId, () =>
    db
      .select({ id: orders.id, number: orders.number, createdAt: orders.createdAt })
      .from(orders)
      .where(
        and(
          eq(orders.tenantId, tenantId),
          eq(orders.status, "aguardando_pagamento"),
          isNotNull(orders.mpPaymentId),
          lt(orders.createdAt, new Date(Date.now() - PRAZO_PAGAR_MS - FOLGA_MS)),
        ),
      ),
  );
  for (const v of vencidos) {
    if (await conferirPixMp(tenantId, v.id)) continue;
    // a cobrança no Mercado Pago dura no mínimo 30 minutos: cancela lá para ninguém pagar um pedido cancelado.
    // Se o cancelamento falhar porque o Pix caiu agora, a conferência de novo pega.
    if (!(await cancelarCobranca(tenantId, v.id))) {
      if (await conferirPixMp(tenantId, v.id)) continue;
      // Mercado Pago fora: a cobrança ainda pode ser paga até vencer lá (no mínimo 30 minutos depois de criada).
      // Cancelar antes disso arrisca um pedido cancelado com Pix pago; espera a cobrança vencer e tenta de novo.
      if (v.createdAt.getTime() > Date.now() - COBRANCA_MIN_MS - FOLGA_MS) continue;
    }
    const cancelou = await tenantTransaction({ tenantId }, async (tx) => {
      const [ok] = await tx
        .update(orders)
        .set({ status: "cancelado", cancelReason: "Pix não pago em 15 minutos" })
        .where(and(eq(orders.id, v.id), eq(orders.status, "aguardando_pagamento"), isNull(orders.pixConfirmedAt)))
        .returning({ id: orders.id });
      // sem pessoa: quem cancelou foi o prazo
      if (ok) await tx.insert(auditLog).values({ tenantId, userId: null, action: "pedido.pix_vencido", entity: "order", entityId: v.id, data: { number: v.number } });
      return !!ok;
    });
    // duas telas podem conferir o mesmo pedido ao mesmo tempo: só quem cancelou de fato avisa o cliente
    if (cancelou) void avisarCliente(tenantId, v.id, "cancelado");
  }
}
