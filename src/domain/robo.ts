import { and, asc, desc, eq, isNull, notInArray, sql } from "drizzle-orm";
import { db, withTenant, type Tx } from "@/db";
import { branches, conversasWhatsapp, customers, orderItems, orders, products, tenants, users } from "@/db/schema";
import { type Ctx, DomainError } from "@/lib/ctx";
import { formatBRL } from "@/lib/money";
import { formatarTelefone } from "@/lib/mascara";
import { responder, type Contexto, type Entrada, type Estado, type Item, type Pagamento, type Saida } from "@/lib/robo";
import { criarPedidoNaTx, newOrderSchema } from "./orders";
import { disponivelNaLoja } from "./stock";

// O robô do WhatsApp com o banco: acha o cliente pelo telefone, monta o que ele pode pedir, guarda onde a conversa
// parou e lança o pedido. A conversa em si (o que responder) está em lib/robo.ts.

/** Conversa parada há mais que isso começa de novo; com a loja atendendo, o robô fica quieto por mais tempo. */
const EXPIRA_MIN = 30;
const LOJA_MIN = 120;
// lança e desfaz: a tela de teste não deixa pedido nenhum
const DESFAZER = Symbol("desfazer");

/** DDD + número (11 dígitos no celular, 10 no fixo), venha como vier ("+55 (11) 9...", "5511..."). */
export function digitosTelefone(telefone: string) {
  let d = telefone.replace(/\D/g, "");
  // o 55 do Brasil sai: sem isso, o fixo "55 91 3222-1111" virava "5913222..." e não achava o cliente
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(-11);
  if (d.length < 10) throw new DomainError("Telefone com DDD, como (11) 91111-1111.");
  return d;
}

/** Onde fica a conversa: a da tela de teste é separada, para o teste do dono não mexer na do cliente de verdade. */
const chaveConversa = (tel: string, teste: boolean) => (teste ? `teste:${tel}` : tel);

/**
 * Responde a uma mensagem do cliente. `base` é o endereço do site (para os links de pedido e de acompanhamento);
 * `teste`: conversa da tela de teste, o pedido sai marcado para a loja saber que pode cancelar.
 */
