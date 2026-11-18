"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { confirmar } from "@/components/confirm-dialog";

/**
 * O X do novo pedido no celular. Com produto no carrinho ou cliente escolhido, pergunta antes: um toque sem querer
 * jogava fora o pedido que estava sendo anotado.
 */
export function FecharNovo() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Fechar sem lançar"
      onClick={async () => {
        const form = document.querySelector<HTMLFormElement>("form:has(input[name=items])");
        const itens = form?.querySelector<HTMLInputElement>("input[name=items]")?.value ?? "[]";
        const cliente = form?.querySelector<HTMLInputElement>("input[name=customerId]")?.value ?? "";
        // cliente novo digitado (nome) também é algo anotado, mesmo sem produto ainda
        const novoCliente = form?.querySelector<HTMLInputElement>("input[name=newCustomerName]")?.value.trim() ?? "";
        const temAlgo = cliente !== "" || novoCliente !== "" || (JSON.parse(itens) as { quantity?: number }[]).some((i) => (i.quantity ?? 1) > 0);
        if (temAlgo && !(await confirmar("Descartar este pedido? O que foi anotado se perde.", { rotulo: "Descartar", perigo: true }))) return;
        router.push("/pedidos");
      }}
      className="-mr-2 grid size-11 place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg sm:hidden"
    >
      <X size={20} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
