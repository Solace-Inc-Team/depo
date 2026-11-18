"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
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
import { ModoClaro } from "./tema-botao";

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

// nomes curtos nos blocos da gaveta: "Caixa e acertos" e "Produtos e preços" quebravam em duas linhas
const curto: Record<string, string> = { "/caixa": "Caixa", "/produtos": "Produtos" };

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
  const router = useRouter();
  // tela escolhida na gaveta: primeiro desfaz a entrada que a gaveta pôs no histórico, depois navega
  // (sem isso o voltar da tela nova caía numa cópia da tela de antes)
  const destino = useRef<string | null>(null);
  const ir = (e: MouseEvent, href: string) => {
    if (!history.state?.gavetaMais) return fechar(true);
    e.preventDefault();
    destino.current = href;
    history.back();
  };
  const noMais = mais.some((g) => g.links.some((l) => ativo(path, l.href)));

  const fechar = (porVoltar = false) => {
    const d = gaveta.current;
    if (!d?.open || d.dataset.saindo !== undefined) return;
    // aberta, a gaveta ganhou uma entrada no histórico (o voltar do Android a fecha): fechando por outro caminho, ela sai
    if (!porVoltar && history.state?.gavetaMais) history.back();
    d.dataset.saindo = "";
    const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      d.close();
      delete d.dataset.saindo;
    }, reduzir ? 0 : 170);
  };
  // escolheu uma tela na gaveta: ela sai junto com a navegação
  useEffect(() => {
    fechar(true);
  }, [path]);
  // puxar para baixo fecha, como as gavetas do celular: com a lista no topo, o cartão acompanha o dedo;
  // soltando depois de 80 px (ou num puxão rápido) ela desce e fecha, antes disso volta para o lugar
  useEffect(() => {
    const cartao = gaveta.current?.querySelector<HTMLElement>(".janela-cartao");
    if (!cartao) return;
    let inicio: { y: number } | null = null;
    let puxado = 0;
    // velocidade do último trecho do dedo (px por ms): um peteleco curto também fecha
    let velocidade = 0;
    let ultimo = { y: 0, t: 0 };
    const solta = () => {
      cartao.style.transition = "transform 250ms var(--ease-out)";
      cartao.style.transform = "";
    };
    const comeca = (e: TouchEvent) => {
      inicio = cartao.scrollTop <= 0 ? { y: e.touches[0].clientY } : null;
      ultimo = { y: e.touches[0].clientY, t: e.timeStamp };
      puxado = 0;
      velocidade = 0;
    };
    const move = (e: TouchEvent) => {
      if (!inicio) return;
      const dy = e.touches[0].clientY - inicio.y;
      if (dy <= 0 && !puxado) return (inicio = null);
      e.preventDefault();
      puxado = Math.max(0, dy);
      const y = e.touches[0].clientY;
      if (e.timeStamp > ultimo.t) velocidade = (y - ultimo.y) / (e.timeStamp - ultimo.t);
      ultimo = { y, t: e.timeStamp };
      cartao.style.transition = "none";
      cartao.style.transform = `translateY(${puxado}px)`;
    };
    const fim = () => {
      if (!inicio || !puxado) return void (inicio = null);
      const rapido = velocidade > 0.5;
      inicio = null;
      if (puxado > 80 || rapido) {
        fechar();
        // a descida parte de onde o dedo deixou; ao fechar, o cartão volta ao normal para a próxima abertura
        gaveta.current?.addEventListener("close", () => { cartao.style.transition = ""; cartao.style.transform = ""; }, { once: true });
      } else solta();
    };
    cartao.addEventListener("touchstart", comeca, { passive: true });
    cartao.addEventListener("touchmove", move, { passive: false });
    cartao.addEventListener("touchend", fim);
    cartao.addEventListener("touchcancel", solta);
    return () => {
      cartao.removeEventListener("touchstart", comeca);
      cartao.removeEventListener("touchmove", move);
      cartao.removeEventListener("touchend", fim);
      cartao.removeEventListener("touchcancel", solta);
    };
  }, []);
  // o voltar do celular fecha a gaveta em vez de sair da tela
  useEffect(() => {
    const voltar = () => {
      fechar(true);
      const d = destino.current;
      destino.current = null;
      // depois do roteador do Next tratar o mesmo voltar; na hora, a navegação era engolida por ele
      if (d) setTimeout(() => router.push(d), 0);
    };
    window.addEventListener("popstate", voltar);
    return () => window.removeEventListener("popstate", voltar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            history.pushState({ ...history.state, gavetaMais: true }, "");
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
        onClick={(e) => {
          if (e.target === e.currentTarget) fechar();
        }}
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
            <button type="button" onClick={() => fechar()} aria-label="Fechar" className="-mr-2 grid size-11 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg">
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {mais.map((g) => (
            <section key={g.titulo} className="mt-5">
              <h2 className="mb-2 text-[12px] font-medium text-muted">{g.titulo}</h2>
              <ul className="grid grid-cols-4 gap-2">
                {g.links.map((l) => {
                  const Icone = icones[l.href] ?? LayoutGrid;
                  const on = ativo(path, l.href);
                  return (
                    <li key={l.href}>
                      {/* a gaveta sai no toque, junto com a troca de tela (antes esperava a tela nova chegar) */}
                      <Link href={l.href} onClick={(e) => ir(e, l.href)} aria-label={l.label} aria-current={on ? "page" : undefined} className="gaveta-mais-item" data-on={on || undefined}>
                        <Icone size={20} strokeWidth={1.75} aria-hidden="true" />
                        <span aria-hidden="true">{curto[l.href] ?? l.label}</span>
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
                <Link href={`${path}?config=empresa`} onClick={(e) => ir(e, `${path}?config=empresa`)} className="gaveta-mais-linha">
                  <Settings size={18} strokeWidth={1.75} aria-hidden="true" /> Configurações
                </Link>
              </li>
            )}
            <li>
              <Link href="/ajuda" onClick={(e) => ir(e, "/ajuda")} className="gaveta-mais-linha">
                <CircleHelp size={18} strokeWidth={1.75} aria-hidden="true" /> Ajuda
              </Link>
            </li>
            <li>
              <Link href="/senha" onClick={(e) => ir(e, "/senha")} className="gaveta-mais-linha">
                <KeyRound size={18} strokeWidth={1.75} aria-hidden="true" /> Conta e segurança
              </Link>
            </li>
            <li>
              <ModoClaro className="gaveta-mais-linha justify-between" />
            </li>
            <li>{sair}</li>
          </ul>
        </div>
      </dialog>
    </>
  );
}
