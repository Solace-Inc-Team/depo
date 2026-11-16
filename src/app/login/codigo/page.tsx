import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getPendingMfa } from "@/lib/auth";
import { verifyMfaAction } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { TelaEntrada } from "@/components/tela-entrada";
import { caminhoSeguro } from "@/lib/caminho";

export const metadata = { title: "Código de verificação" };

export default async function Codigo({ searchParams }: PageProps<"/login/codigo">) {
  const next = caminhoSeguro((await searchParams).next);
  if (!(await getPendingMfa())) redirect("/login");
  return (
    // a mesma moldura do login: o passo seguinte não pode parecer outra página
    <TelaEntrada>
      <ShieldCheck size={28} strokeWidth={1.5} className="mx-auto mt-7 text-muted" aria-hidden="true" />
      <h1 className="mt-3 text-center text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Código de verificação</h1>
      <p className="mt-1.5 text-center text-muted">Abra o app autenticador e digite o código de 6 dígitos do depo.</p>
      <ActionForm action={verifyMfaAction} className="mt-8 space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        <div>
          <label className="label" htmlFor="code">Código</label>
          <input
            id="code"
            name="code"
            inputMode="numeric" data-mascara="numero"
            autoComplete="one-time-code"
            pattern="[0-9 ]{6,7}"
            maxLength={7}
            required
            autoFocus
            className="input num h-12 text-center text-xl tracking-[0.3em]"
          />
        </div>
        <button className="btn btn-primary h-11 w-full">Confirmar</button>
      </ActionForm>
      <p className="mt-4 text-center text-[13px] text-muted">Perdeu o celular ou trocou de aparelho? Peça ao dono da empresa para redefinir seu acesso (se você é o dono, fale com o suporte do depo). A verificação em duas etapas é desligada e você ativa de novo no aparelho novo.</p>
      <Link href="/login" className="btn mx-auto mt-6 flex w-fit">
        <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" /> Voltar ao login
        </Link>
    </TelaEntrada>
  );
}
