import { ChevronDown } from "lucide-react";
import { metricasEntregadores } from "@/domain/queries";
import { occurrenceKinds } from "@/domain/orders";
import { avaliar, MINIMO_ENTREGAS, type Avaliacao } from "@/lib/nota";

const DIAS = 30;
const min = (n: number) => (n < 1 ? "menos de 1 min" : `${Math.round(n)} min`);
const umaCasa = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
// verde a partir de 8, aviso abaixo de 6: o resto é o normal
const cor = (n: number) => (n >= 8 ? "text-ok" : n < 6 ? "text-warn-fg" : "text-fg");

function Parte({ titulo, nota, peso, children }: { titulo: string; nota: number | null; peso: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line p-3">
      <p className="flex items-baseline justify-between gap-2 text-[13px] text-muted">
        <span>
          {titulo} <span className="text-muted/70">({peso})</span>
        </span>
        <span className={`num font-semibold ${nota === null ? "" : cor(nota)}`}>{nota === null ? "sem dado" : umaCasa(nota)}</span>
      </p>
      <div className="nota-barra mt-2" aria-hidden="true">
        <span style={{ width: `${(nota ?? 0) * 10}%` }} />
      </div>
      <p className="mt-2 text-[13px]">{children}</p>
    </div>
  );
}

function Linha({ e, equipeMin, equipeRitmo }: { e: Avaliacao; equipeMin: number | null; equipeRitmo: number | null }) {
  const ocorrencias = Object.entries(e.ocorrencias);
  return (
    <li className="border-b border-line last:border-0">
      <details className="nota-linha">
        <summary className="tap flex cursor-pointer list-none items-center gap-3 px-4 py-3">
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{e.nome}</span>
            <span className="block text-[13px] text-muted">
              {e.entregas} {e.entregas === 1 ? "entrega" : "entregas"}
            </span>
          </span>
          {e.nota === null ? (
            <span className="text-right text-[13px] text-muted">Em avaliação<span className="block">{MINIMO_ENTREGAS - e.entregas === 1 ? "falta 1 entrega" : `faltam ${MINIMO_ENTREGAS - e.entregas} entregas`}</span></span>
          ) : (
            <span className="num text-right">
              {/* nota parcial (faltou uma parte) não ganha cor: verde dizia "ótimo" sem medir tudo */}
              <span className={`text-xl font-semibold ${e.parcial ? "text-fg" : cor(e.nota)}`}>{umaCasa(e.nota)}</span>
              <span className="text-[13px] text-muted">/10</span>
              {e.parcial && <span className="block text-[13px] text-muted">parcial</span>}
            </span>
          )}
          <ChevronDown size={16} strokeWidth={1.75} className="nota-seta shrink-0 text-muted" aria-hidden="true" />
        </summary>
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-3">
          <Parte titulo="Rapidez" peso="45%" nota={e.partes.rapidez}>
            {e.minPorEntrega === null ? (
              "Sem acerto da volta no período: o tempo da viagem só é medido nele."
            ) : (
              <>
                {min(e.minPorEntrega)} por entrega, da saída até o acerto da volta
                {equipeMin !== null && <span className="text-muted"> (equipe: {min(equipeMin)})</span>}.
                {e.minParaVoltar !== null && (
                  <span className="mt-1 block text-muted">Leva {min(e.minParaVoltar)} da última entrega até voltar.</span>
                )}
              </>
            )}
          </Parte>
          <Parte titulo="Dinheiro certo" peso="35%" nota={e.partes.acerto}>
            {e.acertos === 0
              ? "Nenhum acerto no período."
              : `${e.acertos - e.acertosComFalta} de ${e.acertos} ${e.acertos === 1 ? "acerto" : "acertos"} sem falta de dinheiro (voltas e fim de turno).`}
          </Parte>
          <Parte titulo="Produtividade" peso="20%" nota={e.partes.produtividade}>
            {e.entregasPorHora === null ? (
              "Sem turno no período."
            ) : (
              <>
                {umaCasa(e.entregasPorHora)} entregas por hora de turno
                {equipeRitmo !== null && <span className="text-muted"> (equipe: {umaCasa(equipeRitmo)})</span>}.
              </>
            )}
          </Parte>
          {ocorrencias.length > 0 && (
            <p className="text-[13px] text-muted sm:col-span-3">
              Não contam na nota:{" "}
              {ocorrencias
                .map(([k, n]) => `${(occurrenceKinds as Record<string, string>)[k] ?? k} (${n})`)
                .join(", ")
                .toLowerCase()}
              .
            </p>
          )}
        </div>
      </details>
    </li>
  );
}

/** Só para o dono: a nota de 0 a 10 de cada entregador nos últimos 30 dias (lib/nota.ts explica a conta). */
export async function AvaliacaoEntregadores({ tenantId, filial }: { tenantId: string; filial: string | null }) {
  const ate = new Date();
  const desde = new Date(ate.getTime() - DIAS * 86400000);
  const { entregadores, equipeMinPorEntrega, equipeEntregasPorHora } = avaliar(await metricasEntregadores(tenantId, filial, desde, ate));
  if (!entregadores.length) return null;
  return (
    <section className="panel mb-6">
      <h2 className="h2 flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
        Avaliação dos entregadores
        <span className="text-[13px] font-normal text-muted">últimos {DIAS} dias</span>
      </h2>
      <ul>
        {entregadores.map((e) => (
          <Linha key={e.id} e={e} equipeMin={equipeMinPorEntrega} equipeRitmo={equipeEntregasPorHora} />
        ))}
      </ul>
      <p className="border-t border-line px-4 py-3 text-[13px] text-muted">
        Faça o acerto da volta assim que o entregador chegar: o acerto marca o fim da viagem.
      </p>
    </section>
  );
}
