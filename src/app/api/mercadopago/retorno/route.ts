import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { COOKIE_MP, appMp, trocarCodigoMp } from "@/lib/mercadopago";
import { conectarMercadoPagoOAuth } from "@/domain/pix";

const igual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

// Volta do Mercado Pago depois que o dono autorizou (ou desistiu). Só aceita o retorno do pedido que esta
// mesma pessoa começou: o `state` tem que bater com o cookie, que vale 10 minutos e é usado uma vez só.
export async function GET(req: Request) {
  const user = await requireUser("dono");
  const url = new URL(req.url);
  const jar = await cookies();
  const salvo = jar.get(COOKIE_MP)?.value ?? "";
  jar.delete({ name: COOKIE_MP, path: "/api/mercadopago" });

  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";
  const app = appMp();
  if (!app || !code || !state || !igual(salvo, `${state}.${user.userId}`)) redirect("/?config=pagamentos&mp=erro");

  let ok = false;
  try {
    await conectarMercadoPagoOAuth(user, await trocarCodigoMp(app, code));
    ok = true;
  } catch (e) {
    console.error("[mp] conexão pelo OAuth falhou:", (e as Error).message);
  }
  redirect(`/?config=pagamentos&mp=${ok ? "conectado" : "erro"}`);
}
