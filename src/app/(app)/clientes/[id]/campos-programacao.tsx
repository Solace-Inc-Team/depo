"use client";

import { useId, useState } from "react";
import { somaDias } from "@/lib/period";
import { INTERVALOS, rotuloIntervalo } from "@/lib/programacao";

/** De quanto em quanto tempo e a próxima data. Enquanto ninguém mexe na data, ela acompanha o intervalo. */
export function CamposProgramacao({ hoje, aCada = 15, proxima }: { hoje: string; aCada?: number; proxima?: string }) {
  const [dias, setDias] = useState(aCada);
  const [data, setData] = useState(proxima ?? somaDias(hoje, aCada));
  const [mexeu, setMexeu] = useState(!!proxima);
  // ids próprios: a janela de programar e as de alterar ficam na página ao mesmo tempo
  const id = useId();
  const opcoes = INTERVALOS.some(([n]) => n === aCada) ? INTERVALOS : [...INTERVALOS, [aCada, rotuloIntervalo(aCada)] as const];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="label" htmlFor={`${id}-dias`}>Repetir</label>
        <select
          id={`${id}-dias`}
          name="aCadaDias"
          className="input"
          value={dias}
          onChange={(e) => {
            const n = Number(e.target.value);
            setDias(n);
            if (!mexeu) setData(somaDias(hoje, n));
          }}
        >
          {opcoes.map(([n, rotulo]) => (
            <option key={n} value={n}>{rotulo}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor={`${id}-data`}>Próxima entrega</label>
        <input
          id={`${id}-data`}
          name="proxima"
          type="date"
          required
          min={hoje}
          className="input"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
            setMexeu(true);
          }}
        />
      </div>
    </div>
  );
}
