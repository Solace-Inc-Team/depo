import { test } from "node:test";
import assert from "node:assert/strict";
import { intencao, numeroNaFrase, pagamentoNaFrase, pedidoNaFrase, semPrefixo, valorNaFrase } from "./entende.ts";

const loja = [
  { id: "g", nome: "Galão de água 20L" },
  { id: "p13", nome: "Gás P13" },
  { id: "p45", nome: "Gás P45" },
];
const pede = (t: string) => pedidoNaFrase(loja, t);

test("entende: produto e quantidade em frase solta", () => {
  assert.deepEqual(pede("quero uma água"), { ids: ["g"], qtd: 1 });
  assert.deepEqual(pede("Quero 2 galões"), { ids: ["g"], qtd: 2 });
  assert.deepEqual(pede("me vê duas águas por favor"), { ids: ["g"], qtd: 2 });
  assert.deepEqual(pede("tem garrafão?"), { ids: ["g"] });
  assert.deepEqual(pede("água 20 litros"), { ids: ["g"] }, "20 litros é o produto, não a quantidade");
  assert.deepEqual(pede("3 aguas de 20l"), { ids: ["g"], qtd: 3 });
  assert.deepEqual(pede("um gás p13"), { ids: ["p13"], qtd: 1 });
  assert.deepEqual(pede("gas 13"), { ids: ["p13"] });
  assert.deepEqual(pede("2 botijão 13kg"), { ids: ["p13"], qtd: 2 });
  assert.deepEqual(pede("preciso de um bujão de 45"), { ids: ["p45"], qtd: 1 });
  assert.deepEqual(pede("P45"), { ids: ["p45"] });
  assert.deepEqual(pede("quero gás"), { ids: ["p13", "p45"] }, "gás sem tamanho: pergunta qual");
  assert.deepEqual(pede("GÁS DE COZINHA!!"), { ids: ["p13", "p45"] });
  assert.deepEqual(pede("oi tudo bem?"), { ids: [] });
  assert.deepEqual(pede("Rua das Flores, 120"), { ids: [] }, "endereço não vira pedido");
});

test("entende: sim, não, loja, desistir e repetir", () => {
  for (const s of ["sim", "Sim!", "isso", "pode mandar", "ok", "blz", "confirmo", "s", "tenho sim", "pode ser", "fechado"]) assert.equal(intencao(s), "sim", s);
  for (const s of ["não", "nao", "n", "não tenho", "nao preciso"]) assert.equal(intencao(s), "nao", s);
  for (const s of ["quero falar com uma pessoa", "atendente", "LOJA", "chama alguém aí"]) assert.equal(intencao(s), "loja", s);
  for (const s of ["cancela", "desisto", "deixa pra lá", "não quero mais"]) assert.equal(intencao(s), "cancelar", s);
  for (const s of ["o mesmo de sempre", "repete", "igual da última vez", "mesmo pedido"]) assert.equal(intencao(s), "repetir", s);
  for (const s of ["oi", "Oiii", "boa tarde", "bom dia!", "olá", "opa"]) assert.equal(intencao(s), "saudacao", s);
  assert.equal(intencao("Maria Souza"), null);
});

test("entende: pagamento, números e valores", () => {
  assert.equal(pagamentoNaFrase("no pix"), "pix");
  assert.equal(pagamentoNaFrase("vou pagar no cartão de débito"), "cartao");
  assert.equal(pagamentoNaFrase("dinheiro vivo"), "dinheiro");
  assert.equal(pagamentoNaFrase("ainda não sei"), null);
  assert.equal(numeroNaFrase("duas"), 2);
  assert.equal(numeroNaFrase("3 unidades"), 3);
  assert.equal(numeroNaFrase("meia dúzia"), 6);
  assert.equal(numeroNaFrase("nenhum"), null);
  assert.equal(valorNaFrase("troco pra 50"), 5000);
  assert.equal(valorNaFrase("R$ 100,00"), 10000);
  assert.equal(valorNaFrase("cinquenta reais"), 5000);
  assert.equal(valorNaFrase("1.000"), 100000);
});

test("entende: tira o jeito de falar do nome e do endereço", () => {
  assert.equal(semPrefixo("Meu nome é Maria Souza"), "Maria Souza");
  assert.equal(semPrefixo("sou a Ana"), "Ana");
  assert.equal(semPrefixo("me chamo João"), "João");
  assert.equal(semPrefixo("Moro na Rua das Flores, 120"), "Rua das Flores, 120");
  assert.equal(semPrefixo("meu endereço é Av. Brasil 300"), "Av. Brasil 300");
  assert.equal(semPrefixo("Pedro"), "Pedro");
});
