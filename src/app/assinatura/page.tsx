import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, pendingTerms } from "@/lib/auth";
import { logout, pixAssinaturaAction } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { AtualizaSozinho } from "@/components/atualiza-sozinho";
import { MarcaDaSessao } from "@/components/logo";
import { PixBox } from "@/components/pix-box";
import { fmtDateTime, fmtTime } from "@/components/ui";
import { cobrancaLigada, conferirAssinatura, pagamentosFeitos, pixEmAberto } from "@/domain/assinatura";
import { formatBRL } from "@/lib/money";
import { PLANO, dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";
import { INCLUSO } from "@/app/inicio/contato";
import { Check } from "lucide-react";

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

  // o Pix pode ter caído agora: confere antes de mostrar, e com mês novo a página recomeça com a data certa
  if (dono && (await conferirAssinatura(user.tenantId))) redirect("/assinatura");
  const [aberto, feitos] = dono ? await Promise.all([pixEmAberto(user.tenantId), pagamentosFeitos(user.tenantId)]) : [null, []];
  const emTeste = feitos.length === 0;
  const venceu = sit.dias < 0;
  const valor = formatBRL(PLANO.mensalCents);

  const titulo = sit.bloqueado ? "O acesso está pausado" : venceu ? "A mensalidade venceu" : emTeste ? "Teste grátis" : "Assinatura";
  const situacao = !dono
    ? "A mensalidade do Depósito venceu. Peça ao dono da empresa para pagar; tudo volta na hora."
    : sit.bloqueado
      ? `Venceu em ${dataBR(sit.pagoAte)}. Pague a mensalidade e tudo volta na hora, com todos os dados.`
      : venceu
        ? `Venceu em ${dataBR(sit.pagoAte)}. Sem o pagamento, o sistema pausa em ${dataBR(sit.pausaEm)}.`
        : emTeste
          ? `Seu teste vai até ${dataBR(sit.pagoAte)}. Depois, ${valor} por mês.`
          : `Pago até ${dataBR(sit.pagoAte)}.`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <MarcaDaSessao size={28} />
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
                Pague até {fmtTime(aberto.expiraEm)} de {fmtDateTime(aberto.expiraEm).split(" ")[0].replace(",", "")}. A confirmação chega sozinha.
              </p>
              <PixBox code={aberto.codigo} />
              <AtualizaSozinho ativo />
            </section>
          ) : cobrancaLigada() ? (
            <ActionForm action={pixAssinaturaAction} className="mt-8">
              <button className="btn btn-primary h-11 w-full">Pagar {valor} com Pix</button>
              {/* pagar antes do vencimento não perde dias: o mês novo começa onde o atual termina */}
              <p className="mt-2 text-center text-[13px] text-muted">Cada pagamento soma um mês ao seu acesso.</p>
            </ActionForm>
          ) : (
            <p className="mt-8 rounded-lg border border-line px-4 py-3 text-[13px] text-muted">A cobrança ainda não está ligada. Fale com a Solace.</p>
          ))}

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

        <div className="mt-8 flex items-center justify-between text-[13px]">
          {!sit.bloqueado ? (
            <Link href={casa} className="alvo font-medium hover:underline">Voltar ao sistema</Link>
          ) : (
            <span />
          )}
          <form action={logout}>
            <button className="text-muted hover:text-fg">Sair</button>
          </form>
        </div>
      </div>
    </main>
  );
}
