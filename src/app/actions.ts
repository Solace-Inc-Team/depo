"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db, tenantTransaction } from "@/db";
import { users, tenants, sessions } from "@/db/schema";
import { getUser, pendingTerms, requireUser, requireAdmin, createSession, destroySession, getPendingMfa, completeMfa } from "@/lib/auth";
import { attempt, primeiraVez, isBlocked, recordFailure, clearFailures, BLOCKED_MESSAGE, IP_MAX_FAILURES } from "@/lib/rate-limit";
import { newTotpSecret, verifyTotp } from "@/lib/totp";
import { caminhoSeguro } from "@/lib/caminho";
import { hashPassword, verifyPassword } from "@/lib/password";
import { DomainError } from "@/lib/ctx";
import { formatBRL, parseBRL } from "@/lib/money";
import { clientIp, siteUrl } from "@/lib/request";
import type { ActionState } from "@/components/action-form";
import { createOrder, dispatchOrders, deliverOrder, cancelOrder, refundOrder, newOrderSchema, reportOccurrence, reassignOrder, confirmPix, marcarPixDevolvido } from "@/domain/orders";
import { inscreverAviso, placePortalOrder, portalOrderSchema, portalTenant } from "@/domain/portal";
import { conectarMercadoPago, desconectarMercadoPago, liberarSemPix, pixDoPedido } from "@/domain/pix";
import { cancelarConta, criarConta, pagarConta } from "@/domain/contas";
import { createExpense, expenseSchema, voidExpense } from "@/domain/expenses";
import { openShift, closeShift, addCashEntry, cashEntrySchema, voidCashEntry, resolveDifference, settleTrip } from "@/domain/shifts";
import { receivePurchase, markDamaged, runInventory, saveSupplier, supplierSchema, transferirEstoque } from "@/domain/stock";
import { receivePayment, paymentSchema, voidPayment } from "@/domain/receivables";
import { assinarNoCartao, cancelarCartao, pixAssinatura } from "@/domain/assinatura";
import { avisoSchema, cadastrarEmpresa, cadastroSchema, createTenant, darDias, darDiasSchema, deleteTenant, newTenantSchema, ligarWhatsapp, publicarAviso, resetOwnerAccess, setTenantActive, tirarAviso, whatsappSchema } from "@/domain/platform";
import { dataBR } from "@/lib/plano";
import { resolveError, sendTestAlert } from "@/domain/monitoring";
import { addAddress, addressSchema, removeAddress, saveSettings, settingsSchema, anonymizeCustomer, saveCustomer, customerSchema, saveProduct, productSchema, createUser, userSchema, setUserActive, resetUserPassword, acceptTerms } from "@/domain/registry";
import { TERMS_VERSION } from "@/lib/legal";
import { ativarFilial, criarFilial, mudarDeFilial } from "@/domain/filiais";
import { alterarProgramado, alterarSchema, excluirProgramado, lancarProgramado, pausarProgramado, programar, programarSchema, pularProgramado } from "@/domain/programados";
import { cookies } from "next/headers";
import { conversar, recomecarConversa } from "@/domain/robo";
import { apontarWebhook, conectarWhatsapp, conexaoWhatsapp, desconectarWhatsapp, type ConexaoWhatsapp } from "@/domain/whatsapp-conexao";
import type { Saida } from "@/lib/robo";
import { FILIAL_COOKIE } from "@/lib/auth";
import { todayISO } from "@/lib/period";
import { perguntar } from "@/domain/assistente";

// o Postgres recusa o byte nulo em texto: virava erro 500 em vez de campo vazio
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").replaceAll("\0", "").trim();
const optId = (fd: FormData, k: string) => str(fd, k) || null;
const int = (fd: FormData, k: string) => {
  const n = Number(str(fd, k) || "0");
  if (!Number.isInteger(n)) throw new DomainError("Quantidade inválida.");
  if (Math.abs(n) > 100_000) throw new DomainError("Quantidade muito grande (até 100.000).");
  return n;
};
function money(fd: FormData, k: string, required = true): number | null {
  const v = str(fd, k);
  if (!v) {
    if (required) throw new DomainError("Informe o valor.");
    return null;
  }
  const c = parseBRL(v);
  if (c === null || c < 0) throw new DomainError(`Valor inválido: "${v}". Use o formato 12,50.`);
  // o mesmo teto das despesas: acima disso é engano de digitação (e o banco não guarda, dava erro 500)
  if (c > 10_000_000_00) throw new DomainError("Valor muito alto. Confira o que foi digitado.");
  return c;
}

/**
 * Ações que não têm volta (estorno, apagar dados, mexer no estoque na mão) pedem a senha de novo:
 * um computador esquecido aberto no balcão não basta para fazê-las.
 */
async function confirmPassword(user: { userId: string }, fd: FormData) {
  const key = `senha:${user.userId}`;
  if (await attempt(key)) throw new DomainError(BLOCKED_MESSAGE);
  const [u] = await db.select({ hash: users.passwordHash }).from(users).where(eq(users.id, user.userId));
  if (!u || !(await verifyPassword(str(fd, "confirmPassword"), u.hash))) throw new DomainError("Senha incorreta. A ação não foi feita.");
  await clearFailures(key);
}

// regra sem mensagem própria cairia no texto padrão da biblioteca, em inglês
const zodMessage = (e: z.ZodError) => {
  const m = e.issues[0]?.message;
  return m && !/^(Too |Invalid |Unrecognized |Expected )/i.test(m) ? m : "Dados inválidos. Confira os campos e tente de novo.";
};

