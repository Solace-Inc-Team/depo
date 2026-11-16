import { test } from "node:test";
import assert from "node:assert/strict";
import { avaliar, type Metricas } from "./nota.ts";

const m = (id: string, x: Partial<Metricas> = {}): Metricas => ({
  id,
  nome: id,
  entregas: 20,
  viagemMin: 400,
  viagemEntregas: 20,
  voltaMin: 0,
  voltaViagens: 0,
  acertos: 10,
  acertosComFalta: 0,
  horasTurno: 10,
  ocorrencias: {},
  ...x,
});

test("nota: igual à equipe em tudo e sem falta no caixa", () => {
  const { entregadores } = avaliar([m("a"), m("b")]);
  // rapidez 7,5 e produtividade 7,5 (na média), acerto 10: 0,45*7,5 + 0,35*10 + 0,2*7,5
  assert.equal(entregadores[0].nota, 8.4);
  assert.deepEqual(entregadores[0].partes, { rapidez: 7.5, acerto: 10, produtividade: 7.5 });
});

test("nota: quem demora mais na viagem fica abaixo de quem é rápido", () => {
  // a: 10 min por entrega, b: 30 min; a equipe faz 20
  const { entregadores, equipeMinPorEntrega } = avaliar([m("a", { viagemMin: 200 }), m("b", { viagemMin: 600 })]);
  assert.equal(equipeMinPorEntrega, 20);
  const a = entregadores.find((e) => e.id === "a")!;
  const b = entregadores.find((e) => e.id === "b")!;
  assert.equal(a.partes.rapidez, 10);
  assert.equal(b.partes.rapidez, 3.8);
  assert.ok(a.nota! > b.nota!);
  assert.equal(entregadores[0].id, "a", "maior nota primeiro");
});

test("nota: falta no caixa tira ponto, e a parte vai de 0 a 10", () => {
  const { entregadores } = avaliar([m("a", { acertos: 4, acertosComFalta: 1 })]);
  assert.equal(entregadores[0].partes.acerto, 7.5);
  const nada = avaliar([m("a", { acertos: 2, acertosComFalta: 2 })]).entregadores[0];
  assert.equal(nada.partes.acerto, 0);
});

test("nota: com poucas entregas fica em avaliação, sem número", () => {
  const { entregadores } = avaliar([m("a", { entregas: 9 }), m("b")]);
  const a = entregadores.find((e) => e.id === "a")!;
  assert.equal(a.nota, null);
  assert.equal(entregadores.at(-1)!.id, "a", "em avaliação vai para o fim");
});

test("nota: parte sem dado sai da conta e as outras dividem o peso", () => {
  // sem viagem acertada: só acerto (10) e produtividade (7,5), pesos 0,35 e 0,2
  const { entregadores } = avaliar([m("a", { viagemMin: 0, viagemEntregas: 0 })]);
  assert.equal(entregadores[0].partes.rapidez, null);
  assert.equal(entregadores[0].nota, 9.1);
  assert.equal(entregadores[0].minPorEntrega, null);
});

test("nota: demora para voltar é média das viagens confirmadas no celular", () => {
  const a = avaliar([m("a", { voltaMin: 30, voltaViagens: 3 })]).entregadores[0];
  assert.equal(a.minParaVoltar, 10);
  assert.equal(avaliar([m("b")]).entregadores[0].minParaVoltar, null);
});
