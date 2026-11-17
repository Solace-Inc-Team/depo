import { randomUUID } from "node:crypto";
import { and, desc, eq, gt, isNotNull, isNull, sql } from "drizzle-orm";
import { db, tenantTransaction, withTenant } from "@/db";
import { assinaturaPagamentos, auditLog, tenants, users } from "@/db/schema";
import { type Ctx, DomainError, assertRole } from "@/lib/ctx";
import { ErroMp, assinaturaDaCobrancaMp, assinaturaMp, cancelarAssinaturaMp, criarAssinaturaMp, criarPixMp, pagamentoMp } from "@/lib/mercadopago";
import { PLANO } from "@/lib/plano";
import { todayISO } from "@/lib/period";

// Mensalidade do depo, na conta do Mercado Pago da Solace (token em MP_TOKEN_SOLACE). Dois jeitos de pagar:
// um Pix por mês, quando vence, ou o cartão, que o Mercado Pago cobra sozinho todo mês. Cada pagamento soma um mês.

const tokenSolace = () => process.env.MP_TOKEN_SOLACE?.trim() ?? "";
export const cobrancaLigada = () => !!tokenSolace();

const PRAZO_MS = 24 * 60 * 60 * 1000;

/** Pix da mensalidade em aberto, se ainda dá tempo de pagar. */
export function pixEmAberto(tenantId: string) {
  return withTenant(tenantId, async () => {
    const [c] = await db
      .select()
      .from(assinaturaPagamentos)
      .where(
        and(
          eq(assinaturaPagamentos.tenantId, tenantId),
          isNull(assinaturaPagamentos.pagoEm),
          eq(assinaturaPagamentos.valorCents, PLANO.mensalCents),
          gt(assinaturaPagamentos.expiraEm, new Date(Date.now() + 10 * 60_000)),
        ),
      )
      .orderBy(desc(assinaturaPagamentos.createdAt))
      .limit(1);
    return c ?? null;
  });
}

/** Mensalidades pagas, da mais nova para a mais antiga. */
export function pagamentosFeitos(tenantId: string) {
  return withTenant(tenantId, () =>
    db
      .select({ pagoEm: assinaturaPagamentos.pagoEm, valorCents: assinaturaPagamentos.valorCents })
      .from(assinaturaPagamentos)
      .where(and(eq(assinaturaPagamentos.tenantId, tenantId), isNotNull(assinaturaPagamentos.pagoEm)))
      .orderBy(desc(assinaturaPagamentos.pagoEm)),
  );
}

/** Ainda no teste grátis: nenhuma mensalidade paga. */
export async function emTesteGratis(tenantId: string) {
  const [pago] = await withTenant(tenantId, () =>
    db
      .select({ id: assinaturaPagamentos.id })
      .from(assinaturaPagamentos)
      .where(and(eq(assinaturaPagamentos.tenantId, tenantId), isNotNull(assinaturaPagamentos.pagoEm)))
      .limit(1),
  );
  return !pago;
}

// dois cliques ao mesmo tempo esperam o mesmo Pix em vez de criar duas cobranças no Mercado Pago.
// shortcut: trava só dentro deste processo, trocar por lock no banco se o app rodar em mais de uma instância
const gerando = new Map<string, Promise<typeof assinaturaPagamentos.$inferSelect>>();

/** Gera (ou reaproveita) o Pix da mensalidade. Só o dono paga. */
export async function pixAssinatura(ctx: Ctx) {
  assertRole(ctx, "dono");
  const emAndamento = gerando.get(ctx.tenantId);
  if (emAndamento) return emAndamento;
  const p = gerarPix(ctx).finally(() => gerando.delete(ctx.tenantId));
  gerando.set(ctx.tenantId, p);
  return p;
}

async function gerarPix(ctx: Ctx) {
  const token = tokenSolace();
  if (!token) throw new DomainError("A cobrança ainda não está ligada. Fale com a Solace.");
  const aberto = await pixEmAberto(ctx.tenantId);
  if (aberto) return aberto;
  const { nome, email } = await withTenant(ctx.tenantId, async () => {
    const [t] = await db.select({ nome: tenants.name }).from(tenants).where(eq(tenants.id, ctx.tenantId));
    const [u] = await db.select({ email: users.email }).from(users).where(eq(users.id, ctx.userId));
    return { nome: t.nome, email: u.email };
  });
  // o id nasce aqui: vai como referência e como chave, então dois cliques não criam duas cobranças
  const id = randomUUID();
  const expiraEm = new Date(Date.now() + PRAZO_MS);
  let novo: { id: string; codigo: string };
  try {
    novo = await criarPixMp(token, {
      valorCents: PLANO.mensalCents,
      referencia: `assinatura:${id}`,
      emailPagador: email,
      expiraEm,
      chave: id,
    });
  } catch (e) {
    console.error(`[assinatura] Pix de ${ctx.tenantId} falhou:`, (e as Error).message);
    throw new DomainError(e instanceof ErroMp && e.tokenInvalido ? "A cobrança está fora do ar. Fale com a Solace." : "Não deu para gerar o Pix agora. Tente de novo em instantes.");
  }
  return withTenant(ctx.tenantId, async () => {
    const [c] = await db
      .insert(assinaturaPagamentos)
      .values({ id, tenantId: ctx.tenantId, mpPaymentId: novo.id, codigo: novo.codigo, valorCents: PLANO.mensalCents, expiraEm })
      .returning();
    return c;
  });
}

