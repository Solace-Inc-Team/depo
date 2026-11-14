import Link from "next/link";
import type { ReactNode } from "react";
import { MarcaDaSessao } from "@/components/logo";

// Ruas de um bairro qualquer, em linha fina, e duas entregas saindo do depósito (o quadrado) até os pinos.
// O centro esmaece (máscara no CSS): o formulário fica sobre o escuro limpo e o mapa só aparece nas bordas.
const RUAS = [
  "M0 180H1440",
  "M0 430C300 410 520 470 760 445S1200 385 1440 415",
  "M0 690H520L640 760H1440",
  "M220 0V900",
  "M470 0C480 300 430 600 470 900",
  "M980 0V900",
  "M1220 0C1190 300 1260 620 1220 900",
  "M0 860L640 300",
  "M820 900L1440 520",
  "M1220 560H1440",
  "M0 300H220",
];
const ROTAS = [
  { d: "M220 690V180H470", dur: "7s", fim: [470, 180] },
  { d: "M220 690H520L640 760H980V180H1220", dur: "12s", fim: [1220, 180] },
];

function FundoRota() {
  return (
    <svg aria-hidden="true" className="fundo-rota absolute inset-0 -z-10 size-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke">
        {RUAS.map((d) => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
      </g>
      {ROTAS.map(({ d, dur, fim: [x, y] }) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx={x} cy={y} r="4" fill="var(--accent)" />
          <circle cx={x} cy={y} r="4" fill="none" stroke="var(--accent)" className="fundo-rota-pulso" />
          <circle r="3.5" fill="var(--accent)" className="fundo-rota-ponto">
            <animateMotion dur={dur} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      <rect x="211" y="681" width="18" height="18" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Login e cadastro: o formulário no centro, sobre o mapa de rota em linha fina. Tudo cabe na altura da
 * tela (sem rolagem) nos computadores e celulares comuns.
 */
export function TelaEntrada({ children }: { children: ReactNode }) {
  return (
    <main className="pagina-escura relative isolate flex min-h-svh flex-col items-center overflow-hidden px-6">
      <div aria-hidden="true" className="topo-luz absolute inset-0 -z-10" />
      <FundoRota />
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
