"use client";

import { useState, type ReactNode } from "react";
import { AlturaSuave } from "@/components/altura-suave";

/**
 * Pix | Cartão como abas, no mesmo controle de "Entrega | Venda no balcão": o fundo desliza, a caixa acompanha a
 * altura e a aba que sai desbota em vez de sumir. As duas ficam montadas para o e-mail digitado não se perder.
 */
export function FormasDePagamento({ pix, cartao, inicial = "pix" }: { pix: ReactNode; cartao: ReactNode; inicial?: "pix" | "cartao" }) {
  const [aba, setAba] = useState(inicial);
  const painel = (qual: "pix" | "cartao", conteudo: ReactNode) => (
    <div
      id={`aba-${qual}`}
      role="tabpanel"
      aria-labelledby={`botao-${qual}`}
      inert={aba !== qual || undefined}
      className={`transition-opacity duration-200 ${aba === qual ? "opacity-100" : "pointer-events-none absolute inset-x-0 top-0 opacity-0"}`}
    >
      {conteudo}
    </div>
  );
  return (
    <div>
      <div role="tablist" aria-label="Forma de pagamento" className="relative grid grid-cols-2 rounded-lg bg-subtle p-1">
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-line transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: aba === "cartao" ? "translateX(100%)" : "none" }}
        />
        {(["pix", "cartao"] as const).map((a) => (
          <button
            key={a}
            id={`botao-${a}`}
            type="button"
            role="tab"
            aria-selected={aba === a}
            aria-controls={`aba-${a}`}
            onClick={() => setAba(a)}
            className={`relative min-h-11 rounded-md px-3.5 py-1.5 text-[14px] font-medium transition-colors [@media(min-width:640px)_and_(pointer:fine)]:min-h-9 ${aba === a ? "text-fg" : "text-muted hover:text-fg"}`}
          >
            {a === "pix" ? "Pix" : "Cartão"}
          </button>
        ))}
      </div>
      <AlturaSuave>
        <div className="relative pt-5">
          {painel("pix", pix)}
          {painel("cartao", cartao)}
        </div>
      </AlturaSuave>
    </div>
  );
}
