"use client";

import { Alternar } from "@/components/controles";

/** Liga e desliga que salva sozinho ao tocar: envia o formulário em volta (um ActionForm). */
export function CaixaQueSalva({ name, defaultChecked }: { name: string; defaultChecked: boolean }) {
  return <Alternar name={name} defaultChecked={defaultChecked} onChange={(e) => e.currentTarget.form?.requestSubmit()} />;
}
