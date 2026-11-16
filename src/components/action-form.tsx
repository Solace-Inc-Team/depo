"use client";

import { useEffect, useLayoutEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { progress } from "./nav-progress";
import { confirmar } from "./confirm-dialog";
import { recarregarSeVersaoNova } from "@/lib/versao-nova";
import { useSaida } from "./saida";

export type ActionState = { error?: string; ok?: string } | undefined | void;

const TOAST_EVENT = "deposito:toast";

// mensagem do sistema no lugar do balão do navegador ("Please fill out this field"), usando o rótulo do campo
type Campo = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
function avisoDoCampo(campo: Campo) {
  const rotulo = (campo.labels?.[0]?.textContent ?? campo.getAttribute("aria-label") ?? "")
    // tira o que vem entre parênteses no rótulo, como "(opcional)"
    .replace(/\s*\(.*?\)\s*/g, " ")
    .trim();
  // "no campo", "do campo", "neste campo": a preposição muda com o artigo, então cada frase tem a sua
  const c = (no: string, neste: string) => (rotulo ? `${no} campo "${rotulo}"` : neste);
  const v = campo.validity;
  if (v.valueMissing) return campo instanceof HTMLSelectElement ? `Escolha uma opção ${c("no", "neste campo")}.` : `Preencha ${c("o", "este campo")}.`;
  if (v.typeMismatch && campo.type === "email") return "Digite um e-mail válido, como nome@empresa.com.";
  if (v.tooShort && "minLength" in campo) return `${c("No", "Neste campo")}, use pelo menos ${campo.minLength} caracteres.`;
  if (v.rangeUnderflow || v.rangeOverflow || v.stepMismatch) return `O valor ${c("do", "deste campo")} está fora do permitido.`;
  if (v.patternMismatch) return `Confira o formato ${c("do", "deste campo")}.`;
  return `Confira ${c("o", "este campo")}.`;
}

/** Primeiro campo inválido do formulário: marca, faz tremer, põe o foco e devolve a mensagem. Sem erro, null. */
/** Marca o campo como errado, faz tremer e põe o foco; a marca sai quando a pessoa digita de novo. */
export function tremerCampo(campo: Campo) {
  campo.setAttribute("aria-invalid", "true");
  campo.classList.remove("campo-treme");
  void campo.offsetWidth;
  campo.classList.add("campo-treme");
  campo.focus();
  campo.addEventListener("input", () => campo.removeAttribute("aria-invalid"), { once: true });
}

export function validarCampos(form: HTMLFormElement): string | null {
  const campo = form.querySelector<Campo>(":invalid:not(fieldset)");
  if (!campo) return null;
  tremerCampo(campo);
  // a mensagem de erro rola a tela até ela; depois disso a tela volta para o campo que falta
  setTimeout(() => campo.scrollIntoView({ block: "center", behavior: "smooth" }), 80);
  return avisoDoCampo(campo);
}

export const toast = (message: string) => window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));

// onSubmit manual em vez de action={...}: o React limpa o form depois da action, e em caso de erro
// a gente quer manter o que foi digitado
// o texto da confirmação com o que foi digitado: "Receber R$ {amount}?" vira "Receber R$ 84,00?"
const preencher = (texto: string, form: HTMLFormElement) =>
  texto.replace(/\{(\w+)\}/g, (_, nome: string) => {
    const el = form.elements.namedItem(nome);
    if (el instanceof HTMLSelectElement) return el.selectedOptions[0]?.text ?? "";
    return el instanceof HTMLInputElement ? el.value.trim() : "";
  });