export async function conversar(tenantId: string, telefone: string, entrada: Entrada, { base, teste = false }: { base: string; teste?: boolean }): Promise<Saida[]> {
  const tel = digitosTelefone(telefone);
  const chave = chaveConversa(tel, teste);
  // fixo, ou celular cadastrado do jeito antigo, sem o 9 ("(91) 8474-7881"): os 10 dígitos
  const tel10 = tel.length === 11 && tel[2] === "9" ? tel.slice(0, 2) + tel.slice(3) : tel;
  return withTenant(tenantId, () =>
    db.transaction(async (tx) => {
      // trava a conversa: dois toques seguidos em "Confirmar" não lançam dois pedidos (o segundo espera e já
      // encontra a conversa recomeçada)
      await tx.insert(conversasWhatsapp).values({ tenantId, telefone: chave, estado: null }).onConflictDoNothing();
      const [conversa] = await tx
        .select()
        .from(conversasWhatsapp)
        .where(and(eq(conversasWhatsapp.tenantId, tenantId), eq(conversasWhatsapp.telefone, chave)))
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
            sql`(right(regexp_replace(${customers.phone}, '\\D', '', 'g'), 11) = ${tel}
              or (length(regexp_replace(${customers.phone}, '\\D', '', 'g')) in (10, 12) and right(regexp_replace(${customers.phone}, '\\D', '', 'g'), 10) = ${tel10}))`,
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
      const ativas = await tx
        .select({ id: branches.id })
        .from(branches)
        .where(and(eq(branches.tenantId, tenantId), eq(branches.active, true)))
        .orderBy(desc(branches.main), asc(branches.createdAt));
      // a filial do último pedido, se ainda estiver ativa; desativada, o pedido vai para a principal
      const branchId = ativas.find((b) => b.id === ultimo?.branchId)?.id ?? ativas[0].id;
      const lista = await tx
        .select({ id: products.id, nome: products.name, precoCents: products.priceCents, vasilhameCents: products.containerPriceCents, retornavel: products.returnable })
        .from(products)
        .where(and(eq(products.tenantId, tenantId), eq(products.active, true)))
        .orderBy(asc(products.name));
      const livre = await disponivelNaLoja(tx, tenantId, branchId, lista.map((p) => p.id));

      // o endereço do cadastro manda: a loja pode ter corrigido em Clientes; o do último pedido só vale sem cadastro
      const endereco = cliente?.endereco || ultimo?.endereco || null;
      const referencia = (cliente?.endereco ? cliente.referencia : ultimo?.referencia) ?? "";
      const ctx: Contexto = {
        loja: loja.nome,
        saudacao: saudacaoAgora(),
        link: loja.portal ? `${base}/pedir/${loja.slug}` : null,
        cliente: cliente ? { nome: cliente.nome, endereco: cliente.endereco || null } : null,
        ultimo: ultimo && itens.length && endereco ? { itens, pagamento: ultimo.pagamento as Pagamento | "fiado", endereco } : null,
        taxaCents: ultimo?.taxa ?? 0,
        produtos: lista.map((p) => ({ ...p, disponivel: Math.max(0, livre.get(p.id) ?? 0) })),
      };

      let r = responder(estado, entrada, ctx);
      let saidas = r.saidas;
      // cliente novo pelo robô: fica cadastrado com o telefone da conversa; quem já existia sem endereço ganha o endereço
      if (r.cadastrar && teste) {
        // a tela de teste não deixa cliente nenhum: mostra até onde vai e recomeça
        saidas = [{ tipo: "texto", texto: "(Teste: na conversa real o cliente fica cadastrado aqui e já escolhe o produto. Para testar o pedido, converse como um cliente cadastrado.)" }];
        r = { ...r, estado: null };
      } else if (r.cadastrar) {
        if (cliente) await tx.update(customers).set({ address: r.cadastrar.endereco }).where(eq(customers.id, cliente.id));
        else await tx.insert(customers).values({ tenantId, name: r.cadastrar.nome, phone: formatarTelefone(tel), address: r.cadastrar.endereco, notes: "Cadastrado pelo robô do WhatsApp" });
      }
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
            texto = `${anotado("N", total, dados.pagamento)}(link do pedido)\n\n(Teste: na conversa real o pedido cai em Entregas. Este não foi lançado.)`;
          } else {
            const pedido = await lancar(tx, tenantId, branchId, dados);
            texto = `${anotado(String(pedido.number), pedido.totalCents, dados.pagamento)}${base}/pedir/${loja.slug}/acompanhar/${pedido.trackingId}`;
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

// Pix pelo robô entra na fila como o pedido por telefone (não espera o pagamento, como o do site): a mensagem diz
// onde está o código, e que dá para pagar na entrega
const anotado = (numero: string, totalCents: number, p: Pagamento) =>
  `Pronto! Pedido #${numero} anotado.\nTotal: ${formatBRL(totalCents)}.\n\n` +
  (p === "pix" ? "O código do Pix está no link abaixo; se preferir, pague na entrega.\n" : "") +
  "Acompanhe a entrega por aqui:\n";

/** "Bom dia", "Boa tarde" ou "Boa noite" no horário de Brasília (o das revendas). */
export function saudacaoAgora(agora = new Date()) {
  const h = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/Sao_Paulo" }).format(agora));
  return h >= 5 && h < 12 ? "Bom dia" : h >= 12 && h < 18 ? "Boa tarde" : "Boa noite";
}

async function lancar(
  tx: Tx,
  tenantId: string,
  branchId: string,
  p: { customerId: string; itens: Item[]; pagamento: Pagamento; trocoCents?: number | null; taxaCents: number; endereco: string; referencia: string; teste: boolean },
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
  // na transação que recebeu (o savepoint do teste, que é desfeito), não numa nova aberta no escopo de fora
  return criarPedidoNaTx(tx, ctx, newOrderSchema.parse({
    mode: "entrega",
    exigirEstoque: true,
    customerId: p.customerId,
    items: p.itens,
    paymentMethod: p.pagamento,
    deliveryFeeCents: p.taxaCents,
    changeForCents: p.pagamento === "dinheiro" ? (p.trocoCents ?? null) : null,
    address: p.endereco,
    reference: p.referencia,
    notes: p.teste ? "Teste do robô do WhatsApp: pode cancelar" : "Pedido pelo robô do WhatsApp",
    driverId: null,
    origin: "whatsapp",
  }));
}

/** Tela de teste: apaga onde a conversa parou, para começar do zero. */
export async function recomecarConversa(tenantId: string, telefone: string) {
  const chave = chaveConversa(digitosTelefone(telefone), true);
  await withTenant(tenantId, () => db.delete(conversasWhatsapp).where(and(eq(conversasWhatsapp.tenantId, tenantId), eq(conversasWhatsapp.telefone, chave))));
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
