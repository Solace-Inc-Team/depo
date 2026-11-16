import { NextResponse, type NextRequest } from "next/server";
import { destroySession, getUser } from "@/lib/auth";
import { caminhoSeguro } from "@/lib/caminho";

// Cookie de uma sessão que não vale mais (venceu ou foi apagada): o proxy via o cookie e mandava a raiz para o
// painel, o painel mandava para o login, e a página inicial ficava inalcançável. Aqui o cookie velho é apagado.
// Sessão válida não é tocada: um link de outro site para cá não desloga ninguém.
export async function GET(request: NextRequest) {
  const venceu = !(await getUser());
  if (venceu) await destroySession();
  // o login avisa que a sessão venceu e, depois de entrar, volta para a tela de antes
  const url = new URL("/login", request.url);
  if (venceu) url.searchParams.set("expirou", "1");
  const next = caminhoSeguro(request.nextUrl.searchParams.get("next"));
  if (next) url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}
