import { test } from "node:test";
import assert from "node:assert/strict";
import { situacaoAssinatura, somarDias } from "./plano.ts";

test("acesso vale até o dia pago, mais 3 dias de tolerância; sem data não há cobrança", () => {
  assert.equal(somarDias("2026-11-14", 14), "2026-11-28");
  assert.equal(somarDias("2026-12-30", 3), "2027-01-02");
  assert.equal(situacaoAssinatura(null, "2026-11-14"), null);
  assert.deepEqual(situacaoAssinatura("2026-11-28", "2026-11-14"), { pagoAte: "2026-11-28", dias: 14, bloqueado: false, pausaEm: "2026-12-02" });
  assert.equal(situacaoAssinatura("2026-11-28", "2026-11-28")!.dias, 0);
  assert.equal(situacaoAssinatura("2026-11-28", "2026-12-01")!.bloqueado, false);
  assert.equal(situacaoAssinatura("2026-11-28", "2026-12-02")!.bloqueado, true);
});
