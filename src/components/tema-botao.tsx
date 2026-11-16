"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Alternar } from "./controles";
import { aplicar, lerEscolha, temaEscuro, type Escolha } from "@/lib/tema";

// os ícones dos três estados (o automático só aparece para quem já o tinha escolhido); o clique alterna escuro e claro,
// porque com o automático no meio uma das voltas não mudava nada na tela
const ordem: Escolha[] = ["escuro", "claro", "auto"];
const info = {
  auto: { icone: Monitor, texto: "Tema automático, igual ao do aparelho" },
  claro: { icone: Sun, texto: "Tema claro" },
  escuro: { icone: Moon, texto: "Tema escuro" },
};

/** Um botão que alterna escuro e claro. O título diz o atual; o clique passa ao outro. */
export function TemaBotao({ className = "" }: { className?: string }) {
  // no servidor é o escuro padrão; no navegador lê a escolha guardada e acompanha qualquer troca de tema
  const escolha = useSyncExternalStore(temaEscuro.assinar, lerEscolha, () => "escuro" as Escolha);
  // quem ainda está no automático vai para o oposto do que está vendo
  const vendo = escolha === "auto" ? (typeof document !== "undefined" && document.documentElement.dataset.tema === "claro" ? "claro" : "escuro") : escolha;
  const proxima: Escolha = vendo === "escuro" ? "claro" : "escuro";
  return (
    <button
      type="button"
      data-dica={`Mudar para ${info[proxima].texto.toLowerCase()}`}
      aria-label={`${info[escolha].texto}. Trocar tema`}
      onClick={(e) => {
        // o tema novo nasce do centro do ícone clicado
        const r = e.currentTarget.getBoundingClientRect();
        aplicar(proxima, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className={`grid place-items-center rounded-md text-muted hover:bg-subtle hover:text-fg ${className}`}
    >
      {/* os três ícones no mesmo lugar: o que sai gira e some, o que entra gira e aparece */}
      <span className="grid size-[15px] *:col-start-1 *:row-start-1" aria-hidden="true">
        {ordem.map((k) => {
          const Icone = info[k].icone;
          return <Icone key={k} size={15} strokeWidth={1.75} className="tema-icone" data-on={k === escolha || undefined} />;
        })}
      </span>
    </button>
  );
}

/** A linha "Modo claro" da gaveta do celular: o escuro é o padrão, então o claro é um liga e desliga. */
export function ModoClaro({ className = "" }: { className?: string }) {
  const escolha = useSyncExternalStore(temaEscuro.assinar, lerEscolha, () => "escuro" as Escolha);
  const claro = escolha === "claro" || (escolha === "auto" && typeof document !== "undefined" && document.documentElement.dataset.tema === "claro");
  // um label: tocar em qualquer ponto da linha liga ou desliga
  return (
    <label className={className}>
      <span className="flex items-center gap-3">
        <Sun size={18} strokeWidth={1.75} aria-hidden="true" /> Modo claro
      </span>
      <Alternar
        checked={claro}
        onChange={(e) => {
          // o tema novo nasce do interruptor
          const r = e.currentTarget.getBoundingClientRect();
          aplicar(e.currentTarget.checked ? "claro" : "escuro", { x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }}
      />
    </label>
  );
}
