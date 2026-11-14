import { requireUser } from "@/lib/auth";
import Link from "next/link";
import { Package } from "lucide-react";
import { listProducts, listSuppliers, recentMovements, stockOverview } from "@/domain/queries";
import { ActionForm } from "@/components/action-form";
import { damagedAction, purchaseAction } from "@/app/actions";
import { JanelaAcao } from "@/components/janela-acao";
import { PageHeader, fmtDateTime } from "@/components/ui";
import { NivelVasilhame } from "@/components/nivel-vasilhame";
import { comodatoPorProduto } from "@/domain/comodato";

export const metadata = { title: "Estoque" };

export default async function Estoque() {
  const user = await requireUser("dono", "atendente", "caixa");
  const [stock, moves, products, suppliers, comodato] = await Promise.all([
    stockOverview(user.tenantId, user.branchId),
    recentMovements(user.tenantId, user.branchId, 20),
    listProducts(user.tenantId, true),
    listSuppliers(user.tenantId, true),
    comodatoPorProduto(user.tenantId),
  ]);
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
            <div>
              <label className="label" htmlFor="p-cost">Valor pago (opcional)</label>
              <input id="p-cost" name="cost" inputMode="decimal" maxLength={12} className="input" placeholder="0,00" />
            </div>
            <div>
              <label className="label" htmlFor="p-method">Pago com</label>
              <select id="p-method" name="costMethod" className="input" defaultValue="boleto">
                <option value="boleto">Boleto</option>
                <option value="pix">Pix</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
              </select>
            </div>
            <p className="text-[13px] text-muted sm:col-span-2">Com valor, entra nas despesas de hoje.</p>
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
              <th className="text-right">Em comodato</th>
              <th className="text-right">Total de vasilhames</th>
            </tr>
          </thead>
          <tbody>
            {stock.filter((p) => p.active).map((p, i) => (
              <tr key={p.id}>
                <td className="font-medium">
                  <div className="flex items-center gap-3">
                    {/* sem casco que volta não há cheio e vazio para comparar: no lugar do nível, uma caixa em linha, do mesmo tamanho */}
                    {p.returnable ? (
                      <NivelVasilhame nome={p.name} cheios={p.fullStore} vazios={p.emptyStore} baixo={p.low} ordem={i} />
                    ) : (
                      <Package size={20} strokeWidth={1.5} aria-hidden="true" className="mx-[2.5px] shrink-0 text-muted" />
                    )}
                    <div>
                      {p.name}
                      {!p.returnable && <p className="text-sm font-normal text-muted">não retornável</p>}
                    </div>
                  </div>
                </td>
                <td data-rotulo="Cheios na loja" className={`num text-right text-xl font-semibold ${p.low ? "text-danger" : ""}`}>
                  {p.fullStore}
                  {p.low && <span className="block text-sm font-medium">abaixo do mínimo ({p.minStock})</span>}
                  {p.reserved > 0 && <span className="block text-sm font-normal text-muted">{p.reserved} em pedidos aguardando</span>}
                </td>
                <td data-rotulo="Vazios na loja" className="num text-right text-xl">{p.returnable ? p.emptyStore : "-"}</td>
                <td data-rotulo="Cheios em rota" className="num text-right text-xl">{p.fullTransit}</td>
                <td data-rotulo="Vazios em rota" className="num text-right text-xl">{p.returnable ? p.emptyTransit : "-"}</td>
                {/* traço só quando não se aplica (produto que não volta); zero é zero */}
                <td data-rotulo="Avariados" className={`num text-right text-xl ${p.damaged ? "text-warn-fg" : "text-muted"}`}>{p.damaged}</td>
                <td data-rotulo="Em comodato" className="num text-right text-xl text-muted">{p.returnable ? (comodato.get(p.id) ?? 0) : "-"}</td>
                <td data-rotulo="Total de vasilhames" className="num text-right text-xl text-muted">
                  {p.returnable ? p.fullStore + p.emptyStore + p.fullTransit + p.emptyTransit + p.damaged + (comodato.get(p.id) ?? 0) : "-"}
                </td>
              </tr>
            ))}
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
            {moves.map((m) => (
              <tr key={m.id}>
                <td className="whitespace-nowrap">{fmtDateTime(m.createdAt)}</td>
                <td>{m.productName}, {stateLabel[m.state]}</td>
                <td>{m.driverName ?? "Loja"}</td>
                <td className={`num text-right font-semibold ${m.quantity < 0 ? "text-danger" : "text-ok"}`}>
                  {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
                </td>
                <td>{m.reason}</td>
                <td className="text-muted">{m.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
