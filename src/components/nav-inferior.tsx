"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import {
  ChartColumnIncreasing,
  CircleHelp,
  Ellipsis,
  HandCoins,
  History,
  KeyRound,
  LayoutGrid,
  Package,
  Plus,
  Receipt,
  ReceiptText,
  Settings,
  Tag,
  Truck,
  UserRoundCog,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { TemaBotao } from "./tema-botao";

// Navegação do celular e do tablet: uma barra no pé da tela com o que se usa o dia inteiro e o resto numa gaveta.
// Fica no pé porque é onde o polegar alcança; a barra de rolar de lado escondia metade do menu.
// Painel, Pedidos e Entregas são o vai e vem do balcão; Novo pedido, a ação mais repetida, fica no centro.
// Caixa, estoque, clientes e a gestão vão para "Mais": usados algumas vezes por dia, não a cada minuto.

const icones: Record<string, LucideIcon> = {
  "/caixa": Wallet,
  "/estoque": Package,
  "/clientes": Users,
  "/fiado": HandCoins,
  "/relatorios": ChartColumnIncreasing,
  "/despesas": Receipt,
  "/produtos": Tag,
  "/equipe": UserRoundCog,
  "/auditoria": History,
};

export type ItemMais = { href: string; label: string };

const ativo = (path: string, href: string) =>
  href === "/" ? path === "/" : href === "/pedidos" ? /^\/pedidos(\/(?!novo).*)?$/.test(path) : path === href || path.startsWith(href + "/");

function Aba({ href, label, icone: Icone, on, selo }: { href: string; label: string; icone: LucideIcon; on: boolean; selo?: number }) {
  return (
    <Link href={href} aria-current={on ? "page" : undefined} className="nav-inferior-aba" data-on={on || undefined}>
      <span className="relative">
        <Icone size={21} strokeWidth={on ? 2 : 1.75} aria-hidden="true" />
        {!!selo && (
          <span className="nav-inferior-selo num" aria-label={`${selo} esperando saída`}>
            {selo > 9 ? "9+" : selo}
          </span>
        )}
      </span>
      {label}
    </Link>
  );
}

export function NavInferior({
  mais,
  fila,
  usuario,
  config,
  sair,
}: {
  mais: { titulo: string; links: ItemMais[] }[];
  fila: number;
  usuario: { iniciais: string; nome: string; papel: string; empresa: string };
  /** o dono abre as Configurações daqui (a janela é a mesma da engrenagem do computador) */
  config: boolean;
  sair: ReactNode;
}) {
  const path = usePathname();
  const gaveta = useRef<HTMLDialogElement>(null);
  const noMais = mais.some((g) => g.links.some((l) => ativo(path, l.href)));

  const fechar = () => {
    const d = gaveta.current;
    if (!d?.open || d.dataset.saindo !== undefined) return;
    d.dataset.saindo = "";
    const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      d.close();
      delete d.dataset.saindo;
    }, reduzir ? 0 : 170);
  };
  // escolheu uma tela na gaveta: ela sai junto com a navegação
  useEffect(() => {
    fechar();
  }, [path]);

  return (
    <>
      {/* no novo pedido a barra do carrinho ocupa o pé da tela (data-tela): esta sai para não empilhar as duas */}
      <nav aria-label="Principal" className="nav-inferior lg:hidden" data-tela={path === "/pedidos/novo" ? "novo" : undefined}>
        <Aba href="/" label="Painel" icone={LayoutGrid} on={path === "/"} />
        <Aba href="/pedidos" label="Pedidos" icone={ReceiptText} on={ativo(path, "/pedidos")} />
        <Link href="/pedidos/novo" aria-current={path === "/pedidos/novo" ? "page" : undefined} className="nav-inferior-novo">
          <span className="nav-inferior-novo-botao" aria-hidden="true">
            <Plus size={22} strokeWidth={2.25} />
          </span>
          {/* "Novo pedido" quebrava em duas linhas no iPhone SE; o nome inteiro fica para o leitor de tela */}
          <span aria-hidden="true">Novo</span>
          <span className="sr-only">Novo pedido</span>
        </Link>
        <Aba href="/entregas" label="Entregas" icone={Truck} on={ativo(path, "/entregas")} selo={fila} />
        <button
          type="button"
          aria-haspopup="dialog"
          className="nav-inferior-aba"
          data-on={noMais || undefined}
          onClick={() => {
            gaveta.current?.showModal();
            gaveta.current?.querySelector<HTMLElement>(".janela-cartao")?.focus();
          }}
        >
          <Ellipsis size={21} strokeWidth={noMais ? 2 : 1.75} aria-hidden="true" />
          Mais
        </button>
      </nav>

      <dialog
        ref={gaveta}
        className="janela gaveta-mais"
        aria-label="Mais telas e a sua conta"
        onCancel={(e) => {
          e.preventDefault();
          fechar();
        }}
        onClick={(e) => e.target === e.currentTarget && fechar()}
      >
        <div className="janela-cartao outline-none" tabIndex={-1}>
          {/* a alça diz que é uma gaveta; quem é e de qual empresa fica no alto, como no rodapé lateral do computador */}
          <span aria-hidden="true" className="gaveta-alca" />
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-subtle text-[13px] font-semibold">{usuario.iniciais}</span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-medium">{usuario.nome}</p>
              <p className="truncate text-[13px] text-muted">
                {usuario.papel} · {usuario.empresa}
              </p>
            </div>
            <button type="button" onClick={fechar} aria-label="Fechar" className="-mr-2 grid size-11 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg">
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {mais.map((g) => (
            <section key={g.titulo} className="mt-5">
              <h2 className="mb-2 text-[12px] font-medium text-muted">{g.titulo}</h2>
              <ul className="grid grid-cols-3 gap-2">
                {g.links.map((l) => {
                  const Icone = icones[l.href] ?? LayoutGrid;
                  const on = ativo(path, l.href);
                  return (
                    <li key={l.href}>
                      <Link href={l.href} aria-current={on ? "page" : undefined} className="gaveta-mais-item" data-on={on || undefined}>
                        <Icone size={20} strokeWidth={1.75} aria-hidden="true" />
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          {/* a conta: o que no computador fica na engrenagem e no rodapé lateral */}
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
            {config && (
              <li>
                {/* só o endereço muda (?config): a gaveta sai na hora, senão ficaria por baixo da janela das Configurações */}
                <Link href={`${path}?config=empresa`} onClick={fechar} className="gaveta-mais-linha">
                  <Settings size={18} strokeWidth={1.75} aria-hidden="true" /> Configurações
                </Link>
              </li>
            )}
            <li>
              <Link href="/ajuda" className="gaveta-mais-linha">
                <CircleHelp size={18} strokeWidth={1.75} aria-hidden="true" /> Ajuda
              </Link>
            </li>
            <li>
              <Link href="/senha" className="gaveta-mais-linha">
                <KeyRound size={18} strokeWidth={1.75} aria-hidden="true" /> Senha e segurança
              </Link>
            </li>
            <li className="gaveta-mais-linha justify-between">
              <span>Tema</span>
              <TemaBotao className="-mr-2 size-11" />
            </li>
            <li>{sair}</li>
          </ul>
        </div>
      </dialog>
    </>
  );
}
