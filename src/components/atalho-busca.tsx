"use client";

import { useEffect } from "react";

/** "/" vai para a busca da tela, como no Novo pedido (que tem o próprio atalho, num campo sem type=search). */
export function AtalhoBusca() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const busca = document.querySelector<HTMLInputElement>('main input[type="search"]');
      if (!busca) return;
      e.preventDefault();
      busca.focus();
      busca.select();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
