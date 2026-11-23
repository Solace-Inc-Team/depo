import { after } from "next/server";
import { conversar } from "@/domain/robo";
import { empresaDoNumeroWhats } from "@/domain/platform";
import { DomainError } from "@/lib/ctx";
import { attempt } from "@/lib/rate-limit";
import { siteUrl } from "@/lib/request";
import { telefoneDoWhats } from "@/lib/whatsapp-api";
import { chaveOk, mensagemDoAviso, textoParaWhats } from "@/lib/whatsapp-evolution";

// Webhook da Evolution API (WhatsApp ligado por QR code, sem a Meta). Cada número é uma "instância" da Evolution;
// no admin, "Ligar WhatsApp" da empresa recebe o nome da instância. Configuração no Coolify:
// EVOLUTION_URL (endereço da Evolution), EVOLUTION_KEY (chave dela, para responder) e EVOLUTION_WEBHOOK_CHAVE
// (vai no endereço do webhook: /api/whatsapp/evolution?chave=...).
// Só responde quem escreveu: nunca manda mensagem primeiro, para o número não ser bloqueado.

export async function POST(req: Request) {
  if (!chaveOk(process.env.EVOLUTION_WEBHOOK_CHAVE?.trim() ?? "", new URL(req.url).searchParams.get("chave"))) return new Response(null, { status: 401 });
  let aviso: unknown;
  try {
    aviso = await req.json();
  } catch {
    return new Response(null, { status: 200 });
  }
  const m = mensagemDoAviso(aviso);
  if (!m) return new Response(null, { status: 200 });
  console.info(`[whatsapp-evo] mensagem na instância ${m.instancia} de ...${m.telefone.slice(-4)}`);
  const base = await siteUrl();
  after(async () => {
    try {
      // o mesmo aviso pode chegar duas vezes: cada mensagem é respondida uma vez só
      if (await attempt(`wa-msg:${m.id}`, 1)) return;
      const tenantId = await empresaDoNumeroWhats(m.instancia);
      if (!tenantId) return console.warn(`[whatsapp-evo] instância sem empresa ligada (${m.instancia})`);
      const saidas = await conversar(tenantId, telefoneDoWhats(m.telefone), m.entrada, { base });
      await enviar(m.instancia, m.jid, saidas.map(textoParaWhats));
    } catch (e) {
      if (!(e instanceof DomainError)) console.error("[whatsapp-evo] falhou ao responder:", (e as Error).message);
    }
  });
  return new Response(null, { status: 200 });
}

/** Manda as respostas em ordem, com "digitando..." antes de cada uma (resposta instantânea parece robô). */
async function enviar(instancia: string, para: string, textos: string[]) {
  const url = process.env.EVOLUTION_URL?.trim().replace(/\/$/, "");
  const chave = process.env.EVOLUTION_KEY?.trim();
  if (!url || !chave) return console.warn(`[whatsapp-evo] sem EVOLUTION_URL/EVOLUTION_KEY: ${textos.length} resposta(s) não enviada(s)`);
  for (const text of textos) {
    const r = await fetch(`${url}/message/sendText/${encodeURIComponent(instancia)}`, {
      method: "POST",
      headers: { apikey: chave, "Content-Type": "application/json" },
      body: JSON.stringify({ number: para, text, delay: 1200 + Math.min(text.length * 15, 1800) }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!r.ok) return console.error(`[whatsapp-evo] Evolution recusou a resposta (${r.status}): ${(await r.text()).slice(0, 300)}`);
  }
  console.info(`[whatsapp-evo] ${textos.length} resposta(s) enviada(s) para ...${para.split("@")[0].slice(-4)}`);
}
