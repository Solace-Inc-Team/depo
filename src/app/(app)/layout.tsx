import Link from "next/link";
import { redirect } from "next/navigation";
import { TemaBotao } from "@/components/tema-botao";
import { CircleHelp, CreditCard, KeyRound, LogOut } from "lucide-react";
import { emTesteGratis } from "@/domain/assinatura";
import { requireUser } from "@/lib/auth";
import { logout } from "@/app/actions";
import { MarcaDaSessao } from "@/components/logo";
import { NavLinks, type NavGroup } from "@/components/nav-links";
import { NavInferior } from "@/components/nav-inferior";
import { roleLabel } from "@/components/ui";
import { PageTransition } from "@/components/page-transition";
import { SeletorFilial } from "@/components/seletor-filial";
import { MenuConfig } from "@/components/menu-config";
import { Dicas } from "@/components/dicas";
import { countOpenOrders } from "@/domain/queries";
import { AtalhoBusca } from "@/components/atalho-busca";
import { secoesConfig } from "./configuracoes/secoes";
import { Suspense } from "react";
import { dataBR, situacaoAssinatura } from "@/lib/plano";
import { avisoAtual } from "@/domain/platform";
import { AvisoPlataforma } from "@/components/aviso-plataforma";
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
          // no topo do celular cabe pouco: o essencial do selo numa pílula
          curta: sit.dias < 0 ? (teste ? "Teste acabou" : "Venceu") : sit.dias <= 1 ? (sit.dias === 0 ? "Vence hoje" : "Vence amanhã") : teste ? `Teste: ${sit.dias} dias` : `Vence em ${sit.dias} dias`,
          acao: teste ? "Assinar" : "Pagar",
          alerta: sit.dias <= 1,
        }
      : null;

  // pedidos esperando saída: o selo no item Entregas (o layout volta a contar a cada ação e a cada atualização da tela)
  const [fila, aviso] = await Promise.all([countOpenOrders(user.tenantId, user.branchId), avisoAtual()]);

  const groups: NavGroup[] = [
    {
      links: [
        { href: "/pedidos/novo", label: "Novo pedido" },
        { href: "/", label: "Painel" },
        // o assistente perto do que o dono abre todo dia, e não perdido entre os cadastros
        ...(user.role === "dono" ? [{ href: "/assistente", label: "Pergunte ao depo" }] : []),
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
  ];

  return (
    <div className="app-shell lg:grid lg:min-h-screen lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* quem usa teclado não precisa passar pelos 14 itens do menu em toda tela */}
      <a href="#conteudo" className="btn sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:h-10 focus:bg-bg focus:px-4 focus:shadow-lg">Pular para o conteúdo</a>
      <aside aria-label="Menu" className="relative z-20 border-b border-line max-lg:flex max-lg:items-center lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 lg:px-5 lg:pt-5">
          <MarcaDaSessao />
          {/* o tema fica no alto nas duas larguras; Sair aqui só no celular (no computador está no rodapé) */}
          {/* no celular e no tablet a conta, a engrenagem, o tema e o Sair moram na gaveta "Mais" da barra de baixo:
              o topo fica só com a marca e o selo do plano, e os números do dia sobem na tela */}
          {selo && (
            <Link
              href="/assinatura"
              className={`ml-auto flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium lg:hidden ${selo.alerta ? "border-warn-fg/40 text-warn-fg" : "border-line"}`}
            >
              <CreditCard size={14} strokeWidth={1.75} aria-hidden="true" className={selo.alerta ? "" : "text-accent"} />
              {selo.curta}
            </Link>
          )}
          {/* a janela das Configurações fica montada também no celular (a gaveta abre pelo endereço ?config); só o botão some */}
          {/* no celular os botões daqui ficam na gaveta: o grupo não ocupa lugar, e o selo encosta no canto direito */}
          <Dicas lado="baixo" className="contents items-center gap-1 lg:flex">
            {/* configurações do dono (o que se ajusta uma vez): numa engrenagem, fora do menu do dia a dia */}
            {user.role === "dono" && (
              <Suspense>
                <MenuConfig
                  secoes={await secoesConfig(user.tenantId, user.pagoAte)}
                  rodape={
                    <>
                      <p className="truncate text-[12px] font-medium text-fg">{user.tenantName}</p>
                      <p className="text-[12px] text-muted">{user.pagoAte ? "Plano mensal" : "Sem mensalidade"}</p>
                    </>
                  }
                  className="size-8 max-lg:hidden"
                />
              </Suspense>
            )}
            <TemaBotao className="size-8 max-lg:hidden" />
          </Dicas>
        </div>
        {user.branches.length > 1 && user.role === "dono" ? (
          // o dono com mais de uma filial troca de filial aqui: a empresa e a filial num botão só, em qualquer largura
          // no celular fica na mesma linha da marca: em cima dela, empurrava o título da tela ~60 px para baixo
          <div className="min-w-0 px-2.5 max-lg:flex-1 max-lg:py-2 lg:pb-4">
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
            className={`mx-2.5 mb-4 hidden items-center gap-3 rounded-lg border px-3 py-2.5 hover:bg-subtle lg:flex ${selo.alerta ? "border-warn-fg/40" : "border-line"}`}
          >
            <CreditCard size={16} strokeWidth={1.75} aria-hidden="true" className={`shrink-0 ${selo.alerta ? "text-warn-fg" : "text-accent"}`} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[13px] font-medium">{selo.titulo}</span>
              <span className={`block text-[12px] ${selo.alerta ? "text-warn-fg" : "text-muted"}`}>{selo.linha}</span>
            </span>
            <span className="shrink-0 text-[13px] font-medium text-accent">{selo.acao}</span>
          </Link>
        )}
        {/* o menu lateral é do computador; no celular e no tablet a navegação é a barra de baixo (NavInferior) */}
        <div className="hidden lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
          <NavLinks groups={groups} />
        </div>
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
      {/* embaixo, espaço para a barra de navegação do celular e para a barra de gestos do iPhone */}
      <main id="conteudo" tabIndex={-1} className="main-app outline-none mx-auto w-full max-w-6xl px-4 2xl:max-w-[1600px] pt-6 lg:px-10 lg:py-10">
        {/* aviso da Solace para todas as empresas (manutenção, novidade) */}
        {aviso && <AvisoPlataforma id={aviso.id} texto={aviso.texto} />}
        <PageTransition>{children}</PageTransition>
        <AtalhoBusca />
      </main>
      <NavInferior
        fila={fila}
        mais={[
          { titulo: "Operação", links: [...groups[0].links.filter((l) => l.href === "/assistente"), ...groups[1].links.filter((l) => !["/pedidos", "/entregas"].includes(l.href))] },
          { titulo: "Gestão", links: groups[2].links },
        ]}
        usuario={{ iniciais: initials(user.name), nome: user.name, papel: roleLabel[user.role], empresa: user.branches.length > 1 ? `${user.tenantName}, ${user.branchName}` : user.tenantName }}
        config={user.role === "dono"}
        sair={
          <form action={logout}>
            <button className="gaveta-mais-linha w-full text-danger">
              <LogOut size={18} strokeWidth={1.75} aria-hidden="true" /> Sair
            </button>
          </form>
        }
      />
    </div>
  );
}
