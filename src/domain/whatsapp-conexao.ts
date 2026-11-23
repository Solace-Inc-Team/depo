import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { DomainError } from "@/lib/ctx";
import { formatarTelefone } from "@/lib/mascara";
import type { SessionUser } from "@/lib/auth";
import { audit } from "./stock";

// O dono liga o WhatsApp da loja ao robô sozinho: o depo cria a "instância" dele na Evolution API (WhatsApp por QR
// code), já com o webhook que traz as mensagens, e mostra o QR para ele ler com o celular da loja. Cada empresa tem
// uma instância só, com o nome guardado em tenants.whatsapp_numero_id.

export type ConexaoWhatsapp =
  | { estado: "sem" }
  | { estado: "conectando"; qr: string | null }
  | { estado: "conectado"; numero: string | null }
  /** ligado pela API oficial da Meta (ID só de dígitos, posto pelo admin): o dono não mexe */
  | { estado: "meta" };

function config() {
  const url = process.env.EVOLUTION_URL?.trim().replace(/\/$/, "");
  const chave = process.env.EVOLUTION_KEY?.trim();
  const webhook = process.env.EVOLUTION_WEBHOOK_CHAVE?.trim();
  if (!url || !chave || !webhook) throw new DomainError("A conexão do WhatsApp não está disponível agora. Fale com o suporte.");
  return { url, chave, webhook };
}

/** Chama a Evolution; 404 vira null (instância que não existe mais). */
async function evo<T>(caminho: string, init: RequestInit = {}): Promise<T | null> {
  const { url, chave } = config();
  const r = await fetch(`${url}${caminho}`, {
    ...init,
    headers: { apikey: chave, "Content-Type": "application/json", ...init.headers },
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });
  if (r.status === 404) return null;
  if (!r.ok) {
    console.error(`[whatsapp-conexao] Evolution ${caminho} respondeu ${r.status}: ${(await r.text()).slice(0, 300)}`);
    throw new DomainError("O WhatsApp não respondeu agora. Tente de novo em instantes.");
  }
  return (await r.json()) as T;
}

const nomeDaInstancia = (tenantId: string) => `loja-${tenantId.replace(/-/g, "").slice(0, 12)}`;

async function instanciaDa(tenantId: string) {
  const [t] = await db.select({ id: tenants.whatsappNumeroId }).from(tenants).where(eq(tenants.id, tenantId));
  return t?.id ?? null;
}

/** Como está o WhatsApp da loja; `qr`: busca um QR novo quando ainda não conectou (cada um vale uns 40 segundos). */
export async function conexaoWhatsapp(user: SessionUser, { qr = false } = {}): Promise<ConexaoWhatsapp> {
  if (user.role !== "dono") throw new DomainError("Só o dono conecta o WhatsApp.");
  const nome = await instanciaDa(user.tenantId);
  if (!nome) return { estado: "sem" };
  if (/^\d+$/.test(nome)) return { estado: "meta" };
  const e = await evo<{ instance?: { state?: string } }>(`/instance/connectionState/${encodeURIComponent(nome)}`);
  if (!e) return { estado: "sem" };
  if (e.instance?.state === "open") {
    const [i] = (await evo<{ ownerJid?: string | null }[]>(`/instance/fetchInstances?instanceName=${encodeURIComponent(nome)}`)) ?? [];
    const dig = i?.ownerJid?.split("@")[0] ?? "";
    return { estado: "conectado", numero: dig ? formatarTelefone(`+${dig}`) : null };
  }
  if (!qr) return { estado: "conectando", qr: null };
  const c = await evo<{ base64?: string }>(`/instance/connect/${encodeURIComponent(nome)}`);
  return { estado: "conectando", qr: c?.base64?.startsWith("data:image/") ? c.base64 : null };
}

/** Cria a instância da loja (se ainda não tem) com o webhook do robô, e devolve o QR para ler. */
export async function conectarWhatsapp(user: SessionUser, siteUrl: string): Promise<ConexaoWhatsapp> {
  if (user.role !== "dono") throw new DomainError("Só o dono conecta o WhatsApp.");
  const { webhook } = config();
  const atual = await instanciaDa(user.tenantId);
  if (atual && /^\d+$/.test(atual)) return { estado: "meta" };
  const nome = atual ?? nomeDaInstancia(user.tenantId);
  const existe = await evo(`/instance/connectionState/${encodeURIComponent(nome)}`);
  if (!existe)
    await evo("/instance/create", {
      method: "POST",
      body: JSON.stringify({
        instanceName: nome,
        integration: "WHATSAPP-BAILEYS",
        qrcode: true,
        // o robô só conversa com cliente: grupo e chamada ficam com o celular
        groupsIgnore: true,
        webhook: { url: `${siteUrl}/api/whatsapp/evolution?chave=${encodeURIComponent(webhook)}`, byEvents: false, base64: false, events: ["MESSAGES_UPSERT"] },
      }),
    });
  if (!atual)
    await db.transaction(async (tx) => {
      await tx.update(tenants).set({ whatsappNumeroId: nome }).where(eq(tenants.id, user.tenantId));
      await audit(tx, user, "whatsapp.conectar", "tenant", user.tenantId, { instancia: nome });
    });
  return conexaoWhatsapp(user, { qr: true });
}

/** Desliga o robô e solta o número: sai do WhatsApp no celular e apaga a instância. */
export async function desconectarWhatsapp(user: SessionUser) {
  if (user.role !== "dono") throw new DomainError("Só o dono conecta o WhatsApp.");
  const nome = await instanciaDa(user.tenantId);
  if (!nome || /^\d+$/.test(nome)) return;
  // sem conexão aberta o logout dá erro: o que importa é a instância sumir
  await evo(`/instance/logout/${encodeURIComponent(nome)}`, { method: "DELETE" }).catch(() => null);
  await evo(`/instance/delete/${encodeURIComponent(nome)}`, { method: "DELETE" });
  await db.transaction(async (tx) => {
    await tx.update(tenants).set({ whatsappNumeroId: null }).where(eq(tenants.id, user.tenantId));
    await audit(tx, user, "whatsapp.desconectar", "tenant", user.tenantId, { instancia: nome });
  });
}
