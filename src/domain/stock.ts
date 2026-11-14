import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { tenantTransaction, type Tx } from "@/db";
import { z } from "zod";
import { products, stockMovements, auditLog, suppliers, expenses, orders, orderItems, branches } from "@/db/schema";
import { type Ctx, DomainError, assertRole, isUuid } from "@/lib/ctx";
import { telefoneSchema } from "./telefone";
import { contaSchema, criarContaTx } from "./contas";
import { todayISO } from "@/lib/period";

type State = "cheio" | "vazio" | "avariado";

export async function audit(tx: Tx, ctx: Pick<Ctx, "tenantId" | "userId">, action: string, entity: string, entityId: string, data?: unknown) {
  await tx.insert(auditLog).values({ tenantId: ctx.tenantId, userId: ctx.userId, action, entity, entityId, data });
}

// FOR UPDATE nos produtos: duas vendas simultâneas não passam juntas pela checagem de saldo
export async function lockProducts(tx: Tx, ctx: Ctx, productIds: string[]) {
  return tx
    .select()
    .from(products)
    .where(and(eq(products.tenantId, ctx.tenantId), inArray(products.id, productIds)))
    .for("update");
}

export async function balanceOf(tx: Tx, ctx: Ctx, productId: string, state: State, driverId: string | null) {
  const [row] = await tx
    .select({ qty: sql<number>`coalesce(sum(${stockMovements.quantity}), 0)::int` })
    .from(stockMovements)
    .where(
      and(
        eq(stockMovements.tenantId, ctx.tenantId),
        eq(stockMovements.branchId, ctx.branchId),
        eq(stockMovements.productId, productId),
        eq(stockMovements.state, state),
        driverId ? eq(stockMovements.driverId, driverId) : isNull(stockMovements.driverId),
      ),
    );
  return row.qty;
}

/**
 * Cheios na loja que ainda não têm dono: o estoque da loja menos o que os pedidos abertos (ou esperando o
 * Pix) já seguram. A mesma conta da tela de Estoque. Funciona dentro de uma transação (com os produtos
 * travados, dois pedidos não levam o mesmo último galão) ou fora dela.
 */
export async function disponivelNaLoja(tx: Pick<Tx, "select">, tenantId: string, branchId: string, productIds: string[]) {
  if (!productIds.length) return new Map<string, number>();
  const naLoja = await tx
    .select({ productId: stockMovements.productId, qty: sql<number>`coalesce(sum(${stockMovements.quantity}), 0)::int` })
    .from(stockMovements)
    .where(
      and(
        eq(stockMovements.tenantId, tenantId),
        eq(stockMovements.branchId, branchId),
        inArray(stockMovements.productId, productIds),
        eq(stockMovements.state, "cheio"),
        isNull(stockMovements.driverId),
      ),
    )
    .groupBy(stockMovements.productId);
  const seguros = await tx
    .select({ productId: orderItems.productId, qty: sql<number>`coalesce(sum(${orderItems.quantity}), 0)::int` })
    .from(orderItems)
    .innerJoin(orders, eq(orders.id, orderItems.orderId))
    .where(
      and(
        eq(orders.tenantId, tenantId),
        eq(orders.branchId, branchId),
        inArray(orders.status, ["aberto", "aguardando_pagamento"]),
        inArray(orderItems.productId, productIds),
      ),
    )
    .groupBy(orderItems.productId);
  return new Map(
    productIds.map((id) => [id, (naLoja.find((r) => r.productId === id)?.qty ?? 0) - (seguros.find((r) => r.productId === id)?.qty ?? 0)]),
  );
}

type Move = {
  productId: string;
  state: State;
  driverId: string | null;
  quantity: number;
  reason: string;
  orderId?: string;
  shiftId?: string;
  supplierId?: string;
};

export async function move(tx: Tx, ctx: Ctx, m: Move, productName = "produto") {
  if (m.quantity === 0) return;
  if (m.quantity < 0) {
    const have = await balanceOf(tx, ctx, m.productId, m.state, m.driverId);
    if (have + m.quantity < 0) {
      const onde = m.driverId ? "com o entregador" : "na loja";
      throw new DomainError(`Estoque insuficiente de ${productName} (${m.state}) ${onde}: há ${have}.`);
    }
  }
  await tx.insert(stockMovements).values({ ...m, tenantId: ctx.tenantId, branchId: ctx.branchId, userId: ctx.userId });
}

