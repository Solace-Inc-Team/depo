import { requireUser } from "@/lib/auth";
import { listProducts } from "@/domain/queries";
import { ActionForm } from "@/components/action-form";
import { saveProductAction } from "@/app/actions";
import { PageHeader } from "@/components/ui";
import { centsToInput } from "@/lib/money";
import { Alternar } from "@/components/controles";

export const metadata = { title: "Produtos e preços" };

type P = { id?: string; name?: string; priceCents?: number; containerPriceCents?: number; returnable?: boolean; minStock?: number; active?: boolean; precoSugerido?: boolean };

// no computador as linhas se alinham em colunas: o rótulo aparece só na primeira, as outras o têm para leitor de tela
function Fields({ p = {}, rotulos = true }: { p?: P; rotulos?: boolean }) {
  const k = p.id ?? "novo";
  const rotulo = rotulos ? "label" : "label lg:sr-only";
  return (
    <>
      <div className="col-span-2 lg:col-span-1">
        <label className={rotulo} htmlFor={`n-${k}`}>Nome</label>
        <input id={`n-${k}`} name="name" required defaultValue={p.name} className="input" />
      </div>
      <div>
        <label className={rotulo} htmlFor={`p-${k}`}>Preço</label>
        <input id={`p-${k}`} name="price" required inputMode="decimal" data-mascara="dinheiro" defaultValue={p.priceCents !== undefined ? centsToInput(p.priceCents) : ""} className="input" />
      </div>
      <div>
        <label className={rotulo} htmlFor={`c-${k}`}>Preço do vasilhame</label>
        <input id={`c-${k}`} name="containerPrice" inputMode="decimal" data-mascara="dinheiro" maxLength={12} defaultValue={p.containerPriceCents ? centsToInput(p.containerPriceCents) : ""} className="input" placeholder="0,00" />
      </div>
      <div>
        <label className={rotulo} htmlFor={`m-${k}`}>Estoque mínimo</label>
        <input id={`m-${k}`} name="minStock" type="number" inputMode="numeric" min={0} defaultValue={p.minStock ?? 0} className="input" />
      </div>
    </>
  );
}

// no computador a caixa tem a altura do campo, para o texto alinhar com os valores; no celular, altura de toque
const interruptor = "flex min-h-11 items-center gap-2 lg:min-h-9";
const Retornavel = ({ p = {} }: { p?: P }) => (
  <label className={interruptor}>
    <Alternar name="returnable" defaultChecked={p.returnable ?? true} /> Retornável
  </label>
);
// celular: duas colunas iguais, com os interruptores empilhados ao lado do estoque. Computador: as mesmas colunas
// nas linhas e no "Novo produto", para os campos ficarem uns embaixo dos outros
const grade = "grid grid-cols-2 items-start gap-3 lg:items-end lg:grid-cols-[minmax(0,1fr)_8rem_8rem_7rem_8rem_10rem]";

export default async function Produtos() {
  const user = await requireUser("dono");
  const products = await listProducts(user.tenantId);
  return (
    <>
      <PageHeader title="Produtos e preços" description="Preço novo vale só para os próximos pedidos. Salva sozinho ao sair do campo." />
      {/* a divisória vai na seção: cada linha é um formulário, e a borda no fieldset de dentro nunca aparecia */}
      <section className="panel mb-6 divide-y divide-line">
        {products.map((p, i) => (
          // cada linha salva sozinha ao sair do campo que mudou, como a caixa "Clientes podem pedir pelo link"
          <ActionForm key={p.id} action={saveProductAction} salvaAoMudar className={`${grade} p-4 ${p.active ? "" : "opacity-60"}`}>
            <input type="hidden" name="id" value={p.id} />
            <Fields p={p} rotulos={i === 0} />
            <div className="flex flex-col lg:contents">
              <Retornavel p={p} />
              <label className={interruptor}>
                <Alternar name="active" defaultChecked={p.active} /> À venda
              </label>
            </div>
            {/* preço que veio com o cadastro: se já está certo, um clique confirma (salvar tira a marca) */}
            {/* o aviso fica junto do botão: embaixo do preço ele empurrava só aquela coluna e desalinhava a linha */}
            {p.precoSugerido && (
              <span className="col-span-2 flex min-h-11 items-center gap-2 lg:col-span-full lg:min-h-9 lg:justify-end">
                <span className="text-[12px] whitespace-nowrap text-warn-fg">Preço sugerido</span>
                <button className="btn btn-sm tap">Preço certo</button>
              </span>
            )}
          </ActionForm>
        ))}
      </section>
      <section className="panel p-4">
        <h2 className="h2 mb-3">Novo produto</h2>
        <ActionForm action={saveProductAction} className={grade} reset>
          <Fields />
          <div className="flex flex-col lg:contents">
            <Retornavel />
          </div>
          <button className="btn btn-primary col-span-2 lg:col-span-1">Cadastrar produto</button>
        </ActionForm>
      </section>
    </>
  );
}
