"use client";

import { useState } from "react";
import { Aparece } from "@/components/saida";
import { ActionForm } from "@/components/action-form";
import { closeShiftAction } from "@/app/actions";
import { formatBRL, parseBRL } from "@/lib/money";
import { LiveNumber } from "@/components/live-number";
import { CheckSucesso } from "@/components/check-sucesso";

export function CloseShiftForm({ shiftId, expectedCents }: { shiftId: string; expectedCents: number }) {
  const [counted, setCounted] = useState("");
  const c = parseBRL(counted);
  const diff = c === null ? null : c - expectedCents;
  // ao apagar o valor, o bloco recolhe ainda mostrando o último resultado, em vez de encolher vazio
  const [ultimo, setUltimo] = useState<number | null>(null);
  if (diff !== null && diff !== ultimo) setUltimo(diff);
  const mostra = diff ?? ultimo;
  return (
    <ActionForm action={closeShiftAction} className="space-y-3" confirm={
        c === null
          ? undefined
          : `Contado ${formatBRL(c)}, esperado ${formatBRL(expectedCents)}: ${diff === 0 ? "bateu" : diff! < 0 ? `falta ${formatBRL(-diff!)}` : `sobra ${formatBRL(diff!)}`}. Fechar o acerto? Depois não dá para mudar.`
      }>
      <input type="hidden" name="shiftId" value={shiftId} />
      <div>
        <label className="label" htmlFor="counted">Dinheiro contado</label>
        <input
          id="counted"
          name="counted"
          inputMode="decimal" data-mascara="dinheiro"
          required
          value={counted}
          onChange={(e) => setCounted(e.target.value)}
          className="input h-14 text-3xl"
          placeholder="0,00"
        />
      </div>
      {/* o resultado abre crescendo quando há valor e recolhe quando apaga: antes o espaço ficava reservado e vazio */}
      <Aparece quando={diff !== null}>
      <p aria-live="polite" className="flex min-h-9 items-center text-lg">
        {mostra !== null && (
          // a cor acompanha: verde quando bate, amarelo se sobra, vermelho se falta
          <span
            className={`enter inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-colors duration-300 ${
              mostra === 0 ? "bg-ok-soft text-ok" : mostra < 0 ? "bg-danger-soft text-danger" : "bg-warn-soft text-warn-fg"
            }`}
          >
            {mostra === 0 ? (
              <>
                <CheckSucesso size={20} /> bateu, sem diferença
              </>
            ) : (
              <>
                {mostra < 0 ? "falta" : "sobra"} <LiveNumber value={Math.abs(mostra)} cents />
              </>
            )}
          </span>
        )}
      </p>
      </Aparece>
      <div>
        <label className="label" htmlFor="notes">Observação {diff ? "(obrigatória quando há diferença)" : "(opcional)"}</label>
        <textarea id="notes" name="notes" rows={3} className="input" required={!!diff} />
      </div>
      <button className="btn btn-primary w-full">Fechar acerto</button>
    </ActionForm>
  );
}
