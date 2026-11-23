import { formatBRL, parseBRL } from "./money.ts";

// O robô do WhatsApp: uma conversa só de botões, sem IA. Esta parte só decide o que responder (sem banco, para ser
// testada); quem busca o cliente, guarda o andamento e lança o pedido é o domain/robo.ts.
// Os limites do WhatsApp: até 3 botões de até 20 letras; lista de até 10 linhas, título de até 24 letras.

export type Pagamento = "pix" | "dinheiro" | "cartao";
export type Item = { productId: string; quantity: number; returnsEmpty: boolean };
export type Produto = { id: string; nome: string; precoCents: number; vasilhameCents: number; retornavel: boolean; disponivel: number };

export type Contexto = {
  loja: string;
  /** link de pedido da loja, para quem ainda não tem cadastro (null: a loja não recebe pelo site) */
  link: string | null;
  cliente: { nome: string; endereco: string | null } | null;
  /** o último pedido de entrega do cliente, para repetir */
  ultimo: { itens: Item[]; pagamento: Pagamento | "fiado"; endereco: string } | null;
  taxaCents: number;
  /** produtos à venda, com quanto há livre na loja */
  produtos: Produto[];
};

export type Estado =
  | { etapa: "menu" }
  | { etapa: "produto" }
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

export type Resposta = { saidas: Saida[]; estado: Estado | null; lancar?: { itens: Item[]; pagamento: Pagamento; trocoCents?: number | null } };

const MAX_QTD = 20;
// troco pelo robô: pagar com mais de R$ 1.000 acima do total é engano de digitação (e um valor absurdo derrubava o "Confirmar pedido")
const TROCO_MAX = 100_000;
const comoPaga: Record<Pagamento, string> = { pix: "no Pix", dinheiro: "em dinheiro", cartao: "no cartão" };
const LOJA = { id: "loja", titulo: "Falar com a loja" };
const curto = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

const produto = (ctx: Contexto, id: string) => ctx.produtos.find((p) => p.id === id);
const endereco = (ctx: Contexto) => ctx.ultimo?.endereco || ctx.cliente?.endereco || null;
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

const primeiroNome = (ctx: Contexto) => ctx.cliente!.nome.trim().split(/\s+/)[0];

function semCadastro(ctx: Contexto): Saida {
  const texto = ctx.link
    ? `Olá! Aqui é da ${ctx.loja}. Para fazer seu pedido, é só tocar no link:\n${ctx.link}`
    : `Olá! Aqui é da ${ctx.loja}. Ainda não temos seu cadastro por aqui.`;
  return { tipo: "botoes", texto, botoes: [LOJA] };
}

function listaProdutos(ctx: Contexto, saudacao = ""): Saida {
  const livres = ctx.produtos.filter((p) => p.disponivel > 0).slice(0, 10);
  if (!livres.length) return { tipo: "botoes", texto: `${saudacao}No momento estamos sem produto para entrega.`, botoes: [LOJA] };
  return {
    tipo: "lista",
    texto: `${saudacao}Escolha o produto:`,
    botao: "Ver produtos",
    itens: livres.map((p) => ({ id: `p:${p.id}`, titulo: curto(p.nome, 24), descricao: formatBRL(p.precoCents) })),
  };
}

/** A pergunta da etapa em que a conversa está (reenviada quando o cliente responde outra coisa). */
function pergunta(estado: Estado, ctx: Contexto): Saida[] {
  switch (estado.etapa) {
    case "menu": {
      const u = ultimo(ctx)!;
      return [
        {
          tipo: "botoes",
          texto: `Olá, ${primeiroNome(ctx)}! Aqui é da ${ctx.loja}.\nQuer repetir seu último pedido?\n\n${resumo(ctx, u.itens, u.pagamento)}`,
          botoes: [{ id: "repetir", titulo: "Repetir pedido" }, { id: "outro", titulo: "Outro pedido" }, LOJA],
        },
      ];
    }
    case "produto":
      return [listaProdutos(ctx)];
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
          texto: `Você tem o vasilhame vazio para trocar?\nSem o vazio, cada ${p.nome} sai com o vasilhame por mais ${formatBRL(p.vasilhameCents)}.`,
          botoes: [{ id: "v:sim", titulo: "Sim, tenho" }, { id: "v:nao", titulo: "Não, quero comprar" }],
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
          texto: `Confere seu pedido:\n\n${resumo(ctx, estado.itens, estado.pagamento, estado.trocoCents)}`,
          botoes: [{ id: "confirmar", titulo: "Confirmar pedido" }, { id: "inicio", titulo: "Começar de novo" }, LOJA],
        },
      ];
    case "loja":
      return [];
  }
}

