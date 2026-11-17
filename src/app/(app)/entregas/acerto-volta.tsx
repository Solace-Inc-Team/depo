"use client";

import { useState, type ReactNode } from "react";
import { ActionForm } from "@/components/action-form";
import { Aparece } from "@/components/saida";
import { LiveNumber } from "@/components/live-number";
import { CheckSucesso } from "@/components/check-sucesso";
import { settleTripAction } from "@/app/actions";
import { formatBRL, parseBRL } from "@/lib/money";

/**
 * Acerto da volta: o resultado (bateu, falta, sobra) aparece enquanto se digita, como no fechamento do turno.
 * Com diferença a observação passa a ser obrigatória ali mesmo, e o formulário aponta o campo antes de enviar:
 * no celular o aviso do servidor ficava embaixo do botão, escondido pelo teclado.
 */
export function AcertoVolta({ shiftId, tripId, esperado, children }: { shiftId: string; tripId: string; esperado: number; children: ReactNode }) {
  const [contado, setContado] = useState("");
  const c = parseBRL(contado);
  const diff = c === null ? null : c - esperado;
  const [ultimo, setUltimo] = useState<number | null>(null);
  if (diff !== null && diff !== ultimo) setUltimo(diff);
  const mostra = diff ?? ultimo;
  return (
    <ActionForm action={settleTripAction} className="space-y-4">
      <input type="hidden" name="shiftId" value={shiftId} />
      <input type="hidden" name="tripId" value={tripId} />
      {children}
      {esperado > 0 ? (
        <>
          <p className="flex items-baseline justify-between gap-3 text-sm">
            Deve entregar em dinheiro <span className="num text-base font-semibold">{formatBRL(esperado)}</span>
          </p>
          <div>
            <label className="label" htmlFor={`volta-${tripId}`}>Quanto ele entregou</label>
            <input
              id={`volta-${tripId}`}
              name="counted"
              inputMode="decimal"
              data-mascara="dinheiro"
              required
              maxLength={12}
              value={contado}
              onChange={(e) => setContado(e.target.value)}
              className="input num"
              placeholder="0,00"
            />
          </div>
          <Aparece quando={diff !== null}>
            {mostra !== null && (
              <p aria-live="polite">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
                    mostra === 0 ? "bg-ok-soft text-ok" : mostra < 0 ? "bg-danger-soft text-danger" : "bg-warn-soft text-warn-fg"
                  }`}
                >
                  {mostra === 0 ? (
                    <>
                      <CheckSucesso size={16} /> bateu
                    </>
                  ) : (
                    <>
                      {mostra < 0 ? "falta" : "sobra"} <LiveNumber value={Math.abs(mostra)} cents />
                    </>
                  )}
                </span>
              </p>
            )}
          </Aparece>
          <div>
            <label className="label" htmlFor={`volta-obs-${tripId}`}>Observação {diff ? "(obrigatória: o valor não bate)" : "(opcional)"}</label>
            <input id={`volta-obs-${tripId}`} name="notes" maxLength={160} minLength={diff ? 3 : undefined} required={!!diff} className="input" />
          </div>
        </>
      ) : (
        // só Pix, cartão ou fiado: não há dinheiro para contar, a volta só fecha (e marca a hora da chegada)
        <input type="hidden" name="counted" value="0" />
      )}
      <button className="btn btn-primary w-full">Fechar a volta</button>
    </ActionForm>
  );
}
