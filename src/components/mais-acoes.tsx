"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import { useSaida } from "./saida";
import { abrirJanela } from "./janela-acao";

type Item = { label: string } & ({ href: string } | { janela: string });

/**
 * As ações menos usadas do topo de uma tela num menu "Mais ações": a tela fica com a principal e uma ou duas à vista.
 * Um item abre um link ou uma JanelaAcao `semBotao` pelo id; a janela fica fora do menu, que se fecha antes.
 */
export function MaisAcoes({ itens }: { itens: Item[] }) {
  const [aberto, setAberto] = useState(false);
  const menu = useSaida(aberto, 150);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const lista = useRef<(HTMLElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => !raiz.current?.contains(e.target as Node) && setAberto(false);
    document.addEventListener("pointerdown", fora);
    lista.current[0]?.focus();
    return () => document.removeEventListener("pointerdown", fora);
  }, [aberto]);

  const fechar = (devolverFoco = true) => {
    setAberto(false);
    if (devolverFoco) botao.current?.focus();
  };

  const navegar = (e: React.KeyboardEvent) => {
    const i = lista.current.findIndex((el) => el === document.activeElement);
    const ir = (n: number) => {
      e.preventDefault();
      lista.current[(n + itens.length) % itens.length]?.focus();
    };
    if (e.key === "ArrowDown") ir(i + 1);
    else if (e.key === "ArrowUp") ir(i - 1);
    else if (e.key === "Home") ir(0);
    else if (e.key === "End") ir(itens.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      fechar();
    } else if (e.key === "Tab") fechar(false);
  };

  const classeItem = "flex min-h-10 w-full items-center rounded-md px-2.5 text-left text-[13px] whitespace-nowrap outline-none hover:bg-subtle focus-visible:bg-subtle";

  return (
    <div ref={raiz} className="mais-acoes relative">
      <button
        ref={botao}
        type="button"
        aria-haspopup="menu"
        aria-expanded={aberto}
        aria-controls={menuId}
        onClick={() => setAberto((a) => !a)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !aberto) {
            e.preventDefault();
            setAberto(true);
          }
        }}
        className="btn w-full justify-center"
      >
        <Ellipsis size={16} strokeWidth={1.75} aria-hidden="true" />
        {/* "Mais ações", não "Mais": no celular a barra de baixo já tem um "Mais" */}
        Mais ações
      </button>
      {menu.montado && (
        <div
          id={menuId}
          role="menu"
          aria-label="Mais ações"
          data-saindo={menu.saindo || undefined}
          onKeyDown={navegar}
          className="popover absolute top-full right-0 z-30 mt-1.5 min-w-48 rounded-lg border border-line bg-surface p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
        >
          {itens.map((it, i) =>
            "href" in it ? (
              <Link
                key={it.label}
                href={it.href}
                role="menuitem"
                tabIndex={-1}
                ref={(el) => {
                  lista.current[i] = el;
                }}
                onClick={() => fechar(false)}
                className={classeItem}
              >
                {it.label}
              </Link>
            ) : (
              <button
                key={it.label}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-haspopup="dialog"
                ref={(el) => {
                  lista.current[i] = el;
                }}
                // o foco passa pelo "Mais" antes de a janela abrir: ao fechar, a janela devolve o foco para ele
                onClick={() => {
                  fechar();
                  abrirJanela(document.getElementById(it.janela) as HTMLDialogElement | null);
                }}
                className={classeItem}
              >
                {it.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
