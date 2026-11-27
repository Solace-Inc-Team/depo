/**
 * Os cheios na loja nos últimos dias numa linha pequena, ao lado do número de hoje: a previsão "dura 2 dias" ganha
 * o desenho que explica por quê. Linha apagada, só o ponto de hoje na cor do estado.
 */
export function TendenciaEstoque({ valores: todos, baixo }: { valores: number[]; baixo: boolean }) {
  // os dias antes do estoque inicial ficam de fora: o lançamento dele virava um degrau do zero ao total
  const valores = todos.slice(Math.max(0, todos.findIndex((v) => v !== 0)));
  const mudancas = valores.slice(1).filter((v, i) => v !== valores[i]).length;
  // pouco movimento não ganha linha: um tracinho ou um degrau só em cada produto quieto era ruído
  if (valores.length < 3 || mudancas < 2) return null;
  const min = Math.min(...valores), max = Math.max(...valores);
  // escala de pelo menos 20% do maior valor, centrada: tirar 1 de 60 não pode parecer o estoque despencando, e cada
  // produto deixa de ganhar o mesmo desenho
  const faixa = Math.max(max - min, max * 0.2, 1);
  const base = min - (faixa - (max - min)) / 2;
  const L = 56, A = 18, m = 2;
  const y = (v: number) => m + (A - 2 * m) * (1 - (v - base) / faixa);
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
