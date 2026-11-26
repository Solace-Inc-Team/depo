"use client";

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useWebKit } from "@/lib/webkit";

// a chave muda só quando a rota muda: atualizar a mesma tela não anima
export function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  // no Safari e no iPhone a troca é sem esta animação (lib/webkit.ts explica)
  const webkit = useWebKit();
  return (
    <ViewTransition key={path} enter={webkit ? "none" : "page"} exit={webkit ? "none" : "page"} default="none">
      {/* .pagina: a tela troca num esmaecer curto (globals.css, .page), sem cascata dos blocos */}
      <div className="pagina">{children}</div>
    </ViewTransition>
  );
}
