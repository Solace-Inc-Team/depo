// O endereço é digitado em partes (CEP, rua, número, complemento, bairro) e guardado como uma linha só, no formato
// "Rua das Flores, 120, apto 3 - Marco": é o que o entregador lê na rota, no pedido e no robô. Para editar,
// a linha volta às partes; endereço antigo, digitado livre, cai inteiro na rua.

export type PartesEndereco = { rua: string; numero: string; complemento: string; bairro: string };

const limpa = (s: string) => s.replace(/\s+/g, " ").replace(/[,-]+$/, "").trim();

export function juntarEndereco(p: PartesEndereco) {
  const rua = limpa(p.rua);
  if (!rua) return "";
  const numero = limpa(p.numero);
  const complemento = limpa(p.complemento);
  const bairro = limpa(p.bairro);
  return `${rua}${numero ? `, ${numero}` : ""}${complemento ? `, ${complemento}` : ""}${bairro ? ` - ${bairro}` : ""}`;
}

export function separarEndereco(linha: string | null | undefined): PartesEndereco {
  const vazio = { rua: "", numero: "", complemento: "", bairro: "" };
  const s = (linha ?? "").trim();
  if (!s) return vazio;
  const [antes, ...depois] = s.split(" - ");
  const bairro = depois.join(" - ");
  const [rua, numero, ...resto] = antes.split(", ");
  // só confia na separação se o número parece número ("120", "45A", "s/n", "km 3")
  if (!numero || !/^(\d|s\/?n\b|km\b)/i.test(numero)) return { ...vazio, rua: s };
  return { rua, numero, complemento: resto.join(", "), bairro };
}
