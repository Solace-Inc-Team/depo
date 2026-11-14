"use client";

import { useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Botão que abre um formulário numa janela (a mesma da confirmação e das Configurações): a tela fica com o
 * que se consulta e o formulário só aparece quando alguém vai lançar. Fecha no X, no Esc, clicando fora
 * ou quando o formulário dá certo (o ActionForm dispara o evento "fechar").
 */
export function JanelaAcao({
  label,
  titulo,
  primario = false,
  children,
}: {
  label: string;
  titulo: string;
  primario?: boolean;
  children: ReactNode;
}) {
  const janela = useRef<HTMLDialogElement>(null);
  // a saída toca antes de fechar (janela-sai), como na confirmação
  const fechar = () => {
    const d = janela.current;
    if (!d?.open || d.dataset.saindo !== undefined) return;
    d.dataset.saindo = "";
    const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      d.close();
      delete d.dataset.saindo;
    }, reduzir ? 0 : 170);
  };
  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => janela.current?.showModal()} className={`btn ${primario ? "btn-primary" : ""}`}>
        {label}
      </button>
      <dialog
        ref={(d) => {
          janela.current = d;
          if (!d) return;
          const aoSalvar = () => fechar();
          d.addEventListener("fechar", aoSalvar);
          return () => d.removeEventListener("fechar", aoSalvar);
        }}
        className="janela"
        aria-label={titulo}
        onCancel={(e) => {
          e.preventDefault();
          fechar();
        }}
        onClick={(e) => e.target === e.currentTarget && fechar()}
      >
        <div className="janela-cartao outline-none" tabIndex={-1} autoFocus>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-semibold">{titulo}</h2>
            <button type="button" onClick={fechar} aria-label="Fechar" className="-my-2 -mr-2 grid size-11 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg sm:size-8">
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
