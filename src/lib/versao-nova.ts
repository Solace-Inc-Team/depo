import { unstable_isUnrecognizedActionError } from "next/navigation";

/**
 * A tela foi aberta antes de um deploy e mandou uma ação que o servidor novo não conhece mais. Recarrega a
 * tela para pegar a versão nova; devolve true se for o caso. Só uma vez a cada 30 segundos, para nunca ficar
 * recarregando em volta.
 */
export function recarregarSeVersaoNova(e: unknown, depoisMs = 0) {
  if (!unstable_isUnrecognizedActionError(e)) return false;
  try {
    const ultima = Number(sessionStorage.getItem("recarregou-versao") ?? 0);
    if (Date.now() - ultima < 30_000) return false;
    sessionStorage.setItem("recarregou-versao", String(Date.now()));
  } catch {}
  setTimeout(() => location.reload(), depoisMs);
  return true;
}
