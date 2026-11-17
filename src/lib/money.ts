const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatBRL = (cents: number) => brl.format(cents / 100);

// aceita 1.234,56 / 1.250 / 12,5 / 12 e devolve centavos. Sem vírgula, um ponto só com 1 ou 2 dígitos
// depois é centavo de quem digita com ponto ("12.50"); com 3 dígitos é milhar ("1.250")
export function parseBRL(input: string): number | null {
  let s = input.replace(/[R$\s]/g, "");
  s = !s.includes(",") && /^-?\d+\.\d{1,2}$/.test(s) ? s : s.replace(/\./g, "").replace(",", ".");
  if (!/^-?\d+(\.\d{1,2})?$/.test(s)) return null;
  return Math.round(Number(s) * 100);
}

export const centsToInput = (cents: number) => (cents / 100).toFixed(2).replace(".", ",");
