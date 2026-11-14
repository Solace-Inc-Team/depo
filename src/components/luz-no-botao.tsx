"use client";

import { useEffect } from "react";

/**
 * O botão principal acende onde o mouse está: guarda a posição do cursor em --bx/--by no próprio botão
 * e o CSS desenha a luz ali (só no escuro, onde sombra não aparece). Um ouvinte só, para a página toda.
 */
export function LuzNoBotao() {
  useEffect(() => {
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = (e.target as Element | null)?.closest?.<HTMLElement>(".btn-primary");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", `${e.clientX - r.left}px`);
      b.style.setProperty("--by", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", mover, { passive: true });
    return () => document.removeEventListener("pointermove", mover);
  }, []);
  return null;
}
