import { Revelar } from "@/components/revelar";
import { JanelaAcao } from "@/components/janela-acao";
import Link from "next/link";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { isUuid } from "@/lib/ctx";
import { requireUser } from "@/lib/auth";
import { getCustomer, listAddresses, listOrders, listProducts } from "@/domain/queries";
import { comodatoDoCliente } from "@/domain/comodato";
import { ActionForm } from "@/components/action-form";
import { CustomerFields } from "@/components/customer-fields";
import { PopoverForm } from "@/components/popover-form";
import { addAddressAction, removeAddressAction, anonymizeCustomerAction, receivePaymentAction, saveCustomerAction, voidPaymentAction, devolverVasilhameAction, registrarComodatoAction } from "@/app/actions";
import { customerStatement } from "@/domain/receivables";
import { centsToInput, formatBRL } from "@/lib/money";
import { Empty, Money, StatusBadge, fmtQuando, paymentLabel } from "@/components/ui";

export const metadata = { title: "Cliente" };

/** "hoje", "ontem", "há 6 dias" */
function quando(d: Date | null) {
  if (!d) return "nenhum ainda";
  const dias = Math.floor((Date.now() - d.getTime()) / 864e5);
  return dias < 1 ? "hoje" : dias === 1 ? "ontem" : `há ${dias} dias`;
}

