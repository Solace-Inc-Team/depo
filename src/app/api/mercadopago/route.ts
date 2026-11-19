import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assinaturaPagamentos, orders } from "@/db/schema";
import { conferirPixMp } from "@/domain/pix";
import { avisoDoCartao, conferirAssinatura } from "@/domain/assinatura";
import { assinaturaDoAvisoOk } from "@/lib/aviso-mp";
import { attempt } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

// avisos de cobrança do cartão por IP a cada 15 minutos: cada um custa uma consulta ao Mercado Pago com o token da Solace
const MAX_AVISOS_CARTAO = 120;

// Aviso do Mercado Pago de que uma cobrança (order) mudou, configurado na aplicação "depo app" (evento
// "Order"). O aviso é só um toque: nada do que vem nele é aceito como verdade. O id precisa ser de uma
// cobrança nossa, e quem diz se foi pago é a consulta feita ao Mercado Pago com o token da própria empresa.
export async function POST(req: Request) {
  const url = new URL(req.url);
  const corpo = (await req.json().catch(() => ({}))) as { type?: string; data?: { id?: string | number } };
  const id = String(corpo.data?.id ?? url.searchParams.get("data.id") ?? "");
  const tipo = String(corpo.type ?? url.searchParams.get("type") ?? "");
  // shortcut: por enquanto a assinatura só é registrada; depois de ver nos logs que os avisos verdadeiros passam,
  // recusar os que falham (responder 200 sem fazer nada)
  const assinado = assinaturaDoAvisoOk(process.env.MP_AVISO_SEGREDO?.trim() ?? "", req.headers, url.searchParams.get("data.id") ?? id);
  // uma linha por aviso, para ver no log se os verdadeiros passam antes de recusar os que falham
  const conferencia = assinado === null ? "sem segredo" : assinado ? "assinatura ok" : "assinatura que não confere";
  (assinado === false ? console.warn : console.info)(`[mercadopago] aviso ${tipo || "?"} ${id.slice(0, 40)}: ${conferencia}`);
  // mensalidade no cartão (eventos "Planos e assinaturas"): a consulta ao Mercado Pago diz quantas cobranças caíram
  if (tipo.startsWith("subscription_")) {
    // o limite vale só para aviso sem assinatura válida: os verdadeiros vêm todos dos mesmos IPs do Mercado Pago
    if (tipo === "subscription_authorized_payment" && assinado !== true && (await attempt(`aviso-mp:${await clientIp(req.headers)}`, MAX_AVISOS_CARTAO))) return new Response(null, { status: 200 });
    await avisoDoCartao(tipo, id).catch((e) => console.error("[assinatura] aviso do cartão falhou:", (e as Error).message));
  } else if (/^ORD[0-9A-Z]{10,40}$/.test(id)) {
    const [o] = await db.select({ id: orders.id, tenantId: orders.tenantId }).from(orders).where(eq(orders.mpPaymentId, id));
    if (o) await conferirPixMp(o.tenantId, o.id);
    // mensalidade do depo, cobrada na conta da Solace
    const [c] = await db.select({ tenantId: assinaturaPagamentos.tenantId }).from(assinaturaPagamentos).where(eq(assinaturaPagamentos.mpPaymentId, id));
    if (c) await conferirAssinatura(c.tenantId);
  }
  // sempre 200: resposta de erro faz o Mercado Pago repetir o aviso por dias
  return new Response(null, { status: 200 });
}
