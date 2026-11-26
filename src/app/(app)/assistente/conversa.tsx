"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CornerDownRight, RotateCcw, SendHorizontal } from "lucide-react";
import type { Sugestao } from "@/lib/assistente";
import { SemanaBarras } from "@/components/semana-barras";
import { chamarAcao } from "@/components/action-form";
import { Aparece, useSaida } from "@/components/saida";
import { perguntarAssistenteAction } from "@/app/actions";

type Turno = {
  chave: number;
  pergunta: string;
  resposta?: string;
  destaque?: string;
  fontes?: string[];
  seguintes?: string[];
  analise?: boolean;
  /** vendas por dia, quando a pergunta foi de alguns dias: viram as barras do Painel dentro da resposta */
  dias?: { day: string; cents: number }[];
};

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

// De onde vem o que acabou de aparecer: a pergunta sai do campo (ou do cartão, ou do botão) e voa até o balão; na
// primeira, o ponto aceso da entrada desce até o lugar do ponto da espera. Sem isso, a entrada sumia e a conversa
// aparecia no lugar, num corte seco. Lido e apagado por quem chega (uma vez só), nada anima ao voltar para a tela.
const semMovimento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const CURVA_VOO = "cubic-bezier(0.45, 0, 0.1, 1)";

/** Leva o elemento do retângulo de origem até onde ele está, centro com centro. */
function voar(el: HTMLElement | null, de: DOMRect | undefined, quadros: (dx: number, dy: number) => Keyframe[], ms: number) {
  if (!el || !de || semMovimento()) return;
  const r = el.getBoundingClientRect();
  const dx = de.left + de.width / 2 - (r.left + r.width / 2);
  const dy = de.top + de.height / 2 - (r.top + r.height / 2);
  el.animate(quadros(dx, dy), { duration: ms, easing: CURVA_VOO, fill: "backwards" });
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
// O dono é a chave: outro usuário no mesmo navegador não vê a conversa.
type Estado = { dono: string; turnos: Turno[]; pendente: boolean; erro: string };
const VAZIO: Estado = { dono: "", turnos: [], pendente: false, erro: "" };
let conversa = VAZIO;
let proximaChave = 0;
const ouvintes = new Set<() => void>();
const assinarConversa = (f: () => void) => (ouvintes.add(f), () => void ouvintes.delete(f));
function mudar(dono: string, f: (e: Estado) => Partial<Estado>) {
  const atual = conversa.dono === dono ? conversa : { ...VAZIO, dono };
  conversa = { ...atual, ...f(atual) };
  guardar();
  ouvintes.forEach((o) => o());
}

// Recarregar a página também não perde a conversa: ela fica guardada na aba (sessionStorage), que some ao fechar a
// aba. Só as perguntas já respondidas: uma que estava esperando resposta não volta pela metade.
const GUARDADA = "depo-conversa";
function guardar() {
  try {
    sessionStorage.setItem(GUARDADA, JSON.stringify({ dono: conversa.dono, turnos: conversa.turnos.filter((t) => t.resposta) }));
  } catch {}
}
let lida = false;
function lerGuardada() {
  if (lida) return conversa;
  lida = true;
  try {
    const g = JSON.parse(sessionStorage.getItem(GUARDADA) ?? "null");
    const turnos: Turno[] = Array.isArray(g?.turnos) ? g.turnos.filter((t: Turno) => typeof t?.pergunta === "string" && typeof t?.resposta === "string") : [];
    if (typeof g?.dono === "string" && turnos.length && !conversa.turnos.length) {
      conversa = { ...VAZIO, dono: g.dono, turnos };
      proximaChave = Math.max(0, ...turnos.map((t) => (Number.isInteger(t.chave) ? t.chave + 1 : 0)));
    }
  } catch {}
  return conversa;
}

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
export function Conversa({
  dono,
  restamNoComeco,
  saudacao,
  sugestoes,
  perguntaInicial,
}: {
  dono: string;
  restamNoComeco: number;
  saudacao: string;
  sugestoes: Sugestao[];
  /** veio do Painel (?q=): pergunta sozinha ao abrir, uma vez */
  perguntaInicial?: string;
}) {
  const router = useRouter();
  const jaPerguntou = useRef(false);
  const estado = useSyncExternalStore(assinarConversa, lerGuardada, () => VAZIO);
  const { turnos, pendente, erro } = estado.dono === dono ? estado : VAZIO;
  const [texto, setTexto] = useState("");
  const [restam, setRestam] = useState(restamNoComeco);
  const [limpando, setLimpando] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  const painel = useRef<HTMLElement>(null);
  const voo = useRef<{ pergunta?: DOMRect; ponto?: DOMRect }>({});
  const entrada = useSaida(!turnos.length && !limpando, 320);

  // o quadro vai do lugar onde começa até o pé da tela (acima da barra de baixo, no celular): a caixa de pergunta
  // fica sempre à vista e só a conversa rola. Remede quando a tela, o teclado ou o aviso do topo mudam a conta
  useLayoutEffect(() => {
    const el = painel.current;
    if (!el) return;
    const medir = () => {
      const nav = document.querySelector<HTMLElement>(".nav-inferior");
      const baixo = nav && getComputedStyle(nav).display !== "none" ? nav.offsetHeight : 0;
      const tela = window.visualViewport?.height ?? window.innerHeight;
      const topo = el.getBoundingClientRect().top + window.scrollY;
      el.style.setProperty("--altura-painel", `${Math.max(320, Math.floor(tela - topo - baixo - 16))}px`);
      el.dataset.medido = "";
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(document.documentElement);
    window.visualViewport?.addEventListener("resize", medir);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", medir);
      window.removeEventListener("resize", medir);
    };
  }, []);

  // a pergunta nova voa de onde saiu até o balão; na primeira, o ponto aceso da entrada desce até a espera
  useLayoutEffect(() => {
    const { pergunta: de, ponto: dePonto } = voo.current;
    voo.current = {};
    const caixa = area.current;
    if (!caixa || (!de && !dePonto)) return;
    const balao = [...caixa.querySelectorAll<HTMLElement>(".robo-balao-cliente")].at(-1);
    if (de && balao) balao.dataset.voando = "";
    voar(balao ?? null, de, (dx, dy) => [{ translate: `${dx}px ${dy}px`, opacity: 0.3, scale: 0.96 }, { translate: "0 0", opacity: 1, scale: 1 }], 460);
    const ponto = caixa.querySelector<HTMLElement>("[data-esperando] > .assistente-ponto");
    const frase = caixa.querySelector<HTMLElement>("[data-esperando] > .texto-brilho");
    // a frase só aparece quando o ponto pousa (o brilho dela já ocupa a animação do CSS, por isso aqui)
    if (dePonto && frase && !semMovimento()) frase.animate([{ opacity: 0 }, { opacity: 0, offset: 0.65 }, { opacity: 1 }], { duration: 640, easing: "ease-out" });
    voar(ponto, dePonto, (dx, dy) => [{ translate: `${dx}px ${dy}px`, scale: 1.5 }, { translate: "0 0", scale: 1 }], 620);
  }, [turnos.length]);

  useEffect(() => {
    area.current?.scrollTo({ top: area.current.scrollHeight, behavior: "smooth" });
  }, [turnos, pendente]);

  function perguntar(pergunta: string, de?: Element | null) {
    if (pendente || !restam) return;
    voo.current.pergunta = de?.getBoundingClientRect();
    voo.current.ponto = turnos.length ? undefined : document.querySelector(".assistente-fonte > .assistente-ponto")?.getBoundingClientRect();
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

  // pergunta que veio do Painel: some do endereço (recarregar não pergunta de novo) e vai como se fosse digitada
  useEffect(() => {
    if (!perguntaInicial || jaPerguntou.current) return;
    jaPerguntou.current = true;
    router.replace("/assistente", { scroll: false });
    perguntar(perguntaInicial.slice(0, 400), document.getElementById("assistente-texto"));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uma vez, ao abrir
  }, []);

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
    <section ref={painel} className="assistente-painel panel flex flex-col overflow-hidden">
      <div ref={area} className="assistente-conversa" data-limpando={limpando || undefined} role="log" aria-live="polite">
        {entrada.montado && (
          <div className="assistente-entrada" data-saindo={entrada.saindo || undefined}>
            {/* a luz da tela nasce do ponto, parada: só o ponto da espera pulsa, enquanto o assistente consulta */}
            <span aria-hidden="true" className="assistente-fonte">
              <span className="assistente-ponto" />
            </span>
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
              {sugestoes.map(({ fato, pergunta: s }, i) => (
                <button
                  key={s}
                  type="button"
                  className="assistente-sugestao"
                  style={{ "--i": i } as React.CSSProperties}
                  aria-disabled={pendente || !restam}
                  onPointerMove={luzNoPonteiro}
                  onClick={(e) => {
                    // o cartão some com a entrada: o foco vai para o campo (no celular não, que abriria o teclado)
                    if (matchMedia("(pointer: fine)").matches) document.getElementById("assistente-texto")?.focus();
                    perguntar(s, e.currentTarget);
                  }}
                >
                  <CornerDownRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span className="min-w-0">
                    {fato && <span className="block text-[12px] text-muted">{fato}</span>}
                    {s}
                  </span>
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
                    {!!t.dias?.length && <SemanaBarras semana={t.dias} />}
                  </div>
                  {(t.fontes?.length || t.analise) && (
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
                      {!!t.fontes?.length && <span>Dados {t.fontes.join(" e ")}</span>}
                      {t.analise && <span className="font-medium text-accent">Análise detalhada</span>}
                    </p>
                  )}
                  {/* próximas perguntas só na última resposta: nas antigas, a conversa já seguiu */}
                  {t === ultimo && !pendente && !!t.seguintes?.length && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {t.seguintes.map((s) => (
                        <button key={s} type="button" className="btn btn-sm" aria-disabled={!restam} onClick={(e) => perguntar(s, e.currentTarget)}>
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
        className="assistente-faixa flex gap-2 border-t border-line py-3"
        onSubmit={(e) => {
          e.preventDefault();
          const t = texto.trim();
          if (!t) return;
          setTexto("");
          perguntar(t, document.getElementById("assistente-texto"));
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
      {/* o rodapé só quando ajuda: o contador perto do fim do dia, e "Nova conversa" quando há conversa */}
      <Aparece quando={restam <= 10 || turnos.length > 0}>
        <div className="assistente-faixa flex min-h-12 items-center justify-between gap-3 border-t border-line py-2 text-[12px] text-muted">
          <span className="num">{restam > 10 ? "" : restam === 1 ? "Resta 1 pergunta hoje" : `Restam ${restam} perguntas hoje`}</span>
          <button type="button" className="btn btn-sm" onClick={recomecar} disabled={!turnos.length || limpando || pendente}>
            <RotateCcw size={14} aria-hidden="true" /> Nova conversa
          </button>
        </div>
      </Aparece>
    </section>
  );
}
