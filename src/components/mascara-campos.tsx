"use client";

import { useEffect } from "react";
import { formatarCep, formatarDinheiro, formatarTelefone, somenteNumeros } from "@/lib/mascara";

const formatos: Record<string, { formatar: (v: string) => string; conta: RegExp }> = {
  telefone: { formatar: formatarTelefone, conta: /\d/ },
  // ponto e vírgula contam: o cursor tem de ficar depois deles
  dinheiro: { formatar: formatarDinheiro, conta: /[\d.,]/ },
  numero: { formatar: somenteNumeros, conta: /\d/ },
  cep: { formatar: formatarCep, conta: /\d/ },
};

/**
 * Campos com data-mascara="telefone" | "dinheiro" | "numero" | "cep" ganham o formato enquanto a pessoa digita:
 * letra não entra no telefone, o telefone vira (11) 91111-1111, o valor aceita só número e vírgula.
 * Um ouvinte só, na fase de captura: formata antes de o React ler o valor, então vale também para
 * campo controlado. O cursor fica depois do mesmo dígito em que estava, sem pular para o fim.
 */
export function MascaraCampos() {
  useEffect(() => {
    const aoDigitar = (e: Event) => {
      const el = e.target as HTMLInputElement;
      const f = el?.dataset?.mascara && formatos[el.dataset.mascara];
      if (!f) return;
      const antes = el.value;
      const novo = f.formatar(antes);
      if (novo === antes) return;
      // quantos caracteres que contam (dígitos, e a vírgula no dinheiro) havia antes do cursor
      const cursor = el.selectionStart ?? antes.length;
      const contados = [...antes.slice(0, cursor)].filter((c) => f.conta.test(c)).length;
      el.value = novo;
      let pos = 0;
      for (let n = 0; pos < novo.length && n < contados; pos++) if (f.conta.test(novo[pos])) n++;
      try {
        el.setSelectionRange(pos, pos);
      } catch {
        // campo sem seleção (type=number): fica onde o navegador deixar
      }
    };
    document.addEventListener("input", aoDigitar, true);
    return () => document.removeEventListener("input", aoDigitar, true);
  }, []);
  return null;
}
