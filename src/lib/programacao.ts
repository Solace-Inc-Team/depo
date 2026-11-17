// Intervalos do pedido programado: os mesmos nomes no formulário e na tela do cliente ("Toda semana", não "a cada 7 dias").
export const INTERVALOS = [
  [7, "Toda semana"],
  [10, "A cada 10 dias"],
  [14, "A cada 2 semanas"],
  [15, "A cada 15 dias"],
  [20, "A cada 20 dias"],
  [30, "Todo mês (30 dias)"],
  [45, "A cada 45 dias"],
  [60, "A cada 2 meses"],
] as const;

export const rotuloIntervalo = (dias: number) => INTERVALOS.find(([n]) => n === dias)?.[1] ?? `A cada ${dias} dias`;
