"use client";

import { useState, useSyncExternalStore } from "react";
import { Info, X } from "lucide-react";
import { Aparece } from "./saida";

const CHAVE = "aviso-fechado";
const lerFechado = () => {
  try {
    return localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
};

/**
 * Aviso da Solace para todas as empresas, no topo do sistema. Quem leu fecha no X e não vê mais este aviso
 * neste aparelho; um aviso novo (outro id) aparece de novo. Fecha recolhendo, sem sumir seco.
 */
export function AvisoPlataforma({ id, texto }: { id: string; texto: string }) {
  // no servidor e na hidratação, aberto; depois vale o que este aparelho guardou
  const guardado = useSyncExternalStore(() => () => {}, lerFechado, () => null);
  const [fechou, setFechou] = useState(false);
  const aberto = !fechou && guardado !== id;
  return (
    <Aparece quando={aberto}>
      <div role="status" className="mb-5 flex items-center gap-3 rounded-lg border border-line bg-subtle py-1.5 pr-1.5 pl-3.5 text-[13px]">
        <Info size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-muted" />
        <p className="min-w-0 flex-1 py-1">{texto}</p>
        <button
          type="button"
          aria-label="Fechar aviso"
          onClick={() => {
            setFechou(true);
            try {
              localStorage.setItem(CHAVE, id);
            } catch {
              // sem armazenamento (aba privada): fecha só agora
            }
          }}
          className="grid size-11 shrink-0 place-items-center rounded-md text-muted hover:bg-bg hover:text-fg fino:size-8"
        >
          <X size={15} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </Aparece>
  );
}
