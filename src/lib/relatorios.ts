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
