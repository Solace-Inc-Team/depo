"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * "Card resize" do transitions.dev: quando o conteúdo cresce ou encolhe (um aviso de erro, um campo que aparece),
 * a caixa acompanha em 300ms em vez de pular. A primeira medida (ao abrir) entra direto, sem animar a partir do zero.
 */
export function AlturaSuave({ children, className = "" }: { children: ReactNode; className?: string }) {
  const fora = useRef<HTMLDivElement>(null);
  const dentro = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = fora.current;
    const d = dentro.current;
    if (!f || !d) return;
    let ultima = 0;
    const ro = new ResizeObserver(() => {
      const h = d.offsetHeight;
      // fechada (dentro do <dialog>) a altura é 0: a próxima medida é a da abertura, que não anima
      f.style.transition = ultima ? "" : "none";
      f.style.height = h ? `${h}px` : "";
      ultima = h;
    });
    ro.observe(d);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={fora} className={`altura-suave ${className}`}>
      <div ref={dentro}>{children}</div>
    </div>
  );
}
