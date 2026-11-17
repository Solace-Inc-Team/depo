import { and, asc, desc, eq, isNull, notInArray, sql } from "drizzle-orm";
import { db, withTenant, type Tx } from "@/db";
import { branches, conversasWhatsapp, customers, orderItems, orders, products, tenants, users } from "@/db/schema";
import { type Ctx, DomainError } from "@/lib/ctx";
import { formatBRL } from "@/lib/money";
import { responder, type Contexto, type Entrada, type Estado, type Item, type Pagamento, type Saida } from "@/lib/robo";
import { createOrder } from "./orders";
import { disponivelNaLoja } from "./stock";

// O robô do WhatsApp com o banco: acha o cliente pelo telefone, monta o que ele pode pedir, guarda onde a conversa
// parou e lança o pedido. A conversa em si (o que responder) está em lib/robo.ts.

/** Conversa parada há mais que isso começa de novo; com a loja atendendo, o robô fica quieto por mais tempo. */
const EXPIRA_MIN = 30;
const LOJA_MIN = 120;
// lança e desfaz: a tela de teste não deixa pedido nenhum
const DESFAZER = Symbol("desfazer");

/** Os 11 dígitos do telefone (DDD + número), venha como vier ("+55 (11) 9...", "5511..."). */
export function digitosTelefone(telefone: string) {
  const d = telefone.replace(/\D/g, "").slice(-11);
  if (d.length < 10) throw new DomainError("Telefone com DDD, como (11) 91111-1111.");
  return d;
}

/**
 * Responde a uma mensagem do cliente. `base` é o endereço do site (para os links de pedido e de acompanhamento);
 * `teste`: conversa da tela de teste, o pedido sai marcado para a loja saber que pode cancelar.
 */
export async function conversar(tenantId: string, telefone: string, entrada: Entrada, { base, teste = false }: { base: string; teste?: boolean }): Promise<Saida[]> {
  const tel = digitosTelefone(telefone);
  return withTenant(tenantId, () =>
    db.transaction(async (tx) => {
      // trava a conversa: dois toques seguidos em "Confirmar" não lançam dois pedidos (o segundo espera e já
      // encontra a conversa recomeçada)
      await tx.insert(conversasWhatsapp).values({ tenantId, telefone: tel, estado: null }).onConflictDoNothing();
      const [conversa] = await tx
        .select()
        .from(conversasWhatsapp)
        .where(and(eq(conversasWhatsapp.tenantId, tenantId), eq(conversasWhatsapp.telefone, tel)))
        .for("update");
      const parada = (Date.now() - conversa.atualizadoEm.getTime()) / 60e3;
      let estado: Estado | null = conversa.estado;
      if (estado && parada > (estado.etapa === "loja" ? LOJA_MIN : EXPIRA_MIN)) estado = null;

      const [loja] = await tx.select({ nome: tenants.name, slug: tenants.slug, portal: tenants.portalEnabled }).from(tenants).where(eq(tenants.id, tenantId));
      const [cliente] = await tx
        .select({ id: customers.id, nome: customers.name, endereco: customers.address, referencia: customers.reference })
        .from(customers)
        .where(
          and(
            eq(customers.tenantId, tenantId),
            isNull(customers.anonymizedAt),
            sql`right(regexp_replace(${customers.phone}, '\\D', '', 'g'), 11) = ${tel}`,
          ),
        )
        .orderBy(desc(customers.createdAt))
        .limit(1);
      // o último pedido de entrega que valeu: é o que se repete, e diz a filial, o endereço e a taxa
      const [ultimo] = cliente
        ? await tx
            .select({ id: orders.id, branchId: orders.branchId, pagamento: orders.paymentMethod, endereco: orders.address, referencia: orders.reference, taxa: orders.deliveryFeeCents })
            .from(orders)
            .where(and(eq(orders.tenantId, tenantId), eq(orders.customerId, cliente.id), notInArray(orders.status, ["cancelado", "estornado"]), sql`${orders.origin} <> 'balcao'`))
            .orderBy(desc(orders.createdAt))
            .limit(1)
        : [];
      const itens = ultimo
        ? await tx.select({ productId: orderItems.productId, quantity: orderItems.quantity, returnsEmpty: orderItems.returnsEmpty }).from(orderItems).where(eq(orderItems.orderId, ultimo.id))
        : [];
      const [principal] = await tx
        .select({ id: branches.id })
        .from(branches)
        .where(and(eq(branches.tenantId, tenantId), eq(branches.active, true)))
        .orderBy(desc(branches.main), asc(branches.createdAt))
        .limit(1);
      const branchId = ultimo?.branchId ?? principal.id;
      const lista = await tx
        .select({ id: products.id, nome: products.name, precoCents: products.priceCents, vasilhameCents: products.containerPriceCents, retornavel: products.returnable })
        .from(products)
        .where(and(eq(products.tenantId, tenantId), eq(products.active, true)))
        .orderBy(asc(products.name));
      const livre = await disponivelNaLoja(tx, tenantId, branchId, lista.map((p) => p.id));

      const endereco = ultimo?.endereco || cliente?.endereco || null;
      const referencia = (ultimo?.endereco ? ultimo.referencia : cliente?.referencia) ?? "";
      const ctx: Contexto = {
        loja: loja.nome,
        link: loja.portal ? `${base}/pedir/${loja.slug}` : null,
        cliente: cliente ? { nome: cliente.nome, endereco: cliente.endereco || null } : null,
        ultimo: ultimo && itens.length && endereco ? { itens, pagamento: ultimo.pagamento as Pagamento | "fiado", endereco } : null,
        taxaCents: ultimo?.taxa ?? 0,
        produtos: lista.map((p) => ({ ...p, disponivel: Math.max(0, livre.get(p.id) ?? 0) })),
      };

      let r = responder(estado, entrada, ctx);
      let saidas = r.saidas;
      if (r.lancar && cliente && endereco) {
        try {
          const dados = { customerId: cliente.id, ...r.lancar, taxaCents: ctx.taxaCents, endereco, referencia, teste };
          let texto: string;
          if (teste) {
            // a tela de teste confere tudo (estoque, preço, total) lançando de verdade num savepoint desfeito no
            // fim: nada cai em Entregas nem reserva estoque da loja
            let total = 0;
            await tx
              .transaction(async (sp) => {
                total = (await lancar(sp, tenantId, branchId, dados)).totalCents;
                throw DESFAZER;
              })
              .catch((e) => {
                if (e !== DESFAZER) throw e;
              });
            texto = `Pedido #N anotado! Total ${formatBRL(total)}.\nAcompanhe a entrega por aqui: (link do pedido)\n\n(Teste: na conversa real o pedido cai em Entregas. Este não foi lançado.)`;
          } else {
            const pedido = await lancar(tx, tenantId, branchId, dados);
            texto = `Pedido #${pedido.number} anotado! Total ${formatBRL(pedido.totalCents)}.\nAcompanhe a entrega por aqui: ${base}/pedir/${loja.slug}/acompanhar/${pedido.trackingId}`;
          }
          saidas = [{ tipo: "texto", texto }];
        } catch (e) {
          if (!(e instanceof DomainError)) throw e;
          // acabou o produto, preço mudou...: diz o motivo e volta ao começo
          r = responder(null, {}, ctx);
          saidas = [{ tipo: "texto", texto: e.message }, ...r.saidas];
        }
      }
      await tx.update(conversasWhatsapp).set({ estado: r.estado, atualizadoEm: new Date() }).where(eq(conversasWhatsapp.id, conversa.id));
      return saidas;
    }),
  );
}

