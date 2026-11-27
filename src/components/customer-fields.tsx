import { TelefoneCliente } from "./aviso-telefone";
import { CamposEndereco } from "@/components/campos-endereco";

type C = { id?: string; name?: string; phone?: string; address?: string; cep?: string; reference?: string; notes?: string };

// na ordem em que se pergunta ao cliente: nome, telefone, onde entregar e como achar
export function CustomerFields({ c = {} }: { c?: C }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-name">Nome</label>
        <input id="c-name" name="name" required minLength={2} maxLength={120} defaultValue={c.name} className="input" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-phone">Telefone</label>
        <TelefoneCliente id="c-phone" name="phone" defaultValue={c.phone} className="input" outroQue={c.id} />
      </div>
      {/* a key remonta as partes quando o endereço salvo muda: sem ela, a janela reaberta voltava ao endereço de antes
          e o próximo salvamento gravava o antigo por cima */}
      <CamposEndereco key={`${c.address ?? ""}|${c.cep ?? ""}`} nome="address" id="c-end" inicial={c.address} cep={c.cep} className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-ref">Referência</label>
        <input id="c-ref" name="reference" maxLength={200} defaultValue={c.reference} className="input" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-notes">Observações</label>
        <input id="c-notes" name="notes" maxLength={500} defaultValue={c.notes} className="input" />
      </div>
    </>
  );
}
