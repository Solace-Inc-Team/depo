/**
 * Os cheios na loja nos últimos dias numa linha pequena, ao lado do número de hoje: a previsão "dura 2 dias" ganha
 * o desenho que explica por quê. Linha apagada, só o ponto de hoje na cor do estado.
 */
export function TendenciaEstoque({ valores, baixo }: { valores: number[]; baixo: boolean }) {
  const min = Math.min(...valores), max = Math.max(...valores);
  // semana parada não ganha linha: um tracinho reto em cada produto quieto era ruído
  if (valores.length < 2 || min === max) return null;
  const L = 56, A = 18, m = 2;
  const y = (v: number) => m + (A - 2 * m) * (1 - (v - min) / (max - min));
  const x = (i: number) => m + ((L - 2 * m) * i) / (valores.length - 1);
  const pontos = valores.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg
      width={L}
      height={A}
      viewBox={`0 0 ${L} ${A}`}
      role="img"
      aria-label={`Cheios na loja nos últimos ${valores.length} dias: ${valores.join(", ")}`}
      className="tendencia-estoque shrink-0 overflow-visible"
    >
      <polyline points={pontos} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" className="text-muted" />
      <circle cx={x(valores.length - 1)} cy={y(valores.at(-1)!)} r={2.25} className={baixo ? "fill-danger" : "fill-fg"} />
    </svg>
  );
}
