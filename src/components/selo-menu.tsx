"use client";

import { useEffect, useState } from "react";
import { LiveNumber } from "./live-number";

/**
 * Selo de quantos pedidos esperam saída, no item Entregas do menu. Entra como o "Notification badge" do
 * transitions.dev: desliza na diagonal (260ms) e cresce com uma mola leve (500ms); sai encolhendo em 180ms.
 * Enquanto está à vista, o número rola quando muda. O leitor de tela ouve "3 esperando saída" junto do item.
 */
export function SeloMenu({ n }: { n: number }) {
  // guarda o último número para o selo sair mostrando o que tinha, em vez de virar 0 antes de sumir
  const [mostrado, setMostrado] = useState(n);
  useEffect(() => {
    if (n > 0) {
      const t = setTimeout(() => setMostrado(n), 0);
      return () => clearTimeout(t);
    }
  }, [n]);
  return (
    <span className="selo-menu ml-auto" data-aberto={n > 0 || undefined}>
      <span className="selo-menu-num num">
        <LiveNumber value={mostrado} />
      </span>
      {n > 0 && <span className="sr-only"> esperando saída</span>}
    </span>
  );
}
