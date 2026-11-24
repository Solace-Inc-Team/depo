// Datas de filtro em horário de Brasília (sem horário de verão desde 2019).
const iso = (d: Date) => new Date(d.getTime() - 3 * 3600e3).toISOString().slice(0, 10);

/** Data de hoje (YYYY-MM-DD) no fuso de Brasília. */
export const todayISO = () => iso(new Date());

/** "2026-11-30" mais 3 dias: "2026-12-03". Conta em UTC, então não sofre com fuso nem com horário de verão. */
export const somaDias = (dia: string, n: number) => new Date(Date.parse(dia + "T00:00:00Z") + n * 86400e3).toISOString().slice(0, 10);

/** "2026-11-30" que existe no calendário: mês 13 ou 30 de fevereiro não passam (o banco recusaria). */
export function dataISO(v: unknown): v is string {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

export function parsePeriod(sp: Record<string, string | string[] | undefined>) {
  const today = iso(new Date());
  let fromStr = dataISO(sp.de) ? sp.de : iso(new Date(Date.now() - 6 * 864e5));
  let toStr = dataISO(sp.ate) ? sp.ate : today;
  // "De" depois do "Até": era um período vazio, com R$ 0,00 e nenhuma linha. A pessoa quis o intervalo entre as duas
  if (fromStr > toStr) [fromStr, toStr] = [toStr, fromStr];
  const from = new Date(`${fromStr}T00:00:00-03:00`);
  const to = new Date(new Date(`${toStr}T00:00:00-03:00`).getTime() + 864e5); // fim exclusivo
  return { fromStr, toStr, from, to };
}

/** Tempo de espera para ler de primeira: "12 min", "2 h 05", "3 h"; passou de um dia, conta em dias ("136 h 05" ninguém lê). */
export const duracao = (min: number) =>
  min >= 1440
    ? `${Math.floor(min / 1440)} ${min < 2880 ? "dia" : "dias"}`
    : min < 60
      ? `${min} min`
      : min % 60
        ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`
        : `${min / 60} h`;
