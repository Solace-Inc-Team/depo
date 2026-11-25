// Contas dos relatórios novos, sem banco, para serem testadas.

const DIA = 86400e3;

/**
 * Cliente que parou de comprar: comprou ao menos 3 vezes e já passou do dobro do intervalo de costume (com pelo
 * menos uma semana de folga). Depois de 180 dias sem comprar não aparece mais: aí já é outro assunto.
 */
export function sumido(pedidos: number, primeiro: Date, ultimo: Date, agora = new Date()) {
  if (pedidos < 3) return null;
  const intervalo = (ultimo.getTime() - primeiro.getTime()) / DIA / (pedidos - 1);
  const semComprar = (agora.getTime() - ultimo.getTime()) / DIA;
  if (intervalo < 1 || semComprar > 180 || semComprar <= Math.max(2 * intervalo, intervalo + 7)) return null;
  return { intervalo: Math.round(intervalo), semComprar: Math.floor(semComprar) };
}

/**
 * Quanto o estoque dura com a venda média dos últimos dias, e quanto pedir para cobrir uma semana.
 * Sem venda no período não há previsão (null).
 */
export function previsao(cheios: number, vendidosNoPeriodo: number, diasDoPeriodo = 28) {
  const porDia = vendidosNoPeriodo / diasDoPeriodo;
  if (porDia <= 0) return null;
  return { porDia, dias: Math.max(0, Math.floor(cheios / porDia)), pedirSemana: Math.max(0, Math.ceil(porDia * 7 - cheios)) };
}

/**
 * Vazios que faltam para trocar com o fornecedor o que precisa pedir agora: repor o mínimo ou cobrir a semana.
 * Logo depois da troca sobram poucos vazios e está tudo certo, por isso não há um mínimo fixo de vazios.
 */
export function vaziosFaltando(p: { fullStore: number; emptyStore: number; minStock: number }, pedirSemana = 0) {
  return Math.max(0, Math.max(pedirSemana, p.minStock - p.fullStore) - p.emptyStore);
}

/** As horas de mais pedidos: a de maior movimento e as vizinhas que chegam a 80% dela ("10h às 12h"). */
export function pico(porHora: { hora: number; n: number }[]) {
  const max = Math.max(0, ...porHora.map((h) => h.n));
  if (!max) return null;
  const topo = porHora.find((h) => h.n === max)!.hora;
  const forte = (h: number) => (porHora.find((x) => x.hora === h)?.n ?? 0) >= max * 0.8;
  let de = topo;
  let ate = topo;
  while (forte(de - 1)) de--;
  while (forte(ate + 1)) ate++;
  return { de, ate: ate + 1 };
}

/**
 * Cheios no fim de cada um dos `dias` (do mais velho a hoje), andando para trás a partir do número de agora: o fim de
 * ontem é o de hoje menos o que mudou hoje, e assim por diante. `variacao`: dia (YYYY-MM-DD) para o que entrou menos
 * o que saiu naquele dia.
 */
export function serieCheios(agora: number, variacao: Map<string, number>, dias: string[]) {
  const serie = new Array<number>(dias.length);
  let fim = agora;
  for (let i = dias.length - 1; i >= 0; i--) {
    serie[i] = fim;
    fim -= variacao.get(dias[i]) ?? 0;
  }
  return serie;
}
