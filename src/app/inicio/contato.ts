import { PLANO } from "@/lib/plano";

// Contato e preço da página inicial. Enquanto estiverem vazios, a página não mostra botão de WhatsApp
// nem valor: fica o "Criar conta" e o preço sob consulta.

/** WhatsApp da Solace só com dígitos, com DDI e DDD (ex.: 5511999998888). */
export const WHATSAPP = "";

/** Preço por mês como deve aparecer (ex.: "R$ 149"). Vazio mostra "sob consulta". */
export const PRECO = `R$ ${PLANO.mensalCents / 100}`;

/** Dias de uso grátis depois do cadastro. */
export const DIAS_GRATIS = PLANO.diasGratis;

export const linkWhatsApp = (texto: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
