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
  perigo = false,
  children,
}: {
  label: string;
  titulo: string;
  primario?: boolean;
  perigo?: boolean;
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
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          const d = janela.current;
          if (!d) return;
          d.showModal();
          // quem abre para lançar já pode digitar: o cursor vai para o primeiro campo
          const campo = d.querySelector<HTMLElement>("input:not([type=hidden]):not([type=checkbox]),select,textarea");
          (campo ?? d.querySelector<HTMLElement>(".janela-cartao"))?.focus();
        }}
        className={`btn ${primario ? "btn-primary" : ""} ${perigo ? "text-danger" : ""}`}
      >
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
        // no React o evento sobe pela árvore de componentes: sem parar aqui, o Esc fecharia também a janela
        // de fora (Conectar Mercado Pago dentro das Configurações)
        onCancel={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fechar();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) fechar();
        }}
      >
        <div className="janela-cartao outline-none" tabIndex={-1}>
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
