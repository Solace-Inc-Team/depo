// Sugestão de entregador para cada pedido da fila. Pura, sem banco: recebe a fila e quem está em turno.
// 1. quem já leva pedido para o mesmo bairro; 2. senão, quem tem menos pedidos na rua (no empate, quem
// entregou menos no turno). A fila é vista em ordem: o pedido sugerido entra na rota de quem o recebeu, para
// o próximo do mesmo bairro ir junto e um de outro bairro não cair no mesmo entregador.

/** O bairro como está escrito: o pedaço depois do " - " ou da última vírgula ("Rua X, 10, Centro" -> "Centro"). */
export function bairroEscrito(endereco: string | null | undefined): string | null {
  if (!endereco) return null;
  const partes = endereco.includes(" - ") ? endereco.split(" - ") : endereco.split(",");
  if (partes.length < 2) return null;
  const ultimo = partes[partes.length - 1].trim();
  // número da casa ou vazio não é bairro
  return !ultimo || /^\d+[a-z]?$/i.test(ultimo) ? null : ultimo;
}

/** Bairro para comparar: sem acento, minúsculo ("Guamá" e "guama" são o mesmo). */
export function bairroDe(endereco: string | null | undefined): string | null {
  const ultimo = bairroEscrito(endereco);
  if (!ultimo) return null;
  return ultimo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export type EntregadorEmTurno = { id: string; nome: string; enderecosNaRua: (string | null)[]; entreguesNoTurno: number };
export type Sugestao = { entregadorId: string; motivo: "bairro" | "livre"; bairro?: string; bairroEscrito?: string };

export function sugerirEntregadores(fila: { id: string; endereco: string | null }[], entregadores: EntregadorEmTurno[]): Map<string, Sugestao> {
  const sugestoes = new Map<string, Sugestao>();
  if (!entregadores.length) return sugestoes;
  // rota de cada um como fica com as sugestões já feitas
  const rotas = new Map(entregadores.map((e) => [e.id, e.enderecosNaRua.map(bairroDe)]));
  for (const pedido of fila) {
    const bairro = bairroDe(pedido.endereco);
    const mesmoBairro = bairro ? entregadores.filter((e) => rotas.get(e.id)!.includes(bairro)) : [];
    const ordem = (lista: EntregadorEmTurno[]) =>
      [...lista].sort((a, b) => rotas.get(a.id)!.length - rotas.get(b.id)!.length || a.entreguesNoTurno - b.entreguesNoTurno);
    const escolhido = mesmoBairro.length ? ordem(mesmoBairro)[0] : ordem(entregadores)[0];
    sugestoes.set(
      pedido.id,
      mesmoBairro.length
        ? { entregadorId: escolhido.id, motivo: "bairro", bairro: bairro!, bairroEscrito: bairroEscrito(pedido.endereco)! }
        : { entregadorId: escolhido.id, motivo: "livre" },
    );
    rotas.get(escolhido.id)!.push(bairro);
  }
  return sugestoes;
}
