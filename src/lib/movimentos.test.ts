import { test } from "node:test";
import assert from "node:assert/strict";
import { juntarTransferencias } from "./movimentos.ts";

const t = new Date("2026-11-16T10:00:00Z");
const m = (id: string, quantity: number, driverName: string | null, reason = "saída pedido #9", createdAt = t) => ({
  id,
  productName: "Galão 20L",
  state: "cheio",
  quantity,
  reason,
  driverName,
  createdAt,
});

test("a saída de um pedido vira uma linha da loja para o entregador", () => {
  const r = juntarTransferencias([m("a", -3, null), m("b", 3, "Carlos")]);
  assert.equal(r.length, 1);
  assert.deepEqual([r[0].de, r[0].para, r[0].quantity], ["Loja", "Carlos", 3]);
});

test("a volta no acerto vira uma linha do entregador para a loja", () => {
  const r = juntarTransferencias([m("a", 2, null, "devolução no acerto"), m("b", -2, "Carlos", "devolução no acerto")]);
  assert.deepEqual([r[0].de, r[0].para], ["Carlos", "Loja"]);
});

test("movimentos soltos ou de operações diferentes não se juntam", () => {
  const outra = new Date(t.getTime() + 1000);
  const r = juntarTransferencias([
    m("a", -3, null),
    m("b", 3, "Carlos", "saída pedido #9", outra), // outro instante
    m("c", 5, null, "entrada de compra"),
    m("d", -1, null, "avaria: furou"),
  ]);
  assert.equal(r.length, 4);
  assert.ok(r.every((x) => x.de === undefined));
});

test("dois pedidos iguais no mesmo instante formam dois pares, sem misturar", () => {
  const r = juntarTransferencias([m("a", -1, null), m("b", -1, null), m("c", 1, "Carlos"), m("d", 1, "Carlos")]);
  assert.equal(r.length, 2);
  assert.ok(r.every((x) => x.de === "Loja" && x.para === "Carlos"));
});
