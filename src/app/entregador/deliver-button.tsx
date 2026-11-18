"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { deliverAction } from "@/app/actions";
import { toast } from "@/components/action-form";
import { recarregarSeVersaoNova } from "@/lib/versao-nova";
import { LiveNumber } from "@/components/live-number";
import { TextoQueTroca } from "@/components/texto-que-troca";

const WAIT = 5;
const QUEUE = "deposito:entregas-a-enviar";

// toque curto no Android (o iPhone ignora): confirma no bolso sem olhar a tela
const buzz = (pattern: number | number[]) => {
  try {
    navigator.vibrate?.(pattern);
  } catch {}
};

// entregas confirmadas sem internet ficam guardadas no aparelho até a conexão voltar
const queued = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(QUEUE) ?? "[]");
  } catch {
    return [];
  }
};
const setQueued = (ids: string[]) => {
  try {
    localStorage.setItem(QUEUE, JSON.stringify(ids));
  } catch {
    // aparelho sem armazenamento: a confirmação só não sobrevive a fechar a tela
  }
};

/** "Entreguei" só vale depois de 5 segundos: dá tempo de desfazer um toque no card errado. */
export function DeliverButton({ orderId, label }: { orderId: string; label: string }) {
  const [left, setLeft] = useState<number | null>(null);
  const [error, setError] = useState<string>();
  const [waitingNetwork, setWaitingNetwork] = useState(false);
  const [pending, start] = useTransition();
  // depois do "Desfazer" o foco volta para o botão, em vez de cair no começo da página
  const [desfez, setDesfez] = useState(false);

  const send = useCallback(() => {
    const fd = new FormData();
    fd.set("orderId", orderId);
    start(async () => {
      try {
        const r = await deliverAction(fd);
        setQueued(queued().filter((id) => id !== orderId));
        setWaitingNetwork(false);
        setError(r?.error);
        if (r?.ok) {
          buzz([12, 60, 12]);
          toast(r.ok);
        }
      } catch (e) {
        // depo atualizado com a tela aberta: recarrega, e a entrega guardada é enviada de novo ao abrir
        // sem sinal: guarda e tenta de novo. Repetir é seguro, o servidor não confirma duas vezes
        const novaVersao = recarregarSeVersaoNova(e, 1500);
        if (novaVersao || e instanceof TypeError || !navigator.onLine) {
          setQueued([...new Set([...queued(), orderId])]);
          setWaitingNetwork(!novaVersao);
          if (novaVersao) setError("O depo acabou de ser atualizado. Recarregando, a entrega vai junto.");
        } else {
          // erro do servidor com internet: dizer "sem internet" e repetir para sempre não ajuda ninguém
          setQueued(queued().filter((id) => id !== orderId));
          setWaitingNetwork(false);
          setError("Não deu para confirmar a entrega agora. Tente de novo em instantes.");
        }
      }
      setLeft(null);
    });
  }, [orderId]);

  useEffect(() => {
    if (queued().includes(orderId)) send();
  }, [orderId, send]);

  useEffect(() => {
    if (!waitingNetwork) return;
    const t = setInterval(send, 15000);
    window.addEventListener("online", send);
    return () => {
      clearInterval(t);
      window.removeEventListener("online", send);
    };
  }, [waitingNetwork, send]);

  // fechar a tela no meio da contagem perderia a confirmação; e os outros cards ficam travados para não confirmar dois de uma vez
  useEffect(() => {
    if (!left) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    document.body.dataset.confirmando = "1";
    return () => {
      window.removeEventListener("beforeunload", warn);
      delete document.body.dataset.confirmando;
    };
  }, [left]);

  useEffect(() => {
    if (left === null) return;
    if (left === 0) {
      send();
      return;
    }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left, send]);

  if (waitingNetwork)
    return (
      <p role="status" className="enter rounded-lg bg-warn-soft px-3 py-3 text-[15px] text-warn-fg">
        Sem internet. A entrega está guardada neste celular e será confirmada sozinha quando a conexão voltar.
      </p>
    );

  if (left !== null && left > 0)
    return (
      // a chave diferente faz o React trocar o bloco (e o .enter tocar de novo), em vez de reaproveitar o do botão
      // sem região viva: o leitor de tela lia o número a cada segundo; o foco vai direto para o Desfazer e ouve uma vez só
      <div key="desfazer" className="enter">
        <div className="flex items-center gap-3">
          <p className="num flex-1 text-[15px]" aria-hidden="true">
            {/* o número desce rolando, como os outros números do sistema */}
            Confirmando em <LiveNumber value={left} />s…
          </p>
          <span id={`confirmando-${orderId}`} className="sr-only">Confirmando a entrega em {WAIT} segundos.</span>
          <button
            type="button"
            autoFocus
            aria-describedby={`confirmando-${orderId}`}
            className="btn h-12 px-5 text-[15px]"
            onClick={() => {
              setDesfez(true);
              setLeft(null);
            }}
          >
            Desfazer
          </button>
        </div>
        {/* o tempo que resta para desfazer, encolhendo */}
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-subtle" aria-hidden="true">
          <div className="undo-bar h-full rounded-full bg-fg" style={{ animationDuration: `${WAIT}s` }} />
        </div>
      </div>
    );

  // volta do "Desfazer" (ou do erro): o botão chega de novo com movimento, não reaparece seco
  return (
    <div key="botao" className="enter">
      <button
        type="button"
        autoFocus={desfez}
        disabled={pending || left === 0}
        onClick={() => {
          setError(undefined);
          setDesfez(false);
          buzz(10);
          setLeft(WAIT);
        }}
        className="btn btn-primary deliver-btn h-12 w-full text-[15px]"
      >
        {pending || left === 0 ? <TextoQueTroca texto="Confirmando…" brilho /> : label}
      </button>
      {error && (
        <p role="alert" className="erro-form mt-2 rounded-lg bg-danger-soft px-3 py-2 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
