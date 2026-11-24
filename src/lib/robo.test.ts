import { test } from "node:test";
import assert from "node:assert/strict";
import { responder, type Contexto, type Estado, type Saida } from "./robo.ts";

const galao = { id: "g", nome: "Galão de água 20L", precoCents: 1400, vasilhameCents: 2000, retornavel: true, disponivel: 30 };
const gas = { id: "b", nome: "Gás P13", precoCents: 11000, vasilhameCents: 0, retornavel: true, disponivel: 2 };
const ctx = (x: Partial<Contexto> = {}): Contexto => ({
  loja: "Fonte Azul",
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

test("robô: cliente novo informa nome e endereço e já vê os produtos", () => {
  const novo = ctx({ cliente: null, ultimo: null, saudacao: "Boa tarde" });
  let r = responder(null, { texto: "oi" }, novo);
  assert.deepEqual(r.estado, { etapa: "nome" });
  assert.match(textos(r.saidas), /Boa tarde! Aqui é da Fonte Azul\.\nPara o seu primeiro pedido, qual é o seu nome\?/);
  assert.match(textos(responder(r.estado, { texto: "123" }, novo).saidas), /só o seu nome/, "número não é nome");
  r = responder(r.estado, { texto: "  Maria   Souza " }, novo);
  assert.deepEqual(r.estado, { etapa: "endereco", nome: "Maria Souza" });
  assert.match(textos(r.saidas), /Prazer, Maria!/);
  assert.match(textos(responder(r.estado, { texto: "ali" }, novo).saidas), /Não consegui entender o endereço/);
  r = responder(r.estado, { texto: "Rua das Flores, 120, Marco" }, novo);
  assert.deepEqual(r.cadastrar, { nome: "Maria Souza", endereco: "Rua das Flores, 120, Marco" });
  assert.deepEqual(r.estado, { etapa: "produto" });
  assert.deepEqual(ids(r.saidas[0]), ["p:g", "p:b"]);
  // cliente que já existe sem endereço: pula o nome
  const semEnd = ctx({ cliente: { nome: "João Lima", endereco: null }, ultimo: null });
  r = responder(null, { texto: "oi" }, semEnd);
  assert.deepEqual(r.estado, { etapa: "endereco", nome: "João Lima" });
  assert.match(textos(r.saidas), /Olá, João!/);
  // "loja" em qualquer etapa chama uma pessoa
  assert.deepEqual(responder({ etapa: "nome" }, { texto: "Loja" }, novo).estado, { etapa: "loja" });
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
  // em dinheiro pergunta o troco, com as notas acima do total (5 x (14 + 20 do vasilhame) + 3 de taxa = 173)
  assert.equal(r.estado?.etapa, "troco");
  assert.deepEqual(ids(r.saidas[0]), ["t:0", "t:20000"]);
  const menor = responder(r.estado, { texto: "100" }, ctx({ taxaCents: 300 }));
  assert.match(textos(menor.saidas), /menor que o total de R\$\s173,00/);
  assert.equal(menor.estado?.etapa, "troco");
  r = responder(r.estado, { texto: "200" }, ctx({ taxaCents: 300 }));
  assert.match(textos(r.saidas), /5x Galão de água 20L com vasilhame\nTaxa de entrega: R\$\s3,00\nTotal: R\$\s173,00 em dinheiro\nTroco para R\$\s200,00/);
  const fim = responder(r.estado, { id: "confirmar" }, ctx({ taxaCents: 300 }));
  assert.deepEqual(fim.lancar, { itens: [{ productId: "g", quantity: 5, returnsEmpty: false }], pagamento: "dinheiro", trocoCents: 20000 });
});

test("robô: repetir pedido em dinheiro pergunta o troco antes de anotar", () => {
  const din = ctx({ ultimo: { itens: [{ productId: "g", quantity: 2, returnsEmpty: true }], pagamento: "dinheiro", endereco: "Rua A" } });
  let r = responder({ etapa: "menu" }, { id: "repetir" }, din);
  assert.equal(r.lancar, undefined);
  assert.deepEqual(ids(r.saidas[0]), ["t:0", "t:5000", "t:10000"], "total 28: notas de 50 e 100");
  r = responder(r.estado, { id: "t:0" }, din);
  assert.doesNotMatch(textos(r.saidas), /Troco/);
  assert.deepEqual(responder(r.estado, { id: "confirmar" }, din).lancar, { itens: [{ productId: "g", quantity: 2, returnsEmpty: true }], pagamento: "dinheiro" });
});

test("robô: produto sem preço de vasilhame não pergunta do vazio, e não passa do que há na loja", () => {
  const q: Estado = { etapa: "quantidade", productId: "b" };
  assert.deepEqual(ids(responder({ etapa: "produto" }, { id: "p:b" }, ctx()).saidas[0]), ["q:1", "q:2"], "só há 2: o botão 3 não aparece");
  const muito = responder(q, { texto: "3" }, ctx());
  assert.match(textos(muito.saidas), /Só temos 2 de Gás P13 agora/);
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

test("troco absurdo no robô volta a perguntar em vez de derrubar a conversa", () => {
  const c = ctx();
  const r = responder({ etapa: "troco", itens: [{ productId: "g", quantity: 1, returnsEmpty: true }] } as Estado, { texto: "999999999" }, c);
  assert.equal(r.estado?.etapa, "troco");
  assert.match(textos(r.saidas), /até R\$\s?1\.014,00/);
  // pedido grande: pagar um pouco acima do total passa (o teto é o total mais R$ 1.000)
  const grande = ctx({ produtos: [galao, { ...gas, disponivel: 30 }] });
  const ok = responder({ etapa: "troco", itens: [{ productId: "b", quantity: 20, returnsEmpty: true }] } as Estado, { texto: "2500" }, grande);
  assert.equal(ok.estado?.etapa, "confirmar");
});

test("robô: sem botões, o cliente responde com o número ou o nome da opção", () => {
  let r = responder({ etapa: "menu" }, { texto: "2" }, ctx());
  assert.deepEqual(r.estado, { etapa: "produto" }, "2 = Outro pedido");
  r = responder(r.estado, { texto: "2" }, ctx());
  assert.deepEqual(r.estado, { etapa: "quantidade", productId: "b" }, "2 = segundo produto da lista");
  r = responder(r.estado, { texto: "2" }, ctx());
  assert.equal(r.estado?.etapa, "pagamento", "2 = duas unidades");
  r = responder(r.estado, { texto: "pix" }, ctx());
  assert.equal(r.estado?.etapa, "confirmar", "o nome da opção também vale");
  assert.ok(responder(r.estado, { texto: "1" }, ctx()).lancar, "1 = Confirmar pedido");
  const q = responder({ etapa: "quantidade", productId: "g" }, { texto: "5" }, ctx());
  assert.equal(q.estado?.etapa, "vazio", "acima das opções, vale a quantidade digitada");
  assert.match(textos(responder({ etapa: "pagamento", itens: [] }, { texto: "9" }, ctx()).saidas), /Não entendi/);
});

test("robô: um número solto na primeira mensagem não pula o começo", () => {
  assert.deepEqual(responder(null, { texto: "1" }, ctx()).estado, { etapa: "menu" });
  assert.deepEqual(responder(null, { texto: "1" }, ctx({ cliente: null, ultimo: null })).estado, { etapa: "nome" });
});

// conversa inteira: cada mensagem do cliente com a etapa em que deve parar
function conversa(c: Contexto, falas: [string, string | null][], inicial: Estado | null = null) {
  let e: Estado | null = inicial;
  let ultima: ReturnType<typeof responder> | null = null;
  for (const [fala, etapa] of falas) {
    ultima = responder(e, { texto: fala }, c);
    if (ultima.cadastrar) c = { ...c, cliente: { nome: ultima.cadastrar.nome, endereco: ultima.cadastrar.endereco } };
    assert.equal(ultima.estado?.etapa ?? (ultima.lancar ? "lancado" : null), etapa, `"${fala}" → ${textos(ultima.saidas)}`);
    e = ultima.estado;
  }
  return ultima!;
}
const p45 = { id: "p45", nome: "Gás P45", precoCents: 42000, vasilhameCents: 0, retornavel: true, disponivel: 5 };
const tres = (x: Partial<Contexto> = {}) => ctx({ produtos: [galao, { ...gas, disponivel: 9 }, p45], ...x });

test("robô entende: 'quero uma água' de quem já é cliente vai direto à pergunta do vazio", () => {
  const r = conversa(tres(), [["quero uma água", "vazio"], ["tenho sim", "pagamento"], ["no pix", "confirmar"], ["pode mandar", "lancado"]]);
  assert.deepEqual(r.lancar, { itens: [{ productId: "g", quantity: 1, returnsEmpty: true }], pagamento: "pix" });
});

test("robô entende: gás sem tamanho pergunta qual, e '13' escolhe", () => {
  conversa(tres(), [["oi, preciso de gás", "produto"], ["o de 13", "quantidade"], ["duas", "pagamento"], ["dinheiro", "troco"], ["troco pra 250", "confirmar"], ["isso", "lancado"]]);
  const r = responder({ etapa: "produto", ids: ["b", "p45"] }, { texto: "P45" }, tres());
  assert.deepEqual(r.estado, { etapa: "quantidade", productId: "p45" });
});

test("robô entende: quantidade e produto na mesma frase, e troco sem troco", () => {
  conversa(tres(), [["2 botijão 13kg", "pagamento"], ["vou pagar em dinheiro", "troco"], ["não preciso de troco", "confirmar"], ["confirmo", "lancado"]]);
  conversa(tres(), [["me vê 3 galões", "vazio"], ["não tenho, vou comprar", "pagamento"], ["cartão", "confirmar"], ["sim", "lancado"]]);
});

test("robô entende: menu de quem já pediu (repetir, outro, ou já dizer o produto)", () => {
  conversa(tres(), [["boa noite", "menu"], ["o mesmo de sempre", "lancado"]]);
  conversa(tres(), [["oi", "menu"], ["sim", "lancado"]]);
  conversa(tres(), [["oi", "menu"], ["quero outro", "produto"]]);
  conversa(tres(), [["oi", "menu"], ["não", "produto"]]);
  conversa(tres(), [["oi", "menu"], ["dessa vez quero um gás p45", "pagamento"]]);
});

test("robô entende: cliente novo que já diz o que quer segue para o produto depois do cadastro", () => {
  const novo = tres({ cliente: null, ultimo: null, link: "https://depo.test/pedir/fonte" });
  const r = conversa(novo, [["Oi, quero 2 águas", "nome"], ["meu nome é Ana Paula", "endereco"], ["Moro na Rua das Palmeiras, 45, Marco", "vazio"]]);
  assert.deepEqual(r.cadastrar, { nome: "Ana Paula", endereco: "Rua das Palmeiras, 45, Marco" });
  assert.match(textos(r.saidas), /Anotado, Ana!/);
});

test("robô entende: cliente novo escolhe entre o WhatsApp e o link", () => {
  const novo = tres({ cliente: null, ultimo: null, link: "https://depo.test/pedir/fonte" });
  let r = responder(null, { texto: "boa tarde" }, novo);
  assert.deepEqual(r.estado, { etapa: "canal" });
  assert.match(textos(r.saidas), /Como prefere fazer o pedido\?/);
  r = responder({ etapa: "canal" }, { texto: "2" }, novo);
  assert.equal(r.estado, null);
  assert.match(textos(r.saidas), /https:\/\/depo\.test\/pedir\/fonte/);
  assert.deepEqual(responder({ etapa: "canal" }, { texto: "por aqui mesmo" }, novo).estado, { etapa: "nome" });
  assert.deepEqual(responder({ etapa: "canal" }, { texto: "1" }, novo).estado, { etapa: "nome" });
  assert.equal(responder({ etapa: "canal" }, { texto: "quero gás" }, novo).estado?.etapa, "nome", "dizer o produto já é pedir por aqui");
  assert.deepEqual(responder(null, { texto: "oi" }, tres({ cliente: null, ultimo: null, link: null })).estado, { etapa: "nome" }, "sem link, direto ao nome");
});

test("robô entende: nome e endereço com jeito de falar, e o que não é nome", () => {
  const novo = tres({ cliente: null, ultimo: null });
  assert.deepEqual(responder({ etapa: "nome" }, { texto: "sou a Joana" }, novo).estado, { etapa: "endereco", nome: "Joana" });
  assert.match(textos(responder({ etapa: "nome" }, { texto: "quero gás" }, novo).saidas), /Antes, me diga o seu nome/);
  assert.equal(responder({ etapa: "nome" }, { texto: "Loja da Praça" }, novo).estado?.etapa, "endereco", "nome com 'loja' no meio não chama atendente");
  assert.equal(responder({ etapa: "nome" }, { texto: "loja" }, novo).estado?.etapa, "loja");
  assert.match(textos(responder({ etapa: "nome" }, { texto: "vc entrega no domingo de manhã cedo lá em casa" }, novo).saidas), /só o seu nome/);
});

test("robô entende: chamar a loja, desistir e mudar de ideia", () => {
  for (const f of ["quero falar com uma pessoa", "atendente", "chama alguém da loja"]) assert.equal(responder({ etapa: "pagamento", itens: [] }, { texto: f }, tres()).estado?.etapa, "loja", f);
  const r = responder({ etapa: "pagamento", itens: [{ productId: "g", quantity: 1, returnsEmpty: true }] }, { texto: "deixa pra lá" }, tres());
  assert.equal(r.estado, null);
  assert.match(textos(r.saidas), /pedido cancelado/);
  // na quantidade, trocou de produto
  assert.deepEqual(responder({ etapa: "quantidade", productId: "g" }, { texto: "na verdade quero gás p13" }, tres()).estado, { etapa: "quantidade", productId: "b" });
  // no fim, trocou a forma de pagamento
  const c = responder({ etapa: "confirmar", itens: [{ productId: "b", quantity: 1, returnsEmpty: true }], pagamento: "pix" }, { texto: "muda pra cartão" }, tres());
  assert.equal(c.estado?.etapa, "confirmar");
  assert.equal((c.estado as { pagamento: string }).pagamento, "cartao");
  // "não" no fim recomeça
  assert.equal(responder({ etapa: "confirmar", itens: [{ productId: "b", quantity: 1, returnsEmpty: true }], pagamento: "pix" }, { texto: "não" }, tres()).estado?.etapa, "menu");
});

test("robô entende: o que não dá para entender pede de novo, sem inventar", () => {
  for (const [e, f] of [[{ etapa: "pagamento", itens: [] }, "talvez"], [{ etapa: "produto" }, "qual o horário de vocês?"], [{ etapa: "vazio", productId: "g", quantity: 1 }, "hmm"]] as [Estado, string][])
    assert.match(textos(responder(e, { texto: f }, tres()).saidas), /Não entendi/, f);
  assert.match(textos(responder({ etapa: "quantidade", productId: "b" }, { texto: "50" }, tres()).saidas), /Só temos 9 de Gás P13/);
});

test("robô: o endereço do cadastro vale mais que o do último pedido (a loja pode ter corrigido)", () => {
  const corrigido = ctx({ cliente: { nome: "Maria Souza", endereco: "Av. Nova, 50" } });
  assert.match(textos(responder(null, { texto: "oi" }, corrigido).saidas), /Entrega: Av\. Nova, 50/);
});

test("robô: 'quero' numa frase não confirma, e trocar o pagamento no fim não lança com o antigo", () => {
  const conf: Estado = { etapa: "confirmar", itens: [{ productId: "b", quantity: 1, returnsEmpty: true }], pagamento: "pix" };
  assert.equal(responder(conf, { texto: "quero mudar o endereço" }, ctx()).lancar, undefined);
  const cartao = responder(conf, { texto: "quero pagar no cartão" }, ctx());
  assert.equal(cartao.lancar, undefined);
  assert.deepEqual(cartao.estado, { ...conf, pagamento: "cartao" });
  assert.equal(responder(conf, { texto: "manda no dinheiro" }, ctx()).estado?.etapa, "troco");
  assert.ok(responder(conf, { texto: "pode sim" }, ctx()).lancar, "concordância curta confirma");
  // menu de quem já pediu: pergunta não repete o último pedido
  for (const t of ["pode me ajudar?", "tenho uma dúvida", "quero fazer um pedido"]) assert.equal(responder({ etapa: "menu" }, { texto: t }, ctx()).lancar, undefined, t);
});

test("robô entende: cadastro não aceita resposta de outra pergunta como nome ou endereço", () => {
  const novo = tres({ cliente: null, ultimo: null });
  for (const t of ["sim", "dinheiro", "não"]) assert.equal(responder({ etapa: "nome" }, { texto: t }, novo).estado?.etapa, "nome", t);
  // nome com jeito de produto não prende o cadastro: o pedido já guardado, o nome passa
  assert.equal(responder({ etapa: "nome", pedido: { ids: ["g"] } }, { texto: "Gaspar Souza" }, novo).estado?.etapa, "endereco");
  const end = { etapa: "endereco" as const, nome: "Ana" };
  for (const t of ["confirmar", "troco pra 50", "sim, pode mandar", "perto da padaria"]) assert.equal(responder(end, { texto: t }, novo).estado?.etapa, "endereco", t);
  const pediu = responder(end, { texto: "quero 2 gás" }, novo);
  assert.equal(pediu.cadastrar, undefined, "pedido não vira endereço");
  assert.match(textos(pediu.saidas), /Já anotei/);
  assert.ok((pediu.estado as { pedido?: unknown }).pedido, "o pedido fica guardado para depois do endereço");
  assert.deepEqual(responder(end, { texto: "Rua das Flores, 120, Centro" }, novo).cadastrar, { nome: "Ana", endereco: "Rua das Flores, 120, Centro" });
});

test("robô entende: quantidade que é número de produto, quantidade antes do 'Qual deles?' e dois produtos", () => {
  // "13" na pergunta da quantidade é a quantidade, não o P13
  assert.deepEqual(responder({ etapa: "quantidade", productId: "g" }, { texto: "13" }, tres()).estado, { etapa: "vazio", productId: "g", quantity: 13 });
  // "2 gás" pergunta qual, e a quantidade continua
  const qual = responder({ etapa: "menu" }, { texto: "quero 2 gás" }, tres());
  assert.deepEqual(qual.estado, { etapa: "produto", ids: ["b", "p45"], qtd: 2 });
  assert.equal(responder(qual.estado, { texto: "o de 13" }, tres()).estado?.etapa, "pagamento", "não pergunta a quantidade de novo");
  // água e gás juntos: avisa que é um por pedido, sem inventar a quantidade
  const dois = responder({ etapa: "menu" }, { texto: "2 águas e 1 gás" }, tres());
  assert.match(textos(dois.saidas), /um produto por pedido/);
  assert.equal((dois.estado as { qtd?: number }).qtd, undefined);
});

test("robô entende: 'quero pelo link' manda o link, e um nome com palavra de produto é nome", () => {
  const novo = ctx({ cliente: null, ultimo: null, link: "https://depo.test/pedir/fonte" });
  const r = responder({ etapa: "canal" }, { texto: "quero pelo link" }, novo);
  assert.equal(r.estado, null);
  assert.match(textos(r.saidas), /depo\.test\/pedir\/fonte/);
  const comTeste = ctx({ cliente: null, ultimo: null, produtos: [galao, { ...gas, id: "t", nome: "Teste Pix" }] });
  assert.equal(responder({ etapa: "nome" }, { texto: "Maria Teste" }, comTeste).estado?.etapa, "endereco");
  assert.equal(responder({ etapa: "nome" }, { texto: "quero 2 águas" }, comTeste).estado?.etapa, "nome", "com verbo e quantidade é pedido: guarda e pede o nome");
});
