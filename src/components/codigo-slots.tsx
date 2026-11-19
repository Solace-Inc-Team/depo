"use client";

import { useEffect, useRef, useState } from "react";
import { tremerCampo } from "./action-form";

/**
 * Código de 6 dígitos em quadradinhos (como o Code Slots do React Bits). Por baixo é um campo só, transparente
 * por cima dos quadros: colar, o teclado numérico e o preenchimento automático do celular continuam valendo.
 * Completo, os quadros se juntam numa barra que é o próprio botão de enviar: o ActionForm mostra nela o
 * carregando e o ✓. Código errado (o ActionForm avisa com "acao-erro"), a barra se desfaz e os quadros tremem e limpam.
 */
export function CodigoSlots({ id, name, tamanho = 6 }: { id: string; name: string; tamanho?: number }) {
  const [valor, setValor] = useState("");
  const [junto, setJunto] = useState(false);
  const campo = useRef<HTMLInputElement>(null);
  const barra = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = campo.current?.form;
    if (!form) return;
    const erro = () => {
      setJunto(false);
      setValor("");
      // espera a barra começar a se desfazer, para o tremor ser dos quadros e não dela
      setTimeout(() => campo.current && tremerCampo(campo.current), 160);
    };
    form.addEventListener("acao-erro", erro);
    return () => form.removeEventListener("acao-erro", erro);
  }, []);

  const enviar = () => {
    setJunto(true);
    // a barra já nasce carregando: com o texto, "Confirmar" piscava antes de o formulário marcar o envio
    barra.current?.setAttribute("data-state", "loading");
    // o tempo de os quadros se juntarem antes de a barra começar a carregar
    setTimeout(() => campo.current?.form?.requestSubmit(barra.current), 220);
  };

  return (
    <div className="codigo-slots" data-junto={junto || undefined}>
      <input
        ref={campo}
        id={id}
        name={name}
        value={valor}
        onChange={(e) => {
          if (junto) return;
          const v = e.target.value.replace(/\D/g, "").slice(0, tamanho);
          setValor(v);
          // o aviso do formulário ao tentar enviar incompleto (Enter): diz o que falta, não "confira o formato"
          e.target.setCustomValidity(v.length && v.length < tamanho ? `Digite os ${tamanho} dígitos do código.` : "");
          // completou agora (digitando ou colando): envia sem precisar de botão
          if (v.length === tamanho && valor.length < tamanho) enviar();
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          // incompleto: o formulário mostra o aviso e os quadros tremem; completo e parado, envia
          if (junto) return;
          if (valor.length === tamanho) enviar();
          else e.currentTarget.form?.requestSubmit();
        }}
        // sem maxLength: colado com espaço ("123 456") seria cortado antes de o espaço sair
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`[0-9]{${tamanho}}`}
        required
        autoFocus
        readOnly={junto}
        className="codigo-slots-campo"
      />
      {/* o quadro da vez: o destaque e o cursor só aparecem com o foco no campo (CSS), que pode chegar antes do React */}
      <div className="codigo-slots-quadros" aria-hidden="true">
        {Array.from({ length: tamanho }, (_, i) => (
          <div key={i} className="codigo-slot num" data-ativo={i === Math.min(valor.length, tamanho - 1) || undefined}>
            {valor[i] ? <span key={valor[i] + i} className="codigo-slot-digito">{valor[i]}</span> : <span className="codigo-slot-cursor" />}
          </div>
        ))}
      </div>
      <button ref={barra} tabIndex={-1} aria-hidden="true" className="btn btn-primary codigo-slots-barra">
        Confirmar
      </button>
    </div>
  );
}
