// O que o cliente quis dizer, sem IA: o robô do WhatsApp lê frase solta ("quero 2 gás", "tem água?", "pode mandar",
// "no pix", "troco pra 50") e tira dela o produto, a quantidade e o sim/não. Só regras e listas de palavras,
// para ser previsível e testável. Quem decide o que fazer com isso é o lib/robo.ts.

/** Minúsculas, sem acento e sem pontuação, com espaço simples. */
export function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/(\d)[.,](\d)/g, "$1$2") // 1.000 → 1000 (valor de troco)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const palavras = (s: string) => normalizar(s).split(" ").filter(Boolean);
const algum = (t: string, re: RegExp) => re.test(` ${t} `);

const NUMEROS: Record<string, number> = {
  um: 1, uma: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9, dez: 10,
  onze: 11, doze: 12, treze: 13, quatorze: 14, catorze: 14, quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18,
  dezenove: 19, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, cem: 100, duzentos: 200,
};
const UNIDADE = /^(l|lt|lts|litro|litros|kg|kilo|kilos|quilo|quilos)$/;
const VAZIAS = new Set(["de", "da", "do", "das", "dos", "com", "sem", "e", "o", "a", "os", "as", "um", "uma"]);

// famílias: o cliente fala "botijão", "bujão" ou "gás de cozinha" e a loja cadastrou "Gás P13"
const FAMILIAS: Record<string, string[]> = {
  gas: ["gas", "gases", "botijao", "botijoes", "bujao", "bujoes", "botija", "botijas", "glp", "butijao", "bojao"],
  agua: ["agua", "aguas", "galao", "galoes", "garrafao", "garrafoes", "mineral", "galaozinho"],
};
const familiaDe = (w: string) => Object.keys(FAMILIAS).find((f) => FAMILIAS[f].includes(w));

type Prod = { id: string; nome: string };

/** As marcas de um produto: família, palavras do nome e números que o distinguem (13 do P13, 20 do 20L). */
function marcas(p: Prod) {
  const ws = palavras(p.nome);
  const familias = new Set(ws.map(familiaDe).filter(Boolean) as string[]);
  // P13, P45, P2 são botijões mesmo sem "gás" no nome
  if (ws.some((w) => /^p\d{1,2}$/.test(w))) familias.add("gas");
  const numeros = new Set<number>();
  ws.forEach((w, i) => {
    const m = w.match(/^p?(\d{1,3})(l|lt|kg)?$/);
    if (m && (w.startsWith("p") || m[2] || UNIDADE.test(ws[i + 1] ?? ""))) numeros.add(Number(m[1]));
  });
  const outras = ws.filter((w) => !familiaDe(w) && !VAZIAS.has(w) && !/^p?\d/.test(w) && w.length > 2);
  return { familias, numeros, outras };
}

/** `varios`: a frase pede produtos diferentes ("2 águas e 1 gás"), e a quantidade não é de um só. */
export type PedidoNaFrase = { ids: string[]; qtd?: number; varios?: true };

/**
 * Os produtos e a quantidade que a frase pede. `ids` vazio: não falou de produto; mais de um: ficou em dúvida
 * entre eles (ex.: "gás" numa loja com P13 e P45), e o robô pergunta qual.
 */
export function pedidoNaFrase(produtos: Prod[], texto: string): PedidoNaFrase {
  const ws = palavras(texto);
  const pistas = new Set<number>();
  let qtd: number | undefined;
  const todasMarcas = produtos.map((p) => ({ p, m: marcas(p) }));
  const distintos = new Set(todasMarcas.flatMap((x) => [...x.m.numeros]));
  ws.forEach((w, i) => {
    const prox = ws[i + 1] ?? "";
    const ant = ws[i - 1] ?? "";
    const junto = w.match(/^p(\d{1,2})$/) ?? w.match(/^(\d{1,3})(l|lt|kg)$/);
    if (junto) return void pistas.add(Number(junto[1]));
    const n = /^\d{1,3}$/.test(w) ? Number(w) : NUMEROS[w];
    if (n === undefined) return;
    // "p 13", "20 litros", "13 kg" falam do produto; "2 gás", "duas águas" são quantidade
    if (ant === "p" || UNIDADE.test(prox)) return void pistas.add(n);
    if (/^\d+$/.test(w) && n >= 10 && distintos.has(n) && !familiaDe(prox)) return void pistas.add(n);
    if (qtd === undefined && n >= 1 && n <= 99 && w !== "um" && w !== "uma") qtd = n;
    else if (qtd === undefined && (w === "um" || w === "uma") && (familiaDe(prox) || prox === "de")) qtd = 1;
  });
  const familias = new Set(ws.map(familiaDe).filter(Boolean) as string[]);
  const soltas = new Set(ws);
  let melhor = 0;
  let ids: string[] = [];
  for (const { p, m } of todasMarcas) {
    let pontos = 0;
    for (const f of m.familias) if (familias.has(f)) pontos += 1;
    for (const o of m.outras) if (soltas.has(o) || soltas.has(`${o}s`)) pontos += 1;
    const casaNumero = [...pistas].some((n) => m.numeros.has(n));
    if (pistas.size && casaNumero) pontos += 2;
    if (pistas.size && !casaNumero && m.numeros.size && pontos) pontos -= 0.5; // falou "13" e este é o 45
    if (pontos > melhor) [melhor, ids] = [pontos, [p.id]];
    else if (pontos > 0 && pontos === melhor) ids.push(p.id);
  }
  // água e gás na mesma frase: são dois pedidos, e o número da frase não é a quantidade de nenhum deles sozinho
  if (familias.size > 1 && ids.length > 1) return { ids, varios: true };
  return { ids, ...(qtd ? { qtd } : {}) };
}

