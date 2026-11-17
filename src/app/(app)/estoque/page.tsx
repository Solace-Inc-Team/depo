import { requireUser } from "@/lib/auth";
import Link from "next/link";
import { Package } from "lucide-react";
import { listProducts, listSuppliers, recentMovements, stockOverview, vendidosPorProduto } from "@/domain/queries";
import { previsao, vaziosFaltando } from "@/lib/relatorios";
import { ActionForm } from "@/components/action-form";
import { damagedAction, purchaseAction, transferirAction } from "@/app/actions";
import { JanelaAcao } from "@/components/janela-acao";
import { PagamentoCompra } from "./pagamento-compra";
import { PageHeader, fmtQuando } from "@/components/ui";
import { NivelVasilhame } from "@/components/nivel-vasilhame";
import { listFiliais } from "@/domain/filiais";
import { juntarTransferencias } from "@/lib/movimentos";

export const metadata = { title: "Estoque" };

export default async function Estoque() {
  const user = await requireUser("dono", "atendente", "caixa");
  const [stock, moves, products, suppliers, filiais, vendidos] = await Promise.all([
    stockOverview(user.tenantId, user.branchId),
    recentMovements(user.tenantId, user.branchId, 20),
    listProducts(user.tenantId, true),
    listSuppliers(user.tenantId, true),
    listFiliais(user.tenantId),
    vendidosPorProduto(user.tenantId, user.branchId, 28),
  ]);
  // só existe transferência quando há outra filial ativa para receber
  const outras = filiais.filter((b) => b.active && b.id !== user.branchId);
  const stateLabel = { cheio: "cheio", vazio: "vazio", avariado: "avariado" } as const;

  return (
    <>
      <PageHeader title="Estoque">
        <Link href="/fornecedores" className="btn">Fornecedores</Link>
        {user.role === "dono" && <Link href="/estoque/inventario" className="btn">Fazer inventário</Link>}
        <JanelaAcao label="Registrar avaria" titulo="Registrar avaria">
          <ActionForm action={damagedAction} className="grid gap-3 sm:grid-cols-2" reset>
            <div>
              <label className="label" htmlFor="d-product">Produto</label>
              <select id="d-product" name="productId" className="input" required>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="d-from">Estava</label>
              <select id="d-from" name="from" className="input">
                <option value="cheio">Cheio</option>
                <option value="vazio">Vazio</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="d-qty">Quantidade</label>
              <input id="d-qty" name="quantity" type="number" min={1} max={100000} required defaultValue={1} className="input" />
            </div>
            <div>
              <label className="label" htmlFor="d-note">Defeito</label>
              <input id="d-note" name="note" required minLength={3} maxLength={120} className="input" />
            </div>
            <button className="btn btn-primary mt-1 sm:col-span-2">Registrar avaria</button>
          </ActionForm>
        </JanelaAcao>
        {outras.length > 0 && (
          <JanelaAcao label="Transferir" titulo="Transferir para outra filial">
            <ActionForm action={transferirAction} className="grid gap-3 sm:grid-cols-2" reset>
              <div>
                <label className="label" htmlFor="t-product">Produto</label>
                <select id="t-product" name="productId" className="input" required>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="t-para">Para</label>
                <select id="t-para" name="para" className="input" required>
                  {outras.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="t-cheios">Cheios</label>
                <input id="t-cheios" name="cheios" type="number" min={0} max={100000} defaultValue={0} className="input" />
              </div>
              <div>
                <label className="label" htmlFor="t-vazios">Vazios</label>
                <input id="t-vazios" name="vazios" type="number" min={0} max={100000} defaultValue={0} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="t-note">Observação</label>
                <input id="t-note" name="note" maxLength={120} className="input" />
              </div>
              <button className="btn btn-primary mt-1 sm:col-span-2">Transferir</button>
            </ActionForm>
          </JanelaAcao>
        )}
        <JanelaAcao label="Entrada de compra" titulo="Entrada de compra" primario>
          <ActionForm action={purchaseAction} className="grid gap-3 sm:grid-cols-2" reset>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="p-product">Produto</label>
              <select id="p-product" name="productId" className="input" required>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="p-full">Cheios recebidos</label>
              <input id="p-full" name="full" type="number" min={1} max={100000} required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="p-empties">Vazios devolvidos</label>
              <input id="p-empties" name="empties" type="number" min={0} defaultValue={0} className="input" />
            </div>
            <div>
              <label className="label" htmlFor="p-supplier">Fornecedor</label>
              <select id="p-supplier" name="supplierId" className="input" defaultValue="">
                <option value="">Não informar</option>
                {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="p-note">Nota fiscal ou observação</label>
              <input id="p-note" name="note" maxLength={120} className="input" />
            </div>
            <PagamentoCompra />
            <button className="btn btn-primary mt-1 sm:col-span-2">Registrar entrada</button>
          </ActionForm>
        </JanelaAcao>
      </PageHeader>
      <section className="panel overflow-x-auto">
        <table className="table tabela-pilha rotulada sm:min-w-[46rem]">
          <thead>
            <tr>
              <th>Produto</th>
              <th className="text-right">Cheios na loja</th>
              <th className="text-right">Vazios na loja</th>
              <th className="text-right">Cheios em rota</th>
              <th className="text-right">Vazios em rota</th>
              <th className="text-right">Avariados</th>
              <th className="text-right">Total de vasilhames</th>
            </tr>
          </thead>
          <tbody>
            {stock.filter((p) => p.active).map((p, i) => {
              // previsão pela venda média dos últimos 28 dias: quanto dura e quanto pedir para cobrir a semana
              const pr = previsao(p.fullStore, vendidos.find((v) => v.productId === p.id)?.n ?? 0);
              // o fornecedor troca cheio por vazio: sem vazio suficiente, o que falta sai com o casco pago
              const faltamVazios = p.returnable ? vaziosFaltando(p, pr?.pedirSemana) : 0;
              return (
              <tr key={p.id}>
                {/* a coluna do produto não espreme: o nome quebrava em quatro linhas ao lado de colunas de um número só */}
                <td className="font-medium sm:min-w-[13rem]">
                  <div className="flex items-center gap-3">
                    {/* sem casco que volta não há cheio e vazio para comparar: no lugar do nível, uma caixa em linha, do mesmo tamanho */}
                    {p.returnable ? (
                      <NivelVasilhame nome={p.name} cheios={p.fullStore} vazios={p.emptyStore} baixo={p.low} ordem={i} />
                    ) : (
                      <Package size={20} strokeWidth={1.5} aria-hidden="true" className="mx-[2.5px] shrink-0 text-muted" />
                    )}
                    <div>
                      {p.name}
                      {!p.returnable && <p className="text-[12.5px] font-normal whitespace-nowrap text-muted">não retornável</p>}
                    </div>
                  </div>
                </td>
                <td data-rotulo="Cheios na loja" className={`num text-right text-xl font-semibold ${p.low ? "text-danger" : ""}`}>
                  {p.fullStore}
                  {p.low && <span className="block text-sm font-medium whitespace-nowrap">abaixo do mínimo ({p.minStock})</span>}
                  {/* só quando acaba em até um mês: "dura 245 dias" em produto parado era só ruído */}
                  {pr && pr.dias <= 30 && (
                    <span className={`block text-sm font-normal whitespace-nowrap ${pr.dias <= 3 && !p.low ? "text-warn-fg" : "text-muted"}`}>
                      {pr.dias === 0 ? "acaba hoje" : `dura ${pr.dias} ${pr.dias === 1 ? "dia" : "dias"}`}
                      {pr.pedirSemana > 0 && <span className="block">peça {pr.pedirSemana} para a semana</span>}
                    </span>
                  )}
                  {p.reserved > 0 && (
                    <span className="block text-sm font-normal whitespace-nowrap text-muted" title="Já separados para pedidos que ainda não saíram">
                      {p.reserved} {p.reserved === 1 ? "reservado" : "reservados"}
                    </span>
                  )}
                </td>
                <td data-rotulo="Vazios na loja" className="num text-right text-xl">
                  {p.returnable ? p.emptyStore : "-"}
                  {faltamVazios > 0 && (
                    <span className="block text-sm font-medium whitespace-nowrap text-warn-fg" title="Para trocar com o fornecedor o que precisa pedir">
                      faltam {faltamVazios} para trocar
                    </span>
                  )}
                </td>
                <td data-rotulo="Cheios em rota" className="num text-right text-xl">{p.fullTransit}</td>
                <td data-rotulo="Vazios em rota" className="num text-right text-xl">{p.returnable ? p.emptyTransit : "-"}</td>
                {/* traço só quando não se aplica (produto que não volta); zero é zero */}
                <td data-rotulo="Avariados" className={`num text-right text-xl ${p.damaged ? "text-warn-fg" : "text-muted"}`}>{p.damaged}</td>
                <td data-rotulo="Total de vasilhames" className="num text-right text-xl text-muted">
                  {p.returnable ? p.fullStore + p.emptyStore + p.fullTransit + p.emptyTransit + p.damaged : "-"}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        <p className="border-t border-line px-4 py-3 text-sm text-muted">
          O total de vasilhames não deve cair. Se cair, há casco que saiu sem voltar.
        </p>
      </section>

      <section className="panel mt-6 overflow-x-auto">
        <h2 className="h2 border-b border-line px-4 py-3">Últimas movimentações</h2>
        {/* no celular cada movimentação vira um bloco empilhado, em vez de seis colunas espremidas */}
        <table className="table tabela-pilha movimentos sm:min-w-[44rem]">
          <thead>
            <tr><th>Quando</th><th>Produto</th><th>Onde</th><th className="text-right">Qtd.</th><th>Motivo</th><th>Por</th></tr>
          </thead>
          <tbody>
            {juntarTransferencias(moves).map((m) => (
              <tr key={m.id}>
                <td className="whitespace-nowrap">{fmtQuando(m.createdAt)}</td>
                <td>{m.productName}, {stateLabel[m.state]}</td>
                {/* saída de pedido, volta no acerto, troca de entregador: um lugar para o outro, numa linha só */}
                <td>{m.de ? `${m.de} → ${m.para}` : (m.driverName ?? "Loja")}</td>
                <td className={`num text-right font-semibold ${m.de ? "" : m.quantity < 0 ? "text-danger" : "text-ok"}`}>
                  {m.de || m.quantity <= 0 ? m.quantity : `+${m.quantity}`}
                </td>
                <td>{m.reason.charAt(0).toUpperCase() + m.reason.slice(1)}</td>
                <td className="text-muted">{m.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
