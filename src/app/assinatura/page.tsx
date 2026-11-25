import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, pendingTerms } from "@/lib/auth";
import { cartaoAssinaturaAction, desligarCartaoAction, logout, pixAssinaturaAction } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { AtualizaSozinho } from "@/components/atualiza-sozinho";
import { MarcaDaSessao } from "@/components/logo";
import { PixBox } from "@/components/pix-box";
import { fmtDateTime, fmtTime } from "@/components/ui";
import { cobrancaLigada, conferirAssinatura, conferirCartao, pagamentosFeitos, pixEmAberto, precoDaEmpresa } from "@/domain/assinatura";
import { formatBRL } from "@/lib/money";
import { dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";
import { INCLUSO } from "@/app/inicio/contato";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, LogOut } from "lucide-react";
import { FormasDePagamento } from "./formas-de-pagamento";
import { LiveNumber } from "@/components/live-number";
import { CheckSucesso } from "@/components/check-sucesso";
import { AlturaSuave } from "@/components/altura-suave";
import { TextoQueTroca } from "@/components/texto-que-troca";

export const metadata = { title: "Assinatura" };

/** Pagamento confirmado nos últimos 10 minutos: vale mostrar o check de confirmação. */
function pagoHaPouco(pagoEm: Date | null | undefined) {
  return pagoEm != null && Date.now() - pagoEm.getTime() < 10 * 60_000;
}

