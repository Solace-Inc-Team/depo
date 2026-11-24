"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TextoQueTroca } from "@/components/texto-que-troca";

/**
 * Uma palavra do título que troca sozinha ("casco", "galão", "botijão"), como o Rotating Text do React Bits, mas
 * com a troca do próprio sistema (sobe desfocando, a nova vem de baixo). A largura acompanha a palavra devagar,
 * para o resto da linha não pular. O leitor de tela ouve só a primeira; com movimento reduzido, nada troca.
 * `sufixo` (o ponto final) troca junto com a palavra. No celular a largura fica a da maior palavra: a quebra da
 * linha não muda a cada troca (de 420 a 440 px o título pulava de 2 para 3 linhas).
 */
export function PalavraQueGira({ palavras: base, sufixo = "", intervalo = 2400, inicio = 2300 }: { palavras: string[]; sufixo?: string; intervalo?: number; inicio?: number }) {
  const palavras = base.map((p) => p + sufixo);
  const [i, setI] = useState(0);
  const [larguras, setLarguras] = useState<number[]>([]);
  const medidas = useRef<HTMLSpanElement>(null);

  // mede cada palavra na fonte da página; mede de novo quando a fonte termina de carregar
  useLayoutEffect(() => {
    const medir = () => setLarguras([...(medidas.current?.children ?? [])].map((e) => e.getBoundingClientRect().width));
    medir();
    document.fonts?.ready.then(medir);
    addEventListener("resize", medir);
    return () => removeEventListener("resize", medir);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let laco: ReturnType<typeof setInterval>;
    const gira = () => !document.hidden && setI((v) => (v + 1) % palavras.length);
    // a primeira troca vem logo que o título assenta (antes esperava mais um intervalo inteiro e passava de 5 s)
    const comeca = setTimeout(() => {
      gira();
      laco = setInterval(gira, intervalo);
    }, inicio);
    return () => {
      clearTimeout(comeca);
      clearInterval(laco);
    };
  }, [palavras.length, intervalo, inicio]);

  return (
    <span className="palavra-gira" style={larguras[i] ? ({ width: larguras[i], "--maior": `${Math.max(...larguras)}px` } as React.CSSProperties) : undefined}>
      <span className="sr-only">{palavras[0]}</span>
      <span aria-hidden="true">
        <TextoQueTroca texto={palavras[i]} />
      </span>
      <span ref={medidas} aria-hidden="true" className="palavra-gira-medida">
        {palavras.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </span>
    </span>
  );
}
