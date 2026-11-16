import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePeriod } from "./period.ts";

test("período com o De depois do Até é trocado, em vez de sair vazio", () => {
  const p = parsePeriod({ de: "2026-11-16", ate: "2026-11-01" });
  assert.deepEqual([p.fromStr, p.toStr], ["2026-11-01", "2026-11-16"]);
  assert.ok(p.from < p.to);
});
