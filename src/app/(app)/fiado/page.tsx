import Link from "next/link";
import { HandCoins, MessageCircle } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listDebtors } from "@/domain/receivables";
import { getSettings } from "@/domain/queries";
import { linkWhatsApp, mensagemFiado } from "@/lib/whatsapp";
import { Money, PageHeader, fmtQuando } from "@/components/ui";

export const metadata = { title: "Fiado" };

const daysSince = (d: string | Date) => Math.floor((Date.now() - new Date(d).getTime()) / 864e5);

export default async function Fiado() {
  const user = await requireUser("dono", "atendente", "caixa");
  const [debtors, settings] = await Promise.all([listDebtors(user.tenantId), getSettings(user.tenantId)]);
  const total = debtors.reduce((s, d) => s + d.owed, 0);

  return (
    <>
      <PageHeader title="Fiado" />

      {/* sem ninguém devendo, os zeros repetiriam o que o vazio da lista já diz */}
      {debtors.length > 0 && (
      <section className="panel mb-6 grid sm:grid-cols-2 sm:divide-x sm:divide-line">
        <div className="p-5">
          <p className="text-[13px] text-muted">A receber</p>
          <Money cents={total} className="mt-1 block text-[2rem] leading-tight font-semibold tracking-[-0.03em]" />
        </div>
        <div className="border-t border-line p-5 sm:border-t-0">
          <p className="text-[13px] text-muted">Clientes devendo</p>
          <p className="num mt-1 text-[2rem] leading-tight font-semibold tracking-[-0.03em]">{debtors.length}</p>
        </div>
      </section>
      )}

      {/* no celular cada devedor vira um bloco (como o Estoque): a tabela larga cortava as colunas da direita */}
      <div className="panel overflow-x-auto">
        {debtors.length ? (
          <table className="table tabela-pilha rotulada sm:min-w-[40rem]">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Deve desde</th>
                <th>Último pagamento</th>
                <th className="text-right">Saldo</th>
                <th><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {debtors.map((d) => {
                const age = daysSince(d.oldest);
                return (
                  <tr key={d.id}>
                    <td>
                      <Link href={`/clientes/${d.id}`} className="font-medium hover:underline">{d.name}</Link>
                      {d.phone && <p className="text-[13px] text-muted">{d.phone}</p>}
                    </td>
                    <td data-rotulo="Deve desde" className={age > 30 ? "font-medium text-warn-fg" : "text-muted"}>
                      {age === 0 ? "hoje" : `há ${age} ${age === 1 ? "dia" : "dias"}`}
                    </td>
                    <td data-rotulo="Último pagamento" className="text-muted">{d.last_payment ? fmtQuando(new Date(d.last_payment)) : "nunca"}</td>
                    <td data-rotulo="Saldo" className="text-right font-medium"><Money cents={d.owed} /></td>
                    <td className="text-right max-sm:pt-2">
                      <span className="inline-flex flex-wrap justify-end gap-2">
                        {(() => {
                          const zap = linkWhatsApp(d.phone, mensagemFiado({ cliente: d.name, loja: settings.name, devendoCents: d.owed, pixKey: settings.pixKey }));
                          return (
                            zap && (
                              <a href={zap} target="_blank" rel="noopener noreferrer" className="btn tap text-[13px] sm:h-8" aria-label={`Cobrar ${d.name} no WhatsApp`}>
                                <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" /> Cobrar
                              </a>
                            )
                          );
                        })()}
                        <Link href={`/clientes/${d.id}#receber`} className="btn tap text-[13px] sm:h-8">Receber</Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <HandCoins size={28} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
            <p className="mt-3 font-medium">Ninguém devendo</p>
            <p className="mt-1 text-muted">Vendas fiado entregues aparecem aqui até o cliente pagar.</p>
          </div>
        )}
      </div>
    </>
  );
}
