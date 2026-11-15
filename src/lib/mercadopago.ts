// Cliente mínimo da API do Mercado Pago: só o que o Pix do pedido usa. Cada chamada leva o token da
// própria empresa; o dinheiro cai na conta dela. Documentação: https://www.mercadopago.com.br/developers

const API = "https://api.mercadopago.com";

export class ErroMp extends Error {
  constructor(
    message: string,
    readonly tokenInvalido = false,
  ) {
    super(message);
  }
}

// os testes trocam a rede por um Mercado Pago de mentira
let rede: typeof fetch = (...a) => fetch(...a);
export const usarRede = (f: typeof fetch) => void (rede = f);

async function chamar<T>(token: string, caminho: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await rede(API + caminho, {
      ...init,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new ErroMp("O Mercado Pago não respondeu.");
  }
  if (!res.ok) {
    // o motivo vem no corpo; sem ele, "token recusado" escondia casos como "Unauthorized use of live
    // credentials" (conta de teste criando cobrança), em que o token vale e o problema é outro
    const motivo = await res
      .json()
      .then((j: { message?: string }) => j?.message ?? "")
      .catch(() => "");
    if (res.status === 401 || res.status === 403) {
      const tokenRuim = !motivo || /token/i.test(motivo);
      throw new ErroMp(tokenRuim ? "O Mercado Pago recusou o token." : `O Mercado Pago recusou: ${motivo}.`, tokenRuim);
    }
    throw new ErroMp(`O Mercado Pago respondeu ${res.status}${motivo ? `: ${motivo}` : ""}.`);
  }
  return (await res.json()) as T;
}

/** Dono do token: confere que ele vale e diz a qual conta a empresa está ligando. */
export async function contaMp(token: string) {
  const r = await chamar<{ id: number; nickname?: string; email?: string }>(token, "/users/me");
  return { id: String(r.id), nome: r.email || r.nickname || `conta ${r.id}` };
}

export type NovoPix = {
  valorCents: number;
  /** id do pedido: volta na consulta e prova de qual pedido é o pagamento */
  referencia: string;
  emailPagador: string;
  expiraEm: Date;
  /** mesma chave = mesma cobrança: dois cliques não criam dois Pix */
  chave: string;
};

// Pix pela API de Orders (a de Payments foi marcada para sair). O aviso de pagamento não vai na cobrança:
// fica configurado na aplicação do Mercado Pago (evento "Order") e chega em /api/mercadopago.
type Order = {
  id: string;
  status: string;
  external_reference?: string;
  total_amount?: string;
  transactions?: { payments?: { payment_method?: { qr_code?: string } }[] };
};
const pedidoMp = (token: string, id: string) => chamar<Order>(token, `/v1/orders/${encodeURIComponent(id)}`);
const qrDo = (o: Order) => o.transactions?.payments?.[0]?.payment_method?.qr_code;

/** Cria a cobrança Pix e devolve o código copia e cola. */
export async function criarPixMp(token: string, p: NovoPix) {
  const valor = (p.valorCents / 100).toFixed(2);
  // o Mercado Pago só aceita Pix que dura de 30 minutos a 30 dias; quem precisa de menos cancela antes (cancelarPixMp)
  const minutos = Math.min(30 * 24 * 60, Math.max(30, Math.ceil((p.expiraEm.getTime() - Date.now()) / 60_000)));
  let r = await chamar<Order>(token, "/v1/orders", {
    method: "POST",
    headers: { "X-Idempotency-Key": p.chave },
    body: JSON.stringify({
      type: "online",
      processing_mode: "automatic",
      total_amount: valor,
      external_reference: p.referencia,
      payer: { email: p.emailPagador },
      transactions: { payments: [{ amount: valor, payment_method: { id: "pix", type: "bank_transfer" }, expiration_time: `PT${minutos}M` }] },
    }),
  });
  // a criação pode terminar depois da resposta: uma consulta busca o código que faltou
  if (!qrDo(r) && r.id) r = await pedidoMp(token, r.id);
  const codigo = qrDo(r);
  if (!codigo) throw new ErroMp("O Mercado Pago não devolveu o código Pix.");
  return { id: r.id, codigo };
}

/** Situação da cobrança: "processed" é Pix pago. */
export async function pagamentoMp(token: string, id: string) {
  const r = await pedidoMp(token, id);
  return { pago: r.status === "processed", situacao: r.status, referencia: r.external_reference ?? "", valorCents: Math.round(Number(r.total_amount ?? 0) * 100) };
}

/** Cancela uma cobrança que não vale mais (o total mudou ou o prazo acabou). Se já tiver sido paga, o MP recusa. */
export async function cancelarPixMp(token: string, id: string) {
  await chamar(token, `/v1/orders/${encodeURIComponent(id)}/cancel`, { method: "POST" });
}

// OAuth: a Solace tem uma aplicação no Mercado Pago; cada revenda entra na própria conta e autoriza.
// O Mercado Pago devolve um token que vale 180 dias e uma chave de renovação. Docs: "OAuth" em /developers.

/** Aplicação da Solace no Mercado Pago (MP_CLIENT_ID e MP_CLIENT_SECRET); sem ela, só dá para colar o token. */
export function appMp() {
  const clientId = process.env.MP_CLIENT_ID ?? "";
  const clientSecret = process.env.MP_CLIENT_SECRET ?? "";
  const site = process.env.APP_URL ?? "";
  if (!clientId || !clientSecret || !site.startsWith("https://")) return null;
  return { clientId, clientSecret, redirectUri: `${site}/api/mercadopago/retorno` };
}
export type AppMp = NonNullable<ReturnType<typeof appMp>>;

/** Cookie que guarda o `state` entre a ida ao Mercado Pago e o retorno. */
export const COOKIE_MP = "mp_oauth";

/** Página do Mercado Pago onde o dono entra e autoriza; `state` volta no retorno e prova que o pedido é nosso. */
export function urlAutorizacao(app: AppMp, state: string) {
  const q = new URLSearchParams({ client_id: app.clientId, response_type: "code", platform_id: "mp", state, redirect_uri: app.redirectUri });
  return `https://auth.mercadopago.com/authorization?${q}`;
}

export type TokensMp = { accessToken: string; refreshToken: string; expiraEm: Date };

async function oauth(body: Record<string, string>): Promise<TokensMp> {
  let res: Response;
  try {
    res = await rede(`${API}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new ErroMp("O Mercado Pago não respondeu.");
  }
  const j = (await res.json().catch(() => ({}))) as { access_token?: string; refresh_token?: string; expires_in?: number; message?: string };
  if (!res.ok || !j.access_token || !j.refresh_token) throw new ErroMp(`O Mercado Pago recusou a autorização${j.message ? `: ${j.message}` : ""}.`, true);
  return { accessToken: j.access_token, refreshToken: j.refresh_token, expiraEm: new Date(Date.now() + (j.expires_in ?? 15_552_000) * 1000) };
}

/** Troca o código que veio no retorno pelo token da conta do dono. */
export const trocarCodigoMp = (app: AppMp, code: string) =>
  oauth({ grant_type: "authorization_code", client_id: app.clientId, client_secret: app.clientSecret, code, redirect_uri: app.redirectUri });

/** Token novo antes do atual vencer; a chave de renovação também é trocada. */
export const renovarTokenMp = (app: AppMp, refreshToken: string) =>
  oauth({ grant_type: "refresh_token", client_id: app.clientId, client_secret: app.clientSecret, refresh_token: refreshToken });