async function run(fn: () => Promise<unknown>, paths: string[], ok?: string): Promise<ActionState> {
  try {
    await fn();
  } catch (e) {
    if (e instanceof DomainError) return { error: e.message };
    if (e instanceof z.ZodError) return { error: zodMessage(e) };
    // id mal formado vindo do formulário: o Postgres recusa o uuid
    const code = (e as { cause?: { code?: string } }).cause?.code;
    if (code === "22P02") return { error: "Registro não encontrado. Recarregue a página." };
    // lista de itens que não é JSON: só chega de requisição montada fora da tela
    if (e instanceof SyntaxError) return { error: "Escolha ao menos um produto." };
    throw e;
  }
  paths.forEach((p) => revalidatePath(p, "layout"));
  return { ok };
}

export async function login(fd: FormData): Promise<ActionState> {
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  // por e-mail + IP: errar de propósito em outro lugar não tranca o dono para fora
  const ip = await clientIp();
  const key = `login:${email}:${ip}`;
  const ipKey = `ip:${ip}`;
  if ((await attempt(key)) || (await isBlocked(ipKey, IP_MAX_FAILURES))) return { error: BLOCKED_MESSAGE };
  const [u] = await db
    .select({ user: users, tenantActive: tenants.active })
    .from(users)
    .innerJoin(tenants, eq(tenants.id, users.tenantId))
    .where(eq(users.email, email));
  // sempre confere uma senha (falsa se o e-mail não existe): o tempo de resposta não entrega quem é cliente
  const passwordOk = await verifyPassword(password, u?.user.passwordHash ?? (await dummyHash));
  // decisão do dono: dizer quando o e-mail não tem conta e oferecer o cadastro (o cadastro já revelava quem existe).
  // O limite por e-mail+IP e por IP continua contendo quem testa e-mails em série.
  if (!u || !u.user.active || !passwordOk) {
    await recordFailure(ipKey);
    if (!u)
      return {
        error: `Não encontramos uma conta com ${email}.`,
        // no # e não na busca: o e-mail não vai ao servidor nem fica nos registros de acesso
        acao: { rotulo: "Criar conta com este e-mail", href: `/cadastro#email=${encodeURIComponent(email)}` },
      };
    if (!u.user.active) return { error: "Este acesso foi desativado. Fale com o dono da empresa." };
    return { error: "Senha incorreta." };
  }
  await clearFailures(key);
  if (!u.tenantActive) return { error: "O acesso desta empresa está suspenso. Fale com a Solace." };
  // a tela de antes do login (sessão vencida ou link aberto sem estar logado); sem ela, a tela inicial do papel
  const next = caminhoSeguro(str(fd, "next"));
  if (u.user.totpEnabled) {
    await createSession(u.user.id, true);
    redirect(`/login/codigo${next ? `?next=${encodeURIComponent(next)}` : ""}`);
  }
  await createSession(u.user.id);
  redirect(next ?? homeFor(u.user));
}

/** Pix da mensalidade. Sem requireUser: com o acesso pausado, é justamente aqui que o dono precisa chegar. */
export async function pixAssinaturaAction(): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/login");
  return run(() => pixAssinatura(user), ["/assinatura"]);
}

/** Mensalidade no cartão: cria a assinatura e leva o dono à página do Mercado Pago para pôr o cartão. */
export async function cartaoAssinaturaAction(fd: FormData): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/login");
  const email = z.email().max(200).safeParse(str(fd, "email").toLowerCase());
  if (!email.success) return { error: "Digite um e-mail válido, como nome@empresa.com." };
  let link = "";
  const r = await run(async () => void (link = await assinarNoCartao(user, email.data)), ["/assinatura"]);
  if (r?.error) return r;
  // só segue para o próprio Mercado Pago
  const host = new URL(link).hostname;
  if (!/(^|\.)mercadopago\.com(\.br)?$/.test(host)) return { error: "Não deu para abrir a assinatura agora. Tente de novo em instantes." };
  redirect(link);
}

export async function desligarCartaoAction(): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/login");
  return run(() => cancelarCartao(user), ["/assinatura"], "Cobrança no cartão desligada. Os meses já pagos continuam valendo.");
}

/** Cadastro público: o dono cria a empresa e já entra logado. */
export async function cadastrarAction(fd: FormData): Promise<ActionState> {
  // campo escondido que só robô preenche
  if (str(fd, "site")) return { error: "Não foi possível criar a conta." };
  if (fd.get("agree") !== "on") return { error: "Para criar a conta, marque que leu e aceita os termos." };
  // conta toda tentativa, deu certo ou não: segura quem tenta criar empresas em série
  if (await attempt(`cadastro:${await clientIp()}`, 5)) return { error: "Muitos cadastros daqui. Espere 15 minutos e tente de novo." };
  // a tela já confere; aqui vale para quem enviou sem o JavaScript
  if (String(fd.get("password") ?? "") !== String(fd.get("confirm") ?? "")) return { error: "As duas senhas não são iguais. Digite de novo." };
  let ownerId = "";
  const r = await run(async () => {
    const input = cadastroSchema.parse({ company: str(fd, "company"), ownerName: str(fd, "ownerName"), email: str(fd, "email"), password: String(fd.get("password") ?? ""), vende: str(fd, "vende") });
    ownerId = (await cadastrarEmpresa(input, TERMS_VERSION)).ownerId;
  }, []);
  if (r?.error) return r;
  await createSession(ownerId);
  // o Painel abre com a chegada: a revenda no ar, antes do dia a dia
  redirect("/?chegada=1");
}

