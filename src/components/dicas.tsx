"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tooltip do transitions.dev ("Tooltip open/close") para botões só com ícone: entra depois de um instante, desliza de
 * um botão ao vizinho em vez de piscar e some na hora. Cada botão do grupo leva `data-dica` com o texto; o
 * aria-label continua sendo o nome que o leitor de tela lê.
 */
/**
 * `contida`: a dica não passa das bordas do grupo (num gráfico, a da primeira barra saía para fora do painel).
 * `toque`: no celular, tocar no item mostra a dica por um instante (num gráfico sem número à vista, era o único jeito
 * de ver o valor; nos botões só com ícone não, porque o toque já faz a ação).
 */
export function Dicas({
  children,
  className = "",
  lado = "cima",
  contida = false,
  toque = false,
}: {
  children: ReactNode;
  className?: string;
  lado?: "cima" | "baixo";
  contida?: boolean;
  toque?: boolean;
}) {
  const grupo = useRef<HTMLDivElement>(null);
  const dica = useRef<HTMLSpanElement>(null);
  const texto = useRef<HTMLSpanElement>(null);

  const prazo = useRef<ReturnType<typeof setTimeout>>(undefined);
  const esconder = () => {
    clearTimeout(prazo.current);
    dica.current?.setAttribute("data-show", "false");
  };

  const mostrar = (alvo: Element | null) => {
    const botao = alvo?.closest<HTMLElement>("[data-dica]");
    const g = grupo.current;
    const tip = dica.current;
    const t = texto.current;
    if (!botao || !g || !tip || !t || !g.contains(botao)) return;
    const aberta = tip.getAttribute("data-show") === "true";
    t.textContent = botao.dataset.dica ?? "";
    const cs = getComputedStyle(tip);
    const largura = Math.ceil(t.scrollWidth + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight));
    const gr = g.getBoundingClientRect();
    const r = botao.getBoundingClientRect();
    // não passa da borda direita da tela (os botões do rodapé ficam no canto do menu)
    const centro = Math.min(r.left - gr.left + r.width / 2 - largura / 2, window.innerWidth - 8 - largura - gr.left);
    const x = contida ? Math.max(0, Math.min(centro, gr.width - largura)) : centro;
    if (!aberta) {
      // fechada, a posição muda sem animar: só o aparecer anima
      tip.style.transition = "none";
      tip.style.width = `${largura}px`;
      tip.style.setProperty("--dica-x", `${x}px`);
      void tip.offsetWidth;
      tip.style.transition = "";
    } else {
      tip.style.width = `${largura}px`;
      tip.style.setProperty("--dica-x", `${x}px`);
    }
    tip.setAttribute("data-show", "true");
  };

  return (
    <div
      ref={grupo}
      className={`dicas ${className}`}
      data-lado={lado}
      onPointerOver={(e) => e.pointerType === "mouse" && mostrar(e.target as Element)}
      onPointerDown={(e) => {
        if (!toque || e.pointerType === "mouse") return;
        mostrar(e.target as Element);
        clearTimeout(prazo.current);
        prazo.current = setTimeout(esconder, 2500);
      }}
      // no toque o "sair de cima" chega logo ao levantar o dedo: quem fecha é o prazo
      onPointerLeave={(e) => e.pointerType === "mouse" && esconder()}
      onFocus={(e) => (e.target as Element).matches(":focus-visible") && mostrar(e.target as Element)}
      onBlur={esconder}
      onClick={(e) => !(toque && (e.nativeEvent as PointerEvent).pointerType !== "mouse") && esconder()}
    >
      {children}
      <span ref={dica} aria-hidden="true" className="dica" data-show="false">
        <span ref={texto} />
      </span>
    </div>
  );
}