// Fora do layout do sistema: com o acesso pausado, é a única tela que abre.
export default async function Assinatura() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (pendingTerms(user)) redirect("/aceite");
  const sit = situacaoAssinatura(user.pagoAte, todayISO());
  const casa = user.role === "entregador" ? "/entregador" : "/";
  if (!sit || user.platformAdmin) redirect(user.platformAdmin ? "/admin" : casa);
  const dono = user.role === "dono";
  if (!dono && !sit.bloqueado) redirect(casa);

  // o Pix ou a cobrança do cartão podem ter caído agora: confere antes de mostrar, e com mês novo a página recomeça
  // com a data certa (o cartão para qualquer perfil: com o acesso pausado, a cobrança dele destrava todo mundo)
  if (dono && (await conferirAssinatura(user.tenantId))) redirect("/assinatura");
  const cartao = await conferirCartao(user.tenantId);
  if (cartao?.caiu) redirect("/assinatura");
  const cartaoLigado = cartao?.situacao === "authorized";
  const cartaoPendente = cartao?.situacao === "pending" && cartao.link;
  const cartaoDisponivel = cobrancaLigada() && (process.env.APP_URL ?? "").startsWith("https://");
  const [aberto, feitos] = dono ? await Promise.all([pixEmAberto(user.tenantId), pagamentosFeitos(user.tenantId)]) : [null, []];
  const emTeste = feitos.length === 0;
  const venceu = sit.dias < 0;
  // quem já pagava antes do reajuste continua no preço antigo: cada empresa vê o seu
  const preco = await precoDaEmpresa(user.tenantId);
  const valor = formatBRL(preco);
  // o Pix (ou o cartão) caiu agora há pouco: a tela recarrega sozinha e mostra a confirmação no lugar do aviso de espera
  const acabouDePagar = !aberto && pagoHaPouco((feitos as Awaited<ReturnType<typeof pagamentosFeitos>>)[0]?.pagoEm);

  const titulo = sit.bloqueado ? "O acesso está pausado" : venceu ? "A mensalidade venceu" : emTeste ? "Teste grátis" : "Assinatura";
  const situacao = !dono
    ? "A mensalidade do depo venceu. Peça ao dono da empresa para pagar; tudo volta na hora."
    : sit.bloqueado
      ? `Venceu em ${dataBR(sit.pagoAte)}. Pague a mensalidade e tudo volta na hora, com todos os dados.`
      : venceu
        ? `Venceu em ${dataBR(sit.pagoAte)}. Sem o pagamento, o sistema pausa em ${dataBR(sit.pausaEm)}.`
        : emTeste
          ? `Seu teste vai até ${dataBR(sit.pagoAte)}. Assine quando quiser; os dias que faltam não se perdem.`
          : `Pago até ${dataBR(sit.pagoAte)}.${cartaoLigado ? " O cartão é cobrado sozinho todo mês." : ""}`;

  const pagarPix = (
    <ActionForm action={pixAssinaturaAction}>
      <button className="btn btn-primary h-11 w-full">Pagar {valor} com Pix</button>
      {/* pagar antes do vencimento não perde dias: o mês novo começa onde o atual termina */}
      {/* no teste, a situação logo acima já diz que os dias não se perdem */}
      <p className="mt-2 text-center text-[13px] text-muted">O código aparece aqui.{emTeste ? "" : " Cada pagamento soma um mês ao seu acesso."}</p>
    </ActionForm>
  );
  const pagarCartao = (
    <div className="space-y-3">
      <p className="text-[13px] text-muted">{valor} cobrados no cartão todo mês, sem você precisar lembrar. Dá para desligar quando quiser.</p>
      {/* começou e não terminou: volta para a mesma página do Mercado Pago */}
      {cartaoPendente && (
        <a href={cartao!.link!} className="btn btn-primary h-11 w-full">
          Continuar cadastro do cartão <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
      <ActionForm action={cartaoAssinaturaAction} className="space-y-3">
        <div>
          {/* o Mercado Pago pede que o e-mail seja o da conta em que o dono vai entrar para pôr o cartão */}
          <label className="label" htmlFor="mp-email">E-mail</label>
          <input id="mp-email" name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={user.email} aria-describedby="mp-email-dica" className="input h-11" />
          <p id="mp-email-dica" className="mt-1.5 text-[13px] text-muted">Use este e-mail na página segura do Mercado Pago.</p>
        </div>
        <button className={`btn h-11 w-full ${cartaoPendente ? "" : "btn-primary"}`}>
          <CreditCard size={15} strokeWidth={1.75} aria-hidden="true" /> {cartaoPendente ? "Começar de novo" : `Assinar ${valor} no cartão`}
        </button>
      </ActionForm>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        {/* uma saída só, com cara de botão: voltar ao sistema; com o acesso pausado não há para onde voltar, então é sair */}
        <div className="flex items-center justify-between gap-4">
          <MarcaDaSessao size={28} />
          {!sit.bloqueado ? (
            // sem pré-carregar: o menu buscado ao abrir esta tela ainda diria "Teste" depois de pagar
            <Link href={casa} prefetch={false} className="btn h-11 fino:h-9">
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" /> Voltar ao sistema
            </Link>
          ) : (
            <form action={logout}>
              <button className="btn h-11 fino:h-9">
                <LogOut size={15} strokeWidth={1.75} aria-hidden="true" /> Sair
              </button>
            </form>
          )}
        </div>
        <h1 className="mt-8 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{titulo}</h1>
        <p className="mt-2 text-muted">{situacao}</p>

        {dono && (
          // um cartão só: o plano em cima, a forma de pagar no meio, a linha de confiança no pé
          <section className="mt-8">
            {/* luz parada vinda de cima e um fio na borda superior, como a luz da tela de entrada: calma, igual no celular */}
            <div className="panel relative overflow-hidden bg-[radial-gradient(120%_70%_at_50%_-10%,rgb(255_255_255/0.05),transparent_60%),var(--surface)] p-0">
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
            <div className="p-6">
              <p className="text-[13px] font-medium text-muted">Plano mensal</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                {/* NumberFlow (via LiveNumber): rola até o preço ao abrir, já no formato R$, e chega rápido no valor certo */}
                <LiveNumber value={preco} cents fromZero className="text-[2.25rem] leading-none font-semibold tracking-[-0.03em]" />
                <span className="text-muted">/mês</span>
              </p>
              {/* quem ainda não assinou vê o que está comprando */}
              {emTeste && (
                <ul className="mt-5 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-2">
                  {INCLUSO.map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check size={15} strokeWidth={2.25} className="mt-[3px] shrink-0 text-accent" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pix gerado, pago ou cartão ligado chegam do servidor: a caixa acompanha a altura em vez de pular */}
            <AlturaSuave>
            <div className="border-t border-line p-6">
              {acabouDePagar && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-line bg-subtle px-4 py-3">
                  <CheckSucesso size={32} />
                  <div>
                    <p className="font-medium">Pagamento confirmado</p>
                    <p className="text-[13px] text-muted">Pago até {dataBR(sit.pagoAte)}. Tudo liberado.</p>
                  </div>
                </div>
              )}
              {aberto ? (
                <>
                  <p className="mb-4 text-[13px] text-muted">
                    Pague até {fmtTime(aberto.expiraEm)} de {fmtDateTime(aberto.expiraEm).split(" ")[0].replace(",", "")}.{" "}
                    <TextoQueTroca texto="Esperando o pagamento; a confirmação chega sozinha." brilho />
                  </p>
                  <PixBox code={aberto.codigo} />
                  <AtualizaSozinho ativo />
                </>
              ) : cartaoLigado ? (
                // ligado, o Pix sai de cena para ninguém pagar duas vezes
                <div className="flex flex-wrap items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-subtle">
                    <CreditCard size={19} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Cobrança no cartão ligada</p>
                    <p className="text-[13px] text-muted">{valor} todo mês. Cada cobrança soma um mês ao seu acesso.</p>
                  </div>
                  <ActionForm action={desligarCartaoAction} confirm="Desligar a cobrança no cartão? Os meses já pagos continuam valendo." className="w-full sm:w-auto">
                    <button className="btn h-10 w-full">Desligar</button>
                  </ActionForm>
                </div>
              ) : !cobrancaLigada() ? (
                <p className="text-[13px] text-muted">A cobrança ainda não está ligada. Fale com a Solace.</p>
              ) : cartaoDisponivel ? (
                <FormasDePagamento pix={pagarPix} cartao={pagarCartao} inicial={cartaoPendente ? "cartao" : "pix"} />
              ) : (
                pagarPix
              )}
            </div>
            </AlturaSuave>

            <p className="flex items-center gap-2 border-t border-line bg-subtle px-6 py-3 text-[12px] text-muted">
              <Lock size={13} strokeWidth={1.75} aria-hidden="true" />
              {/* "o acesso libera" só faz sentido para quem está sem acesso */}
              Pagamento seguro pelo Mercado Pago.{venceu || sit.bloqueado ? " O acesso libera assim que o pagamento cai." : ""}
            </p>
            </div>
          </section>
        )}

        {feitos.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-2 text-[13px] font-medium text-muted">Pagamentos</h2>
            <ul className="panel divide-y divide-line p-0 text-[14px]">
              {feitos.map((p, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <span className="num w-24 shrink-0">{fmtDateTime(p.pagoEm).split(" ")[0].replace(",", "")}</span>
                  {/* no celular a linha é curta: data, valor e o selo já dizem tudo */}
                  <span className="min-w-0 flex-1 truncate text-muted max-sm:invisible">Mensalidade</span>
                  <span className="num">{formatBRL(p.valorCents)}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs font-medium">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
                    Pago
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
