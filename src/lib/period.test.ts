import { test } from "node:test";
import assert from "node:assert/strict";
import { agruparPorDia, dataISO, duracao, parsePeriod, rotuloDia, somaDias } from "./period.ts";

test("período com o De depois do Até é trocado, em vez de sair vazio", () => {
  const p = parsePeriod({ de: "2026-11-16", ate: "2026-11-01" });
  assert.deepEqual([p.fromStr, p.toStr], ["2026-11-01", "2026-11-16"]);
  assert.ok(p.from < p.to);
});

test("somaDias: vira o mês e o ano", () => {
  assert.equal(somaDias("2026-11-30", 3), "2026-12-03");
  assert.equal(somaDias("2026-12-25", 15), "2027-01-09");
  assert.equal(somaDias("2028-02-28", 1), "2028-02-29");
});

test("data impossível na URL cai no padrão em vez de derrubar a tela", () => {
  for (const ruim of ["2026-13-45", "2026-02-30", "2026-00-10", "2025-02-29", "2026-1-1", "abc", undefined])
    assert.equal(dataISO(ruim), false, String(ruim));
  for (const boa of ["2026-02-28", "2024-02-29", "2026-12-31"]) assert.equal(dataISO(boa), true, boa);
  const p = parsePeriod({ de: "2026-02-30", ate: "2026-13-45" });
  assert.ok(dataISO(p.fromStr) && dataISO(p.toStr));
  assert.notEqual(p.fromStr, "2026-02-30");
});

test("duracao: minutos, horas e, passado de um dia, dias", () => {
  assert.equal(duracao(12), "12 min");
  assert.equal(duracao(125), "2 h 05");
  assert.equal(duracao(180), "3 h");
  assert.equal(duracao(1500), "1 dia");
  assert.equal(duracao(8165), "5 dias");
});

test("agruparPorDia: separa pela data de São Paulo, não pela UTC", () => {
  // 23:30 de 23/11 em São Paulo já é 24/11 em UTC
  const itens = [new Date("2026-11-24T15:00:00Z"), new Date("2026-11-24T02:30:00Z"), new Date("2026-11-23T20:00:00Z")];
  const g = agruparPorDia(itens, (d) => d);
  assert.deepEqual(g.map((x) => [x.dia, x.itens.length]), [["2026-11-24", 1], ["2026-11-23", 2]]);
});

test("rotuloDia: hoje, ontem, dia da semana e, de outro ano, com o ano", () => {
  assert.equal(rotuloDia("2026-11-24", "2026-11-24"), "Hoje");
  assert.equal(rotuloDia("2026-11-23", "2026-11-24"), "Ontem");
  assert.equal(rotuloDia("2026-11-20", "2026-11-24"), "Sexta-feira, 20/11");
  assert.equal(rotuloDia("2025-12-31", "2026-01-02"), "Quarta-feira, 31/12/2025");
});
