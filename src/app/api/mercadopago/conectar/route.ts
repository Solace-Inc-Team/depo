import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { COOKIE_MP, appMp, urlAutorizacao } from "@/lib/mercadopago";

// "Conectar com Mercado Pago": leva o dono à página de autorização do Mercado Pago. O `state` aleatório fica
// num cookie e precisa voltar igual no retorno, senão alguém poderia ligar a conta dele na empresa de outro.
export async function GET() {
  const user = await requireUser("dono");
  const app = appMp();
  if (!app) redirect("/?config=pagamentos&mp=indisponivel");
  const state = randomBytes(24).toString("base64url");
  (await cookies()).set(COOKIE_MP, `${state}.${user.userId}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/mercadopago",
    maxAge: 10 * 60,
  });
  redirect(urlAutorizacao(app, state));
}
