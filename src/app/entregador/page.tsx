import { ViewTransition } from "react";
import Link from "next/link";
import { TemaBotao } from "@/components/tema-botao";
import { Clock3, MapPin, Phone } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { avisoAtual } from "@/domain/platform";
import { AvisoPlataforma } from "@/components/aviso-plataforma";
import { getShift, itemsForOrders, listOrders, openShiftFor, getOrder } from "@/domain/queries";
import { conferirPixMp, pixDoPedido } from "@/domain/pix";
import { PixBox } from "@/components/pix-box";
import { logout } from "@/app/actions";
import { MarcaDaSessao } from "@/components/logo";
import { Empty, Money, paymentLabel } from "@/components/ui";
import { DeliverButton } from "./deliver-button";
import { DeliveryExceptions } from "@/components/delivery-forms";
import { LiveNumber } from "@/components/live-number";
import { TextoQueTroca } from "@/components/texto-que-troca";

export const metadata = { title: "Minhas entregas" };

export default async function Entregador() {
  const user = await requireUser("entregador");
  const shift = await openShiftFor(user.tenantId, user.userId);
  const s = shift ? await getShift(user.tenantId, shift.id) : null;
  const route = shift ? await listOrders(user.tenantId, { status: "em_rota", driverId: user.userId }) : [];
  // Pix pelo Mercado Pago: confere antes, para não mostrar QR de pedido já pago
  await Promise.all(route.filter((o) => o.paymentMethod === "pix").map((o) => conferirPixMp(user.tenantId, o.id)));
  const details = await Promise.all(route.map((o) => getOrder(user.tenantId, o.id)));
  const pixes = new Map(
    await Promise.all(details.filter((o) => o?.paymentMethod === "pix" && !o.pixConfirmedAt).map(async (o) => [o!.id, await pixDoPedido(user.tenantId, o!.id)] as const)),
  );
  const items = await itemsForOrders(user.tenantId, route.map((o) => o.id));
  const done = s ? s.orders.filter((o) => o.status === "entregue") : [];
  const aviso = await avisoAtual();

  return (
    <main className="mx-auto min-h-screen max-w-lg">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/85 px-4 py-3 backdrop-blur">
        <MarcaDaSessao />
        {/* no alto, só o que tem nome: quem nunca viu o sistema não adivinha ícone solto */}
        <div className="flex items-center gap-2">
          <Link href="/ajuda" className="btn tap">Ajuda</Link>
          <form action={logout}>
            <button className="btn tap">Sair</button>
          </form>
        </div>
      </header>

      <div className="pagina px-4 py-6">
        {aviso && <AvisoPlataforma id={aviso.id} texto={aviso.texto} />}
        <p className="text-muted">Olá, {user.name.split(" ")[0]}</p>
        {!s ? (
          <div className="panel mt-4 flex flex-col items-center px-6 py-12 text-center">
            <Clock3 size={28} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
            <h1 className="h2 mt-3">Sem turno aberto</h1>
            <p className="mt-1 max-w-xs text-muted">Peça para a loja abrir seu turno antes de sair com mercadoria.</p>
          </div>
        ) : (
          <>
            <section className="panel mt-3 p-5" aria-label="Seu caixa">
              <p className="text-[13px] text-muted">Dinheiro que você deve ter agora</p>
              <LiveNumber value={s.expected} cents className="mt-1 text-[2.75rem] leading-none font-semibold tracking-[-0.035em]" />
              {/* a conta em linhas, como num recibo: em texto corrido era difícil de ler na rua */}
              <dl className="mt-4 space-y-1 border-t border-line pt-3 text-[13px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Troco</dt>
                  <dd><Money cents={s.openingCashCents} /></dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Vendas em dinheiro</dt>
                  <dd>+ <Money cents={s.summary.dinheiro} /></dd>
                </div>
                {s.handedOver + s.spent > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Entregue ao caixa e gastos</dt>
                    <dd>− <Money cents={s.handedOver + s.spent} /></dd>
                  </div>
                )}
              </dl>
            </section>

            <h1 className="h2 mt-6 mb-3">
              {route.length ? `${route.length} ${route.length === 1 ? "entrega" : "entregas"} para fazer` : "Nenhuma entrega pendente"}
            </h1>
            <ul className="space-y-4">
              {details.map((o) =>
                o ? (
                  // entregue: o cartão sai pela lateral e os de baixo sobem para o lugar
                  <ViewTransition key={o.id} name={`entrega-${o.id}`} update="move" exit="slide-out" default="none">
                    <li className="panel overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-lg font-semibold">{o.customerName ?? "Cliente"}</p>
                          <span className="num text-muted">#{o.number}</span>
                        </div>
                        {o.customerAddress && (
                          <a
                            className="mt-1 flex min-h-11 items-center gap-2 text-accent"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.customerAddress)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MapPin size={16} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
                            {o.customerAddress}
                          </a>
                        )}
                        {o.customerReference && <p className="mt-0.5 pl-6 text-[13px] text-muted">{o.customerReference}</p>}
                        {o.customerPhone && (
                          <a href={`tel:${o.customerPhone.replace(/[^\d+]/g, "")}`} className="flex min-h-11 items-center gap-2 text-accent">
                            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
                            {o.customerPhone}
                          </a>
                        )}
                        <ul className="mt-3 space-y-0.5">
                          {items.filter((i) => i.orderId === o.id).map((i, k) => (
                            <li key={k}>
                              <b className="num">{i.quantity}×</b> {i.name}
                              {i.returnsEmpty ? <span className="text-muted">, recolher vazio</span> : <span className="text-warn-fg">, sem troca</span>}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 rounded-md bg-subtle px-3 py-2">
                          <span>
                            Cobrar em {paymentLabel[o.paymentMethod].toLowerCase()}
                            {o.cashPartCents > 0 && (
                              <span className="mt-1 block text-[15px] font-semibold">
                                <Money cents={o.cashPartCents} /> em dinheiro + <Money cents={o.totalCents - o.cashPartCents} /> no {paymentLabel[o.paymentMethod].toLowerCase()}
                              </span>
                            )}
                          </span>
                          <Money cents={o.totalCents} className="text-2xl font-semibold" />
                        </div>
                        {o.changeForCents ? (
                          <p className="mt-2 font-semibold text-warn-fg">
                            Levar troco: <Money cents={o.changeForCents - o.totalCents} /> (cliente paga com <Money cents={o.changeForCents} />)
                          </p>
                        ) : null}
                        {o.notes && <p className="mt-2 text-sm">Obs.: {o.notes}</p>}
                        {pixes.get(o.id) && (
                          <details className="mt-2">
                            <summary className="btn tap cursor-pointer list-none">Mostrar QR do Pix para o cliente</summary>
                            <div className="mt-2">
                              <PixBox code={pixes.get(o.id)!.codigo} size={200} />
                              <p className="mt-2 text-[13px]"><TextoQueTroca texto="Esperando o cliente pagar" brilho /></p>
                            </div>
                          </details>
                        )}
                      </div>
                      <div className="border-t border-line p-3">
                        <DeliverButton orderId={o.id} label={o.paymentMethod === "fiado" ? "Entreguei (fiado)" : "Entreguei e recebi"} />
                        <div className="mt-2">
                          <DeliveryExceptions order={o} items={items.filter((i) => i.orderId === o.id)} forDriver />
                        </div>
                      </div>
                    </li>
                  </ViewTransition>
                ) : null,
              )}
            </ul>
            {!route.length && (
              <div className="panel">
                <Empty>Quando a loja te mandar um pedido, ele aparece aqui.</Empty>
              </div>
            )}

            {done.length > 0 && (
              <section className="mt-8">
                <h2 className="h2 mb-2">Entregues neste turno</h2>
                <ul className="panel">
                  {done.map((o) => (
                    <ViewTransition key={o.id} enter="item-in" default="none">
                      <li className="flex justify-between border-b border-line px-4 py-2.5 last:border-0">
                        <span>#{o.number} {o.customerName}, {paymentLabel[o.paymentMethod]}</span>
                        <Money cents={o.totalCents} />
                      </li>
                    </ViewTransition>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>

      {/* o que se ajusta uma vez fica no pé, longe do trabalho */}
      <footer className="flex items-center justify-center gap-2 border-t border-line px-4 py-4 text-[13px] text-muted">
        <Link href="/senha" className="tap rounded-md px-2 hover:text-fg">Trocar senha</Link>
        <span aria-hidden="true">·</span>
        <TemaBotao className="size-11" />
      </footer>
    </main>
  );
}
