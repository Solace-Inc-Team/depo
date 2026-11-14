import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assinaturaPagamentos, orders } from "@/db/schema";
import { isUuid } from "@/lib/ctx";
import { conferirPixMp } from "@/domain/pix";
import { conferirAssinatura } from "@/domain/assinatura";

// Aviso do Mercado Pago de que um pagamento mudou. O aviso é só um toque: nada do que vem nele é aceito
// como verdade. O pedido do endereço precisa ter esta cobrança, e quem diz se foi pago é a consulta feita
// ao Mercado Pago com o token da própria empresa (conferirPixMp).
export async function POST(req: Request) {
  const url = new URL(req.url);
  const pedido = url.searchParams.get("pedido") ?? "";
  const corpo = (await req.json().catch(() => ({}))) as { data?: { id?: string | number } };
  const pagamento = String(corpo.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? "");
  if (isUuid(pedido) && pagamento) {
    const [o] = await db.select({ tenantId: orders.tenantId, mpPaymentId: orders.mpPaymentId }).from(orders).where(eq(orders.id, pedido));
    if (o?.mpPaymentId === pagamento) await conferirPixMp(o.tenantId, pedido);
  }
  // mensalidade do Depósito: a cobrança do endereço precisa ser este pagamento
  const assinatura = url.searchParams.get("assinatura") ?? "";
  if (isUuid(assinatura) && pagamento) {
    const [c] = await db.select({ tenantId: assinaturaPagamentos.tenantId, mpPaymentId: assinaturaPagamentos.mpPaymentId }).from(assinaturaPagamentos).where(eq(assinaturaPagamentos.id, assinatura));
    if (c?.mpPaymentId === pagamento) await conferirAssinatura(c.tenantId);
  }
  // sempre 200: resposta de erro faz o Mercado Pago repetir o aviso por dias
  return new Response(null, { status: 200 });
}
