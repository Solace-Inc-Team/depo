"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Info, Link2, Smartphone } from "lucide-react";
import { chamarAcao } from "@/components/action-form";
import { confirmar } from "@/components/confirm-dialog";
import { Aparece } from "@/components/saida";
import { conectarWhatsappAction, conexaoWhatsappAction, desconectarWhatsappAction } from "@/app/actions";
import type { ConexaoWhatsapp } from "@/domain/whatsapp-conexao";

// Configurações > WhatsApp: o dono liga o número da loja ao robô lendo um QR code, sem depender da Solace.
// Enquanto o QR está na tela, confere a cada 3 s se já conectou e troca o QR antes de ele vencer. A seção vive
// montada no menu de toda tela: só confere com ela à vista e com a aba do navegador aberta.
const CONFERE_MS = 3000;
const NOVO_QR_MS = 30_000;

export function ConexaoWhatsappPainel() {
  const [conexao, setConexao] = useState<ConexaoWhatsapp | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciar] = useTransition();
  const ultimoQr = useRef(0);
  // o último QR fica para a saída animada do painel (o estado já mudou quando ele recolhe)
  const [qrNaTela, setQrNaTela] = useState<string | null>(null);
  if (conexao?.estado === "conectando" && conexao.qr && conexao.qr !== qrNaTela) setQrNaTela(conexao.qr);
  const raiz = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  type Resultado = Awaited<ReturnType<typeof chamarAcao<{ conexao?: ConexaoWhatsapp; error?: string }>>>;
  function aplicar(c: Resultado) {
    if (c.erro || c.r?.error) return setErro(c.erro ?? c.r!.error!);
    setErro(null);
    // conferência sem QR novo não apaga o QR que está na tela
    setConexao((antes) => (c.r!.conexao!.estado === "conectando" && !c.r!.conexao!.qr && antes?.estado === "conectando" ? antes : c.r!.conexao!));
  }
  const atualizar = async (fn: () => Promise<{ conexao?: ConexaoWhatsapp; error?: string }>) => aplicar(await chamarAcao(fn));

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // a primeira conferência só quando a seção aparece, não a cada tela que o dono abre
  const conferido = useRef(false);
  const conferir = () => {
    conferido.current = true;
    chamarAcao(() => conexaoWhatsappAction(false)).then(aplicar);
  };
  useEffect(() => {
    if (visivel && !conferido.current) conferir();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- conferir só usa refs e o setState; muda a cada render
  }, [visivel]);

  const conectando = conexao?.estado === "conectando";
  useEffect(() => {
    if (!conectando || !visivel) return;
    // uma conferência de cada vez: com a Evolution lenta, elas não se acumulam na frente das outras ações
    let parar = false;
    let t: ReturnType<typeof setTimeout>;
    const rodada = async () => {
      if (document.visibilityState === "visible") {
        const qr = Date.now() - ultimoQr.current > NOVO_QR_MS;
        if (qr) ultimoQr.current = Date.now();
        await atualizar(() => conexaoWhatsappAction(qr));
      }
      if (!parar) t = setTimeout(rodada, CONFERE_MS);
    };
    t = setTimeout(rodada, CONFERE_MS);
    return () => {
      parar = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- atualizar só chama a ação e o setState
  }, [conectando, visivel]);

  // aria-disabled e não disabled: o botão desabilitado perde o foco, que caía no <body> da janela (teclado e leitor de tela)
  const conectar = () =>
    !pendente &&
    iniciar(async () => {
      ultimoQr.current = Date.now();
      await atualizar(conectarWhatsappAction);
    });
  // a pergunta vem antes da transição: dentro dela o React seguraria a janela de confirmação até a transição acabar
  const desconectar = async (pergunta: string, rotulo: string) => {
    if (pendente || !(await confirmar(pergunta, { rotulo, perigo: true }))) return;
    iniciar(() => atualizar(desconectarWhatsappAction));
  };

  let descricao: React.ReactNode = "Conferindo…";
  let controle: React.ReactNode = null;
  if (!conexao && erro) {
    // a primeira conferência falhou: sem isso a linha ficava sem botão nenhum
    controle = (
      <button type="button" onClick={conferir} className="btn btn-sm tap">
        Tentar de novo
      </button>
    );
  } else if (conexao?.estado === "sem") {
    descricao = "Ainda não conectado.";
    controle = (
      <button type="button" onClick={conectar} aria-disabled={pendente} data-state={pendente ? "loading" : undefined} className="btn btn-primary btn-sm">
        <Link2 size={14} aria-hidden="true" /> Conectar
      </button>
    );
  } else if (conexao?.estado === "conectando") {
    // "Gerando o QR…" também aqui: esta linha é a região viva, o quadro do QR não
    descricao = qrNaTela ? "Esperando você ler o QR code com o celular da loja." : "Gerando o QR…";
    controle = (
      <button type="button" onClick={() => desconectar("Cancelar a conexão do WhatsApp?", "Cancelar conexão")} aria-disabled={pendente} data-state={pendente ? "loading" : undefined} className="btn btn-sm tap">
        Cancelar
      </button>
    );
  } else if (conexao?.estado === "conectado") {
    descricao = (
      <span className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-ok" />
        <span className="truncate">Conectado{conexao.numero ? ` ao ${conexao.numero}` : ""}</span>
      </span>
    );
    controle = (
      <button
        type="button"
        onClick={() => desconectar("Desconectar o WhatsApp? O robô para de responder e o celular sai dos aparelhos conectados.", "Desconectar")}
        aria-disabled={pendente}
        data-state={pendente ? "loading" : undefined}
        className="btn btn-sm tap hover:text-danger"
      >
        Desconectar
      </button>
    );
  } else if (conexao?.estado === "meta") {
    descricao = "Ligado pela Solace. Para mudar, fale com o suporte.";
  }

  return (
    <div ref={raiz}>
      <section className="ajuste-grupo">
        <div className="ajuste-lista">
          <div className="ajuste-linha">
            <span aria-hidden="true" className="ajuste-icone">
              <Smartphone size={16} strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="block text-[13.5px] font-medium">WhatsApp da loja</p>
              <p className="mt-0.5 text-[12.5px] text-muted" aria-live="polite">
                {erro ?? descricao}
              </p>
            </div>
            {controle && <div className="ajuste-controle">{controle}</div>}
          </div>
          <Aparece quando={conexao?.estado === "conectando"}>
            <div className="grid gap-5 border-t border-line p-4 sm:grid-cols-[auto_1fr] sm:items-center">
              {/* o QR é branco com borda própria: lê bem também no tema escuro */}
              <div className="mx-auto grid size-56 place-items-center rounded-lg bg-white p-2">
                {/* o QR novo (a cada 30 s) entra esmaecendo: trocado seco, parecia piscar na frente da câmera */}
                {/* eslint-disable-next-line @next/next/no-img-element -- QR em data URL, que muda a cada 30 s */}
                {qrNaTela ? <img key={qrNaTela} src={qrNaTela} alt="QR code para conectar o WhatsApp" className="enter size-full" /> : <span className="text-[13px] text-neutral-500">Gerando o QR…</span>}
              </div>
              <div className="text-[13.5px]">
                <ol className="list-inside list-decimal space-y-2">
                  <li>No celular da loja, abra o WhatsApp.</li>
                  <li>Toque em <b className="font-medium">Configurações</b> e depois em <b className="font-medium">Aparelhos conectados</b>.</li>
                  <li>Toque em <b className="font-medium">Conectar aparelho</b> e aponte para o QR.</li>
                </ol>
                <p className="mt-2 text-muted">Esta tela muda sozinha quando conectar.</p>
              </div>
            </div>
          </Aparece>
        </div>
      </section>
            {/* já na conferência: o aviso entrando depois empurrava o "Testar a conversa" uns 70 px */}
      <Aparece quando={!conexao || conexao.estado === "sem" || conexao.estado === "conectando"}>
        <p className="mt-3 flex items-start gap-2 text-[12.5px] text-muted">
          <Info size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
          A conexão é pelo WhatsApp Web, que não é um serviço oficial do WhatsApp para robôs. Para evitar bloqueio, o robô só responde quem
          chamou primeiro e nunca manda mensagem em massa.
        </p>
      </Aparece>
    </div>
  );
}
