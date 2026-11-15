"use client";

import { ViewTransition } from "react";

// Logotipo depo. (kit em GestãoEMP/marca): letras de anel e haste, traço 24 para altura de x 100, e o ponto na cor
// da marca. A animação "Saída" é CSS (globals.css, .depo-logo): o ponto nasce dentro do "o" e sai em arco até o
// fim da palavra. Por ser CSS ela já toca no primeiro quadro, sem esperar o JavaScript e sem piscar o logo pronto.
const W = 24, R = 38, CY = 50, GAP = 14, LARG = 2 * R + W, DOT = 15;
const XS = [0, 1, 2, 3].map((i) => i * (LARG + GAP) + LARG / 2);
const X_PONTO = 4 * (LARG + GAP) + DOT; // 471
const LARGURA = X_PONTO + DOT; // 486
const ALTURA = 192; // da ponta do d (-46) ao pé do p (146)
const ARCO = (() => {
  const p = (a: number) => [XS[1] + R * Math.cos((a * Math.PI) / 180), CY + R * Math.sin((a * Math.PI) / 180)].map((v) => +v.toFixed(3));
  const [x1, y1] = p(0), [x2, y2] = p(42);
  return `M${x1} ${y1}A${R} ${R} 0 1 0 ${x2} ${y2}`;
})();

/**
 * `size` é a altura do desenho em px. `animar`: "entrada" desenha a palavra ao abrir; com o mouse em cima o ponto pula
 * (nos dois modos); false fica parado.
 */
export function Logo({ size = 22, animar = "passar" }: { size?: number; animar?: "entrada" | "passar" | false }) {
  // o ponto pula com o mouse em cima; não interrompe a entrada que ainda está tocando
  const pular = (e: React.MouseEvent<SVGSVGElement>) => {
    const s = e.currentTarget;
    if (s.getAnimations({ subtree: true }).some((a) => a.playState === "running")) return;
    s.removeAttribute("data-tocando");
    void s.getBoundingClientRect();
    s.setAttribute("data-tocando", "pulo");
  };
  // pathLength 1: o traço de cada peça se desenha com o mesmo stroke-dashoffset, qualquer que seja o tamanho
  const traco = { fill: "none", stroke: "currentColor", strokeWidth: W, pathLength: 1 };
  return (
    <svg
      viewBox={`0 -46 ${LARGURA} ${ALTURA}`}
      width={Math.round((size * LARGURA) / ALTURA)}
      height={size}
      role="img"
      aria-label="depo"
      data-tocando={animar === "entrada" ? "entrada" : undefined}
      onMouseEnter={animar ? pular : undefined}
      className="depo-logo shrink-0 overflow-visible text-fg"
    >
      <g data-letra style={{ "--i": 0 } as React.CSSProperties}>
        <circle cx={XS[0]} cy={CY} r={R} {...traco} />
        <line x1={XS[0] + R} y1={-46} x2={XS[0] + R} y2={100} {...traco} />
      </g>
      <g data-letra style={{ "--i": 1 } as React.CSSProperties}>
        <path d={ARCO} {...traco} />
        <line x1={XS[1] - R} y1={CY} x2={XS[1] + R} y2={CY} {...traco} />
      </g>
      <g data-letra style={{ "--i": 2 } as React.CSSProperties}>
        <circle cx={XS[2]} cy={CY} r={R} {...traco} />
        <line x1={XS[2] - R} y1={0} x2={XS[2] - R} y2={146} {...traco} />
      </g>
      {/* o ponto vem antes do "o" no desenho: ao sair, ele passa por trás do anel, saindo de dentro do depósito */}
      <circle data-ponto cx={X_PONTO} cy={100 - DOT} r={DOT} fill="var(--marca)" />
      <g data-letra style={{ "--i": 3 } as React.CSSProperties}>
        <circle cx={XS[3]} cy={CY} r={R} {...traco} />
      </g>
    </svg>
  );
}

/** A marca nas telas de entrada e no topo do sistema: é o mesmo elemento, então ela desliza de uma para a outra ao entrar. Uma por página. */
export function MarcaDaSessao({ size, animar }: { size?: number; animar?: "entrada" | "passar" | false }) {
  return (
    <ViewTransition name="marca" share="marca-viaja" default="none">
      <Logo size={size} animar={animar} />
    </ViewTransition>
  );
}
