import { formatBRL, parseBRL } from "./money.ts";
import { intencao, numeroNaFrase, pagamentoNaFrase, pedidoNaFrase, semPrefixo, valorNaFrase, type PedidoNaFrase } from "./entende.ts";

// O robô do WhatsApp: uma conversa de opções, sem IA, que também entende frase solta ("quero 2 gás", "no pix") pelo lib/entende.ts. Esta parte só decide o que responder (sem banco, para ser
// testada); quem busca o cliente, guarda o andamento e lança o pedido é o domain/robo.ts.
// Os limites do WhatsApp: até 3 botões de até 20 letras; lista de até 10 linhas, título de até 24 letras.

export type Pagamento = "pix" | "dinheiro" | "cartao";
export type Item = { productId: string; quantity: number; returnsEmpty: boolean };
export type Produto = { id: string; nome: string; precoCents: number; vasilhameCents: number; retornavel: boolean; disponivel: number };

export type Contexto = {
  loja: string;
  /** "Bom dia", "Boa tarde" ou "Boa noite" pela hora da loja (sem: "Olá") */
  saudacao?: string;
  /** link de pedido da loja (null: a loja não recebe pelo site); o cliente novo escolhe entre ele e o WhatsApp */
  link?: string | null;
  cliente: { nome: string; endereco: string | null } | null;
  /** o último pedido de entrega do cliente, para repetir */
  ultimo: { itens: Item[]; pagamento: Pagamento | "fiado"; endereco: string } | null;
  taxaCents: number;
  /** produtos à venda, com quanto há livre na loja */
  produtos: Produto[];
};

export type Estado =
  // cliente novo: escolhe entre o WhatsApp e o link, e o robô pergunta o nome e o endereço e deixa o cadastro feito;
  // `pedido` guarda o que ele já disse que quer ("quero uma água") para seguir dali depois do cadastro
  | { etapa: "canal" }
  | { etapa: "nome"; pedido?: PedidoNaFrase }
  | { etapa: "endereco"; nome: string; pedido?: PedidoNaFrase }
  | { etapa: "menu" }
  // `qtd`: a quantidade que ele já disse, enquanto escolhe qual produto ("2 gás" numa loja com P13 e P45)
  | { etapa: "produto"; ids?: string[]; qtd?: number }
  | { etapa: "quantidade"; productId: string }
  | { etapa: "vazio"; productId: string; quantity: number }
  | { etapa: "pagamento"; itens: Item[] }
  | { etapa: "troco"; itens: Item[] }
  | { etapa: "confirmar"; itens: Item[]; pagamento: Pagamento; trocoCents?: number | null }
  | { etapa: "loja" };

/** O que o cliente mandou: texto digitado ou o id do botão / linha da lista que tocou. */
export type Entrada = { texto?: string; id?: string };

export type Saida =
  | { tipo: "texto"; texto: string }
  | { tipo: "botoes"; texto: string; botoes: { id: string; titulo: string }[] }
  | { tipo: "lista"; texto: string; botao: string; itens: { id: string; titulo: string; descricao?: string }[] };

export type Resposta = {
  saidas: Saida[];
  estado: Estado | null;
  lancar?: { itens: Item[]; pagamento: Pagamento; trocoCents?: number | null };
  /** cliente novo (ou sem endereço): quem chama grava o cadastro com o telefone da conversa */
  cadastrar?: { nome: string; endereco: string };
};

const MAX_QTD = 20;
// troco pelo robô: pagar com mais de R$ 1.000 acima do total é engano de digitação (e um valor absurdo derrubava o "Confirmar pedido")
const TROCO_MAX = 100_000;
const comoPaga: Record<Pagamento, string> = { pix: "no Pix", dinheiro: "em dinheiro", cartao: "no cartão" };
const LOJA = { id: "loja", titulo: "Falar com a loja" };
const curto = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

