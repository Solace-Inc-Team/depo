import { NextResponse, type NextRequest } from "next/server";
import { destroySession, getUser } from "@/lib/auth";

// Cookie de uma sessão que não vale mais (venceu ou foi apagada): o proxy via o cookie e mandava a raiz para o
// painel, o painel mandava para o login, e a página inicial ficava inalcançável. Aqui o cookie velho é apagado.
// Sessão válida não é tocada: um link de outro site para cá não desloga ninguém.
export async function GET(request: NextRequest) {
  if (!(await getUser())) await destroySession();
  return NextResponse.redirect(new URL("/login", request.url));
}
