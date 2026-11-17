import { test } from "node:test";
import assert from "node:assert/strict";
import { formatarDinheiro, formatarTelefone, telefoneValido } from "./mascara.ts";

test("telefone formata celular, fixo, 0800 e número pela metade", () => {
  assert.equal(formatarTelefone("11911111111"), "(11) 91111-1111");
  assert.equal(formatarTelefone("1133334444"), "(11) 3333-4444");
  assert.equal(formatarTelefone("+55 11 91111-1111"), "(11) 91111-1111");
  // digitando tecla por tecla com o +: o 55 sai assim que aparece
  assert.equal(formatarTelefone("+551"), "(1");
  assert.equal(formatarTelefone("+5511333"), "(11) 333");
  assert.equal(formatarTelefone("08001234567"), "0800 123 4567");
  assert.equal(formatarTelefone("119"), "(11) 9");
  assert.equal(formatarTelefone("1"), "(1");
  assert.equal(formatarTelefone("sfjadofua"), "");
  assert.equal(formatarTelefone("11 9 1111 1111 99"), "(11) 91111-1111");
});

test("telefone válido tem DDD ou é vazio", () => {
  assert.ok(telefoneValido(""));
  assert.ok(telefoneValido("(11) 91111-1111"));
  assert.ok(telefoneValido("(11) 3333-4444"));
  assert.ok(!telefoneValido("91111-1111"));
  assert.ok(!telefoneValido("abc"));
});

test("dinheiro aceita só número e uma vírgula com dois centavos", () => {
  assert.equal(formatarDinheiro("50"), "50");
  assert.equal(formatarDinheiro("12,5"), "12,5");
  assert.equal(formatarDinheiro("12,567"), "12,56");
  assert.equal(formatarDinheiro("1.234,56"), "1.234,56");
  // tecla por tecla, o ponto não vira vírgula (antes "1.250,00" acabava em "1,25")
  for (const v of ["1.", "1.2", "1.25", "1.250", "1.250,", "1.250,0", "1.250,00"]) assert.equal(formatarDinheiro(v), v);
  assert.equal(formatarDinheiro("12.50"), "12.50");
  assert.equal(formatarDinheiro("R$ 3a0"), "30");
  assert.equal(formatarDinheiro("1,2,3"), "1,23");
});