const produto = (ctx: Contexto, id: string) => ctx.produtos.find((p) => p.id === id);
// o do cadastro primeiro: a loja pode ter corrigido o endereço depois do último pedido
const endereco = (ctx: Contexto) => ctx.cliente?.endereco || ctx.ultimo?.endereco || null;
// o último pedido só se repete se todos os produtos dele ainda estão à venda
const ultimo = (ctx: Contexto) => (ctx.ultimo?.itens.every((i) => produto(ctx, i.productId)) ? ctx.ultimo : null);

function total(ctx: Contexto, itens: Item[]) {
  return (
    ctx.taxaCents +
    itens.reduce((s, i) => {
      const p = produto(ctx, i.productId)!;
      return s + i.quantity * (p.precoCents + (p.retornavel && !i.returnsEmpty ? p.vasilhameCents : 0));
    }, 0)
  );
}

// cédulas para o troco: o robô oferece as duas primeiras acima do total
const NOTAS = [2000, 5000, 10000, 20000];

function resumo(ctx: Contexto, itens: Item[], pagamento?: Pagamento | "fiado", trocoCents?: number | null) {
  const linhas = itens.map((i) => {
    const p = produto(ctx, i.productId)!;
    return `${i.quantity}x ${p.nome}${p.retornavel && !i.returnsEmpty && p.vasilhameCents ? " com vasilhame" : ""}`;
  });
  if (ctx.taxaCents) linhas.push(`Taxa de entrega: ${formatBRL(ctx.taxaCents)}`);
  // fiado não se pede pelo robô: no resumo do último pedido vai só o valor
  linhas.push(`Total: ${formatBRL(total(ctx, itens))}${pagamento && pagamento !== "fiado" ? ` ${comoPaga[pagamento]}` : ""}`);
  if (trocoCents) linhas.push(`Troco para ${formatBRL(trocoCents)}`);
  linhas.push(`Entrega: ${endereco(ctx)}`);
  return linhas.join("\n");
}

const nomeCurto = (nome: string) => nome.trim().split(/\s+/)[0];
const primeiroNome = (ctx: Contexto) => nomeCurto(ctx.cliente!.nome);
const ola = (ctx: Contexto) => ctx.saudacao ?? "Olá";
// sem botões, "loja" digitado em qualquer etapa chama uma pessoa
const DICA_LOJA = "\n\n_Para falar com alguém da loja, escreva *loja*._";
const PEDE_ENDERECO = "Qual o endereço de entrega? Rua, número e bairro, numa mensagem só.";


/** A lista de produtos; `ids`: só esses (o cliente disse "gás" e a loja tem P13 e P45). */
function listaProdutos(ctx: Contexto, saudacao = "", ids?: string[]): Saida {
  const livres = ctx.produtos.filter((p) => p.disponivel > 0 && (!ids?.length || ids.includes(p.id))).slice(0, 10);
  if (!livres.length) return { tipo: "botoes", texto: `${saudacao}No momento estamos sem produto para entrega.`, botoes: [LOJA] };
  return {
    tipo: "lista",
    texto: `${saudacao}${ids?.length ? "Qual deles?" : "O que vai ser hoje?"}`,
    botao: "Ver produtos",
    itens: livres.map((p) => ({ id: `p:${p.id}`, titulo: curto(p.nome, 24), descricao: formatBRL(p.precoCents) })),
  };
}

