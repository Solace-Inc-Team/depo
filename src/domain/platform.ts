import { randomBytes } from "node:crypto";
import { z } from "zod";
import { and, desc, eq, gt, gte, isNull, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { assinaturaPagamentos, auditLog, avisosPlataforma, branches, products, sessions, tenantDeletions, tenants, users } from "@/db/schema";
import { DomainError } from "@/lib/ctx";
import { hashPassword } from "@/lib/password";
import type { SessionUser } from "@/lib/auth";
import { audit } from "./stock";
import { PLANO, somarDias } from "@/lib/plano";
import { todayISO } from "@/lib/period";

// Tudo aqui é da equipe da Solace e atravessa empresas, por isso não recebe Ctx de tenant.
function assertAdmin(admin: SessionUser) {
  if (!admin.platformAdmin) throw new DomainError("Sem permissão.");
}

export const newTenantSchema = z.object({
  company: z.string().trim().min(2, "Informe o nome da empresa.").max(120),
  ownerName: z.string().trim().min(2, "Informe o nome do dono.").max(80),
  email: z.email("E-mail inválido.").transform((e) => e.toLowerCase()),
  password: z.string().min(8, "A senha inicial precisa de ao menos 8 caracteres."),
});

/** Endereço do portal: nome sem acento + sufixo aleatório, para não colidir nem ser adivinhado de outra empresa. */
export const slugFor = (name: string) =>
  `${name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30)}-${randomBytes(3).toString("hex")}`;

export async function createTenant(admin: SessionUser, input: z.infer<typeof newTenantSchema>) {
  assertAdmin(admin);
  return (await novaEmpresa(input, admin.userId)).tenant;
}

/** Cadastro feito pelo próprio dono, na página pública: ele já aceita os termos ao criar. */
/** O que a revenda vende: decide os produtos que já nascem cadastrados. */
export const VENDE = ["agua", "gas", "ambos"] as const;
const PRODUTOS_INICIAIS = {
  agua: [{ name: "Galão de água 20L", priceCents: 1400, minStock: 10 }],
  gas: [
    { name: "Gás P13", priceCents: 11500, minStock: 10 },
    { name: "Gás P45", priceCents: 42000, minStock: 2 },
  ],
};

export const cadastroSchema = newTenantSchema.extend({
  vende: z.enum(VENDE, "Escolha o que a revenda vende."),
  ownerName: z.string().trim().min(2, "Informe seu nome.").max(80, "O nome pode ter até 80 letras."),
  company: z.string().trim().min(2, "Informe o nome da revenda.").max(120, "O nome pode ter até 120 letras."),
  password: z.string().min(8, "A senha precisa de ao menos 8 caracteres.").max(200),
});

export async function cadastrarEmpresa(input: z.infer<typeof cadastroSchema>, termsVersion: string) {
  const r = await novaEmpresa(input, null, termsVersion);
  // os produtos mais comuns já entram, com preço sugerido para o dono conferir nos primeiros passos
  const lista = input.vende === "ambos" ? [...PRODUTOS_INICIAIS.agua, ...PRODUTOS_INICIAIS.gas] : PRODUTOS_INICIAIS[input.vende];
  await db.insert(products).values(lista.map((p) => ({ ...p, tenantId: r.tenant.id, returnable: true, precoSugerido: true })));
  return r;
}

// empresa com a filial principal e o dono; quem registra na auditoria é o admin da Solace ou o próprio dono
async function novaEmpresa(input: z.infer<typeof newTenantSchema>, criadoPor: string | null, termsVersion?: string) {
  const passwordHash = await hashPassword(input.password);
  return db.transaction(async (tx) => {
    const [taken] = await tx.select({ id: users.id }).from(users).where(eq(users.email, input.email));
    if (taken) throw new DomainError("Já existe um usuário com este e-mail.");
    // quem se cadastra sozinho começa no teste grátis; quem a Solace cria fica sem cobrança automática
    const pagoAte = termsVersion ? somarDias(todayISO(), PLANO.diasGratis) : null;
    const [t] = await tx.insert(tenants).values({ name: input.company, slug: slugFor(input.company), pagoAte }).returning();
    await tx.insert(branches).values({ tenantId: t.id, name: "Principal", slug: "principal", main: true });
    const [owner] = await tx
      .insert(users)
      .values({
        tenantId: t.id,
        name: input.ownerName,
        email: input.email,
        role: "dono",
        passwordHash,
        ...(termsVersion && { termsVersion, termsAcceptedAt: new Date() }),
      })
      .returning({ id: users.id });
    await audit(tx, { tenantId: t.id, userId: criadoPor ?? owner.id }, criadoPor ? "empresa.criar" : "empresa.cadastro", "tenant", t.id, {
      ownerId: owner.id,
      email: input.email,
    });
    return { tenant: t, ownerId: owner.id };
  });
}

export async function setTenantActive(admin: SessionUser, tenantId: string, active: boolean) {
  assertAdmin(admin);
  if (tenantId === admin.tenantId) throw new DomainError("Não dá pra suspender a própria Solace.");
  await db.transaction(async (tx) => {
    const [t] = await tx.update(tenants).set({ active, suspendedAt: active ? null : new Date() }).where(eq(tenants.id, tenantId)).returning({ id: tenants.id });
    if (!t) throw new DomainError("Empresa não encontrada.");
    await audit(tx, { tenantId, userId: admin.userId }, active ? "empresa.reativar" : "empresa.suspender", "tenant", tenantId);
  });
}

/** Dono esqueceu a senha ou perdeu o celular do 2FA: senha nova e 2FA desligado. */
export async function resetOwnerAccess(admin: SessionUser, tenantId: string, password: string) {
  assertAdmin(admin);
  if (password.length < 8) throw new DomainError("A senha nova precisa de ao menos 8 caracteres.");
  const passwordHash = await hashPassword(password);
  return db.transaction(async (tx) => {
    const [owner] = await tx
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(and(eq(users.tenantId, tenantId), eq(users.role, "dono")))
      .orderBy(users.createdAt)
      .limit(1);
    if (!owner) throw new DomainError("Empresa sem dono cadastrado.");
    await tx.update(users).set({ passwordHash, totpEnabled: false, totpSecret: null }).where(eq(users.id, owner.id));
    await tx.delete(sessions).where(eq(sessions.userId, owner.id));
    await audit(tx, { tenantId, userId: admin.userId }, "empresa.redefinir_acesso_dono", "user", owner.id);
    return owner.email;
  });
}

/** Prazo da política de privacidade para apagar empresa cancelada. */
export const DELETE_DEADLINE_DAYS = 90;

/**
 * Apaga de vez todos os dados de uma empresa. Só empresa suspensa, com o nome digitado
 * para confirmar. Tudo numa transação: ou some tudo, ou nada muda.
 */
export async function deleteTenant(admin: SessionUser, tenantId: string, confirmName: string) {
  assertAdmin(admin);
  if (tenantId === admin.tenantId) throw new DomainError("A Solace não pode ser excluída.");
  return db.transaction(async (tx) => {
    const [t] = await tx.select().from(tenants).where(eq(tenants.id, tenantId)).for("update");
    if (!t) throw new DomainError("Empresa não encontrada.");
    if (t.active) throw new DomainError("Suspenda a empresa antes de excluir.");
    if (confirmName.trim() !== t.name) throw new DomainError("Digite o nome exato da empresa para confirmar.");

    const counts: Record<string, number> = {};
    const del = async (label: string, q: ReturnType<typeof sql>) => {
      const r = await tx.execute(q);
      counts[label] = (r as unknown as { count: number }).count;
    };
    // ordem pensada nas chaves estrangeiras: primeiro o que aponta para os outros
    await del("historico", sql`delete from audit_log where tenant_id = ${t.id}`);
    await del("pagamentos_fiado", sql`delete from customer_payments where tenant_id = ${t.id}`);
    await del("lancamentos_de_caixa", sql`delete from cash_entries where tenant_id = ${t.id}`);
    await del("comodato", sql`delete from container_loans where tenant_id = ${t.id}`);
    // a conta a pagar aponta para a despesa do pagamento e para o fornecedor: sai antes dos dois
    await del("contas_a_pagar", sql`delete from contas_pagar where tenant_id = ${t.id}`);
    await del("despesas", sql`delete from expenses where tenant_id = ${t.id}`);
    await del("movimentacoes_estoque", sql`delete from stock_movements where tenant_id = ${t.id}`);
    await del("itens_pedido", sql`delete from order_items where tenant_id = ${t.id}`);
    await del("pedidos", sql`delete from orders where tenant_id = ${t.id}`);
    await del("turnos", sql`delete from shifts where tenant_id = ${t.id}`);
    await del("conversas_whatsapp", sql`delete from conversas_whatsapp where tenant_id = ${t.id}`);
    await del("enderecos", sql`delete from customer_addresses where tenant_id = ${t.id}`);
    await del("clientes", sql`delete from customers where tenant_id = ${t.id}`);
    await del("produtos", sql`delete from products where tenant_id = ${t.id}`);
    await del("fornecedores", sql`delete from suppliers where tenant_id = ${t.id}`);
    await del("sessoes", sql`delete from sessions where user_id in (select id from users where tenant_id = ${t.id})`);
    await del(
      "tentativas_login",
      sql`delete from login_attempts
        where key like any (select 'login:' || email || ':%' from users where tenant_id = ${t.id})
           or key in (select p || id::text from users cross join (values ('totp:'), ('senha:')) as k(p) where tenant_id = ${t.id})`,
    );
    await del("usuarios", sql`delete from users where tenant_id = ${t.id}`);
    await del("mensalidades", sql`delete from assinatura_pagamentos where tenant_id = ${t.id}`);
    await del("filiais", sql`delete from branches where tenant_id = ${t.id}`);
    await tx.delete(tenants).where(eq(tenants.id, t.id));
    await tx.insert(tenantDeletions).values({ tenantId: t.id, tenantName: t.name, deletedBy: admin.email, counts });
    return counts;
  });
}

export async function listDeletions(admin: SessionUser) {
  assertAdmin(admin);
  return db.select().from(tenantDeletions).orderBy(desc(tenantDeletions.deletedAt)).limit(50);
}

export async function listTenants(admin: SessionUser) {
  assertAdmin(admin);
  const since = new Date(Date.now() - 30 * 864e5);
  return db
    .select({
      id: tenants.id,
      name: tenants.name,
      active: tenants.active,
      createdAt: tenants.createdAt,
      suspendedAt: tenants.suspendedAt,
      pagoAte: tenants.pagoAte,
      // nomes qualificados à mão: dentro da subquery o drizzle solta só "id", que viraria users.id
      owner: sql<string | null>`(select u.email from users u where u.tenant_id = tenants.id and u.role = 'dono' order by u.created_at limit 1)`,
      people: sql<number>`(select count(*)::int from users u where u.tenant_id = tenants.id and u.active)`,
      orders30: sql<number>`(select count(*)::int from orders o where o.tenant_id = tenants.id and o.created_at >= ${since.toISOString()})`,
      lastOrder: sql<string | null>`(select max(o.created_at) from orders o where o.tenant_id = tenants.id)`,
      // já pagou alguma mensalidade: sem isso, o "pago até" é o fim do teste grátis
      pagou: sql<boolean>`exists (select 1 from assinatura_pagamentos p where p.tenant_id = tenants.id and p.pago_em is not null)`,
      cartao: sql<boolean>`${tenants.mpAssinaturaId} is not null`,
      whatsappNumeroId: tenants.whatsappNumeroId,
    })
    .from(tenants)
    .where(sql`${tenants.id} <> ${admin.tenantId}`)
    .orderBy(desc(tenants.createdAt));
}

/** Cria a Solace e o primeiro admin a partir de ADMIN_EMAIL/ADMIN_PASSWORD, se ainda não existirem. */
export async function ensurePlatformAdmin(email: string, password: string) {
  const [exists] = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase()));
  if (exists) return false;
  const passwordHash = await hashPassword(password);
  await db.transaction(async (tx) => {
    const [t] = await tx.insert(tenants).values({ name: "Solace", slug: slugFor("Solace") }).returning();
    // toda empresa precisa de uma filial: sem ela o login não acha onde a pessoa trabalha
    await tx.insert(branches).values({ tenantId: t.id, name: "Principal", slug: "principal", main: true });
    await tx.insert(users).values({
      tenantId: t.id,
      name: "Administrador Solace",
      email: email.toLowerCase(),
      role: "dono",
      passwordHash,
      platformAdmin: true,
    });
  });
  return true;
}

