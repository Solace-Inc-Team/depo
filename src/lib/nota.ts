// Nota de 0 a 10 do entregador, para o dono. Três partes, cada uma de 0 a 10:
// - rapidez (45%): tempo da viagem inteira (saída até o acerto da volta) dividido pelas entregas dela,
//   comparado com a equipe. Quem demora a voltar aumenta esse tempo.
// - acerto (35%): acertos (voltas e fim de turno) sem falta de dinheiro. Sobra não tira ponto.
// - produtividade (20%): entregas por hora de turno, comparado com a equipe.
// Parte sem dado (nenhuma viagem acertada, nenhum acerto, nenhuma hora de turno) sai da conta e as outras
// dividem o peso. Ocorrências (cliente ausente, recusou...) não são culpa dele: só aparecem, não contam.

export const MINIMO_ENTREGAS = 10;
const PESOS = { rapidez: 0.45, acerto: 0.35, produtividade: 0.2 } as const;

export type Metricas = {
  id: string;
  nome: string;
  entregas: number;
  /** minutos somados das viagens acertadas (saída até o acerto da volta) */
  viagemMin: number;
  /** entregas feitas nessas viagens */
  viagemEntregas: number;
  /** minutos somados entre a última entrega confirmada no celular e o acerto da volta */
  voltaMin: number;
  voltaViagens: number;
  acertos: number;
  acertosComFalta: number;
  horasTurno: number;
  ocorrencias: Record<string, number>;
};

export type Avaliacao = Metricas & {
  /** null: menos de MINIMO_ENTREGAS entregas, ainda em avaliação */
  nota: number | null;
  partes: { rapidez: number | null; acerto: number | null; produtividade: number | null };
  minPorEntrega: number | null;
  minParaVoltar: number | null;
  entregasPorHora: number | null;
};

const limita = (n: number) => Math.min(10, Math.max(0, n));
// na média da equipe vale 7,5; um terço melhor chega a 10, o dobro do tempo (ou metade do ritmo) chega a 0
const relativo = (melhorQueEquipe: number) => limita(7.5 + 7.5 * melhorQueEquipe);
const umaCasa = (n: number) => Math.round(n * 10) / 10;

export function avaliar(lista: Metricas[]) {
  const soma = (k: keyof Metricas) => lista.reduce((s, m) => s + (m[k] as number), 0);
  const equipeMin = soma("viagemEntregas") ? soma("viagemMin") / soma("viagemEntregas") : null;
  const equipeRitmo = soma("horasTurno") ? soma("entregas") / soma("horasTurno") : null;
  return {
    equipeMinPorEntrega: equipeMin,
    equipeEntregasPorHora: equipeRitmo,
    entregadores: lista
      .map((m): Avaliacao => {
        const minPorEntrega = m.viagemEntregas ? m.viagemMin / m.viagemEntregas : null;
        const entregasPorHora = m.horasTurno > 0 ? m.entregas / m.horasTurno : null;
        const partes = {
          rapidez: minPorEntrega !== null && equipeMin ? relativo(1 - minPorEntrega / equipeMin) : null,
          acerto: m.acertos ? (10 * (m.acertos - m.acertosComFalta)) / m.acertos : null,
          produtividade: entregasPorHora !== null && equipeRitmo ? relativo(entregasPorHora / equipeRitmo - 1) : null,
        };
        const usadas = (Object.keys(PESOS) as (keyof typeof PESOS)[]).filter((k) => partes[k] !== null);
        const peso = usadas.reduce((s, k) => s + PESOS[k], 0);
        const nota =
          m.entregas < MINIMO_ENTREGAS || !peso ? null : umaCasa(usadas.reduce((s, k) => s + PESOS[k] * partes[k]!, 0) / peso);
        return {
          ...m,
          nota,
          partes: {
            rapidez: partes.rapidez === null ? null : umaCasa(partes.rapidez),
            acerto: partes.acerto === null ? null : umaCasa(partes.acerto),
            produtividade: partes.produtividade === null ? null : umaCasa(partes.produtividade),
          },
          minPorEntrega,
          minParaVoltar: m.voltaViagens ? m.voltaMin / m.voltaViagens : null,
          entregasPorHora,
        };
      })
      // maior nota primeiro; quem está em avaliação vai para o fim, por quantidade de entregas
      .sort((a, b) => (b.nota ?? -1) - (a.nota ?? -1) || b.entregas - a.entregas),
  };
}
