import { test } from "node:test";
import assert from "node:assert/strict";
import { custoMicro, entradaTotal, historicoCurto, LIMITES, resultadoCurto, somarUso, usoZerado } from "./assistente.ts";

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