export async function receivePurchase(
  ctx: Ctx,
  input: {
    productId: string;
    full: number;
    emptiesReturned: number;
    note: string;
    supplierId?: string | null;
    /** valor pago na compra; quando informado, entra nas despesas */
    costCents?: number | null;
    costMethod?: "dinheiro" | "pix" | "cartao" | "boleto";
    /** vencimento do boleto: a compra ainda não foi paga e vira conta a pagar */
    dueOn?: string | null;
  },
) {
  assertRole(ctx, "dono", "atendente", "caixa");
  if (input.full < 1) throw new DomainError("Informe a quantidade recebida.");
  await tenantTransaction(ctx, async (tx) => {
    const [p] = await lockProducts(tx, ctx, [input.productId]);
    if (!p) throw new DomainError("Produto não encontrado.");
    let supplier: { id: string; name: string } | undefined;
    if (input.supplierId) {
      [supplier] = await tx
        .select({ id: suppliers.id, name: suppliers.name })
        .from(suppliers)
        .where(and(eq(suppliers.id, input.supplierId), eq(suppliers.tenantId, ctx.tenantId)));
      if (!supplier) throw new DomainError("Fornecedor não encontrado.");
    }
    const detail = [supplier?.name, input.note].filter(Boolean).join(", ");
    const reason = `compra${detail ? `: ${detail}` : ""}`;
    const base = { productId: p.id, driverId: null, reason, supplierId: supplier?.id };
    await move(tx, ctx, { ...base, state: "cheio", quantity: input.full }, p.name);
    if (p.returnable && input.emptiesReturned > 0) await move(tx, ctx, { ...base, state: "vazio", quantity: -input.emptiesReturned }, p.name);
    const descricao = `Compra: ${input.full} x ${p.name}${supplier ? ` (${supplier.name})` : ""}`.slice(0, 160);
    if (input.costCents && (input.costMethod ?? "boleto") === "boleto") {
      // boleto não é dinheiro que saiu hoje: é conta para o vencimento
      if (!input.dueOn) throw new DomainError("Informe o vencimento do boleto.");
      await criarContaTx(tx, ctx, contaSchema.parse({ description: descricao, category: "fornecedor", supplierId: supplier?.id ?? null, amountCents: input.costCents, dueOn: input.dueOn }));
    } else if (input.costCents) {
      await tx.insert(expenses).values({
        tenantId: ctx.tenantId,
        branchId: ctx.branchId,
        category: "fornecedor",
        description: descricao,
        amountCents: input.costCents,
        method: input.costMethod ?? "pix",
        paidOn: todayISO(),
        createdBy: ctx.userId,
      });
    }
    await audit(tx, ctx, "estoque.compra", "product", p.id, input);
  });
}

/** Tira da venda um cheio ou vazio com defeito (vazando, amassado, lacre rompido). Continua contado, como avariado. */
export async function markDamaged(ctx: Ctx, input: { productId: string; from: "cheio" | "vazio"; quantity: number; note: string }) {
  assertRole(ctx, "dono", "atendente", "caixa");
  if (input.quantity < 1) throw new DomainError("Informe a quantidade.");
  if (input.note.trim().length < 3) throw new DomainError("Descreva o defeito.");
  await tenantTransaction(ctx, async (tx) => {
    const [p] = await lockProducts(tx, ctx, [input.productId]);
    if (!p) throw new DomainError("Produto não encontrado.");
    const base = { productId: p.id, driverId: null, reason: `avaria: ${input.note.trim()}` };
    await move(tx, ctx, { ...base, state: input.from, quantity: -input.quantity }, p.name);
    await move(tx, ctx, { ...base, state: "avariado", quantity: input.quantity }, p.name);
    await audit(tx, ctx, "estoque.avaria", "product", p.id, input);
  });
}

/**
 * Leva cheios e vazios desta filial para outra, na hora: sai daqui e entra lá na mesma transação.
 * Cheio que um pedido aberto já segura não sai.
 */
