import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { TelaEntrada } from "@/components/tela-entrada";
import { DIAS_GRATIS, PRECO } from "@/app/inicio/contato";
import { CadastroForm } from "./cadastro-form";

export const metadata = { title: "Criar conta" };

export default async function Cadastro() {
  if (await getUser()) redirect("/");
  return (
    <TelaEntrada
      rotulo={`${DIAS_GRATIS} dias grátis`}
      titulo="Sua revenda rodando ainda hoje."
      texto={`Depois, ${PRECO} por mês no Pix. Sem cartão e sem fidelidade.`}
    >
      <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Criar conta</h1>
      {/* no computador o teste grátis está no painel ao lado; no celular, aqui */}
      <p className="mt-1.5 text-muted lg:hidden">Os primeiros {DIAS_GRATIS} dias são grátis.</p>
      <CadastroForm />
      <p className="mt-8 text-[13px] text-muted">
        Já tem conta? <Link href="/login" className="alvo font-medium text-fg hover:underline">Entrar</Link>
      </p>
    </TelaEntrada>
  );
}