// hash de uma senha que ninguém usa, para o login gastar o mesmo tempo quando o e-mail não existe
const dummyHash = hashPassword("senha-inexistente-para-tempo-igual");

const homeFor = (u: { platformAdmin: boolean; role: string }) =>
  u.platformAdmin ? "/admin" : u.role === "entregador" ? "/entregador" : "/";

export async function verifyMfaAction(fd: FormData): Promise<ActionState> {
  const pending = await getPendingMfa();
  if (!pending?.secret) redirect("/login");
  const key = `totp:${pending.userId}`;
  if (await attempt(key)) return { error: BLOCKED_MESSAGE };
  if (!verifyTotp(pending.secret, str(fd, "code"))) return { error: "Código inválido. Confira o app autenticador e tente de novo." };
  await clearFailures(key);
  await completeMfa(pending.sessionId, pending.userId);
  redirect(caminhoSeguro(str(fd, "next")) ?? homeFor(pending));
}

export async function logout() {
  await destroySession();
  redirect("/login");
}

export async function createOrderAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser("dono", "atendente", "caixa");
  let id = "";
  // cliente novo e pedido na mesma transação: se o pedido falhar, o cliente não fica duplicado
  const r = await run(() => tenantTransaction(user, async () => {
    let customerId = optId(fd, "customerId");
    const newName = str(fd, "newCustomerName");
    if (!customerId && newName) {
      // cliente novo para entregar sem endereço: o pedido cairia na fila sem ninguém saber para onde ir
      if (str(fd, "mode") === "entrega" && !str(fd, "newCustomerAddress").trim())
        throw new DomainError("Para entregar, preencha o endereço do cliente novo (ou mude para balcão).");
      const c = await saveCustomer(
        user,
        customerSchema.parse({
          name: newName,
          phone: str(fd, "newCustomerPhone"),
          address: str(fd, "newCustomerAddress"),
          cep: str(fd, "newCustomerAddressCep"),
          reference: str(fd, "newCustomerReference"),
          notes: "",
        }),
      );
      customerId = c.id;
    }
    const order = await createOrder(
      user,
      newOrderSchema.parse({
        mode: str(fd, "mode"),
        customerId,
        items: JSON.parse(str(fd, "items") || "[]"),
        paymentMethod: str(fd, "paymentMethod"),
        cashPartCents: money(fd, "cashPart", false) ?? 0,
        origin: str(fd, "origin") || "telefone",
        addressId: optId(fd, "addressId"),
        discountCents: money(fd, "discount", false) ?? 0,
        discountReason: str(fd, "discountReason"),
        deliveryFeeCents: money(fd, "deliveryFee", false) ?? 0,
        changeForCents: money(fd, "changeFor", false),
        notes: str(fd, "notes"),
        driverId: optId(fd, "driverId"),
      }),
    );
    id = order.id;
  }), ["/"]);
  if (r?.error) return r;
  redirect(`/pedidos/${id}`);
}

export async function dispatchAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const driverId = str(fd, "driverId");
  if (!driverId) return { error: "Escolha o entregador." };
  // vários "orderId" no mesmo formulário: os pedidos marcados na fila saem juntos, numa viagem só
  const ids = fd.getAll("orderId").map(String).filter((v) => z.uuid().safeParse(v).success);
  if (!ids.length) return { error: "Escolha os pedidos que vão sair." };
  // o "Avisar cliente" fica na linha do pedido em Entregas e no próprio pedido, enquanto ele está na rua
  return run(() => dispatchOrders(user, ids, driverId), ["/"], ids.length === 1 ? "Pedido saiu para entrega." : `${ids.length} pedidos saíram para entrega.`);
}

export async function deliverAction(fd: FormData) {
  const user = await requireUser();
  return run(() => deliverOrder(user, str(fd, "orderId")), ["/"], "Entrega confirmada.");
}

export async function partialDeliveryAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  let total = 0;
  const r = await run(
    async () => {
      // campos qty:<id do item> = quantidade que chegou ao cliente
      const delivered: Record<string, number> = {};
      for (const k of fd.keys()) if (k.startsWith("qty:")) delivered[k.slice(4)] = int(fd, k);
      total = await deliverOrder(user, str(fd, "orderId"), { delivered, note: str(fd, "note") });
    },
    ["/"],
  );
  return r?.error ? r : { ok: `Entrega parcial registrada. Novo total: ${formatBRL(total)}.` };
}

export async function occurrenceAction(fd: FormData) {
  const user = await requireUser();
  return run(() => reportOccurrence(user, str(fd, "orderId"), str(fd, "kind"), str(fd, "note")), ["/"], "Ocorrência registrada. O pedido voltou para a fila.");
}

export async function reassignAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const driverId = str(fd, "driverId");
  if (!driverId) return { error: "Escolha o entregador." };
  return run(() => reassignOrder(user, str(fd, "orderId"), driverId), ["/"], "Pedido passado para outro entregador.");
}

export async function confirmPixAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  return run(() => confirmPix(user, str(fd, "orderId")), ["/"], "Pix conferido.");
}

export async function pixDevolvidoAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  return run(() => marcarPixDevolvido(user, str(fd, "orderId")), ["/"], "Devolução registrada.");
}

