// Máscaras dos campos: as mesmas regras no navegador (formata enquanto digita) e no servidor (valida e guarda
// sempre no mesmo formato). Funções puras, sem nada de tela.

const digitos = (v: string) => v.replace(/\D/g, "");

/** (11) 91111-1111, (11) 3333-4444 ou 0800 123 4567; aceita o número pela metade enquanto a pessoa digita. */
export function formatarTelefone(v: string): string {
  let d = digitos(v);
  // com o código do país (+55 11 9..., colado ou digitado com o +): o 55 sai
  if ((d.length > 11 || v.trim().startsWith("+")) && d.startsWith("55")) d = d.slice(2);
  if (d.startsWith("0800")) {
    d = d.slice(0, 11);
    return [d.slice(0, 4), d.slice(4, 7), d.slice(7)].filter(Boolean).join(" ");
  }
  d = d.slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = `(${d.slice(0, 2)}) `;
  const resto = d.slice(2);
  // celular tem 9 dígitos depois do DDD (5 + 4); fixo, 8 (4 + 4)
  const corte = resto.length > 8 ? 5 : 4;
  return resto.length > corte ? `${ddd}${resto.slice(0, corte)}-${resto.slice(corte)}` : `${ddd}${resto}`;
}

/** Telefone completo: com DDD (10 ou 11 dígitos) ou 0800. Vazio também vale; quem exige é o formulário. */
export function telefoneValido(v: string): boolean {
  let d = digitos(v);
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  // vazio de verdade vale; texto sem número nenhum ("abc") não
  if (!v.trim()) return true;
  return d.length === 10 || d.length === 11;
}

/** Valor em reais enquanto digita: só números, pontos, uma vírgula e no máximo dois centavos. */
export function formatarDinheiro(v: string): string {
  // o ponto fica como foi digitado: tecla por tecla, "1.2" ainda pode virar "1.250" (milhar) ou "1.25"
  // (centavos de quem usa ponto). Quem decide é o parseBRL, com o valor inteiro
  const s = v.replace(/[^\d.,]/g, "");
  const [inteiro, ...resto] = s.split(",");
  return resto.length ? `${inteiro},${resto.join("").replace(/\./g, "").slice(0, 2)}` : inteiro;
}

/** Só números (códigos de verificação). */
export const somenteNumeros = (v: string) => digitos(v);

/** CEP como 66810-100, enquanto digita. */
export function formatarCep(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}
