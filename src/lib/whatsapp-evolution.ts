import { createHmac, timingSafeEqual } from "node:crypto";
import type { Entrada, Saida } from "./robo.ts";

// A ponte entre a Evolution API (WhatsApp ligado por QR code, sem a Meta) e o robô: lê o aviso de mensagem que ela
// manda e monta as respostas em texto, porque esse meio não mostra botões. Sem banco e sem rede, para dar para testar.

/**
 * A chave do webhook de uma instância: derivada do segredo e do nome dela, então quem vê o endereço de uma loja
 * não fala em nome de outra. Vai no endereço do webhook (?chave=).
 */
export const chaveDaInstancia = (segredo: string, instancia: string) => createHmac("sha256", segredo).update(instancia).digest("base64url").slice(0, 32);

/** O aviso veio da nossa Evolution: a chave combinada confere. */
export function chaveOk(esperada: string, recebida: string | null) {
  if (!esperada || !recebida) return false;
  const a = Buffer.from(esperada);
  const b = Buffer.from(recebida);
  return a.length === b.length && timingSafeEqual(a, b);
}

export type MensagemEvolution = { instancia: string; jid: string; telefone: string; id: string; entrada: Entrada };

type Aviso = {
  event?: string;
  instance?: string;
  data?: {
    key?: { remoteJid?: string; remoteJidAlt?: string; senderPn?: string; fromMe?: boolean; id?: string };
    message?: { conversation?: string; extendedTextMessage?: { text?: string } };
  };
};

/**
 * A mensagem do cliente que veio no aviso, ou null. Fica de fora: o que o próprio número mandou, grupo, status,
 * foto, áudio. Contato novo pode vir como "@lid" (id interno do WhatsApp): o celular de verdade vem no campo ao lado.
 */
export function mensagemDoAviso(aviso: unknown): MensagemEvolution | null {
  const a = aviso as Aviso;
  if (a?.event?.toLowerCase().replace("_", ".") !== "messages.upsert" || !a.instance) return null;
  const k = a.data?.key;
  const texto = a.data?.message?.conversation ?? a.data?.message?.extendedTextMessage?.text;
  if (!k?.remoteJid || !k.id || k.fromMe || !texto?.trim()) return null;
  // a resposta vai para remoteJid, então é ele quem diz quem é o cliente; o celular ao lado só vale para o @lid
  // (grupo e status com senderPn ficam de fora: a resposta iria para o grupo, falando de outra pessoa)
  const jidCelular = k.remoteJid.endsWith("@s.whatsapp.net")
    ? k.remoteJid
    : k.remoteJid.endsWith("@lid")
      ? [k.remoteJidAlt, k.senderPn].find((j) => j?.endsWith("@s.whatsapp.net"))
      : undefined;
  if (!jidCelular) return null;
  return { instancia: a.instance, jid: k.remoteJid, telefone: jidCelular.split("@")[0], id: k.id, entrada: { texto: texto.slice(0, 500) } };
}

/** Uma resposta do robô em texto: as opções viram uma lista numerada para o cliente responder com o número. */
export function textoParaWhats(s: Saida) {
  const ops =
    s.tipo === "botoes" ? s.botoes.map((b) => b.titulo) : s.tipo === "lista" ? s.itens.map((i) => (i.descricao ? `${i.titulo} · ${i.descricao}` : i.titulo)) : [];
  if (!ops.length) return s.texto;
  // quantidade: as opções já são os números, a lista "1 1 / 2 2" só atrapalha
  if (ops.every((o, i) => o === String(i + 1))) return `${s.texto}\n\n_Responda com o número._`;
  return `${s.texto}\n\n${ops.map((o, i) => `*${i + 1}* ${o}`).join("\n")}\n\n_Responda com o número._`;
}
