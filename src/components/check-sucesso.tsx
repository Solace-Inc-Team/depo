import type { CSSProperties } from "react";

/**
 * Check de sucesso do transitions.dev ("Success check"): o disco verde chega girando de 80°, subindo e saindo do
 * desfoque em 500ms, e o traço do check se desenha logo depois. Toca uma vez, quando aparece na tela.
 */
export function CheckSucesso({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`check-sucesso ${className}`} style={{ "--check": `${size}px` } as CSSProperties}>
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M17.2803 24.9602L21.7603 29.7602L30.7203 20.1602" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