/** A pergunta da etapa em que a conversa está (reenviada quando o cliente responde outra coisa). */
function pergunta(estado: Estado, ctx: Contexto): Saida[] {
  switch (estado.etapa) {
    case "canal":
      return [
        {
          tipo: "botoes",
          texto: "Como prefere fazer o pedido?",
          botoes: [{ id: "c:zap", titulo: "Por aqui mesmo" }, { id: "c:link", titulo: "Pelo link" }, LOJA],
        },
      ];
    case "nome":
      return [{ tipo: "texto", texto: `Qual é o seu nome?${DICA_LOJA}` }];
    case "endereco":
      return [{ tipo: "texto", texto: `${PEDE_ENDERECO}${DICA_LOJA}` }];
    case "menu": {
      const u = ultimo(ctx)!;
      return [
        {
          tipo: "botoes",
          texto: `${ola(ctx)}, ${primeiroNome(ctx)}! Aqui é da ${ctx.loja}.\nQuer repetir o último pedido?\n\n${resumo(ctx, u.itens, u.pagamento)}`,
          botoes: [{ id: "repetir", titulo: "Repetir pedido" }, { id: "outro", titulo: "Outro pedido" }, LOJA],
        },
      ];
    }
    case "produto":
      return [listaProdutos(ctx, "", estado.ids)];
    case "quantidade": {
      const p = produto(ctx, estado.productId)!;
      const ate = Math.min(MAX_QTD, p.disponivel);
      return [
        {
          tipo: "botoes",
          texto: `Quantos de ${p.nome}?${ate > 3 ? ` Se for mais de 3, escreva o número (até ${ate}).` : ""}`,
          botoes: [1, 2, 3].filter((n) => n <= ate).map((n) => ({ id: `q:${n}`, titulo: String(n) })),
        },
      ];
    }
    case "vazio": {
      const p = produto(ctx, estado.productId)!;
      return [
        {
          tipo: "botoes",
          texto: `Tem o vasilhame vazio para trocar?\nSem ele, cada ${p.nome} sai por mais ${formatBRL(p.vasilhameCents)} (o vasilhame).`,
          botoes: [{ id: "v:sim", titulo: "Sim, tenho" }, { id: "v:nao", titulo: "Não, vou comprar" }],
        },
      ];
    }
    case "pagamento":
      return [
        {
          tipo: "botoes",
          texto: "Como vai pagar?",
          botoes: [{ id: "pg:pix", titulo: "Pix" }, { id: "pg:dinheiro", titulo: "Dinheiro" }, { id: "pg:cartao", titulo: "Cartão" }],
        },
      ];
    case "troco": {
      const t = total(ctx, estado.itens);
      const notas = NOTAS.filter((n) => n > t).slice(0, 2);
      return [
        {
          tipo: "botoes",
          texto: `Vai precisar de troco? O total é ${formatBRL(t)}.\nSe for outro valor, escreva quanto vai pagar (ex.: 200).`,
          botoes: [{ id: "t:0", titulo: "Não preciso" }, ...notas.map((n) => ({ id: `t:${n}`, titulo: `Para ${formatBRL(n)}` }))],
        },
      ];
    }
    case "confirmar":
      return [
        {
          tipo: "botoes",
          texto: `Confere o pedido:\n\n${resumo(ctx, estado.itens, estado.pagamento, estado.trocoCents)}`,
          botoes: [{ id: "confirmar", titulo: "Confirmar pedido" }, { id: "inicio", titulo: "Começar de novo" }, LOJA],
        },
      ];
    case "loja":
      return [];
  }
}

const vaiPara = (estado: Estado, ctx: Contexto, antes: Saida[] = []): Resposta => ({ saidas: [...antes, ...pergunta(estado, ctx)], estado });
const texto = (t: string): Saida => ({ tipo: "texto", texto: t });