/** O cliente aceitou ser avisado no celular do andamento deste pedido. Público, então com limite por IP. */
export async function avisoPedidoAction(slug: string, codigo: string, inscricao: unknown): Promise<ActionState> {
  if (await attempt(`aviso:${await clientIp()}`, 10)) return { error: "Muitas tentativas seguidas. Tente de novo em alguns minutos." };
  try {
    await inscreverAviso(slug, codigo, inscricao);
    return { ok: "Avisaremos neste celular." };
  } catch (e) {
    if (e instanceof DomainError) return { error: e.message };
    if (e instanceof z.ZodError) return { error: "Este navegador não aceitou os avisos." };
    throw e;
  }
}

export type PortalResult = { error?: string; number?: number; totalCents?: number; pix?: string | null; pixAutomatico?: boolean; pixNaEntrega?: boolean; acompanhar?: string };

/** Pedido do portal público: sem login, então com limite por IP contra abuso. */
export async function portalOrderAction(slug: string, filial: string, fd: FormData): Promise<PortalResult> {
  const t = await portalTenant(slug, filial);
  if (!t) return { error: "Esta loja não está recebendo pedidos pelo site agora." };
  // campo escondido que só robô preenche
  if (str(fd, "site")) return { error: "Não foi possível enviar o pedido." };
  const key = `portal:${await clientIp()}`;
  // conta antes de gravar: envios simultâneos e tentativas com erro também gastam o limite
  if (await attempt(key, 5)) return { error: "Muitos pedidos seguidos desta rede. Ligue para a loja ou tente em 15 minutos." };
  try {
    const order = await placePortalOrder(
      t.id,
      t.branchId,
      portalOrderSchema.parse({
        name: str(fd, "name"),
        phone: str(fd, "phone"),
        address: str(fd, "address"),
        cep: str(fd, "addressCep"),
        reference: str(fd, "reference"),
        items: JSON.parse(str(fd, "items") || "[]"),
        paymentMethod: str(fd, "paymentMethod"),
        changeForCents: money(fd, "changeFor", false),
        notes: str(fd, "notes"),
      }),
    );
    revalidatePath("/", "layout");
    const pix = order.paymentMethod === "pix" ? await pixDoPedido(t.id, order.id) : null;
    const pixNaEntrega = order.paymentMethod === "pix" && !pix;
    if (pixNaEntrega) await liberarSemPix(t.id, order.id);
    return {
      number: order.number,
      totalCents: order.totalCents,
      pix: pix?.codigo ?? null,
      pixAutomatico: pix?.automatico ?? false,
      pixNaEntrega,
      acompanhar: `/pedir/${slug}/acompanhar/${order.trackingId}`,
    };
  } catch (e) {
    if (e instanceof DomainError) return { error: e.message };
    if (e instanceof z.ZodError) return { error: zodMessage(e) };
    if (e instanceof SyntaxError) return { error: "Escolha ao menos um produto." };
    throw e;
  }
}

export async function addAddressAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    async () =>
      addAddress(user, addressSchema.parse({ customerId: str(fd, "customerId"), label: str(fd, "label"), address: str(fd, "address"), cep: str(fd, "addressCep"), reference: str(fd, "reference") })),
    ["/"],
    "Endereço adicionado.",
  );
}

export async function removeAddressAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(() => removeAddress(user, str(fd, "addressId")), ["/"], "Endereço removido.");
}

export async function saveSettingsAction(fd: FormData) {
  const user = await requireUser("dono");
  const section = str(fd, "section");
  return run(
    async () =>
      saveSettings(
        user,
        settingsSchema.parse(
          section === "regras"
            ? { staffDiscountPct: int(fd, "staffDiscountPct"), lateAfterMinutes: int(fd, "lateAfterMinutes") }
            : section === "pix"
              ? { pixKey: str(fd, "pixKey"), pixName: str(fd, "pixName"), pixCity: str(fd, "pixCity") }
              : section === "empresa"
                ? { name: str(fd, "empresaNome"), phone: str(fd, "phone"), address: str(fd, "address"), cep: str(fd, "addressCep") }
                : section === "portal"
                  ? { portalEnabled: fd.get("portalEnabled") === "on" }
                  : // formulário sem seção não pode cair no portal e desligá-lo
                    (() => { throw new DomainError("Formulário inválido. Recarregue a página."); })(),
        ),
      ),
    ["/"],
    section === "pix" ? "Dados do Pix salvos." : section === "portal" ? "Portal atualizado." : section === "empresa" ? "Dados da empresa salvos." : "Regras salvas.",
  );
}

export async function cancelAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(() => cancelOrder(user, str(fd, "orderId"), str(fd, "reason")), ["/"], "Pedido cancelado.");
}

export async function openShiftAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    async () => openShift(user, str(fd, "driverId"), money(fd, "openingCash", false) ?? 0),
    ["/"],
    "Turno aberto.",
  );
}

export async function cashEntryAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  const kind = str(fd, "kind");
  return run(
    async () =>
      addCashEntry(
        user,
        cashEntrySchema.parse({ shiftId: str(fd, "shiftId"), kind, amountCents: money(fd, "amount"), note: str(fd, "note"), category: str(fd, "category") }),
      ),
    ["/"],
    kind === "saida" ? "Gasto registrado e lançado nas despesas." : "Repasse registrado.",
  );
}

export async function settleTripAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  if (!z.uuid().safeParse(str(fd, "tripId")).success || !z.uuid().safeParse(str(fd, "shiftId")).success) return { error: "Volta não encontrada." };
  return run(() => settleTrip(user, str(fd, "shiftId"), str(fd, "tripId"), money(fd, "counted")!, str(fd, "notes")), ["/"], "Volta acertada.");
}

