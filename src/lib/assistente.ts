// Contas do assistente sem banco nem rede, para serem testadas: modelos, preço, limites e o histórico enviado.
import { formatBRL } from "./money.ts";

/**
 * Toda pergunta começa no modelo barato. Ele mesmo chama `pedir_analise` quando a pergunta pede para cruzar
 * dados ou explicar uma causa, e aí ela roda de novo no modelo maior. Preços em dólar por milhão de tokens.
 */
export const MODELOS = {
  rapido: {
    id: "claude-haiku-5-5",
    preco: { entrada: 0.1, cacheGravado: 0.125, cacheLido: 0.01, saida: 0.5 },
    effort: "low",
    // o pensamento entra no max_tokens: folga para ele e para uma resposta curta
    maxTokens: 2000,
    rodadas: 4,
    tetoEntrada: 40_000,
  },
  analise: {
    id: "claude-sonnet-5-5",
    preco: { entrada: 2, cacheGravado: 2.5, cacheLido: 0.1, saida: 10 },
    effort: "medium",
    maxTokens: 4000,
    rodadas: 6,
    tetoEntrada: 80_000,
  },
} as const;

export type Nivel = keyof typeof MODELOS;

export const LIMITES = {
  perguntasDia: 40,
  analisesDia: 8,
  /** caracteres da pergunta */
  pergunta: 400,
  /** conversas anteriores mandadas junto, e o tamanho de cada resposta delas */
  historico: 3,
  respostaNoHistorico: 600,
  /** caracteres do resultado de cada consulta */
  resultado: 4000,
  /** linhas de cada lista nos resultados */
  linhas: 15,
};

export type Uso = { entrada: number; cacheGravado: number; cacheLido: number; saida: number };
export const usoZerado = (): Uso => ({ entrada: 0, cacheGravado: 0, cacheLido: 0, saida: 0 });

/** Soma o `usage` de uma resposta da API no total da pergunta. */
export function somarUso(total: Uso, u: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number | null; cache_read_input_tokens?: number | null }) {
  total.entrada += u.input_tokens;
  total.cacheGravado += u.cache_creation_input_tokens ?? 0;
  total.cacheLido += u.cache_read_input_tokens ?? 0;
  total.saida += u.output_tokens;
}

/** Tokens de entrada que contam para o teto da pergunta: tudo o que o modelo leu, do cache ou não. */
export const entradaTotal = (u: Uso) => u.entrada + u.cacheGravado + u.cacheLido;

/** Custo em milionésimos de dólar: preço por milhão de tokens vezes os tokens. */
export function custoMicro(nivel: Nivel, u: Uso) {
  const p = MODELOS[nivel].preco;
  return Math.round(u.entrada * p.entrada + u.cacheGravado * p.cacheGravado + u.cacheLido * p.cacheLido + u.saida * p.saida);
}

export type Turno = { pergunta: string; resposta: string };

/** O que veio da tela vira no máximo as últimas conversas, cada uma cortada: o histórico não cresce sem fim. */
export function historicoCurto(v: unknown): Turno[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((t): t is Turno => !!t && typeof t.pergunta === "string" && typeof t.resposta === "string" && !!t.pergunta.trim() && !!t.resposta.trim())
    .slice(-LIMITES.historico)
    .map((t) => ({ pergunta: t.pergunta.slice(0, LIMITES.pergunta), resposta: t.resposta.slice(0, LIMITES.respostaNoHistorico) }));
}

/** Resultado de consulta em JSON, com teto de tamanho: lista grande demais não estoura a conta da pergunta. */
export function resultadoCurto(dado: unknown) {
  const s = JSON.stringify(dado);
  return s.length <= LIMITES.resultado ? s : `${s.slice(0, LIMITES.resultado)}… (resultado cortado: peça um período menor)`;
}

const usd = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" });
/** Milionésimos de dólar em "US$ 1,23"; gasto que ainda não chega a um centavo não aparece como "US$ 0,00". */
export const dolares = (micro: number) => (micro > 0 && micro < 5000 ? "menos de US$ 0,01" : usd.format(micro / 1e6));