function inicio(ctx: Contexto): Resposta {
  if (!ctx.cliente || !endereco(ctx)) return { saidas: [semCadastro(ctx)], estado: null };
  if (ultimo(ctx)) return { saidas: pergunta({ etapa: "menu" }, ctx), estado: { etapa: "menu" } };
  return { saidas: [listaProdutos(ctx, `Olá, ${primeiroNome(ctx)}! Aqui é da ${ctx.loja}.\n`)], estado: { etapa: "produto" } };
}

const vaiPara = (estado: Estado, ctx: Contexto): Resposta => ({ saidas: pergunta(estado, ctx), estado });

const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Sem botões (WhatsApp por QR code), o cliente responde digitando: "2" é a segunda opção da pergunta, e o nome da
 * opção ("pix") também vale. Devolve o id da opção, ou "" se o texto não escolhe nenhuma.
 */
function opcaoDigitada(estado: Estado, ctx: Contexto, texto: string) {
  let saidas: Saida[];
  try {
    saidas = pergunta(estado, ctx);
  } catch {
    return ""; // cadastro mudou no meio da conversa (produto saiu de venda): o fluxo normal recomeça a conversa
  }
  const ops = saidas.flatMap((s) => (s.tipo === "botoes" ? s.botoes : s.tipo === "lista" ? s.itens : []));
  const n = /^\d{1,2}$/.test(texto) ? Number(texto) : 0;
  // na quantidade, "2" já é a opção 2; acima das opções vale o número digitado
  if (n >= 1 && n <= ops.length) return ops[n - 1].id;
  return ops.find((o) => semAcento(o.titulo) === semAcento(texto))?.id ?? "";
}