/** Começo da conversa. `pedido`: o que a primeira mensagem já pediu ("oi, quero 2 gás"), para ir direto a ele. */
function inicio(ctx: Contexto, pedido?: PedidoNaFrase): Resposta {
  const quer = pedido?.ids.length ? pedido : undefined;
  if (!ctx.cliente) {
    // quem já disse o que quer pede por aqui mesmo; os outros escolhem entre o WhatsApp e o link da loja
    if (ctx.link && !quer) return vaiPara({ etapa: "canal" }, ctx, [texto(`${ola(ctx)}! Aqui é da ${ctx.loja}.`)]);
    return { saidas: [texto(`${ola(ctx)}! Aqui é da ${ctx.loja}.\nPara o seu primeiro pedido, qual é o seu nome?${DICA_LOJA}`)], estado: { etapa: "nome", ...(quer ? { pedido: quer } : {}) } };
  }
  const oi = `${ola(ctx)}, ${primeiroNome(ctx)}! Aqui é da ${ctx.loja}.`;
  if (!endereco(ctx)) return { saidas: [texto(`${oi}\n${PEDE_ENDERECO}${DICA_LOJA}`)], estado: { etapa: "endereco", nome: ctx.cliente.nome, ...(quer ? { pedido: quer } : {}) } };
  if (quer) return escolher(ctx, quer, `${oi}\n`);
  if (ultimo(ctx)) return vaiPara({ etapa: "menu" }, ctx);
  return { saidas: [listaProdutos(ctx, `${oi}\n`)], estado: { etapa: "produto" } };
}

/** O cliente disse o produto (e talvez a quantidade): segue para a próxima pergunta que falta. */
function escolher(ctx: Contexto, pedido: PedidoNaFrase, prefixo = ""): Resposta {
  if (pedido.varios)
    return { saidas: [listaProdutos(ctx, `${prefixo}Por aqui eu anoto um produto por pedido. Escolha o primeiro; o outro você pede logo depois.\n`, pedido.ids)], estado: { etapa: "produto", ids: pedido.ids } };
  if (pedido.ids.length !== 1) return { saidas: [listaProdutos(ctx, prefixo, pedido.ids)], estado: { etapa: "produto", ids: pedido.ids, ...(pedido.qtd ? { qtd: pedido.qtd } : {}) } };
  const p = produto(ctx, pedido.ids[0])!;
  if (p.disponivel <= 0) return { saidas: [listaProdutos(ctx, `${prefixo}${p.nome} acabou agora. `)], estado: { etapa: "produto" } };
  if (pedido.qtd) return comQuantidade(ctx, p, pedido.qtd, prefixo);
  return vaiPara({ etapa: "quantidade", productId: p.id }, ctx, prefixo ? [texto(prefixo.trim())] : []);
}

function comQuantidade(ctx: Contexto, p: Produto, n: number, prefixo = ""): Resposta {
  const antes = prefixo ? [texto(prefixo.trim())] : [];
  const ate = Math.min(MAX_QTD, p.disponivel);
  if (n > ate) {
    const aviso = texto(p.disponivel < MAX_QTD ? `Só temos ${p.disponivel} de ${p.nome} agora.` : `Pelo WhatsApp vão até ${MAX_QTD} de cada vez.`);
    return vaiPara({ etapa: "quantidade", productId: p.id }, ctx, [...antes, aviso]);
  }
  if (p.retornavel && p.vasilhameCents > 0) return vaiPara({ etapa: "vazio", productId: p.id, quantity: n }, ctx, antes);
  return vaiPara({ etapa: "pagamento", itens: [{ productId: p.id, quantity: n, returnsEmpty: true }] }, ctx, antes);
}

/**
 * Sem botões (WhatsApp por QR code), o cliente responde digitando: "2" é a segunda opção da pergunta, e o nome da
 * opção ("pix") também vale. Devolve o id da opção, ou "" se o texto não escolhe nenhuma.
 */
function opcaoDigitada(estado: Estado | null, ctx: Contexto, t: string) {
  let saidas: Saida[];
  try {
    // sem conversa guardada, um número solto não escolhe nada: a primeira mensagem sempre abre o começo
    saidas = estado ? pergunta(estado, ctx) : [];
  } catch {
    return ""; // cadastro mudou no meio da conversa (produto saiu de venda): o fluxo normal recomeça a conversa
  }
  const ops = saidas.flatMap((s) => (s.tipo === "botoes" ? s.botoes : s.tipo === "lista" ? s.itens : []));
  const n = /^\d{1,2}$/.test(t) ? Number(t) : 0;
  // na quantidade, "2" já é a opção 2; acima das opções vale o número digitado
  if (n >= 1 && n <= ops.length) return ops[n - 1].id;
  const limpo = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return ops.find((o) => limpo(o.titulo) === limpo(t))?.id ?? "";
}

