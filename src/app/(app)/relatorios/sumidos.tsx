import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Money } from "@/components/ui";
import { comprasPorCliente } from "@/domain/queries";
import { sumido } from "@/lib/relatorios";
import { linkWhatsApp } from "@/lib/whatsapp";

const LIMITE = 12;

/**
 * Clientes que compravam com frequência e pararam (lib/relatorios.ts diz quando). Quem mais comprou vem primeiro,
 * com um WhatsApp já escrito para chamar de volta. Não depende do período escolhido: é sobre hoje.
 */
export async function ClientesSumidos({ tenantId, filial, loja }: { tenantId: string; filial: string | null; loja: string }) {
  const agora = new Date();
  const lista = (await comprasPorCliente(tenantId, filial))
    .map((c) => ({ ...c, s: sumido(c.pedidos, c.primeiro, c.ultimo, agora) }))
    .filter((c) => c.s)
    .sort((a, b) => b.totalCents - a.totalCents);
  if (!lista.length) return null;
  return (
    <section className="panel mb-6">
      <h2 className="h2 flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
        <span>
          Pararam de comprar
          {/* a lista olha o ritmo de cada cliente até hoje: o período escolhido no topo não muda nada aqui */}
          <span className="block text-[13px] font-normal text-muted">Não depende do período escolhido acima</span>
        </span>
        <span className="text-[13px] font-normal text-muted">{lista.length}</span>
      </h2>
      <ul>
        {lista.slice(0, LIMITE).map((c) => {
          const zap = linkWhatsApp(c.telefone, `Olá, ${c.nome.split(" ")[0]}! Aqui é da ${loja}. Está precisando de água ou gás? É só responder esta mensagem que a gente leva.`);
          return (
            <li key={c.id} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-0">
              <div className="min-w-0">
                <Link href={`/clientes/${c.id}`} className="alvo font-medium hover:text-accent">
                  {c.nome}
                </Link>
                <p className="text-[13px] text-muted">
                  Comprava a cada {c.s!.intervalo} {c.s!.intervalo === 1 ? "dia" : "dias"}, está há {c.s!.semComprar} {c.s!.semComprar === 1 ? "dia" : "dias"} sem comprar.{" "}
                  <Money cents={c.totalCents} /> no total.
                </p>
              </div>
              {zap && (
                <a
                  href={zap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn shrink-0"
                >
                  <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" /> <span className="max-sm:hidden">Chamar no</span> WhatsApp
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {lista.length > LIMITE && (
        <p className="border-t border-line px-4 py-3 text-[13px] text-muted">E mais {lista.length - LIMITE}, com menos compras no total.</p>
      )}
    </section>
  );
}
