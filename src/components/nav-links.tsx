"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ForwardRefExoticComponent, type HTMLAttributes, type RefAttributes } from "react";
import { MotionConfig } from "motion/react";
import { SeloMenu } from "./selo-menu";
// teste: ícones animados da lucide-animated (https://lucide-animated.com) no lugar da animação em CSS
import { LayoutGridIcon } from "./icones-animados/layout-grid";
import { PlusIcon } from "./icones-animados/plus";
import { ReceiptTextIcon } from "./icones-animados/receipt-text";
import { TruckIcon } from "./icones-animados/truck";
import { WalletIcon } from "./icones-animados/wallet";
import { UsersIcon } from "./icones-animados/users";
import { HandCoinsIcon } from "./icones-animados/hand-coins";
import { ChartColumnIncreasingIcon } from "./icones-animados/chart-column-increasing";
import { ReceiptIcon } from "./icones-animados/receipt";
import { UserRoundCogIcon } from "./icones-animados/user-round-cog";
import { HistoryIcon } from "./icones-animados/history";
import { CircleHelpIcon } from "./icones-animados/circle-help";
import {
  LayoutGrid,
  Package,
  Tag,
  type LucideIcon,
} from "lucide-react";

type Controle = { startAnimation: () => void; stopAnimation: () => void };
type Animado = ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { size?: number } & RefAttributes<Controle>>;

// a biblioteca não tem os ícones de Estoque e Produtos: esses ficam com o Lucide de sempre e a animação em CSS
const icons: Record<string, Animado | LucideIcon> = {
  "/": LayoutGridIcon,
  "/pedidos/novo": PlusIcon,
  "/pedidos": ReceiptTextIcon,
  "/entregas": TruckIcon,
  "/caixa": WalletIcon,
  "/estoque": Package,
  "/clientes": UsersIcon,
  "/fiado": HandCoinsIcon,
  "/relatorios": ChartColumnIncreasingIcon,
  "/despesas": ReceiptIcon,
  "/produtos": Tag,
  "/equipe": UserRoundCogIcon,
  "/auditoria": HistoryIcon,
  "/ajuda": CircleHelpIcon,
};
const animados = new Set<unknown>([LayoutGridIcon, PlusIcon, ReceiptTextIcon, TruckIcon, WalletIcon, UsersIcon, HandCoinsIcon, ChartColumnIncreasingIcon, ReceiptIcon, UserRoundCogIcon, HistoryIcon, CircleHelpIcon]);

// o ícone anima com o mouse sobre a linha inteira do menu, e uma vez quando a tela dele vira a atual
function ItemMenu({ href, label, on, selo }: { href: string; label: string; on: boolean; selo?: number }) {
  const Icon = icons[href];
  const ctrl = useRef<Controle>(null);
  useEffect(() => {
    if (!on || !ctrl.current) return;
    ctrl.current.startAnimation();
    const t = setTimeout(() => ctrl.current?.stopAnimation(), 700);
    return () => clearTimeout(t);
  }, [on]);
  const Anim = animados.has(Icon) ? (Icon as Animado) : null;
  const Estatico = Anim ? null : (Icon as LucideIcon | undefined);
  return (
    <Link
      href={href}
      aria-current={on ? "page" : undefined}
      onMouseEnter={() => ctrl.current?.startAnimation()}
      onMouseLeave={() => ctrl.current?.stopAnimation()}
      className={`flex h-11 shrink-0 items-center gap-2.5 lg:h-8 rounded-md px-2 text-[13px] font-medium transition-colors ${
        on ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg"
      }`}
    >
      {Anim && <Anim ref={ctrl} size={16} aria-hidden="true" className="icone-animado shrink-0" />}
      {Estatico && <Estatico size={16} strokeWidth={1.75} aria-hidden="true" />}
      {label}
      {selo !== undefined && <SeloMenu n={selo} />}
    </Link>
  );
}

// soCelular: no computador o item mora no rodapé lateral (Ajuda), e o menu cabe na tela do notebook
export type NavGroup = { title?: string; soCelular?: boolean; links: { href: string; label: string; selo?: number }[] };

export function NavLinks({ groups }: { groups: NavGroup[] }) {
  const path = usePathname();
  const active = (href: string) =>
    href === "/" ? path === "/" : href === "/pedidos" ? /^\/pedidos(\/(?!novo).*)?$/.test(path) : path.startsWith(href);

  // no celular o menu rola de lado: a página atual vai para o centro e a borda esmaece onde ainda há itens
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    const bordas = () => {
      el.toggleAttribute("data-mais-esq", el.scrollLeft > 4);
      el.toggleAttribute("data-mais-dir", el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      // no computador, com a janela baixa, o menu rola para baixo: mesma ideia, em cima e embaixo
      el.toggleAttribute("data-mais-cima", el.scrollTop > 4);
      el.toggleAttribute("data-mais-baixo", el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    };
    if (el.scrollWidth > el.clientWidth) {
      const atual = el.querySelector<HTMLElement>("[aria-current=page]");
      if (atual) el.scrollTo({ left: atual.offsetLeft - (el.clientWidth - atual.offsetWidth) / 2, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
    bordas();
    el.addEventListener("scroll", bordas, { passive: true });
    window.addEventListener("resize", bordas);
    return () => {
      el.removeEventListener("scroll", bordas);
      window.removeEventListener("resize", bordas);
    };
  }, [path]);

  return (
    // quem pediu menos movimento no aparelho vê os ícones parados
    <MotionConfig reducedMotion="user">
    <nav ref={nav} aria-label="Principal" className="nav-rola relative flex gap-1 overflow-x-auto px-3 pb-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-5 lg:[@media(max-height:780px)]:gap-3 lg:overflow-x-visible lg:overflow-y-auto lg:pb-4 lg:[scrollbar-width:none] lg:hover:[scrollbar-width:thin] lg:focus-within:[scrollbar-width:thin]">
      {groups.map((g, i) => (
        <div key={i} className={`flex shrink-0 gap-1 lg:flex-col lg:gap-0.5 ${g.soCelular ? "lg:hidden" : ""}`}>
          {g.title && <p className="hidden px-2 pb-1 text-xs font-medium text-muted lg:block">{g.title}</p>}
          {g.links.map((l) => (
            <ItemMenu key={l.href} href={l.href} label={l.label} on={active(l.href)} selo={l.selo} />
          ))}
        </div>
      ))}
    </nav>
    </MotionConfig>
  );
}
