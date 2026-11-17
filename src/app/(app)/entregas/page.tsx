import { ViewTransition } from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { withTenant } from "@/db";
import { getSettings, listDrivers, listOrders, listShifts, listViagens, programadosParaHoje } from "@/domain/queries";
import { todayISO } from "@/lib/period";
import { ActionForm } from "@/components/action-form";
import { confirmPixAction, dispatchAction, lancarProgramadoAction, pularProgramadoAction } from "@/app/actions";
import { cancelarPixVencidos, PRAZO_PAGAR_MS } from "@/domain/pix";
import { Empty, Money, PageHeader, SiteBadge, fmtTime, paymentLabel } from "@/components/ui";
import { ResultadoRua } from "@/components/resultado-rua";
import { Check, MessageCircle, Printer, Repeat } from "lucide-react";
import { headers } from "next/headers";
import { linkWhatsApp, mensagemSaida } from "@/lib/whatsapp";
import { formatBRL } from "@/lib/money";
import { cashOf, expectedCash } from "@/lib/cash";
import { JanelaAcao } from "@/components/janela-acao";
import { Marcar } from "@/components/controles";
import { FORM_GRUPO, SaidaEmGrupo } from "./saida-grupo";
import { AcertoVolta } from "./acerto-volta";
import { sugerirEntregadores } from "@/lib/sugestao";
import { SaidaEntregador } from "./saida";

export const metadata = { title: "Entregas" };

const minutesSince = (d: Date | null) => (d ? Math.floor((Date.now() - d.getTime()) / 60000) : 0);
// o cabeçalho de cada entregador e o rodapé do acerto deslizam junto com os cartões: sem isso, depois de um acerto
// o cabeçalho pulava na hora e os cartões de baixo desciam sozinhos, longe dele e por fora da borda do painel
const Desliza = ({ nome, children }: { nome: string; children: React.ReactElement }) => (
  <ViewTransition name={nome} update="move" enter="item-in" exit="item-out" default="none">
    {children}
  </ViewTransition>
);
// o mesmo nome na fila e na rua: quando o pedido sai, o cartão desliza de uma coluna para a outra
const Card = ({ id, children }: { id: string; children: React.ReactElement }) => (
  <ViewTransition name={`pedido-${id}`} share="morph" update="move" enter="item-in" exit="item-out" default="none">
    {children}
  </ViewTransition>
);

