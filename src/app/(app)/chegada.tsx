"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSaida } from "@/components/saida";

/**
 * Logo depois do cadastro: um instante de "está no ar" sobre o Painel, e então ele aparece. Some sozinho
 * (ou num toque) e tira o ?chegada do endereço, para não tocar de novo ao recarregar.
 */
export function Chegada({ nome, dias }: { nome: string; dias: number }) {
  const router = useRouter();
  const [visivel, setVisivel] = useState(true);
  const { montado, saindo } = useSaida(visivel, 450);
  useEffect(() => {
    const t = setTimeout(() => setVisivel(false), 2400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!montado) router.replace("/", { scroll: false });
  }, [montado, router]);
  if (!montado) return null;
  return (
    <div role="status" className="chegada fixed inset-0 z-50 grid place-items-center bg-bg px-6" data-saindo={saindo || undefined} onClick={() => setVisivel(false)}>
      <div className="text-center">
        <svg viewBox="0 0 52 52" className="chegada-marca mx-auto size-14 text-accent" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16 27l7 7 13-15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="chegada-texto mt-6 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] text-balance">{nome} está no ar.</p>
        <p className="chegada-texto mt-2 text-muted">Seus {dias} dias grátis começam agora.</p>
      </div>
    </div>
  );
}
