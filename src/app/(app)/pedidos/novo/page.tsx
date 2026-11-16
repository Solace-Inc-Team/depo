import Link from "next/link";
import { X } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getCustomer, getSettings, listAddresses, listDrivers, listProducts, listShifts, stockOverview } from "@/domain/queries";
import { withTenant } from "@/db";
import { NewOrderForm } from "./new-order-form";

export const metadata = { title: "Novo pedido" };

export default async function NovoPedido({ searchParams }: PageProps<"/pedidos/novo">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const { cliente } = await searchParams;
  // uma transação só para as leituras da tela: não ocupa 5 conexões do banco por visita
  const isCustomer = typeof cliente === "string" && /^[0-9a-f-]{36}$/.test(cliente);
  const [products, initial, drivers, open, stock, settings, addresses] = await withTenant(user.tenantId, () =>
    Promise.all([
      listProducts(user.tenantId, true),
      isCustomer ? getCustomer(user.tenantId, cliente as string) : null,
      listDrivers(user.tenantId, user.branchId),
      listShifts(user.tenantId, user.branchId, "aberto"),
      stockOverview(user.tenantId, user.branchId),
      getSettings(user.tenantId),
      isCustomer ? listAddresses(user.tenantId, [cliente as string]) : [],
    ]),
  );
  const onShift = new Set(open.map((s) => s.driverId));
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="h1">Novo pedido</h1>
        {/* no celular a barra de baixo dá lugar à do carrinho: a saída fica aqui no alto */}
        <Link href="/pedidos" aria-label="Fechar sem lançar" className="-mr-2 grid size-11 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg sm:hidden">
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
      <NewOrderForm
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          priceCents: p.priceCents,
          returnable: p.returnable,
          containerPriceCents: p.containerPriceCents,
          available: stock.find((s) => s.id === p.id)?.available ?? 0,
          reserved: stock.find((s) => s.id === p.id)?.reserved ?? 0,
        }))}
        drivers={drivers.map((d) => ({ ...d, onShift: onShift.has(d.id) }))}
        initialCustomer={
          initial && !initial.anonymizedAt
            ? { id: initial.id, name: initial.name, phone: initial.phone, address: initial.address, addresses: addresses.map((a) => ({ id: a.id, label: a.label, address: a.address })) }
            : undefined
        }
        discountLimitPct={user.role === "dono" ? null : settings.staffDiscountPct}
      />
    </>
  );
}
