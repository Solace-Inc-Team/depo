"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChartColumn, CornerDownRight, HandCoins, Package, Receipt, RotateCcw, SendHorizontal, Users, type LucideIcon } from "lucide-react";
import { chamarAcao } from "@/components/action-form";
import { useSaida } from "@/components/saida";
import LightRays from "@/components/light-rays";
import { perguntarAssistenteAction } from "@/app/actions";

type Turno = { chave: number; pergunta: string; resposta?: string; destaque?: string; fontes?: string[]; seguintes?: string[]; analise?: boolean };

const SUGESTOES: { icone: LucideIcon; texto: string }[] = [
  { icone: ChartColumn, texto: "Quanto vendi essa semana?" },
  { icone: Package, texto: "Vou ficar sem gás essa semana?" },
  { icone: HandCoins, texto: "Quem está me devendo fiado?" },
  { icone: Receipt, texto: "Quanto tenho de contas a pagar?" },
  { icone: Users, texto: "Quais clientes pararam de comprar?" },
  { icone: ChartColumn, texto: "Qual o horário de mais pedidos?" },
];

// o que a espera diz, pelo assunto da pergunta: um palpite para a pessoa ver que algo acontece, não a consulta exata
function etapa(p: string) {
  if (/estoque|g[aá]s|botij|gal[aã]o|ficar sem|acabar/i.test(p)) return "Olhando o estoque";
  if (/fiado|devendo|deve/i.test(p)) return "Conferindo o fiado";
  if (/conta|pagar|boleto|venc/i.test(p)) return "Olhando as contas a pagar";
  if (/sumi|parou|pararam|cliente/i.test(p)) return "Procurando os clientes";
  if (/hor[aá]rio|pico|hora/i.test(p)) return "Vendo os horários";
  if (/pedido|rota|atras|fila|agora/i.test(p)) return "Vendo os pedidos de agora";
  return "Somando as vendas";
}

function Esperando({ pergunta }: { pergunta: string }) {
  const [fase, setFase] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setFase(1), 2500);
    const b = setTimeout(() => setFase(2), 7000);
    return () => (clearTimeout(a), clearTimeout(b));
  }, []);
  const frase = [etapa(pergunta), "Juntando os números", "Quase lá"][fase];
  return (
    <div className="assistente-msg" data-esperando="" aria-hidden="true">
      <span className="assistente-ponto" data-estado="pensando" />
      <span key={fase} className="texto-brilho text-[13px] animate-[fade-in_200ms_ease-out_both]">{frase}…</span>
    </div>
  );
}

// A conversa mora fora do componente: trocar de tela desmonta a tela, mas o módulo continua carregado. Assim ela volta
// inteira ao abrir o Assistente de novo, e a resposta que chega com a pessoa em outra tela entra nela do mesmo jeito.
// Recarregar a página ou sair começa do zero. O dono é a chave: outro usuário no mesmo navegador não vê a conversa.
type Estado = { dono: string; turnos: Turno[]; pendente: boolean; erro: string };
const VAZIO: Estado = { dono: "", turnos: [], pendente: false, erro: "" };
let conversa = VAZIO;
let proximaChave = 0;
const ouvintes = new Set<() => void>();
const assinarConversa = (f: () => void) => (ouvintes.add(f), () => void ouvintes.delete(f));
function mudar(dono: string, f: (e: Estado) => Partial<Estado>) {
  const atual = conversa.dono === dono ? conversa : { ...VAZIO, dono };
  conversa = { ...atual, ...f(atual) };
  ouvintes.forEach((o) => o());
}

// o tema mora no data-tema do <html> e pode trocar com a tela aberta
const assinarTema = (avisar: () => void) => {
  const o = new MutationObserver(avisar);
  o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => o.disconnect();
};

/** A luz que segue o ponteiro no cartão de sugestão. */
const luzNoPonteiro = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

/**
 * Conversa do dono com o assistente. As respostas anteriores vão junto em cada pergunta (o servidor corta para as
 * últimas, e curtas), então "e ontem?" entende do que se fala sem o histórico crescer sem fim.
 */