export async function voidCashEntryAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => voidCashEntry(user, str(fd, "entryId"), str(fd, "reason")), ["/"], "Lançamento estornado.");
}

export async function resolveDifferenceAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => resolveDifference(user, str(fd, "shiftId"), str(fd, "resolution"), str(fd, "notes")), ["/"], "Diferença resolvida.");
}

export async function closeShiftAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  return run(
    async () => closeShift(user, str(fd, "shiftId"), money(fd, "counted")!, str(fd, "notes")),
    ["/"],
    "Acerto registrado.",
  );
}

export async function purchaseAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    async () =>
      receivePurchase(user, {
        productId: str(fd, "productId"),
        full: int(fd, "full"),
        emptiesReturned: int(fd, "empties"),
        note: str(fd, "note"),
        supplierId: optId(fd, "supplierId"),
        costCents: money(fd, "cost", false),
        costMethod: z.enum(["dinheiro", "pix", "cartao", "boleto"]).catch("boleto").parse(str(fd, "costMethod")),
        dueOn: str(fd, "dueOn") || null,
      }),
    ["/"],
    "Entrada registrada.",
  );
}

export async function damagedAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const from = str(fd, "from") === "vazio" ? "vazio" : "cheio";
  return run(
    async () => markDamaged(user, { productId: str(fd, "productId"), from, quantity: int(fd, "quantity"), note: str(fd, "note") }),
    ["/"],
    "Avaria registrada. O item saiu do estoque de venda.",
  );
}

export async function transferirAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    async () =>
      transferirEstoque(user, { productId: str(fd, "productId"), para: str(fd, "para"), cheios: int(fd, "cheios"), vazios: int(fd, "vazios"), note: str(fd, "note") }),
    ["/"],
    "Transferência registrada.",
  );
}

export async function inventoryAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser("dono");
  let changed = 0;
  const r = await run(async () => {
    await confirmPassword(user, fd);
    // campos c:<estado>:<id do produto>; em branco = não contado
    const counts = [...fd.keys()]
      .filter((k) => k.startsWith("c:") && str(fd, k) !== "")
      .map((k) => {
        const [, state, productId] = k.split(":");
        return { productId, state: z.enum(["cheio", "vazio", "avariado"]).parse(state), counted: int(fd, k) };
      });
    changed = (await runInventory(user, counts, str(fd, "note"))).length;
  }, ["/"]);
  if (r?.error) return r;
  return { ok: changed ? `Inventário registrado: ${changed} ${changed === 1 ? "diferença ajustada" : "diferenças ajustadas"}.` : "Inventário registrado: tudo bateu com o sistema." };
}

export async function saveSupplierAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const id = optId(fd, "id") ?? undefined;
  return run(
    async () =>
      saveSupplier(user, supplierSchema.parse({ name: str(fd, "name"), phone: str(fd, "phone"), notes: str(fd, "notes"), active: id ? fd.get("active") === "on" : true }), id),
    ["/"],
    id ? "Fornecedor atualizado." : "Fornecedor cadastrado.",
  );
}

export async function saveCustomerAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const id = optId(fd, "id") ?? undefined;
  // cadastro pela lista de clientes: quem cadastra quase sempre lança o pedido em seguida, então abre a ficha
  let novo: string | undefined;
  const r = await run(
    async () => {
      const c = await saveCustomer(
        user,
        customerSchema.parse({
          name: str(fd, "name"),
          phone: str(fd, "phone"),
          address: str(fd, "address"),
          cep: str(fd, "addressCep"),
          reference: str(fd, "reference"),
          notes: str(fd, "notes"),
        }),
        id,
      );
      novo = c.id;
    },
    ["/"],
    id ? "Cliente atualizado." : "Cliente cadastrado.",
  );
  if (!r?.error && !id && novo && fd.get("depois") === "ficha") redirect(`/clientes/${novo}`);
  return r;
}

export async function anonymizeCustomerAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(
    async () => {
      await confirmPassword(user, fd);
      await anonymizeCustomer(user, str(fd, "customerId"));
    },
    ["/"],
    "Dados pessoais do cliente apagados.",
  );
}

export async function saveProductAction(fd: FormData) {
  const user = await requireUser("dono");
  const id = optId(fd, "id") ?? undefined;
  return run(
    async () =>
      saveProduct(
        user,
        productSchema.parse({
          name: str(fd, "name"),
          priceCents: money(fd, "price"),
          returnable: fd.get("returnable") === "on",
          minStock: int(fd, "minStock"),
          // produto que não retorna não tem vasilhame para cobrar
          containerPriceCents: fd.get("returnable") === "on" ? (money(fd, "containerPrice", false) ?? 0) : 0,
          active: id ? fd.get("active") === "on" : true,
        }),
        id,
      ),
    ["/"],
    id ? "Produto atualizado." : "Produto cadastrado.",
  );
}

export async function createUserAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(
    async () =>
      createUser(
        user,
        userSchema.parse({
          name: str(fd, "name"),
          email: str(fd, "email"),
          password: str(fd, "password"),
          role: str(fd, "role"),
          semAcesso: str(fd, "semAcesso") === "true",
          branchId: optId(fd, "branchId"),
        }),
      ),
    ["/"],
    "Usuário criado.",
  );
}

export async function toggleUserAction(fd: FormData) {
  const user = await requireUser("dono");
  const active = str(fd, "active") === "true";
  return run(() => setUserActive(user, str(fd, "userId"), active), ["/"], active ? "Acesso reativado." : "Acesso desativado.");
}