/** Cada consulta na linha "de onde veio" da resposta: "Dados do estoque e das vendas". */
export const FONTES: Record<string, string> = {
  resumo_vendas: "das vendas",
  estoque: "do estoque",
  situacao_agora: "dos pedidos de agora",
  contas_a_pagar: "das contas a pagar",
  fiado: "do fiado",
  clientes_sumidos: "dos clientes",
  horarios: "dos horários",
};

/**
 * O modelo termina a resposta com `DESTAQUE: ...` (o número principal, quando há) e `SEGUIR: a | b` (próximas
 * perguntas). Aqui essas linhas saem do texto e viram campos; sem elas, a resposta vem inteira e os campos vazios.
 */
export function separarResposta(bruta: string) {
  let destaque: string | undefined;
  let seguintes: string[] = [];
  const linhas = bruta.split("\n").filter((l) => {
    // o modelo às vezes põe negrito no rótulo: os asteriscos saem antes de procurar
    const c = l.replace(/\*/g, "");
    const d = /^\s*DESTAQUE\s*:\s*(.+)$/i.exec(c);
    if (d) return void (destaque = d[1].trim().slice(0, 40));
    const s = /^\s*SEGUIR\s*:\s*(.+)$/i.exec(c);
    if (s) return void (seguintes = s[1].split("|").map((x) => x.trim()).filter(Boolean).map((x) => x.slice(0, 60)).slice(0, 3));
    return true;
  });
  const texto = linhas.join("\n").trim();
  // dado cru (JSON) no lugar da frase: o modelo saiu do formato, e na tela pareceria erro do sistema
  if (/^[[{]/.test(texto)) return { texto: "Não consegui montar a resposta. Tente perguntar de outro jeito.", destaque: undefined, seguintes: [] };
  return { texto, destaque, seguintes };
}

/** fato vazio: pergunta de sempre, sem número do dia por trás */
export type Sugestao = { fato: string; pergunta: string };

/** O que o painel já sabe de agora, para a sugestão nascer de um fato do dia e não de uma lista fixa. */
type Agora = {
  revenue: number;
  previous: number;
  late: number;
  pending: number;
  oldestWaitingMin: number | null;
  lowStock: { name: string; fullStore: number }[];
};

/**
 * Até três perguntas tiradas do dia, da mais urgente para a menos: atraso, estoque baixo, fila parada e vendas.
 * O que faltar para três vem das perguntas de sempre.
 */
export function sugestoesVivas(d: Agora): Sugestao[] {
  const s: Sugestao[] = [];
  const n = (q: number, um: string, varios: string) => `${q} ${q === 1 ? um : varios}`;
  if (d.late > 0) s.push({ fato: n(d.late, "pedido atrasado", "pedidos atrasados"), pergunta: "Quais pedidos estão atrasados?" });
  const baixo = d.lowStock[0];
  if (baixo) s.push({ fato: `${baixo.name}: ${n(baixo.fullStore, "cheio", "cheios")}`, pergunta: `Quando acaba o ${baixo.name}?` });
  if (d.pending > 0 && (d.oldestWaitingMin ?? 0) >= 10)
    s.push({ fato: `${n(d.pending, "pedido espera", "pedidos esperam")} há ${d.oldestWaitingMin} min`, pergunta: "Como está a fila agora?" });
  // o valor de hoje já está no Painel: a pergunta só vale com ontem para comparar
  if (d.revenue > 0 && d.previous > 0) s.push({ fato: `Hoje: ${formatBRL(d.revenue)}`, pergunta: "Vendi mais ou menos que ontem?" });
  // dia calmo completa com as perguntas de sempre: a lista não fica com um item só
  return [...s, ...SEMPRE].slice(0, 3);
}

const SEMPRE: Sugestao[] = [
  { fato: "", pergunta: "Quanto vendi essa semana?" },
  { fato: "", pergunta: "Quem está me devendo fiado?" },
  { fato: "", pergunta: "Quais clientes pararam de comprar?" },
];
