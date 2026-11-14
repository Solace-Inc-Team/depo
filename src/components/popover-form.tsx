"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ActionForm, type ActionState } from "./action-form";

/**
 * Ação de linha que pede um dado antes (motivo, senha nova): abre um formulário pequeno ancorado no link.
 * Flutua fixo na tela, então a caixa da tabela não corta; fecha ao clicar fora; um aberto por vez (name
 * comum dos <details>); e o título diz de quem é ("Senha nova de Paulo Lima").
 */
export function PopoverForm({
  label,
  titulo,
  action,
  submit,
  danger = false,
  align = "right",
  confirm,
  children,
}: {
  label: string;
  titulo?: string;
  action: (fd: FormData) => Promise<ActionState>;
  submit: string;
  danger?: boolean;
  align?: "left" | "right";
  confirm?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const form = d.querySelector<HTMLElement>(".popover");
    const summary = d.querySelector("summary");
    if (!form || !summary) return;
    // cola o formulário embaixo do link (ou em cima, se não couber), sem sair da tela
    const posicionar = () => {
      const r = summary.getBoundingClientRect();
      const m = 8;
      const largura = form.offsetWidth;
      const altura = form.offsetHeight;
      let x = align === "left" ? r.left : r.right - largura;
      x = Math.min(Math.max(m, x), window.innerWidth - largura - m);
      const cabeEmbaixo = r.bottom + m + altura <= window.innerHeight - m;
      const y = cabeEmbaixo || r.top - m - altura < m ? r.bottom + m : r.top - m - altura;
      form.style.left = `${x}px`;
      form.style.top = `${y}px`;
      form.style.transformOrigin = `${align === "left" ? "left" : "right"} ${cabeEmbaixo ? "top" : "bottom"}`;
    };
    const fora = (e: PointerEvent) => {
      if (!d.contains(e.target as Node)) d.open = false;
    };
    const aoTrocar = () => {
      if (d.open) {
        posicionar();
        document.addEventListener("pointerdown", fora);
        window.addEventListener("scroll", posicionar, true);
        window.addEventListener("resize", posicionar);
        // depois do clique o foco ainda vai para o summary: o campo pega o foco no quadro seguinte
        requestAnimationFrame(() => form.querySelector<HTMLElement>("input:not([type=hidden]),select,textarea")?.focus());
      } else {
        document.removeEventListener("pointerdown", fora);
        window.removeEventListener("scroll", posicionar, true);
        window.removeEventListener("resize", posicionar);
      }
    };
    d.addEventListener("toggle", aoTrocar);
    return () => {
      d.removeEventListener("toggle", aoTrocar);
      document.removeEventListener("pointerdown", fora);
      window.removeEventListener("scroll", posicionar, true);
      window.removeEventListener("resize", posicionar);
    };
  }, [align]);

  return (
    <details
      ref={ref}
      name="acao-de-linha"
      data-popover
      className="inline-block text-left"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.currentTarget.open = false;
          e.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="tap cursor-pointer list-none whitespace-nowrap text-[13px] text-muted hover:text-fg">{label}</summary>
      <ActionForm
        action={action}
        confirm={confirm}
        className={`popover ${align === "left" ? "popover-left" : ""} fixed z-40 flex w-64 flex-col gap-2 rounded-lg border border-line bg-surface p-3 text-left shadow-[0_8px_30px_rgb(0_0_0/0.12)]`}
      >
        {titulo && <p className="text-[13px] font-medium">{titulo}</p>}
        {children}
        <button className={`btn ${danger ? "btn-danger" : "btn-primary"}`}>{submit}</button>
      </ActionForm>
    </details>
  );
}
