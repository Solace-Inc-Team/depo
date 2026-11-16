/**
 * Para onde voltar depois de entrar (?next=). Só caminhos deste site: "//outro.com" e "/\outro.com" o navegador
 * entende como outro endereço, e um link mal-intencionado mandaria a pessoa para fora logo depois do login.
 */
export function caminhoSeguro(v: unknown): string | null {
  if (typeof v !== "string" || v.length > 500) return null;
  if (!/^\/(?![/\\])/.test(v) || /[\u0000-\u001f]/.test(v)) return null;
  // voltar para o login (ou para sair) daria uma volta em círculo
  if (/^\/login(\/|\?|$)/.test(v)) return null;
  return v;
}
