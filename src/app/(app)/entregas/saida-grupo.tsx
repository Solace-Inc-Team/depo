"use client";

import { useEffect, useState } from "react";
import { ActionForm } from "@/components/action-form";
import { useSaida } from "@/components/saida";
import { dispatchAction } from "@/app/actions";
import { SaidaEntregador } from "./saida";

export const FORM_GRUPO = "saida-grupo";

/**
 * Vários pedidos na moto: marca na fila e saem juntos, numa viagem só. As caixas ficam nos cartões e entram
 * neste formulário pelo atributo form; a barra sobe quando há algo marcado e desce quando tudo saiu.
 */
export function SaidaEmGrupo({ entregadores, sugerido, fila }: { entregadores: { id: string; name: string }[]; sugerido: string; fila: string }) {
  const [marcados, setMarcados] = useState(0);
  useEffect(() => {
    const contar = () => setMarcados(document.querySelectorAll(`input[form="${FORM_GRUPO}"]:checked`).length);
    contar();
    document.addEventListener("change", contar);
    return () => document.removeEventListener("change", contar);
    // os pedidos que saíram somem da fila (fila muda): conta de novo. Antes era a cada mudança da tela, número animado incluído
  }, [fila]);
  const barra = useSaida(marcados > 0, 200);
  if (!barra.montado) return null;
  const desmarcar = () => {
    for (const c of document.querySelectorAll<HTMLInputElement>(`input[form="${FORM_GRUPO}"]:checked`)) c.checked = false;
    setMarcados(0);
  };
  return (
    <div data-saindo={barra.saindo || undefined} className="saida-grupo barra-pedido barra-sobe" role="region" aria-label="Saída de vários pedidos">
      <ActionForm id={FORM_GRUPO} action={dispatchAction} className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 lg:px-10">
        <p className="mr-auto text-sm font-medium" aria-live="polite">
          {marcados} {marcados === 1 ? "pedido marcado" : "pedidos marcados"}
        </p>
        <button type="button" onClick={desmarcar} className="btn">
          Desmarcar
        </button>
        <div className="flex w-full gap-2 sm:w-auto">
          <SaidaEntregador id="d-grupo" entregadores={entregadores} sugerido={sugerido} />
        </div>
      </ActionForm>
    </div>
  );
}
