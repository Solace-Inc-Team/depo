"use client";

import { useState } from "react";
import { Aparece } from "@/components/saida";
import { todayISO } from "@/lib/period";

/**
 * Valor e forma de pagamento da compra. No boleto a compra ainda não foi paga: pede o vencimento e vira conta
 * a pagar. Nas outras formas, já saiu dinheiro: entra nas despesas de hoje.
 */
export function PagamentoCompra() {
  const [forma, setForma] = useState("boleto");
  const [valor, setValor] = useState("");
  const boleto = forma === "boleto";
  return (
    <>
      <div>
        <label className="label" htmlFor="p-cost">Valor da compra (opcional)</label>
        <input id="p-cost" name="cost" inputMode="decimal" data-mascara="dinheiro" maxLength={12} className="input" placeholder="0,00" value={valor} onChange={(e) => setValor(e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="p-method">Pago com</label>
        <select id="p-method" name="costMethod" className="input" value={forma} onChange={(e) => setForma(e.target.value)}>
          <option value="boleto">Boleto</option>
          <option value="pix">Pix</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
        </select>
      </div>
      {/* só com valor no boleto: o vencimento faz a compra virar conta a pagar */}
      <Aparece quando={boleto && !!valor} className="sm:col-span-2">
        <label className="label" htmlFor="p-due">Vencimento do boleto</label>
        <input id="p-due" name="dueOn" type="date" required={boleto && !!valor} min={todayISO()} className="input sm:max-w-56" />
      </Aparece>
      <p className="text-[13px] text-muted sm:col-span-2">
        {!valor ? "Sem valor, entra só no estoque." : boleto ? "Vai para A pagar, em Despesas." : "Entra nas despesas de hoje."}
      </p>
    </>
  );
}
