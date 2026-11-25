"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { RotateCcw, SendHorizontal } from "lucide-react";
import { chamarAcao } from "@/components/action-form";
import { perguntarAssistenteAction } from "@/app/actions";

type Turno = { chave: number; pergunta: string; resposta?: string; analise?: boolean };

const SUGESTOES = [
  "Quanto vendi hoje?",
  "Quanto vendi essa semana comparado com a anterior?",
  "Vou ficar sem gás essa semana?",
  "Quem está me devendo fiado?",
  "Quais clientes pararam de comprar?",
  "Quanto tenho de contas a pagar?",
];

/**
 * Conversa do dono com o assistente. As respostas anteriores vão junto em cada pergunta (o servidor corta para as
 * últimas, e curtas), então "e ontem?" entende do que se fala sem o histórico crescer sem fim.
 */
export function Conversa({ restamNoComeco }: { restamNoComeco: number }) {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [restam, setRestam] = useState(restamNoComeco);
  const [limpando, setLimpando] = useState(false);
  const [pendente, start] = useTransition();
  const area = useRef<HTMLDivElement>(null);
  const chave = useRef(0);

  useEffect(() => {
    area.current?.scrollTo({ top: area.current.scrollHeight, behavior: "smooth" });
  }, [turnos.length, pendente]);

  function perguntar(pergunta: string) {
    if (pendente || !restam) return;
    setErro("");
    const historico = turnos.filter((t) => t.resposta).map((t) => ({ pergunta: t.pergunta, resposta: t.resposta }));
    const id = chave.current++;
    setTurnos((ts) => [...ts, { chave: id, pergunta }]);
    start(async () => {
      const c = await chamarAcao(() => perguntarAssistenteAction(pergunta, historico));
      const falha = c.erro ?? c.r?.erro;
      if (falha) {
        // a pergunta sem resposta sai da conversa e volta para o campo: dá para mandar de novo sem redigitar
        setTurnos((ts) => ts.filter((t) => t.chave !== id));
        setTexto(pergunta);
        return setErro(falha);
      }
      const r = c.r!;
      setRestam(r.restam ?? 0);
      setTurnos((ts) => ts.map((t) => (t.chave === id ? { ...t, resposta: r.resposta, analise: r.analise } : t)));
    });
  }

  function recomecar() {
    setErro("");
    setLimpando(true);
    setTimeout(() => {
      setTurnos([]);
      setLimpando(false);
    }, 180);
  }

  return (
    <section className="panel flex flex-col overflow-hidden">
      <div ref={area} className="robo-conversa" data-limpando={limpando || undefined} role="log" aria-live="polite">
        {!turnos.length && !limpando && (
          <div className="m-auto flex w-full max-w-md flex-col gap-2">
            <p className="mb-1 text-center text-[13px] text-muted">Experimente perguntar</p>
            {SUGESTOES.map((s) => (
              <button
                key={s}
                type="button"
                className="btn justify-start text-left"
                aria-disabled={pendente || !restam}
                onClick={() => {
                  // o botão some com a lista: o foco vai para o campo (no celular não, que abriria o teclado)
                  if (matchMedia("(pointer: fine)").matches) document.getElementById("assistente-texto")?.focus();
                  perguntar(s);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {turnos.map((t) => (
          <div key={t.chave} className="contents">
            <p className="robo-balao robo-balao-cliente">
              <span className="sr-only">Você: </span>
              {t.pergunta}
            </p>
            {t.resposta && (
              <div className="robo-mensagem">
                <p className="robo-balao whitespace-pre-line">
                  <span className="sr-only">Assistente: </span>
                  {t.resposta}
                </p>
                {t.analise && <p className="text-[12px] text-muted">Respondida com a análise detalhada</p>}
              </div>
            )}
          </div>
        ))}
        {pendente && !limpando && <p aria-hidden="true" className="robo-aviso robo-digitando">Consultando os números…</p>}
      </div>

      {erro && (
        <p className="border-t border-line px-4 py-2 text-sm text-danger" role="alert">
          {erro}
        </p>
      )}
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          const t = texto.trim();
          if (!t) return;
          setTexto("");
          perguntar(t);
        }}
      >
        <label htmlFor="assistente-texto" className="sr-only">Sua pergunta</label>
        <input
          id="assistente-texto"
          className="input min-w-0 flex-1"
          placeholder={restam ? "Pergunte sobre o seu negócio" : "Acabaram as perguntas de hoje"}
          maxLength={400}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          disabled={!restam}
          autoComplete="off"
        />
        <button className="btn btn-primary max-sm:min-w-11" disabled={!texto.trim() || !restam} aria-disabled={pendente} data-state={pendente && texto.trim() ? "loading" : undefined}>
          <SendHorizontal size={16} aria-hidden="true" /> <span className="max-sm:sr-only">Perguntar</span>
        </button>
      </form>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 text-[12px] text-muted">
        <span className="num">
          {restam === 1 ? "Resta 1 pergunta hoje" : `Restam ${restam} perguntas hoje`}
        </span>
        <button type="button" className="btn btn-sm" onClick={recomecar} disabled={!turnos.length || limpando || pendente}>
          <RotateCcw size={14} aria-hidden="true" /> Nova conversa
        </button>
      </div>
    </section>
  );
}