export function ActionForm({
  action,
  children,
  className,
  reset = false,
  confirm,
  salvaAoMudar = false,
}: {
  action: (fd: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
  reset?: boolean;
  /** pergunta antes de enviar; {campo} vira o que está no campo de mesmo name (no select, o nome da opção) */
  confirm?: string;
  /** salva sozinho quando um campo muda (ao sair do campo, ou ao marcar a caixa), sem botão */
  salvaAoMudar?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  // envio em andamento: o fieldset desabilitado não segura requestSubmit (Ctrl+Enter repetido criava pedidos em dobro)
  const enviando = useRef(false);
  // salvando sozinho: guarda qual campo mudou, para o aviso dizer o quê e o próprio campo confirmar
  const mudou = useRef<Campo | null>(null);
  useEffect(() => {
    const f = formRef.current;
    if (!salvaAoMudar || !f) return;
    const salvar = (e: Event) => {
      mudou.current = e.target as Campo;
      f.requestSubmit();
    };
    f.addEventListener("change", salvar);
    return () => f.removeEventListener("change", salvar);
  }, [salvaAoMudar]);
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();
  const errorRef = useRef<HTMLParagraphElement>(null);
  // o aviso sai esmaecendo: guarda o último texto enquanto a saída toca
  const aviso = useSaida(!!error);
  const [ultimoErro, setUltimoErro] = useState(error);
  if (error && error !== ultimoErro) setUltimoErro(error);

  useEffect(() => {
    // em formulário comprido o erro fica fora da tela: rola até ele
    if (error) errorRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [error]);

  return (
    <form
      ref={formRef}
      // mexeu no formulário depois do erro: o aviso sai (esmaecendo), em vez de ficar até o próximo envio
      onInput={() => error && setError(undefined)}
      // se enviado antes do JS carregar, vai como POST: senha nunca aparece na URL
      method="post"
      // a validação dos campos é mostrada pelo próprio formulário (sem o balão do navegador); o servidor valida de novo
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (enviando.current && !salvaAoMudar) return;
        const form = e.currentTarget;
        // o botão que enviou mostra que está esperando e depois o ✓ (estilos em globals.css)
        const button = (e.nativeEvent as SubmitEvent).submitter;
        // campo obrigatório vazio ou inválido: o campo treme e a mensagem sai em português, sem o balão do navegador
        const aviso = validarCampos(form);
        if (aviso) {
          setError(aviso);
          return;
        }
        // ação sem volta: pergunta na janela do sistema, com o nome do botão clicado no botão de confirmar
        if (
          confirm &&
          !(await confirmar(preencher(confirm, form), { rotulo: button?.textContent?.trim(), perigo: button?.classList.contains("btn-danger") }))
        )
          return;
        const fd = new FormData(form);
        button?.setAttribute("data-state", "loading");
        progress(true);
        enviando.current = true;
        start(async () => {
          try {
            let r: ActionState;
            try {
              r = await action(fd);
            } catch (e) {
              progress(false);
              soltar(button);
              // sem sinal o fetch da ação falha: mantém a tela e o que foi digitado em vez de cair na página de erro
              // o depo foi atualizado com esta tela aberta: avisa e recarrega em vez de cair na página de erro
              if (recarregarSeVersaoNova(e, 1500)) {
                setError("O depo acabou de ser atualizado. Recarregando a tela, envie de novo em seguida.");
                return;
              }
              if (e instanceof TypeError || !navigator.onLine) {
                setError("Sem internet. Tente de novo quando o sinal voltar.");
                return;
              }
              throw e;
            }
            // se a ação trocou de tela a barra completa sozinha; se não, completa aqui
            progress(false);
            setError(r?.error);
            if (r?.error) {
              soltar(button);
              return;
            }
            button?.setAttribute("data-state", "done");
            setTimeout(() => soltar(button), 1200);
            // o aviso fica fora do form: muitas ações trocam a tela e o form some junto
            const campo = mudou.current;
            mudou.current = null;
            if (salvaAoMudar && campo) {
              // "Galão de água 20L: estoque mínimo 16" em vez de um "atualizado" genérico
              const nome = (form.querySelector<HTMLInputElement>('input[name="name"]')?.value ?? "").trim();
              const rotulo = (campo.labels?.[0]?.textContent ?? "").replace(/\s*\(.*?\)\s*/g, " ").trim().toLowerCase();
              const valor = campo instanceof HTMLInputElement && campo.type === "checkbox" ? (campo.checked ? "sim" : "não") : campo.value;
              toast(nome && rotulo ? `${nome}: ${rotulo} ${valor}` : (r?.ok ?? "Salvo."));
              const alvo = campo instanceof HTMLInputElement && campo.type === "checkbox" ? campo.parentElement : campo;
              alvo?.classList.remove("salvou");
              void (alvo as HTMLElement | null)?.offsetWidth;
              alvo?.classList.add("salvou");
            } else if (r?.ok) toast(r.ok);
            const menu = form.closest("details");
            if (menu) menu.open = false;
            // dentro de uma JanelaAcao: deu certo, a janela fecha
            const janela = form.closest("dialog");
            janela?.dispatchEvent(new Event("fechar"));
            // o que salva sozinho (Configurações, Produtos) não volta ao valor antigo: o reset trazia o valor de antes
            // até a tela atualizar, e o liga e desliga ia e voltava
            // (a janela das Configurações também: ela fica aberta e cada campo já é o valor salvo)
            if (reset || menu || (janela && !salvaAoMudar && !janela.classList.contains("janela-config"))) form.reset();
          } finally {
            enviando.current = false;
          }
        });
      }}
    >
      {/* o fieldset recebe o layout (space-y, grid) para que o espaçamento chegue aos campos */}
      <fieldset disabled={pending && !salvaAoMudar} className={`min-w-0 ${className ?? ""}`}>
        {children}
        {aviso.montado && (
          <p
            ref={errorRef}
            role="alert"
            data-saindo={aviso.saindo || undefined}
            className="erro-form col-span-full mt-2 flex basis-full items-start gap-2 rounded-lg bg-danger-soft px-3 py-2 text-[13px] font-medium text-danger"
          >
            <CircleAlert size={16} strokeWidth={2} className="mt-px shrink-0" aria-hidden="true" />
            {error ?? ultimoErro}
          </p>
        )}
      </fieldset>
    </form>
  );
}

/** Devolve o botão ao normal sem cortar: o ícone sai, o texto volta, e só então o estado some. */
function soltar(button: Element | null | undefined) {
  if (!button?.hasAttribute("data-state")) return;
  button.setAttribute("data-state", "saindo");
  setTimeout(() => button.getAttribute("data-state") === "saindo" && button.removeAttribute("data-state"), 260);
}

/** Mostra os avisos de sucesso das ações. Fica no layout raiz. */
type Toast = { id: number; message: string; leaving?: boolean; vez?: number };

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    let seq = 0;
    let atual: Toast[] = [];
    const timers = new Map<number, ReturnType<typeof setTimeout>[]>();
    const set = (fn: (l: Toast[]) => Toast[]) => setToasts((atual = fn(atual)));
    // marca a saída, espera a animação e só então tira da lista
    const marcar = (id: number) => set((l) => l.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    const sair = (id: number, depois = 0) => {
      timers.get(id)?.forEach(clearTimeout);
      // sem espera, marca já: o próximo aviso que chegar no mesmo instante conta com esta saída
      if (!depois) marcar(id);
      timers.set(id, [
        setTimeout(() => marcar(id), depois),
        setTimeout(() => {
          timers.delete(id);
          set((l) => l.filter((t) => t.id !== id));
        }, depois + 200),
      ]);
    };
    const show = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      // a mesma mensagem de novo (despachos seguidos): o aviso que está na tela dá um pulinho e ganha mais tempo
      const igual = atual.find((t) => t.message === message && !t.leaving);
      if (igual) {
        set((l) => l.map((t) => (t.id === igual.id ? { ...t, vez: (t.vez ?? 0) + 1 } : t)));
        sair(igual.id, 3500);
        return;
      }
      const id = ++seq;
      set((l) => [...l, { id, message }]);
      sair(id, 3500);
      // no máximo três na tela: o mais antigo sai animado, não some de uma vez
      const visiveis = atual.filter((t) => !t.leaving);
      if (visiveis.length > 3) sair(visiveis[0].id);
    };
    window.addEventListener(TOAST_EVENT, show);
    return () => {
      window.removeEventListener(TOAST_EVENT, show);
      timers.forEach((ts) => ts.forEach(clearTimeout));
    };
  }, []);
  // pilha do transitions.dev ("Banner stacking"): o aviso novo na frente, os anteriores recuam um degrau cada
  // (menores, mais altos, apagados); com o mouse em cima a pilha se abre em lista
  const [mouse, setMouse] = useState(false);
  const pilha = useRef<HTMLDivElement>(null);
  const ativos = toasts.filter((t) => !t.leaving);
  const aberta = mouse && ativos.length > 0;
  const profundidade = (t: Toast) => (t.leaving ? undefined : ativos.length - 1 - ativos.indexOf(t));
  useLayoutEffect(() => {
    const el = pilha.current;
    if (!el) return;
    // aberta, cada aviso sobe a altura dos que estão na frente dele, mais 8px de vão
    let y = 0;
    const itens = [...el.querySelectorAll<HTMLElement>(".toast:not([data-leaving])")].reverse();
    for (const item of itens) {
      item.style.setProperty("--aberta-y", `${-y}px`);
      y += item.offsetHeight + 8;
    }
    el.style.height = !itens.length ? "0px" : `${aberta ? y - 8 : itens[0].offsetHeight + 24}px`;
  });
  return (
    <div
      ref={pilha}
      role="status"
      aria-live="polite"
      data-aberta={aberta || undefined}
      onPointerEnter={() => setMouse(true)}
      onPointerLeave={() => setMouse(false)}
      className="pilha-avisos fixed right-4 bottom-4 left-4 z-50 sm:left-auto sm:w-96"
    >
      {toasts.map((current) => (
        <p
          key={current.id}
          data-leaving={current.leaving || undefined}
          data-depth={profundidade(current)}
          className="toast flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-[13px] font-medium shadow-[0_8px_30px_rgb(0_0_0/0.12)]"
        >
          <CircleCheck size={16} strokeWidth={2} className="text-ok" aria-hidden="true" />
          {/* a chave muda a cada repetição: o texto dá o mesmo pulinho dos números (.bump) */}
          <span key={current.vez ?? 0} className={current.vez ? "bump" : undefined}>{current.message}</span>
        </p>
      ))}
    </div>
  );
}