export async function transferirEstoque(ctx: Ctx, input: { productId: string; para: string; cheios: number; vazios: number; note: string }) {
  assertRole(ctx, "dono", "atendente", "caixa");
  const { cheios, vazios } = input;
  if (!Number.isInteger(cheios) || !Number.isInteger(vazios) || cheios < 0 || vazios < 0 || cheios + vazios < 1) {
    throw new DomainError("Informe quantos cheios ou vazios vão.");
  }
  if (!isUuid(input.para) || input.para === ctx.branchId) throw new DomainError("Escolha a filial que vai receber.");
  await tenantTransaction(ctx, async (tx) => {
    const [p] = await lockProducts(tx, ctx, [input.productId]);
    if (!p) throw new DomainError("Produto não encontrado.");
    if (vazios && !p.returnable) throw new DomainError(`${p.name} não tem vasilhame que volta.`);
    const filiais = await tx
      .select({ id: branches.id, name: branches.name, active: branches.active })
      .from(branches)
      .where(and(eq(branches.tenantId, ctx.tenantId), inArray(branches.id, [ctx.branchId, input.para])));
    const origem = filiais.find((b) => b.id === ctx.branchId);
    const destino = filiais.find((b) => b.id === input.para && b.active);
    if (!origem || !destino) throw new DomainError("Filial não encontrada.");
    if (cheios) {
      const livres = (await disponivelNaLoja(tx, ctx.tenantId, ctx.branchId, [p.id])).get(p.id) ?? 0;
      if (livres < cheios) throw new DomainError(`Há ${Math.max(livres, 0)} cheios de ${p.name} livres aqui. O resto está em pedidos aguardando.`);
    }
    const nota = input.note.trim() ? `: ${input.note.trim()}` : "";
    const la = { ...ctx, branchId: destino.id };
    for (const [state, q] of [["cheio", cheios], ["vazio", vazios]] as const) {
      if (!q) continue;
      await move(tx, ctx, { productId: p.id, state, driverId: null, quantity: -q, reason: `transferência para ${destino.name}${nota}` }, p.name);
      await move(tx, la, { productId: p.id, state, driverId: null, quantity: q, reason: `transferência de ${origem.name}${nota}` }, p.name);
    }
    await audit(tx, ctx, "estoque.transferencia", "product", p.id, { cheios, vazios, de: origem.name, para: destino.name, note: input.note.trim() });
  });
}

/**
 * Inventário: a contagem física de tudo que está na loja, de uma vez.
 * Cada diferença vira um ajuste próprio; o que bateu não gera movimento.
 */
export async function runInventory(ctx: Ctx, counts: { productId: string; state: State; counted: number }[], note: string) {
  assertRole(ctx, "dono");
  if (!counts.length) throw new DomainError("Nenhuma contagem informada.");
  if (counts.some((c) => !Number.isInteger(c.counted) || c.counted < 0)) throw new DomainError("A contagem não pode ser negativa.");
  return tenantTransaction(ctx, async (tx) => {
    const prods = await lockProducts(tx, ctx, [...new Set(counts.map((c) => c.productId))]);
    const diffs: { product: string; state: State; before: number; counted: number }[] = [];
    for (const c of counts) {
      const p = prods.find((x) => x.id === c.productId);
      if (!p) throw new DomainError("Produto não encontrado.");
      const have = await balanceOf(tx, ctx, p.id, c.state, null);
      if (have === c.counted) continue;
      await move(tx, ctx, { productId: p.id, state: c.state, driverId: null, quantity: c.counted - have, reason: `inventário${note.trim() ? `: ${note.trim()}` : ""}` }, p.name);
      diffs.push({ product: p.name, state: c.state, before: have, counted: c.counted });
    }
    await audit(tx, ctx, "estoque.inventario", "tenant", ctx.tenantId, { counted: counts.length, diffs, note: note.trim() });
    return diffs;
  });
}

export const supplierSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto.").max(120, "O nome pode ter até 120 letras."),
  phone: telefoneSchema,
  notes: z.string().trim().max(300, "A observação pode ter até 300 letras."),
  active: z.boolean(),
});

export async function saveSupplier(ctx: Ctx, input: z.infer<typeof supplierSchema>, id?: string) {
  assertRole(ctx, "dono", "atendente", "caixa");
  return tenantTransaction(ctx, async (tx) => {
    if (id) {
      const [s] = await tx.update(suppliers).set(input).where(and(eq(suppliers.id, id), eq(suppliers.tenantId, ctx.tenantId))).returning();
      if (!s) throw new DomainError("Fornecedor não encontrado.");
      await audit(tx, ctx, "fornecedor.editar", "supplier", s.id, input);
      return s;
    }
    const [s] = await tx.insert(suppliers).values({ ...input, tenantId: ctx.tenantId }).returning();
    // o nome vai junto: se o fornecedor sumir um dia, a auditoria ainda diz qual era
    await audit(tx, ctx, "fornecedor.criar", "supplier", s.id, { name: s.name });
    return s;
  });
}

export async function adjustStock(ctx: Ctx, input: { productId: string; state: State; counted: number; reason: string }) {
  assertRole(ctx, "dono");
  if (input.counted < 0) throw new DomainError("A contagem não pode ser negativa.");
  if (input.reason.trim().length < 3) throw new DomainError("Informe o motivo do ajuste.");
  await tenantTransaction(ctx, async (tx) => {
    const [p] = await lockProducts(tx, ctx, [input.productId]);
    if (!p) throw new DomainError("Produto não encontrado.");
    const have = await balanceOf(tx, ctx, p.id, input.state, null);
    const delta = input.counted - have;
    if (delta === 0) return;
    await move(tx, ctx, { productId: p.id, state: input.state, driverId: null, quantity: delta, reason: `ajuste: ${input.reason}` }, p.name);
    await audit(tx, ctx, "estoque.ajuste", "product", p.id, { ...input, before: have, delta });
  });
}
