import { requireAdmin } from "@/lib/auth";
import { DELETE_DEADLINE_DAYS, avisoAtual, listDeletions, listDiasDados, listTenants, recebidoNoMes } from "@/domain/platform";
import { ActionForm } from "@/components/action-form";
import { createTenantAction, darDiasAction, deleteTenantAction, ligarWhatsappAction, publicarAvisoAction, resetOwnerAccessAction, tirarAvisoAction, toggleTenantAction } from "@/app/actions";
import { PopoverForm } from "@/components/popover-form";
import { Empty, Money, PageHeader, fmtDateTime } from "@/components/ui";
import { dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";

type Plano = { rotulo: string; linha: string; tom: "ok" | "teste" | "aviso" | "perigo" | "neutro" };
// a situação da assinatura em uma palavra e uma linha: o que importa para cobrar e para atender
function planoDe(t: { pagoAte: string | null; pagou: boolean; cartao: boolean }, hoje: string): Plano {
  const sit = situacaoAssinatura(t.pagoAte, hoje);
  if (!sit) return { rotulo: "Sem cobrança", linha: "Acesso não vence", tom: "neutro" };
  const quando = sit.dias === 0 ? "hoje" : sit.dias === 1 ? "amanhã" : `em ${dataBR(sit.pagoAte, true)}`;
  if (sit.bloqueado) return { rotulo: "Pausada", linha: `Desde ${dataBR(sit.pausaEm, true)}`, tom: "perigo" };
  if (sit.dias < 0) return { rotulo: t.pagou ? "Vencida" : "Teste acabou", linha: `Pausa em ${dataBR(sit.pausaEm, true)}`, tom: "aviso" };
  if (!t.pagou) return { rotulo: "Em teste", linha: `Acaba ${quando}`, tom: "teste" };
  return { rotulo: "Paga", linha: `${sit.dias <= 1 ? `Vence ${quando}` : `Até ${dataBR(sit.pagoAte, true)}`}${t.cartao ? ", no cartão" : ", no Pix"}`, tom: "ok" };
}
const tomCor = { ok: "text-ok", teste: "text-accent", aviso: "text-warn-fg", perigo: "text-danger", neutro: "text-muted" } as const;
const mes = () => new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "America/Sao_Paulo" }).format(new Date());

const daysAgo = (d: string | Date | null) => {
  if (!d) return null;
  return Math.floor((Date.now() - new Date(d).getTime()) / 864e5);
};

