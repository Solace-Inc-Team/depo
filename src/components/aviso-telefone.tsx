"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Aparece } from "./saida";

type Achado = { id: string; name: string; phone: string };
const ultimos11 = (s: string) => s.replace(/\D/g, "").slice(-11);

/**
 * Campo de telefone do cadastro de cliente que avisa quando o número já é de outro cliente.
 * Só avisa: família ou empresa com o mesmo número é caso real, então dá para salvar mesmo assim.
 */
export function TelefoneCliente({ id, name, defaultValue, className, outroQue }: { id: string; name: string; defaultValue?: string; className?: string; outroQue?: string }) {
  const [dono, setDono] = useState<Achado | null>(null);
  const [mostrar, setMostrar] = useState(false);
  const pedido = useRef(0);

  async function conferir(valor: string) {
    const tel = ultimos11(valor);
    const vez = ++pedido.current;
    if (tel.length < 10) return setMostrar(false);
    const lista: Achado[] = await fetch(`/clientes/busca?q=${tel}`)
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
    // resposta de uma digitação anterior chegou depois: vale a mais nova
    if (vez !== pedido.current) return;
    const achado = lista.find((c) => c.id !== outroQue && ultimos11(c.phone ?? "") === tel);
    if (achado) setDono(achado);
    setMostrar(!!achado);
  }

  return (
    <>
      <input
        id={id}
        name={name}
        inputMode="tel"
        data-mascara="telefone"
        autoComplete="tel"
        defaultValue={defaultValue}
        className={className}
        aria-describedby={`${id}-dono`}
        onBlur={(e) => conferir(e.currentTarget.value)}
        // onInput e não onChange: a máscara reescreve o valor e o React deixa de ver a mudança
        onInput={() => setMostrar(false)}
      />
      <div id={`${id}-dono`} aria-live="polite">
        <Aparece quando={mostrar} className="pt-1.5">
          {dono && (
            <p className="text-sm text-warn-fg">
              Esse telefone já é de{" "}
              <Link href={`/clientes/${dono.id}`} target="_blank" rel="noopener" className="font-medium underline">
                {dono.name}
              </Link>
              . Se for outra pessoa, pode salvar mesmo assim.
            </p>
          )}
        </Aparece>
      </div>
    </>
  );
}
