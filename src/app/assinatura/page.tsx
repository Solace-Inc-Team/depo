import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, pendingTerms } from "@/lib/auth";
import { cartaoAssinaturaAction, desligarCartaoAction, logout, pixAssinaturaAction } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { AtualizaSozinho } from "@/components/atualiza-sozinho";
import { MarcaDaSessao } from "@/components/logo";
import { PixBox } from "@/components/pix-box";
import { fmtDateTime, fmtTime } from "@/components/ui";
import { cobrancaLigada, conferirAssinatura, conferirCartao, pagamentosFeitos, pixEmAberto } from "@/domain/assinatura";
import { formatBRL } from "@/lib/money";
import { PLANO, dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";
import { INCLUSO } from "@/app/inicio/contato";
import { ArrowLeft, ArrowRight, Check, CreditCard, LogOut } from "lucide-react";
import { TextoQueTroca } from "@/components/texto-que-troca";

export const metadata = { title: "Assinatura" };

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
  const valor = formatBRL(PLANO.mensalCents);

  const titulo = sit.bloqueado ? "O acesso está pausado" : venceu ? "A mensalidade venceu" : emTeste ? "Teste grátis" : "Assinatura";
  const situacao = !dono
    ? "A mensalidade do depo venceu. Peça ao dono da empresa para pagar; tudo volta na hora."
    : sit.bloqueado
      ? `Venceu em ${dataBR(sit.pagoAte)}. Pague a mensalidade e tudo volta na hora, com todos os dados.`
      : venceu
        ? `Venceu em ${dataBR(sit.pagoAte)}. Sem o pagamento, o sistema pausa em ${dataBR(sit.pausaEm)}.`
        : emTeste
          ? `Seu teste vai até ${dataBR(sit.pagoAte)}. Depois, ${valor} por mês.`
          : `Pago até ${dataBR(sit.pagoAte)}.${cartaoLigado ? " O cartão é cobrado sozinho todo mês." : ""}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* uma saída só, com cara de botão: voltar ao sistema; com o acesso pausado não há para onde voltar, então é sair */}
        <div className="flex items-center justify-between gap-4">
          <MarcaDaSessao size={28} />
          {!sit.bloqueado ? (
            <Link href={casa} className="btn h-9">
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" /> Voltar ao sistema
            </Link>
          ) : (
            <form action={logout}>
              <button className="btn h-9">
                <LogOut size={15} strokeWidth={1.75} aria-hidden="true" /> Sair
              </button>
            </form>
          )}
        </div>
        <h1 className="mt-8 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{titulo}</h1>
        <p className="mt-2 text-muted">{situacao}</p>

        {/* quem ainda não assinou vê o que está comprando */}
        {dono && emTeste && (
          <ul className="mt-6 space-y-2 border-t border-line pt-6 text-[14px]">
            {INCLUSO.map((x) => (
              <li key={x} className="flex items-center gap-3">
                <Check size={15} strokeWidth={2.25} className="shrink-0 text-accent" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        )}

        {dono &&
          (aberto ? (
            <section className="panel mt-8 p-5">
              <p className="num text-[1.5rem] font-semibold tracking-tight">{valor}</p>
              <p className="mt-1 mb-5 text-[13px] text-muted">
                Pague até {fmtTime(aberto.expiraEm)} de {fmtDateTime(aberto.expiraEm).split(" ")[0].replace(",", "")}.{" "}
                <TextoQueTroca texto="Esperando o pagamento; a confirmação chega sozinha." brilho />
              </p>
              <PixBox code={aberto.codigo} />
              <AtualizaSozinho ativo />
            </section>
          ) : cartaoLigado ? null : cobrancaLigada() ? (
            <ActionForm action={pixAssinaturaAction} className="mt-8">
              <button className="btn btn-primary h-11 w-full">Pagar {valor} com Pix</button>
              {/* pagar antes do vencimento não perde dias: o mês novo começa onde o atual termina */}
              <p className="mt-2 text-center text-[13px] text-muted">Cada pagamento soma um mês ao seu acesso.</p>
            </ActionForm>
          ) : (
            <p className="mt-8 rounded-lg border border-line px-4 py-3 text-[13px] text-muted">A cobrança ainda não está ligada. Fale com a Solace.</p>
          ))}

        {/* cartão: o Mercado Pago cobra sozinho todo mês; ligado, o Pix sai de cena para ninguém pagar duas vezes */}
        {dono && cartaoDisponivel && (
          <section className="mt-8 border-t border-line pt-6">
            <h2 className="flex items-center gap-2 font-semibold">
              <CreditCard size={17} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
              {cartaoLigado ? "Cobrança no cartão ligada" : "Prefere no cartão?"}
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              {cartaoLigado
                ? `O Mercado Pago cobra ${valor} todo mês. Cada cobrança soma um mês ao seu acesso.`
                : `O Mercado Pago cobra ${valor} todo mês, sem você precisar lembrar. Dá para desligar quando quiser.`}
            </p>
            {cartaoLigado ? (
              <ActionForm action={desligarCartaoAction} confirm="Desligar a cobrança no cartão? Os meses já pagos continuam valendo." className="mt-4">
                <button className="btn h-11 w-full">Desligar cobrança no cartão</button>
              </ActionForm>
            ) : (
              <>
                {/* começou e não terminou: volta para a mesma página do Mercado Pago */}
                {cartaoPendente && (
                  <a href={cartao!.link!} className="btn btn-primary mt-4 h-11 w-full">
                    Continuar no Mercado Pago <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                )}
                <ActionForm action={cartaoAssinaturaAction} className="mt-4 space-y-3">
                  <div>
                    {/* o Mercado Pago pede que o e-mail seja o da conta em que o dono vai entrar para pôr o cartão */}
                    <label className="label" htmlFor="mp-email">E-mail da sua conta do Mercado Pago</label>
                    <input id="mp-email" name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={user.email} className="input" />
                  </div>
                  <button className="btn h-11 w-full">
                    <CreditCard size={15} strokeWidth={1.75} aria-hidden="true" /> {cartaoPendente ? "Começar de novo" : "Assinar no cartão"}
                  </button>
                </ActionForm>
              </>
            )}
          </section>
        )}

        {feitos.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[13px] font-medium text-muted">Pagamentos</h2>
            <ul className="mt-2 divide-y divide-line border-y border-line text-[14px]">
              {feitos.map((p, i) => (
                <li key={i} className="flex justify-between py-2.5">
                  <span>{fmtDateTime(p.pagoEm).split(" ")[0].replace(",", "")}</span>
                  <span className="num">{formatBRL(p.valorCents)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
