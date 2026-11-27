import { filialDoRelatorio } from "@/lib/filial";
import { CampoFilial } from "@/components/campo-filial";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { pedidosPorHora, periodBreakdown, periodReport } from "@/domain/queries";
import { HorasBarras } from "@/components/horas-barras";
import { ClientesSumidos } from "./sumidos";
import { parsePeriod } from "@/lib/period";
import { paymentsByDay } from "@/domain/receivables";
import { expensesTotal } from "@/domain/expenses";
import { Difference, Empty, Money, PageHeader, fmtDateTime } from "@/components/ui";
import { DivisaoPagamento } from "@/components/divisao-pagamento";
import { AvaliacaoEntregadores } from "./avaliacao";

export const metadata = { title: "Relatórios" };

const FORMAS = [["cash", "Dinheiro"], ["pix", "Pix"], ["card", "Cartão"], ["credit", "Fiado"]] as const;
const semFormas = (usadas: readonly (typeof FORMAS)[number][]) => {
  const fora = FORMAS.filter((f) => !usadas.includes(f)).map(([, l]) => (l === "Pix" ? l : l.toLowerCase()));
  return fora.length ? `Sem ${fora.length > 1 ? `${fora.slice(0, -1).join(", ")} e ${fora.at(-1)}` : fora[0]} no período` : null;
};

