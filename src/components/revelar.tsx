import type { ReactNode } from "react";
import { JanelaAcao } from "./janela-acao";

/**
 * Ação fora do caminho normal (entrega parcial, estorno, apagar dados): um botão que abre o formulário numa
 * janela, como as outras ações. Antes era um <details> do tamanho de um campo com seta, que parecia lista de escolha.
 */
export function Revelar({ label, perigo = false, children }: { label: string; perigo?: boolean; children: ReactNode }) {
  return (
    <JanelaAcao label={label} titulo={label} perigo={perigo}>
      {children}
    </JanelaAcao>
  );
}
