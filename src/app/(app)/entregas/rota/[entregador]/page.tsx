import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ctx";
import { withTenant } from "@/db";
import { getOrder, getShift, listDrivers, listOrders, openShiftFor } from "@/domain/queries";
import { pixDoPedido } from "@/domain/pix";
import { PrintButton } from "@/components/print-button";
import { Empty, fmtDateTime, paymentLabel } from "@/components/ui";
import { formatBRL } from "@/lib/money";

export const metadata = { title: "Folha da rota" };

// Folha para o entregador que não usa celular: o que levar, para onde, quanto cobrar e o troco, com o QR do
// Pix já impresso. Na volta, ele marca o resultado de cada pedido e a loja lança em Entregas ou no acerto.
export default async function FolhaDaRota({ params }: PageProps<"/entregas/rota/[entregador]">) {
  const user = await requireUser("dono", "atendente", "caixa");
  const { entregador } = await params;
  if (!isUuid(entregador)) notFound();
  const [drivers, rota, turno] = await withTenant(user.tenantId, () =>
    Promise.all([
      listDrivers(user.tenantId, user.role === "dono" ? null : user.branchId),
      listOrders(user.tenantId, { status: "em_rota", driverId: entregador }),
      openShiftFor(user.tenantId, entregador),
    ]),
  );
  const d = drivers.find((x) => x.id === entregador);
  if (!d) notFound();
  // o que ele já deve do turno (troco e entregas anteriores): a folha soma com esta rota e bate com o acerto
  const acerto = turno ? await getShift(user.tenantId, turno.id) : null;
  const pedidos = (await Promise.all(rota.reverse().map((o) => getOrder(user.tenantId, o.id)))).filter((o) => !!o);
  const pix = new Map(
    await Promise.all(
      pedidos
        .filter((o) => o.paymentMethod === "pix" && !o.pixConfirmedAt)
        .map(async (o) => {
          const p = await pixDoPedido(user.tenantId, o.id);
          return [o.id, p ? await QRCode.toString(p.codigo, { type: "svg", margin: 1, width: 112 }) : null] as const;
        }),
    ),
  );
  // o que passa pela mão dele: dinheiro inteiro, ou a parte em dinheiro de Pix e cartão
  const emDinheiro = (o: (typeof pedidos)[number]) => (o.paymentMethod === "dinheiro" ? o.totalCents : o.cashPartCents);
  const dinheiro = pedidos.reduce((s, o) => s + emDinheiro(o), 0);

  return (
    <div className="print-sheet mx-auto max-w-3xl">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/entregas" className="alvo text-accent hover:underline">Entregas</Link>
          <span className="text-muted">/</span>
          <h1 className="h1">Rota de {d.name}</h1>
        </div>
        {pedidos.length > 0 && <PrintButton label="Imprimir folha" />}
      </div>

      <header className="mb-5 border-b border-line pb-4">
        <p className="text-[13px] text-muted">{user.tenantName}{user.branches.length > 1 ? `, ${user.branchName}` : ""}</p>
        {/* na tela o título de cima já diz isso; volta só no papel, onde o de cima não sai */}
        <p className="hidden text-xl font-semibold print:block">Rota de {d.name}</p>
        <p className="text-[13px] text-muted">
          {pedidos.length} {pedidos.length === 1 ? "entrega" : "entregas"}. Emitida em {fmtDateTime(new Date())}
          {turno ? `. Troco que levou: ${formatBRL(turno.openingCashCents)}` : ""}
        </p>
      </header>

      {pedidos.length === 0 ? (
        <Empty>{d.name} não tem pedido na rua agora. Despache em Entregas e volte aqui para imprimir.</Empty>
      ) : (
        <ol className="space-y-3">
          {pedidos.map((o) => {
            const cobrar = o.paymentMethod === "fiado" ? 0 : o.paymentMethod === "dinheiro" ? o.totalCents : o.cashPartCents;
            const qr = pix.get(o.id);
            return (
              <li key={o.id} className="panel break-inside-avoid p-4">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold">
                    <span className="num text-muted">#{o.number}</span> {o.customerName ?? "Cliente"}
                  </p>
                  <p className="num text-lg font-semibold">{formatBRL(o.totalCents)}</p>
                </div>
                <p>{o.customerAddress ?? "Sem endereço"}{o.customerReference ? `. ${o.customerReference}` : ""}</p>
                {o.customerPhone && <p className="text-[13px] text-muted">{o.customerPhone}</p>}
                <ul className="mt-2 text-[13px]">
                  {o.items.map((i) => (
                    <li key={i.id}>
                      <b className="num">{i.quantity}×</b> {i.name}
                      {i.returnsEmpty ? ", recolher vazio" : ", sem troca"}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-3">
                  <div className="text-[13px]">
                    <p className="font-medium">
                      {paymentLabel[o.paymentMethod]}
                      {cobrar > 0 && o.paymentMethod !== "dinheiro" ? `, ${formatBRL(cobrar)} em dinheiro` : ""}
                      {o.paymentMethod === "dinheiro" ? `: cobrar ${formatBRL(cobrar)}` : ""}
                    </p>
                    {o.changeForCents ? <p>Levar troco de {formatBRL(o.changeForCents - o.totalCents)} (cliente paga com {formatBRL(o.changeForCents)})</p> : null}
                    {o.paymentMethod === "pix" && (o.pixConfirmedAt ? <p>Pix já recebido pela loja.</p> : <p>{qr ? "Pix: o cliente lê o QR ao lado." : "Pix: o cliente paga direto para a loja."}</p>)}
                    {o.notes && <p className="text-muted">Obs.: {o.notes}</p>}
                    {/* o entregador marca à caneta; na volta a loja lança */}
                    <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="flex items-center gap-1.5"><Caixinha /> Entregue</span>
                      <span className="flex items-center gap-1.5"><Caixinha /> Só uma parte</span>
                      <span className="flex items-center gap-1.5"><Caixinha /> Não entregue: ____________</span>
                    </p>
                  </div>
                  {/* SVG gerado aqui a partir do código Pix, sem nada digitado por usuário */}
                  {qr && <div className="shrink-0 rounded-md bg-white p-1" dangerouslySetInnerHTML={{ __html: qr }} />}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {pedidos.length > 0 && (
        <footer className="mt-5 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-4 text-[13px]">
          {/* a conta pronta: ele não precisa somar o troco com o que recebe */}
          <div>
            <p>
              Dinheiro a receber nesta rota: <b className="num">{formatBRL(dinheiro)}</b>
            </p>
            {acerto && acerto.expected > 0 && (
              <p className="mt-1 text-[15px]">
                Volte com <b className="num">{formatBRL(acerto.expected + dinheiro)}</b>{" "}
                <span className="text-[13px] text-muted">(já está com {formatBRL(acerto.expected)} + {formatBRL(dinheiro)} desta rota)</span>
              </p>
            )}
          </div>
          <p className="text-muted">Assinatura do entregador: ______________________________</p>
        </footer>
      )}
    </div>
  );
}

// quadradinho para marcar à caneta: desenhado, do tamanho de uma marca de verdade
function Caixinha() {
  return <span aria-hidden="true" className="inline-block size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-current" />;
}
