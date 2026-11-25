// O plano do depo e a conta de quando o acesso vence. Pura, sem banco.

export const PLANO = {
  /** o preço de quem assina agora */
  mensalCents: 14900,
  /** o preço de antes do reajuste de 24/11/2026: quem já tinha pago uma mensalidade nele continua nele */
  precoMantidoCents: 12900,
  /** dias de uso grátis depois do cadastro */
  diasGratis: 14,
  /** depois de vencer, dias em que o sistema ainda abre (com aviso) antes de pausar */
  diasTolerancia: 3,
};

const DIA = 864e5;

/** "2026-11-14" + 14 -> "2026-11-28" */
export const somarDias = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * DIA).toISOString().slice(0, 10);

/**
 * Situação da assinatura em `hoje`. Sem pago_ate a empresa não é cobrada (null). `dias`: quantos faltam
 * (0 = vence hoje, o último dia ainda vale; negativo = venceu). Pausa depois da tolerância.
 */
export function situacaoAssinatura(pagoAte: string | null, hoje: string) {
  if (!pagoAte) return null;
  const dias = Math.round((Date.parse(`${pagoAte}T00:00:00Z`) - Date.parse(`${hoje}T00:00:00Z`)) / DIA);
  return { pagoAte, dias, bloqueado: dias < -PLANO.diasTolerancia, pausaEm: somarDias(pagoAte, PLANO.diasTolerancia + 1) };
}

/** "2026-11-28" -> "28/11/2026"; curta: "28/11" */
export const dataBR = (iso: string, curta = false) => {
  const [a, m, d] = iso.split("-");
  return curta ? `${d}/${m}` : `${d}/${m}/${a}`;
};
