import { createHmac, timingSafeEqual } from "node:crypto";
import type { Entrada, Saida } from "./robo.ts";

// A ponte entre a API oficial do WhatsApp (Cloud API da Meta) e o robô: lê o aviso que a Meta manda a cada
// mensagem e monta as respostas no formato dela. Sem banco e sem rede, para dar para testar.

/** O aviso veio mesmo da Meta: X-Hub-Signature-256 é o HMAC do corpo com o segredo do app. */
export function assinaturaMetaOk(segredo: string, corpo: string, cabecalho: string | null) {
  if (!segredo || !cabecalho?.startsWith("sha256=")) return false;
  const esperado = Buffer.from(createHmac("sha256", segredo).update(corpo).digest("hex"));
  const recebido = Buffer.from(cabecalho.slice(7));
  return esperado.length === recebido.length && timingSafeEqual(esperado, recebido);
}

/**
 * Os 11 dígitos (DDD + número) do celular de quem escreveu. O WhatsApp manda celular brasileiro antigo sem o 9
 * ("55 11 8765-4321"): sem pôr o 9 de volta, o robô não acharia o cliente cadastrado.
 */
export function telefoneDoWhats(waId: string) {
  let d = waId.replace(/\D/g, "");
  if (d.startsWith("55") && (d.length === 12 || d.length === 13)) d = d.slice(2);
  if (d.length === 10 && /[6-9]/.test(d[2])) d = `${d.slice(0, 2)}9${d.slice(2)}`;
  return d;
}

export type MensagemRecebida = { numeroId: string; de: string; id: string; entrada: Entrada };

type Aviso = {
  entry?: {
    changes?: {
      field?: string;
      value?: {
        metadata?: { phone_number_id?: string };
        messages?: {
          from?: string;
          id?: string;
          type?: string;
          text?: { body?: string };
          interactive?: { button_reply?: { id?: string; title?: string }; list_reply?: { id?: string; title?: string } };
          button?: { payload?: string; text?: string };
        }[];
        statuses?: { status?: string; recipient_id?: string; errors?: { code?: number; title?: string }[] }[];
      };
    }[];
  }[];
};

/** As mensagens do cliente que vieram no aviso. Status de entrega, foto, áudio e o resto ficam de fora. */
export function mensagensDoAviso(aviso: unknown): MensagemRecebida[] {
  const saida: MensagemRecebida[] = [];
  for (const e of (aviso as Aviso)?.entry ?? [])
    for (const c of e.changes ?? []) {
      const numeroId = c.value?.metadata?.phone_number_id;
      if (c.field !== "messages" || !numeroId) continue;
      for (const m of c.value?.messages ?? []) {
        if (!m.from || !m.id) continue;
        const resposta = m.interactive?.button_reply ?? m.interactive?.list_reply;
        const entrada: Entrada | null =
          m.type === "text" && m.text?.body
            ? { texto: m.text.body.slice(0, 500) }
            : m.type === "interactive" && resposta?.id
              ? { id: resposta.id.slice(0, 100), texto: resposta.title?.slice(0, 100) }
              : m.type === "button" && (m.button?.payload || m.button?.text)
                ? { texto: (m.button.payload || m.button.text)!.slice(0, 100) }
                : null;
        if (entrada) saida.push({ numeroId, de: m.from, id: m.id, entrada });
      }
    }
  return saida;
}

/** Respostas que a Meta aceitou mas não conseguiu entregar: ela só avisa depois, no status "failed". */
export function falhasDoAviso(aviso: unknown) {
  const saida: { para: string; codigo?: number; motivo?: string }[] = [];
  for (const e of (aviso as Aviso)?.entry ?? [])
    for (const c of e.changes ?? [])
      for (const s of c.value?.statuses ?? [])
        if (s.status === "failed") saida.push({ para: s.recipient_id ?? "", codigo: s.errors?.[0]?.code, motivo: s.errors?.[0]?.title });
  return saida;
}

const corta = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/** Uma resposta do robô no formato da Cloud API (limites dela: 3 botões de 20 letras, lista de 10 itens). */
export function mensagemParaWhats(para: string, s: Saida) {
  const base = { messaging_product: "whatsapp", recipient_type: "individual", to: para };
  if (s.tipo === "botoes" && s.botoes.length)
    return {
      ...base,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: corta(s.texto, 1024) },
        action: { buttons: s.botoes.slice(0, 3).map((b) => ({ type: "reply", reply: { id: b.id.slice(0, 256), title: corta(b.titulo, 20) } })) },
      },
    };
  if (s.tipo === "lista" && s.itens.length)
    return {
      ...base,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: corta(s.texto, 4096) },
        action: {
          button: corta(s.botao, 20),
          sections: [{ rows: s.itens.slice(0, 10).map((i) => ({ id: i.id.slice(0, 200), title: corta(i.titulo, 24), ...(i.descricao ? { description: corta(i.descricao, 72) } : {}) })) }],
        },
      },
    };
  return { ...base, type: "text", text: { body: corta(s.texto, 4096), preview_url: true } };
}
