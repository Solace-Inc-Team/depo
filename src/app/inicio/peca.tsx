import SpotlightCard from "@/components/spotlight-card";
import type { CSSProperties, ReactNode } from "react";

// Peça do mosaico com a luz do Spotlight Card: segue o cursor, acende a borda e alcança a peça vizinha.
// A borda fina é a do próprio componente (a do .bento sai), na cor das outras linhas; a luz é a mesma dos feixes do login.
const borda = { "--spotlight-card-border": "var(--line)", "--spotlight-card-shadow": "none" } as CSSProperties;

export function Peca({ className, children }: { className: string; children: ReactNode }) {
  return (
    <SpotlightCard role="article" spotlightColor="#cfdcff" className={className} style={borda}>
      {children}
    </SpotlightCard>
  );
}
