import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Confere a assinatura do aviso (cabeçalho x-signature): HMAC-SHA256, com a chave secreta da aplicação,
 * do texto "id:<data.id>;request-id:<x-request-id>;ts:<ts>;". Sem a chave configurada devolve null (não dá para conferir).
 */
export function assinaturaDoAvisoOk(segredo: string, cab: Headers, dataId: string): boolean | null {
  if (!segredo) return null;
  const partes = Object.fromEntries((cab.get("x-signature") ?? "").split(",").map((p) => p.trim().split("=", 2) as [string, string]));
  if (!partes.ts || !partes.v1) return false;
  const pedido = cab.get("x-request-id");
  const id = /^[a-z0-9]+$/i.test(dataId) ? dataId.toLowerCase() : dataId;
  const texto = `${id ? `id:${id};` : ""}${pedido ? `request-id:${pedido};` : ""}ts:${partes.ts};`;
  const esperado = createHmac("sha256", segredo).update(texto).digest();
  const recebido = Buffer.from(partes.v1, "hex");
  return recebido.length === esperado.length && timingSafeEqual(recebido, esperado);
}
