import Link from "next/link";
import { redirect } from "next/navigation";
import { TemaBotao } from "@/components/tema-botao";
import { CircleHelp, CreditCard, KeyRound, LogOut } from "lucide-react";
import { emTesteGratis } from "@/domain/assinatura";
import { requireUser } from "@/lib/auth";
import { logout } from "@/app/actions";
import { MarcaDaSessao } from "@/components/logo";
import { NavLinks, type NavGroup } from "@/components/nav-links";
import { roleLabel } from "@/components/ui";
import { PageTransition } from "@/components/page-transition";
import { SeletorFilial } from "@/components/seletor-filial";
import { MenuConfig } from "@/components/menu-config";
import { Dicas } from "@/components/dicas";
import { countOrdersByStatus } from "@/domain/queries";
import { secoesConfig } from "./configuracoes/secoes";
import { Suspense } from "react";
import { dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser("dono", "atendente", "caixa");
  if (user.platformAdmin) redirect("/admin");
  // selo do plano, à vista no menu: no teste grátis sempre; depois de assinar, só perto de vencer. A equipe não vê
  const sit = user.role === "dono" ? situacaoAssinatura(user.pagoAte, todayISO()) : null;
  const teste = sit ? await emTesteGratis(user.tenantId) : false;
  const selo =
    sit && (teste || sit.dias <= 5)
      ? {
          titulo: teste ? "Teste grátis" : "Assinatura",
          linha:
            sit.dias < 0
              ? `${teste ? "Acabou" : "Venceu"}. Pausa em ${dataBR(sit.pausaEm, true)}`
              : sit.dias === 0
                ? `${teste ? "Acaba" : "Vence"} hoje`
                : sit.dias === 1
                  ? `${teste ? "Acaba" : "Vence"} amanhã`
                  : teste
                    ? `Faltam ${sit.dias} dias`
                    : `Vence em ${sit.dias} dias`,
          acao: teste ? "Assinar" : "Pagar",
          alerta: sit.dias <= 1,
        }
      : null;

  // pedidos esperando saída: o selo no item Entregas (o layout volta a contar a cada ação e a cada atualização da tela)
  const fila = (await countOrdersByStatus(user.tenantId, user.branchId)).aberto ?? 0;

  const groups: NavGroup[] = [
    {
      links: [
        { href: "/pedidos/novo", label: "Novo pedido" },
        { href: "/", label: "Painel" },
      ],
    },
    {
      title: "Operação",
      links: [
        { href: "/pedidos", label: "Pedidos" },
        { href: "/entregas", label: "Entregas", selo: fila },
        { href: "/caixa", label: "Caixa e acertos" },
        { href: "/estoque", label: "Estoque" },
        { href: "/clientes", label: "Clientes" },
        { href: "/fiado", label: "Fiado" },
      ],
    },
    {
      title: "Gestão",
      links: [
        { href: "/relatorios", label: "Relatórios" },
        { href: "/despesas", label: "Despesas" },
        // do dia a dia do dono: preço que muda, gente que entra e sai, e quem fez o quê
        ...(user.role === "dono"
          ? [
              { href: "/produtos", label: "Produtos e preços" },
              { href: "/equipe", label: "Equipe" },
              { href: "/auditoria", label: "Auditoria" },
            ]
          : []),
      ],
    },
    { soCelular: true, links: [{ href: "/ajuda", label: "Ajuda" }] },
  ];

  return (
    <div className="app-shell lg:grid lg:min-h-screen lg:grid-cols-[15rem_1fr]">
      <aside className="relative z-20 border-b border-line lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 lg:px-5 lg:pt-5">
          <MarcaDaSessao />
          {/* o tema fica no alto nas duas larguras; Sair aqui só no celular (no computador está no rodapé) */}
          <Dicas lado="baixo" className="flex items-center gap-1">
            {/* no celular e no tablet não há rodapé lateral: quem está logado aparece aqui, e o toque leva a trocar a senha */}
            <Link
              href="/senha"
              aria-label={`${user.name}, ${roleLabel[user.role]}. Trocar senha`}
              className="mr-1 flex min-h-11 items-center gap-2 rounded-md px-1.5 hover:bg-subtle lg:hidden"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-subtle text-[11px] font-semibold">{initials(user.name)}</span>
              <span className="hidden leading-tight min-[360px]:block">
                <span className="block max-w-[7rem] truncate text-[13px] font-medium">{user.name.split(" ")[0]}</span>
                <span className="block text-[11.5px] text-muted">{roleLabel[user.role]}</span>
              </span>
            </Link>
            {/* configurações do dono (o que se ajusta uma vez): numa engrenagem, fora do menu do dia a dia */}
            {user.role === "dono" && (
              <Suspense>
                <MenuConfig
                  secoes={await secoesConfig(user.tenantId, user.pagoAte)}
                  rodape={
                    <>
                      <p className="truncate text-[12.5px] font-medium text-fg">{user.tenantName}</p>
                      <p className="text-[11.5px] text-muted">{user.pagoAte ? "Plano mensal" : "Sem mensalidade"}</p>
                    </>
                  }
                  className="size-11 lg:size-8"
                />
              </Suspense>
            )}
            <TemaBotao className="size-11 lg:size-8" />
            <form action={logout} className="lg:hidden">
              <button className="btn btn-sm tap">Sair</button>
            </form>
          </Dicas>
        </div>
        {user.branches.length > 1 && user.role === "dono" ? (
          // o dono com mais de uma filial troca de filial aqui: a empresa e a filial num botão só, em qualquer largura
          <div className="px-2.5 pb-3 lg:pb-4">
            <SeletorFilial empresa={user.tenantName} atual={user.branchId} filiais={user.branches} />
          </div>
        ) : (
          <p className="hidden truncate px-5 pb-5 text-[13px] text-muted lg:block">
            {user.tenantName}
            {/* a equipe vê a filial em que trabalha */}
            {user.branches.length > 1 && <span className="block truncate text-fg">{user.branchName}</span>}
          </p>
        )}
        {selo && (
          <Link
            href="/assinatura"
            className={`mx-2.5 mb-3 flex items-center gap-3 rounded-lg border px-3 py-2.5 hover:bg-subtle lg:mb-4 ${selo.alerta ? "border-warn-fg/40" : "border-line"}`}
          >
            <CreditCard size={16} strokeWidth={1.75} aria-hidden="true" className={`shrink-0 ${selo.alerta ? "text-warn-fg" : "text-accent"}`} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[13px] font-medium">{selo.titulo}</span>
              <span className={`block text-[12px] ${selo.alerta ? "text-warn-fg" : "text-muted"}`}>{selo.linha}</span>
            </span>
            <span className="shrink-0 text-[13px] font-medium text-accent">{selo.acao}</span>
          </Link>
        )}
        <NavLinks groups={groups} />
        <div className="mt-auto hidden shrink-0 items-center gap-2.5 border-t border-line px-4 py-3 lg:flex">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-subtle text-xs font-semibold">
            {initials(user.name)}
          </span>
          {/* o primeiro nome: com Ajuda, senha e Sair ao lado, o nome inteiro quebraria no meio */}
          <div className="min-w-0 flex-1 leading-tight" title={user.name}>
            <p className="truncate text-[13px] font-medium">{user.name.split(" ")[0]}</p>
            <p className="text-xs text-muted">{roleLabel[user.role]}</p>
          </div>
          <Dicas className="-mr-1.5 flex shrink-0">
            <Link href="/ajuda" data-dica="Ajuda" aria-label="Ajuda" className="grid size-8 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg">
              <CircleHelp size={15} strokeWidth={1.75} />
            </Link>
            <Link href="/senha" data-dica="Trocar senha" aria-label="Trocar senha" className="grid size-8 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg">
              <KeyRound size={15} strokeWidth={1.75} />
            </Link>
            <form action={logout}>
              <button data-dica="Sair" aria-label="Sair" className="grid size-8 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg">
                <LogOut size={15} strokeWidth={1.75} />
              </button>
            </form>
          </Dicas>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-10 lg:py-10">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
