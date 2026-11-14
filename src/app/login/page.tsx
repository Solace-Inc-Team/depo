import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { login } from "@/app/actions";
import { ActionForm } from "@/components/action-form";
import { TelaEntrada } from "@/components/tela-entrada";

export const metadata = { title: "Entrar" };

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect(user.platformAdmin ? "/admin" : user.role === "entregador" ? "/entregador" : "/");
  return (
    <TelaEntrada rotulo="Depósito" titulo="Do primeiro pedido ao acerto da noite." texto="Fila, entregas, cascos e o caixa de cada entregador, na mesma tela.">
      <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Entrar</h1>
      <p className="mt-1.5 text-muted">Acesse o sistema da sua revenda.</p>
      <ActionForm action={login} className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="username" required className="input h-11" />
        </div>
        <div>
          <label className="label" htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="input h-11" />
        </div>
        <button className="btn btn-primary h-11 w-full">Entrar</button>
      </ActionForm>
      {/* a explicação só aparece para quem precisa: um link curto no lugar de um parágrafo fixo */}
      <details className="pergunta mt-4 text-[13px]">
        <summary className="alvo cursor-pointer text-muted hover:text-fg">Esqueci a senha</summary>
        <p className="mt-2 text-muted">Peça ao dono da empresa para redefinir. Se você é o dono, fale com a Solace.</p>
      </details>
      <p className="mt-6 text-[13px] text-muted">
        Ainda não usa? <Link href="/cadastro" className="alvo font-medium text-fg hover:underline">Criar conta</Link>
      </p>
      {process.env.SEED_DEMO === "true" && (
        <details className="pergunta mt-10 rounded-xl border border-line bg-surface/60 text-[13px] text-muted">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-fg">
            Acessos de demonstração
            <span aria-hidden="true" className="pergunta-sinal" />
          </summary>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 pb-4">
            <dt>Dono</dt>
            <dd className="text-fg">dono@demo.com</dd>
            <dt>Atendente</dt>
            <dd className="text-fg">atendente@demo.com</dd>
            <dt>Caixa</dt>
            <dd className="text-fg">caixa@demo.com</dd>
            <dt>Entregador</dt>
            <dd className="text-fg">joao@demo.com</dd>
            <dt>Senha</dt>
            <dd className="text-fg">demo1234</dd>
          </dl>
        </details>
      )}
    </TelaEntrada>
  );
}
