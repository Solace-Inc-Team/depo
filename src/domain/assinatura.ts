import { randomUUID } from "node:crypto";
import { and, desc, eq, gt, isNotNull, isNull, sql } from "drizzle-orm";
import { db, tenantTransaction, withTenant } from "@/db";
import { assinaturaPagamentos, auditLog, tenants, users } from "@/db/schema";
import { type Ctx, DomainError, assertRole } from "@/lib/ctx";
import { ErroMp, criarPixMp, pagamentoMp } from "@/lib/mercadopago";
import { PLANO } from "@/lib/plano";
import { todayISO } from "@/lib/period";

// Mensalidade do Depósito: um Pix por mês na conta do Mercado Pago da Solace (token em MP_TOKEN_SOLACE).
// Pago, o acesso da empresa ganha mais um mês. Sem cartão e sem débito automático: o dono paga quando vence.

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

/** Gera (ou reaproveita) o Pix da mensalidade. Só o dono paga. */
export async function pixAssinatura(ctx: Ctx) {
  assertRole(ctx, "dono");
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
  const app = process.env.APP_URL ?? "";
  let novo: { id: string; codigo: string };
  try {
    novo = await criarPixMp(token, {
      valorCents: PLANO.mensalCents,
      descricao: `Depósito, mensalidade de ${nome}`.slice(0, 120),
      referencia: `assinatura:${id}`,
      emailPagador: email,
      expiraEm,
      avisoUrl: app.startsWith("https://") ? `${app}/api/mercadopago?assinatura=${id}` : undefined,
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