/** Quanto entrou de mensalidade neste mês (Pix e cartão), de todas as empresas. */
export async function recebidoNoMes(admin: SessionUser) {
  assertAdmin(admin);
  const inicio = `${todayISO().slice(0, 8)}01`;
  const [r] = await db
    .select({ cents: sql<number>`coalesce(sum(${assinaturaPagamentos.valorCents}), 0)::int`, n: sql<number>`count(*)::int` })
    .from(assinaturaPagamentos)
    .where(gte(assinaturaPagamentos.pagoEm, new Date(`${inicio}T00:00:00-03:00`)));
  return r;
}

export const darDiasSchema = z.object({
  tenantId: z.uuid(),
  dias: z.coerce.number().int("Use um número inteiro de dias.").min(1, "Dê pelo menos 1 dia.").max(90, "No máximo 90 dias de uma vez."),
  motivo: z.string().trim().min(3, "Escreva o motivo, para o registro.").max(200),
});

/**
 * Atendimento: mais dias de acesso para uma empresa (teste estendido, Pix que deu problema, cortesia). Conta do
 * maior entre o vencimento e hoje, como a mensalidade, e fica registrado quem deu, quanto e por quê.
 */
export async function darDias(admin: SessionUser, input: z.infer<typeof darDiasSchema>) {
  assertAdmin(admin);
  const hoje = todayISO();
  return db.transaction(async (tx) => {
    const [t] = await tx.select({ pagoAte: tenants.pagoAte, name: tenants.name }).from(tenants).where(eq(tenants.id, input.tenantId));
    if (!t) throw new DomainError("Empresa não encontrada.");
    if (!t.pagoAte) throw new DomainError("Essa empresa não tem cobrança: o acesso dela não vence.");
    const ate = somarDias(t.pagoAte > hoje ? t.pagoAte : hoje, input.dias);
    await tx.update(tenants).set({ pagoAte: ate }).where(eq(tenants.id, input.tenantId));
    await audit(tx, { tenantId: input.tenantId, userId: admin.userId }, "assinatura.dias", "tenant", input.tenantId, { dias: input.dias, motivo: input.motivo, de: t.pagoAte, ate });
    return { nome: t.name, ate };
  });
}

