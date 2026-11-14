"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Settings, X } from "lucide-react";

export const SECOES = [
  { id: "regras", label: "Regras da casa" },
  { id: "pagamentos", label: "Pagamentos" },
  { id: "site", label: "Pedidos pelo site" },
  { id: "filiais", label: "Filiais" },
] as const;
type Secao = (typeof SECOES)[number]["id"];

/**
 * Configurações numa janela sobre a tela em que o dono está: a engrenagem abre, a seção vem no endereço
 * (?config=pagamentos), então "Voltar" fecha e qualquer link pode abrir direto numa seção.
 */
export function MenuConfig({ secoes, className = "" }: { secoes: Record<Secao, ReactNode>; className?: string }) {
  const path = usePathname();
  const params = useSearchParams();
  const pedida = SECOES.find((s) => s.id === params.get("config"))?.id;
  const janela = useRef<HTMLDialogElement>(null);
  const abriuAqui = useRef(false);
  // a seção na tela troca um instante depois da pedida, para a anterior sair antes da nova chegar
  const [mostrada, setMostrada] = useState<Secao>(pedida ?? "regras");
  const trocando = !!pedida && pedida !== mostrada;

  const endereco = (config?: Secao) => {
    const p = new URLSearchParams(params);
    if (config) p.set("config", config);
    else p.delete("config");
    return p.size ? `${path}?${p}` : path;
  };

  // abre e fecha seguindo o endereço; ao fechar, a saída toca antes de a janela sumir
  useEffect(() => {
    const d = janela.current;
    if (!d) return;
    if (pedida && !d.open) {
      d.removeAttribute("data-saindo");
      d.showModal();
    } else if (!pedida && d.open) {
      // fecha também pelo "Voltar" do navegador: a saída toca do mesmo jeito
      d.setAttribute("data-saindo", "");
      const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t = setTimeout(() => d.close(), reduzir ? 0 : 170);
      return () => clearTimeout(t);
    }
  }, [pedida]);

  useEffect(() => {
    if (!pedida || pedida === mostrada) return;
    const t = setTimeout(() => setMostrada(pedida), 110);
    return () => clearTimeout(t);
  }, [pedida, mostrada]);

  // só o endereço muda (history do navegador, que o Next acompanha): abrir e trocar de seção não vão ao servidor
  // a janela abre no próprio clique; o endereço vem depois (esperar o Next atualizar deixava 170ms parado)
  const abrir = () => {
    abriuAqui.current = true;
    setMostrada("regras");
    janela.current?.removeAttribute("data-saindo");
    janela.current?.showModal();
    window.history.pushState(null, "", endereco("regras"));
  };
  // aberta pela engrenagem: fechar é voltar (o histórico fica limpo); aberta por link: tira o ?config
  const fechar = () => {
    if (abriuAqui.current) {
      abriuAqui.current = false;
      window.history.back();
    } else window.history.replaceState(null, "", endereco());
  };
  // no celular as seções rolam de lado: a escolhida vem para a vista, e a borda esmaece onde ainda há seção
  const trilho = useRef<HTMLElement>(null);
  useEffect(() => {
    const t = trilho.current;
    if (!t) return;
    t.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    const bordas = () => {
      t.toggleAttribute("data-mais-esq", t.scrollLeft > 4);
      t.toggleAttribute("data-mais-dir", t.scrollLeft + t.clientWidth < t.scrollWidth - 4);
    };
    bordas();
    t.addEventListener("scroll", bordas, { passive: true });
    return () => t.removeEventListener("scroll", bordas);
  }, [pedida]);
  // a janela tem a altura da seção mostrada (sem vão embaixo das curtas) e muda de altura deslizando
  const corpo = useRef<HTMLDivElement>(null);
  const secao = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = corpo.current;
    const s = secao.current;
    if (!c || !s) return;
    const medir = () => {
      const conteudo = s.parentElement!;
      const p = getComputedStyle(conteudo);
      c.style.setProperty("--altura", `${s.offsetHeight + parseFloat(p.paddingTop) + parseFloat(p.paddingBottom)}px`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(s);
    return () => ro.disconnect();
  }, [mostrada]);
  const indice = SECOES.findIndex((s) => s.id === (pedida ?? mostrada));

  return (
    <>
      <button
        type="button"
        aria-label="Configurações"
        title="Configurações"
        aria-haspopup="dialog"
        aria-expanded={!!pedida}
        onClick={abrir}
        className={`menu-config grid place-items-center rounded-md hover:bg-subtle hover:text-fg aria-expanded:bg-subtle aria-expanded:text-fg text-muted ${className}`}
      >
        <Settings size={16} strokeWidth={1.75} aria-hidden="true" className="engrenagem" />
      </button>
      <dialog
        ref={janela}
        className="janela janela-config"
        aria-labelledby="config-titulo"
        onCancel={(e) => {
          e.preventDefault();
          fechar();
        }}
        onClick={(e) => e.target === e.currentTarget && fechar()}
      >
        {/* o foco de abertura vai para a janela, não para o X (que ganharia o anel de foco à toa) */}
        <div className="janela-cartao config-cartao outline-none" tabIndex={-1} autoFocus>
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <h2 id="config-titulo" className="font-semibold">Configurações</h2>
            <button type="button" onClick={fechar} aria-label="Fechar" className="grid size-11 place-items-center sm:size-8 rounded-md text-muted hover:bg-subtle hover:text-fg">
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <div ref={corpo} className="config-corpo">
            <nav ref={trilho} aria-label="Seções" className="config-trilho" style={{ "--i": indice } as React.CSSProperties}>
              {/* a marca da seção ativa é uma só e desliza até a escolhida */}
              <span aria-hidden="true" className="config-marca" />
              {SECOES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-current={s.id === (pedida ?? mostrada) || undefined}
                  onClick={() => window.history.replaceState(null, "", endereco(s.id))}
                  className="config-item"
                >
                  {s.label}
                </button>
              ))}
            </nav>
            <div className="config-conteudo" data-trocando={trocando || undefined}>
              <div key={mostrada} ref={secao} className="config-secao">
                {secoes[mostrada]}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
