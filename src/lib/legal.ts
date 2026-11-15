// Dados da Solace usados nos termos e na política de privacidade.
// Preencher antes do primeiro cliente e revisar o texto com um advogado.
export const company = {
  product: "Depósito",
  name: "Solace",
  legalName: "63.249.697 LEONARDO KENNEDY FERNANDES DE SOUSA",
  cnpj: "63.249.697/0001-59",
  email: "leonardoks2007@gmail.com",
  privacyEmail: "leonardoks2007@gmail.com",
  city: "Belém/PA",
};

/** Mudou o texto de forma relevante? Troque a versão: todo dono precisará aceitar de novo no próximo acesso. */
export const TERMS_VERSION = "2026-11-15";

export const termsDate = "15 de novembro de 2026";

/** Dias que a empresa tem para baixar os dados depois de cancelar, e prazo para apagar. */
export const EXPORT_WINDOW_DAYS = 30;
export const DELETE_AFTER_DAYS = 90;
/** A cópia fora do servidor (Cloudflare R2) guarda até 90 dias; a do próprio servidor, 30. */
export const BACKUP_RETENTION_DAYS = 90;
