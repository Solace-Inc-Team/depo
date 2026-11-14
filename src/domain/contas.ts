import { z } from "zod";
import { and, asc, eq, isNull, lte, sql } from "drizzle-orm";
import { db, scoped, tenantTransaction, type Tx } from "@/db";
import { contasPagar, expenses, suppliers } from "@/db/schema";
import { type Ctx, DomainError, assertRole } from "@/lib/ctx";
import { todayISO } from "@/lib/period";
import { audit } from "./stock";

// Contas a pagar: boleto de fornecedor, aluguel, conta de luz. A conta nasce com o vencimento e só vira
// despesa quando é paga (na data e na forma do pagamento). Até lá, aparece em "A pagar" e o Painel avisa
// quando vence.

export const contaSchema = z.object({
  description: z.string().trim().min(2, "Descreva a conta.").max(160, "A descrição pode ter até 160 letras."),
  category: z.enum(["combustivel", "fornecedor", "salarios", "manutencao", "aluguel", "impostos", "outros"], { message: "Escolha a categoria." }),
  supplierId: z.uuid().nullable().default(null),
  amountCents: z.int().min(1, "Informe o valor.").max(10_000_000_00, "Valor muito alto."),
  dueOn: z.iso.date("Informe o vencimento."),
});

/** Grava a conta dentro de uma transação já aberta (a entrada de compra no boleto usa a mesma). */
export async function criarContaTx(tx: Tx, ctx: Ctx, input: z.infer<typeof contaSchema>) {
  if (input.supplierId) {
    const [s] = await tx.select({ id: suppliers.id }).from(suppliers).where(and(eq(suppliers.id, input.supplierId), eq(suppliers.tenantId, ctx.tenantId)));
    if (!s) throw new DomainError("Fornecedor não encontrado.");
  }
  const [c] = await tx.insert(contasPagar).values({ ...input, tenantId: ctx.tenantId, branchId: ctx.branchId, createdBy: ctx.userId }).returning();
  await audit(tx, ctx, "conta.criar", "conta", c.id, { description: c.description, amountCents: c.amountCents, dueOn: c.dueOn });
  return c;
}

export async function criarConta(ctx: Ctx, raw: z.input<typeof contaSchema>) {
  assertRole(ctx, "dono", "caixa");
  const input = contaSchema.parse(raw);
  return tenantTransaction(ctx, (tx) => criarContaTx(tx, ctx, input));
}

/** Pagou: a conta vira despesa, com a forma e a data do pagamento. */
export async function pagarConta(ctx: Ctx, contaId: string, pagamento: { method: "dinheiro" | "pix" | "cartao" | "boleto"; paidOn: string }) {
  assertRole(ctx, "dono", "caixa");
  const { method, paidOn } = z.object({ method: z.enum(["dinheiro", "pix", "cartao", "boleto"]), paidOn: z.iso.date("Data inválida.") }).parse(pagamento);
  if (paidOn > todayISO()) throw new DomainError("A data do pagamento não pode ser no futuro.");
  await tenantTransaction(ctx, async (tx) => {
    const [c] = await tx
      .select()
      .from(contasPagar)
      .where(and(eq(contasPagar.id, contaId), eq(contasPagar.tenantId, ctx.tenantId), ctx.role === "dono" ? undefined : eq(contasPagar.branchId, ctx.branchId)))
      .for("update");
    if (!c || c.voidedAt) throw new DomainError("Conta não encontrada.");
    if (c.paidAt) throw new DomainError("Esta conta já foi paga.");
    const [e] = await tx
      .insert(expenses)
      .values({ tenantId: ctx.tenantId, branchId: c.branchId, category: c.category, description: c.description, amountCents: c.amountCents, method, paidOn, createdBy: ctx.userId })
      .returning({ id: expenses.id });
    await tx.update(contasPagar).set({ paidAt: new Date(), expenseId: e.id }).where(eq(contasPagar.id, c.id));
    await audit(tx, ctx, "conta.pagar", "conta", c.id, { description: c.description, amountCents: c.amountCents, method, paidOn });
  });
}

/** Conta lançada errado ou que não será paga: sai de "A pagar", com o motivo guardado. */
export async function cancelarConta(ctx: Ctx, contaId: string, reason: string) {
  assertRole(ctx, "dono");
  if (reason.trim().length < 3) throw new DomainError("Informe o motivo do cancelamento.");
  await tenantTransaction(ctx, async (tx) => {
    const [c] = await tx
      .update(contasPagar)
      .set({ voidedAt: new Date(), voidedBy: ctx.userId, voidReason: reason.trim() })
      .where(and(eq(contasPagar.id, contaId), eq(contasPagar.tenantId, ctx.tenantId), isNull(contasPagar.paidAt), isNull(contasPagar.voidedAt)))
      .returning({ id: contasPagar.id, description: contasPagar.description });
    if (!c) throw new DomainError("Só dá para cancelar conta em aberto.");
    await audit(tx, ctx, "conta.cancelar", "conta", c.id, { description: c.description, reason: reason.trim() });
  });
}

/** Contas em aberto, da que vence primeiro para a última. branchId null: todas as filiais. */
export const contasEmAberto = scoped(function contasEmAberto(tenantId: string, branchId: string | null) {
  return db
    .select({
      id: contasPagar.id,
      description: contasPagar.description,
      category: contasPagar.category,
      amountCents: contasPagar.amountCents,
      dueOn: contasPagar.dueOn,
      fornecedor: suppliers.name,
    })
    .from(contasPagar)
    .leftJoin(suppliers, eq(suppliers.id, contasPagar.supplierId))
    .where(and(eq(contasPagar.tenantId, tenantId), branchId ? eq(contasPagar.branchId, branchId) : undefined, isNull(contasPagar.paidAt), isNull(contasPagar.voidedAt)))
    .orderBy(asc(contasPagar.dueOn));
});

/** Para o Painel: contas já vencidas e as que vencem hoje ou amanhã. */
export const contasVencendo = scoped(async function contasVencendo(tenantId: string, branchId: string | null) {
  const hoje = todayISO();
  const amanha = new Date(`${hoje}T12:00:00-03:00`);
  amanha.setDate(amanha.getDate() + 1);
  const ate = amanha.toISOString().slice(0, 10);
  const [r] = await db
    .select({
      vencidas: sql<number>`(count(*) filter (where ${contasPagar.dueOn} < ${hoje}))::int`,
      vencendo: sql<number>`(count(*) filter (where ${contasPagar.dueOn} >= ${hoje}))::int`,
    })
    .from(contasPagar)
    .where(
      and(
        eq(contasPagar.tenantId, tenantId),
        branchId ? eq(contasPagar.branchId, branchId) : undefined,
        isNull(contasPagar.paidAt),
        isNull(contasPagar.voidedAt),
        lte(contasPagar.dueOn, ate),
      ),
    );
  return r;
});