/**
 * Pergunta ao Mercado Pago pelos Pix da mensalidade ainda não pagos. Cada um pago (desta cobrança e deste
 * valor) vira mais um mês, contado do fim do período atual ou de hoje, o que vier depois. Devolve true se
 * algum caiu agora.
 */
export async function conferirAssinatura(tenantId: string): Promise<boolean> {
  const token = tokenSolace();
  if (!token) return false;
  const abertos = await withTenant(tenantId, () =>
    db
      .select()
      .from(assinaturaPagamentos)
      .where(
        and(
          eq(assinaturaPagamentos.tenantId, tenantId),
          isNull(assinaturaPagamentos.pagoEm),
          // vencida há mais de um dia não tem como ter sido paga agora
          gt(assinaturaPagamentos.expiraEm, new Date(Date.now() - PRAZO_MS)),
        ),
      ),
  );
  let caiu = false;
  for (const c of abertos) {
    let p: Awaited<ReturnType<typeof pagamentoMp>>;
    try {
      p = await pagamentoMp(token, c.mpPaymentId);
    } catch (e) {
      console.error(`[assinatura] consulta de ${tenantId} falhou:`, (e as Error).message);
      continue;
    }
    if (!p.pago || p.referencia !== `assinatura:${c.id}` || p.valorCents !== c.valorCents) continue;
    const hoje = todayISO();
    const ok = await tenantTransaction({ tenantId }, async (tx) => {
      // só um aviso marca: a consulta da tela e o webhook podem chegar juntos
      const [marcado] = await tx
        .update(assinaturaPagamentos)
        .set({ pagoEm: new Date() })
        .where(and(eq(assinaturaPagamentos.id, c.id), isNull(assinaturaPagamentos.pagoEm)))
        .returning({ id: assinaturaPagamentos.id });
      if (!marcado) return false;
      await tx
        .update(tenants)
        .set({ pagoAte: sql`(greatest(coalesce(${tenants.pagoAte}, ${hoje}::date), ${hoje}::date) + interval '1 month')::date` })
        .where(eq(tenants.id, tenantId));
      await tx.insert(auditLog).values({ tenantId, userId: null, action: "assinatura.pago", entity: "tenant", entityId: tenantId, data: { pagamento: c.mpPaymentId, valor: c.valorCents } });
      return true;
    });
    caiu ||= ok;
  }
  return caiu;
}

// ---- Cartão: assinatura do Mercado Pago que cobra sozinha todo mês ----

const referenciaCartao = (tenantId: string) => `assinatura-cartao:${tenantId}`;

/**
 * Situação da assinatura no cartão da empresa (null: não tem). Cada cobrança nova que o Mercado Pago fez desde a
 * última conferência vira um mês a mais, contado do fim do período atual ou de hoje, o que vier depois.
 * `caiu`: algum mês entrou agora.
 */
export async function conferirCartao(tenantId: string) {
  const token = tokenSolace();
  if (!token) return null;
  const [t] = await withTenant(tenantId, () =>
    db.select({ id: tenants.mpAssinaturaId, cobradas: tenants.mpAssinaturaCobradas }).from(tenants).where(eq(tenants.id, tenantId)),
  );
  if (!t?.id) return null;
  let a: Awaited<ReturnType<typeof assinaturaMp>>;
  try {
    a = await assinaturaMp(token, t.id);
  } catch (e) {
    console.error(`[assinatura] consulta do cartão de ${tenantId} falhou:`, (e as Error).message);
    return null;
  }
  // só vale a assinatura criada para esta empresa, com o valor do plano
  if (a.referencia !== referenciaCartao(tenantId) || a.valorCents !== PLANO.mensalCents) return null;
  const novas = a.cobradas - t.cobradas;
  let caiu = false;
  if (novas > 0) {
    const hoje = todayISO();
    caiu = await tenantTransaction({ tenantId }, async (tx) => {
      // só uma conferência conta as cobranças: a tela e o aviso do Mercado Pago podem chegar juntos
      const [marcado] = await tx
        .update(tenants)
        .set({
          mpAssinaturaCobradas: a.cobradas,
          pagoAte: sql`(greatest(coalesce(${tenants.pagoAte}, ${hoje}::date), ${hoje}::date) + make_interval(months => ${novas}::int))::date`,
        })
        .where(and(eq(tenants.id, tenantId), eq(tenants.mpAssinaturaId, a.id), eq(tenants.mpAssinaturaCobradas, t.cobradas)))
        .returning({ id: tenants.id });
      if (!marcado) return false;
      const agora = new Date();
      // entra na lista de pagamentos da tela, como o Pix
      await tx.insert(assinaturaPagamentos).values(
        Array.from({ length: novas }, (_, i) => ({ tenantId, mpPaymentId: `${a.id}:${t.cobradas + i + 1}`, codigo: "cartao", valorCents: a.valorCents, expiraEm: agora, pagoEm: agora })),
      );
      await tx.insert(auditLog).values({ tenantId, userId: null, action: "assinatura.pago", entity: "tenant", entityId: tenantId, data: { assinatura: a.id, cobrancas: novas, valor: a.valorCents } });
      return true;
    });
  }
  return { situacao: a.situacao, link: a.link, caiu };
}

