"use client";

import { chamarAcao } from "@/components/action-form";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown, RotateCcw, SendHorizontal, Store } from "lucide-react";
import { conversarTesteAction, recomecarConversaAction } from "@/app/actions";
import type { Saida } from "@/lib/robo";

type Msg = { chave: number } & ({ de: "cliente"; texto: string } | { de: "robo"; saida: Saida } | { de: "aviso"; texto: string });
type Cliente = { id: string; nome: string; telefone: string };

// número que não é de ninguém, para ver o que o cliente sem cadastro recebe
const SEM_CADASTRO = "(99) 99999-0000";

/** Texto do robô com o link clicável, como no WhatsApp. */
function ComLinks({ texto }: { texto: string }) {
  return texto.split(/(https?:\/\/\S+)/).map((parte, i) =>
    /^https?:\/\//.test(parte) ? (
      <a key={i} href={parte} target="_blank" rel="noreferrer" className="break-all text-accent underline underline-offset-2">
        {parte}
      </a>
    ) : (
      parte
    ),
  );
}

/**
 * Conversa de teste com o robô do WhatsApp: o dono escreve e toca nos botões como se fosse o cliente.
 * As respostas vêm do mesmo robô que vai atender o número da loja; no WhatsApp a lista abre por cima da conversa,
 * aqui ela abre embaixo da mensagem.
 */
