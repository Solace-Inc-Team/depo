// O endereço é digitado em partes (CEP, rua, número, complemento, bairro) e guardado como uma linha só, no formato
// "Rua das Flores, 120, apto 3 - Marco": é o que o entregador lê na rota, no pedido e no robô. Para editar,
// a linha volta às partes; endereço antigo, digitado livre, cai inteiro na rua.

export type PartesEndereco = { rua: string; numero: string; complemento: string; bairro: string };

// " - " separa o bairro: dentro de uma parte vira "-", senão o bairro sairia errado na volta ("Bloco A - apto 3")
const limpa = (s: string) => s.replace(/\s+/g, " ").replace(/\s+-\s+/g, "-").replace(/[,-]+$/, "").trim();

export function juntarEndereco(p: PartesEndereco) {
  const rua = limpa(p.rua);
  if (!rua) return "";
  const numero = limpa(p.numero);
  const complemento = limpa(p.complemento);
  const bairro = limpa(p.bairro);
  return `${rua}${numero ? `, ${numero}` : ""}${complemento ? `, ${complemento}` : ""}${bairro ? ` - ${bairro}` : ""}`;
}

// número da casa: "120", "45A", "s/n", "km 3"
const pareceNumero = (s: string) => /^(\d|s\/?n\b|km\b)/i.test(s.trim());
// o que vem depois do número e é complemento, não bairro
const pareceComplemento = (s: string) => /^(ap|apto|apartamento|bl|bloco|casa|cs|fundos|frente|sala|sl|lote|lt|qd|quadra|andar|loja|box|conj|conjunto|torre|kit|kitnet|edif|edificio|edifício|condominio|condomínio|\d)/i.test(s.trim());

export function separarEndereco(linha: string | null | undefined): PartesEndereco {
  const vazio = { rua: "", numero: "", complemento: "", bairro: "" };
  const s = (linha ?? "").trim();
  if (!s) return vazio;
  // o bairro é o que vem depois do último " - "
  const corte = s.lastIndexOf(" - ");
  let antes = corte >= 0 ? s.slice(0, corte) : s;
  let bairro = corte >= 0 ? s.slice(corte + 3).trim() : "";
  const partes = antes.split(", ");
  // o número é a primeira parte (depois da rua) com cara de número: a rua pode ter vírgula ("Rua 7, Conjunto Maguari, 15")
  const i = partes.findIndex((x, n) => n > 0 && pareceNumero(x));
  // sem número reconhecível, a linha fica inteira na rua, como foi digitada
  if (i < 0) return { ...vazio, rua: s };
  const resto = partes.slice(i + 1);
  // formato antigo e o do robô: "Av. Brasil, 1500, Centro" (bairro depois de vírgula, sem " - ")
  if (!bairro && resto.length && !pareceComplemento(resto[resto.length - 1])) bairro = resto.pop()!.trim();
  antes = partes.slice(0, i).join(", ");
  return { rua: antes, numero: partes[i], complemento: resto.join(", "), bairro };
}
