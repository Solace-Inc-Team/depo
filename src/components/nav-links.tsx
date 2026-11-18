"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SeloMenu } from "./selo-menu";
import {
  LayoutGrid,
  Plus,
  ReceiptText,
  Truck,
  Wallet,
  Package,
  Users,
  ChartColumn,
  HandCoins,
  CircleHelp,
  Receipt,
  Tag,
  UserCog,
  History,
  type LucideIcon,
} from "lucide-react";

// a animação de cada ícone é CSS (globals.css, "ícones animados"): com o mouse sobre a linha e quando a tela vira a atual.
// Antes eram ícones da lucide-animated, que traziam a biblioteca motion para todas as telas, celular incluído
const icons: Record<string, LucideIcon> = {
  "/": LayoutGrid,
  "/pedidos/novo": Plus,
  "/pedidos": ReceiptText,
  "/entregas": Truck,
  "/caixa": Wallet,
  "/estoque": Package,
  "/clientes": Users,
  "/fiado": HandCoins,
  "/relatorios": ChartColumn,
  "/despesas": Receipt,
  "/produtos": Tag,
  "/equipe": UserCog,
  "/auditoria": History,
  "/ajuda": CircleHelp,
};

function ItemMenu({ href, label, on, selo }: { href: string; label: string; on: boolean; selo?: number }) {
  const Icon = icons[href];
  return (
    <Link
      href={href}
      aria-current={on ? "page" : undefined}
      className={`flex h-11 shrink-0 items-center gap-2.5 lg:h-8 rounded-md px-2 text-[13px] font-medium transition-colors ${
        on ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg"
      }`}
    >
      {Icon && <Icon size={16} strokeWidth={1.75} aria-hidden="true" />}
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
  );
}
