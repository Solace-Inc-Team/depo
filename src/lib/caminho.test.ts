import { test } from "node:test";
import assert from "node:assert/strict";
import { caminhoSeguro } from "./caminho.ts";

test("aceita caminhos do próprio site", () => {
  assert.equal(caminhoSeguro("/pedidos/novo"), "/pedidos/novo");
  assert.equal(caminhoSeguro("/relatorios?de=2026-11-01&ate=2026-11-16"), "/relatorios?de=2026-11-01&ate=2026-11-16");
  assert.equal(caminhoSeguro("/"), "/");
});

test("recusa endereços de fora e voltas para o login", () => {
  for (const v of ["//evil.com", "/\\evil.com", "https://evil.com", "evil.com", "/login", "/login/sair", "/login?next=/x", "/x\n", "", null, 42])
    assert.equal(caminhoSeguro(v), null, String(v));
});
