import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { cadastrarAction } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { MarcaDaSessao } from "@/components/logo";

export const metadata = { title: "Criar conta" };

export default async function Cadastro() {
  if (await getUser()) redirect("/");
  return (
    <main className="pagina-escura relative isolate flex min-h-screen flex-col items-center justify-center px-6 py-16">
      {/* o mesmo palco do login: sempre escuro, só a luz da marca vindo de cima */}
      <div aria-hidden="true" className="topo-luz absolute inset-0 -z-10" />
      <div className="w-full max-w-[22rem]">
        <div className="stagger">
          <div className="flex justify-center">
            <MarcaDaSessao size={28} />
          </div>
          <h1 className="mt-8 text-center text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Criar conta</h1>
          <p className="mt-1.5 text-center text-muted">Comece a usar com a sua revenda hoje.</p>
          <ActionForm action={cadastrarAction} className="mt-8 space-y-4">
            <div>
              <label className="label" htmlFor="company">Nome da revenda</label>
              <input id="company" name="company" autoComplete="organization" required minLength={2} maxLength={120} className="input h-11" />
            </div>
            <div>
              <label className="label" htmlFor="ownerName">Seu nome</label>
              <input id="ownerName" name="ownerName" autoComplete="name" required minLength={2} maxLength={80} className="input h-11" />
            </div>
            <div>
              <label className="label" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} className="input h-11" />
            </div>
            <div>
              <label className="label" htmlFor="password">Senha</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={200} placeholder="Pelo menos 8 caracteres" className="input h-11" />
            </div>
            {/* só robô preenche: fica fora da tela e fora do Tab */}
            <input name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
            <label className="flex items-start gap-2.5 text-[13px] text-muted">
              <input type="checkbox" name="agree" required className="mt-0.5" />
              <span>
                Li e aceito os <Link href="/termos" target="_blank" className="alvo font-medium text-fg underline underline-offset-2">Termos de uso</Link> e a{" "}
                <Link href="/privacidade" target="_blank" className="alvo font-medium whitespace-nowrap text-fg underline underline-offset-2">Política de privacidade</Link>.
              </span>
            </label>
            <button className="btn btn-primary h-11 w-full">Criar conta</button>
          </ActionForm>
          <p className="mt-6 text-center text-[13px] text-muted">
            Já tem conta? <Link href="/login" className="alvo font-medium text-fg hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
