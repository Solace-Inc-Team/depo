import { formatBRL } from "./money.ts";

// Link do WhatsApp com a mensagem já escrita: abre a conversa no celular ou no computador e quem toca só envia.
// Sem API e sem custo: sai pelo WhatsApp que a loja já usa.

/**
 * null quando não é celular com DDD (o botão nem aparece, para ninguém mandar para o número errado). Telefone
 * fixo (10 dígitos, ou 11 sem o 9 depois do DDD) quase nunca tem WhatsApp e o link abriria uma conversa vazia.
 */
export function linkWhatsApp(telefone: string | null | undefined, texto?: string) {
  let d = (telefone ?? "").replace(/\D/g, "");
  if (d.length === 13 && d.startsWith("55")) d = d.slice(2);
  if (d.length !== 11 || d[2] !== "9") return null;
  const numero = `55${d}`;
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

const primeiro = (nome: string) => nome.trim().split(/\s+/)[0];

export const mensagemSaida = (p: { cliente: string; loja: string; numero: number; entregador: string | null; link: string }) =>
  `Olá, ${primeiro(p.cliente)}! Seu pedido #${p.numero} da ${p.loja} saiu para entrega${p.entregador ? ` com ${primeiro(p.entregador)}` : ""}. Acompanhe por aqui: ${p.link}`;

export const mensagemFiado = (p: { cliente: string; loja: string; devendoCents: number; pixKey: string | null }) =>
  [
    `Olá, ${primeiro(p.cliente)}! Aqui é da ${p.loja}.`,
    `Consta em aberto ${formatBRL(p.devendoCents)} das compras no fiado.`,
    p.pixKey?.trim() ? `Se puder, pague pelo Pix: ${p.pixKey.trim()}` : "",
    "Qualquer dúvida, é só responder. Obrigado!",
  ]
    .filter(Boolean)
    .join("\n");