export default async function Cliente({ params }: PageProps<"/clientes/[id]">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const c = await getCustomer(user.tenantId, id);
  if (!c) notFound();
  const [orders, st, addresses, comodato, produtos] = await Promise.all([
    listOrders(user.tenantId, { customerId: id }),
    customerStatement(user.tenantId, id),
    listAddresses(user.tenantId, [id]),
    comodatoDoCliente(user.tenantId, id),
    listProducts(user.tenantId, true),
  ]);
  const retornaveis = produtos.filter((p) => p.returnable);
  const podeRegistrar = user.role === "dono" && !c.anonymizedAt && retornaveis.length > 0;
  // resumo do topo: o que antes era preciso somar de cabeça na lista de pedidos
  // shortcut: conta os 300 pedidos mais recentes (o limite de listOrders); cliente com mais que isso aparece com menos
  const entregues = orders.filter((o) => o.status === "entregue");
  const comprado = entregues.reduce((s, o) => s + o.totalCents, 0);
  const ultimo = orders.find((o) => o.status !== "cancelado")?.createdAt ?? null;
  const fone = c.phone?.replace(/\D/g, "") ?? "";
  const desde = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric", timeZone: "America/Sao_Paulo" }).format(c.createdAt);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/clientes" className="alvo text-accent hover:underline">Clientes</Link>
          <span className="text-muted">/</span>
          <h1 className="h1">{c.name}</h1>
        </div>
        {!c.anonymizedAt && (
          // no celular as três ações dividem a largura por igual, alinhadas com os cartões de baixo
          <div className="flex flex-wrap gap-2 max-sm:grid max-sm:w-full max-sm:grid-cols-3">
            {fone.length >= 10 && (
              <>
                <a href={`tel:+55${fone}`} className="btn">
                  <Phone size={15} strokeWidth={1.75} aria-hidden="true" /> Ligar
                </a>
                <a href={`https://wa.me/${fone.length <= 11 ? "55" + fone : fone}`} target="_blank" rel="noopener noreferrer" className="btn">
                  <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" /> WhatsApp
                </a>
              </>
            )}
            <Link href={`/pedidos/novo?cliente=${c.id}`} className="btn btn-primary">
              <Plus size={15} strokeWidth={2} aria-hidden="true" /> <span className="sm:hidden">Pedido</span>
              <span className="max-sm:hidden">Novo pedido</span>
            </Link>
          </div>
        )}
      </div>
      <section className="panel mb-6 grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x" aria-label="Resumo do cliente">
        {[
          ["Cliente desde", desde],
          ["Pedidos entregues", String(entregues.length)],
          ["Já comprou", formatBRL(comprado)],
          ["Último pedido", quando(ultimo)],
        ].map(([rotulo, valor]) => (
          <div key={rotulo} className="p-4">
            <p className="text-[13px] text-muted">{rotulo}</p>
            <p className="num mt-0.5 text-lg font-semibold tracking-[-0.02em]">{valor}</p>
          </div>
        ))}
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          {st.entries.length > 0 && (
            <section id="receber" className="panel scroll-mt-6">
              <div className="flex items-end justify-between gap-3 border-b border-line p-4">
                <div>
                  <h2 className="h2">Fiado</h2>
                  <p className="mt-0.5 text-[13px] text-muted">{st.owed > 0 ? "Saldo devedor" : "Tudo pago"}</p>
                </div>
                <Money cents={st.owed} className={`text-2xl font-semibold tracking-[-0.03em] ${st.owed > 0 ? "text-danger" : ""}`} />
              </div>
              {st.owed > 0 && (
                <ActionForm key={st.owed} action={receivePaymentAction} className="grid gap-3 border-b border-line p-4 sm:grid-cols-2 sm:items-end">
                  <input type="hidden" name="customerId" value={c.id} />
                  <div>
                    <label className="label" htmlFor="amount">Valor recebido</label>
                    <input id="amount" name="amount" inputMode="decimal" data-mascara="dinheiro" required defaultValue={centsToInput(st.owed)} className="input num" />
                  </div>
                  <div>
                    <label className="label" htmlFor="method">Forma</label>
                    <select id="method" name="method" className="input" defaultValue="dinheiro">
                      <option value="dinheiro">Dinheiro</option>
                      <option value="pix">Pix</option>
                      <option value="cartao">Cartão</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="pay-note">Observação (opcional)</label>
                    <input id="pay-note" name="note" maxLength={200} className="input" />
                  </div>
                  <button className="btn btn-primary">Registrar</button>
                </ActionForm>
              )}
              <ul>
                {st.entries.map((e) => (
                  <li key={e.id} className={`flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-[13px] last:border-0 ${e.voidedAt ? "text-muted" : ""}`}>
                    <div className="min-w-0">
                      {e.kind === "compra" ? (
                        <Link href={`/pedidos/${e.id}`} className="alvo font-medium hover:underline">Compra #{e.number}</Link>
                      ) : (
                        <span className={`font-medium ${e.voidedAt ? "line-through" : ""}`}>Pagamento em {paymentLabel[e.method!].toLowerCase()}</span>
                      )}
                      <p className="text-muted">
                        {fmtQuando(e.at)}
                        {e.by && `, recebido por ${e.by}`}
                        {e.note && `. ${e.note}`}
                        {e.voidedAt && `. Estornado: ${e.voidReason}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <Money
                        cents={e.kind === "compra" ? e.amount : -e.amount}
                        className={e.voidedAt ? "line-through" : e.kind === "pagamento" ? "text-ok" : ""}
                      />
                      {e.kind === "pagamento" && !e.voidedAt && user.role === "dono" && (
                        <PopoverForm label="Estornar" titulo={`Pagamento de ${formatBRL(e.amount)}`} action={voidPaymentAction} submit="Estornar pagamento" danger>
                          <input type="hidden" name="paymentId" value={e.id} />
                          <label className="label mb-0" htmlFor={`v-${e.id}`}>Motivo</label>
                          <input id={`v-${e.id}`} name="reason" required minLength={3} className="input" />
                        </PopoverForm>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* vasilhames da loja que estão com o cliente sem ele ter pagado o casco, e a caução que ele deixou */}
          {(comodato.itens.length > 0 || podeRegistrar) && (
            <section className="panel">
              <div className="flex items-end justify-between gap-3 border-b border-line p-4">
                <div>
                  <h2 className="h2">Vasilhames em comodato</h2>
                  <p className="mt-0.5 text-[13px] text-muted">{comodato.itens.length ? "Emprestados pela loja" : "Nenhum vasilhame emprestado"}</p>
                </div>
                {comodato.caucaoCents > 0 && (
                  <div className="text-right">
                    <p className="text-[12px] text-muted">Caução em mãos</p>
                    <Money cents={comodato.caucaoCents} className="text-lg font-semibold tracking-[-0.02em]" />
                  </div>
                )}
              </div>
              {comodato.itens.length > 0 && (
                <ul>
                  {comodato.itens.map((i) => (
                    <li key={i.productId} className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                      <span>{i.nome}</span>
                      <span className="num text-lg font-semibold">{i.quantidade}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2 p-4">
                {comodato.itens.length > 0 && (
                  <Revelar label="Receber vasilhames de volta">
                    <ActionForm action={devolverVasilhameAction} className="grid gap-3 pt-3 sm:grid-cols-2" reset>
                      <input type="hidden" name="customerId" value={c.id} />
                      <div>
                        <label className="label" htmlFor="dev-produto">Vasilhame</label>
                        <select id="dev-produto" name="productId" className="input" required>
                          {comodato.itens.map((i) => (
                            <option key={i.productId} value={i.productId}>{i.nome} ({i.quantidade})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label" htmlFor="dev-qtd">Quantos voltaram</label>
                        <input id="dev-qtd" name="quantity" type="number" min={1} required defaultValue={1} className="input num" />
                      </div>
                      {comodato.caucaoCents > 0 && (
                        <div>
                          <label className="label" htmlFor="dev-caucao">Caução devolvida (opcional)</label>
                          <input id="dev-caucao" name="refund" inputMode="decimal" data-mascara="dinheiro" className="input num" placeholder="0,00" />
                        </div>
                      )}
                      <div className={comodato.caucaoCents > 0 ? "" : "sm:col-span-2"}>
                        <label className="label" htmlFor="dev-obs">Observação (opcional)</label>
                        <input id="dev-obs" name="note" maxLength={200} className="input" />
                      </div>
                      <p className="text-[13px] text-muted sm:col-span-2">Os vasilhames voltam para a loja como vazios.</p>
                      <button className="btn btn-primary sm:col-span-2 sm:justify-self-start">Registrar devolução</button>
                    </ActionForm>
                  </Revelar>
                )}
                {podeRegistrar && (
                  <Revelar label="Registrar comodato que já existia">
                    <ActionForm action={registrarComodatoAction} className="grid gap-3 pt-3 sm:grid-cols-2" reset>
                      <input type="hidden" name="customerId" value={c.id} />
                      <p className="text-[13px] text-muted sm:col-span-2">
                        Para vasilhames que já estavam com o cliente antes do sistema; não mexe no estoque. Empréstimo novo se faz no pedido.
                      </p>
                      <div>
                        <label className="label" htmlFor="reg-produto">Vasilhame</label>
                        <select id="reg-produto" name="productId" className="input" required>
                          {retornaveis.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label" htmlFor="reg-qtd">Quantidade</label>
                        <input id="reg-qtd" name="quantity" type="number" min={1} required defaultValue={1} className="input num" />
                      </div>
                      <div>
                        <label className="label" htmlFor="reg-caucao">Caução recebida (opcional)</label>
                        <input id="reg-caucao" name="deposit" inputMode="decimal" data-mascara="dinheiro" className="input num" placeholder="0,00" />
                      </div>
                      <div>
                        <label className="label" htmlFor="reg-forma">Caução paga em</label>
                        <select id="reg-forma" name="depositMethod" className="input" defaultValue="">
                          <option value="">Sem caução</option>
                          <option value="dinheiro">Dinheiro</option>
                          <option value="pix">Pix</option>
                          <option value="cartao">Cartão</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label" htmlFor="reg-obs">De onde vem</label>
                        <input id="reg-obs" name="note" required minLength={3} maxLength={200} className="input" placeholder="Ex.: contrato de comodato de 2024" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label" htmlFor="reg-senha">Sua senha, para confirmar</label>
                        <input id="reg-senha" name="confirmPassword" type="password" autoComplete="current-password" required className="input sm:max-w-xs" />
                      </div>
                      <button className="btn btn-primary sm:col-span-2 sm:justify-self-start">Registrar comodato</button>
                    </ActionForm>
                  </Revelar>
                )}
              </div>
            </section>
          )}
          {c.anonymizedAt ? (
            <section className="panel p-4">
              <h2 className="h2 mb-1">Dados apagados</h2>
              <p className="text-sm text-muted">
                Nome, contato e endereço foram apagados em {fmtQuando(c.anonymizedAt)} a pedido do cliente. Os pedidos continuam nos relatórios.
              </p>
            </section>
          ) : (
            <>
              {/* ficha de consulta: os dados em leitura, e o formulário só quando alguém vai editar */}
              <section className="panel p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="h2">Dados</h2>
                  <JanelaAcao label="Editar" titulo={`Editar ${c.name}`}>
                    <ActionForm action={saveCustomerAction} className="grid gap-3 sm:grid-cols-2">
                      <input type="hidden" name="id" value={c.id} />
                      <CustomerFields c={c} />
                      <button className="btn btn-primary mt-1 sm:col-span-2">Salvar alterações</button>
                    </ActionForm>
                  </JanelaAcao>
                </div>
                <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[7rem_1fr]">
                  {[
                    ["Telefone", c.phone],
                    ["Endereço", c.address],
                    ["Referência", c.reference],
                    ["Observações", c.notes],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="text-muted">{k}</dt>
                        <dd className="min-w-0 break-words">{k === "Telefone" ? <a href={`tel:${v!.replace(/\D/g, "")}`} className="alvo num hover:text-accent">{v}</a> : v}</dd>
                      </div>
                    ))}
                </dl>
              </section>
              <section className="panel p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="h2">Outros endereços</h2>
                  <JanelaAcao label="Adicionar" titulo="Adicionar endereço">
                    <ActionForm action={addAddressAction} className="grid gap-3 sm:grid-cols-2" reset>
                      <input type="hidden" name="customerId" value={c.id} />
                      <div>
                        <label className="label" htmlFor="addr-label">Nome do endereço</label>
                        <input id="addr-label" name="label" required minLength={2} maxLength={40} className="input" placeholder="Trabalho" />
                      </div>
                      <div>
                        <label className="label" htmlFor="addr-ref">Referência</label>
                        <input id="addr-ref" name="reference" maxLength={200} className="input" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label" htmlFor="addr-address">Endereço</label>
                        <input id="addr-address" name="address" required minLength={5} maxLength={200} className="input" />
                      </div>
                      <button className="btn btn-primary mt-1 sm:col-span-2">Adicionar endereço</button>
                    </ActionForm>
                  </JanelaAcao>
                </div>
                {addresses.length > 0 ? (
                  <ul className="divide-y divide-line rounded-md border border-line">
                    {addresses.map((a) => (
                      <li key={a.id} className="flex items-start justify-between gap-3 px-3 py-2">
                        <div className="min-w-0">
                          <p className="font-medium">{a.label}</p>
                          <p className="text-sm text-muted">{[a.address, a.reference].filter(Boolean).join(", ")}</p>
                        </div>
                        <ActionForm action={removeAddressAction} confirm={`Remover o endereço "${a.label}"?`}>
                          <input type="hidden" name="addressId" value={a.id} />
                          <button className="btn btn-sm tap hover:text-danger">Remover</button>
                        </ActionForm>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">Nenhum.</p>
                )}
              </section>
              {user.role === "dono" && (
                <section className="panel p-4">
                  <h2 className="h2 mb-1">Apagar dados pessoais</h2>
                  <p className="mb-3 text-sm text-muted">
                    Quando o cliente pedir (LGPD). Os pedidos ficam, sem identificar a pessoa.
                  </p>
                  <Revelar label="Apagar dados do cliente" perigo>
                    <ActionForm action={anonymizeCustomerAction} confirm={`Apagar os dados pessoais de ${c.name}? Nome, telefone, endereço e observações saem também do histórico. Não tem volta.`}>
                      <input type="hidden" name="customerId" value={c.id} />
                      <div className="mb-3 max-w-xs">
                        <label className="label" htmlFor="anon-pw">Sua senha, para confirmar</label>
                        <input id="anon-pw" name="confirmPassword" type="password" autoComplete="current-password" required className="input" />
                      </div>
                      <button className="btn btn-danger">Apagar dados do cliente</button>
                    </ActionForm>
                  </Revelar>
                </section>
              )}
            </>
          )}
        </div>
        <section className="panel self-start overflow-x-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3">
            <h2 className="h2">Pedidos</h2>
          </div>
          {orders.length ? (
            <table className="table">
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="num text-muted"><Link href={`/pedidos/${o.id}`} className="alvo hover:text-accent">#{o.number}</Link></td>
                    <td>{fmtQuando(o.createdAt)}</td>
                    {/* no celular a forma de pagamento sai: o resto cabe sem rolar */}
                    <td className="hidden sm:table-cell">{paymentLabel[o.paymentMethod]}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td className="text-right"><Money cents={o.totalCents} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>Este cliente ainda não fez pedidos.</Empty>
          )}
        </section>
      </div>
    </>
  );
}
