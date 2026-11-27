"use client";

import { useDeferredValue, useEffect, useRef, useState, useSyncExternalStore } from "react";

// o canal guardado neste aparelho só é lido no navegador; no servidor vale "telefone"
// o que outra aba grava aparece aqui também (o evento "storage" só chega às outras abas)
const outraAba = (avisar: () => void) => {
  window.addEventListener("storage", avisar);
  return () => window.removeEventListener("storage", avisar);
};
const canalGuardado = () => {
  try {
    return localStorage.getItem("depo:canal") === "whatsapp" ? "whatsapp" : "telefone";
  } catch {
    return "telefone";
  }
};
import { TelefoneCliente } from "@/components/aviso-telefone";
import { ActionForm } from "@/components/action-form";
import { createOrderAction } from "@/app/actions";
import { formatBRL, parseBRL } from "@/lib/money";
import { LiveNumber } from "@/components/live-number";
import { Aparece } from "@/components/saida";
import { Plus } from "lucide-react";
import { Marcar } from "@/components/controles";
import { CamposEndereco } from "@/components/campos-endereco";

type Product = { id: string; name: string; priceCents: number; containerPriceCents: number; returnable: boolean; available: number; reserved: number };
type Customer = { id: string; name: string; phone: string; address: string; addresses?: { id: string; label: string; address: string }[] };
type Driver = { id: string; name: string; onShift: boolean };

const payments = [
  ["dinheiro", "Dinheiro"],
  ["pix", "Pix"],
  ["cartao", "Cartão"],
  ["fiado", "Fiado"],
] as const;

