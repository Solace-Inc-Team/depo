import { after } from "next/server";
import { conversar } from "@/domain/robo";
import { empresaDoNumeroWhats } from "@/domain/platform";
import { DomainError } from "@/lib/ctx";
import { attempt } from "@/lib/rate-limit";
import { siteUrl } from "@/lib/request";
import type { Saida } from "@/lib/robo";
import { assinaturaMetaOk, mensagemParaWhats, mensagensDoAviso, telefoneDoWhats } from "@/lib/whatsapp-api";

// Webhook do app "depo app" na Meta (WhatsApp Cloud API). A Meta chama aqui a cada mensagem que chega num número
// ligado a uma empresa (admin > Ligar WhatsApp); o robô responde pela mesma API. Configuração no Coolify:
// WHATSAPP_VERIFY_TOKEN (palavra combinada no cadastro do webhook), META_APP_SECRET (assina os avisos) e
// WHATSAPP_TOKEN (token do usuário do sistema, para responder).
const GRAPH = "https://graph.facebook.com/v25.0";

/** Cadastro do webhook: a Meta confere que o endereço é nosso devolvendo o desafio. */
export function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const palavra = process.env.WHATSAPP_VERIFY_TOKEN?.trim();
  if (palavra && q.get("hub.mode") === "subscribe" && q.get("hub.verify_token") === palavra) return new Response(q.get("hub.challenge") ?? "", { status: 200 });
  return new Response(null, { status: 403 });
}

export async function POST(req: Request) {
  const corpo = await req.text();
  // sem a assinatura do app, qualquer um poderia lançar pedido em nome de um cliente
  if (!assinaturaMetaOk(process.env.META_APP_SECRET?.trim() ?? "", corpo, req.headers.get("x-hub-signature-256"))) {
    console.warn("[whatsapp] aviso recusado: assinatura não confere");
    return new Response(null, { status: 401 });
  }
  let aviso: unknown;
  try {
    aviso = JSON.parse(corpo);
  } catch {
    return new Response(null, { status: 200 });
  }
  const mensagens = mensagensDoAviso(aviso);
  // só o número da Meta e o final do celular: o log não guarda o telefone do cliente inteiro
  for (const m of mensagens) console.info(`[whatsapp] mensagem recebida no número ${m.numeroId} de ...${m.de.slice(-4)}`);
  // responde já: a Meta repete o aviso se a resposta demora, e o robô pode levar alguns segundos
  if (mensagens.length) {
    const base = await siteUrl();
    after(async () => {
      for (const m of mensagens) {
        try {
          // a Meta pode mandar o mesmo aviso mais de uma vez: cada mensagem é respondida uma vez só
          if (await attempt(`wa-msg:${m.id}`, 1)) continue;
          const tenantId = await empresaDoNumeroWhats(m.numeroId);
          if (!tenantId) {
            console.warn(`[whatsapp] mensagem num número sem empresa ligada (${m.numeroId})`);
            continue;
          }
          const saidas = await conversar(tenantId, telefoneDoWhats(m.de), m.entrada, { base });
          await enviar(m.numeroId, m.de, saidas);
        } catch (e) {
          if (e instanceof DomainError) continue;
          console.error("[whatsapp] falhou ao responder:", (e as Error).message);
        }
      }
    });
  }
  return new Response(null, { status: 200 });
}

/** Manda as respostas em ordem (a segunda só depois da primeira, para não chegarem trocadas). */
async function enviar(numeroId: string, para: string, saidas: Saida[]) {
  const token = process.env.WHATSAPP_TOKEN?.trim();
  if (!token) {
    console.warn(`[whatsapp] sem WHATSAPP_TOKEN: ${saidas.length} resposta(s) não enviada(s)`);
    return;
  }
  for (const s of saidas) {
    const r = await fetch(`${GRAPH}/${numeroId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(mensagemParaWhats(para, s)),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) {
      console.error(`[whatsapp] Meta recusou a resposta (${r.status}): ${(await r.text()).slice(0, 300)}`);
      return;
    }
  }
  console.info(`[whatsapp] ${saidas.length} resposta(s) enviada(s) para ...${para.slice(-4)}`);
}
