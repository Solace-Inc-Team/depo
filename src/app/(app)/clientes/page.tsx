import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listCustomers } from "@/domain/queries";
import { ActionForm } from "@/components/action-form";
import { CustomerFields } from "@/components/customer-fields";
import { saveCustomerAction } from "@/app/actions";
import { Empty, PageHeader } from "@/components/ui";
import { JanelaAcao } from "@/components/janela-acao";
import { Dicas } from "@/components/dicas";
import { CampoBusca } from "@/components/campo-busca";

export const metadata = { title: "Clientes" };

export default async function Clientes({ searchParams }: PageProps<"/clientes">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const { q } = await searchParams;
  const term = typeof q === "string" ? q : "";
  const customers = await listCustomers(user.tenantId, term);

  return (
    <>
      <PageHeader title="Clientes">
        <JanelaAcao label="Cadastrar cliente" titulo="Cadastrar cliente" primario>
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
                </div>
                <Dicas className="shrink-0">
                <Link
                  href={`/pedidos/novo?cliente=${c.id}`}
                  data-dica="Novo pedido"
                  aria-label={`Novo pedido para ${c.name}`}
                  className="relative grid size-11 shrink-0 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg sm:size-9"
                >
                  <Plus size={17} strokeWidth={1.75} aria-hidden="true" />
                </Link>
                </Dicas>
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
