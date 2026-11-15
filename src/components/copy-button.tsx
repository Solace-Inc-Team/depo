"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { TextoQueTroca } from "./texto-que-troca";

export function CopyButton({ text, label = "Copiar código" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn copiar"
      data-feito={done || undefined}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          return; // sem permissão de copiar: o código continua na tela para copiar à mão
        }
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
    >
      {/* os dois ícones no mesmo lugar, trocando como no "Icon swap" do transitions.dev (de 25% com desfoque, 250ms) */}
      <span aria-hidden="true" className="relative grid size-4 place-items-center">
        <Copy size={16} strokeWidth={1.75} className="copiar-icone copiar-de" />
        <Check size={16} strokeWidth={2} className="copiar-icone copiar-ok" />
      </span>
      {/* e o texto como no "Text states swap": o antigo sobe desfocando, o novo vem de baixo */}
      <TextoQueTroca texto={done ? "Copiado" : label} />
    </button>
  );
}
