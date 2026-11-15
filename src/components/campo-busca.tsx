"use client";

import { useRef, useState } from "react";
import { Search, X } from "lucide-react";

// "Input clear with dissolve" do transitions.dev: o × apaga o texto, que desce 12px se desfazendo (400ms), o
// placeholder desce de 12px acima no lugar, e um brilho baixo passa sob cada palavra (pico aos 15% de 1s).
const sai = (t: number) => 1 - Math.pow(1 - t, 3.2); // perto do cubic-bezier(0.22, 1, 0.36, 1) do original

/** Busca das listas (Pedidos, Clientes): Enter procura; o × limpa e, se havia busca aplicada, mostra tudo de novo. */
export function CampoBusca({ name, defaultValue = "", placeholder, rotulo }: { name: string; defaultValue?: string; placeholder: string; rotulo: string }) {
  const input = useRef<HTMLInputElement>(null);
  const espelho = useRef<HTMLSpanElement>(null);
  const falso = useRef<HTMLSpanElement>(null);
  const brilho = useRef<HTMLSpanElement>(null);
  const [tem, setTem] = useState(!!defaultValue);
  const [limpando, setLimpando] = useState(false);

  // um brilho em elipse sob cada palavra, medido com a fonte do próprio campo
  const camadas = (texto: string, largura: number, el: HTMLInputElement) => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return "";
    const cs = getComputedStyle(el);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const cor = document.documentElement.dataset.tema === "claro" ? "0,0,0" : "255,255,255";
    const camadas: string[] = [];
    let x = parseFloat(cs.paddingLeft);
    for (const parte of texto.split(/(\s+)/)) {
      const w = ctx.measureText(parte).width;
      if (parte.trim()) {
        const meio = x + w / 2;
        const hw = Math.max(w * 0.45, 8) * 1.5;
        for (const l of [
          { dx: 0, rw: hw * 0.8, rh: 7, a: 0.22 },
          { dx: hw * 0.45, rw: hw * 0.55, rh: 8, a: 0.18 },
          { dx: -hw * 0.4, rw: hw * 0.65, rh: 6, a: 0.16 },
          { dx: hw * 0.15, rw: hw * 0.9, rh: 5, a: 0.14 },
        ])
          camadas.push(`radial-gradient(ellipse ${Math.max(l.rw, 2).toFixed(1)}px ${l.rh}px at ${(((meio + l.dx) / largura) * 100).toFixed(2)}% 100%, rgba(${cor},${l.a}), transparent)`);
      }
      x += w;
    }
    return camadas.join(", ");
  };

  const limpar = () => {
    const el = input.current;
    const esp = espelho.current;
    const ph = falso.current;
    const gl = brilho.current;
    if (!el || !esp || !ph || !gl || !el.value || limpando) return;
    const texto = el.value;
    const aplicada = !!defaultValue;
    esp.textContent = texto.replace(/ /g, "\u00a0");
    gl.style.background = camadas(texto, el.clientWidth, el);
    el.value = "";
    setTem(false);
    setLimpando(true);
    el.focus({ preventScroll: true });
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inicio = performance.now();
    const quadro = (agora: number) => {
      const t = agora - inicio;
      const e = sai(Math.min(1, t / 400));
      esp.style.transform = `translateY(${(e * 12).toFixed(1)}px)`;
      esp.style.opacity = (1 - e).toFixed(3);
      esp.style.filter = `blur(${(e * 2).toFixed(1)}px)`;
      ph.style.transform = `translateY(${(-12 + e * 12).toFixed(1)}px)`;
      ph.style.opacity = (0.9 + e * 0.1).toFixed(3);
      ph.style.filter = `blur(${(2 - e * 2).toFixed(1)}px)`;
      const gp = Math.max(0, Math.min(1, (t - 50) / 950));
      gl.style.opacity = (gp < 0.15 ? gp / 0.15 : 1 - (gp - 0.15) / 0.85).toFixed(3);
      if (t < 1000 && !reduzido) requestAnimationFrame(quadro);
      else {
        for (const s of [esp, ph, gl]) s.removeAttribute("style");
        esp.textContent = "";
        setLimpando(false);
        if (aplicada) el.form?.requestSubmit();
      }
    };
    requestAnimationFrame(quadro);
  };

  return (
    <label className="campo-busca relative block w-full" data-limpando={limpando || undefined}>
      <span className="sr-only">{rotulo}</span>
      <Search size={15} strokeWidth={1.75} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        ref={input}
        name={name}
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        onInput={(e) => setTem(!!e.currentTarget.value)}
        className="input pr-9 pl-9"
      />
      <span ref={espelho} aria-hidden="true" className="campo-busca-espelho" />
      <span ref={falso} aria-hidden="true" className="campo-busca-espelho campo-busca-falso">
        {placeholder}
      </span>
      <span ref={brilho} aria-hidden="true" className="campo-busca-brilho" />
      <button
        type="button"
        aria-label="Limpar busca"
        tabIndex={tem ? 0 : -1}
        onPointerDown={(e) => e.preventDefault()}
        onClick={limpar}
        className="campo-busca-limpar"
        data-visivel={tem || undefined}
      >
        <X size={14} strokeWidth={2} aria-hidden="true" />
      </button>
    </label>
  );
}