/** Responde a uma mensagem do cliente, a partir de onde a conversa parou. */
export function responder(estado: Estado | null, entrada: Entrada, ctx: Contexto): Resposta {
  const texto = (entrada.texto ?? "").trim();
  const id = entrada.id || (estado && estado.etapa !== "loja" && texto ? opcaoDigitada(estado, ctx, texto) : "");

  // passou para a loja: o robô fica quieto até a conversa expirar
  if (estado?.etapa === "loja") return { saidas: [], estado };
  if (id === "loja") return { saidas: [{ tipo: "texto", texto: "Certo! Alguém da loja vai responder você por aqui." }], estado: { etapa: "loja" } };
  // começo de conversa, "oi" no meio do caminho ou "Começar de novo"
  if (!estado || id === "inicio" || /^(oi|ol[aá]|menu|in[ií]cio|bom dia|boa tarde|boa noite)\b/i.test(texto)) return inicio(ctx);
  // o cadastro pode ter mudado no meio da conversa (cliente apagado, produto fora de venda)
  if (!ctx.cliente || !endereco(ctx)) return inicio(ctx);

  const naoEntendi = (): Resposta => ({ saidas: [{ tipo: "texto", texto: "Não entendi. Escolha uma das opções abaixo." }, ...pergunta(estado, ctx)], estado });

  switch (estado.etapa) {
    case "menu": {
      const u = ultimo(ctx);
      if (!u) return inicio(ctx);
      if (id === "repetir") {
        // fiado não se pede pelo robô: repete os produtos e pergunta como vai pagar
        if (u.pagamento === "fiado") return vaiPara({ etapa: "pagamento", itens: u.itens }, ctx);
        // em dinheiro o entregador precisa saber o troco: pergunta antes de anotar
        if (u.pagamento === "dinheiro") return vaiPara({ etapa: "troco", itens: u.itens }, ctx);
        return { saidas: [], estado: null, lancar: { itens: u.itens, pagamento: u.pagamento } };
      }
      if (id === "outro") return vaiPara({ etapa: "produto" }, ctx);
      return naoEntendi();
    }
    case "produto": {
      const p = id.startsWith("p:") ? produto(ctx, id.slice(2)) : undefined;
      if (!p) return naoEntendi();
      if (p.disponivel <= 0) return { saidas: [{ tipo: "texto", texto: `${p.nome} acabou agora.` }, listaProdutos(ctx)], estado };
      return vaiPara({ etapa: "quantidade", productId: p.id }, ctx);
    }
    case "quantidade": {
      const p = produto(ctx, estado.productId);
      if (!p) return inicio(ctx);
      const n = Number(id.startsWith("q:") ? id.slice(2) : /^\d{1,3}$/.test(texto) ? texto : NaN);
      if (!Number.isInteger(n) || n < 1) return naoEntendi();
      const ate = Math.min(MAX_QTD, p.disponivel);
      if (n > ate) return { saidas: [{ tipo: "texto", texto: p.disponivel < MAX_QTD ? `Só temos ${p.disponivel} agora.` : `Pelo WhatsApp vão até ${MAX_QTD} de cada vez.` }, ...pergunta(estado, ctx)], estado };
      if (p.retornavel && p.vasilhameCents > 0) return vaiPara({ etapa: "vazio", productId: p.id, quantity: n }, ctx);
      return vaiPara({ etapa: "pagamento", itens: [{ productId: p.id, quantity: n, returnsEmpty: true }] }, ctx);
    }
    case "vazio": {
      if (id !== "v:sim" && id !== "v:nao") return naoEntendi();
      return vaiPara({ etapa: "pagamento", itens: [{ productId: estado.productId, quantity: estado.quantity, returnsEmpty: id === "v:sim" }] }, ctx);
    }
    case "pagamento": {
      const pg = id.slice(3) as Pagamento;
      if (!id.startsWith("pg:") || !Object.hasOwn(comoPaga, pg)) return naoEntendi();
      if (pg === "dinheiro") return vaiPara({ etapa: "troco", itens: estado.itens }, ctx);
      return vaiPara({ etapa: "confirmar", itens: estado.itens, pagamento: pg }, ctx);
    }
    case "troco": {
      if (estado.itens.some((i) => !produto(ctx, i.productId))) return inicio(ctx);
      const valor = id.startsWith("t:") ? Number(id.slice(2)) : texto ? parseBRL(texto) : null;
      if (valor == null || !Number.isInteger(valor) || valor < 0) return naoEntendi();
      const t = total(ctx, estado.itens);
      if (valor > 0 && valor < t) return { saidas: [{ tipo: "texto", texto: `Esse valor é menor que o total de ${formatBRL(t)}.` }, ...pergunta(estado, ctx)], estado };
      // acima do teto é engano; muito acima, o pedido seria recusado lá na frente e a conversa caía
      if (valor > t + TROCO_MAX) return { saidas: [{ tipo: "texto", texto: `Para troco, mande um valor até ${formatBRL(t + TROCO_MAX)}.` }, ...pergunta(estado, ctx)], estado };
      return vaiPara({ etapa: "confirmar", itens: estado.itens, pagamento: "dinheiro", trocoCents: valor > t ? valor : null }, ctx);
    }
    case "confirmar": {
      if (estado.itens.some((i) => !produto(ctx, i.productId))) return inicio(ctx);
      if (id === "confirmar")
        return { saidas: [], estado: null, lancar: { itens: estado.itens, pagamento: estado.pagamento, ...(estado.trocoCents ? { trocoCents: estado.trocoCents } : {}) } };
      return naoEntendi();
    }
  }
}