/** Cria a assinatura no cartão e devolve o link do Mercado Pago onde o dono põe o cartão. Só o dono. */
export async function assinarNoCartao(ctx: Ctx, email: string) {
  assertRole(ctx, "dono");
  const token = tokenSolace();
  const site = process.env.APP_URL ?? "";
  if (!token || !site.startsWith("https://")) throw new DomainError("A cobrança no cartão ainda não está ligada. Fale com a Solace.");
  const [t] = await withTenant(ctx.tenantId, () =>
    db.select({ nome: tenants.name, id: tenants.mpAssinaturaId }).from(tenants).where(eq(tenants.id, ctx.tenantId)),
  );
  const atual = await conferirCartao(ctx.tenantId);
  if (atual?.situacao === "authorized") throw new DomainError("A cobrança no cartão já está ligada.");
  // a que ficou pela metade sai antes de nascer outra: nunca duas cobrando a mesma empresa
  if (t.id && atual?.situacao !== "cancelled") await cancelarAssinaturaMp(token, t.id).catch(() => {});
  let nova: Awaited<ReturnType<typeof criarAssinaturaMp>>;
  try {
    nova = await criarAssinaturaMp(token, {
      valorCents: PLANO.mensalCents,
      referencia: referenciaCartao(ctx.tenantId),
      emailPagador: email,
      motivo: `depo: mensalidade de ${t.nome}`.slice(0, 120),
      voltaPara: `${site}/assinatura`,
      chave: randomUUID(),
    });
  } catch (e) {
    console.error(`[assinatura] cartão de ${ctx.tenantId} falhou:`, (e as Error).message);
    throw new DomainError(e instanceof ErroMp && e.tokenInvalido ? "A cobrança está fora do ar. Fale com a Solace." : "Não deu para abrir a assinatura agora. Confira o e-mail e tente de novo.");
  }
  await tenantTransaction(ctx, async (tx) => {
    await tx.update(tenants).set({ mpAssinaturaId: nova.id, mpAssinaturaCobradas: 0 }).where(eq(tenants.id, ctx.tenantId));
    await tx.insert(auditLog).values({ tenantId: ctx.tenantId, userId: ctx.userId, action: "assinatura.cartao", entity: "tenant", entityId: ctx.tenantId, data: { assinatura: nova.id } });
  });
  return nova.link!;
}

/** Desliga a cobrança no cartão. Os meses já pagos continuam valendo. Só o dono. */
export async function cancelarCartao(ctx: Ctx) {
  assertRole(ctx, "dono");
  const token = tokenSolace();
  const [t] = await withTenant(ctx.tenantId, () => db.select({ id: tenants.mpAssinaturaId }).from(tenants).where(eq(tenants.id, ctx.tenantId)));
  if (!token || !t?.id) return;
  try {
    await cancelarAssinaturaMp(token, t.id);
  } catch (e) {
    console.error(`[assinatura] cancelar cartão de ${ctx.tenantId} falhou:`, (e as Error).message);
    throw new DomainError("Não deu para desligar agora. Tente de novo em instantes.");
  }
  await tenantTransaction(ctx, async (tx) => {
    await tx.update(tenants).set({ mpAssinaturaId: null }).where(eq(tenants.id, ctx.tenantId));
    await tx.insert(auditLog).values({ tenantId: ctx.tenantId, userId: ctx.userId, action: "assinatura.cartao_desligado", entity: "tenant", entityId: ctx.tenantId, data: { assinatura: t.id } });
  });
}

/** Aviso do Mercado Pago sobre a assinatura (ou sobre uma cobrança dela): acha a empresa e confere. */
export async function avisoDoCartao(tipo: string, id: string) {
  const token = tokenSolace();
  if (!token) return;
  let assinatura: string | null = null;
  if (tipo === "subscription_preapproval" && /^[0-9a-f]{20,40}$/i.test(id)) assinatura = id;
  else if (tipo === "subscription_authorized_payment" && /^\d{1,20}$/.test(id)) assinatura = await assinaturaDaCobrancaMp(token, id).catch(() => null);
  if (!assinatura) return;
  const [t] = await db.select({ id: tenants.id }).from(tenants).where(eq(tenants.mpAssinaturaId, assinatura));
  if (t) await conferirCartao(t.id);
}
