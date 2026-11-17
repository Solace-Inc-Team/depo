import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePeriod, somaDias } from "./period.ts";

test("período com o De depois do Até é trocado, em vez de sair vazio", () => {
  const p = parsePeriod({ de: "2026-11-16", ate: "2026-11-01" });
  assert.deepEqual([p.fromStr, p.toStr], ["2026-11-01", "2026-11-16"]);
  assert.ok(p.from < p.to);
});

test("somaDias: vira o mês e o ano", () => {
  assert.equal(somaDias("2026-11-30", 3), "2026-12-03");
  assert.equal(somaDias("2026-12-25", 15), "2027-01-09");
  assert.equal(somaDias("2028-02-28", 1), "2028-02-29");
});
