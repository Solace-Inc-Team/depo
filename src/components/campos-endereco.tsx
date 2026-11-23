"use client";

import { useEffect, useRef, useState } from "react";
import { juntarEndereco, separarEndereco } from "@/lib/endereco";

/**
 * O endereço em partes: CEP (que preenche rua e bairro sozinho), rua, número, complemento e bairro. O formulário
 * recebe uma linha só, no campo escondido `nome`, como sempre recebeu. `id`: prefixo dos ids, para dois na mesma tela.
 */
export function CamposEndereco({
  nome,
  id,
  inicial,
  obrigatorio = false,
  className = "",
}: {
  nome: string;
  id: string;
  inicial?: string | null;
  obrigatorio?: boolean;
  className?: string;
}) {
  const [p, setP] = useState(() => separarEndereco(inicial));
  const [aviso, setAviso] = useState<{ texto: string; erro?: boolean } | null>(null);
  const numero = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);
  const buscado = useRef("");
  const muda = (k: keyof typeof p) => (e: React.ChangeEvent<HTMLInputElement>) => setP((x) => ({ ...x, [k]: e.target.value }));

  async function buscarCep(valor: string) {
    const cep = valor.replace(/\D/g, "");
    if (cep.length !== 8 || cep === buscado.current) return;
    buscado.current = cep;
    setAviso({ texto: "Buscando o CEP…" });
    try {
      const r = await fetch(`/api/cep/${cep}`);
      const d = (await r.json()) as { rua?: string; bairro?: string; cidade?: string; uf?: string; erro?: string };
      if (!r.ok) return setAviso({ texto: d.erro ?? "CEP não encontrado. Preencha à mão.", erro: true });
      // CEP de cidade pequena vem sem rua: só o que veio substitui o que estava
      setP((x) => ({ ...x, rua: d.rua || x.rua, bairro: d.bairro || x.bairro }));
      setAviso(d.cidade ? { texto: `${d.cidade}/${d.uf}` } : null);
      if (d.rua) numero.current?.focus();
    } catch {
      setAviso({ texto: "Sem internet para buscar o CEP. Preencha à mão.", erro: true });
    }
  }

  // ouvinte nativo: a máscara do CEP reescreve o campo antes do React, que então não vê a mudança no onChange
  useEffect(() => {
    const el = cepRef.current;
    if (!el) return;
    const aoDigitar = () => void buscarCep(el.value);
    el.addEventListener("input", aoDigitar);
    return () => el.removeEventListener("input", aoDigitar);
  });

  return (
    <div className={`grid grid-cols-6 gap-3 ${className}`}>
      <input type="hidden" name={nome} value={juntarEndereco(p)} />
      {/* o CEP tem linha própria: estes campos vivem em janelas estreitas, onde lado a lado ele espremia */}
      <div className="col-span-6">
        <label className="label" htmlFor={`${id}-cep`}>
          CEP <span className="font-normal text-muted">(preenche a rua e o bairro)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            id={`${id}-cep`}
            inputMode="numeric"
            autoComplete="postal-code"
            data-mascara="cep"
            maxLength={9}
            placeholder="00000-000"
            className="input num w-36 shrink-0"
            ref={cepRef}
            aria-describedby={`${id}-cep-aviso`}
          />
          <p id={`${id}-cep-aviso`} aria-live="polite" className={`min-w-0 text-[12.5px] ${aviso?.erro ? "text-danger" : "text-muted"}`}>
            {aviso?.texto}
          </p>
        </div>
      </div>
      <div className="col-span-6">
        <label className="label" htmlFor={`${id}-rua`}>Rua</label>
        <input id={`${id}-rua`} value={p.rua} onChange={muda("rua")} required={obrigatorio} maxLength={120} autoComplete="address-line1" className="input" placeholder="Rua, avenida, travessa" />
      </div>
      <div className="col-span-2">
        <label className="label" htmlFor={`${id}-num`}>Número</label>
        <input ref={numero} id={`${id}-num`} value={p.numero} onChange={muda("numero")} required={obrigatorio} maxLength={12} className="input num" placeholder="120" />
      </div>
      <div className="col-span-4">
        <label className="label" htmlFor={`${id}-comp`}>
          Complemento <span className="font-normal text-muted">(opcional)</span>
        </label>
        <input id={`${id}-comp`} value={p.complemento} onChange={muda("complemento")} maxLength={40} autoComplete="address-line2" className="input" placeholder="Apto, bloco, casa 2" />
      </div>
      <div className="col-span-6">
        <label className="label" htmlFor={`${id}-bairro`}>Bairro</label>
        <input id={`${id}-bairro`} value={p.bairro} onChange={muda("bairro")} required={obrigatorio} maxLength={60} className="input" />
      </div>
    </div>
  );
}
