import { test } from "node:test";
import assert from "node:assert/strict";
import { custoMicro, dolares, entradaTotal, historicoCurto, LIMITES, resultadoCurto, separarResposta, somarUso, usoZerado } from "./assistente.ts";

test("custo da pergunta: cada tipo de token no preço do modelo, em milionésimos de dólar", () => {
  const u = { entrada: 2000, cacheGravado: 0, cacheLido: 8000, saida: 300 };
  // Haiku: 2000 × 0,10 + 8000 × 0,01 + 300 × 0,50
  assert.equal(custoMicro("rapido", u), 200 + 80 + 150);
  // o modelo maior custa 20 vezes mais na entrada
  assert.equal(custoMicro("analise", u), 4000 + 800 + 3000);
  assert.equal(entradaTotal(u), 10_000);
});

test("uso soma as rodadas, com os campos de cache ausentes contando zero", () => {
  const u = usoZerado();
  somarUso(u, { input_tokens: 100, output_tokens: 20, cache_read_input_tokens: 900 });
  somarUso(u, { input_tokens: 50, output_tokens: 10, cache_creation_input_tokens: 1000, cache_read_input_tokens: null });
  assert.deepEqual(u, { entrada: 150, cacheGravado: 1000, cacheLido: 900, saida: 30 });
});

test("histórico enviado: só as últimas conversas, cortadas, e nada que não seja pergunta e resposta", () => {
  assert.deepEqual(historicoCurto("lixo"), []);
  const muitas = Array.from({ length: 10 }, (_, i) => ({ pergunta: `p${i}`, resposta: "r".repeat(2000) }));
  const h = historicoCurto([...muitas, { pergunta: "sem resposta" }, null, { pergunta: " ", resposta: "x" }]);
  assert.equal(h.length, LIMITES.historico);
  assert.equal(h.at(-1)!.pergunta, "p9");
  assert.ok(h.every((t) => t.resposta.length === LIMITES.respostaNoHistorico));
});

test("resultado de consulta grande é cortado no teto", () => {
  assert.equal(resultadoCurto({ a: 1 }), '{"a":1}');
  const grande = resultadoCurto(Array.from({ length: 2000 }, (_, i) => ({ cliente: `Cliente ${i}` })));
  assert.ok(grande.length < LIMITES.resultado + 80);
  assert.match(grande, /cortado/);
});

test("gasto em dólar: centavos arredondados e gasto pequeno sem virar zero", () => {
  assert.equal(dolares(0).replace(/\s/g, " "), "US$ 0,00");
  assert.equal(dolares(1200), "menos de US$ 0,01");
  assert.equal(dolares(1_234_567).replace(/\s/g, " "), "US$ 1,23");
});

test("resposta: as linhas de destaque e de próximas perguntas saem do texto e viram campos", () => {
  const r = separarResposta("Hoje você vendeu R$ 2.340,00 em 18 pedidos.\nA maior parte no Pix.\n\nDESTAQUE: R$ 2.340,00\nSEGUIR: E ontem? | Quanto foi no fiado? | Qual entregador vendeu mais? | demais");
  assert.equal(r.texto, "Hoje você vendeu R$ 2.340,00 em 18 pedidos.\nA maior parte no Pix.");
  assert.equal(r.destaque, "R$ 2.340,00");
  assert.deepEqual(r.seguintes, ["E ontem?", "Quanto foi no fiado?", "Qual entregador vendeu mais?"]);
  // sem as linhas, nada some
  assert.deepEqual(separarResposta("Você tem 9 cheios."), { texto: "Você tem 9 cheios.", destaque: undefined, seguintes: [] });
  // o modelo às vezes põe negrito no rótulo
  assert.equal(separarResposta("Texto\n**DESTAQUE:** 12 botijões").destaque, "12 botijões");
});

test("resposta em JSON cru não vai para a tela", () => {
  const r = separarResposta('{"total":"R$ 51,00"}\nSEGUIR: E ontem?');
  assert.equal(r.texto, "Não consegui montar a resposta. Tente perguntar de outro jeito.");
  assert.deepEqual(r.seguintes, []);
});
