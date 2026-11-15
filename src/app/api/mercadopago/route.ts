import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assinaturaPagamentos, orders } from "@/db/schema";
import { conferirPixMp } from "@/domain/pix";
import { conferirAssinatura } from "@/domain/assinatura";

// Aviso do Mercado Pago de que uma cobrança (order) mudou, configurado na aplicação "depo app" (evento
// "Order"). O aviso é só um toque: nada do que vem nele é aceito como verdade. O id precisa ser de uma
// cobrança nossa, e quem diz se foi pago é a consulta feita ao Mercado Pago com o token da própria empresa.
export async function POST(req: Request) {
  const url = new URL(req.url);
  const corpo = (await req.json().catch(() => ({}))) as { data?: { id?: string | number } };
  const id = String(corpo.data?.id ?? url.searchParams.get("data.id") ?? "");
  if (/^ORD[0-9A-Z]{10,40}$/.test(id)) {
    const [o] = await db.select({ id: orders.id, tenantId: orders.tenantId }).from(orders).where(eq(orders.mpPaymentId, id));
    if (o) await conferirPixMp(o.tenantId, o.id);
    // mensalidade do depo, cobrada na conta da Solace
    const [c] = await db.select({ tenantId: assinaturaPagamentos.tenantId }).from(assinaturaPagamentos).where(eq(assinaturaPagamentos.mpPaymentId, id));
    if (c) await conferirAssinatura(c.tenantId);
  }
  // sempre 200: resposta de erro faz o Mercado Pago repetir o aviso por dias
  return new Response(null, { status: 200 });
}