export const whatsappSchema = z.object({
  tenantId: z.string().uuid(),
  // o Phone Number ID da Meta são só dígitos; vazio desliga
  numeroId: z.union([z.literal(""), z.string().regex(/^\d{6,30}$/, "O ID do número tem só dígitos, como aparece na Meta.")]),
});

/** Liga (ou desliga, com vazio) o número do WhatsApp da Cloud API ao robô de uma empresa. */
export async function ligarWhatsapp(admin: SessionUser, input: z.infer<typeof whatsappSchema>) {
  assertAdmin(admin);
  const numeroId = input.numeroId || null;
  return db.transaction(async (tx) => {
    if (numeroId) {
      const [outra] = await tx.select({ name: tenants.name }).from(tenants).where(and(eq(tenants.whatsappNumeroId, numeroId), sql`${tenants.id} <> ${input.tenantId}`));
      if (outra) throw new DomainError(`Esse número já está ligado a ${outra.name}.`);
    }
    const [t] = await tx.update(tenants).set({ whatsappNumeroId: numeroId }).where(eq(tenants.id, input.tenantId)).returning({ name: tenants.name });
    if (!t) throw new DomainError("Empresa não encontrada.");
    await audit(tx, { tenantId: input.tenantId, userId: admin.userId }, "whatsapp.numero", "tenant", input.tenantId, { numeroId });
    return t.name;
  });
}

