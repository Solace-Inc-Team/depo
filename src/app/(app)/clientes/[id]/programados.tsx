import { Pause, Pencil, Play, Trash2 } from "lucide-react";
import { JanelaAcao } from "@/components/janela-acao";
import { ActionForm } from "@/components/action-form";
import { paymentLabel } from "@/components/ui";
import { alterarProgramadoAction, excluirProgramadoAction, pausarProgramadoAction, programarAction } from "@/app/actions";
import type { programadosDoCliente } from "@/domain/queries";
import { CamposProgramacao } from "./campos-programacao";
import { rotuloIntervalo } from "@/lib/programacao";
import { formatBRL } from "@/lib/money";

type Programado = Awaited<ReturnType<typeof programadosDoCliente>>[number];

const quando = (iso: string, hoje: string) =>
  iso <= hoje
    ? "hoje"
    : new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));

/**
 * Entrega programada do cliente: o mesmo pedido a cada tantos dias. No dia ele aparece em Entregas para lançar com
 * um toque. Programa-se a partir do último pedido (mesmos itens, pagamento, endereço e taxa).
 */
export function ProgramadosCliente({
  nome,
  programados,
  ultimo,
  hoje,
}: {
  nome: string;
  programados: Programado[];
  ultimo: { id: string; number: number; resumo: string; pagamento: string; endereco: string | null; taxaCents: number } | null;
  hoje: string;
}) {
  if (!programados.length && !ultimo) return null;
  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="h2">Entrega programada</h2>
        {/* uma programação por vez na tela: o botão some quando já existe, para ninguém dobrar a entrega sem querer */}
        {ultimo && !programados.length && (
          <JanelaAcao label="Programar" titulo={`Programar entrega de ${nome}`}>
            <ActionForm action={programarAction} className="space-y-4">
              <input type="hidden" name="orderId" value={ultimo.id} />
              {/* o que vai se repetir, em leitura (sem borda de campo: não é editável) */}
              <div className="rounded-lg bg-subtle px-3 py-2.5 text-sm">
                <p className="font-medium">{ultimo.resumo}</p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {ultimo.pagamento}
                  {ultimo.endereco ? `, ${ultimo.endereco}` : ""}
                  {ultimo.taxaCents > 0 ? `, taxa de ${formatBRL(ultimo.taxaCents)}` : ""}. Como no pedido <span className="num">#{ultimo.number}</span>.
                </p>
              </div>
              <CamposProgramacao hoje={hoje} />
              <button className="btn btn-primary w-full">Programar</button>
            </ActionForm>
          </JanelaAcao>
        )}
      </div>
      {programados.length ? (
        <ul className="divide-y divide-line">
          {programados.map((p) => (
            <li key={p.id} className="py-3 first:pt-0 last:pb-0">
              <p className="font-medium">{p.resumo}</p>
              <p className="mt-0.5 text-[13px] text-muted">
                {paymentLabel[p.paymentMethod]}, {rotuloIntervalo(p.aCadaDias).toLowerCase()}.{" "}
                {p.pausado ? <span className="font-medium text-warn-fg">Pausada</span> : <>Próxima: <span className="text-fg">{quando(p.proxima, hoje)}</span></>}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <JanelaAcao label="Alterar" titulo="Alterar entrega programada" icone={<Pencil size={14} strokeWidth={1.75} aria-hidden="true" />}>
                  <ActionForm action={alterarProgramadoAction} className="space-y-4">
                    <input type="hidden" name="id" value={p.id} />
                    <p className="text-sm text-muted">{p.resumo}</p>
                    <CamposProgramacao hoje={hoje} aCada={p.aCadaDias} proxima={p.proxima < hoje ? hoje : p.proxima} />
                    <button className="btn btn-primary w-full">Salvar</button>
                  </ActionForm>
                </JanelaAcao>
                <ActionForm action={pausarProgramadoAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="pausar" value={p.pausado ? "0" : "1"} />
                  {/* largura fixa: trocar entre Pausar e Retomar não empurra o Excluir */}
                  <button className="btn min-w-28 justify-center">
                    {p.pausado ? <Play size={14} strokeWidth={1.75} aria-hidden="true" /> : <Pause size={14} strokeWidth={1.75} aria-hidden="true" />}
                    {p.pausado ? "Retomar" : "Pausar"}
                  </button>
                </ActionForm>
                <ActionForm action={excluirProgramadoAction} confirm={`Excluir a entrega programada (${p.resumo})? O que já foi lançado continua.`}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="btn btn-danger">
                    <Trash2 size={14} strokeWidth={1.75} aria-hidden="true" /> Excluir
                  </button>
                </ActionForm>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">O último pedido se repete sozinho na lista de Entregas, no dia certo.</p>
      )}
    </section>
  );
}
