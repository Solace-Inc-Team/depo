import { NextResponse, type NextRequest } from "next/server";

// telas que só abrem logado. Sem cookie nenhum, o redirecionamento sai daqui com 307: na página ele vinha dentro do HTML
// com 200, porque o esqueleto de carregamento começa a ser enviado antes. Tela nova fora da lista só cai no caminho antigo
const PROTEGIDAS = new Set(["auditoria", "caixa", "clientes", "configuracoes", "despesas", "entregas", "equipe", "estoque", "exportar", "fiado", "fornecedores", "pedidos", "produtos", "relatorios", "whatsapp", "entregador", "admin"]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // quem chega na raiz sem sessão vê a apresentação; logado, cai direto no painel
  if (pathname === "/" && !request.cookies.has("sessao")) return NextResponse.rewrite(new URL("/inicio", request.url));
  if (!request.cookies.has("sessao") && PROTEGIDAS.has(pathname.split("/")[1])) {
    const login = new URL("/login", request.url);
    login.search = "";
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }
  // o endereço da tela segue para o servidor: se a sessão tiver vencido, o login volta para ela (requireUser)
  const headers = new Headers(request.headers);
  headers.set("x-caminho", pathname + search);
  return NextResponse.next({ request: { headers } });
}

// as páginas, sem os arquivos do Next, a API e arquivos com extensão (ícones, imagens)
export const config = { matcher: "/((?!_next/|api/|.*\\..*).*)" };