const LOJA_OK = "Certo! Alguém da loja vai responder você por aqui.";

/** Responde a uma mensagem do cliente, a partir de onde a conversa parou. */
export function responder(estado: Estado | null, entrada: Entrada, ctx: Contexto): Resposta {
  const t = (entrada.texto ?? "").trim();
  // passou para a loja: o robô fica quieto até a conversa expirar
  if (estado?.etapa === "loja") return { saidas: [], estado };

  const id = entrada.id || (t ? opcaoDigitada(estado, ctx, t) : "");
  const quer = id ? null : intencao(t);
  // nome e endereço são texto livre: "Loja das Flores" ou "Rua do Sim" não são um pedido de atendente
  const livre = estado?.etapa === "nome" || estado?.etapa === "endereco";
  if (id === "loja" || (quer === "loja" && (!livre || /^\s*(loja|atendente)\s*$/i.test(t)))) return { saidas: [texto(LOJA_OK)], estado: { etapa: "loja" } };
  if (estado && quer === "cancelar") return { saidas: [texto("Tudo bem, pedido cancelado. Quando quiser, é só mandar uma mensagem.")], estado: null };

  // o que a mensagem pede de produto ("quero 2 gás"), fora das etapas de texto livre
  const pedido = !id && t && !livre ? pedidoNaFrase(ctx.produtos, t) : null;
  // começo de conversa, "oi" no meio do caminho ou "Começar de novo"
  if (!estado || id === "inicio" || quer === "saudacao") return inicio(ctx, pedido ?? undefined);

  if (estado.etapa === "canal") {
    // "quero pelo link", "pelo site" escritos também são o link, mesmo com "quero"
    if ((id === "c:link" || (!id && /\b(link|site)\b/i.test(t))) && ctx.link) return { saidas: [texto(`É só tocar no link e escolher o que quer:\n${ctx.link}\n\nSe preferir pedir por aqui, é só mandar uma mensagem.`)], estado: null };
    if (id === "c:zap" || quer === "sim") return { saidas: [texto(`Combinado! Qual é o seu nome?${DICA_LOJA}`)], estado: { etapa: "nome" } };
    if (pedido?.ids.length) return inicio({ ...ctx, link: null }, pedido);
    return vaiPara(estado, ctx, [texto("Não entendi. Responda com uma das opções.")]);
  }

  // cadastro pela conversa: nome, depois endereço; com o endereço, segue para o que ele pediu (ou para os produtos)
  if (estado.etapa === "nome") {
    if (ctx.cliente) return inicio(ctx, estado.pedido);
    const nome = semPrefixo(t).replace(/\s+/g, " ");
    // o que ele quer, dito antes do nome, fica guardado; uma vez só, para um nome como "Gaspar" não prender aqui
    // e só é pedido com quantidade ou verbo de pedido: "Maria Teste" é nome, mesmo com um produto "Teste" na loja
    const naFrase = estado.pedido || !/\d|\b(quero|queria|manda|mande|preciso|traz|traga|tem)\b/i.test(t) ? null : pedidoNaFrase(ctx.produtos, t);
    if (naFrase?.ids.length) return { saidas: [texto(`Já anotei. Antes, me diga o seu nome, por favor.`)], estado: { etapa: "nome", pedido: naFrase } };
    const resposta = intencao(t);
    if (nome.length < 2 || nome.length > 60 || !/\p{L}{2}/u.test(nome) || /\d/.test(nome) || nome.split(" ").length > 6 || (resposta === "sim" || resposta === "nao" || resposta === "repetir") || pagamentoNaFrase(t))
      return { saidas: [texto(`Me diga só o seu nome, por favor.${DICA_LOJA}`)], estado };
    return { saidas: [texto(`Prazer, ${nomeCurto(nome)}! ${PEDE_ENDERECO}`)], estado: { etapa: "endereco", nome, ...(estado.pedido ? { pedido: estado.pedido } : {}) } };
  }
  if (estado.etapa === "endereco") {
    if (endereco(ctx)) return inicio(ctx, estado.pedido);
    const end = semPrefixo(t).replace(/\s+/g, " ");
    // "quero 2 gás" no lugar do endereço: guarda o pedido e pergunta o endereço de novo
    const naFrase = estado.pedido ? null : pedidoNaFrase(ctx.produtos, t);
    if (naFrase?.ids.length && !/\d{2,}|\bs\/?n\b/i.test(t.replace(/\b\d{1,2}\s*(l|lt|kg)\b|\bp\s?\d{1,2}\b/gi, "")))
      return { saidas: [texto(`Já anotei. Antes, ${PEDE_ENDERECO[0].toLowerCase()}${PEDE_ENDERECO.slice(1)}`)], estado: { ...estado, pedido: naFrase } };
    // endereço tem número (ou "s/n"); "sim", "confirmar", "troco pra 50" não são endereço
    const resposta = intencao(t);
    if (end.length < 8 || end.length > 160 || !/\p{L}{3}/u.test(end) || !/\d|\bs\/?n\b/i.test(end) || (resposta === "sim" || resposta === "nao" || resposta === "repetir") || /\btroco\b/i.test(t))
      return { saidas: [texto(`Não consegui entender o endereço. ${PEDE_ENDERECO}`)], estado };
    const anotado = `Anotado, ${nomeCurto(estado.nome)}!\n`;
    const seguir = estado.pedido?.ids.length ? escolher(ctx, estado.pedido, anotado) : { saidas: [listaProdutos(ctx, anotado)], estado: { etapa: "produto" } as Estado };
    return { ...seguir, cadastrar: { nome: estado.nome, endereco: end } };
  }
  // o cadastro pode ter mudado no meio da conversa (cliente apagado, produto fora de venda)
  if (!ctx.cliente || !endereco(ctx)) return inicio(ctx, pedido ?? undefined);

  const naoEntendi = (): Resposta => vaiPara(estado, ctx, [texto("Não entendi. Responda com uma das opções.")]);

  switch (estado.etapa) {
    case "menu": {
      const u = ultimo(ctx);
      if (!u) return inicio(ctx, pedido ?? undefined);
      const outro = id === "outro" || /\b(outr[oa]s?|diferente|novo pedido|mudar)\b/i.test(t);
      if (id === "repetir" || (!id && !outro && (quer === "repetir" || quer === "sim") && !pedido?.ids.length)) {
        // fiado não se pede pelo robô: repete os produtos e pergunta como vai pagar
        if (u.pagamento === "fiado") return vaiPara({ etapa: "pagamento", itens: u.itens }, ctx);
        // em dinheiro o entregador precisa saber o troco: pergunta antes de anotar
        if (u.pagamento === "dinheiro") return vaiPara({ etapa: "troco", itens: u.itens }, ctx);
        return { saidas: [], estado: null, lancar: { itens: u.itens, pagamento: u.pagamento } };
      }
      if (pedido?.ids.length) return escolher(ctx, pedido);
      if (outro || quer === "nao") return vaiPara({ etapa: "produto" }, ctx);
      return naoEntendi();
    }
    case "produto": {
      const naLista = id.startsWith("p:") ? { ids: [id.slice(2)], qtd: pedido?.qtd } : null;
      // "o de 13" escolhe entre os que estavam na pergunta
      const escolhido = naLista ?? (pedido?.ids.length ? { ...pedido, ids: estado.ids?.length && pedido.ids.some((x) => estado.ids!.includes(x)) ? pedido.ids.filter((x) => estado.ids!.includes(x)) : pedido.ids } : null);
      if (!escolhido) return naoEntendi();
      // a quantidade dita antes da pergunta "Qual deles?" continua valendo
      return escolher(ctx, { ...escolhido, qtd: escolhido.qtd ?? estado.qtd });
    }
    case "quantidade": {
      const p = produto(ctx, estado.productId);
      if (!p) return inicio(ctx);
      // trocou de produto no meio ("na verdade quero gás"); um número sozinho é a quantidade, mesmo sendo o 13 do P13
      if (pedido?.ids.length && !pedido.ids.includes(p.id) && !/^\s*\d+\s*$/.test(t)) return escolher(ctx, pedido);
      const n = id.startsWith("q:") ? Number(id.slice(2)) : (pedido?.qtd ?? numeroNaFrase(t));
      if (!n || !Number.isInteger(n) || n < 1) return naoEntendi();
      return comQuantidade(ctx, p, n);
    }
    case "vazio": {
      const tem = id === "v:sim" ? true : id === "v:nao" ? false : /compr/i.test(t) || quer === "nao" ? false : quer === "sim" ? true : null;
      if (tem === null) return naoEntendi();
      return vaiPara({ etapa: "pagamento", itens: [{ productId: estado.productId, quantity: estado.quantity, returnsEmpty: tem }] }, ctx);
    }
    case "pagamento": {
      const pg = id.startsWith("pg:") ? (id.slice(3) as Pagamento) : pagamentoNaFrase(t);
      if (!pg || !Object.hasOwn(comoPaga, pg)) return naoEntendi();
      if (pg === "dinheiro") return vaiPara({ etapa: "troco", itens: estado.itens }, ctx);
      return vaiPara({ etapa: "confirmar", itens: estado.itens, pagamento: pg }, ctx);
    }
    case "troco": {
      if (estado.itens.some((i) => !produto(ctx, i.productId))) return inicio(ctx);
      const semTroco = quer === "nao" || /\b(sem troco|nao precis|n[aã]o precis|trocado|certinho|valor certo|exato)\b/i.test(t);
      const valor = id.startsWith("t:") ? Number(id.slice(2)) : semTroco ? 0 : t ? (parseBRL(t) ?? valorNaFrase(t)) : null;
      if (valor == null || !Number.isInteger(valor) || valor < 0) return naoEntendi();
      const tot = total(ctx, estado.itens);
      if (valor > 0 && valor < tot) return vaiPara(estado, ctx, [texto(`Esse valor é menor que o total de ${formatBRL(tot)}.`)]);
      // acima do teto é engano; muito acima, o pedido seria recusado lá na frente e a conversa caía
      if (valor > tot + TROCO_MAX) return vaiPara(estado, ctx, [texto(`Para troco, mande um valor até ${formatBRL(tot + TROCO_MAX)}.`)]);
      return vaiPara({ etapa: "confirmar", itens: estado.itens, pagamento: "dinheiro", trocoCents: valor > tot ? valor : null }, ctx);
    }
    case "confirmar": {
      if (estado.itens.some((i) => !produto(ctx, i.productId))) return inicio(ctx);
      // mudou de ideia no fim ("quero no cartão"): vem antes do sim, para não lançar com o pagamento antigo
      const pg = id ? null : pagamentoNaFrase(t);
      if (pg && pg !== estado.pagamento) return vaiPara(pg === "dinheiro" ? { etapa: "troco", itens: estado.itens } : { etapa: "confirmar", itens: estado.itens, pagamento: pg }, ctx);
      if (id === "confirmar" || (!id && quer === "sim"))
        return { saidas: [], estado: null, lancar: { itens: estado.itens, pagamento: estado.pagamento, ...(estado.trocoCents ? { trocoCents: estado.trocoCents } : {}) } };
      if (!id && quer === "nao") return inicio(ctx);
      return naoEntendi();
    }
  }
}