export function Simulador({ clientes, loja }: { clientes: Cliente[]; loja: string }) {
  const [telefone, setTelefone] = useState(clientes[0]?.telefone ?? SEM_CADASTRO);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [limpando, setLimpando] = useState(false);
  const [pendente, start] = useTransition();
  const area = useRef<HTMLDivElement>(null);
  const chave = useRef(0);

  // a conversa desce sozinha a cada mensagem, como no celular
  useEffect(() => {
    area.current?.scrollTo({ top: area.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length, pendente]);

  function enviar(entrada: { texto?: string; id?: string }, mostrado: string) {
    // as opções ficam aria-disabled (não disabled) durante a resposta: desabilitadas, tiravam o foco para o <body>
    if (pendente) return;
    setErro("");
    setMsgs((m) => [...m, { de: "cliente", texto: mostrado, chave: chave.current++ }]);
    start(async () => {
      const c = await chamarAcao(() => conversarTesteAction(telefone, entrada));
      if (c.erro) return setErro(c.erro);
      const r = c.r!;
      if (r.erro) return setErro(r.erro);
      const novas: Msg[] = r.saidas!.length
        ? r.saidas!.map((s) => ({ de: "robo", saida: s, chave: chave.current++ }))
        : [{ de: "aviso", texto: "O robô não respondeu: a conversa está com a loja. Toque em Recomeçar para testar de novo.", chave: chave.current++ }];
      setMsgs((m) => [...m, ...novas]);
    });
  }

  // a conversa some esmaecendo antes de recomeçar, em vez de sumir seca
  function recomecar(novo = telefone) {
    setErro("");
    setLimpando(true);
    start(async () => {
      const c = await chamarAcao(() => recomecarConversaAction(novo));
      if (c.erro) setErro(c.erro);
    });
    setTimeout(() => {
      setMsgs([]);
      setLimpando(false);
    }, 180);
  }

  return (
    <section className="panel flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-end gap-3 border-b border-line p-4">
        <div className="min-w-0 flex-1">
          <label htmlFor="robo-cliente" className="label">Conversar como</label>
          <select
            id="robo-cliente"
            className="input"
            value={telefone}
            // com o robô respondendo, trocar de cliente misturaria a resposta antiga na conversa nova
            disabled={pendente}
            onChange={(e) => {
              setTelefone(e.target.value);
              recomecar(e.target.value);
            }}
          >
            {clientes.map((c) => (
              <option key={c.id} value={c.telefone}>
                {c.nome}, {c.telefone}
              </option>
            ))}
            <option value={SEM_CADASTRO}>Número sem cadastro</option>
          </select>
        </div>
        {/* no celular só o ícone: o nome do cliente com o telefone cabe numa linha */}
        <button type="button" className="btn max-sm:min-w-11" onClick={() => recomecar()} disabled={!msgs.length || limpando || pendente} title="Recomeçar">
          <RotateCcw size={16} aria-hidden="true" /> <span className="max-sm:sr-only">Recomeçar</span>
        </button>
      </div>

      <div ref={area} className="robo-conversa" data-limpando={limpando || undefined} role="log" aria-live="polite">
        {!msgs.length && !limpando && (
          <div className="m-auto">
            <button type="button" className="btn" onClick={() => {
                // o botão some com a conversa: o foco iria para o <body>. Vai para o campo (no celular não, que
                // abriria o teclado por cima da resposta)
                if (matchMedia("(pointer: fine)").matches) document.getElementById("robo-texto")?.focus();
                enviar({ texto: "Oi" }, "Oi");
              }}
              aria-disabled={pendente}
            >
              <SendHorizontal size={16} aria-hidden="true" /> Mandar &ldquo;Oi&rdquo;
            </button>
          </div>
        )}
        {msgs.map((m) =>
          m.de === "cliente" ? (
            <p key={m.chave} className="robo-balao robo-balao-cliente">
              {/* só a cor e o lado diziam quem falou */}
              <span className="sr-only">Você: </span>
              {m.texto}
            </p>
          ) : m.de === "aviso" ? (
            <p key={m.chave} className="robo-aviso">{m.texto}</p>
          ) : (
            <div key={m.chave} className="robo-mensagem">
              <p className="robo-balao">
                <span className="sr-only">{loja}: </span>
                <ComLinks texto={m.saida.texto} />
              </p>
              {m.saida.tipo === "botoes" && (
                <div className="robo-opcoes">
                  {m.saida.botoes.map((b) => (
                    <button key={b.id} type="button" className="btn" aria-disabled={pendente} onClick={() => enviar({ id: b.id }, b.titulo)}>
                      {b.id === "loja" && <Store size={16} aria-hidden="true" />}
                      {b.titulo}
                    </button>
                  ))}
                </div>
              )}
              {m.saida.tipo === "lista" && (
                <details
                  className="robo-lista"
                  // a lista abre embaixo: a conversa desce junto para mostrar os produtos
                  onToggle={(e) => {
                    if (e.currentTarget.open) setTimeout(() => area.current?.scrollTo({ top: area.current.scrollHeight, behavior: "smooth" }), 220);
                  }}
                >
                  <summary className="btn">
                    {m.saida.botao} <ChevronDown size={16} aria-hidden="true" className="robo-lista-seta" />
                  </summary>
                  <div className="robo-opcoes">
                    {m.saida.itens.map((i) => (
                      <button key={i.id} type="button" className="btn robo-item" aria-disabled={pendente} onClick={() => enviar({ id: i.id }, i.titulo)}>
                        <span>{i.titulo}</span>
                        {i.descricao && <span className="num text-muted">{i.descricao}</span>}
                      </button>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ),
        )}
        {pendente && !limpando && msgs.length > 0 && <p aria-hidden="true" className="robo-aviso robo-digitando">{loja} está digitando…</p>}
      </div>

      {erro && <p className="border-t border-line px-4 py-2 text-sm text-danger" role="alert">{erro}</p>}
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          const t = texto.trim();
          if (!t) return;
          setTexto("");
          enviar({ texto: t }, t);
        }}
      >
        <label htmlFor="robo-texto" className="sr-only">Mensagem do cliente</label>
        <input id="robo-texto" className="input min-w-0 flex-1" placeholder="Escreva como o cliente" maxLength={500} value={texto} onChange={(e) => setTexto(e.target.value)} autoComplete="off" />
        {/* esperando o robô (ou o recomeçar): o botão gira, em vez de parecer que o Enter não fez nada */}
        <button className="btn btn-primary max-sm:min-w-11" disabled={!texto.trim()} aria-disabled={pendente} data-state={pendente && texto.trim() ? "loading" : undefined}>
          <SendHorizontal size={16} aria-hidden="true" /> <span className="max-sm:sr-only">Enviar</span>
        </button>
      </form>
    </section>
  );
}
