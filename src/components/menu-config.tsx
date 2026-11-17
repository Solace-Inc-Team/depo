"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BadgeCheck, Building2, Globe, MessageCircle, Settings, SlidersHorizontal, Store, Wallet, X } from "lucide-react";

export const SECOES = [
  { id: "empresa", label: "Empresa", icone: Building2 },
  { id: "regras", label: "Regras da casa", icone: SlidersHorizontal },
  { id: "pagamentos", label: "Pagamentos", icone: Wallet },
  { id: "site", label: "Pedidos pelo site", icone: Globe },
  { id: "whatsapp", label: "WhatsApp", icone: MessageCircle },
  { id: "filiais", label: "Filiais", icone: Store },
  { id: "assinatura", label: "Assinatura", icone: BadgeCheck },
] as const;
type Secao = (typeof SECOES)[number]["id"];

/**
 * Configurações numa janela sobre a tela em que o dono está: a engrenagem abre, a seção vem no endereço
 * (?config=pagamentos), então "Voltar" fecha e qualquer link pode abrir direto numa seção.
 */
/** `rodape`: quem é a empresa e o plano, no pé do trilho (só no computador). */
export function MenuConfig({ secoes, rodape, className = "" }: { secoes: Record<Secao, ReactNode>; rodape?: ReactNode; className?: string }) {
  const path = usePathname();
  const params = useSearchParams();
  const pedida = SECOES.find((s) => s.id === params.get("config"))?.id;
  const janela = useRef<HTMLDialogElement>(null);
  const abriuAqui = useRef(false);
  // a seção na tela troca um instante depois da pedida, para a anterior sair antes da nova chegar
  const [mostrada, setMostrada] = useState<Secao>(pedida ?? "empresa");
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
    setMostrada("empresa");
    janela.current?.removeAttribute("data-saindo");
    janela.current?.showModal();
    window.history.pushState(null, "", endereco("empresa"));
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
  const indice = SECOES.findIndex((s) => s.id === (pedida ?? mostrada));

  return (
    <>
      <button
        type="button"
        aria-label="Configurações"
        data-dica="Configurações"
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
          <div className="config-corpo">
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
                  <s.icone size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                  {s.label}
                </button>
              ))}
              {rodape && <div className="config-rodape">{rodape}</div>}
            </nav>
            <div className="config-conteudo" data-trocando={trocando || undefined}>
              <div key={mostrada} className="config-secao">
                {secoes[mostrada]}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
