import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { assinaturaDoAvisoOk } from "./aviso-mp.ts";

const SEGREDO = "segredo-de-teste";
const assinar = (id: string, pedido: string, ts: string) =>
  createHmac("sha256", SEGREDO).update(`id:${id};request-id:${pedido};ts:${ts};`).digest("hex");
const cab = (assinatura: string, pedido = "req-1") => new Headers({ "x-signature": assinatura, "x-request-id": pedido });

test("aviso do Mercado Pago: confere a assinatura do jeito da documentação", () => {
  const v1 = assinar("ord01jq4s4ky8hwqd5", "req-1", "1704908010");
  assert.equal(assinaturaDoAvisoOk(SEGREDO, cab(`ts=1704908010,v1=${v1}`), "ORD01JQ4S4KY8HWQD5"), true);
  // outro id, outro horário, outra chave, cabeçalho faltando ou torto: não confere
  assert.equal(assinaturaDoAvisoOk(SEGREDO, cab(`ts=1704908010,v1=${v1}`), "ORD99"), false);
  assert.equal(assinaturaDoAvisoOk(SEGREDO, cab(`ts=1704908011,v1=${v1}`), "ORD01JQ4S4KY8HWQD5"), false);
  assert.equal(assinaturaDoAvisoOk("outra", cab(`ts=1704908010,v1=${v1}`), "ORD01JQ4S4KY8HWQD5"), false);
  assert.equal(assinaturaDoAvisoOk(SEGREDO, new Headers(), "ORD01JQ4S4KY8HWQD5"), false);
  assert.equal(assinaturaDoAvisoOk(SEGREDO, cab("ts=1,v1=zz"), "ORD01JQ4S4KY8HWQD5"), false);
  // sem chave configurada não há o que conferir
  assert.equal(assinaturaDoAvisoOk("", cab(`ts=1704908010,v1=${v1}`), "x"), null);
});
