"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Droplet, Eye, EyeOff, Flame } from "lucide-react";
import { cadastrarAction } from "@/app/actions";
import { chamarAcao, tremerCampo, validarCampos } from "@/components/action-form";
import { Aparece } from "@/components/saida";
import { Marcar } from "@/components/controles";

const VENDE = [
  { valor: "agua", rotulo: "Água", icones: [Droplet] },
  { valor: "gas", rotulo: "Gás", icones: [Flame] },
  { valor: "ambos", rotulo: "Os dois", icones: [Droplet, Flame] },
] as const;

/**
 * Cadastro em dois passos: primeiro a pessoa (nome, e-mail, senha), depois a revenda (nome e o que vende,
 * que decide os produtos que já nascem cadastrados). Um formulário só: voltar não perde nada, e Enter no
 * primeiro passo avança. Erro de e-mail volta para o passo do e-mail e aparece no próprio campo.
 */
export function CadastroForm() {
  const [passo, setPasso] = useState<1 | 2>(1);
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState<{ email?: string; geral?: string }>({});
  // o aviso sai recolhendo: guarda o último texto enquanto a saída toca
  const [ultimo, setUltimo] = useState("");
  if (erro.geral && erro.geral !== ultimo) setUltimo(erro.geral);
  const [enviando, start] = useTransition();
  const form = useRef<HTMLFormElement>(null);
  const um = useRef<HTMLFieldSetElement>(null);
  const dois = useRef<HTMLFieldSetElement>(null);

  // veio do login com um e-mail sem conta (/cadastro#email=...): já preenche e tira o e-mail do endereço
  useEffect(() => {
    const email = new URLSearchParams(location.hash.slice(1)).get("email");
    const campo = form.current?.querySelector<HTMLInputElement>("#email");
    if (!email || !campo) return;
    campo.value = email;
    history.replaceState(history.state, "", location.pathname + location.search);
  }, []);

  // o campo inválido treme e ganha o foco; a mensagem aparece embaixo do botão
  const conferir = (parte: HTMLFieldSetElement | null) => {
    const aviso = parte ? validarCampos(parte as unknown as HTMLFormElement) : null;
    setErro(aviso ? { geral: aviso } : {});
    return !aviso;
  };

  // a caixa dos passos acompanha a altura do passo à vista (e do aviso que aparece nele), deslizando
  const [altura, setAltura] = useState<number>();
  useLayoutEffect(() => {
    const ativo = (passo === 1 ? um : dois).current;
    if (!ativo) return;
    const mede = () => setAltura(ativo.offsetHeight);
    mede();
    const ro = new ResizeObserver(mede);
    ro.observe(ativo);
    return () => ro.disconnect();
  }, [passo]);

  const ir = (p: 1 | 2, campo = "input") => {
    setPasso(p);
    // o foco vai para o campo pedido (ou o primeiro) do passo que entrou, depois da troca
    setTimeout(() => (p === 1 ? um : dois).current?.querySelector<HTMLInputElement>(campo)?.focus(), 220);
  };

  return (
    <form
      ref={form}
      method="post"
      noValidate
      onInput={() => (erro.email || erro.geral) && setErro({})}
      onSubmit={(e) => {
        e.preventDefault();
        if (passo === 1) {
          if (!conferir(um.current)) return;
          // a senha digitada duas vezes: um erro de digitação aqui trancaria a pessoa fora da conta nova
          const f = e.currentTarget;
          const confirmar = f.elements.namedItem("confirm") as HTMLInputElement;
          if (confirmar.value !== (f.elements.namedItem("password") as HTMLInputElement).value) {
            setErro({ geral: "As duas senhas não são iguais. Digite de novo." });
            // treme como os outros campos com erro, e já fica selecionado para redigitar
            tremerCampo(confirmar);
            confirmar.select();
            return;
          }
          ir(2);
          return;
        }
        if (!conferir(dois.current)) return;
        const fd = new FormData(e.currentTarget);
        start(async () => {
          const c = await chamarAcao(() => cadastrarAction(fd));
          if (c.erro) return setErro({ geral: c.erro });
          const r = c.r;
          if (!r?.error) return;
          if (/e-mail/i.test(r.error)) {
            setErro({ email: r.error });
            ir(1, "#email");
          } else setErro({ geral: r.error });
        });
      }}
      className="mt-7"
    >
      {/* o nome do passo e dois traços: onde está e quanto falta */}
      <div className="mb-5 flex items-center gap-3 text-[13px] text-muted">
        <span className="whitespace-nowrap">
          <span className="font-medium text-fg">{passo === 1 ? "Você" : "Sua revenda"}</span>
          <span className="num"> · {passo} de 2</span>
        </span>
        <span className="flex flex-1 gap-1.5" aria-hidden="true">
          <span className="h-1 flex-1 rounded-full bg-accent" />
          <span className={`h-1 flex-1 rounded-full transition-colors duration-300 ${passo === 2 ? "bg-accent" : "bg-subtle"}`} />
        </span>
      </div>

      {/* os dois passos ocupam o mesmo lugar; troca como o "Page side by side" do transitions.dev (.passo) */}
      <div className="relative transition-[height] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ height: altura }}>
        <fieldset
          ref={um}
          inert={passo !== 1 || undefined}
          className={`passo inset-x-0 top-0 space-y-4 ${passo === 1 ? "relative" : "pointer-events-none absolute -translate-x-2 opacity-0 blur-[3px]"}`}
        >
          <legend className="sr-only">Você</legend>
          <div>
            <label className="label" htmlFor="ownerName">Seu nome</label>
            <input id="ownerName" name="ownerName" autoComplete="name" required minLength={2} maxLength={80} autoFocus className="input h-11" />
          </div>
          <div>
            <label className="label" htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              aria-invalid={!!erro.email || undefined}
              aria-describedby={erro.email ? "email-erro" : undefined}
              className="input h-11"
            />
            {erro.email && (
              <p id="email-erro" className="enter mt-1.5 text-[13px] text-danger">
                {erro.email} <Link href="/login" className="alvo font-medium underline underline-offset-2">Entrar</Link>
              </p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="password">Senha</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={verSenha ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={200}
                placeholder="Pelo menos 8 caracteres"
                className="input h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setVerSenha((v) => !v)}
                aria-label={verSenha ? "Esconder a senha" : "Mostrar a senha"}
                aria-pressed={verSenha}
                className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-muted hover:text-fg"
              >
                {verSenha ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
              </button>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="confirm">Repita a senha</label>
            {/* segue o olho do campo de cima: com a senha à vista, as duas aparecem para comparar */}
            <input id="confirm" name="confirm" type={verSenha ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={200} className="input h-11" />
          </div>
        </fieldset>

        <fieldset
          ref={dois}
          inert={passo !== 2 || undefined}
          className={`passo inset-x-0 top-0 space-y-4 ${passo === 2 ? "relative" : "pointer-events-none absolute translate-x-2 opacity-0 blur-[3px]"}`}
        >
          <legend className="sr-only">Sua revenda</legend>
          <div>
            <label className="label" htmlFor="company">Nome da revenda</label>
            <input id="company" name="company" autoComplete="organization" required minLength={2} maxLength={120} className="input h-11" />
          </div>
          <div role="radiogroup" aria-labelledby="vende-rotulo">
            <p id="vende-rotulo" className="label">O que vocês vendem</p>
            <div className="grid grid-cols-3 gap-2">
              {VENDE.map(({ valor, rotulo, icones }) => (
                <label key={valor} className="escolha-vende">
                  <input type="radio" name="vende" value={valor} required aria-label={rotulo} className="sr-only" />
                  <span className="flex gap-0.5" aria-hidden="true">
                    {icones.map((I, i) => <I key={i} size={18} strokeWidth={1.75} />)}
                  </span>
                  {rotulo}
                </label>
              ))}
            </div>
            <p className="mt-1.5 text-[13px] text-muted">Os produtos já entram cadastrados.</p>
          </div>
          {/* só robô preenche: fica fora da tela e fora do Tab */}
          <input name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
          <label className="flex items-start gap-2.5 text-[13px] text-muted">
            <Marcar name="agree" required aria-label="Aceito os Termos de uso e a Política de privacidade" className="mt-0.5" />
            <span>
              Li e aceito os <Link href="/termos" target="_blank" className="alvo font-medium text-fg underline underline-offset-2">Termos de uso</Link> e a{" "}
              <Link href="/privacidade" target="_blank" className="alvo font-medium whitespace-nowrap text-fg underline underline-offset-2">Política de privacidade</Link>.
            </span>
          </label>
        </fieldset>
      </div>

      <div className="mt-6 flex gap-2">
        {passo === 2 && (
          <button type="button" onClick={() => ir(1)} className="btn enter h-11 px-4">
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Voltar
          </button>
        )}
        <button className="btn btn-primary h-11 flex-1" disabled={enviando} data-state={enviando ? "loading" : undefined}>
          {passo === 1 ? (
            <>
              Continuar <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </>
          ) : (
            "Criar conta"
          )}
        </button>
      </div>
      <Aparece quando={!!erro.geral} className="pt-3">
        <p role="alert" className="text-[13px] text-danger">{ultimo}</p>
      </Aparece>
    </form>
  );
}
