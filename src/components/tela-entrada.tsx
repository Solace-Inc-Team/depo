import Link from "next/link";
import type { ReactNode } from "react";
import { MarcaDaSessao } from "@/components/logo";
import LightRays from "@/components/light-rays";

/**
 * Login e cadastro: o formulário no centro, sob a mesma luz da marca que abre a página inicial, aqui com
 * feixes de luz vivos (Light Rays, do React Bits). Sem WebGL, fica só a luz parada do topo. Tudo cabe na altura da
 * tela (sem rolagem) nos computadores e celulares comuns.
 */
export function TelaEntrada({ children }: { children: ReactNode }) {
  return (
    <main className="pagina-escura relative isolate flex min-h-svh flex-col items-center overflow-hidden px-6">
      <div aria-hidden="true" className="topo-luz absolute inset-0 -z-10" />
      {/* luz branca puxada para o azul da marca; fraca o bastante para o formulário continuar legível */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <LightRays raysColor="#cfdcff" intensity={0.85} opacity={0.8} mouseInfluence={0.06} cursorShadow={false} clickPulse={false} />
      </div>
      <div className="flex w-full flex-1 items-center justify-center py-8">
        <div className="stagger w-full max-w-[22rem]">
          <Link href="/" aria-label="Depósito, início" className="alvo mx-auto block w-fit">
            <MarcaDaSessao size={28} />
          </Link>
          {children}
        </div>
      </div>
      <footer className="flex items-center gap-4 pb-6 text-xs text-muted">
        <span>Solace</span>
        <Link href="/termos" className="alvo hover:text-fg">Termos de uso</Link>
        <Link href="/privacidade" className="alvo hover:text-fg">Privacidade</Link>
      </footer>
    </main>
  );
}
