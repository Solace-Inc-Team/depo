import { filialDoRelatorio } from "@/lib/filial";
import { CampoFilial } from "@/components/campo-filial";
import Link from "next/link";
import { Receipt, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { parsePeriod, todayISO } from "@/lib/period";
import { expenseCategories, listExpenses, type ExpenseCategory } from "@/domain/expenses";
import { cancelarContaAction, createExpenseAction, criarContaAction, pagarContaAction, voidExpenseAction } from "@/app/actions";
import { contasEmAberto } from "@/domain/contas";
import { listSuppliers } from "@/domain/queries";
import { JanelaAcao } from "@/components/janela-acao";
import { ActionForm } from "@/components/action-form";
import { PopoverForm } from "@/components/popover-form";
import { formatBRL } from "@/lib/money";
import { Money, PageHeader } from "@/components/ui";

export const metadata = { title: "Despesas" };

const methodLabel = { dinheiro: "Dinheiro", pix: "Pix", cartao: "Cartão", boleto: "Boleto" } as const;
const fmtDay = (d: string) => d.split("-").reverse().join("/");
// quantos dias do vencimento até hoje (negativo: já venceu)
const diasAte = (dia: string, hoje: string) => Math.round((Date.parse(`${dia}T12:00:00Z`) - Date.parse(`${hoje}T12:00:00Z`)) / 864e5);
function vencimento(dia: string, hoje: string): [string, string] {
  const d = diasAte(dia, hoje);
  if (d < 0) return [d === -1 ? "venceu ontem" : `venceu há ${-d} dias`, "font-medium text-danger"];
  if (d === 0) return ["vence hoje", "font-medium text-warn-fg"];
  if (d === 1) return ["vence amanhã", "text-warn-fg"];
  return [`vence ${fmtDay(dia).slice(0, 5)}`, "text-muted"];
}

export default async function Despesas({ searchParams }: PageProps<"/despesas">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const sp = await searchParams;
  // o mesmo período padrão dos relatórios: o número de despesas bate entre as duas telas
  const { fromStr, toStr } = parsePeriod(sp);
  // contas a pagar: quem cuida do dinheiro (dono e caixa) vê e paga; a atendente só lança despesa
  const cuidaDasContas = user.role === "dono" || user.role === "caixa";
  const [list, aPagar, fornecedores] = await Promise.all([
    listExpenses(user.tenantId, fromStr, toStr, filialDoRelatorio(user, sp)),
    cuidaDasContas ? contasEmAberto(user.tenantId, user.branchId) : Promise.resolve([]),
    cuidaDasContas ? listSuppliers(user.tenantId, true) : Promise.resolve([]),
  ]);
  const hoje = todayISO();
  const totalAPagar = aPagar.reduce((s, c) => s + c.amountCents, 0);
  // a devolução de pedido estornado aparece na lista, mas fora do total: a venda estornada já saiu das vendas
  const valid = list.filter((e) => !e.voidedAt && e.category !== "estorno");
  const devolvido = list.filter((e) => !e.voidedAt && e.category === "estorno").reduce((s, e) => s + e.amountCents, 0);
  const total = valid.reduce((s, e) => s + e.amountCents, 0);
  const byCategory = Object.entries(
    valid.reduce<Record<string, number>>((acc, e) => ((acc[e.category] = (acc[e.category] ?? 0) + e.amountCents), acc), {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <PageHeader title="Despesas">
        {cuidaDasContas && (
          <JanelaAcao label="Nova conta a pagar" titulo="Nova conta a pagar" icone={<Plus size={16} strokeWidth={2} aria-hidden="true" />}>
            <ActionForm action={criarContaAction} className="grid gap-3 sm:grid-cols-2" reset>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="ct-desc">Descrição</label>
                <input id="ct-desc" name="description" required minLength={2} maxLength={160} className="input" placeholder="Ex.: boleto da carga de gás" />
              </div>
              <div>
                <label className="label" htmlFor="ct-valor">Valor</label>
                <input id="ct-valor" name="amount" required inputMode="decimal" data-mascara="dinheiro" maxLength={12} className="input num" placeholder="0,00" />
              </div>
              <div>
                <label className="label" htmlFor="ct-venc">Vencimento</label>
                <input id="ct-venc" name="dueOn" type="date" required min={hoje} defaultValue={hoje} className="input" />
              </div>
              <div>
                <label className="label" htmlFor="ct-cat">Categoria</label>
                <select id="ct-cat" name="category" className="input" defaultValue="fornecedor">
                  {Object.entries(expenseCategories)
                    .filter(([k]) => k !== "estorno")
                    .map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="ct-forn">Fornecedor (opcional)</label>
                <select id="ct-forn" name="supplierId" className="input" defaultValue="">
                  <option value="">Nenhum</option>
                  {fornecedores.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <button className="btn btn-primary mt-1 sm:col-span-2">Lançar conta</button>
            </ActionForm>
          </JanelaAcao>
        )}
      </PageHeader>

      {/* o que ainda vai sair: da conta que vence primeiro para a última; pagar vira despesa */}
      {aPagar.length > 0 && (
        <section className="panel mb-6">
          <h2 className="h2 flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
            A pagar
            <span className="text-[13px] font-normal text-muted"><Money cents={totalAPagar} /> em {aPagar.length} {aPagar.length === 1 ? "conta" : "contas"}</span>
          </h2>
          <ul>
            {aPagar.map((c) => {
              const [quando, tom] = vencimento(c.dueOn, hoje);
              return (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 last:border-0">
                  <div className="min-w-0">
                    <p className="font-medium">{c.description}</p>
                    <p className="text-[13px]">
                      <span className={tom}>{quando}</span>
                      {c.fornecedor && <span className="text-muted">, {c.fornecedor}</span>}
                    </p>
                  </div>
                  {/* no celular valor e ações descem sempre para a linha de baixo: todas as contas ficam iguais */}
                  <div className="flex items-center gap-4 max-sm:w-full">
                    <Money cents={c.amountCents} className="font-semibold max-sm:mr-auto" />
                    <PopoverForm label="Pagar" titulo={`${c.description}, ${formatBRL(c.amountCents)}`} action={pagarContaAction} submit="Marcar como paga">
                      <input type="hidden" name="contaId" value={c.id} />
                      <label className="label mb-0" htmlFor={`pg-m-${c.id}`}>Pago com</label>
                      <select id={`pg-m-${c.id}`} name="method" className="input" defaultValue="boleto">
                        {Object.entries(methodLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                      </select>
                      <label className="label mb-0" htmlFor={`pg-d-${c.id}`}>Pago em</label>
                      <input id={`pg-d-${c.id}`} name="paidOn" type="date" required max={hoje} defaultValue={hoje} className="input" />
                    </PopoverForm>
                    {user.role === "dono" && (
                      <PopoverForm label="Cancelar" titulo={c.description} action={cancelarContaAction} submit="Cancelar conta" danger>
                        <input type="hidden" name="contaId" value={c.id} />
                        <label className="label mb-0" htmlFor={`cc-${c.id}`}>Motivo</label>
                        <input id={`cc-${c.id}`} name="reason" required minLength={3} maxLength={160} className="input" />
                      </PopoverForm>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* no celular, De e Até lado a lado; Filial e Ver na linha de baixo */}
      <form className="mb-6 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* min-w-0: a tabela larga rola dentro do quadro em vez de alargar a coluna e a página */}
        <div className="min-w-0 space-y-6">
          {/* com o menu lateral e a coluna da direita, o total fica em cima das categorias até sobrar largura (xl) */}
          <section className="panel grid sm:grid-cols-[auto_minmax(0,1fr)] sm:divide-x sm:divide-line lg:grid-cols-1 lg:divide-x-0 xl:grid-cols-[auto_minmax(0,1fr)] xl:divide-x">
            <div className="p-5 sm:pr-8">
              <p className="text-[13px] text-muted">Total no período</p>
              <Money cents={total} className="mt-1 block text-[2rem] leading-tight font-semibold tracking-[-0.03em]" />
              {devolvido > 0 && (
                <p className="mt-1 text-[13px] text-muted">
                  Fora do total: <Money cents={devolvido} /> devolvidos em estornos
                </p>
              )}
            </div>
            {/* sem gasto nenhum, o cartão fica só com o total: a lista abaixo já diz que não há despesa */}
            {byCategory.length > 0 && (
              <ul className="space-y-1.5 border-t border-line p-5 text-[13px] sm:border-t-0 lg:border-t xl:border-t-0">
                {byCategory.map(([cat, cents]) => (
                    <li key={cat} className="flex items-center gap-3">
                      <span className="w-36 shrink-0 truncate text-muted">{expenseCategories[cat as ExpenseCategory] ?? cat}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle">
                        <span className="block h-full rounded-full bg-fg/70" style={{ width: `${(cents / total) * 100}%` }} />
                      </span>
                      <Money cents={cents} className="w-24 text-right" />
                    </li>
                ))}
              </ul>
            )}
          </section>

          <section className="panel overflow-x-auto">
            {list.length ? (
              <table className="table tabela-pilha rotulada despesas sm:min-w-[36rem]">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Despesa</th>
                    <th>Forma</th>
                    <th className="text-right">Valor</th>
                    {user.role === "dono" && <th><span className="sr-only">Ações</span></th>}
                  </tr>
                </thead>
                <tbody>
                  {list.map((e) => (
                    <tr key={e.id} className={e.voidedAt ? "text-muted" : ""}>
                      <td data-rotulo="Data" className="num whitespace-nowrap text-muted">{fmtDay(e.paidOn)}</td>
                      <td>
                        <p className={`font-medium ${e.voidedAt ? "line-through" : ""}`}>
                          {e.orderId ? <Link href={`/pedidos/${e.orderId}`} className="alvo hover:underline">{e.description}</Link> : e.description}
                        </p>
                        <p className="text-[13px] text-muted">
                          {expenseCategories[e.category as ExpenseCategory] ?? e.category}, por {e.by}
                          {e.voidedAt && `. Cancelada: ${e.voidReason}`}
                        </p>
                      </td>
                      <td data-rotulo="Forma">{methodLabel[e.method]}</td>
                      <td data-rotulo="Valor" className={`text-right font-medium ${e.voidedAt ? "line-through" : ""}`}><Money cents={e.amountCents} /></td>
                      {user.role === "dono" && (
                        <td className="text-right">
                          {!e.voidedAt && !e.orderId && (
                            <PopoverForm label="Cancelar" titulo={`${e.description}, ${formatBRL(e.amountCents)}`} action={voidExpenseAction} submit="Cancelar despesa" danger>
                              <input type="hidden" name="expenseId" value={e.id} />
                              <label className="label mb-0" htmlFor={`r-${e.id}`}>Motivo</label>
                              <input id={`r-${e.id}`} name="reason" required minLength={3} className="input" />
                            </PopoverForm>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <Receipt size={28} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                <p className="mt-3 font-medium">Nenhuma despesa no período</p>
              </div>
            )}
          </section>
        </div>

        <section className="panel p-4 lg:self-start">
          <h2 className="h2">Lançar despesa</h2>
          <ActionForm action={createExpenseAction} className="mt-4 space-y-3" reset>
            <div>
              <label className="label" htmlFor="description">Descrição</label>
              <input id="description" name="description" required maxLength={160} className="input" placeholder="Ex.: Diesel da Strada" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="amount">Valor</label>
                <input id="amount" name="amount" inputMode="decimal" data-mascara="dinheiro" required className="input num" placeholder="0,00" />
              </div>
              <div>
                <label className="label" htmlFor="paidOn">Data</label>
                <input id="paidOn" name="paidOn" type="date" required defaultValue={todayISO()} className="input" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="category">Categoria</label>
                <select id="category" name="category" className="input" defaultValue="combustivel">
                  {Object.entries(expenseCategories)
                    .filter(([k]) => k !== "estorno")
                    .map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="method">Forma</label>
                <select id="method" name="method" className="input" defaultValue="dinheiro">
                  {Object.entries(methodLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-primary w-full">Lançar despesa</button>
          </ActionForm>
        </section>
      </div>
    </>
  );
}