const waited = (min: number) =>
  min < 60 ? `${min} min` : min % 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}` : `${min / 60} h`;

// "há 0 min" parecia defeito: antes do primeiro minuto é "agora"
const ha = (min: number) => (min < 1 ? "agora" : `há ${waited(min)}`);

export default async function Entregas() {
  const user = await requireUser("dono", "atendente", "caixa");
  // quem passou dos 15 minutos sem pagar sai antes de a fila ser montada
  await cancelarPixVencidos(user.tenantId);
  const [aPagar, waiting, inRoute, drivers, open, settings, viagens, programados] = await withTenant(user.tenantId, () =>
    Promise.all([
      listOrders(user.tenantId, { status: "aguardando_pagamento", branchId: user.branchId }),
      listOrders(user.tenantId, { status: "aberto", branchId: user.branchId }),
      listOrders(user.tenantId, { status: "em_rota", branchId: user.branchId }),
      listDrivers(user.tenantId, user.branchId),
      listShifts(user.tenantId, user.branchId, "aberto"),
      getSettings(user.tenantId),
      listViagens(user.tenantId, user.branchId),
      programadosParaHoje(user.tenantId, user.branchId),
    ]),
  );
  const h = await headers();
  const base = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const onShift = drivers.filter((d) => open.some((s) => s.driverId === d.id));
  // mais antigo primeiro: é o próximo a sair
  const queue = [...waiting].reverse();
  // entregador sugerido para cada pedido da fila: quem já vai para o bairro, senão quem está mais livre
  const sugestoes = sugerirEntregadores(
    queue.map((o) => ({ id: o.id, endereco: o.customerAddress })),
    onShift.map((d) => {
      const turno = open.find((s) => s.driverId === d.id)!;
      return {
        id: d.id,
        nome: d.name,
        enderecosNaRua: inRoute.filter((o) => o.driverId === d.id).map((o) => o.customerAddress),
        entreguesNoTurno: turno.orderCount - turno.inRoute,
      };
    }),
  );
  const primeiroNome = (id: string) => onShift.find((d) => d.id === id)?.name.split(" ")[0] ?? "";
  const late = (o: { createdAt: Date }) => minutesSince(o.createdAt) > settings.lateAfterMinutes;
  const lateCount = [...waiting, ...inRoute].filter(late).length;
  // mais de um pedido na fila e alguém para levar: dá para marcar vários e mandar numa saída só
  const podeJuntar = onShift.length > 0 && queue.length > 1;
  // quem confere o dinheiro do entregador: o dono ou o caixa
  const confere = user.role !== "atendente";

  return (
    <>
      <PageHeader
        title="Entregas"
        description={
          lateCount
            ? `${lateCount} ${lateCount === 1 ? "pedido passou" : "pedidos passaram"} de ${waited(settings.lateAfterMinutes)} desde que ${lateCount === 1 ? "foi lançado" : "foram lançados"}.`
            : undefined
        }
      />

      {/* pedidos do site no Pix que ainda não foram pagos: ficam fora da fila até o Pix cair */}
      {aPagar.length > 0 && (
        <section className="panel mb-6">
          <h2 className="h2 border-b border-line px-4 py-3">
            Esperando o Pix <span className="font-normal text-muted">({aPagar.length})</span>
          </h2>
          <ul>
            {[...aPagar].reverse().map((o) => (
              <Card key={o.id} id={o.id}>
                <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 last:border-0">
                  <div className="min-w-0 wrap-anywhere">
                    <Link href={`/pedidos/${o.id}`} className="font-medium hover:text-accent">
                      <span className="num text-muted">#{o.number}</span> {o.customerName ?? "Cliente"}
                    </Link>
                    <p className="text-sm text-muted">
                      <Money cents={o.totalCents} /> no Pix
                      {o.pixAutomatico
                        ? `, confirma sozinho; cancela às ${fmtTime(new Date(o.createdAt.getTime() + PRAZO_PAGAR_MS))} se não pagar`
                        : ", confira no extrato antes de liberar"}
                    </p>
                  </div>
                  {/* sem Mercado Pago, quem confirma é a loja: viu no extrato, o pedido entra na fila */}
                  {!o.pixAutomatico && user.role !== "atendente" && (
                    <ActionForm action={confirmPixAction} confirm={`Confirmar que o Pix de ${formatBRL(o.totalCents)} do pedido #${o.number} caiu no extrato? O pedido entra na fila de entrega.`}>
                      <input type="hidden" name="orderId" value={o.id} />
                      <button className="btn btn-primary">Recebi o Pix</button>
                    </ActionForm>
                  )}
                </li>
              </Card>
            ))}
          </ul>
        </section>
      )}

      {/* entregas programadas do dia: a atendente lança com um toque (vai para a fila) ou pula para a próxima data */}
      {/* a seção entra e sai animada, e as colunas de baixo deslizam junto quando ela encolhe ou some */}
      {programados.length > 0 && (
        <Desliza nome="programados">
        <section className="panel mb-6">
          <h2 className="h2 flex items-center gap-2 border-b border-line px-4 py-3">
            <Repeat size={15} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
            Programados para hoje <span className="font-normal text-muted">({programados.length})</span>
          </h2>
          <ul>
            {programados.map((p) => {
              const atraso = Math.round((Date.parse(todayISO()) - Date.parse(p.proxima)) / 86400e3);
              return (
                <Desliza key={p.id} nome={`programado-${p.id}`}>
                  <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 last:border-0">
                    <div className="min-w-0">
                      <Link href={`/clientes/${p.customerId}`} className="alvo font-semibold hover:text-accent">
                        {p.clienteNome}
                      </Link>
                      {atraso > 0 && (
                        <span className="ml-2 text-[13px] font-medium text-warn-fg">{atraso === 1 ? "era para ontem" : `atrasado ${atraso} dias`}</span>
                      )}
                      {/* como os cartões da fila: endereço, valor e pagamento; os itens embaixo */}
                      <p className="text-sm text-muted">
                        {p.endereco || "Sem endereço"}. <Money cents={p.totalCents} />, {paymentLabel[p.paymentMethod].toLowerCase()}
                      </p>
                      <p className="text-[13px] text-muted">{p.resumo}</p>
                    </div>
                    <div className="flex gap-2">
                      <ActionForm action={pularProgramadoAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="btn">Pular</button>
                      </ActionForm>
                      <ActionForm action={lancarProgramadoAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="btn btn-primary">Lançar pedido</button>
                      </ActionForm>
                    </div>
                  </li>
                </Desliza>
              );
            })}
          </ul>
        </section>
        </Desliza>
      )}

      <Desliza nome="entregas-colunas">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <h2 className="h2 border-b border-line px-4 py-3">
            Aguardando saída <span className="font-normal text-muted">({queue.length})</span>
          </h2>
          {queue.length ? (
            <ul>
              {queue.map((o) => (
                <Card key={o.id} id={o.id}>
                  <li className={`border-b border-line px-4 py-3 last:border-0 ${minutesSince(o.createdAt) < 1 ? "row-new" : ""}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      {podeJuntar && (
                        // o rótulo em volta dá ao toque 44 px, sem aumentar a caixa
                        <label className="-my-[13px] -ml-[13px] flex shrink-0 cursor-pointer self-center p-[13px]">
                          <Marcar form={FORM_GRUPO} name="orderId" value={o.id} aria-label={`Marcar o pedido #${o.number} para sair junto`} />
                        </label>
                      )}
                      <Link href={`/pedidos/${o.id}`} className="alvo mr-auto min-w-0 font-semibold wrap-anywhere hover:text-accent">
                        <span className="num text-muted">#{o.number}</span> {o.customerName ?? "Cliente"}
                        {o.origin === "portal" && <SiteBadge />}
                      </Link>
                      <span className={`text-[13px] ${late(o) ? "font-semibold text-danger" : "text-muted"}`}>
                        {late(o) ? "Atrasado, " : ""}{ha(minutesSince(o.createdAt))}
                      </span>
                    </div>
                    <p className="text-sm text-muted wrap-anywhere">
                      {o.customerAddress || "Sem endereço"}. <Money cents={o.totalCents} />, {paymentLabel[o.paymentMethod].toLowerCase()}
                    </p>
                    {o.occurrence && <p className="mt-1 text-sm font-medium text-warn-fg">Voltou da rua: {o.occurrence}</p>}
                    {/* flex-wrap: o aviso de "escolha o entregador" desce para a linha de baixo em vez de espremer a lista */}
                    {onShift.length > 0 && (
                      <ActionForm action={dispatchAction} className="saida-unica mt-2 flex flex-wrap gap-2">
                        <input type="hidden" name="orderId" value={o.id} />
                        <SaidaEntregador id={`d-${o.id}`} entregadores={onShift.map((d) => ({ id: d.id, name: d.name }))} sugerido={sugestoes.get(o.id)?.entregadorId ?? ""} />
                      </ActionForm>
                    )}
                    {/* o porquê da sugestão só quando não é óbvio: o entregador já vai para o mesmo bairro */}
                    {onShift.length > 1 && sugestoes.get(o.id)?.motivo === "bairro" && (
                      <p className="mt-1.5 text-[13px] text-muted">{primeiroNome(sugestoes.get(o.id)!.entregadorId)} já vai ao bairro {sugestoes.get(o.id)!.bairroEscrito}</p>
                    )}
                  </li>
                </Card>
              ))}
            </ul>
          ) : (
            <Empty>Nenhum pedido esperando.</Empty>
          )}
          {queue.length > 0 && onShift.length === 0 && (
            <p className="border-t border-line px-4 py-3 text-sm text-muted">
              Nenhum entregador com turno aberto. <Link href="/caixa" className="text-accent underline">Abrir turno</Link>
            </p>
          )}
        </section>

        <section className="panel">
          {/* a lista é de quem está em turno (livre ou na rua); o número é de pedidos que estão na rua */}
          <h2 className="h2 flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
            Entregadores em turno
            {inRoute.length > 0 && <span className="text-[13px] font-normal text-muted">{inRoute.length === 1 ? "1 pedido na rua" : `${inRoute.length} pedidos na rua`}</span>}
          </h2>
          {onShift.length ? (
            onShift.map((d) => {
              // a viagem dele: o que está na rua e o que já entregou e ainda não foi acertado
              const daViagem = viagens.filter((o) => o.driverId === d.id);
              const naRua = daViagem.filter((o) => o.status === "em_rota");
              const entregues = daViagem.filter((o) => o.status === "entregue");
              const tripId = (entregues[0] ?? daViagem[0])?.tripId;
              const daVolta = daViagem.filter((o) => o.tripId === tripId);
              const esperado = expectedCash(0, daVolta);
              return (
                <div key={d.id} className="border-b border-line last:border-0">
                  {/* com pedidos, o nome é cabeçalho do grupo; livre, é uma linha comum: está pronto para sair */}
                  <Desliza nome={`entregador-${d.id}`}>
                  <p className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 text-[13px] font-medium ${daViagem.length ? "bg-subtle py-2" : "py-3"}`}>
                    <span>{d.name}</span>
                    {daViagem.length ? (
                      <span className="flex items-center gap-3 text-muted">
                        {[naRua.length && `${naRua.length} na rua`, entregues.length && `${entregues.length} ${entregues.length === 1 ? "entregue" : "entregues"}`].filter(Boolean).join(", ")}
                        {/* para quem sai sem celular: a folha com tudo que ele precisa na rua */}
                        {naRua.length > 0 && (
                          <Link href={`/entregas/rota/${d.id}`} className="tap flex items-center gap-1 font-normal hover:text-fg">
                            <Printer size={13} strokeWidth={1.75} aria-hidden="true" />
                            Folha da rota
                          </Link>
                        )}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-ok">
                        <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
                        livre
                      </span>
                    )}
                  </p>
                  </Desliza>
                  {daViagem.map((o) => (
                    <Card key={o.id} id={o.id}>
                      {o.status === "entregue" ? (
                        // entregue: fica aqui, apagado, até o acerto da volta
                        <div className="viagem-entregue flex flex-wrap items-center justify-between gap-x-3 border-b border-line/60 px-4 py-2.5 last:border-0">
                          <Link href={`/pedidos/${o.id}`} className="-my-3 flex min-w-0 items-center gap-1.5 py-3 hover:text-fg">
                            <Check size={14} strokeWidth={2} className="shrink-0 self-center text-ok" aria-hidden="true" />
                            <span className="min-w-0 wrap-anywhere">
                              <span className="num">#{o.number}</span> {o.customerName ?? "Cliente"}
                            </span>
                          </Link>
                          <span className="text-[13px]">
                            {cashOf(o) > 0 ? <><Money cents={cashOf(o)} /> em dinheiro</> : paymentLabel[o.paymentMethod]}
                            {o.deliveredAt && `, às ${fmtTime(o.deliveredAt)}`}
                          </span>
                        </div>
                      ) : (
                      <div className={`border-b border-line/60 px-4 py-2.5 last:border-0 ${minutesSince(o.dispatchedAt) < 1 ? "row-new" : ""}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <Link href={`/pedidos/${o.id}`} className="min-w-0 wrap-anywhere hover:text-accent">
                            <span className="num text-muted">#{o.number}</span> {o.customerName ?? "Cliente"}
                            <span className="block text-sm text-muted">{o.customerAddress}</span>
                          </Link>
                          <span className={`text-[13px] ${late(o) ? "font-semibold text-danger" : "text-muted"}`}>
                            saiu {ha(minutesSince(o.dispatchedAt))}
                          </span>
                        </div>
                        {/* o entregador voltou ou ligou: a loja lança o que aconteceu */}
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <ResultadoRua id={o.id} numero={o.number} totalCents={o.totalCents} pagamento={paymentLabel[o.paymentMethod]} />
                          {/* o cliente fica sabendo que saiu, com o link para acompanhar: menos ligação perguntando */}
                          {(() => {
                            const zap = o.customerName
                              ? linkWhatsApp(
                                  o.customerPhone,
                                  mensagemSaida({ cliente: o.customerName, loja: settings.name, numero: o.number, entregador: o.driverName, link: `${base}/pedir/${settings.slug}/acompanhar/${o.trackingId}` }),
                                )
                              : null;
                            return (
                              zap && (
                                <a href={zap} target="_blank" rel="noopener noreferrer" className="btn h-11 px-4 text-[13px] sm:h-8 sm:px-3">
                                  <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" /> Avisar cliente
                                </a>
                              )
                            );
                          })()}
                        </div>
                      </div>
                      )}
                    </Card>
                  ))}
                  {/* ele voltou à loja: confere o dinheiro das entregas desta viagem */}
                  {confere && entregues.length > 0 && tripId && (
                    <Desliza nome={`volta-${d.id}`}>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line/60 px-4 py-3">
                      <p className="text-[13px] text-muted">
                        {esperado > 0 ? <>Em dinheiro nesta volta: <Money cents={esperado} className="font-semibold text-fg" /></> : "Nada em dinheiro nesta volta"}
                      </p>
                      <JanelaAcao label="Acertar a volta" titulo={`Acerto da volta de ${d.name.split(" ")[0]}`} primario>
                        <AcertoVolta shiftId={daVolta[0].shiftId ?? ""} tripId={tripId} esperado={esperado}>
                          <ul className="divide-y divide-line rounded-lg border border-line text-sm">
                            {daVolta.map((o) => (
                              <li key={o.id} className="flex items-baseline justify-between gap-3 px-3 py-2">
                                <span className="min-w-0 truncate">
                                  <span className="num text-muted">#{o.number}</span> {o.customerName ?? "Cliente"}
                                </span>
                                <span className="shrink-0 text-[13px] text-muted">
                                  {o.status === "em_rota" ? "continua com ele" : cashOf(o) > 0 ? <Money cents={cashOf(o)} className="text-fg" /> : paymentLabel[o.paymentMethod]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </AcertoVolta>
                      </JanelaAcao>
                    </div>
                    </Desliza>
                  )}
                </div>
              );
            })
          ) : (
            <Empty>Nenhum entregador em turno.</Empty>
          )}
        </section>
      </div>
      </Desliza>
      {/* com um entregador só em turno, a barra já vem com ele */}
      {podeJuntar && <SaidaEmGrupo entregadores={onShift.map((d) => ({ id: d.id, name: d.name }))} sugerido={onShift.length === 1 ? onShift[0].id : ""} />}
    </>
  );
}