export async function createTenantAction(fd: FormData) {
  const admin = await requireAdmin();
  return run(
    async () =>
      createTenant(
        admin,
        newTenantSchema.parse({
          company: str(fd, "company"),
          ownerName: str(fd, "ownerName"),
          email: str(fd, "email"),
          password: str(fd, "password"),
        }),
      ),
    ["/admin"],
    "Empresa criada. Passe o e-mail e a senha inicial para o dono.",
  );
}

export async function toggleTenantAction(fd: FormData) {
  const admin = await requireAdmin();
  const active = str(fd, "active") === "true";
  return run(() => setTenantActive(admin, str(fd, "tenantId"), active), ["/admin"], active ? "Empresa reativada." : "Empresa suspensa.");
}

export async function changePasswordAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser({ mesmoBloqueado: true });
  const next = str(fd, "next");
  if (next.length < 8) return { error: "A nova senha precisa de ao menos 8 caracteres." };
  if (next !== str(fd, "confirm")) return { error: "A confirmação não bate com a nova senha." };
  // mesma contagem da senha que confirma ações: computador aberto não vira tentativa sem fim
  const key = `senha:${user.userId}`;
  if (await attempt(key)) return { error: BLOCKED_MESSAGE };
  const [u] = await db.select({ hash: users.passwordHash }).from(users).where(eq(users.id, user.userId));
  if (!u || !(await verifyPassword(str(fd, "current"), u.hash))) return { error: "Senha atual incorreta." };
  await clearFailures(key);
  await db.update(users).set({ passwordHash: await hashPassword(next) }).where(eq(users.id, user.userId));
  // derruba todo aparelho que estava logado com a senha antiga e abre uma sessão nova só para este
  await db.delete(sessions).where(eq(sessions.userId, user.userId));
  await createSession(user.userId);
  return { ok: "Senha alterada. Outros aparelhos foram desconectados." };
}

export async function startTotpAction(): Promise<ActionState> {
  const user = await requireUser({ mesmoBloqueado: true });
  if (user.totpEnabled) return { error: "A verificação em duas etapas já está ativa." };
  await db.update(users).set({ totpSecret: newTotpSecret() }).where(eq(users.id, user.userId));
  revalidatePath("/senha");
}

export async function confirmTotpAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser({ mesmoBloqueado: true });
  const [u] = await db.select({ secret: users.totpSecret }).from(users).where(eq(users.id, user.userId));
  if (!u?.secret) return { error: "Comece a configuração de novo." };
  const key = `totp:${user.userId}`;
  if (await attempt(key)) return { error: BLOCKED_MESSAGE };
  if (!verifyTotp(u.secret, str(fd, "code"))) return { error: "Código inválido. Confira se o relógio do celular está certo." };
  await clearFailures(key);
  await db.update(users).set({ totpEnabled: true }).where(eq(users.id, user.userId));
  // como na troca de senha: aparelho que entrou antes do 2FA sai e entra de novo com o código
  await db.delete(sessions).where(eq(sessions.userId, user.userId));
  await createSession(user.userId);
  revalidatePath("/", "layout");
  return { ok: "Verificação em duas etapas ativada." };
}

export async function disableTotpAction(fd: FormData): Promise<ActionState> {
  const user = await requireUser({ mesmoBloqueado: true });
  const key = `senha:${user.userId}`;
  if (await attempt(key)) return { error: BLOCKED_MESSAGE };
  const [u] = await db.select({ hash: users.passwordHash }).from(users).where(eq(users.id, user.userId));
  if (!u || !(await verifyPassword(str(fd, "password"), u.hash))) return { error: "Senha incorreta." };
  await clearFailures(key);
  await db.update(users).set({ totpEnabled: false, totpSecret: null }).where(eq(users.id, user.userId));
  revalidatePath("/", "layout");
  return { ok: "Verificação em duas etapas desativada." };
}

export async function receivePaymentAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    async () =>
      receivePayment(
        user,
        paymentSchema.parse({ customerId: str(fd, "customerId"), amountCents: money(fd, "amount"), method: str(fd, "method"), note: str(fd, "note") }),
      ),
    ["/"],
    "Pagamento registrado.",
  );
}

export async function refundOrderAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(
    async () => {
      await confirmPassword(user, fd);
      await refundOrder(user, { orderId: str(fd, "orderId"), reason: str(fd, "reason"), restock: fd.get("restock") === "on" });
    },
    ["/"],
    "Pedido estornado.",
  );
}

export async function voidPaymentAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => voidPayment(user, str(fd, "paymentId"), str(fd, "reason")), ["/"], "Pagamento estornado.");
}

export async function createExpenseAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const paidOn = str(fd, "paidOn");
  // data no futuro é aceita (conta agendada), mas avisa para pegar erro de digitação
  const future = paidOn > todayISO();
  return run(
    async () =>
      createExpense(
        user,
        expenseSchema.parse({
          category: str(fd, "category"),
          description: str(fd, "description"),
          amountCents: money(fd, "amount"),
          method: str(fd, "method"),
          paidOn,
        }),
      ),
    ["/"],
    future ? `Despesa lançada com data futura (${paidOn.split("-").reverse().join("/")}). Confira se a data está certa.` : "Despesa lançada.",
  );
}

