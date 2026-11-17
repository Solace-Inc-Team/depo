import { test } from "node:test";
import assert from "node:assert/strict";
import { responder, type Contexto, type Estado, type Saida } from "./robo.ts";

const galao = { id: "g", nome: "Galão de água 20L", precoCents: 1400, vasilhameCents: 2000, retornavel: true, disponivel: 30 };
const gas = { id: "b", nome: "Gás P13", precoCents: 11000, vasilhameCents: 0, retornavel: true, disponivel: 2 };
const ctx = (x: Partial<Contexto> = {}): Contexto => ({
  loja: "Fonte Azul",
  link: "https://depoapp.tech/pedir/fonte-azul",
  cliente: { nome: "Maria Souza", endereco: "Rua das Flores, 120" },
  ultimo: { itens: [{ productId: "g", quantity: 2, returnsEmpty: true }], pagamento: "pix", endereco: "Rua das Flores, 120" },
  taxaCents: 0,
  produtos: [galao, gas],
  ...x,
});
const ids = (s: Saida) => (s.tipo === "botoes" ? s.botoes.map((b) => b.id) : s.tipo === "lista" ? s.itens.map((i) => i.id) : []);
const textos = (s: Saida[]) => s.map((x) => x.texto).join("\n");

test("robô: cliente conhecido recebe o último pedido para repetir", () => {
  const r = responder(null, { texto: "boa tarde" }, ctx());
  assert.deepEqual(r.estado, { etapa: "menu" });
  assert.match(textos(r.saidas), /Olá, Maria! Aqui é da Fonte Azul/);
  assert.match(textos(r.saidas), /2x Galão de água 20L\nTotal: R\$\s28,00 no Pix\nEntrega: Rua das Flores, 120/);
  assert.deepEqual(ids(r.saidas[0]), ["repetir", "outro", "loja"]);
  const repetiu = responder(r.estado, { id: "repetir" }, ctx());
  assert.deepEqual(repetiu.lancar, { itens: [{ productId: "g", quantity: 2, returnsEmpty: true }], pagamento: "pix" });
  assert.equal(repetiu.estado, null, "depois de lançar, a próxima mensagem começa de novo");
});

test("robô: sem cadastro manda o link da loja; sem link, chama a loja", () => {
  const r = responder(null, { texto: "oi" }, ctx({ cliente: null, ultimo: null }));
  assert.match(textos(r.saidas), /pedir\/fonte-azul/);
  assert.deepEqual(ids(r.saidas[0]), ["loja"]);
  assert.doesNotMatch(textos(responder(null, {}, ctx({ cliente: null, ultimo: null, link: null })).saidas), /http/);
});

test("robô: outro pedido passa por produto, quantidade, vazio, pagamento e confirmação", () => {
  let r = responder({ etapa: "menu" }, { id: "outro" }, ctx());
  assert.deepEqual(ids(r.saidas[0]), ["p:g", "p:b"]);
  r = responder(r.estado, { id: "p:g" }, ctx());
  assert.deepEqual(ids(r.saidas[0]), ["q:1", "q:2", "q:3"]);
  r = responder(r.estado, { texto: "5" }, ctx());
  assert.equal(r.estado?.etapa, "vazio", "galão cobra o vasilhame: pergunta se tem o vazio");
  r = responder(r.estado, { id: "v:nao" }, ctx());
  r = responder(r.estado, { id: "pg:dinheiro" }, ctx({ taxaCents: 300 }));
  // 5 x (14 + 20 do vasilhame) + 3 de taxa
  assert.match(textos(r.saidas), /5x Galão de água 20L com vasilhame\nTaxa de entrega: R\$\s3,00\nTotal: R\$\s173,00 em dinheiro/);
  const fim = responder(r.estado, { id: "confirmar" }, ctx({ taxaCents: 300 }));
  assert.deepEqual(fim.lancar, { itens: [{ productId: "g", quantity: 5, returnsEmpty: false }], pagamento: "dinheiro" });
});

test("robô: produto sem preço de vasilhame não pergunta do vazio, e não passa do que há na loja", () => {
  const q: Estado = { etapa: "quantidade", productId: "b" };
  assert.deepEqual(ids(responder({ etapa: "produto" }, { id: "p:b" }, ctx()).saidas[0]), ["q:1", "q:2"], "só há 2: o botão 3 não aparece");
  const muito = responder(q, { texto: "3" }, ctx());
  assert.match(textos(muito.saidas), /Só temos 2 agora/);
  assert.deepEqual(muito.estado, q);
  assert.equal(responder(q, { id: "q:2" }, ctx()).estado?.etapa, "pagamento");
});

test("robô: fiado não se pede pelo robô, resposta estranha repete a pergunta e a loja silencia o robô", () => {
  const fiado = ctx({ ultimo: { itens: [{ productId: "g", quantity: 1, returnsEmpty: true }], pagamento: "fiado", endereco: "Rua A" } });
  const r = responder({ etapa: "menu" }, { id: "repetir" }, fiado);
  assert.equal(r.lancar, undefined);
  assert.equal(r.estado?.etapa, "pagamento");
  assert.equal(responder(r.estado, { id: "pg:toString" }, fiado).estado?.etapa, "pagamento", "id inventado não vira pagamento");

  const estranho = responder({ etapa: "menu" }, { texto: "quanto custa?" }, ctx());
  assert.match(textos(estranho.saidas), /Não entendi/);
  assert.deepEqual(estranho.estado, { etapa: "menu" });

  const loja = responder({ etapa: "menu" }, { id: "loja" }, ctx());
  assert.deepEqual(loja.estado, { etapa: "loja" });
  assert.deepEqual(responder(loja.estado, { texto: "oi" }, ctx()).saidas, [], "com a loja atendendo, o robô não responde");
});

test("robô: respeita os limites do WhatsApp (3 botões de 20 letras, 10 linhas de 24)", () => {
  const muitos = Array.from({ length: 14 }, (_, i) => ({ ...gas, id: `x${i}`, nome: `Produto com um nome bem comprido ${i}` }));
  const etapas: Estado[] = [{ etapa: "menu" }, { etapa: "quantidade", productId: "g" }, { etapa: "vazio", productId: "g", quantity: 1 }, { etapa: "pagamento", itens: [] }];
  for (const e of etapas)
    for (const s of responder(e, { texto: "???" }, ctx()).saidas)
      if (s.tipo === "botoes") {
        assert.ok(s.botoes.length <= 3);
        for (const b of s.botoes) assert.ok(b.titulo.length <= 20, b.titulo);
      }
  const lista = responder({ etapa: "menu" }, { id: "outro" }, ctx({ produtos: muitos })).saidas[0];
  assert.ok(lista.tipo === "lista" && lista.itens.length === 10 && lista.itens.every((i) => i.titulo.length <= 24) && lista.botao.length <= 20);
});
