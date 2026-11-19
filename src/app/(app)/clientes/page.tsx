import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listCustomers } from "@/domain/queries";
import { listDebtors } from "@/domain/receivables";
import { ActionForm } from "@/components/action-form";
import { CustomerFields } from "@/components/customer-fields";
import { saveCustomerAction } from "@/app/actions";
import { Empty, Money, PageHeader } from "@/components/ui";
import { JanelaAcao } from "@/components/janela-acao";
import { CampoBusca } from "@/components/campo-busca";

export const metadata = { title: "Clientes" };

const DIA = 864e5;
/** "pediu hoje", "pediu ontem", "pediu há 6 dias": quem sumiu aparece sem abrir a ficha. */
function ultimoPedido(d: Date | null) {
  if (!d) return "ainda sem pedido";
  const dias = Math.floor((Date.now() - d.getTime()) / DIA);
  return dias < 1 ? "pediu hoje" : dias === 1 ? "pediu ontem" : `pediu há ${dias} dias`;
}

export default async function Clientes({ searchParams }: PageProps<"/clientes">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const { q } = await searchParams;
  const term = typeof q === "string" ? q : "";
  const [customers, devedores] = await Promise.all([listCustomers(user.tenantId, term), listDebtors(user.tenantId)]);
  const deve = new Map(devedores.map((d) => [d.id, d.owed]));

  return (
    <>
      <PageHeader title="Clientes">
        <JanelaAcao label="Novo cliente" titulo="Novo cliente" icone={<Plus size={16} strokeWidth={2} aria-hidden="true" />} primario>
          <ActionForm action={saveCustomerAction} className="grid gap-3 sm:grid-cols-2" reset>
            <input type="hidden" name="depois" value="ficha" />
            <CustomerFields />
            <button className="btn btn-primary mt-1 sm:col-span-2">Cadastrar cliente</button>
          </ActionForm>
        </JanelaAcao>
      </PageHeader>
      <section className="panel">
        {/* a mesma busca de Pedidos: Enter procura */}
        <form className="border-b border-line p-3" role="search">
          <div className="sm:max-w-sm">
            <CampoBusca name="q" defaultValue={term} placeholder="Nome, telefone ou endereço" rotulo="Buscar cliente" />
          </div>
        </form>
        {customers.length ? (
          <ul>
            {customers.map((c) => (
              // a linha inteira leva ao cliente (o link do nome cobre a linha); telefone e novo pedido ficam por cima
              <li key={c.id} className="relative flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0 hover:bg-subtle/60">
                <div className="min-w-0">
                  <Link href={`/clientes/${c.id}`} className="font-medium after:absolute after:inset-0">{c.name}</Link>
                  {c.address && <p className="truncate text-sm text-muted">{c.address}</p>}
                  {/* telefone inteiro: é o que mais se usa da lista, e no celular liga com um toque */}
                  {c.phone && (
                    <a href={`tel:${c.phone.replace(/\D/g, "")}`} className="alvo num relative text-sm text-muted hover:text-accent">
                      {c.phone}
                    </a>
                  )}
                  {/* no celular não cabe a coluna da direita: o mesmo resumo desce para baixo do telefone */}
                  <p className="text-[12.5px] text-muted sm:hidden">
                    {ultimoPedido(c.ultimoPedido)}
                    {deve.has(c.id) && (
                      <span className="text-warn-fg">
                        {" "}
                        · deve <Money cents={deve.get(c.id)!} className="font-medium" />
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="hidden text-right text-[13px] sm:block">
                    <p className="text-muted">{ultimoPedido(c.ultimoPedido)}</p>
                    {deve.has(c.id) && (
                      <p className="text-warn-fg">
                        deve <Money cents={deve.get(c.id)!} className="font-medium" />
                      </p>
                    )}
                  </div>
                  {/* um botão de verdade: o "+" solto parecia "adicionar cliente" */}
                  <Link href={`/pedidos/novo?cliente=${c.id}`} aria-label={`Novo pedido para ${c.name}`} className="btn btn-sm tap relative gap-1.5 max-sm:min-w-11 max-sm:justify-center">
                    <Plus size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span className="max-sm:hidden">Novo pedido</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>{term ? `Nenhum cliente encontrado para "${term}".` : "Nenhum cliente cadastrado."}</Empty>
        )}
      </section>
    </>
  );
}
