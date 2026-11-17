import { assinaturaBloqueada, getUser, pendingTerms } from "@/lib/auth";
import { countOrdersByStatus } from "@/domain/queries";

// quantos pedidos esperam saída, para o selo de Entregas no menu se atualizar sem recarregar a tela
export async function GET() {
  const user = await getUser();
  if (!user || user.role === "entregador" || pendingTerms(user) || assinaturaBloqueada(user)) return new Response("Não autorizado", { status: 401 });
  const n = (await countOrdersByStatus(user.tenantId, user.branchId)).aberto ?? 0;
  return Response.json({ n }, { headers: { "Cache-Control": "no-store" } });
}
