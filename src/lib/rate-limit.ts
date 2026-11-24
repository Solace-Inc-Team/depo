import "server-only";
import { and, count, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { loginAttempts } from "@/db/schema";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

/** true quando a chave (ex.: "login:fulano@x.com:1.2.3.4") já errou demais na janela. */
export async function isBlocked(key: string, max = MAX_FAILURES) {
  const [{ n }] = await db
    .select({ n: count() })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.key, key), gte(loginAttempts.createdAt, new Date(Date.now() - WINDOW_MS))));
  return n >= max;
}

/**
 * Registra a tentativa e diz se ela passou do limite. Registrar ANTES de conferir fecha a brecha
 * de várias requisições simultâneas passarem juntas pela checagem.
 */
export async function attempt(key: string, max = MAX_FAILURES) {
  await recordFailure(key);
  const [{ n }] = await db
    .select({ n: count() })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.key, key), gte(loginAttempts.createdAt, new Date(Date.now() - WINDOW_MS))));
  return n > max;
}

/**
 * true na primeira vez que a chave aparece na janela (o mesmo aviso do WhatsApp chegando duas vezes). Com a trava,
 * dois iguais ao mesmo tempo não se anulam: com `attempt(key, 1)` os dois gravavam, contavam 2 e desistiam juntos.
 */
export async function primeiraVez(key: string) {
  return db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${"uma-vez:" + key}))`);
    const [{ n }] = await tx
      .select({ n: count() })
      .from(loginAttempts)
      .where(and(eq(loginAttempts.key, key), gte(loginAttempts.createdAt, new Date(Date.now() - WINDOW_MS))));
    if (n) return false;
    await tx.insert(loginAttempts).values({ key });
    return true;
  });
}

/** Limite geral por IP, somando todos os e-mails tentados dali. */
export const IP_MAX_FAILURES = 30;

export async function recordFailure(key: string) {
  await db.insert(loginAttempts).values({ key });
  // limpeza oportunista do que já saiu da janela
  await db.delete(loginAttempts).where(lt(loginAttempts.createdAt, new Date(Date.now() - WINDOW_MS)));
}

export const clearFailures = (key: string) => db.delete(loginAttempts).where(eq(loginAttempts.key, key));

export const BLOCKED_MESSAGE = "Muitas tentativas erradas. Espere 15 minutos e tente de novo.";
