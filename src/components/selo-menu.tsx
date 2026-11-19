"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LiveNumber } from "./live-number";

/**
 * Selo de quantos pedidos esperam saída, no item Entregas do menu. Entra como o "Notification badge" do
 * transitions.dev: desliza na diagonal (260ms) e cresce com uma mola leve (500ms); sai encolhendo em 180ms.
 * Enquanto está à vista, o número rola quando muda. O leitor de tela ouve "3 esperando saída" junto do item.
 */
export function SeloMenu({ n: doServidor }: { n: number }) {
  // o servidor manda o número a cada tela; entre uma tela e outra o selo pergunta sozinho, para um pedido que
  // chegou pelo site aparecer em quem está parado em outra tela
  const [vivo, setVivo] = useState<{ base: number; n: number } | null>(null);
  const n = vivo && vivo.base === doServidor ? vivo.n : doServidor;
  const router = useRouter();
  const naFila = usePathname() === "/entregas";

  useEffect(() => {
    let parado = false;
    const conferir = async () => {
      if (document.hidden) return;
      try {
        const r = await fetch("/entregas/fila", { cache: "no-store" });
        if (r.ok && !parado) {
          const { n: novo } = (await r.json()) as { n: number };
          setVivo({ base: doServidor, n: novo });
          // parado na tela de Entregas: a fila mudou, a tela busca de novo e o pedido novo entra deslizando
          // shortcut: compara só a contagem; um que entra e outro que sai no mesmo intervalo esperam a próxima ação
          if (naFila && novo !== doServidor) router.refresh();
        }
      } catch {
        // sem sinal: fica o último número até a próxima conferida
      }
    };
    const id = setInterval(conferir, 15000);
    document.addEventListener("visibilitychange", conferir);
    return () => {
      parado = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", conferir);
    };
  }, [doServidor, naFila, router]);

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
        {/* mesmo limite da barra do celular */}
        {mostrado > 99 ? "99+" : <LiveNumber value={mostrado} />}
      </span>
      {n > 0 && <span className="sr-only"> esperando saída</span>}
    </span>
  );
}