export async function criarContaAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  return run(
    () =>
      criarConta(user, {
        description: str(fd, "description"),
        category: str(fd, "category") as never,
        supplierId: optId(fd, "supplierId"),
        amountCents: money(fd, "amount") ?? 0,
        dueOn: str(fd, "dueOn"),
      }),
    ["/"],
    "Conta lançada. Vai aparecer no Painel quando estiver para vencer.",
  );
}

export async function pagarContaAction(fd: FormData) {
  const user = await requireUser("dono", "caixa");
  return run(() => pagarConta(user, str(fd, "contaId"), { method: str(fd, "method") as never, paidOn: str(fd, "paidOn") }), ["/"], "Conta paga. Entrou nas despesas.");
}

export async function cancelarContaAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => cancelarConta(user, str(fd, "contaId"), str(fd, "reason")), ["/"], "Conta cancelada.");
}

export async function voidExpenseAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => voidExpense(user, str(fd, "expenseId"), str(fd, "reason")), ["/"], "Despesa cancelada.");
}

export async function resetUserPasswordAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => resetUserPassword(user, str(fd, "userId"), str(fd, "password")), ["/equipe"], "Senha redefinida e verificação em duas etapas desligada. Passe a senha nova para a pessoa.");
}

export async function resetOwnerAccessAction(fd: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  let email = "";
  const r = await run(async () => {
    email = await resetOwnerAccess(admin, str(fd, "tenantId"), str(fd, "password"));
  }, ["/admin"]);
  return r?.error ? r : { ok: `Acesso de ${email} redefinido, com 2FA desligado.` };
}

export async function resolveErrorAction(fd: FormData) {
  const admin = await requireAdmin();
  return run(() => resolveError(admin, str(fd, "errorId")), ["/admin"], "Marcado como resolvido.");
}

export async function testAlertAction(): Promise<ActionState> {
  const admin = await requireAdmin();
  return run(() => sendTestAlert(admin), [], "Alerta de teste enviado. Confira o Telegram.");
}

export async function acceptTermsAction(fd: FormData): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!pendingTerms(user)) redirect("/");
  if (fd.get("agree") !== "on") return { error: "Para continuar, marque que leu e aceita os termos." };
  await acceptTerms(user, TERMS_VERSION);
  redirect("/");
}

export async function deleteTenantAction(fd: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  let total = 0;
  const r = await run(async () => {
    const counts = await deleteTenant(admin, str(fd, "tenantId"), str(fd, "confirmName"));
    total = Object.values(counts).reduce((s, n) => s + n, 0);
  }, ["/admin"]);
  return r?.error ? r : { ok: `Empresa excluída: ${total} registros apagados.` };
}

export async function darDiasAction(fd: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  let feito = { nome: "", ate: "" };
  const r = await run(async () => {
    feito = await darDias(admin, darDiasSchema.parse({ tenantId: str(fd, "tenantId"), dias: str(fd, "dias"), motivo: str(fd, "motivo") }));
  }, ["/admin"]);
  return r?.error ? r : { ok: `${feito.nome} com acesso até ${dataBR(feito.ate)}.` };
}

export async function ligarWhatsappAction(fd: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const numeroId = str(fd, "numeroId").replace(/\s/g, "");
  let nome = "";
  const r = await run(async () => {
    nome = await ligarWhatsapp(admin, whatsappSchema.parse({ tenantId: str(fd, "tenantId"), numeroId }));
  }, ["/admin"]);
  if (r?.error) return r;
  if (!numeroId) return { ok: `Robô de ${nome} desligado do WhatsApp.` };
  // instância da Evolution (nome com letras): o webhook dela passa a ter a chave certa
  if (!/^\d+$/.test(numeroId)) {
    try {
      await apontarWebhook(numeroId, await siteUrl());
    } catch (e) {
      return { error: `Robô de ${nome} ligado, mas o webhook não foi apontado: ${(e as Error).message}` };
    }
  }
  return { ok: `Robô de ${nome} ligado ao WhatsApp.` };
}

// o aviso aparece no topo do sistema de todas as empresas: revalida o layout delas também
export async function publicarAvisoAction(fd: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  return run(() => publicarAviso(admin, avisoSchema.parse({ texto: str(fd, "texto"), ate: str(fd, "ate") })), ["/admin", "/"], "Aviso publicado para todas as empresas.");
}

export async function tirarAvisoAction(): Promise<ActionState> {
  const admin = await requireAdmin();
  return run(() => tirarAviso(admin), ["/admin", "/"], "Aviso tirado.");
}

export async function criarFilialAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => criarFilial(user, { name: str(fd, "name") }), ["/"], "Filial criada.");
}

export async function ativarFilialAction(fd: FormData) {
  const user = await requireUser("dono");
  const active = str(fd, "active") === "true";
  return run(() => ativarFilial(user, str(fd, "branchId"), active), ["/"], active ? "Filial reativada." : "Filial desativada.");
}

export async function mudarDeFilialAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(() => mudarDeFilial(user, str(fd, "userId"), str(fd, "branchId")), ["/"], "Filial alterada.");
}

/** O dono troca a filial que está vendo; a escolha fica no aparelho (cookie), cada um com a sua. */
export async function escolherFilialAction(fd: FormData) {
  const user = await requireUser("dono");
  const id = str(fd, "branchId");
  if (!user.branches.some((b) => b.id === id)) return;
  (await cookies()).set(FILIAL_COOKIE, id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365 });
  revalidatePath("/", "layout");
}

