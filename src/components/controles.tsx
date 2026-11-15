"use client";

import { useRef, type ChangeEvent, type InputHTMLAttributes } from "react";

// Toggle e checkbox do transitions.dev ("Toggle" e "Checkbox check"), com o input nativo por baixo: o formulário
// continua mandando o campo, "required" e o foco do teclado seguem do navegador.

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Liga e desliga (ativo, à venda, retornável). A bolinha só balança depois de um toque, nunca ao abrir a tela. */
export function Alternar({ onChange, className = "", ...props }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className={`alternar ${className}`}>
      <input
        type="checkbox"
        role="switch"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          ref.current?.setAttribute("data-mexeu", "");
          onChange?.(e);
        }}
        {...props}
      />
      <span aria-hidden="true" className="alternar-bola" />
    </span>
  );
}

/** Caixa de marcar (aceite, confirmação): o traço do check se desenha ao marcar. */
export function Marcar({ className = "", ...props }: Props) {
  return (
    <span className={`marcar ${className}`}>
      <input type="checkbox" {...props} />
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10.1668 10.1668" fill="none">
        <path d="M1.00004 5.52096L3.9167 9.16679L9.1667 1.00012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
