import webpush from "web-push";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { db, tenantTransaction, withTenant } from "@/db";
import { avisosPedido, orders, tenants, users } from "@/db/schema";
import { DomainError } from "@/lib/ctx";

// Notificação no celular de quem pediu pelo site (web push): o cliente aceita na página do pedido e o
// celular avisa quando o Pix cai, quando sai para entrega e quando é entregue, mesmo com a página fechada.
// Sem as chaves VAPID no ambiente, nada é guardado nem enviado (e o botão nem aparece).

// lidas na hora de usar: o ambiente pode ser preenchido depois de o módulo carregar (testes, recarga do .env)
const chaves = () => ({ publica: process.env.NEXT_PUBLIC_VAPID_PUBLICA ?? "", privada: process.env.VAPID_PRIVADA ?? "" });
export const avisosLigados = () => !!(chaves().publica && chaves().privada);

// os testes trocam o envio por um de mentira, como fazem com a rede do Mercado Pago
let enviar: typeof webpush.sendNotification = (...a) => webpush.sendNotification(...a);
export const usarEnvio = (f: typeof webpush.sendNotification) => void (enviar = f);

// só os serviços de push dos navegadores: a inscrição vem de página pública, e o servidor faz POST no endereço
const PUSH = ["fcm.googleapis.com", "push.services.mozilla.com", "notify.windows.com", "push.apple.com"];
const ehPush = (u: string) => {
  try {
    const h = new URL(u).hostname;
    return PUSH.some((d) => h === d || h.endsWith("." + d));
  } catch {
    return false;
  }
};

export const inscricaoSchema = z.object({
  endpoint: z.url().startsWith("https://").max(1000).refine(ehPush, "Serviço de aviso desconhecido."),
  keys: z.object({ p256dh: z.string().min(20).max(200), auth: z.string().min(8).max(100) }),
});

/** Guarda o celular que quer ser avisado deste pedido (quem chama já conferiu que o pedido é dele). */
export async function salvarInscricao(tenantId: string, orderId: string, bruto: unknown) {
  if (!avisosLigados()) throw new DomainError("Avisos desligados nesta instalação.");
  const sub = inscricaoSchema.parse(bruto);
  await tenantTransaction({ tenantId }, async (tx) => {
    // um pedido não precisa de mais que alguns celulares avisados (quem pediu e alguém da casa)
    const [{ n }] = await tx.select({ n: count() }).from(avisosPedido).where(and(eq(avisosPedido.tenantId, tenantId), eq(avisosPedido.orderId, orderId)));
    if (n >= 5) throw new DomainError("Este pedido já avisa celulares demais.");
    await tx.insert(avisosPedido).values({ tenantId, orderId, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth }).onConflictDoNothing();
  });
}

export type EventoPedido = "pago" | "saiu" | "entregue" | "nao_entregue" | "cancelado";
const fim: EventoPedido[] = ["entregue", "cancelado"];

/**
 * Avisa os celulares inscritos no pedido. Nunca derruba quem chamou: roda depois da mudança já gravada e
 * qualquer falha só vai para o log. Inscrição que o navegador desfez (404/410) sai do banco; ao terminar o
 * pedido, todas saem.
 */
export async function avisarCliente(tenantId: string, orderId: string, evento: EventoPedido) {
  if (!avisosLigados()) return;
  try {
    const dados = await withTenant(tenantId, async () => {
      const subs = await db.select().from(avisosPedido).where(and(eq(avisosPedido.tenantId, tenantId), eq(avisosPedido.orderId, orderId)));
      if (!subs.length) return null;
      const [o] = await db
        .select({ number: orders.number, trackingId: orders.trackingId, loja: tenants.name, slug: tenants.slug, entregador: users.name })
        .from(orders)
        .innerJoin(tenants, eq(tenants.id, orders.tenantId))
        .leftJoin(users, eq(users.id, orders.driverId))
        .where(and(eq(orders.tenantId, tenantId), eq(orders.id, orderId)));
      return o ? { subs, o } : null;
    });
    if (!dados) return;
    const { subs, o } = dados;
    const quem = o.entregador ? ` com ${o.entregador.split(" ")[0]}` : "";
    const texto: Record<EventoPedido, string> = {
      pago: "Pix confirmado. A loja está separando seu pedido.",
      saiu: `Saiu para entrega${quem}.`,
      entregue: "Pedido entregue. Obrigado!",
      nao_entregue: "Não conseguimos entregar. A loja vai combinar com você.",
      cancelado: "Pedido cancelado.",
    };
    const payload = JSON.stringify({
      title: `${o.loja}: pedido #${o.number}`,
      body: texto[evento],
      url: `/pedir/${o.slug}/acompanhar/${o.trackingId}`,
      tag: `pedido-${o.number}`,
    });
    const site = process.env.APP_URL || "http://localhost:3000";
    const mortas: string[] = [];
    await Promise.all(
      subs.map((s) =>
        enviar({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, {
            vapidDetails: { subject: site.startsWith("https://") ? site : "mailto:avisos@deposito.app", publicKey: chaves().publica, privateKey: chaves().privada },
            TTL: 60 * 60,
          })
          .catch((e: { statusCode?: number; message?: string }) => {
            if (e.statusCode === 404 || e.statusCode === 410) mortas.push(s.id);
            else console.error(`[aviso] pedido ${orderId}: ${e.statusCode ?? ""} ${e.message ?? e}`);
          }),
      ),
    );
    const sair = fim.includes(evento) ? subs.map((s) => s.id) : mortas;
    if (sair.length)
      await tenantTransaction({ tenantId }, async (tx) => {
        for (const id of sair) await tx.delete(avisosPedido).where(and(eq(avisosPedido.tenantId, tenantId), eq(avisosPedido.id, id)));
      });
  } catch (e) {
    console.error(`[aviso] pedido ${orderId} sem aviso:`, (e as Error).message);
  }
}