/** O dono liga a conta do Mercado Pago da empresa (com a senha: o token mexe com dinheiro). */
export async function conectarMercadoPagoAction(fd: FormData) {
  const user = await requireUser("dono");
  return run(
    async () => {
      await confirmPassword(user, fd);
      await conectarMercadoPago(user, str(fd, "token"));
    },
    ["/"],
    "Mercado Pago conectado.",
  );
}

export async function desconectarMercadoPagoAction() {
  const user = await requireUser("dono");
  return run(() => desconectarMercadoPago(user), ["/"], "Mercado Pago desconectado.");
}

// ---------- pedidos programados ----------
const diaBR = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

export async function programarAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    () => programar(user, programarSchema.parse({ orderId: str(fd, "orderId"), aCadaDias: Number(str(fd, "aCadaDias")), proxima: str(fd, "proxima") })),
    ["/"],
    str(fd, "proxima") <= todayISO()
      ? "Programado. A entrega já aparece em Entregas hoje."
      : `Programado. A primeira entrega aparece em Entregas no dia ${diaBR(str(fd, "proxima"))}.`,
  );
}

export async function alterarProgramadoAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(
    () => alterarProgramado(user, str(fd, "id"), alterarSchema.parse({ aCadaDias: Number(str(fd, "aCadaDias")), proxima: str(fd, "proxima") })),
    ["/"],
    "Programação alterada.",
  );
}

export async function pausarProgramadoAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  const pausar = str(fd, "pausar") === "1";
  return run(() => pausarProgramado(user, str(fd, "id"), pausar), ["/"], pausar ? "Programação pausada." : "Programação retomada.");
}

export async function excluirProgramadoAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  return run(() => excluirProgramado(user, str(fd, "id")), ["/"], "Programação excluída.");
}

export async function lancarProgramadoAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  let proxima = "";
  const r = await run(async () => ({ proxima } = await lancarProgramado(user, str(fd, "id"))), ["/"]);
  return r?.error ? r : { ok: `Pedido lançado na fila. O próximo fica para ${diaBR(proxima)}.` };
}

export async function pularProgramadoAction(fd: FormData) {
  const user = await requireUser("dono", "atendente", "caixa");
  let proxima = "";
  const r = await run(async () => (proxima = await pularProgramado(user, str(fd, "id"))), ["/"]);
  return r?.error ? r : { ok: `Pulado. O próximo fica para ${diaBR(proxima)}.` };
}

// Tela de teste do robô do WhatsApp: o dono conversa como se fosse o cliente daquele telefone. O pedido é conferido
// de verdade (estoque, preço, total) num savepoint desfeito no fim: não cai em Entregas.
const textoCurto = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

export async function conversarTesteAction(telefone: unknown, entrada: unknown): Promise<{ saidas?: Saida[]; erro?: string }> {
  const user = await requireUser("dono");
  const e = (entrada ?? {}) as Record<string, unknown>;
  try {
    const saidas = await conversar(
      user.tenantId,
      String(telefone ?? ""),
      { texto: textoCurto(e.texto, 500), id: textoCurto(e.id, 100) },
      { base: await siteUrl(), teste: true },
    );
    revalidatePath("/", "layout");
    return { saidas };
  } catch (err) {
    if (err instanceof DomainError) return { erro: err.message };
    // dado que passou pela conversa e o pedido recusou: mensagem em vez de derrubar o simulador
    if (err instanceof z.ZodError) return { erro: err.issues[0]?.message ?? "Não deu para lançar este pedido." };
    throw err;
  }
}

export async function recomecarConversaAction(telefone: unknown) {
  const user = await requireUser("dono");
  return run(() => recomecarConversa(user.tenantId, String(telefone ?? "")), []);
}

// Conexão do WhatsApp da loja ao robô (Configurações > WhatsApp): devolvem o estado para a tela, ou o erro
type RespostaConexao = { conexao?: ConexaoWhatsapp; error?: string };
async function comConexao(fn: () => Promise<ConexaoWhatsapp>): Promise<RespostaConexao> {
  try {
    return { conexao: await fn() };
  } catch (e) {
    if (e instanceof DomainError) return { error: e.message };
    // Evolution fora do ar ou demorando: avisa na linha em vez de derrubar a tela de Configurações
    console.error("[whatsapp-conexao] falhou:", (e as Error).message);
    return { error: "O WhatsApp não respondeu agora. Tente de novo em instantes." };
  }
}

export async function conexaoWhatsappAction(qr: boolean): Promise<RespostaConexao> {
  const user = await requireUser("dono");
  // QR novo no máximo a cada 20 s por empresa (a tela pede a cada 30 s): chamada repetida não martela a Evolution
  const novo = qr && (await primeiraVez(`wa-qr:${user.tenantId}`, 20_000));
  return comConexao(() => conexaoWhatsapp(user, { qr: novo }));
}

export async function conectarWhatsappAction(): Promise<RespostaConexao> {
  const user = await requireUser("dono");
  return comConexao(async () => conectarWhatsapp(user, await siteUrl()));
}

export async function desconectarWhatsappAction(): Promise<RespostaConexao> {
  const user = await requireUser("dono");
  return comConexao(async () => {
    await desconectarWhatsapp(user);
    return { estado: "sem" };
  });
}

export async function perguntarAssistenteAction(pergunta: unknown, historico: unknown): Promise<{ resposta?: string; analise?: boolean; restam?: number; erro?: string }> {
  const user = await requireUser("dono");
  try {
    return await perguntar(user, pergunta, historico);
  } catch (err) {
    if (err instanceof DomainError) return { erro: err.message };
    throw err;
  }
}
