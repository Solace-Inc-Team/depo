import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // quem chega na raiz sem sessão vê a apresentação; logado, cai direto no painel
  if (pathname === "/" && !request.cookies.has("sessao")) return NextResponse.rewrite(new URL("/inicio", request.url));
  // o endereço da tela segue para o servidor: se a sessão tiver vencido, o login volta para ela (requireUser)
  const headers = new Headers(request.headers);
  headers.set("x-caminho", pathname + search);
  return NextResponse.next({ request: { headers } });
}

// as páginas, sem os arquivos do Next, a API e arquivos com extensão (ícones, imagens)
export const config = { matcher: "/((?!_next/|api/|.*\\..*).*)" };