/** O primeiro número da frase, em algarismo ou por extenso ("duas", "3 unidades", "meia dúzia"). */
export function numeroNaFrase(texto: string) {
  const t = normalizar(texto);
  if (algum(t, / meia duzia /)) return 6;
  if (algum(t, / (uma )?duzia /)) return 12;
  for (const w of t.split(" ")) {
    if (/^\d{1,4}$/.test(w)) return Number(w);
    if (w in NUMEROS) return NUMEROS[w];
  }
  return null;
}

/** Valor em reais da frase ("troco pra 50", "R$ 100,00", "cinquenta"), em centavos. */
export function valorNaFrase(texto: string) {
  // "1.000" é mil; "100,00" é cem com centavos
  const m = texto.replace(/\s/g, "").replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2").match(/(\d{1,5})(?:[.,](\d{2}))?(?!\d)/);
  if (m) return Number(m[1]) * 100 + (m[2] ? Number(m[2]) : 0);
  const n = numeroNaFrase(texto);
  return n === null ? null : n * 100;
}

export type Intencao = "sim" | "nao" | "loja" | "cancelar" | "repetir" | "saudacao";

/** Sim, não, chamar a loja, desistir, repetir o de sempre, ou só um cumprimento. */
export function intencao(texto: string): Intencao | null {
  const t = normalizar(texto);
  if (!t) return null;
  if (algum(t, / (atendente|humano|pessoa|alguem|loja|falar com|ligar|ligacao|reclamacao|reclamar) /)) return "loja";
  if (algum(t, / (cancela|cancelar|cancelo|desisto|desistir|deixa pra la|esquece|nao quero mais) /)) return "cancelar";
  if (algum(t, / (repete|repetir|o mesmo|a mesma|mesma coisa|de sempre|igual|o de sempre|ultimo pedido|mesmo pedido) /)) return "repetir";
  if (algum(t, / (nao|n|nop|nope|negativo|nunca|nem) /)) return "nao";
  // "sim" só quando a frase é uma concordância: pergunta, pedido de mudança ou frase comprida não confirmam nada
  // ("quero pagar no cartão", "pode me ajudar?", "ok, mas muda o endereço")
  const curta = t.trim().split(" ").length;
  if (!texto.includes("?") && !algum(t, / (mudar|muda|mude|trocar|troca|troque|alterar|altera|corrigir|corrige|errado|errada|duvida|ajuda|ajudar|mas|porem) /)) {
    if (curta <= 5 && algum(t, / (sim|s|ss|isso|isso mesmo|confirmo|confirma|confirmar|ok|okay|blz|beleza|pode ser|pode mandar|fechado|fechou|certo|correto|claro|positivo|exato|perfeito|show|top|uhum|aham|yes|ta bom|tá bom|ta certo|esta certo|tudo certo) /))
      return "sim";
    // "quero", "pode", "manda", "tenho" sozinhos (ou quase) também concordam; numa frase, são o começo de outra coisa
    if (curta <= 2 && algum(t, / (pode|manda|mande|quero|tenho|bora|vamos) /)) return "sim";
  }
  if (algum(t, /^ ?(oi+|ola|opa|eae|eai|e ai|bom dia|boa tarde|boa noite|boa|ei|hey|alo|salve|menu|inicio|comecar)( |$)/) && t.split(" ").length <= 4) return "saudacao";
  return null;
}

/** Como vai pagar, se a frase diz. */
export function pagamentoNaFrase(texto: string): "pix" | "dinheiro" | "cartao" | null {
  const t = normalizar(texto);
  if (algum(t, / (pix|pics|piks|pixs|transferencia|qr) /)) return "pix";
  if (algum(t, / (cartao|credito|debito|maquininha|maquina|card) /)) return "cartao";
  if (algum(t, / (dinheiro|especie|cash|nota|notas|vivo) /)) return "dinheiro";
  return null;
}

/** Tira "meu nome é", "sou a", "aqui é o" da frase do nome; "moro na", "meu endereço é" da do endereço. */
export function semPrefixo(texto: string) {
  return texto
    .trim()
    .replace(/^(oi+|ola|olá|bom dia|boa tarde|boa noite)[,!.\s]+/i, "")
    .replace(/^(meu nome (é|e)|me chamo|eu sou (o|a)?|sou (o|a)?|aqui (é|e) (o|a)?|é (o|a)|e (o|a))\s+/i, "")
    .replace(/^(meu endere[cç]o (é|e)|endere[cç]o:?|moro (na|no|em)|fica (na|no|em)|(é|e) (na|no))\s+/i, "")
    .trim();
}