export function NewOrderForm({
  products,
  drivers,
  initialCustomer,
  discountLimitPct,
}: {
  products: Product[];
  drivers: Driver[];
  initialCustomer?: Customer;
  /** null = sem limite (dono) */
  discountLimitPct: number | null;
}) {
  const [mode, setMode] = useState<"entrega" | "balcao">("entrega");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [keepsBottle, setKeepsBottle] = useState<Record<string, boolean>>({}); // true = cliente não tem vazio para trocar
  const [customer, setCustomer] = useState<Customer | undefined>(initialCustomer);
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState<{ q: string; list: Customer[]; erro?: string }>({ q: "", list: [] });
  // resultado marcado pelas setas (volta ao primeiro a cada busca nova)
  const [ativo, setAtivo] = useState(0);
  const [creating, setCreating] = useState(false);
  const [payment, setPayment] = useState<(typeof payments)[number][0]>("dinheiro");
  const [fee, setFee] = useState("");
  const [discount, setDiscount] = useState("");
  // aberto por quem clicou, não pelo valor: apagar o desconto para corrigir não fecha o campo nem esconde o Motivo
  const [descontoAberto, setDescontoAberto] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  // campo que existe sempre: a busca some quando o cliente já está escolhido
  const modeRef = useRef<HTMLInputElement>(null);
  // uma chave por formulário aberto: o servidor reconhece o mesmo envio repetido (rede que reenvia) e não cria dois
  // pedidos. Gravada no campo, e não no estado, para o HTML do servidor e o do navegador serem iguais
  const chaveRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (chaveRef.current) chaveRef.current.value = crypto.randomUUID?.() ?? "";
  }, []);

  const temItens = useRef(false);
  const [semProduto, setSemProduto] = useState(false);
  // atalhos de quem atende no teclado: "/" vai para a busca de cliente, Ctrl+Enter lança
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      // Enter sozinho num campo (observação, taxa, troco, desconto) não lança o pedido pela metade: lançar é o botão
      // ou Ctrl+Enter, como já era no cadastro do cliente
      if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && e.target instanceof HTMLInputElement && e.target.form === modeRef.current?.form) e.preventDefault();
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !e.repeat) {
        e.preventDefault();
        // carrinho vazio: o botão está desligado, então o atalho também não envia; diz o que falta
        if (!temItens.current) return setSemProduto(true);
        modeRef.current?.form?.requestSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // carrinho vazio: o botão fica apagado mas alcançável pelo teclado, e diz o que falta em vez de não fazer nada
  const naoLancaVazio = (e: React.MouseEvent) => {
    if (temItens.current) return;
    e.preventDefault();
    setSemProduto(true);
  };

  const enterPendente = useRef<string | null>(null);
  // busca no servidor enquanto digita; a resposta de uma busca antiga não sobrescreve a nova
  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/clientes/busca?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        .then((r) => {
          // sessão vencida não é "nenhum cliente": cadastrar de novo criaria um cliente repetido
          if (r.status === 401) throw new Error("sessao");
          return r.ok ? r.json() : [];
        })
        .then((list: Customer[]) => {
          // Enter apertado antes de a busca voltar: escolhe o primeiro desta busca, a que a pessoa digitou
          if (enterPendente.current === q && list.length) {
            enterPendente.current = null;
            setCustomer(list[0]);
            setSearch("");
            return;
          }
          setMatches({ q, list });
          setAtivo(0);
        })
        .catch((e: unknown) => {
          if (ctrl.signal.aborted) return;
          enterPendente.current = null;
          setMatches({
            q,
            list: [],
            erro: e instanceof Error && e.message === "sessao" ? "Sua sessão terminou. Entre de novo para buscar o cliente." : "Sem internet. A busca volta quando o sinal voltar.",
          });
        });
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [search]);
  const q = search.trim();
  // Esc fecha a lista sem apagar o que foi digitado; digitar de novo reabre
  const [fechada, setFechada] = useState(false);
  const shown = q.length >= 2 && !fechada ? matches.list : [];
  // ↑ ↓ andam pelos resultados e Enter escolhe: quem atende com o telefone no ombro não larga o teclado
  const escolher = (c: Customer) => {
    setCustomer(c);
    setSearch("");
  };

  // de onde veio o pedido: começa no último canal usado neste aparelho (WhatsApp vindo sempre marcado errava o relatório)
  const guardado = useSyncExternalStore(outraAba, canalGuardado, () => "telefone" as const);
  const [escolhido, setOrigin] = useState<"telefone" | "whatsapp">();
  const origin = escolhido ?? guardado;
  const mudarCanal = (c: "telefone" | "whatsapp") => {
    setOrigin(c);
    try {
      localStorage.setItem("depo:canal", c);
    } catch {}
  };
  const nothingFound = q.length >= 2 && matches.q === q && matches.list.length === 0 && !matches.erro;
  const erroBusca = q.length >= 2 && matches.q === q ? matches.erro : undefined;

  const items = products
    .filter((p) => qty[p.id] > 0)
    .map((p) => ({ productId: p.id, quantity: qty[p.id], returnsEmpty: p.returnable && !keepsBottle[p.id] }));
  useEffect(() => {
    temItens.current = items.length > 0;
  });
  if (items.length && semProduto) setSemProduto(false);
  const parsedFee = parseBRL(fee) ?? 0;
  // taxa fora do limite não entra no total mostrado; o servidor recusa com a mensagem
  const feeCents = mode === "entrega" && parsedFee >= 0 && parsedFee <= 100_00 ? parsedFee : 0;
  // sem vazio para trocar, o cliente compra o vasilhame junto: entra no preço
  const priceOf = (p: Product) => p.priceCents + (p.returnable && keepsBottle[p.id] ? p.containerPriceCents : 0);
  const subtotal = products.reduce((s, p) => s + (qty[p.id] ?? 0) * priceOf(p), 0);
  const parsedDiscount = parseBRL(discount) ?? 0;
  const discountCents = parsedDiscount > 0 && parsedDiscount <= subtotal ? parsedDiscount : 0;
  const overLimit = discountLimitPct !== null && discountCents > Math.floor((subtotal * discountLimitPct) / 100);
  // só pra exibir, o total que vale é calculado no servidor
  const total = subtotal + feeCents - discountCents;
  // o total animado vem num segundo momento: o número do + aparece na hora mesmo em celular fraco
  const shownTotal = useDeferredValue(total);
  const unidades = items.reduce((s, i) => s + i.quantity, 0);
  const step = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(99, (q[id] ?? 0) + d)) }));

  return (
    <ActionForm action={createOrderAction} className="grid gap-6 pb-24 lg:grid-cols-[minmax(0,48rem)_20rem] lg:pb-0">
      <input type="hidden" name="chaveEnvio" ref={chaveRef} />
      <input type="hidden" name="mode" value={mode} ref={modeRef} />
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <input type="hidden" name="customerId" value={creating ? "" : (customer?.id ?? "")} />
      <input type="hidden" name="paymentMethod" value={payment} />
      {mode === "entrega" && <input type="hidden" name="origin" value={origin} />}

      <div className="space-y-6">
        <div role="group" aria-label="Tipo de venda" className="relative grid grid-cols-2 rounded-lg bg-subtle p-1 sm:inline-grid">
          {/* fundo da aba escolhida: desliza para o lado em vez de trocar de repente */}
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-line transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: mode === "balcao" ? "translateX(100%)" : "none" }}
          />
          {(["entrega", "balcao"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`relative min-h-11 rounded-md px-3.5 py-1.5 text-[13px] [@media(min-width:640px)_and_(pointer:fine)]:min-h-0 font-medium transition-colors ${mode === m ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              {m === "entrega" ? "Entrega" : "Venda no balcão"}
            </button>
          ))}
        </div>

        <section className="panel p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="h2">Cliente{mode === "balcao" && <span className="text-base font-normal text-muted"> (opcional)</span>}</h2>
            {/* o canal fica junto do cliente, à vista: lá embaixo ninguém mudava */}
            {mode === "entrega" && (
              <div role="group" aria-label="Pedido chegou por" className="flex items-center gap-1.5">
                <span className="text-[13px] text-muted">Chegou por</span>
                {(["telefone", "whatsapp"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={origin === c}
                    onClick={() => mudarCanal(c)}
                    className={`btn btn-sm tap ${origin === c ? "border-accent bg-accent/10 hover:bg-accent/10" : ""}`}
                  >
                    {c === "telefone" ? "Telefone" : "WhatsApp"}
                  </button>
                ))}
              </div>
            )}
          </div>
          {customer && !creating ? (
            // cada estado do quadro (buscar, cadastrar, escolhido) chega com movimento quando toma o lugar do outro
            <div className="enter flex items-start justify-between gap-3 rounded-md bg-accent-soft p-3">
              <div className="min-w-0 wrap-anywhere">
                <p className="font-semibold">{customer.name}</p>
                <p className="text-sm text-muted">{customer.address || "Sem endereço"}</p>
                <p className="text-sm text-muted">{customer.phone}</p>
              </div>
              <button type="button" className="btn btn-sm tap shrink-0" onClick={() => setCustomer(undefined)}>Trocar</button>
            </div>
          ) : null}
          {customer && !creating && mode === "entrega" && (customer.addresses?.length ?? 0) > 0 && (
            <div className="enter mt-3">
              <label className="label" htmlFor="addressId">Entregar em</label>
              <select id="addressId" name="addressId" className="input" defaultValue="">
                <option value="">Endereço principal: {customer.address || "sem endereço"}</option>
                {customer.addresses!.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}: {a.address}</option>
                ))}
              </select>
            </div>
          )}
          {customer && !creating ? null : creating ? (
            <div
              className="enter grid gap-3 sm:grid-cols-2"
              // Enter no meio do cadastro (no CEP, no número) não lança o pedido pela metade: lançar é o botão ou Ctrl+Enter
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && e.target instanceof HTMLInputElement) e.preventDefault();
              }}
            >
              <div className="sm:col-span-2">
                <label className="label" htmlFor="nc-name">Nome</label>
                <input id="nc-name" name="newCustomerName" required maxLength={120} defaultValue={q} className="input" autoFocus />
              </div>
              <div>
                <label className="label" htmlFor="nc-phone">Telefone</label>
                <TelefoneCliente id="nc-phone" name="newCustomerPhone" className="input" />
              </div>
              <CamposEndereco nome="newCustomerAddress" id="nc-end" obrigatorio={mode === "entrega"} className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="label" htmlFor="nc-ref">Referência</label>
                <input id="nc-ref" name="newCustomerReference" maxLength={200} className="input" />
              </div>
              <button type="button" className="btn btn-sm tap w-fit" onClick={() => setCreating(false)}>
                Buscar cliente cadastrado
              </button>
            </div>
          ) : (
            <div className="enter">
              <label className="label" htmlFor="busca">Buscar por nome, telefone ou endereço <span className="hidden font-normal text-muted lg:inline">(atalho: /)</span></label>
              <input
                id="busca"
                ref={searchRef}
                value={search}
                onChange={(e) => {
                  enterPendente.current = null;
                  setFechada(false);
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && (shown.length || search)) {
                    // primeiro Esc fecha a lista, o segundo limpa a busca
                    e.preventDefault();
                    e.stopPropagation();
                    if (shown.length) setFechada(true);
                    else setSearch("");
                  } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    if (!shown.length) return;
                    e.preventDefault();
                    setAtivo((a) => (a + (e.key === "ArrowDown" ? 1 : shown.length - 1)) % shown.length);
                  } else if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
                    // Enter na busca escolhe o cliente marcado; nunca lança o pedido pela metade.
                    // A lista ainda é da busca anterior (a nova não voltou): não escolhe ninguém dela
                    e.preventDefault();
                    // o texto do campo agora, não o da última renderização: digitação rápida chega antes dela
                    const digitado = e.currentTarget.value.trim();
                    if (matches.q === digitado) {
                      if (shown[ativo]) escolher(shown[ativo]);
                    } else enterPendente.current = digitado;
                  }
                }}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={shown.length > 0}
                aria-controls="busca-resultados"
                aria-activedescendant={shown[ativo] ? `cli-${shown[ativo].id}` : undefined}
                className="input"
                autoComplete="off"
              />
              {shown.length > 0 && (
                <ul id="busca-resultados" role="listbox" className="mt-2 divide-y divide-line rounded-md border border-line">
                  {shown.map((c, i) => (
                    // resultados chegam em sequência rápida; quem já estava na lista não anima de novo
                    // sem botão dentro: o clique é na própria opção (o foco fica na busca, que comanda a lista)
                    <li
                      key={c.id}
                      id={`cli-${c.id}`}
                      role="option"
                      aria-selected={i === ativo}
                      onClick={() => escolher(c)}
                      onMouseEnter={() => setAtivo(i)}
                      className={`enter block w-full cursor-pointer px-3 py-2 text-left wrap-anywhere hover:bg-subtle ${i === ativo ? "bg-subtle" : ""}`}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="block text-sm text-muted">{c.address} {c.phone && `(${c.phone})`}</span>
                    </li>
                  ))}
                </ul>
              )}
              {nothingFound && <p className="enter mt-2 text-sm text-muted">Nenhum cliente encontrado.</p>}
              {/* quem usa leitor de tela ouve o resultado da busca, que na tela só se vê */}
              <p role="status" className="sr-only">
                {q.length >= 2 && matches.q === q && !matches.erro ? (matches.list.length ? `${matches.list.length} ${matches.list.length === 1 ? "cliente encontrado" : "clientes encontrados"}` : "Nenhum cliente encontrado.") : ""}
              </p>
              {erroBusca && (
                <p role="alert" className="enter mt-2 text-sm font-medium text-danger">
                  {erroBusca}
                </p>
              )}
              <button type="button" className="btn btn-sm tap mt-2 max-w-full" onClick={() => setCreating(true)}>
                <Plus size={14} strokeWidth={2} aria-hidden="true" />
                <span className="truncate">{nothingFound ? `Cadastrar "${q}" como cliente novo` : "Novo cliente"}</span>
              </button>
            </div>
          )}
        </section>

        <section className="panel">
          <h2 className="h2 border-b border-line px-4 py-3">Produtos</h2>
          <ul>
            {products.map((p) => {
              const n = qty[p.id] ?? 0;
              return (
                <li key={p.id} className={`border-b border-line px-4 py-3 transition-colors duration-300 last:border-0 ${n ? "bg-accent-soft/40" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted">
                        {/* reservado além do que há (a carga ainda não chegou): "nenhum livre", nunca um número negativo */}
                        <span className="num">{formatBRL(p.priceCents)}</span>, {p.available > 0 ? `${p.available} ${p.returnable ? (p.available === 1 ? "cheio livre" : "cheios livres") : p.available === 1 ? "livre" : "livres"}` : p.returnable ? "nenhum cheio livre" : "nenhum livre"}
                        {p.reserved > 0 && ` (${p.reserved} ${p.reserved === 1 ? "reservado" : "reservados"})`}
                      </p>
                      {/* o pedido passa mesmo assim (a carga pode chegar antes da entrega), mas a pessoa fica sabendo */}
                      <Aparece quando={n > 0 && n > p.available}>
                        <p className="text-sm font-medium text-warn-fg">Acima do estoque livre ({Math.max(0, p.available)})</p>
                      </Aparece>
                    </div>
                    <div className="flex items-center gap-1" role="group" aria-label={`Quantidade de ${p.name}`}>
                      <button type="button" className="btn h-11 w-11 px-0 text-xl" onClick={() => step(p.id, -1)} aria-label="Diminuir">−</button>
                      {/* a chave muda a cada clique e o número dá um pulinho (CSS): mais leve que rolar a cada toque.
                          Zero fica apagado: cinco zeros brancos chamavam mais atenção que os nomes dos produtos */}
                      <span aria-live="polite" className={`num w-10 text-center text-2xl font-semibold transition-colors ${n ? "" : "text-muted/60"}`}><LiveNumber value={n} /></span>
                      <button type="button" className="btn h-11 w-11 px-0 text-xl" onClick={() => step(p.id, 1)} aria-label="Aumentar">+</button>
                    </div>
                  </div>
                  <Aparece quando={n > 0 && p.returnable}>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                      <Marcar
                        checked={!!keepsBottle[p.id]}
                        onChange={(e) => setKeepsBottle((k) => ({ ...k, [p.id]: e.target.checked }))}
                      />
                      {/* o vasilhame é vendido junto: o preço dele à vista, sem segunda escolha */}
                      <span>
                        Cliente não tem vasilhame para trocar
                        {p.containerPriceCents > 0 && <span className="text-muted"> (+{formatBRL(p.containerPriceCents)} cada)</span>}
                      </span>
                    </label>
                  </Aparece>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="panel grid gap-3 p-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="notes">Observações</label>
            <input id="notes" name="notes" maxLength={500} className="input" placeholder="Ex.: deixar na portaria" />
          </div>
          {/* trocar Entrega e Balcão recolhe e abre os campos da entrega no lugar */}
          <Aparece quando={mode === "entrega"} className="space-y-3">
              <div>
                <label className="label" htmlFor="fee">Taxa de entrega</label>
                <input id="fee" name="deliveryFee" maxLength={12} value={fee} onChange={(e) => setFee(e.target.value)} inputMode="decimal" data-mascara="dinheiro" className="input" placeholder="0,00" />
              </div>
              <div>
                <label className="label" htmlFor="driver">Entregador</label>
                <select id="driver" name="driverId" className="input" defaultValue="">
                  <option value="">Deixar aguardando</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id} disabled={!d.onShift}>
                      {d.name}{d.onShift ? "" : " (sem turno aberto)"}
                    </option>
                  ))}
                </select>
              </div>
          </Aparece>
        </section>
      </div>

      <aside aria-label="Resumo do pedido" className="lg:sticky lg:top-6 lg:self-start">
        <div className="panel p-4">
          <h2 className="h2 mb-3">Pagamento</h2>
          <div className="grid grid-cols-2 gap-2">
            {payments.map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={payment === v}
                onClick={() => setPayment(v)}
                className={`btn ${payment === v ? "border-accent bg-accent/10 hover:bg-accent/10" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Aparece quando={payment === "dinheiro"} className="pt-3">
              <label className="label" htmlFor="change">Troco para (opcional)</label>
              <input id="change" name="changeFor" maxLength={12} inputMode="decimal" data-mascara="dinheiro" className="input" />
          </Aparece>
          <Aparece quando={payment === "pix" || payment === "cartao"} className="pt-3">
              <label className="label" htmlFor="cashPart">Parte em dinheiro (opcional)</label>
              <input id="cashPart" name="cashPart" inputMode="decimal" data-mascara="dinheiro" maxLength={12} className="input" placeholder="0,00" />
          </Aparece>
          <Aparece quando={payment === "fiado"} className="pt-3">
            <p className="text-sm text-muted">Fiado exige cliente identificado.</p>
          </Aparece>
          <details className="mt-3" open={descontoAberto || !!discount} onToggle={(e) => setDescontoAberto(e.currentTarget.open)}>
            <summary className="btn btn-sm tap cursor-pointer list-none">Dar desconto</summary>
            <div className="mt-2 space-y-2">
              <div>
                <label className="label" htmlFor="discount">Desconto em R$</label>
                <input id="discount" name="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} inputMode="decimal" data-mascara="dinheiro" maxLength={12} className="input" placeholder="0,00" />
              </div>
              <div>
                <label className="label" htmlFor="discountReason">Motivo</label>
                <input id="discountReason" name="discountReason" maxLength={160} required={discountCents > 0} className="input" placeholder="Ex.: cliente antigo, 10 galões" />
              </div>
              <Aparece quando={parsedDiscount > subtotal && subtotal > 0}>
                <p className="text-[13px] font-medium text-danger">O desconto é maior que o valor dos produtos ({formatBRL(subtotal)}).</p>
              </Aparece>
              <Aparece quando={overLimit}>
                <p className="text-[13px] font-medium text-warn-fg">Acima do seu limite de {discountLimitPct}%. Só o dono consegue lançar este desconto.</p>
              </Aparece>
            </div>
          </details>
          {/* no celular itens e total já estão na barra de baixo: o resumo inteiro (e a linha que o separava) fica no computador */}
          <div className="mt-5 border-t border-line pt-4 max-lg:hidden">
            {/* a lista fica sempre; sem item, só a margem some (junto com a última linha) */}
            <ul className={`text-sm transition-[margin] duration-[var(--dur)] ${items.length ? "mb-3" : ""}`}>
                {/* todos os produtos, recolhidos os que estão em zero: a linha entra e sai deslizando */}
                {products.map((p) => {
                  const q = qty[p.id] ?? 0;
                  return (
                    <li key={p.id} className="recolhe" data-aberto={q > 0 || undefined} aria-hidden={q === 0 || undefined}>
                      <span><span className="flex justify-between gap-2 pb-1">
                        <span>{q}× {p.name}</span>
                        <span className="num">{formatBRL(q * priceOf(p))}</span>
                      </span></span>
                    </li>
                  );
                })}
                <li className="recolhe" data-aberto={(items.length > 0 && feeCents > 0) || undefined} aria-hidden={!(items.length > 0 && feeCents > 0) || undefined}>
                  <span><span className="flex justify-between pb-1"><span>Entrega</span><span className="num">{formatBRL(feeCents)}</span></span></span>
                </li>
                <li className="recolhe" data-aberto={(items.length > 0 && discountCents > 0) || undefined} aria-hidden={!(items.length > 0 && discountCents > 0) || undefined}>
                  <span><span className="flex justify-between pb-1"><span>Desconto</span><span className="num">−{formatBRL(discountCents)}</span></span></span>
                </li>
              </ul>
            {/* no celular o total já está na barra de baixo, sempre à vista */}
            <p className="flex items-baseline justify-between max-lg:hidden">
              <span className="font-semibold">Total</span>
              <LiveNumber value={shownTotal} cents className="text-4xl font-semibold" />
            </p>
            {/* no celular quem lança é a barra de baixo, sempre à vista: aqui seria o mesmo botão duas vezes */}
            <button className="btn btn-primary mt-4 h-12 w-full text-lg max-lg:hidden" aria-disabled={!items.length} aria-describedby="lancar-dica" onClick={naoLancaVazio}>
              {mode === "balcao" ? "Registrar venda" : "Lançar pedido"}
            </button>
            <p id="lancar-dica" aria-live="polite" className={`mt-2 hidden text-center text-[13px] lg:block ${semProduto && !items.length ? "font-medium text-danger" : "text-muted"}`}>
              {semProduto && !items.length ? "Escolha ao menos um produto para lançar." : "Ctrl + Enter também lança"}
            </p>
          </div>
        </div>
      </aside>

      {/* no celular o total fica à vista enquanto se escolhe os produtos; o resumo completo segue no fim da página */}
      <div className="barra-pedido fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-line bg-bg/95 px-4 pt-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-muted">
            {unidades ? `${unidades} ${unidades === 1 ? "item" : "itens"}` : "Nenhum produto"}
          </p>
          <LiveNumber value={shownTotal} cents className="text-xl font-semibold" />
        </div>
        <button className="btn btn-primary h-12 shrink-0 px-5" aria-disabled={!items.length} aria-describedby="lancar-dica" onClick={naoLancaVazio}>
          {mode === "balcao" ? "Registrar venda" : "Lançar pedido"}
        </button>
      </div>
    </ActionForm>
  );
}
