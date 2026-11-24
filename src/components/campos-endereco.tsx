"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { juntarEndereco, separarEndereco } from "@/lib/endereco";
import { TextoQueTroca } from "@/components/texto-que-troca";
import { useSaida } from "@/components/saida";

/**
 * O endereço em partes: CEP (que preenche rua e bairro sozinho), rua, número, complemento e bairro. O formulário
 * recebe uma linha só, no campo escondido `nome`, como sempre recebeu. `id`: prefixo dos ids, para dois na mesma tela.
 * `proprio`: quem digita é o dono do endereço (portal). Nas telas da equipe o preenchimento automático do navegador
 * ofereceria o endereço do próprio atendente.
 */
export function CamposEndereco({
  nome,
  id,
  inicial,
  obrigatorio = false,
  className = "",
  proprio = false,
}: {
  nome: string;
  id: string;
  inicial?: string | null;
  obrigatorio?: boolean;
  className?: string;
  proprio?: boolean;
}) {
  const [p, setP] = useState(() => separarEndereco(inicial));
  const [aviso, setAviso] = useState<{ texto: string; erro?: boolean; buscando?: boolean; pulou?: boolean } | null>(null);
  // endereço antigo, digitado livre, que não deu para separar: ficou inteiro na rua, e exigir número e bairro
  // faria a pessoa repetir o que já está lá ("Rua das Flores 120 - Centro, 120 - Centro")
  const [antigo] = useState(() => {
    const x = separarEndereco(inicial);
    return !!x.rua && !x.numero && !x.bairro;
  });
  const numero = useRef<HTMLInputElement>(null);
  const ruaRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);
  const buscado = useRef("");
  // as partes de agora, para a resposta do CEP (que chega depois) comparar com o que a pessoa digitou enquanto isso
  const atual = useRef(p);
  useEffect(() => {
    atual.current = p;
  });
  // o que o último CEP preencheu: um CEP novo (ou não encontrado) troca isso, mas não o que a pessoa digitou
  const doCep = useRef({ rua: "", bairro: "" });
  // o CEP preencheu: o formulário que salva sozinho (Configurações) precisa saber que mudou
  const avisarMudanca = useRef(false);
  // sem aviso, a linha dele fica sem altura (no 320 ela desce para baixo do CEP e deixava um vão), mas continua na
  // página para o leitor de tela ouvir a região viva; a altura fica o tempo de o texto sair
  const comAviso = useSaida(!!aviso?.texto, 300).montado;
  const muda = (k: keyof typeof p) => (e: React.ChangeEvent<HTMLInputElement>) => setP((x) => ({ ...x, [k]: e.target.value }));

  async function buscarCep(valor: string) {
    const cep = valor.replace(/\D/g, "");
    if (cep.length !== 8) {
      // apagou ou está corrigindo o CEP: o aviso do anterior sai, e o mesmo CEP pode ser buscado de novo
      buscado.current = "";
      setAviso(null);
      return;
    }
    if (cep === buscado.current) return;
    buscado.current = cep;
    const antes = atual.current;
    setAviso({ texto: "Buscando o CEP…", buscando: true });
    // a resposta só vale se o CEP no campo ainda for este (corrigido no meio, a resposta velha é descartada)
    const valeAinda = () => buscado.current === cep;
    try {
      const r = await fetch(`/api/cep/${cep}`, { signal: AbortSignal.timeout(8000) });
      const d = (await r.json()) as { rua?: string; bairro?: string; cidade?: string; uf?: string; erro?: string };
      if (!valeAinda()) return;
      if (!r.ok) {
        buscado.current = "";
        // o que o CEP anterior tinha preenchido não vale para este
        setP((x) => ({ ...x, rua: x.rua === doCep.current.rua ? "" : x.rua, bairro: x.bairro === doCep.current.bairro ? "" : x.bairro }));
        doCep.current = { rua: "", bairro: "" };
        return setAviso({ texto: d.erro ?? "CEP não encontrado. Preencha à mão.", erro: true });
      }
      const agora = atual.current;
      // a pessoa digitou a rua enquanto o CEP buscava: o que ela digitou fica, e o foco não pula para o número
      const digitou = agora.rua !== antes.rua && agora.rua !== doCep.current.rua;
      // CEP de cidade pequena vem sem rua: só o que veio substitui o que estava
      const rua = !digitou && d.rua ? d.rua : agora.rua;
      const bairro = agora.bairro && agora.bairro !== antes.bairro && agora.bairro !== doCep.current.bairro ? agora.bairro : d.bairro || agora.bairro;
      doCep.current = { rua: d.rua ?? "", bairro: d.bairro ?? "" };
      avisarMudanca.current = rua !== agora.rua || bairro !== agora.bairro;
      setP((x) => ({ ...x, rua, bairro }));
      const pula = !!d.rua && !digitou && document.activeElement === cepRef.current;
      setAviso(d.cidade ? { texto: `${d.cidade}/${d.uf}`, pulou: pula } : null);
      if (pula) numero.current?.focus();
    } catch {
      if (!valeAinda()) return;
      buscado.current = "";
      setAviso({ texto: "Não deu para buscar o CEP agora. Preencha à mão.", erro: true });
    }
  }

  // o CEP preencheu a rua: avisa o formulário como se a pessoa tivesse digitado (o que salva sozinho grava)
  useEffect(() => {
    if (!avisarMudanca.current) return;
    avisarMudanca.current = false;
    ruaRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
  }, [p]);

  // o formulário limpo (janela fechada, salvo com sucesso) limpa as partes também: o reset nativo não alcança o
  // estado do React, e o próximo cliente saía com o endereço do anterior
  useEffect(() => {
    const form = cepRef.current?.form;
    if (!form) return;
    const limpar = () => {
      buscado.current = "";
      setAviso(null);
      doCep.current = { rua: "", bairro: "" };
      setP(separarEndereco(inicial));
    };
    form.addEventListener("reset", limpar);
    return () => form.removeEventListener("reset", limpar);
  }, [inicial]);

  // ouvinte nativo: a máscara do CEP reescreve o campo antes do React, que então não vê a mudança no onChange
  const aoDigitar = useEffectEvent(() => void buscarCep(cepRef.current?.value ?? ""));
  useEffect(() => {
    const el = cepRef.current;
    if (!el) return;
    const ouvir = () => aoDigitar();
    el.addEventListener("input", ouvir);
    return () => el.removeEventListener("input", ouvir);
  }, []);
  const auto = (v: string) => (proprio ? v : "off");

  return (
    // @container: os campos se arrumam pela largura de onde estão (janela estreita ou seção larga), não pela tela
    <fieldset
      className={`@container min-w-0 ${className}`}
      // Enter no meio do endereço não envia o formulário pela metade; no CEP, busca
      onKeyDown={(e) => {
        if (e.key !== "Enter" || e.ctrlKey || e.metaKey || !(e.target instanceof HTMLInputElement)) return;
        e.preventDefault();
        if (e.target === cepRef.current) void buscarCep(e.target.value);
      }}
    >
      {/* o grupo diz ao leitor de tela que estes campos são um endereço só, e se ele é opcional */}
      <legend className="sr-only">{obrigatorio ? "Endereço" : "Endereço (opcional)"}</legend>
      <div className="grid grid-cols-12 gap-3">
      <input type="hidden" name={nome} value={juntarEndereco(p)} />
      {/* o CEP tem linha própria: estes campos vivem em janelas estreitas, onde lado a lado ele espremia */}
      <div className="col-span-12">
        <label className="label" htmlFor={`${id}-cep`}>
          CEP <span className="font-normal text-muted">(preenche a rua e o bairro)</span>
        </label>
        {/* o aviso desce para baixo do CEP quando não cabe ao lado (320 px), em vez de virar uma coluna estreita */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <input
            id={`${id}-cep`}
            inputMode="numeric"
            autoComplete={auto("postal-code")}
            data-mascara="cep"
            maxLength={9}
            placeholder="00000-000"
            className="input num w-32 shrink-0"
            ref={cepRef}
            aria-describedby={`${id}-cep-aviso`}
          />
          <p id={`${id}-cep-aviso`} aria-live="polite" className={`min-w-40 flex-1 text-[12.5px] transition-colors ${comAviso ? "" : "h-0 overflow-hidden"} ${aviso?.erro ? "text-danger" : "text-muted"}`}>
            {/* quem não vê precisa saber o que mudou e por que o cursor foi para o número */}
            {aviso?.pulou && <span className="sr-only">Rua e bairro preenchidos. Cursor no número. </span>}
            <TextoQueTroca texto={aviso?.texto ?? ""} brilho={!!aviso?.buscando} />
          </p>
        </div>
      </div>
      <div className="col-span-12 @lg:col-span-8">
        <label className="label" htmlFor={`${id}-rua`}>Rua</label>
        <input ref={ruaRef} id={`${id}-rua`} value={p.rua} onChange={muda("rua")} required={obrigatorio || !!(p.numero || p.complemento || p.bairro).trim()} maxLength={100} autoComplete={auto("address-line1")} className="input" placeholder="Rua, avenida, travessa" />
      </div>
      <div className="col-span-4">
        <label className="label" htmlFor={`${id}-num`}>Número</label>
        <input ref={numero} id={`${id}-num`} value={p.numero} onChange={muda("numero")} required={obrigatorio && !antigo} maxLength={12} className="input num" />
      </div>
      {/* Bairro antes do Complemento: as duas linhas dividem igual (8 e 4), e o bairro é o que o CEP preenche */}
      <div className="col-span-8">
        <label className="label" htmlFor={`${id}-bairro`}>Bairro</label>
        <input id={`${id}-bairro`} value={p.bairro} onChange={muda("bairro")} required={obrigatorio && !antigo} maxLength={60} className="input" />
      </div>
      <div className="col-span-12 @lg:col-span-4">
        <label className="label" htmlFor={`${id}-comp`}>
          Complemento <span className="font-normal text-muted">(opcional)</span>
        </label>
        <input id={`${id}-comp`} value={p.complemento} onChange={muda("complemento")} maxLength={40} autoComplete={auto("address-line2")} className="input" placeholder="Apto, bloco" />
      </div>
      </div>
    </fieldset>
  );
}
