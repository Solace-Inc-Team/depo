// O número do dia ao lado do dia anterior, numa frase curta para o painel.
// Dia em andamento compara com ontem até a mesma hora; dia fechado, com o dia anterior inteiro.

export type Comparativo = { texto: string; tom: "sobe" | "desce" | "igual" };

const frases = {
  andamento: { ref: "ontem até agora", vazio: "sem venda ontem a esta hora" },
  fechado: { ref: "o dia anterior", vazio: "o dia anterior não teve venda" },
};

export function comparar(atual: number, anterior: number, base: keyof typeof frases): Comparativo | null {
  if (atual === 0 && anterior === 0) return null;
  const f = frases[base];
  if (anterior === 0) return { texto: f.vazio, tom: "sobe" };
  // dia em andamento ainda sem venda: "−100%" em vermelho de manhã cedo é alarme falso, então só informa
  if (atual === 0 && base === "andamento") return { texto: "nenhuma venda ainda hoje", tom: "igual" };
  // arredonda pelo tamanho: Math.round(-8.5) daria -8, e a queda ficaria menor que a alta igual
  const bruto = ((atual - anterior) / anterior) * 100;
  const pct = Math.sign(bruto) * Math.round(Math.abs(bruto));
  if (pct === 0) return { texto: `igual a ${f.ref}`, tom: "igual" };
  // "12% a mais que ontem": com o sinal ("−99% que ontem") a frase ficava sem o "do que" e difícil de ler
  return pct > 0 ? { texto: `${pct}% a mais que ${f.ref}`, tom: "sobe" } : { texto: `${-pct}% a menos que ${f.ref}`, tom: "desce" };
}
