"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

// No celular o filtro fica recolhido para os números do dia aparecerem primeiro;
// no computador ele está sempre à vista. Começa aberto quando já há filtro aplicado.
// Escolher o dia ou o entregador já aplica: sem botão "Ver" e sem recarregar a página.
// No celular o botão fica parado ao lado do título e os campos abrem embaixo, crescendo (.recolhe):
// antes o botão pulava de linha e a tela de baixo saltava de uma vez.
export function FiltroPainel({ ativo, children }: { ativo: boolean; children: ReactNode }) {
  const [aberto, setAberto] = useState(ativo);
  const router = useRouter();
  const [, iniciar] = useTransition();
  const aplicar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // o padrão fica fora do endereço: "Todos" (vazio) e o dia de hoje (o máximo do campo de data)
    const busca = new URLSearchParams();
    for (const campo of Array.from(e.currentTarget.elements) as HTMLInputElement[])
      if (campo.name && campo.value && campo.value !== campo.max) busca.set(campo.name, campo.value);
    iniciar(() => router.replace(busca.size ? `/?${busca}` : "/", { scroll: false }));
  };
  return (
    <div className="flex flex-wrap items-end gap-2 max-sm:contents">
      <button
        type="button"
        className="btn sm:hidden"
        aria-expanded={aberto}
        aria-controls="filtro-painel"
        onClick={() => setAberto((a) => !a)}
      >
        <SlidersHorizontal size={15} strokeWidth={1.75} aria-hidden="true" />
        {ativo ? "Filtrado" : "Filtrar"}
      </button>
      <div className="recolhe filtro-recolhe order-last w-full" data-aberto={aberto || undefined}>
        <div>
          <form
            id="filtro-painel"
            onSubmit={aplicar}
            onChange={(e) => e.currentTarget.requestSubmit()}
            aria-label="Filtrar o painel"
            className="flex w-full flex-wrap items-end gap-2 pt-1 sm:w-auto sm:pt-0"
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
