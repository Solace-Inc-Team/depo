import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { TelaEntrada } from "@/components/tela-entrada";
import { DIAS_GRATIS, PRECO } from "@/app/inicio/contato";
import { CadastroForm } from "./cadastro-form";

export const metadata = { title: { absolute: "Criar conta no depo" } };

export default async function Cadastro() {
  if (await getUser()) redirect("/");
  return (
    <TelaEntrada>
      <h1 className="mt-7 text-center text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Criar conta</h1>
      <p className="mt-1.5 text-center text-muted">
        {DIAS_GRATIS} dias grátis. Depois, {PRECO} por mês.
      </p>
      <CadastroForm />
      <p className="mt-6 text-center text-[13px] text-muted">
        Já tem conta? <Link href="/login" className="alvo font-medium text-fg hover:underline">Entrar</Link>
      </p>
    </TelaEntrada>
  );
}
