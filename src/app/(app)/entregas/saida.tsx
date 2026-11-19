"use client";

import { useState } from "react";

// O entregador vem sugerido (quem já vai ao bairro, ou quem tem menos na rua). O botão diz com quem sai:
// com só "Saiu para entrega", um toque mandava o pedido com alguém que a pessoa nem tinha visto escolhido.
export function SaidaEntregador({
  id,
  entregadores,
  sugerido,
  primario = false,
}: {
  id: string;
  entregadores: { id: string; name: string }[];
  sugerido: string;
  primario?: boolean;
}) {
  const [escolhido, setEscolhido] = useState(sugerido);
  const nome = entregadores.find((d) => d.id === escolhido)?.name.split(" ")[0];
  return (
    <>
      <label className="sr-only" htmlFor={id}>Entregador</label>
      <select id={id} name="driverId" className="input min-w-32 flex-1" required value={escolhido} onChange={(e) => setEscolhido(e.target.value)}>
        <option value="" disabled>Entregador</option>
        {entregadores.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <button className={`btn min-w-[9.75rem] justify-center ${primario ? "btn-primary" : ""}`}>{nome ? `Saiu com ${nome}` : "Saiu para entrega"}</button>
    </>
  );
}
