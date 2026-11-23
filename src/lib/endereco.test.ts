import { test } from "node:test";
import assert from "node:assert/strict";
import { juntarEndereco, separarEndereco } from "./endereco.ts";
import { formatarCep } from "./mascara.ts";

test("endereço: junta as partes numa linha e separa de volta", () => {
  const p = { rua: "Rua das Flores", numero: "120", complemento: "apto 3", bairro: "Marco" };
  assert.equal(juntarEndereco(p), "Rua das Flores, 120, apto 3 - Marco");
  assert.deepEqual(separarEndereco("Rua das Flores, 120, apto 3 - Marco"), p);
  assert.equal(juntarEndereco({ rua: "Av. Brasil", numero: "s/n", complemento: "", bairro: "" }), "Av. Brasil, s/n");
  assert.deepEqual(separarEndereco("Av. Brasil, s/n"), { rua: "Av. Brasil", numero: "s/n", complemento: "", bairro: "" });
  assert.deepEqual(separarEndereco("Travessa WE-31, 45 - Cidade Nova"), { rua: "Travessa WE-31", numero: "45", complemento: "", bairro: "Cidade Nova" });
  assert.equal(juntarEndereco({ rua: "  ", numero: "10", complemento: "", bairro: "Centro" }), "", "sem rua não há endereço");
});

test("endereço: o que foi digitado livre antes fica inteiro na rua", () => {
  assert.deepEqual(separarEndereco("perto da igreja, casa azul"), { rua: "perto da igreja, casa azul", numero: "", complemento: "", bairro: "" });
  assert.deepEqual(separarEndereco(""), { rua: "", numero: "", complemento: "", bairro: "" });
});

test("cep: formata enquanto digita", () => {
  assert.equal(formatarCep("66810100"), "66810-100");
  assert.equal(formatarCep("668"), "668");
  assert.equal(formatarCep("66810-1009"), "66810-100");
});
