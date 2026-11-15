"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Texto que troca sem cortar, como o "Text states swap" do transitions.dev: o antigo sobe 4px desfocando e some
 * (150ms), o novo vem de 4px abaixo e assenta (150ms). Com `brilho`, o texto ganha o "Shimmer text": uma faixa
 * clara atravessa devagar, para dizer que algo está em andamento.
 */
export function TextoQueTroca({ texto, brilho = false, className = "" }: { texto: string; brilho?: boolean; className?: string }) {
  const [mostrado, setMostrado] = useState(texto);
  const [fase, setFase] = useState<"saindo" | "entrando" | undefined>();
  const atual = useRef(texto);

  // só a troca de texto pede animação; os passos não cancelam uns aos outros (a sequência é uma só)
  useEffect(() => {
    if (texto === atual.current) return;
    atual.current = texto;
    const timers = [
      setTimeout(() => setFase("saindo"), 0),
      setTimeout(() => {
        setMostrado(texto);
        setFase("entrando");
      }, 150),
      // um quadro na posição de partida, depois a transição leva ao lugar
      setTimeout(() => setFase(undefined), 180),
    ];
    return () => timers.forEach(clearTimeout);
  }, [texto]);

  return (
    <span className={`troca-texto ${brilho ? "brilho" : ""} ${className}`} data-fase={fase} data-text={mostrado}>
      {mostrado}
    </span>
  );
}