export function Conversa({ dono, restamNoComeco, saudacao }: { dono: string; restamNoComeco: number; saudacao: string }) {
  const estado = useSyncExternalStore(assinarConversa, () => conversa, () => VAZIO);
  const { turnos, pendente, erro } = estado.dono === dono ? estado : VAZIO;
  const [texto, setTexto] = useState("");
  const [restam, setRestam] = useState(restamNoComeco);
  const [limpando, setLimpando] = useState(false);
  // os feixes de luz só no tema escuro: no claro eles somem no fundo branco e fica a luz parada do topo
  const escuro = useSyncExternalStore(assinarTema, () => document.documentElement.dataset.tema === "escuro", () => false);
  const area = useRef<HTMLDivElement>(null);
  const entrada = useSaida(!turnos.length && !limpando, 180);

  useEffect(() => {
    area.current?.scrollTo({ top: area.current.scrollHeight, behavior: "smooth" });
  }, [turnos, pendente]);

  function perguntar(pergunta: string) {
    if (pendente || !restam) return;
    const historico = turnos.filter((t) => t.resposta).map((t) => ({ pergunta: t.pergunta, resposta: t.resposta }));
    const id = proximaChave++;
    mudar(dono, (e) => ({ turnos: [...e.turnos, { chave: id, pergunta }], pendente: true, erro: "" }));
    void chamarAcao(() => perguntarAssistenteAction(pergunta, historico)).then((c) => {
      const falha = c.erro ?? c.r?.erro;
      if (falha) {
        // a pergunta sem resposta sai da conversa e volta para o campo: dá para mandar de novo sem redigitar
        mudar(dono, (e) => ({ turnos: e.turnos.filter((t) => t.chave !== id), pendente: false, erro: falha }));
        return setTexto(pergunta);
      }
      const r = c.r!;
      setRestam(r.restam ?? 0);
      mudar(dono, (e) => ({ turnos: e.turnos.map((t) => (t.chave === id ? { ...t, ...r, chave: id, pergunta } : t)), pendente: false }));
    });
  }

  function recomecar() {
    mudar(dono, () => ({ erro: "" }));
    setLimpando(true);
    setTimeout(() => {
      mudar(dono, () => ({ turnos: [] }));
      setLimpando(false);
    }, 180);
  }

  const ultimo = turnos.at(-1);
  return (
    <section className="panel flex flex-col overflow-hidden">
      <div ref={area} className="assistente-conversa" data-limpando={limpando || undefined} role="log" aria-live="polite">
        {entrada.montado && (
          <div className="assistente-entrada" data-saindo={entrada.saindo || undefined}>
            <div aria-hidden="true" className="topo-luz absolute inset-0 -z-10" style={{ "--luz-forca": "26%" } as React.CSSProperties} />
            {escuro && (
              <div aria-hidden="true" className="absolute inset-0 -z-10">
                <LightRays raysColor="#cfdcff" intensity={1.1} opacity={1} rayLength={1.6} followMouse={false} cursorShadow={false} clickPulse={false} />
              </div>
            )}
            <span aria-hidden="true" className="assistente-ponto" />
            <div className="text-center">
              <h2 className="assistente-saudacao text-xl font-semibold tracking-tight">
                {saudacao.split(" ").map((p, i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}>
                    {p}
                    {" "}
                  </span>
                ))}
              </h2>
              <p className="mt-1 text-[13px] text-muted">Pergunte sobre vendas, estoque, contas e clientes. Os números vêm do próprio sistema.</p>
            </div>
            <div className="assistente-sugestoes">
              {SUGESTOES.map(({ icone: Icone, texto: s }, i) => (
                <button
                  key={s}
                  type="button"
                  className="assistente-sugestao"
                  style={{ "--i": i } as React.CSSProperties}
                  aria-disabled={pendente || !restam}
                  onPointerMove={luzNoPonteiro}
                  onClick={() => {
                    // o cartão some com a entrada: o foco vai para o campo (no celular não, que abriria o teclado)
                    if (matchMedia("(pointer: fine)").matches) document.getElementById("assistente-texto")?.focus();
                    perguntar(s);
                  }}
                >
                  <Icone size={16} strokeWidth={1.75} aria-hidden="true" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {turnos.map((t) => (
          <div key={t.chave} className="contents">
            <p className="robo-balao robo-balao-cliente">
              <span className="sr-only">Você: </span>
              {t.pergunta}
            </p>
            {t.resposta && (
              <div className="assistente-msg" data-destaque={t.destaque ? "" : undefined}>
                <span aria-hidden="true" className="assistente-ponto" />
                <div className="min-w-0">
                  <div className="robo-balao max-w-none">
                    <span className="sr-only">Assistente: </span>
                    {t.destaque && <span className="assistente-destaque">{t.destaque}</span>}
                    {t.resposta}
                  </div>
                  {(t.fontes?.length || t.analise) && (
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
                      {!!t.fontes?.length && <span>Dados de {t.fontes.join(", ")}</span>}
                      {t.analise && <span className="font-medium text-accent">Análise detalhada</span>}
                    </p>
                  )}
                  {/* próximas perguntas só na última resposta: nas antigas, a conversa já seguiu */}
                  {t === ultimo && !pendente && !!t.seguintes?.length && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {t.seguintes.map((s) => (
                        <button key={s} type="button" className="btn btn-sm" aria-disabled={!restam} onClick={() => perguntar(s)}>
                          <CornerDownRight size={14} aria-hidden="true" /> {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {pendente && !limpando && ultimo && <Esperando pergunta={ultimo.pergunta} />}
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
        <span className="num">{restam === 1 ? "Resta 1 pergunta hoje" : `Restam ${restam} perguntas hoje`}</span>
        <button type="button" className="btn btn-sm" onClick={recomecar} disabled={!turnos.length || limpando || pendente}>
          <RotateCcw size={14} aria-hidden="true" /> Nova conversa
        </button>
      </div>
    </section>
  );
}