export default async function Admin() {
  const admin = await requireAdmin();
  const [list, deletions, recebido, dias, aviso] = await Promise.all([listTenants(admin), listDeletions(admin), recebidoNoMes(admin), listDiasDados(admin), avisoAtual()]);
  const active = list.filter((t) => t.active);
  const hoje = todayISO();
  const planos = new Map(list.map((t) => [t.id, planoDe(t, hoje)]));
  const contar = (...tons: Plano["tom"][]) => active.filter((t) => tons.includes(planos.get(t.id)!.tom)).length;

  return (
    <>
      <PageHeader title="Empresas" />
      <p className="-mt-3 mb-6 text-muted">
        {active.length} {active.length === 1 ? "ativa" : "ativas"}, {list.length - active.length}{" "}
        {list.length - active.length === 1 ? "suspensa" : "suspensas"},{" "}
        {active.reduce((s, t) => s + t.orders30, 0)} pedidos nos últimos 30 dias
      </p>

      {/* o dinheiro do depo: quanto entrou no mês e em que pé está cada assinatura (só empresas ativas) */}
      <dl className="panel mb-6 grid grid-cols-2 sm:grid-cols-4">
        <div className="border-line px-4 py-3 max-sm:col-span-2 max-sm:border-b sm:border-r">
          <dt className="text-[13px] text-muted">Recebido em {mes()}</dt>
          <dd className="mt-0.5 text-xl font-semibold"><Money cents={recebido.cents} /></dd>
        </div>
        <div className="border-line px-4 py-3 max-sm:border-b sm:border-r">
          <dt className="text-[13px] text-muted">Pagando</dt>
          <dd className="num mt-0.5 text-xl font-semibold">{contar("ok")}</dd>
        </div>
        <div className="border-l border-line px-4 py-3 max-sm:border-b sm:border-l-0 sm:border-r">
          <dt className="text-[13px] text-muted">Em teste</dt>
          <dd className="num mt-0.5 text-xl font-semibold">{contar("teste")}</dd>
        </div>
        <div className="px-4 py-3 max-sm:col-span-2">
          <dt className="text-[13px] text-muted">Vencidas ou pausadas</dt>
          <dd className={`num mt-0.5 text-xl font-semibold ${contar("aviso", "perigo") ? "text-warn-fg" : ""}`}>{contar("aviso", "perigo")}</dd>
        </div>
      </dl>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="panel overflow-x-auto">
          {list.length ? (
            <table className="table min-w-[36rem]">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Assinatura</th>
                  <th className="text-right">Pedidos em 30 dias</th>
                  <th>Último pedido</th>
                </tr>
              </thead>
              <tbody>
                {list.map((t) => {
                  const idle = daysAgo(t.lastOrder);
                  const plano = planos.get(t.id)!;
                  return (
                    <tr key={t.id} className={t.active ? "" : "text-muted"}>
                      <td>
                        <p className="font-medium">
                          {t.name}
                          {!t.active && <span className="ml-2 rounded bg-danger-soft px-1.5 py-0.5 text-xs font-semibold text-danger">suspensa</span>}
                        </p>
                        {!t.active && t.suspendedAt && (
                          <p className={`text-[13px] ${daysAgo(t.suspendedAt)! > DELETE_DEADLINE_DAYS ? "font-medium text-danger" : "text-muted"}`}>
                            Suspensa {daysAgo(t.suspendedAt) === 0 ? "hoje" : `há ${daysAgo(t.suspendedAt)} ${daysAgo(t.suspendedAt) === 1 ? "dia" : "dias"}`}
                            {daysAgo(t.suspendedAt)! > DELETE_DEADLINE_DAYS && `: passou dos ${DELETE_DEADLINE_DAYS} dias da política, exclua os dados`}
                          </p>
                        )}
                        {/* quem é o dono, desde quando e quantas pessoas usam: a coluna de pessoas apertava a tabela ao lado dos quadros */}
                        <p className="text-sm text-muted">{t.owner ?? "sem dono"}, desde {fmtDateTime(t.createdAt).split(" ")[0].replace(",", "")}, {t.people} {t.people === 1 ? "pessoa" : "pessoas"}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <a href={`/admin/exportar?empresa=${t.id}`} className="btn btn-sm">Exportar</a>
                          {t.pagoAte && (
                            <PopoverForm align="left" label="Dar dias" action={darDiasAction} submit="Dar dias">
                              <input type="hidden" name="tenantId" value={t.id} />
                              <p className="text-[13px] text-muted">Somam a partir de {t.pagoAte > hoje ? `${dataBR(t.pagoAte)}, quando vence` : "hoje"}.</p>
                              <label className="label mb-0" htmlFor={`dd-${t.id}`}>Dias</label>
                              <input id={`dd-${t.id}`} name="dias" type="number" inputMode="numeric" min={1} max={90} defaultValue={7} required className="input num w-24" />
                              <label className="label mb-0" htmlFor={`dm-${t.id}`}>Motivo</label>
                              <input id={`dm-${t.id}`} name="motivo" required minLength={3} maxLength={200} autoComplete="off" placeholder="Ex.: Pix não caiu" className="input" />
                            </PopoverForm>
                          )}
                          {/* o robô responde no número da Cloud API ligado aqui; vazio desliga */}
                          <PopoverForm align="left" label={t.whatsappNumeroId ? "WhatsApp ligado" : "Ligar WhatsApp"} action={ligarWhatsappAction} submit="Salvar">
                            <input type="hidden" name="tenantId" value={t.id} />
                            <label className="label mb-0" htmlFor={`wa-${t.id}`}>ID do número na Meta</label>
                            <input id={`wa-${t.id}`} name="numeroId" inputMode="numeric" defaultValue={t.whatsappNumeroId ?? ""} pattern="[0-9\s]*" maxLength={40} autoComplete="off" placeholder="Phone Number ID" className="input num" />
                            <p className="text-[13px] text-muted">Deixe vazio para desligar.</p>
                          </PopoverForm>
                          <PopoverForm align="left" label="Redefinir acesso" action={resetOwnerAccessAction} submit="Redefinir" confirm="Redefinir o acesso do dono? A senha dele será trocada e a verificação em duas etapas, desligada.">
                            <input type="hidden" name="tenantId" value={t.id} />
                            <label className="label mb-0" htmlFor={`o-${t.id}`}>Senha nova do dono</label>
                            <input id={`o-${t.id}`} name="password" type="text" minLength={8} required autoComplete="off" className="input" />
                          </PopoverForm>
                          {!t.active && (
                            <PopoverForm
                              align="left"
                              label="Excluir"
                              action={deleteTenantAction}
                              submit="Excluir de vez"
                              danger
                              confirm={`Apagar todos os dados de ${t.name}? Não tem volta.`}
                            >
                              <input type="hidden" name="tenantId" value={t.id} />
                              <p className="text-[13px] text-muted">
                                Apaga clientes, pedidos, caixa, estoque, equipe e histórico. Não tem volta.{" "}
                                <a href={`/admin/exportar?empresa=${t.id}`} className="underline">Exporte antes</a>.
                              </p>
                              <label className="label mb-0" htmlFor={`d-${t.id}`}>Digite o nome da empresa</label>
                              <input id={`d-${t.id}`} name="confirmName" required autoComplete="off" placeholder={t.name} className="input" />
                            </PopoverForm>
                          )}
                          <ActionForm
                            action={toggleTenantAction}
                            confirm={t.active ? `Suspender ${t.name}? Ninguém da empresa vai conseguir entrar.` : undefined}
                          >
                            <input type="hidden" name="tenantId" value={t.id} />
                            <input type="hidden" name="active" value={String(!t.active)} />
                            <button className={`btn sm:h-8 ${t.active ? "btn-danger" : ""}`}>{t.active ? "Suspender" : "Reativar"}</button>
                          </ActionForm>
                        </div>
                      </td>
                      <td>
                        <p className={`font-medium ${t.active ? tomCor[plano.tom] : ""}`}>{plano.rotulo}</p>
                        <p className="text-[13px] whitespace-nowrap text-muted">{plano.linha}</p>
                      </td>
                      <td className="num text-right">{t.orders30}</td>
                      <td className={idle !== null && idle > 7 && t.active ? "font-medium text-warn-fg" : ""}>
                        {idle === null ? "nunca" : idle === 0 ? "hoje" : `há ${idle} ${idle === 1 ? "dia" : "dias"}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty>Nenhuma empresa ainda. Crie a primeira ao lado.</Empty>
          )}
        </section>

        {dias.length > 0 && (
          <section className="panel lg:col-start-1 lg:self-start">
            <h2 className="h2 border-b border-line px-4 py-3">Dias liberados</h2>
            <ul>
              {dias.map((d) => {
                const x = d.data as { dias: number; motivo: string; ate: string };
                return (
                  <li key={d.id} className="border-b border-line px-4 py-2.5 text-[13px] last:border-0">
                    <p className="flex flex-wrap justify-between gap-x-3">
                      <span>
                        <span className="font-medium">{d.empresa}</span>
                        <span className="text-muted">: {x.dias} {x.dias === 1 ? "dia" : "dias"}, até {dataBR(x.ate)}</span>
                      </span>
                      <span className="text-muted">{d.por ? `${d.por.split(" ")[0]}, ` : ""}{fmtDateTime(d.em)}</span>
                    </p>
                    <p className="text-muted">{x.motivo}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {deletions.length > 0 && (
          <section className="panel lg:col-start-1 lg:self-start">
            <h2 className="h2 border-b border-line px-4 py-3">Exclusões feitas</h2>
            <ul>
              {deletions.map((d) => (
                <li key={d.id} className="flex flex-wrap justify-between gap-2 border-b border-line px-4 py-2.5 text-[13px] last:border-0">
                  <span>
                    <span className="font-medium">{d.tenantName}</span>
                    <span className="text-muted">, por {d.deletedBy}</span>
                  </span>
                  <span className="text-muted">
                    {Object.values(d.counts as Record<string, number>).reduce((s, n) => s + n, 0)} registros em {fmtDateTime(d.deletedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="space-y-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-start">
        <section className="panel p-4">
          <h2 className="h2 mb-1">Nova empresa</h2>
          <p className="mb-3 text-sm text-muted">
            Cria a empresa e o acesso do dono. Ele cadastra produtos, equipe e estoque inicial na implantação.
          </p>
          <ActionForm action={createTenantAction} className="space-y-3" reset>
            <div>
              <label className="label" htmlFor="company">Empresa</label>
              <input id="company" name="company" required className="input" placeholder="Ex.: Distribuidora Boa Água" />
            </div>
            <div>
              <label className="label" htmlFor="ownerName">Nome do dono</label>
              <input id="ownerName" name="ownerName" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="email">E-mail de acesso do dono</label>
              <input id="email" name="email" type="email" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="password">Senha inicial</label>
              <input id="password" name="password" type="text" minLength={8} required autoComplete="off" className="input" />
              <p className="mt-1 text-sm text-muted">Combine com o dono de trocar no primeiro acesso.</p>
            </div>
            <button className="btn btn-primary">Criar empresa</button>
          </ActionForm>
        </section>

        <section className="panel p-4">
          <h2 className="h2 mb-1">Aviso para todas as empresas</h2>
          <p className="mb-3 text-sm text-muted">Uma faixa no topo do sistema de todo mundo, como manutenção ou novidade.</p>
          {aviso && (
            <div className="mb-4 rounded-lg border border-line bg-subtle px-3 py-2.5">
              <p className="text-[13px] font-medium text-ok">No ar{aviso.ate ? `, até ${dataBR(new Date(aviso.ate.getTime() - 3 * 3600e3 - 1).toISOString().slice(0, 10))}` : ", até tirar"}</p>
              <p className="mt-0.5 text-sm">{aviso.texto}</p>
              <ActionForm action={tirarAvisoAction} confirm="Tirar o aviso do sistema de todas as empresas?" className="mt-2.5">
                <button className="btn btn-sm">Tirar aviso</button>
              </ActionForm>
            </div>
          )}
          <ActionForm action={publicarAvisoAction} confirm={aviso ? "Publicar no lugar do aviso que está no ar?" : "Publicar o aviso para todas as empresas?"} className="space-y-3" reset>
            <div>
              <label className="label" htmlFor="aviso-texto">{aviso ? "Novo aviso" : "Aviso"}</label>
              <textarea id="aviso-texto" name="texto" required minLength={5} maxLength={160} rows={2} className="input resize-none" placeholder="Ex.: Manutenção no domingo, das 22h às 23h." />
            </div>
            <div>
              <label className="label" htmlFor="aviso-ate">Até o dia (opcional)</label>
              <input id="aviso-ate" name="ate" type="date" min={hoje} className="input w-44" />
              <p className="mt-1 text-sm text-muted">Sem data, fica até você tirar.</p>
            </div>
            <button className="btn btn-primary">Publicar aviso</button>
          </ActionForm>
        </section>
        </div>
      </div>
    </>
  );
}
