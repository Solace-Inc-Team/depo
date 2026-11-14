type C = { name?: string; phone?: string; address?: string; reference?: string; notes?: string };

// na ordem em que se pergunta ao cliente: nome, telefone, onde entregar e como achar
export function CustomerFields({ c = {} }: { c?: C }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-name">Nome</label>
        <input id="c-name" name="name" required minLength={2} defaultValue={c.name} className="input" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-phone">Telefone</label>
        <input id="c-phone" name="phone" inputMode="tel" data-mascara="telefone" autoComplete="tel" placeholder="(11) 91111-1111" defaultValue={c.phone} className="input sm:max-w-56" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-addr">Endereço</label>
        <input id="c-addr" name="address" defaultValue={c.address} className="input" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-ref">Referência</label>
        <input id="c-ref" name="reference" defaultValue={c.reference} className="input" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-notes">Observações</label>
        <input id="c-notes" name="notes" defaultValue={c.notes} className="input" />
      </div>
    </>
  );
}
