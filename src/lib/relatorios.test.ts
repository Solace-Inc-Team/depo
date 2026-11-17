import { test } from "node:test";
import assert from "node:assert/strict";
import { pico, previsao, sumido } from "./relatorios.ts";

const dia = (n: number) => new Date(Date.UTC(2026, 10, 1) + n * 86400e3);

test("sumido: comprava a cada 10 dias e está há 25 sem comprar", () => {
  assert.deepEqual(sumido(4, dia(0), dia(30), dia(55)), { intervalo: 10, semComprar: 25 });
});

test("sumido: ainda dentro do costume, poucas compras ou faz tempo demais", () => {
  assert.equal(sumido(4, dia(0), dia(30), dia(45)), null, "15 dias: ainda não é o dobro de 10 com folga");
  assert.equal(sumido(2, dia(0), dia(10), dia(90)), null, "duas compras não fazem costume");
  assert.equal(sumido(4, dia(0), dia(30), dia(250)), null, "mais de 180 dias: já é outro assunto");
  // intervalo curto (2 dias): precisa de pelo menos uma semana a mais, não só o dobro
  assert.equal(sumido(5, dia(0), dia(8), dia(13)), null);
  assert.ok(sumido(5, dia(0), dia(8), dia(19)));
});

test("previsão: dura tantos dias e quanto pedir para a semana", () => {
  // 56 vendidos em 28 dias = 2 por dia; 9 cheios duram 4 dias; para 7 dias faltam 5
  assert.deepEqual(previsao(9, 56), { porDia: 2, dias: 4, pedirSemana: 5 });
  assert.equal(previsao(9, 56)!.pedirSemana, 5);
  assert.equal(previsao(30, 56)!.pedirSemana, 0, "já cobre a semana");
  assert.equal(previsao(10, 0), null, "sem venda, sem previsão");
});

test("pico: a hora mais forte e as vizinhas perto dela", () => {
  const h = (hora: number, n: number) => ({ hora, n });
  assert.deepEqual(pico([h(9, 3), h(10, 9), h(11, 10), h(12, 4)]), { de: 10, ate: 12 });
  assert.deepEqual(pico([h(18, 5)]), { de: 18, ate: 19 });
  assert.equal(pico([]), null);
});
