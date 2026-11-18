import "server-only";
import { headers } from "next/headers";

/**
 * IP de quem fez a requisição. O proxy da frente (Traefik, no Coolify) acrescenta o IP real no FIM do
 * x-forwarded-for; o começo pode ter sido escrito pelo próprio cliente, então não serve para limite de tentativas.
 */
export async function clientIp(cab?: Headers) {
  const forwarded = (cab ?? (await headers())).get("x-forwarded-for");
  return forwarded?.split(",").pop()?.trim() || "local";
}

/**
 * Endereço do site para os links que vão ao cliente (acompanhamento, WhatsApp, portal). Vale o APP_URL: o cabeçalho
 * Host vem de quem fez a requisição e não deve decidir para onde o link aponta. Sem APP_URL (no computador de
 * desenvolvimento), usa o endereço desta requisição.
 */
export async function siteUrl() {
  const fixo = process.env.APP_URL?.trim().replace(/\/+$/, "");
  if (fixo) return fixo;
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
}