/** A empresa dona do número que recebeu a mensagem (só empresa ativa responde). */
export async function empresaDoNumeroWhats(numeroId: string) {
  const [t] = await db.select({ id: tenants.id }).from(tenants).where(and(eq(tenants.whatsappNumeroId, numeroId), eq(tenants.active, true)));
  return t?.id ?? null;
}

/** As últimas liberações de dias, para o registro no painel. */
export async function listDiasDados(admin: SessionUser) {
  assertAdmin(admin);
  return db
    .select({ id: auditLog.id, empresa: tenants.name, por: users.name, data: auditLog.data, em: auditLog.createdAt })
    .from(auditLog)
    .innerJoin(tenants, eq(tenants.id, auditLog.tenantId))
    .leftJoin(users, eq(users.id, auditLog.userId))
    .where(eq(auditLog.action, "assinatura.dias"))
    .orderBy(desc(auditLog.createdAt))
    .limit(20);
}

/** O aviso da Solace em vigor para todas as empresas, ou nada. */
export async function avisoAtual() {
  const [a] = await db
    .select({ id: avisosPlataforma.id, texto: avisosPlataforma.texto, ate: avisosPlataforma.ate })
    .from(avisosPlataforma)
    .where(and(isNull(avisosPlataforma.removidoEm), or(isNull(avisosPlataforma.ate), gt(avisosPlataforma.ate, new Date()))))
    .orderBy(desc(avisosPlataforma.createdAt))
    .limit(1);
  return a ?? null;
}

export const avisoSchema = z.object({
  texto: z.string().trim().min(5, "Escreva o aviso.").max(160, "Até 160 caracteres: a faixa precisa caber numa linha."),
  // vazio: fica até tirar
  ate: z.union([z.literal(""), z.iso.date("Data inválida.")]),
});

/** Publica o aviso (substitui o anterior) e, com data, ele sai sozinho no fim daquele dia. */
export async function publicarAviso(admin: SessionUser, input: z.infer<typeof avisoSchema>) {
  assertAdmin(admin);
  if (input.ate && input.ate < todayISO()) throw new DomainError("A data já passou.");
  await db.transaction(async (tx) => {
    await tx.update(avisosPlataforma).set({ removidoEm: new Date() }).where(isNull(avisosPlataforma.removidoEm));
    await tx.insert(avisosPlataforma).values({
      texto: input.texto,
      // até o fim daquele dia, no horário de Brasília
      ate: input.ate ? new Date(Date.parse(`${input.ate}T00:00:00-03:00`) + 864e5) : null,
      criadoPor: admin.userId,
    });
  });
}

export async function tirarAviso(admin: SessionUser) {
  assertAdmin(admin);
  await db.update(avisosPlataforma).set({ removidoEm: new Date() }).where(isNull(avisosPlataforma.removidoEm));
}
