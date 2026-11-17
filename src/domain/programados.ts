import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { tenantTransaction, type Tx } from "@/db";
import { orderItems, orders, pedidosProgramados } from "@/db/schema";
import { type Ctx, DomainError, assertRole } from "@/lib/ctx";
import { somaDias, todayISO } from "@/lib/period";
import { audit } from "./stock";
import { criarPedidoNaTx, newOrderSchema } from "./orders";

// Pedido programado: o mesmo pedido a cada tantos dias. No dia ele aparece em Entregas e a atendente lança com um
// toque; a próxima data conta a partir do dia em que foi lançado ou pulado (atrasado não acumula).

const EQUIPE = ["dono", "atendente", "caixa"] as const;
const dia = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida.");

export const programarSchema = z.object({
  orderId: z.uuid(),
  aCadaDias: z.int("Escolha de quanto em quanto tempo.").min(1, "Escolha de quanto em quanto tempo.").max(180, "No máximo a cada 180 dias."),
  proxima: dia,
});

export const alterarSchema = programarSchema.omit({ orderId: true });

const naoAntesDeHoje = (proxima: string) => {
  if (proxima < todayISO()) throw new DomainError("A próxima entrega não pode ser antes de hoje.");
};

/** Programa a partir de um pedido do cliente: mesmos itens, pagamento, endereço e taxa. */
export async function programar(ctx: Ctx, input: z.infer<typeof programarSchema>) {
  assertRole(ctx, ...EQUIPE);
  naoAntesDeHoje(input.proxima);
  return tenantTransaction(ctx, async (tx) => {
    const [o] = await tx.select().from(orders).where(and(eq(orders.tenantId, ctx.tenantId), eq(orders.id, input.orderId)));
    if (!o || (ctx.role !== "dono" && o.branchId !== ctx.branchId)) throw new DomainError("Pedido não encontrado.");
    if (!o.customerId) throw new DomainError("Pedido de balcão sem cliente não pode ser programado.");
    if (o.status === "cancelado" || o.status === "estornado") throw new DomainError("Pedido cancelado não pode ser programado.");
    const itens = await tx
      .select({ productId: orderItems.productId, quantity: orderItems.quantity, returnsEmpty: orderItems.returnsEmpty })
      .from(orderItems)
      .where(eq(orderItems.orderId, o.id));
    const [p] = await tx
      .insert(pedidosProgramados)
      .values({
        tenantId: ctx.tenantId,
        branchId: o.branchId,
        customerId: o.customerId,
        aCadaDias: input.aCadaDias,
        proxima: input.proxima,
        itens,
        paymentMethod: o.paymentMethod,
        address: o.address,
        reference: o.reference ?? "",
        deliveryFeeCents: o.deliveryFeeCents,
        createdBy: ctx.userId,
      })
      .returning();
    await audit(tx, ctx, "programado.criar", "customer", o.customerId, { programadoId: p.id, aCadaDias: input.aCadaDias, proxima: input.proxima, origem: o.number });
    return p;
  });
}

async function travar(tx: Tx, ctx: Ctx, id: string) {
  const [p] = await tx
    .select()
    .from(pedidosProgramados)
    .where(and(eq(pedidosProgramados.tenantId, ctx.tenantId), eq(pedidosProgramados.id, id)))
    .for("update");
  // a equipe só mexe nos da própria filial
  if (!p || (ctx.role !== "dono" && p.branchId !== ctx.branchId)) throw new DomainError("Pedido programado não encontrado.");
  return p;
}

export async function alterarProgramado(ctx: Ctx, id: string, input: z.infer<typeof alterarSchema>) {
  assertRole(ctx, ...EQUIPE);
  naoAntesDeHoje(input.proxima);
  await tenantTransaction(ctx, async (tx) => {
    const p = await travar(tx, ctx, id);
    await tx.update(pedidosProgramados).set({ aCadaDias: input.aCadaDias, proxima: input.proxima }).where(eq(pedidosProgramados.id, p.id));
    await audit(tx, ctx, "programado.alterar", "customer", p.customerId, { programadoId: p.id, antes: { aCadaDias: p.aCadaDias, proxima: p.proxima }, depois: input });
  });
}

export async function pausarProgramado(ctx: Ctx, id: string, pausado: boolean) {
  assertRole(ctx, ...EQUIPE);
  await tenantTransaction(ctx, async (tx) => {
    const p = await travar(tx, ctx, id);
    // ao retomar, uma data que ficou no passado vira hoje: ele volta para a lista do dia
    const proxima = !pausado && p.proxima < todayISO() ? todayISO() : p.proxima;
    await tx.update(pedidosProgramados).set({ pausado, proxima }).where(eq(pedidosProgramados.id, p.id));
    await audit(tx, ctx, pausado ? "programado.pausar" : "programado.retomar", "customer", p.customerId, { programadoId: p.id });
  });
}

export async function excluirProgramado(ctx: Ctx, id: string) {
  assertRole(ctx, ...EQUIPE);
  await tenantTransaction(ctx, async (tx) => {
    const p = await travar(tx, ctx, id);
    await tx.delete(pedidosProgramados).where(eq(pedidosProgramados.id, p.id));
    await audit(tx, ctx, "programado.excluir", "customer", p.customerId, { programadoId: p.id });
  });
}

async function doDia(tx: Tx, ctx: Ctx, id: string) {
  const p = await travar(tx, ctx, id);
  if (p.pausado) throw new DomainError("Este pedido programado está pausado.");
  if (p.proxima > todayISO()) throw new DomainError("Este pedido programado ainda não é para hoje.");
  return p;
}

/** Lança o pedido do dia (vai para a fila de entrega) e marca a próxima data. Dois toques não lançam dois pedidos. */
export async function lancarProgramado(ctx: Ctx, id: string) {
  assertRole(ctx, ...EQUIPE);
  return tenantTransaction(ctx, async (tx) => {
    const p = await doDia(tx, ctx, id);
    const pedido = await criarPedidoNaTx(
      tx,
      { ...ctx, branchId: p.branchId },
      newOrderSchema.parse({
        mode: "entrega",
        customerId: p.customerId,
        items: p.itens,
        paymentMethod: p.paymentMethod,
        origin: "programado",
        address: p.address ?? undefined,
        reference: p.reference,
        deliveryFeeCents: p.deliveryFeeCents,
        changeForCents: null,
        notes: "",
        driverId: null,
      }),
    );
    const proxima = somaDias(todayISO(), p.aCadaDias);
    await tx.update(pedidosProgramados).set({ proxima }).where(eq(pedidosProgramados.id, p.id));
    await audit(tx, ctx, "programado.lancar", "order", pedido.id, { programadoId: p.id, proxima });
    return { pedido, proxima };
  });
}

/** Hoje não (o cliente ainda tem, viajou): vai para a próxima data sem lançar. */
export async function pularProgramado(ctx: Ctx, id: string) {
  assertRole(ctx, ...EQUIPE);
  return tenantTransaction(ctx, async (tx) => {
    const p = await doDia(tx, ctx, id);
    const proxima = somaDias(todayISO(), p.aCadaDias);
    await tx.update(pedidosProgramados).set({ proxima }).where(eq(pedidosProgramados.id, p.id));
    await audit(tx, ctx, "programado.pular", "customer", p.customerId, { programadoId: p.id, proxima });
    return proxima;
  });
}