async function lancar(
  tx: Tx,
  tenantId: string,
  branchId: string,
  p: { customerId: string; itens: Item[]; pagamento: Pagamento; taxaCents: number; endereco: string; referencia: string; teste: boolean },
) {
  // como no pedido do site: fica em nome do dono, e a origem "whatsapp" mostra de onde veio
  const [dono] = await tx
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.tenantId, tenantId), eq(users.role, "dono"), eq(users.active, true)))
    .orderBy(asc(users.createdAt))
    .limit(1);
  if (!dono) throw new DomainError("Esta loja não está recebendo pedidos agora.");
  const ctx: Ctx = { tenantId, userId: dono.id, role: "dono", branchId };
  return createOrder(ctx, {
    mode: "entrega",
    exigirEstoque: true,
    customerId: p.customerId,
    items: p.itens,
    paymentMethod: p.pagamento,
    deliveryFeeCents: p.taxaCents,
    changeForCents: null,
    address: p.endereco,
    reference: p.referencia,
    notes: p.teste ? "Teste do robô do WhatsApp: pode cancelar" : "Pedido pelo robô do WhatsApp",
    driverId: null,
    origin: "whatsapp",
  });
}

/** Tela de teste: apaga onde a conversa parou, para começar do zero. */
export async function recomecarConversa(tenantId: string, telefone: string) {
  const tel = digitosTelefone(telefone);
  await withTenant(tenantId, () => db.delete(conversasWhatsapp).where(and(eq(conversasWhatsapp.tenantId, tenantId), eq(conversasWhatsapp.telefone, tel))));
}

/** Clientes com telefone, para escolher com quem simular na tela de teste. */
export const clientesParaTeste = (tenantId: string) =>
  withTenant(tenantId, () =>
    db
      .select({ id: customers.id, nome: customers.name, telefone: customers.phone })
      .from(customers)
      .where(and(eq(customers.tenantId, tenantId), isNull(customers.anonymizedAt), sql`${customers.phone} <> ''`))
      .orderBy(asc(customers.name))
      .limit(200),
  );