export default async function Relatorios({ searchParams }: PageProps<"/relatorios">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const sp = await searchParams;
  const { fromStr, toStr, from, to } = parsePeriod(sp);
  const filial = filialDoRelatorio(user, sp);
  const [{ days, closed }, breakdown, fiadoPaid, spent, porHora] = await Promise.all([
    periodReport(user.tenantId, from, to, filial),
    periodBreakdown(user.tenantId, from, to, filial),
    paymentsByDay(user.tenantId, from, to, filial),
    expensesTotal(user.tenantId, fromStr, toStr, filial, true),
    pedidosPorHora(user.tenantId, from, to, filial),
  ]);
  const diasNoPeriodo = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86400e3));
  const fiadoTotal = fiadoPaid.reduce((s, d) => s + d.total, 0);
  const sum = (k: "total" | "cash" | "pix" | "card" | "credit" | "count") => days.reduce((s, d) => s + d[k], 0);
  // forma de pagamento sem nenhum real no período não vira coluna de "R$ 0,00": some, e o cabeçalho diz que não houve
  const formasDia = FORMAS.filter(([k]) => sum(k) > 0);
  const formasEntregador = FORMAS.filter(([k]) => breakdown.byDriver.some((r) => r[k] > 0));
  const diffTotal = closed.reduce((s, c) => s + (c.shift.differenceCents ?? 0), 0);
  const fmtDay = (d: string) => d.split("-").reverse().join("/");
  // a filial escolhida vai junto para o fechamento e para o CSV
  const todas = filial === null && user.branches.length > 1 ? "&filial=todas" : "";

  return (
    <>
      <PageHeader title="Relatórios">
        <Link href={`/relatorios/fechamento?dia=${toStr}${todas}`} className="btn">Fechamento do dia</Link>
        <Link href={`/relatorios/csv?de=${fromStr}&ate=${toStr}${todas}`} className="btn">Baixar planilha</Link>
        {user.role === "dono" && (
          // <a> e não <Link>: é download de arquivo, não navegação
          <a href="/exportar" className="btn" title="Todos os dados da empresa em planilhas, num ZIP">Exportar dados</a>
        )}
      </PageHeader>
      {/* no celular, De e Até lado a lado; Filial e Ver na linha de baixo */}
      <form className="panel mb-6 grid grid-cols-2 items-end gap-3 p-4 sm:flex sm:flex-wrap">
        <div>
          <label className="label" htmlFor="de">De</label>
          <input id="de" name="de" type="date" defaultValue={fromStr} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="ate">Até</label>
          <input id="ate" name="ate" type="date" defaultValue={toStr} className="input" />
        </div>
        <CampoFilial user={user} valor={sp.filial} />
        <button className="btn">Ver</button>
      </form>

      <section className="panel mb-6 overflow-x-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-line px-4 py-3">
          <h2 className="h2">Vendas entregues por dia</h2>
          {days.length > 0 && semFormas(formasDia) && <p className="text-[12px] text-muted">{semFormas(formasDia)}</p>}
        </div>
        {days.length ? (
          <table className="table tabela-pilha rotulada sm:min-w-[32rem]">
            <thead>
              <tr>
                <th>Dia</th><th className="text-right">Pedidos</th>
                {formasDia.map(([k, l]) => <th key={k} className="text-right">{l}</th>)}
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.day}>
                  <td className="num">{fmtDay(d.day)}</td>
                  <td data-rotulo="Pedidos" className="num text-right">{d.count}</td>
                  {formasDia.map(([k, l]) => (
                    <td key={k} data-rotulo={l} data-zero={d[k] === 0 || undefined} className="text-right"><Money cents={d[k]} /></td>
                  ))}
                  <td data-rotulo="Total" className="text-right font-semibold"><Money cents={d.total} /></td>
                </tr>
              ))}
              <tr className="bg-subtle font-semibold">
                <td>Período</td>
                <td data-rotulo="Pedidos" className="num text-right">{sum("count")}</td>
                {formasDia.map(([k, l]) => (
                  <td key={k} data-rotulo={l} className="text-right"><Money cents={sum(k)} /></td>
                ))}
                <td data-rotulo="Total" className="text-right"><Money cents={sum("total")} /></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <Empty>Nenhuma venda entregue neste período.</Empty>
        )}
      </section>

      {/* quando os pedidos chegam: para escalar entregador e atendente nas horas certas */}
      {porHora.length > 0 && (
        <section className="panel mb-6 p-4">
          <h2 className="h2 mb-3">Movimento por hora</h2>
          <HorasBarras porHora={porHora} dias={diasNoPeriodo} />
        </section>
      )}

      <ClientesSumidos tenantId={user.tenantId} filial={filial} loja={user.tenantName} />

      {/* divisória só entre os três números: a barra e a nota embaixo ocupam a largura toda e não levam borda lateral */}
      <section className="panel mb-6 grid sm:grid-cols-3">
        <div className="p-5 sm:border-r sm:border-line">
          <p className="text-[13px] text-muted">Vendas entregues</p>
          <Money cents={sum("total")} className="mt-1 block text-2xl font-semibold tracking-[-0.03em]" />
        </div>
        <div className="border-t border-line p-5 sm:border-t-0 sm:border-r">
          <p className="text-[13px] text-muted">
            <Link href={`/despesas?de=${fromStr}&ate=${toStr}`} className="alvo hover:text-fg hover:underline">Despesas</Link>
          </p>
          <Money cents={spent} className="mt-1 block text-2xl font-semibold tracking-[-0.03em]" />
        </div>
        <div className="border-t border-line p-5 sm:border-t-0">
          <p className="text-[13px] text-muted">Resultado (vendas menos despesas)</p>
          <Money
            cents={sum("total") - spent}
            className={`mt-1 block text-2xl font-semibold tracking-[-0.03em] ${sum("total") - spent < 0 ? "text-danger" : ""}`}
          />
        </div>
        <DivisaoPagamento
          className="border-t border-line p-5 sm:col-span-3"
          partes={[
            { rotulo: "Dinheiro", cents: sum("cash") },
            { rotulo: "Pix", cents: sum("pix") },
            { rotulo: "Cartão", cents: sum("card") },
            { rotulo: "Fiado", cents: sum("credit") },
          ]}
        />
        <p className="border-t border-line px-5 py-3 text-[13px] text-muted sm:col-span-3">
          Fiado recebido no período: <Money cents={fiadoTotal} className="font-medium text-fg" /> (já contado nas vendas, no dia da entrega).
        </p>
      </section>

      {/* a nota de cada entregador é conversa do dono com ele: a equipe não vê */}
      {user.role === "dono" && <AvaliacaoEntregadores tenantId={user.tenantId} filial={filial} />}

      <div className="mb-6 grid gap-6">
        <section className="panel overflow-x-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-line px-4 py-3">
            <h2 className="h2">Por entregador</h2>
            {breakdown.byDriver.length > 0 && semFormas(formasEntregador) && <p className="text-[12px] text-muted">{semFormas(formasEntregador)}</p>}
          </div>
          {breakdown.byDriver.length ? (
            <table className="table tabela-pilha rotulada sm:min-w-[32rem]">
              <thead>
                <tr>
                  <th>Quem entregou</th><th className="text-right">Pedidos</th><th className="text-right">Itens</th>
                  {formasEntregador.map(([k, l]) => <th key={k} className="text-right">{l}</th>)}
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.byDriver.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td data-rotulo="Pedidos" className="num text-right">{r.count}</td>
                    <td data-rotulo="Itens" className="num text-right">{r.units}</td>
                    {formasEntregador.map(([k, l]) => (
                      <td key={k} data-rotulo={l} data-zero={r[k] === 0 || undefined} className="text-right"><Money cents={r[k]} /></td>
                    ))}
                    <td data-rotulo="Total" className="text-right font-semibold"><Money cents={r.total} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>Sem entregas no período.</Empty>
          )}
        </section>
        <section className="panel overflow-x-auto">
          <h2 className="h2 border-b border-line px-4 py-3">Por produto</h2>
          {breakdown.byProduct.length ? (
            <table className="table tabela-pilha rotulada sm:min-w-[32rem]">
              <thead><tr><th>Produto</th><th className="text-right">Qtd.</th><th className="text-right">Sem troca de vasilhame</th><th className="text-right">Total</th></tr></thead>
              <tbody>
                {breakdown.byProduct.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td data-rotulo="Qtd." className="num text-right">{r.qty}</td>
                    <td data-rotulo="Sem troca de vasilhame" className="num text-right text-muted">{r.noReturn || "-"}</td>
                    <td data-rotulo="Total" className="text-right font-semibold"><Money cents={r.total} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>Sem vendas no período.</Empty>
          )}
        </section>
      </div>

      {/* só o que aconteceu: seis zeros grandes em destaque pareciam problema; tudo zerado vira uma linha */}
      {(() => {
        const itens = [
          { rotulo: "Cancelados", n: breakdown.cancelled },
          { rotulo: "Estornados", n: breakdown.refunded },
          { rotulo: "Voltaram da rua", n: breakdown.occurrences },
          { rotulo: "Entregas parciais", n: breakdown.partials },
          { rotulo: "Descontos dados", cents: breakdown.discounts },
          { rotulo: "Taxas de entrega", cents: breakdown.fees },
        ].filter((i) => (i.n ?? i.cents ?? 0) > 0);
        return itens.length ? (
          <section className="panel mb-6 flex flex-wrap sm:divide-x sm:divide-line" aria-label="Fora do normal no período">
            {itens.map((i) => (
              <div key={i.rotulo} className="min-w-[9rem] flex-1 p-4">
                <p className="text-[13px] text-muted">{i.rotulo}</p>
                {i.cents !== undefined ? <Money cents={i.cents} className="mt-1 block text-xl font-semibold" /> : <p className="num mt-1 text-xl font-semibold">{i.n}</p>}
              </div>
            ))}
          </section>
        ) : (
          <p className="mb-6 text-sm text-muted">Nada fora do normal no período: nenhum cancelamento, estorno, volta da rua, entrega parcial, desconto ou taxa.</p>
        );
      })()}

      <section className="panel overflow-x-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3">
          <h2 className="h2">Acertos no período</h2>
          {closed.length > 0 && <p>Saldo das diferenças: <Difference cents={diffTotal} /></p>}
        </div>
        {closed.length ? (
          <table className="table tabela-pilha rotulada sm:min-w-[40rem]">
            <thead><tr><th>Entregador</th><th>Fechado em</th><th className="text-right">Esperado</th><th className="text-right">Contado</th><th className="text-right">Resultado</th></tr></thead>
            <tbody>
              {closed.map(({ shift: s, driverName }) => (
                <tr key={s.id}>
                  <td><Link href={`/caixa/${s.id}`} className="alvo hover:text-accent">{driverName}</Link></td>
                  <td data-rotulo="Fechado em">{fmtDateTime(s.closedAt)}</td>
                  <td data-rotulo="Esperado" className="text-right"><Money cents={s.expectedCashCents ?? 0} /></td>
                  <td data-rotulo="Contado" className="text-right"><Money cents={s.countedCashCents ?? 0} /></td>
                  <td data-rotulo="Resultado" className="text-right"><Difference cents={s.differenceCents ?? 0} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty>Nenhum acerto fechado neste período.</Empty>
        )}
      </section>
    </>
  );
}
