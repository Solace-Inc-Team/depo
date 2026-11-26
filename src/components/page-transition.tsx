"use client";

import { useEffect, useRef, ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useWebKit } from "@/lib/webkit";

// a chave muda só quando a rota muda: atualizar a mesma tela não anima
export function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  // no Safari e no iPhone a troca é sem esta animação (lib/webkit.ts explica)
  const webkit = useWebKit();
  // a cascata de entrada acabou: o que chegar depois com transição própria não repete a entrada (globals.css)
  const pagina = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => pagina.current?.setAttribute("data-assentada", ""), 800);
    return () => clearTimeout(t);
  }, [path]);
  return (
    <ViewTransition key={path} enter={webkit ? "none" : "page"} exit={webkit ? "none" : "page"} default="none">
      {/* .pagina: o conteúdo entra em cascata (globals.css); como a chave é a rota, só anima ao trocar de tela */}
      <div ref={pagina} className="pagina">{children}</div>
    </ViewTransition>
  );
}
