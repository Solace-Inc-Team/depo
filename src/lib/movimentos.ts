// Histórico de estoque: uma saída de pedido grava duas linhas (sai da loja, entra com o entregador). Na tela
// isso virava dois cartões para uma coisa só. Aqui cada par vira uma linha "de → para".

type Mov = {
  id: string;
  productName: string;
  state: string;
  quantity: number;
  reason: string;
  driverName: string | null;
  createdAt: Date;
};

export type Linha<M extends Mov> = M & { de?: string; para?: string };

const onde = (m: Mov) => m.driverName ?? "Loja";

/** Junta as duas pontas de cada movimento entre lugares; o resto passa como está. */
export function juntarTransferencias<M extends Mov>(moves: M[]): Linha<M>[] {
  const usadas = new Set<string>();
  const saida: Linha<M>[] = [];
  for (const m of moves) {
    if (usadas.has(m.id)) continue;
    // a outra ponta: mesma operação (mesmo instante, produto, estado e motivo), quantidade oposta, outro lugar
    const par = moves.find(
      (o) =>
        !usadas.has(o.id) &&
        o.id !== m.id &&
        o.quantity === -m.quantity &&
        o.createdAt.getTime() === m.createdAt.getTime() &&
        o.productName === m.productName &&
        o.state === m.state &&
        o.reason === m.reason &&
        onde(o) !== onde(m),
    );
    if (!par || m.quantity === 0) {
      saida.push(m);
      continue;
    }
    usadas.add(m.id).add(par.id);
    const [sai, entra] = m.quantity < 0 ? [m, par] : [par, m];
    saida.push({ ...entra, de: onde(sai), para: onde(entra) });
  }
  return saida;
}
