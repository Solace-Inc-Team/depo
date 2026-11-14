import Link from "next/link";
import type { ReactNode } from "react";
import { MarcaDaSessao } from "@/components/logo";
import { PainelVivo } from "@/app/inicio/painel-vivo";

/**
 * Login e cadastro: o formulário de um lado e, do outro, o sistema funcionando (o mesmo Painel vivo da
 * página inicial), para quem chega da vitrine continuar no mesmo lugar. No celular o Painel vira uma faixa
 * no alto, cortada e esmaecendo, e o formulário vem logo abaixo.
 */
export function TelaEntrada({ rotulo, titulo, texto, children }: { rotulo: string; titulo: string; texto: string; children: ReactNode }) {
  return (
    <div className="pagina-escura min-h-screen lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <section aria-hidden="true" className="entrada-palco relative isolate h-44 overflow-hidden border-b border-line sm:h-56 lg:order-2 lg:h-auto lg:border-b-0 lg:border-l">
        <div className="topo-luz absolute inset-0 -z-10" />
        <div className="hidden px-14 pt-20 lg:block">
          <p className="hero-in text-[13px] font-medium text-accent">{rotulo}</p>
          <p style={{ "--d": "60ms" } as React.CSSProperties} className="hero-in mt-3 max-w-[18ch] text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.04em] text-balance">
            {titulo}
          </p>
          <p style={{ "--d": "120ms" } as React.CSSProperties} className="hero-in mt-4 max-w-[34ch] text-[16px] text-muted">{texto}</p>
        </div>
        {/* a tela sai pela direita e por baixo: é um pedaço do sistema, não um quadro solto */}
        <div
          style={{ "--d": "220ms" } as React.CSSProperties}
          className="hero-in absolute top-5 left-5 w-[68rem] origin-top-left scale-[0.4] sm:scale-50 lg:relative lg:top-auto lg:left-auto lg:mt-14 lg:ml-14 lg:scale-100"
        >
          <div className="topo-tela overflow-hidden rounded-2xl border border-line bg-bg">
            <PainelVivo />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent lg:hidden" />
      </section>

      <main className="flex flex-col px-6 pt-6 pb-8 lg:min-h-screen lg:px-12 lg:pt-8">
        <Link href="/" aria-label="Depósito, início" className="alvo w-fit">
          <MarcaDaSessao size={26} />
        </Link>
        <div className="flex flex-1 items-center justify-center py-8 lg:py-12">
          <div className="stagger w-full max-w-[22rem]">{children}</div>
        </div>
        <footer className="flex items-center justify-center gap-4 text-xs text-muted lg:justify-start">
          <span>Solace</span>
          <Link href="/termos" className="alvo hover:text-fg">Termos de uso</Link>
          <Link href="/privacidade" className="alvo hover:text-fg">Privacidade</Link>
        </footer>
      </main>
    </div>
  );
}
