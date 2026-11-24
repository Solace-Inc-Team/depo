"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LiveNumber } from "./live-number";

// o número vivo é um só para os dois selos: o do menu lateral (que confere) e o da barra de baixo do celular
let viva: { base: number; n: number } | null = null;
const ouvintes = new Set<() => void>();
const assinar = (f: () => void) => (ouvintes.add(f), () => void ouvintes.delete(f));
function guardar(v: { base: number; n: number }) {
  viva = v;
  ouvintes.forEach((f) => f());
}
/** A fila de saída de agora: a do servidor, ou a mais nova que o selo conferiu desde a última tela. */
export function useFilaViva(doServidor: number) {
  const v = useSyncExternalStore(assinar, () => viva, () => null);
  return v && v.base === doServidor ? v.n : doServidor;
}

/**
 * Selo de quantos pedidos esperam saída, no item Entregas do menu. Entra como o "Notification badge" do
 * transitions.dev: desliza na diagonal (260ms) e cresce com uma mola leve (500ms); sai encolhendo em 180ms.
 * Enquanto está à vista, o número rola quando muda. O leitor de tela ouve "3 esperando saída" junto do item.
 */
export function SeloMenu({ n: doServidor }: { n: number }) {
  // o servidor manda o número a cada tela; entre uma tela e outra o selo pergunta sozinho, para um pedido que
  // chegou pelo site aparecer em quem está parado em outra tela
  const n = useFilaViva(doServidor);
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
          guardar({ base: doServidor, n: novo });
          // parado na tela de Entregas: a fila mudou, a tela busca de novo e o pedido novo entra deslizando.
          // Não com alguém mexendo num campo da fila: a troca de tela tirava o foco e engolia o clique; fica
          // para a próxima conferida
          // shortcut: compara só a contagem; um que entra e outro que sai no mesmo intervalo esperam a próxima ação
          const mexendo = document.activeElement?.matches("main input, main select, main textarea");
          if (naFila && novo !== doServidor && !mexendo) router.refresh();
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
