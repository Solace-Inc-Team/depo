"use client";

import { useSearchParams } from "next/navigation";

const textos = {
  conectado: { cor: "bg-ok-soft text-ok", texto: "Mercado Pago conectado. Os próximos Pix são confirmados sozinhos." },
  erro: { cor: "bg-danger-soft text-danger", texto: "Não deu para conectar. Tente de novo; se continuar, use o Access Token." },
  indisponivel: { cor: "bg-warn-soft text-warn-fg", texto: "A conexão pelo Mercado Pago ainda não está ligada. Use o Access Token." },
} as const;

/** Resultado da volta do Mercado Pago (?mp=...), mostrado em cima da seção. */
export function AvisoMp() {
  const mp = useSearchParams().get("mp") as keyof typeof textos | null;
  const a = mp ? textos[mp] : null;
  if (!a) return null;
  return (
    <p role="status" className={`enter mt-3 rounded-md px-3 py-2 text-[13px] font-medium ${a.cor}`}>
      {a.texto}
    </p>
  );
}
