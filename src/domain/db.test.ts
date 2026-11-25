// Testes com banco de verdade: isolamento entre empresas e as regras que dependem de SQL.
// Precisa de um Postgres de pé (o do `npm run dev` serve): cria e apaga o banco gestao_test.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import postgres from "postgres";

const ADMIN_URL = process.env.TEST_PG_URL ?? "postgres://app:app@localhost:5433/postgres";
const TEST_DB = "gestao_test";

const admin = postgres(ADMIN_URL, { max: 1, onnotice: () => {} });

// importados depois que DATABASE_URL aponta pro banco de teste
let m: {
  db: typeof import("@/db");
  schema: typeof import("@/db/schema");
  orders: typeof import("@/domain/orders");
  shifts: typeof import("@/domain/shifts");
  registry: typeof import("@/domain/registry");
  stock: typeof import("@/domain/stock");
  q: typeof import("@/domain/queries");
  rec: typeof import("@/domain/receivables");
  exp: typeof import("@/domain/expenses");
  platform: typeof import("@/domain/platform");
  exportTenant: typeof import("@/domain/export");
  monitoring: typeof import("@/domain/monitoring");
  portal: typeof import("@/domain/portal");
  prog: typeof import("@/domain/programados");
  robo: typeof import("@/domain/robo");
};

type World = Awaited<ReturnType<typeof makeTenant>>;
let A: World, B: World;

async function makeTenant(name: string) {
  const { db } = m.db;
  const { tenants, users, products, customers, stockMovements, branches } = m.schema;
  const [t] = await db.insert(tenants).values({ name, slug: `teste-${name.toLowerCase()}-${Date.now()}` }).returning();
  const [branch] = await db.insert(branches).values({ tenantId: t.id, name: "Principal", slug: "principal", main: true }).returning();
  const [owner, driver] = await db
    .insert(users)
    .values([
      { tenantId: t.id, name: `Dono ${name}`, email: `dono@${t.id}.test`, role: "dono", passwordHash: "x" },
      { tenantId: t.id, name: `Entregador ${name}`, email: `ent@${t.id}.test`, role: "entregador", passwordHash: "x", branchId: branch.id },
    ])
    .returning();
  const [product] = await db.insert(products).values({ tenantId: t.id, name: `Gás ${name}`, priceCents: 11000 }).returning();
  const [customer] = await db.insert(customers).values({ tenantId: t.id, name: `Cliente ${name}` }).returning();
  await db.insert(stockMovements).values({ tenantId: t.id, branchId: branch.id, productId: product.id, state: "cheio", quantity: 10, reason: "inicial", userId: owner.id });
  const ctx = { tenantId: t.id, userId: owner.id, role: "dono" as const, branchId: branch.id };
  const shift = await m.shifts.openShift(ctx, driver.id, 0);
  const order = await m.orders.createOrder(ctx, {
    mode: "entrega",
    customerId: customer.id,
    items: [{ productId: product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "dinheiro",
    deliveryFeeCents: 0,
    changeForCents: null,
    notes: "",
    driverId: null,
  });
  return { t, branch, owner, driver, product, customer, ctx, shift, order };
}

before(async () => {
  await admin.unsafe(`DROP DATABASE IF EXISTS ${TEST_DB} WITH (FORCE)`);
  await admin.unsafe(`CREATE DATABASE ${TEST_DB} ENCODING 'UTF8' TEMPLATE template0`);
  process.env.DATABASE_URL = ADMIN_URL.replace(/\/[^/]*$/, `/${TEST_DB}`);
  m = {
    db: await import("@/db"),
    schema: await import("@/db/schema"),
    orders: await import("@/domain/orders"),
    shifts: await import("@/domain/shifts"),
    registry: await import("@/domain/registry"),
    stock: await import("@/domain/stock"),
    q: await import("@/domain/queries"),
    rec: await import("@/domain/receivables"),
    exp: await import("@/domain/expenses"),
    platform: await import("@/domain/platform"),
    exportTenant: await import("@/domain/export"),
    monitoring: await import("@/domain/monitoring"),
    portal: await import("@/domain/portal"),
    prog: await import("@/domain/programados"),
    robo: await import("@/domain/robo"),
  };
  await m.db.runMigrations();
  A = await makeTenant("A");
  B = await makeTenant("B");
});

after(async () => {
  await admin.unsafe(`DROP DATABASE IF EXISTS ${TEST_DB} WITH (FORCE)`);
  await admin.end();
  process.exit(0); // o pool do app continua aberto; o banco já foi apagado
});

test("consultas de B não enxergam nada de A", async () => {
  assert.equal(await m.q.getOrder(B.t.id, A.order.id), null);
  assert.equal(await m.q.getCustomer(B.t.id, A.customer.id), null);
  assert.equal(await m.q.getShift(B.t.id, A.shift.id), null);
  const orders = await m.q.listOrders(B.t.id);
  assert.ok(orders.every((o) => o.id !== A.order.id));
  const stock = await m.q.stockOverview(B.t.id, B.branch.id);
  assert.deepEqual(stock.map((p) => p.id), [B.product.id]);
  const team = await m.q.listUsers(B.t.id);
  assert.ok(team.every((u) => u.id !== A.owner.id && u.id !== A.driver.id));
});

test("B não altera pedidos, turnos ou cadastros de A", async () => {
  const notFound = /não encontrad|indisponível/i;
  await assert.rejects(m.orders.dispatchOrder(B.ctx, A.order.id, B.driver.id), notFound);
  await assert.rejects(m.orders.cancelOrder(B.ctx, A.order.id, "teste"), notFound);
  await assert.rejects(m.orders.deliverOrder(B.ctx, A.order.id), notFound);
  await assert.rejects(m.shifts.closeShift(B.ctx, A.shift.id, 0, ""), notFound);
  await assert.rejects(m.shifts.openShift(B.ctx, A.driver.id, 0), notFound);
  await assert.rejects(
    m.registry.saveCustomer(B.ctx, { name: "invasor", phone: "", address: "", reference: "", notes: "" }, A.customer.id),
    notFound,
  );
  await assert.rejects(
    m.registry.saveProduct(B.ctx, { name: "invasor", priceCents: 1, returnable: true, minStock: 0, active: true }, A.product.id),
    notFound,
  );
  await assert.rejects(m.registry.setUserActive(B.ctx, A.owner.id, false), notFound);
  await assert.rejects(m.stock.adjustStock(B.ctx, { productId: A.product.id, state: "cheio", counted: 0, reason: "teste" }), notFound);
});

test("B não usa produto nem cliente de A num pedido novo", async () => {
  const base = { mode: "entrega" as const, paymentMethod: "dinheiro" as const, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null };
  await assert.rejects(
    m.orders.createOrder(B.ctx, { ...base, customerId: B.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }] }),
    /indisponível/,
  );
  await assert.rejects(
    m.orders.createOrder(B.ctx, { ...base, customerId: A.customer.id, items: [{ productId: B.product.id, quantity: 1, returnsEmpty: true }] }),
    /Cliente não encontrado/,
  );
});

test("A continua intacto depois das tentativas de B", async () => {
  const o = await m.q.getOrder(A.t.id, A.order.id);
  assert.equal(o?.status, "aberto");
  const [owner] = await m.q.listUsers(A.t.id);
  assert.ok(owner.active);
  const [p] = await m.q.stockOverview(A.t.id, A.branch.id);
  assert.equal(p.fullStore, 10);
});

test("fiado: saldo, pagamento parcial, teto e isolamento", async () => {
  // venda fiado no balcão já nasce entregue, então vira dívida na hora
  await m.orders.createOrder(A.ctx, {
    mode: "balcao",
    customerId: A.customer.id,
    items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "fiado",
    deliveryFeeCents: 0,
    changeForCents: null,
    notes: "",
    driverId: null,
  });
  assert.equal(await m.rec.customerBalance(A.t.id, A.customer.id), 11000);

  const pay = (ctx: typeof A.ctx, customerId: string, amountCents: number) =>
    m.rec.receivePayment(ctx, { customerId, amountCents, method: "pix", note: "" });

  await assert.rejects(pay(A.ctx, A.customer.id, 11001), /passa do saldo/);
  await pay(A.ctx, A.customer.id, 5000);
  assert.equal(await m.rec.customerBalance(A.t.id, A.customer.id), 6000);

  await assert.rejects(pay(B.ctx, A.customer.id, 100), /Cliente não encontrado/);
  assert.equal((await m.rec.listDebtors(B.t.id)).length, 0);
  const debtorsA = await m.rec.listDebtors(A.t.id);
  assert.deepEqual(debtorsA.map((d) => [d.id, d.owed]), [[A.customer.id, 6000]]);

  await pay(A.ctx, A.customer.id, 6000);
  assert.equal((await m.rec.listDebtors(A.t.id)).length, 0);
  await assert.rejects(pay(A.ctx, A.customer.id, 100), /não tem fiado em aberto/);

  const st = await m.rec.customerStatement(A.t.id, A.customer.id);
  assert.equal(st.owed, 0);
  assert.deepEqual(st.entries.map((e) => e.kind).sort(), ["compra", "pagamento", "pagamento"]);
});

test("estorno: turno aberto bloqueia, estoque volta e a devolução vira despesa", async () => {
  const sale = await m.orders.createOrder(A.ctx, {
    mode: "entrega",
    customerId: A.customer.id,
    items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "dinheiro",
    deliveryFeeCents: 0,
    changeForCents: null,
    notes: "",
    driverId: A.driver.id,
  });
  await m.orders.deliverOrder(A.ctx, sale.id);
  const refund = { orderId: sale.id, reason: "cliente devolveu", restock: true };
  await assert.rejects(m.orders.refundOrder(A.ctx, refund), /turno deste pedido ainda está aberto/);

  await m.shifts.closeShift(A.ctx, A.shift.id, 11000, "");
  const before = (await m.q.stockOverview(A.t.id, A.branch.id))[0];
  await assert.rejects(m.orders.refundOrder(B.ctx, refund), /não encontrado/);
  await m.orders.refundOrder(A.ctx, refund);
  const after = (await m.q.stockOverview(A.t.id, A.branch.id))[0];
  assert.equal(after.fullStore, before.fullStore + 1);
  assert.equal(after.emptyStore, before.emptyStore - 1);
  assert.equal((await m.q.getOrder(A.t.id, sale.id))?.status, "estornado");
  await assert.rejects(m.orders.refundOrder(A.ctx, refund), /Só pedidos entregues/);

  const today = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
  const list = await m.exp.listExpenses(A.t.id, today, today, null);
  const auto = list.find((e) => e.orderId === sale.id);
  assert.equal(auto?.category, "estorno");
  assert.equal(auto?.amountCents, 11000);
  await assert.rejects(m.exp.voidExpense(A.ctx, auto!.id, "engano"), /não pode ser cancelada/);
  // no resultado, a devolução não desconta de novo o que já saiu das vendas
  assert.equal(
    (await m.exp.expensesTotal(A.t.id, today, today, null)) - (await m.exp.expensesTotal(A.t.id, today, today, null, true)),
    11000,
  );
  assert.equal((await m.exp.listExpenses(B.t.id, today, today, null)).length, 0);
});

test("estorno de pedido pago parte em dinheiro e parte no Pix devolve cada parte pela sua forma", async () => {
  const venda = await m.orders.createOrder(A.ctx, {
    mode: "balcao", customerId: null, items: [{ productId: A.product.id, quantity: 2, returnsEmpty: true }],
    paymentMethod: "pix", cashPartCents: 5000, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
  });
  await m.orders.refundOrder(A.ctx, { orderId: venda.id, reason: "cliente devolveu", restock: false });
  const today = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
  const linhas = (await m.exp.listExpenses(A.t.id, today, today, null)).filter((e) => e.orderId === venda.id);
  assert.deepEqual(
    linhas.map((e) => [e.method, e.amountCents]).sort(),
    [["dinheiro", 5000], ["pix", venda.totalCents - 5000]].sort(),
  );
});

test("estorno de fiado exige estornar os pagamentos antes", async () => {
  const st = await m.rec.customerStatement(A.t.id, A.customer.id);
  const fiadoOrder = st.entries.find((e) => e.kind === "compra")!;
  const payments = st.entries.filter((e) => e.kind === "pagamento");
  const refund = { orderId: fiadoOrder.id, reason: "lançado errado", restock: false };

  await assert.rejects(m.orders.refundOrder(A.ctx, refund), /já pagou parte/);
  await assert.rejects(m.rec.voidPayment(B.ctx, payments[0].id, "teste"), /não encontrado/);
  for (const p of payments) await m.rec.voidPayment(A.ctx, p.id, "lançado em dobro");
  await assert.rejects(m.rec.voidPayment(A.ctx, payments[0].id, "de novo"), /já estornado/);
  assert.equal(await m.rec.customerBalance(A.t.id, A.customer.id), 11000);

  await m.orders.refundOrder(A.ctx, refund);
  assert.equal(await m.rec.customerBalance(A.t.id, A.customer.id), 0);
});

test("despesas: lançar, cancelar e totalizar só o que vale", async () => {
  const today = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
  const base = await m.exp.expensesTotal(A.t.id, today, today, null);
  const e = await m.exp.createExpense(A.ctx, { category: "combustivel", description: "Diesel", amountCents: 20000, method: "pix", paidOn: today });
  assert.equal(await m.exp.expensesTotal(A.t.id, today, today, null), base + 20000);
  await assert.rejects(m.exp.voidExpense(B.ctx, e.id, "teste"), /não encontrada/);
  await m.exp.voidExpense(A.ctx, e.id, "lançado em dobro");
  assert.equal(await m.exp.expensesTotal(A.t.id, today, today, null), base);
  await assert.rejects(m.exp.voidExpense({ ...A.ctx, role: "atendente" }, e.id, "x"), /Sem permissão/);
});

test("redefinir senha: só dentro da empresa, derruba sessões e desliga 2FA do dono", async () => {
  const { db } = m.db;
  const { users, sessions } = m.schema;
  const { eq } = await import("drizzle-orm");
  await assert.rejects(m.registry.resetUserPassword(B.ctx, A.driver.id, "senha-nova-1"), /não encontrado/);
  await assert.rejects(m.registry.resetUserPassword(A.ctx, A.owner.id, "senha-nova-1"), /própria senha/);
  // segundo dono não toma a conta do titular: nem troca a senha, nem desativa
  const socio = await m.registry.createUser(A.ctx, { name: "Sócio", email: `socio@${A.t.id}.test`, password: "senha-boa-1", role: "dono" });
  const ctxSocio = { ...A.ctx, userId: socio.id };
  await assert.rejects(m.registry.resetUserPassword(ctxSocio, A.owner.id, "senha-nova-1"), /outro dono/);
  await assert.rejects(m.registry.setUserActive(ctxSocio, A.owner.id, false), /outro dono/);
  await db.delete(users).where(eq(users.id, socio.id));

  await db.insert(sessions).values({ id: "sessao-teste", userId: A.driver.id, expiresAt: new Date(Date.now() + 3600e3) });
  await db.update(users).set({ totpEnabled: true, totpSecret: "ABC" }).where(eq(users.id, A.driver.id));
  await m.registry.resetUserPassword(A.ctx, A.driver.id, "senha-nova-1");
  assert.equal((await db.select().from(sessions).where(eq(sessions.userId, A.driver.id))).length, 0);
  const [d] = await db.select().from(users).where(eq(users.id, A.driver.id));
  assert.equal(d.totpEnabled, false);

  await db.update(users).set({ totpEnabled: true, totpSecret: "ABC" }).where(eq(users.id, A.owner.id));
  const admin = { ...B.ctx, platformAdmin: true, name: "", email: "", tenantName: "", totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "", branches: [] };
  await assert.rejects(m.platform.resetOwnerAccess({ ...admin, platformAdmin: false }, A.t.id, "senha-nova-2"), /Sem permissão/);
  assert.equal(await m.platform.resetOwnerAccess(admin, A.t.id, "senha-nova-2"), A.owner.email);
  const [o] = await db.select().from(users).where(eq(users.id, A.owner.id));
  assert.equal(o.totpEnabled, false);
  assert.equal(o.totpSecret, null);
});

test("exportação leva só os dados da empresa e nada sensível", async () => {
  const { unzipSync, strFromU8 } = await import("fflate");
  const { db } = m.db;
  const { users } = m.schema;
  const { eq } = await import("drizzle-orm");
  await db.update(users).set({ totpSecret: "SEGREDOTOTPTESTE" }).where(eq(users.id, B.owner.id));

  const { zip, counts } = await m.exportTenant.exportTenant({ tenantId: B.t.id, userId: B.owner.id });
  const files = unzipSync(zip);
  assert.ok(files["pedidos.csv"] && files["LEIA-ME.txt"]);
  assert.equal(counts["pedidos.csv"], 1);

  const forbidden = [A.t.id, A.customer.name, A.product.name, A.owner.email, "scrypt$", "SEGREDOTOTPTESTE"];
  for (const [name, bytes] of Object.entries(files)) {
    const text = strFromU8(bytes);
    for (const f of forbidden) assert.ok(!text.includes(f), `${name} contém "${f}"`);
    if (!name.endsWith(".csv")) continue;
    // toda linha com o mesmo número de colunas do cabeçalho (campos aqui não têm ";" nem aspas)
    const [head, ...lines] = text.replace(/^﻿/, "").split("\r\n");
    for (const l of lines) assert.equal(l.split(";").length, head.split(";").length, `${name}: ${l}`);
  }
  assert.ok(strFromU8(files["clientes.csv"]).includes(B.customer.name));
});

test("monitoramento: agrupa o mesmo erro, avisa uma vez por hora e de novo após resolvido", async () => {
  const sent: string[] = [];
  const send = async (t: string) => void sent.push(t);
  const req = { path: "/pedidos/3e0bd8e0-4d24-4469-a223-b2a857d53536?q=Maria", method: "GET", kind: "render" };
  const boom = () => new Error("conexão caiu no pedido 42");
  const t0 = new Date("2026-11-09T12:00:00Z");

  assert.deepEqual(await m.monitoring.recordError(boom(), req, send, t0), { recorded: true, alerted: true });
  assert.deepEqual(await m.monitoring.recordError(boom(), req, send, new Date(t0.getTime() + 60_000)), { recorded: true, alerted: false });
  assert.equal(sent.length, 1);
  assert.ok(sent[0].includes("GET /pedidos/:id") && !sent[0].includes("Maria"), "caminho sem id e sem busca");

  // passou uma hora: avisa de novo
  await m.monitoring.recordError(boom(), req, send, new Date(t0.getTime() + 61 * 60_000));
  assert.equal(sent.length, 2);

  const admin = { ...A.ctx, platformAdmin: true, name: "", email: "", tenantName: "", totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "", branches: [] };
  const [ev] = await m.monitoring.listErrors(admin);
  assert.equal(ev.count, 3);
  assert.equal(ev.path, "/pedidos/:id");
  await m.monitoring.resolveError(admin, ev.id);
  await m.monitoring.recordError(boom(), req, send, new Date(t0.getTime() + 62 * 60_000));
  assert.equal(sent.length, 3, "erro resolvido que volta avisa na hora");

  const redirect = Object.assign(new Error("NEXT_REDIRECT"), { digest: "NEXT_REDIRECT;replace;/login;307;" });
  assert.deepEqual(await m.monitoring.recordError(redirect, req, send), { recorded: false, alerted: false });

  // alerta quebrado não derruba nada
  const r = await m.monitoring.recordError(new Error("outro"), req, async () => { throw new Error("telegram fora"); });
  assert.equal(r.recorded, true);
  await assert.rejects(m.monitoring.listErrors({ ...admin, platformAdmin: false }), /Sem permissão/);
});

test("aceite dos termos: só o dono, com versão e data", async () => {
  const { db } = m.db;
  const { users, auditLog } = m.schema;
  const { eq, and } = await import("drizzle-orm");
  await assert.rejects(m.registry.acceptTerms({ ...A.ctx, role: "atendente" }, "2026-11-09"), /Sem permissão/);
  await m.registry.acceptTerms(A.ctx, "2026-11-09");
  const [o] = await db.select().from(users).where(eq(users.id, A.owner.id));
  assert.equal(o.termsVersion, "2026-11-09");
  assert.ok(o.termsAcceptedAt instanceof Date);
  const log = await db.select().from(auditLog).where(and(eq(auditLog.tenantId, A.t.id), eq(auditLog.action, "termos.aceite")));
  assert.equal(log.length, 1);
});

test("exclusão de empresa: travas, apaga tudo dela e mais nada", async () => {
  const { db } = m.db;
  const { sessions, loginAttempts, tenantDeletions } = m.schema;
  const { eq } = await import("drizzle-orm");
  const C = await makeTenant("C");
  await db.insert(sessions).values({ id: "sessao-c", userId: C.owner.id, expiresAt: new Date(Date.now() + 3600e3) });
  await db.insert(loginAttempts).values({ key: `login:${C.owner.email}:10.0.0.1` });
  // conta paga: aponta para a despesa do pagamento (a exclusão tem de apagar na ordem certa)
  const contasC = await import("@/domain/contas");
  const contaC = await contasC.criarConta(C.ctx, { description: "Boleto C", category: "fornecedor", amountCents: 5000, dueOn: "2026-12-01" });
  await contasC.pagarConta(C.ctx, contaC.id, { method: "pix", paidOn: "2026-11-10" });

  const admin = { ...A.ctx, platformAdmin: true, name: "", email: "admin@teste", tenantName: "", totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "", branches: [] };
  const countOf = async (table: string, t: string) =>
    Number((await m.db.pgClient.unsafe(`select count(*)::int n from ${table} where tenant_id = $1`, [t]))[0].n);
  const tables = ["contas_pagar", "audit_log", "customer_payments", "cash_entries", "customer_addresses", "expenses", "stock_movements", "order_items", "orders", "shifts", "customers", "products", "suppliers", "users"];
  const before = { A: await countOf("orders", A.t.id), B: await countOf("orders", B.t.id) };

  await assert.rejects(m.platform.deleteTenant(admin, C.t.id, "C"), /Suspenda a empresa/);
  await m.platform.setTenantActive(admin, C.t.id, false);
  await assert.rejects(m.platform.deleteTenant(admin, C.t.id, "Empresa errada"), /nome exato/);
  await assert.rejects(m.platform.deleteTenant(admin, A.t.id, "A"), /não pode ser excluída/);
  await assert.rejects(m.platform.deleteTenant({ ...admin, platformAdmin: false }, C.t.id, "C"), /Sem permissão/);

  const counts = await m.platform.deleteTenant(admin, C.t.id, " C ");
  assert.equal(counts.pedidos, 1);
  assert.equal(counts.usuarios, 2);
  assert.equal(counts.sessoes, 1);
  assert.equal(counts.tentativas_login, 1);
  for (const t of tables) assert.equal(await countOf(t, C.t.id), 0, `sobrou dado em ${t}`);
  assert.equal((await db.select().from(sessions).where(eq(sessions.userId, C.owner.id))).length, 0);

  const [log] = await db.select().from(tenantDeletions).where(eq(tenantDeletions.tenantId, C.t.id));
  assert.equal(log.tenantName, "C");
  assert.equal(log.deletedBy, "admin@teste");

  assert.equal(await countOf("orders", A.t.id), before.A);
  assert.equal(await countOf("orders", B.t.id), before.B);
});

test("cliente novo e pedido na mesma transação: pedido recusado não deixa cliente", async () => {
  const customers = async () => (await m.q.listCustomers(A.t.id)).length;
  const before = await customers();
  await assert.rejects(
    m.db.tenantTransaction(A.ctx, async () => {
      const c = await m.registry.saveCustomer(A.ctx, { name: "Cliente de passagem", phone: "", address: "", reference: "", notes: "" });
      await m.orders.createOrder(A.ctx, {
        mode: "entrega",
        customerId: c.id,
        items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
        paymentMethod: "dinheiro",
        deliveryFeeCents: 0,
        changeForCents: 1, // menor que o total
        notes: "",
        driverId: null,
      });
    }),
    /troco é menor/,
  );
  assert.equal(await customers(), before);
});

test("produto com nome repetido na empresa é recusado, em outra empresa não", async () => {
  const p = { priceCents: 100, returnable: false, minStock: 0, active: true };
  await assert.rejects(m.registry.saveProduct(A.ctx, { ...p, name: "gás a" }), /Já existe um produto/);
  const outro = await m.registry.saveProduct(A.ctx, { ...p, name: "Produto Único A" });
  await m.registry.saveProduct(A.ctx, { ...p, name: "Produto Único A" }, outro.id); // salvar ele mesmo pode
  await m.registry.saveProduct(B.ctx, { ...p, name: "Produto Único A" });
});

test("anonimizar cliente: exige fiado quitado, apaga dados e some da busca", async () => {
  const { db } = m.db;
  const { auditLog } = m.schema;
  const { and, eq } = await import("drizzle-orm");
  const c = await m.registry.saveCustomer(A.ctx, { name: "Maria Sigilo", phone: "11999990000", address: "Rua X", reference: "", notes: "" });
  // o CEP chega com a máscara e fica só com os números; incompleto é recusado
  const comCep = m.registry.customerSchema.parse({ name: "Maria Sigilo", phone: "11999990000", address: "Rua Y", cep: "66.035-000", reference: "", notes: "" });
  assert.throws(() => m.registry.customerSchema.parse({ ...comCep, cep: "66035" }), /8 números/);
  await m.registry.saveCustomer(A.ctx, comCep, c.id);
  assert.equal((await m.q.getCustomer(A.t.id, c.id))!.cep, "66035000");
  const fiado = await m.orders.createOrder(A.ctx, {
    mode: "balcao", customerId: c.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "fiado", deliveryFeeCents: 0, changeForCents: null, notes: "tocar na casa da Maria, portão azul", driverId: null,
  });
  await assert.rejects(m.registry.anonymizeCustomer(A.ctx, c.id), /fiado em aberto/);
  await m.rec.receivePayment(A.ctx, { customerId: c.id, amountCents: fiado.totalCents, method: "pix", note: "" });
  await assert.rejects(m.registry.anonymizeCustomer(B.ctx, c.id), /não encontrado/);
  await assert.rejects(m.registry.anonymizeCustomer({ ...A.ctx, role: "atendente" }, c.id), /Sem permissão/);

  await m.registry.anonymizeCustomer(A.ctx, c.id);
  assert.equal((await m.q.getCustomer(A.t.id, c.id))!.cep, "");
  const [after] = await m.q.listCustomers(A.t.id, "Sigilo");
  assert.equal(after, undefined);
  const logs = await db.select().from(auditLog).where(and(eq(auditLog.entity, "customer"), eq(auditLog.entityId, c.id)));
  assert.ok(!JSON.stringify(logs).includes("Rua"));
  assert.equal((await m.q.getOrder(A.t.id, fiado.id))!.notes, "");
  await assert.rejects(m.registry.anonymizeCustomer(A.ctx, c.id), /já foram apagados/);
});

test("caixa: repasse e gasto diminuem o esperado; diferença fica pendente até o dono resolver", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const [driver] = await db.insert(users).values({ tenantId: A.t.id, name: "Entregador Caixa", email: `cx@${A.t.id}.test`, role: "entregador", passwordHash: "x" }).returning();
  const caixa = { ...A.ctx, role: "caixa" as const };
  const atendente = { ...A.ctx, role: "atendente" as const };
  const shift = await m.shifts.openShift(atendente, driver.id, 5000);
  const order = await m.orders.createOrder(A.ctx, {
    mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 2, returnsEmpty: true }],
    paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: driver.id,
  });
  await m.orders.deliverOrder({ tenantId: A.t.id, userId: driver.id, role: "entregador", branchId: A.branch.id }, order.id);
  // o celular sem rede reenvia a confirmação: nada é contado duas vezes
  await m.orders.deliverOrder({ tenantId: A.t.id, userId: driver.id, role: "entregador", branchId: A.branch.id }, order.id);
  // em mãos: 50 de troco + 220 da entrega
  const entry = (kind: "repasse" | "saida", amountCents: number) => ({ shiftId: shift.id, kind, amountCents, note: "gasolina", category: "combustivel" });
  await assert.rejects(m.shifts.addCashEntry(atendente, entry("repasse", 1000)), /Sem permissão/);
  await assert.rejects(m.shifts.addCashEntry(B.ctx, entry("repasse", 1000)), /não encontrado/);
  await assert.rejects(m.shifts.addCashEntry(caixa, entry("repasse", 27001)), /tem R\$\s270,00/);
  await m.shifts.addCashEntry(caixa, entry("repasse", 10000));
  const wrong = await m.shifts.addCashEntry(caixa, entry("saida", 9000));
  await assert.rejects(m.exp.voidExpense(A.ctx, wrong.expenseId!, "erro"), /tela do acerto/);
  await assert.rejects(m.shifts.voidCashEntry(caixa, wrong.id, "valor errado"), /Sem permissão/);
  await m.shifts.voidCashEntry(A.ctx, wrong.id, "valor errado");
  await assert.rejects(m.shifts.voidCashEntry(A.ctx, wrong.id, "de novo"), /já estornado/);
  await m.shifts.addCashEntry(caixa, entry("saida", 3000));

  const view = await m.q.getShift(A.t.id, shift.id);
  assert.equal(view!.expected, 5000 + 22000 - 10000 - 3000);
  const today = new Date().toISOString().slice(0, 10);
  const spent = (await m.exp.listExpenses(A.t.id, "2000-01-01", "2999-01-01", null)).filter((e) => e.description === "gasolina" && !e.voidedAt);
  assert.equal(spent.length, 1);
  assert.ok(today);

  await assert.rejects(m.shifts.closeShift(atendente, shift.id, 14000, ""), /Sem permissão/);
  const closed = await m.shifts.closeShift(caixa, shift.id, 13000, "faltou dez");
  assert.equal(closed.differenceCents, -1000);
  await assert.rejects(m.shifts.addCashEntry(caixa, entry("repasse", 100)), /já foi fechado/);
  await assert.rejects(m.shifts.resolveDifference(caixa, shift.id, "descontado", "combinado"), /Sem permissão/);
  await assert.rejects(m.shifts.resolveDifference(A.ctx, shift.id, "inventado", "combinado"), /Escolha/);
  await m.shifts.resolveDifference(A.ctx, shift.id, "descontado", "desconto no vale de sexta");
  await assert.rejects(m.shifts.resolveDifference(A.ctx, shift.id, "descontado", "de novo"), /não tem diferença pendente/);
});

test("pedido: desconto com limite, pagamento misto, entrega parcial, ocorrência e troca de entregador", async () => {
  const { db } = m.db;
  const { users, orders, stockMovements } = m.schema;
  const { and, eq, sql } = await import("drizzle-orm");
  const mk = (n: string) => ({ tenantId: A.t.id, name: n, email: `${n}@${A.t.id}.test`, role: "entregador" as const, passwordHash: "x" });
  const [d1, d2] = await db.insert(users).values([mk("rota1"), mk("rota2")]).returning();
  await m.stock.receivePurchase(A.ctx, { productId: A.product.id, full: 20, emptiesReturned: 0, note: "carga do teste" });
  const s1 = await m.shifts.openShift(A.ctx, d1.id, 0);
  await m.shifts.openShift(A.ctx, d2.id, 0);
  const atendente = { ...A.ctx, role: "atendente" as const };
  const held = async (driverId: string) =>
    (await db.select({ q: sql<number>`coalesce(sum(${stockMovements.quantity}), 0)::int` }).from(stockMovements)
      .where(and(eq(stockMovements.driverId, driverId), eq(stockMovements.state, "cheio"))))[0].q;
  const base = {
    mode: "entrega" as const, customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 3, returnsEmpty: true }],
    deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: d1.id,
  };

  // 3 x 110 = 330; limite da equipe é 10% (33,00)
  await assert.rejects(m.orders.createOrder(atendente, { ...base, paymentMethod: "pix", discountCents: 3301, discountReason: "amigo" }), /acima do seu limite/);
  await assert.rejects(m.orders.createOrder(A.ctx, { ...base, paymentMethod: "pix", discountCents: 1000 }), /motivo do desconto/);
  await assert.rejects(m.orders.createOrder(A.ctx, { ...base, paymentMethod: "fiado", cashPartCents: 1000 }), /Pix ou no cartão/);
  await assert.rejects(m.orders.createOrder(A.ctx, { ...base, paymentMethod: "pix", cashPartCents: 33000 }), /menor que o total/);
  const o = await m.orders.createOrder(atendente, { ...base, paymentMethod: "pix", discountCents: 3000, discountReason: "cliente antigo", cashPartCents: 10000, origin: "whatsapp" });
  assert.equal(o.totalCents, 30000);
  assert.equal(await held(d1.id), 3);

  // troca de entregador leva a carga junto
  await assert.rejects(m.orders.reassignOrder(B.ctx, o.id, d2.id), /não encontrado/);
  await m.orders.reassignOrder(atendente, o.id, d2.id);
  assert.equal(await held(d1.id), 0);
  assert.equal(await held(d2.id), 3);

  // não conseguiu entregar: volta para a fila e a carga volta para a loja
  const driver2 = { tenantId: A.t.id, userId: d2.id, role: "entregador" as const, branchId: A.branch.id };
  await assert.rejects(m.orders.reportOccurrence({ ...driver2, userId: d1.id }, o.id, "ausente", ""), /outro entregador/);
  await m.orders.reportOccurrence(driver2, o.id, "ausente", "ninguém atendeu");
  assert.equal(await held(d2.id), 0);
  const [back] = await db.select().from(orders).where(eq(orders.id, o.id));
  assert.equal(back.status, "aberto");
  assert.match(back.occurrence!, /Cliente ausente: ninguém atendeu/);

  // sai de novo e chega só 1 de 3: total refeito, 2 cheios continuam com o entregador
  await m.orders.dispatchOrder(atendente, o.id, d1.id);
  const driver1 = { tenantId: A.t.id, userId: d1.id, role: "entregador" as const, branchId: A.branch.id };
  const [item] = (await m.q.getOrder(A.t.id, o.id))!.items;
  await assert.rejects(m.orders.deliverOrder(driver1, o.id, { delivered: { [item.id]: 0 }, note: "nada" }), /Não consegui entregar/);
  await assert.rejects(m.orders.deliverOrder(driver1, o.id, { delivered: { [item.id]: 4 }, note: "a mais" }), /inválida/);
  await assert.rejects(m.orders.deliverOrder(driver1, o.id, { delivered: { [item.id]: 3 }, note: "tudo" }), /Use "Entreguei"/);
  // 1 de 3 entregue: um terço do desconto de 30,00
  assert.equal(await m.orders.deliverOrder(driver1, o.id, { delivered: { [item.id]: 1 }, note: "só quis um" }), 11000 - 1000);
  const after = (await m.q.getOrder(A.t.id, o.id))!;
  assert.equal(after.totalCents, 10000);
  assert.equal(after.discountCents, 1000);
  // os 100,00 em dinheiro combinados cobrem o novo total: o pedido vira todo em dinheiro
  assert.equal(after.cashPartCents, 0);
  assert.equal(after.paymentMethod, "dinheiro");
  assert.equal(after.items[0].deliveredQuantity, 1);
  assert.equal(await held(d1.id), 2);
  // no acerto, só a parte em dinheiro é cobrada do entregador
  assert.equal((await m.q.getShift(A.t.id, s1.id))!.expected, 10000);
  // e o fechamento usa a mesma conta da tela: contar menos que isso é falta, não acerto certo
  await assert.rejects(m.shifts.closeShift(A.ctx, s1.id, 5000, ""), /Há diferença no caixa/);
  assert.equal((await m.shifts.closeShift(A.ctx, s1.id, 10000, "")).differenceCents, 0);
});

test("cliente: endereço extra vai para o pedido e some na anonimização", async () => {
  const { db } = m.db;
  const { customerAddresses } = m.schema;
  const { eq } = await import("drizzle-orm");
  const c = await m.registry.saveCustomer(A.ctx, { name: "Cliente Dois Endereços", phone: "", address: "Rua Principal, 1", reference: "", notes: "" });
  await m.registry.addAddress(A.ctx, { customerId: c.id, label: "Trabalho", address: "Av. do Trabalho, 500", reference: "portaria" });
  await assert.rejects(m.registry.addAddress(B.ctx, { customerId: c.id, label: "Invasor", address: "Rua de B, 9", reference: "" }), /não encontrado/);
  const [addr] = await db.select().from(customerAddresses).where(eq(customerAddresses.customerId, c.id));
  const order = await m.orders.createOrder(A.ctx, {
    mode: "entrega", customerId: c.id, addressId: addr.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "pix", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
  });
  assert.equal((await m.q.getOrder(A.t.id, order.id))!.customerAddress, "Av. do Trabalho, 500");
  await m.orders.cancelOrder(A.ctx, order.id, "teste");
  await m.registry.anonymizeCustomer(A.ctx, c.id);
  assert.equal((await db.select().from(customerAddresses).where(eq(customerAddresses.customerId, c.id))).length, 0);
  assert.equal((await m.q.getOrder(A.t.id, order.id))!.customerAddress, "");
});

test("estoque: avaria, inventário, compra com fornecedor, reserva e preço do vasilhame", async () => {
  const p = await m.registry.saveProduct(A.ctx, { name: "Galão Estoque", priceCents: 1500, containerPriceCents: 4000, returnable: true, minStock: 0, active: true });
  const s = await m.stock.saveSupplier(A.ctx, { name: "Fonte Serra", phone: "", notes: "", active: true });
  const sB = await m.stock.saveSupplier(B.ctx, { name: "Fornecedor de B", phone: "", notes: "", active: true });
  await assert.rejects(m.stock.receivePurchase(A.ctx, { productId: p.id, full: 10, emptiesReturned: 0, note: "", supplierId: sB.id }), /Fornecedor não encontrado/);
  await m.stock.receivePurchase(A.ctx, { productId: p.id, full: 10, emptiesReturned: 0, note: "NF 12", supplierId: s.id, costCents: 9000, costMethod: "pix" });
  const bought = (await m.exp.listExpenses(A.t.id, "2000-01-01", "2999-01-01", null)).find((e) => e.description.includes("Galão Estoque"));
  assert.equal(bought?.amountCents, 9000);
  assert.match(bought!.description, /Fonte Serra/);

  await m.stock.markDamaged({ ...A.ctx, role: "atendente" }, { productId: p.id, from: "cheio", quantity: 2, note: "trincado" });
  await assert.rejects(m.stock.markDamaged(A.ctx, { productId: p.id, from: "vazio", quantity: 1, note: "amassado" }), /Estoque insuficiente/);
  const row = async () => (await m.q.stockOverview(A.t.id, A.branch.id)).find((x) => x.id === p.id)!;
  assert.deepEqual([(await row()).fullStore, (await row()).damaged], [8, 2]);

  // pedido aguardando segura o estoque; sem vazio para trocar, o vasilhame entra no preço
  const o = await m.orders.createOrder(A.ctx, {
    mode: "entrega", customerId: A.customer.id, items: [{ productId: p.id, quantity: 3, returnsEmpty: false }],
    paymentMethod: "pix", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
  });
  assert.equal(o.totalCents, 3 * (1500 + 4000));
  assert.deepEqual([(await row()).reserved, (await row()).available], [3, 5]);
  await m.orders.cancelOrder(A.ctx, o.id, "teste de reserva");
  assert.equal((await row()).reserved, 0);

  await assert.rejects(m.stock.runInventory({ ...A.ctx, role: "caixa" }, [{ productId: p.id, state: "cheio", counted: 8 }], ""), /Sem permissão/);
  await assert.rejects(m.stock.runInventory(B.ctx, [{ productId: p.id, state: "cheio", counted: 1 }], ""), /não encontrado/);
  const diffs = await m.stock.runInventory(A.ctx, [
    { productId: p.id, state: "cheio", counted: 7 },
    { productId: p.id, state: "vazio", counted: 0 },
    { productId: p.id, state: "avariado", counted: 2 },
  ], "contagem de teste");
  assert.deepEqual(diffs, [{ product: "Galão Estoque", state: "cheio", before: 8, counted: 7 }]);
  assert.equal((await row()).fullStore, 7);
});

test("portal: só com portal ligado, reconhece o cliente pelo telefone e não usa produto de outra empresa", async () => {
  const { db } = m.db;
  const { tenants, customers } = m.schema;
  const { eq } = await import("drizzle-orm");
  const [t] = await db.select({ slug: tenants.slug }).from(tenants).where(eq(tenants.id, A.t.id));
  assert.equal(await m.portal.portalTenant(t.slug), null);
  await m.registry.saveSettings(A.ctx, { portalEnabled: true });
  await assert.rejects(m.registry.saveSettings(A.ctx, { pixKey: "chave@x.com", pixName: "", pixCity: "" }), /nome do recebedor/);
  assert.equal((await m.portal.portalTenant(t.slug))?.id, A.t.id);
  // mensalidade pausada: o portal some junto, ninguém na loja veria o pedido
  const [{ antes }] = await db.select({ antes: tenants.pagoAte }).from(tenants).where(eq(tenants.id, A.t.id));
  await db.update(tenants).set({ pagoAte: "2000-01-01" }).where(eq(tenants.id, A.t.id));
  assert.equal(await m.portal.portalTenant(t.slug), null);
  // e o robô do WhatsApp fica quieto pelo mesmo motivo
  await db.update(tenants).set({ whatsappNumeroId: "qa-pausada" }).where(eq(tenants.id, A.t.id));
  assert.equal(await m.platform.empresaDoNumeroWhats("qa-pausada"), null);
  await db.update(tenants).set({ pagoAte: antes }).where(eq(tenants.id, A.t.id));
  assert.equal(await m.platform.empresaDoNumeroWhats("qa-pausada"), A.t.id);
  await db.update(tenants).set({ whatsappNumeroId: null }).where(eq(tenants.id, A.t.id));
  assert.ok((await m.portal.portalProducts(A.t.id, A.branch.id)).every((p) => p.name !== B.product.name));

  const input = {
    name: "Cliente do Site", phone: "(11) 97777-1234", address: "Rua do Site, 10", reference: "", notes: "",
    items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }], paymentMethod: "dinheiro" as const, changeForCents: null,
  };
  const first = await m.portal.placePortalOrder(A.t.id, A.branch.id, input);
  const second = await m.portal.placePortalOrder(A.t.id, A.branch.id, { ...input, phone: "11977771234", address: "Outro lugar, 5" });
  assert.equal(first.origin, "portal");
  assert.equal(first.status, "aberto");
  assert.equal(second.customerId, first.customerId);
  assert.equal((await m.q.getOrder(A.t.id, second.id))!.customerAddress, "Outro lugar, 5");
  assert.match(second.notes, /Confirmar com o cliente/);
  assert.equal((await db.select().from(customers).where(eq(customers.phone, "(11) 97777-1234"))).length, 1);
  // a loja cadastrou outra pessoa com o mesmo telefone (pode, só recebe aviso): o pedido do site vai para a mais recente
  const parente = await m.registry.saveCustomer(A.ctx, { name: "Parente do Site", phone: "11 97777-1234", address: "Rua do Site, 10", reference: "", notes: "" });
  assert.equal((await m.portal.placePortalOrder(A.t.id, A.branch.id, input)).customerId, parente.id);
  await assert.rejects(m.portal.placePortalOrder(A.t.id, A.branch.id, { ...input, items: [{ productId: B.product.id, quantity: 1, returnsEmpty: true }] }), /indisponível/);
  // pedido recusado não deixa cliente novo para trás
  await assert.rejects(m.portal.placePortalOrder(A.t.id, A.branch.id, { ...input, phone: "21 99999-0000", items: [{ productId: B.product.id, quantity: 1, returnsEmpty: true }] }), /indisponível/);
  assert.equal((await db.select().from(customers).where(eq(customers.phone, "21 99999-0000"))).length, 0);

  // pelo site só sai o que tem livre na loja agora (os pedidos abertos já seguram o deles)
  const { products, stockMovements } = m.schema;
  const [raro] = await db.insert(products).values({ tenantId: A.t.id, name: "Galão raro", priceCents: 1500 }).returning();
  await db.insert(stockMovements).values({ tenantId: A.t.id, branchId: A.branch.id, productId: raro.id, state: "cheio", quantity: 2, reason: "inicial", userId: A.owner.id });
  const doRaro = (quantity: number) => ({ ...input, items: [{ productId: raro.id, quantity, returnsEmpty: true }] });
  assert.equal((await m.portal.portalProducts(A.t.id, A.branch.id)).find((p) => p.id === raro.id)?.disponivel, 2);
  await assert.rejects(m.portal.placePortalOrder(A.t.id, A.branch.id, doRaro(3)), /Só temos 2 de Galão raro/);
  await m.portal.placePortalOrder(A.t.id, A.branch.id, doRaro(2));
  await assert.rejects(m.portal.placePortalOrder(A.t.id, A.branch.id, doRaro(1)), /Galão raro acabou/);
  const noFim = await m.portal.portalProducts(A.t.id, A.branch.id);
  assert.equal(noFim.find((p) => p.id === raro.id)?.disponivel, 0);
  assert.equal(noFim.at(-1)?.disponivel, 0);
  // a atendente continua podendo lançar (ela vê o estoque e decide)
  await m.orders.createOrder(A.ctx, { mode: "entrega", customerId: A.customer.id, items: [{ productId: raro.id, quantity: 1, returnsEmpty: true }], paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null });
  await m.registry.saveSettings(A.ctx, { portalEnabled: false });
  assert.equal((await m.q.getSettings(A.t.id)).staffDiscountPct, 10);
});

test("Pix: só conta como recebido depois de conferido pelo dono ou caixa", async () => {
  const order = await m.orders.createOrder(A.ctx, {
    mode: "balcao", customerId: null, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "pix", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
  });
  assert.equal((await m.q.getOrder(A.t.id, order.id))!.pixConfirmedAt, null);
  await assert.rejects(m.orders.confirmPix({ ...A.ctx, role: "atendente" }, order.id), /Sem permissão/);
  await assert.rejects(m.orders.confirmPix(B.ctx, order.id), /não tem Pix a conferir/);
  await m.orders.confirmPix({ ...A.ctx, role: "caixa" }, order.id);
  assert.ok((await m.q.getOrder(A.t.id, order.id))!.pixConfirmedAt);
  await assert.rejects(m.orders.confirmPix(A.ctx, order.id), /não tem Pix a conferir/);
  const { orderPix } = await import("@/domain/pix");
  const code = orderPix({ pixKey: "chave@teste.com", pixName: "Loja A", pixCity: "Campinas" }, order);
  assert.match(code!, /5406110\.00/);
  assert.equal(orderPix({ pixKey: "", pixName: "", pixCity: "" }, order), null);
});

test("RLS: dentro do escopo de A, consulta sem filtro só enxerga A", async () => {
  const { db, withTenant } = m.db;
  const { orders, customers, users, tenants } = m.schema;
  const { eq, sql } = await import("drizzle-orm");

  await withTenant(A.t.id, async () => {
    const [{ role }] = await db.execute<{ role: string }>(sql`select current_user as role`);
    assert.equal(role, "app_tenant");

    // nenhum "where tenant_id": quem filtra é o Postgres
    const allOrders = await db.select({ t: orders.tenantId }).from(orders);
    assert.ok(allOrders.length > 0 && allOrders.every((o) => o.t === A.t.id));
    const allTenants = await db.select({ id: tenants.id }).from(tenants);
    assert.deepEqual(allTenants.map((t) => t.id), [A.t.id]);

    // alterar linha de B não acha nada; inserir com tenant de B é recusado
    const changed = await db.update(customers).set({ name: "invasor" }).where(eq(customers.id, B.customer.id)).returning();
    assert.equal(changed.length, 0);
    const gone = await db.delete(users).where(eq(users.id, B.owner.id)).returning();
    assert.equal(gone.length, 0);
    await assert.rejects(
      db.transaction((tx) => tx.insert(customers).values({ tenantId: B.t.id, name: "plantado em B" })),
      (e: Error & { cause?: Error }) => /row-level security/.test(e.cause?.message ?? e.message),
    );
  });

  await assert.rejects(withTenant(A.t.id, () => withTenant(B.t.id, async () => 1)), /outra empresa/);
  const [b] = await db.select().from(customers).where(eq(customers.id, B.customer.id));
  assert.equal(b.name, B.customer.name);
});

test("RLS: e-mail usado em outra empresa vira mensagem, não erro 500", async () => {
  await assert.rejects(
    m.registry.createUser(A.ctx, { name: "Copia", email: B.owner.email, password: "senha-qualquer-1", role: "atendente" }),
    /Já existe um usuário com este e-mail/,
  );
});

test("caixa: despacho espera o acerto e não entra em turno fechado", async () => {
  // turno aberto do entregador de B (criado na montagem), com um pedido aguardando
  const o = await m.orders.createOrder(B.ctx, {
    mode: "entrega",
    customerId: B.customer.id,
    items: [{ productId: B.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "pix",
    deliveryFeeCents: 0,
    changeForCents: null,
    notes: "",
    driverId: null,
  });
  // fechar e despachar ao mesmo tempo: o despacho precisa ver o turno já fechado
  const [closed, dispatched] = await Promise.allSettled([
    m.shifts.closeShift(B.ctx, B.shift.id, 0, ""),
    m.orders.dispatchOrder(B.ctx, o.id, B.driver.id),
  ]);
  const order = await m.q.getOrder(B.t.id, o.id);
  if (closed.status === "fulfilled") {
    assert.equal(dispatched.status, "rejected");
    assert.equal(order?.status, "aberto");
  } else {
    // o despacho ganhou: o acerto recusou por ter pedido em rota, que é o comportamento certo
    assert.equal(order?.status, "em_rota");
  }
  await assert.rejects(m.shifts.openShift(B.ctx, B.driver.id, 0).then(() => m.shifts.openShift(B.ctx, B.driver.id, 0)), /já tem um turno aberto/);
});

test("auditoria: filtra por área e por pessoa, traz os nomes e não mostra nada de outra empresa", async () => {
  await m.stock.adjustStock(A.ctx, { productId: A.product.id, state: "cheio", counted: 7, reason: "teste da auditoria" });
  await m.stock.adjustStock(B.ctx, { productId: B.product.id, state: "cheio", counted: 3, reason: "teste da auditoria" });
  const periodo = { from: new Date(Date.now() - 864e5), to: new Date(Date.now() + 864e5) };

  const estoque = await m.q.listAudit(A.t.id, { ...periodo, area: "estoque" });
  const ajuste = estoque.rows.find((r) => r.action === "estoque.ajuste" && r.entityId === A.product.id);
  assert.ok(ajuste, "o ajuste de A aparece");
  assert.equal(estoque.nomes[A.product.id], A.product.name);
  assert.ok(estoque.rows.every((r) => r.action.startsWith("estoque.")));
  const tudo = await m.q.listAudit(A.t.id, periodo);
  assert.ok(tudo.rows.every((r) => r.entityId !== B.product.id), "nada de B na auditoria de A");

  // o ajuste foi do dono: filtrando pelo entregador ele não aparece
  const doEntregador = await m.q.listAudit(A.t.id, { ...periodo, userId: A.driver.id });
  assert.ok(doEntregador.rows.every((r) => r.action !== "estoque.ajuste"));
});

test("painel: filtro de entregador mostra só o turno e as vendas dele", async () => {
  // testes anteriores fecham o turno do entregador de A: abre outro se precisar
  if (!(await m.q.openShiftFor(A.t.id, A.driver.id))) await m.shifts.openShift(A.ctx, A.driver.id, 0);
  const d = await m.q.dashboard(A.t.id, { branchId: A.branch.id, driverId: A.driver.id });
  assert.ok(d.openShifts.length > 0);
  assert.ok(d.openShifts.every((s) => s.driverId === A.driver.id));
  const outro = await m.q.dashboard(A.t.id, { branchId: A.branch.id, driverId: B.driver.id });
  assert.equal(outro.openShifts.length, 0, "entregador de outra empresa não traz turno de A");
  // dia sem movimento: nada vendido
  const vazio = await m.q.dashboard(A.t.id, { branchId: A.branch.id, day: "2020-01-01" });
  assert.equal(vazio.revenue, 0);
  assert.equal(vazio.recent.length, 0);
});

test("backup restaurado sem as regras de isolamento: a subida recria", async () => {
  const { db, withTenant, runMigrations } = m.db;
  const { orders } = m.schema;
  const { sql } = await import("drizzle-orm");
  // como o pg_restore deixa o banco quando o papel app_tenant não existia no servidor novo
  await db.execute(sql`drop policy tenant_isolation on suppliers`);
  await db.execute(sql`revoke all on orders from app_tenant`);

  await runMigrations();

  const [{ n }] = await db.execute<{ n: number }>(
    sql`select count(*)::int n from pg_policy where polrelid = 'suppliers'::regclass and polname = 'tenant_isolation'`,
  );
  assert.equal(n, 1);
  const visiveis = await withTenant(A.t.id, () => db.select({ t: orders.tenantId }).from(orders));
  assert.ok(visiveis.length > 0 && visiveis.every((o) => o.t === A.t.id));
  await assert.rejects(withTenant(A.t.id, () => db.execute(sql`insert into suppliers (tenant_id, name) values (${B.t.id}, 'x')`)));
});

test("painel: semana de 7 dias seguidos, terminando no vendido do dia", async () => {
  const d = await m.q.dashboard(A.t.id, { branchId: A.branch.id });
  assert.equal(d.week.length, 7);
  for (let i = 1; i < 7; i++) {
    const passo = new Date(`${d.week[i].day}T12:00:00Z`).getTime() - new Date(`${d.week[i - 1].day}T12:00:00Z`).getTime();
    assert.equal(passo, 864e5, "dias consecutivos, sem pular nem repetir");
  }
  assert.equal(d.week[6].cents, d.revenue, "a última barra é o próprio dia");
  assert.equal(d.emAndamento, true);
  assert.ok(d.previous >= 0);
  // dia fechado no passado: semana termina nele e compara com o dia anterior inteiro
  const antigo = await m.q.dashboard(A.t.id, { branchId: A.branch.id, day: "2020-01-08" });
  assert.equal(antigo.week[6].day, "2020-01-08");
  assert.equal(antigo.week[0].day, "2020-01-02");
  assert.equal(antigo.emAndamento, false);
});

test("primeiros passos: empresa nova começa do zero e cada passo se completa com o dado de verdade", async () => {
  const { db } = m.db;
  const { tenants, users, products } = m.schema;
  const { eq } = await import("drizzle-orm");
  const [t] = await db.insert(tenants).values({ name: "Nova", slug: `teste-nova-${Date.now()}` }).returning();
  await db.insert(users).values({ tenantId: t.id, name: "Dono Nova", email: `dono@${t.id}.test`, role: "dono", passwordHash: "x" });

  assert.deepEqual(await m.q.primeirosPassos(t.id), { produtos: false, sugeridos: false, estoque: false, equipe: false, pix: false, turno: false, pedido: false });

  await db.insert(products).values({ tenantId: t.id, name: "Gás P13", priceCents: 11500 });
  // entregador desativado não conta: quem saiu não faz entrega
  await db.insert(users).values({ tenantId: t.id, name: "Ex", email: `ex@${t.id}.test`, role: "entregador", passwordHash: "x", active: false });
  await db.update(tenants).set({ pixKey: "pix@nova.test" }).where(eq(tenants.id, t.id));
  const meio = await m.q.primeirosPassos(t.id);
  assert.equal(meio.produtos, true);
  assert.equal(meio.pix, true);
  assert.equal(meio.equipe, false);

  // a empresa A, montada pelo teste com tudo, não enxerga os passos da nova e vice-versa
  const a = await m.q.primeirosPassos(A.t.id);
  assert.equal(a.produtos && a.estoque && a.equipe && a.turno && a.pedido, true);
});

test("acompanhamento: o link acha o pedido só na loja certa e mostra a situação sem dados de contato", async () => {
  const codigo = A.order.trackingId;
  const achado = await m.portal.pedidoAcompanhado(A.t.slug, codigo);
  assert.equal(achado?.pedido.number, A.order.number);
  assert.deepEqual(achado?.itens, [{ nome: A.product.name, quantidade: 1 }]);
  // nada de endereço, telefone ou nome do cliente: o link pode ser repassado
  assert.ok(!("address" in achado!.pedido) && !("customerName" in achado!.pedido));
  // o código de uma loja não abre nada pelo endereço de outra
  assert.equal(await m.portal.pedidoAcompanhado(B.t.slug, codigo), null);
  assert.equal(await m.portal.pedidoAcompanhado(A.t.slug, crypto.randomUUID()), null);
  assert.equal(await m.portal.pedidoAcompanhado(A.t.slug, "nao-e-um-codigo"), null);
  // cada pedido tem o seu código
  assert.notEqual(A.order.trackingId, B.order.trackingId);
});

test("vasilhame: sem vazio para trocar o casco é cobrado, e empréstimo enviado por fora é ignorado", async () => {
  const { db } = m.db;
  const { products, orderItems } = m.schema;
  const { eq } = await import("drizzle-orm");
  const [p] = await db.insert(products).values({ tenantId: A.t.id, name: "Galão sem troca", priceCents: 1500, containerPriceCents: 2000 }).returning();
  await m.stock.receivePurchase(A.ctx, { productId: p.id, full: 10, emptiesReturned: 0, note: "carga do teste" });
  // as revendas não emprestam casco: um loan:true vindo de fora da tela não pode tirar a cobrança do vasilhame
  const item = { productId: p.id, quantity: 2, returnsEmpty: false, loan: true };
  const o = await m.orders.createOrder(A.ctx, { mode: "entrega", deliveryFeeCents: 0, changeForCents: null, notes: "", paymentMethod: "dinheiro", customerId: A.customer.id, items: [item], driverId: null });
  assert.equal(o.totalCents, 2 * (1500 + 2000));
  const [gravado] = await db.select().from(orderItems).where(eq(orderItems.orderId, o.id));
  assert.equal(gravado.loan, false);
});

test("filiais: estoque, equipe e turno separados; o dono mexe em todas e a equipe só na sua", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const { eq } = await import("drizzle-orm");
  const fil = await import("@/domain/filiais");
  await assert.rejects(fil.criarFilial({ ...A.ctx, role: "atendente" }, { name: "Centro" }));
  const centro = await fil.criarFilial(A.ctx, { name: "Centro" });
  assert.equal(centro.slug, "centro");
  await assert.rejects(fil.criarFilial(A.ctx, { name: "centro" }), /Já existe/);

  // compra no Centro não aparece na principal
  const noCentro = { ...A.ctx, branchId: centro.id };
  const principal = async () => (await m.q.stockOverview(A.t.id, A.branch.id)).find((p) => p.id === A.product.id)!.fullStore;
  const doCentro = async () => (await m.q.stockOverview(A.t.id, centro.id)).find((p) => p.id === A.product.id)!.fullStore;
  const antes = await principal();
  await m.stock.receivePurchase(noCentro, { productId: A.product.id, full: 5, emptiesReturned: 0, note: "carga do Centro" });
  assert.equal(await doCentro(), 5);
  assert.equal(await principal(), antes);

  // venda no balcão do Centro sai do estoque do Centro
  const balcao = { mode: "balcao" as const, customerId: null, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null, paymentMethod: "dinheiro" as const };
  const venda = await m.orders.createOrder(noCentro, { ...balcao, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: false }] });
  assert.equal(await doCentro(), 4);
  assert.equal(await principal(), antes);

  // atendente do Centro: não vê nem estorna pedido da principal, e não abre turno de entregador de lá
  const u = await m.registry.createUser(A.ctx, { name: "Atendente Centro", email: `ac@${A.t.id}.test`, password: "senha-boa-1", role: "atendente", branchId: centro.id });
  const [criado] = await db.select().from(users).where(eq(users.id, u.id));
  assert.equal(criado.branchId, centro.id);
  const atendenteCentro = { tenantId: A.t.id, userId: u.id, role: "atendente" as const, branchId: centro.id };
  const daPrincipal = await m.orders.createOrder(A.ctx, { ...balcao, mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }] });
  await assert.rejects(m.orders.cancelOrder(atendenteCentro, daPrincipal.id, "teste"), /não encontrado/);
  assert.ok(!(await m.q.listOrders(A.t.id, { branchId: centro.id })).some((o) => o.id === daPrincipal.id));
  const [ent] = await db.insert(users).values({ tenantId: A.t.id, name: "Entregador Principal 2", email: `ep2@${A.t.id}.test`, role: "entregador", passwordHash: "x", branchId: A.branch.id }).returning();
  await assert.rejects(m.shifts.openShift(atendenteCentro, ent.id, 0), /outra filial/);
  // o turno é da filial do entregador: aberto pelo dono vendo o Centro, ainda é da principal
  const turno = await m.shifts.openShift(noCentro, ent.id, 0);
  assert.equal(turno.branchId, A.branch.id);
  // pedido do Centro não sai com entregador da principal
  const doC = await m.orders.createOrder(noCentro, { ...balcao, mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }] });
  await assert.rejects(m.orders.dispatchOrder(noCentro, doC.id, ent.id), /nesta filial/);
  // o dono, vendo o Centro, cancela o pedido da principal; nada mexe no estoque do Centro
  await m.orders.cancelOrder(noCentro, daPrincipal.id, "teste");
  await m.orders.cancelOrder(noCentro, doC.id, "teste");
  assert.equal(await doCentro(), 4);
  await m.orders.refundOrder(noCentro, { orderId: venda.id, reason: "devolveu", restock: true });
  assert.equal(await doCentro(), 5);

  // transferência: sai do Centro e entra na principal de uma vez; o que está em pedido não sai
  await assert.rejects(m.stock.transferirEstoque(noCentro, { productId: A.product.id, para: centro.id, cheios: 1, vazios: 0, note: "" }), /filial que vai receber/);
  await assert.rejects(m.stock.transferirEstoque(noCentro, { productId: A.product.id, para: A.branch.id, cheios: 6, vazios: 0, note: "" }), /Há 5 cheios/);
  await assert.rejects(m.stock.transferirEstoque({ ...noCentro, role: "entregador" }, { productId: A.product.id, para: A.branch.id, cheios: 1, vazios: 0, note: "" }), /Sem permissão/);
  const segura = await m.orders.createOrder(noCentro, { ...balcao, mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }] });
  await assert.rejects(m.stock.transferirEstoque(noCentro, { productId: A.product.id, para: A.branch.id, cheios: 5, vazios: 0, note: "" }), /Há 4 cheios/);
  await m.stock.transferirEstoque(noCentro, { productId: A.product.id, para: A.branch.id, cheios: 3, vazios: 0, note: "reforço" });
  assert.equal(await doCentro(), 2);
  assert.equal(await principal(), antes + 3);
  await m.orders.cancelOrder(noCentro, segura.id, "teste");
  // filial de outra empresa não recebe
  await assert.rejects(m.stock.transferirEstoque(noCentro, { productId: A.product.id, para: B.branch.id, cheios: 1, vazios: 0, note: "" }), /Filial não encontrada/);

  // link de pedido da filial; filial que não existe cai na principal
  await m.registry.saveSettings(A.ctx, { portalEnabled: true });
  assert.equal((await m.portal.portalTenant(A.t.slug, "centro"))?.branchId, centro.id);
  assert.equal((await m.portal.portalTenant(A.t.slug, "nao-existe"))?.branchId, A.branch.id);

  // desativar só sem ninguém da equipe; a principal nunca
  await assert.rejects(fil.ativarFilial(A.ctx, centro.id, false), /ainda tem gente/);
  await fil.mudarDeFilial(A.ctx, u.id, A.branch.id);
  await fil.ativarFilial(A.ctx, centro.id, false);
  await assert.rejects(fil.ativarFilial(A.ctx, A.branch.id, false), /principal/);
  assert.equal((await m.portal.portalTenant(A.t.slug, "centro"))?.branchId, A.branch.id);
  // outra empresa não acha a filial
  await assert.rejects(fil.ativarFilial(B.ctx, centro.id, true), /não encontrada/);
  await assert.rejects(fil.mudarDeFilial(B.ctx, u.id, B.branch.id), /não encontrada/);
});

test("Mercado Pago: conecta com o token da loja, cobra o Pix do pedido, confirma só o pagamento certo e cai na chave se falhar", async () => {
  const { db } = m.db;
  const { tenants } = m.schema;
  const { eq } = await import("drizzle-orm");
  const { randomBytes } = await import("node:crypto");
  process.env.SEGREDO_CHAVE = randomBytes(32).toString("base64");
  const mp = await import("@/lib/mercadopago");
  const pix = await import("@/domain/pix");

  // Mercado Pago de mentira: guarda as cobranças e responde como a API de Orders
  const ORD = (n: string) => `ORD${n.padStart(16, "0")}`;
  const TOKEN = "TEST-1234567890123456-loja-a";
  const cobrancas = new Map<string, { ref: string; valor: number; pago: boolean; outraRef?: string; cancelada?: boolean }>();
  const chaves = new Map<string, string>();
  let fora = false;
  mp.usarRede(async (url, init) => {
    if (fora) throw new Error("rede");
    const auth = new Headers(init?.headers).get("Authorization");
    if (auth !== `Bearer ${TOKEN}`) return new Response("{}", { status: 401 });
    const caminho = String(url).replace("https://api.mercadopago.com", "");
    const json = (o: unknown) => new Response(JSON.stringify(o), { status: 200 });
    if (caminho === "/users/me") return json({ id: 77, email: "financeiro@loja-a.com" });
    if (caminho === "/v1/orders" && init?.method === "POST") {
      const chave = new Headers(init.headers).get("X-Idempotency-Key")!;
      const b = JSON.parse(String(init.body));
      assert.equal(b.transactions.payments[0].payment_method.id, "pix");
      assert.match(b.transactions.payments[0].expiration_time, /^PT\d+M$/);
      let id = chaves.get(chave);
      if (!id) {
        id = String(9000 + cobrancas.size);
        chaves.set(chave, id);
        cobrancas.set(id, { ref: b.external_reference, valor: Math.round(Number(b.total_amount) * 100), pago: false });
      }
      return json({ id: ORD(id), status: "action_required", transactions: { payments: [{ payment_method: { qr_code: `000201MP${id}` } }] } });
    }
    const [, , , ordId, acao] = caminho.split("/");
    const c = cobrancas.get(ordId?.replace(/^ORD0+/, "") ?? "");
    if (!c) return new Response("{}", { status: 404 });
    if (acao === "cancel") {
      if (c.pago) return new Response("{}", { status: 409 });
      c.cancelada = true;
      return json({});
    }
    return json({ id: ordId, status: c.pago ? "processed" : "action_required", external_reference: c.outraRef ?? c.ref, total_amount: (c.valor / 100).toFixed(2) });
  });

  await assert.rejects(pix.conectarMercadoPago(A.ctx, "abc"), /Access Token inteiro/);
  await assert.rejects(pix.conectarMercadoPago(A.ctx, "TEST-0000000000000000-outra-loja"), /não aceitou/);
  await assert.rejects(pix.conectarMercadoPago({ ...A.ctx, role: "atendente" }, TOKEN), /Sem permissão/);
  assert.equal((await pix.conectarMercadoPago(A.ctx, TOKEN)).nome, "financeiro@loja-a.com");
  const [t] = await db.select().from(tenants).where(eq(tenants.id, A.t.id));
  assert.equal(t.mpConta, "financeiro@loja-a.com");
  assert.ok(t.mpTokenEnc && !t.mpTokenEnc.includes(TOKEN));
  await m.registry.saveSettings(A.ctx, { pixKey: "chave@loja-a.com", pixName: "Loja A", pixCity: "Campinas" });

  const novo = (paymentMethod: "pix" | "dinheiro") =>
    m.orders.createOrder(A.ctx, {
      mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
      paymentMethod, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
    });
  const o = await novo("pix");
  const p1 = await pix.pixDoPedido(A.t.id, o.id);
  assert.deepEqual(p1, { codigo: "000201MP9000", automatico: true });
  // a mesma cobrança serve de novo, sem criar outra
  assert.deepEqual(await pix.pixDoPedido(A.t.id, o.id), p1);
  assert.equal(cobrancas.size, 1);
  assert.equal(cobrancas.get("9000")!.valor, o.totalCents);
  // pedido em dinheiro não tem Pix; outra empresa não acha o pedido
  assert.equal(await pix.pixDoPedido(A.t.id, (await novo("dinheiro")).id), null);
  assert.equal(await pix.pixDoPedido(B.t.id, o.id), null);

  // ainda não pago: nada muda
  assert.equal(await pix.conferirPixMp(A.t.id, o.id), false);
  // pago, mas o pagamento diz ser de outro pedido: não vale
  cobrancas.get("9000")!.pago = true;
  cobrancas.get("9000")!.outraRef = crypto.randomUUID();
  assert.equal(await pix.conferirPixMp(A.t.id, o.id), false);
  // o aviso (webhook) com outro pagamento é ignorado; com o certo, confirma
  const aviso = await import("@/app/api/mercadopago/route");
  delete cobrancas.get("9000")!.outraRef;
  const avisar = (id: string) => aviso.POST(new Request("http://x/api/mercadopago", { method: "POST", body: JSON.stringify({ type: "order", data: { id } }) }));
  assert.equal((await avisar("1234")).status, 200);
  assert.equal((await avisar(ORD("9999"))).status, 200);
  assert.equal((await m.q.getOrder(A.t.id, o.id))!.pixConfirmedAt, null);
  await avisar(ORD("9000"));
  const pago = (await m.q.getOrder(A.t.id, o.id))!;
  assert.ok(pago.pixConfirmedAt);
  assert.equal(pago.pixConfirmedBy, null);
  assert.equal(await pix.pixDoPedido(A.t.id, o.id), null);
  assert.equal(await pix.conferirPixMp(A.t.id, o.id), true);

  // Mercado Pago fora do ar: o pedido não fica sem Pix, vai o da chave da loja
  fora = true;
  const o2 = await novo("pix");
  const reserva = await pix.pixDoPedido(A.t.id, o2.id);
  assert.equal(reserva?.automatico, false);
  assert.match(reserva!.codigo, /chave@loja-a\.com/);
  fora = false;

  // pedido do site no Pix: fica fora da fila até pagar, mas já segura o estoque
  const { orders } = m.schema;
  const doSite = () =>
    m.orders.createOrder(A.ctx, {
      mode: "entrega", origin: "portal", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
      paymentMethod: "pix", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
    });
  const reservadoAntes = (await m.q.stockOverview(A.t.id, A.branch.id)).find((p) => p.id === A.product.id)!.reserved;
  const s1 = await doSite();
  assert.equal(s1.status, "aguardando_pagamento");
  assert.equal((await m.q.stockOverview(A.t.id, A.branch.id)).find((p) => p.id === A.product.id)!.reserved, reservadoAntes + 1);
  await assert.rejects(m.orders.dispatchOrder(A.ctx, s1.id, A.driver.id), /Só pedidos em aberto/);
  // a cobrança vence junto com o prazo de pagar (15 minutos depois do pedido)
  const c1 = await pix.pixDoPedido(A.t.id, s1.id);
  assert.equal(c1?.automatico, true);
  const [comCobranca] = await db.select().from(orders).where(eq(orders.id, s1.id));
  assert.equal(comCobranca.mpExpiresAt!.getTime(), comCobranca.createdAt.getTime() + pix.PRAZO_PAGAR_MS);
  // pagou: entra na fila sozinho
  cobrancas.get(comCobranca.mpPaymentId!.replace(/^ORD0+/, ""))!.pago = true;
  assert.equal(await pix.conferirPixMp(A.t.id, s1.id), true);
  assert.equal((await m.q.getOrder(A.t.id, s1.id))!.status, "aberto");

  // não pagou em 15 minutos: cancelado sozinho; se o Pix caiu no último minuto, confirma em vez de cancelar
  const s2 = await doSite();
  const s3 = await doSite();
  await pix.pixDoPedido(A.t.id, s2.id);
  await pix.pixDoPedido(A.t.id, s3.id);
  const vinteMinAtras = new Date(Date.now() - 20 * 60_000);
  for (const s of [s2, s3]) await db.update(orders).set({ createdAt: vinteMinAtras }).where(eq(orders.id, s.id));
  const [p3] = await db.select({ id: orders.mpPaymentId }).from(orders).where(eq(orders.id, s3.id));
  cobrancas.get(p3.id!.replace(/^ORD0+/, ""))!.pago = true;
  await pix.cancelarPixVencidos(A.t.id);
  const v2 = (await m.q.getOrder(A.t.id, s2.id))!;
  assert.equal(v2.status, "cancelado");
  assert.equal(v2.cancelReason, "Pix não pago em 15 minutos");
  // a cobrança dura no mínimo 30 minutos no Mercado Pago: foi cancelada lá também
  const [p2] = await db.select({ id: orders.mpPaymentId }).from(orders).where(eq(orders.id, s2.id));
  assert.equal(cobrancas.get(p2.id!.replace(/^ORD0+/, ""))!.cancelada, true);
  assert.equal((await m.q.getOrder(A.t.id, s3.id))!.status, "aberto");
  // vencido não tem mais Pix para pagar
  assert.equal(await pix.pixDoPedido(A.t.id, s2.id), null);
  // outra empresa não cancela nada da A
  const s4 = await doSite();
  await pix.pixDoPedido(A.t.id, s4.id);
  await db.update(orders).set({ createdAt: vinteMinAtras }).where(eq(orders.id, s4.id));
  await pix.cancelarPixVencidos(B.t.id);
  assert.equal((await m.q.getOrder(A.t.id, s4.id))!.status, "aguardando_pagamento");

  // Mercado Pago fora no vencimento: não cancela enquanto a cobrança ainda pode ser paga lá (30 minutos)
  const s6 = await doSite();
  await pix.pixDoPedido(A.t.id, s6.id);
  await db.update(orders).set({ createdAt: vinteMinAtras }).where(eq(orders.id, s6.id));
  fora = true;
  await pix.cancelarPixVencidos(A.t.id);
  assert.equal((await m.q.getOrder(A.t.id, s6.id))!.status, "aguardando_pagamento");
  // passou da validade da cobrança: aí cancela, mesmo sem conseguir falar com o Mercado Pago
  await db.update(orders).set({ createdAt: new Date(Date.now() - 40 * 60_000) }).where(eq(orders.id, s6.id));
  await pix.cancelarPixVencidos(A.t.id);
  assert.equal((await m.q.getOrder(A.t.id, s6.id))!.status, "cancelado");
  fora = false;
  // e se o Pix tinha caído: continua cancelado, mas o valor fica para devolver ao cliente
  const [p6] = await db.select({ id: orders.mpPaymentId }).from(orders).where(eq(orders.id, s6.id));
  cobrancas.get(p6.id!.replace(/^ORD0+/, ""))!.pago = true;
  assert.equal(await pix.conferirPixMp(A.t.id, s6.id), true);
  const v6 = (await m.q.getOrder(A.t.id, s6.id))!;
  assert.equal(v6.status, "cancelado");
  assert.equal(v6.pixDevolverCents, v6.totalCents);
  // o pedido que entrou na fila normalmente não tem nada a devolver
  assert.equal((await m.q.getOrder(A.t.id, s3.id))!.pixDevolverCents, 0);

  // desconectado: volta a conferência à mão e o token some do banco
  await pix.desconectarMercadoPago(A.ctx);
  const [semMp] = await db.select({ enc: tenants.mpTokenEnc }).from(tenants).where(eq(tenants.id, A.t.id));
  assert.equal(semMp.enc, null);
  assert.equal((await pix.pixDoPedido(A.t.id, o2.id))?.automatico, false);

  // sem Mercado Pago (chave Pix comum): o pedido do site espera a loja conferir por um dia, e depois cancela
  const s5 = await doSite();
  assert.equal((await pix.pixDoPedido(A.t.id, s5.id))?.automatico, false);
  await db.update(orders).set({ createdAt: vinteMinAtras }).where(eq(orders.id, s5.id));
  await pix.cancelarPixVencidos(A.t.id);
  assert.equal((await m.q.getOrder(A.t.id, s5.id))!.status, "aguardando_pagamento");
  const s7 = await doSite();
  await db.update(orders).set({ createdAt: new Date(Date.now() - 25 * 60 * 60_000) }).where(eq(orders.id, s7.id));
  await pix.cancelarPixVencidos(B.t.id);
  assert.equal((await m.q.getOrder(A.t.id, s7.id))!.status, "aguardando_pagamento", "outra empresa não cancela");
  await pix.cancelarPixVencidos(A.t.id);
  const v7 = (await m.q.getOrder(A.t.id, s7.id))!;
  assert.equal(v7.status, "cancelado");
  assert.equal(v7.cancelReason, "Pix não conferido em 24 horas");
  await assert.rejects(m.orders.confirmPix({ ...A.ctx, role: "atendente" }, s5.id), /Sem permissão/);
  await m.orders.confirmPix({ ...A.ctx, role: "caixa" }, s5.id);
  const conferido = (await m.q.getOrder(A.t.id, s5.id))!;
  assert.equal(conferido.status, "aberto");
  assert.ok(conferido.pixConfirmedAt);
});

test("Pix já pago: cancelar ou entregar menos deixa o valor a devolver no pedido até a loja marcar", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const [d] = await db.insert(users).values({ tenantId: A.t.id, name: "devolve", email: `devolve@${A.t.id}.test`, role: "entregador", passwordHash: "x" }).returning();
  await m.stock.receivePurchase(A.ctx, { productId: A.product.id, full: 20, emptiesReturned: 0, note: "carga do teste" });
  await m.shifts.openShift(A.ctx, d.id, 0);
  const caixa = { ...A.ctx, role: "caixa" as const };
  const entregador = { tenantId: A.t.id, userId: d.id, role: "entregador" as const, branchId: A.branch.id };
  const pedido = (quantity: number, cashPartCents: number, driverId: string | null) =>
    m.orders.createOrder(A.ctx, {
      mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity, returnsEmpty: true }],
      paymentMethod: "pix", cashPartCents, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId,
    });
  const parcial = async (id: string, n: number) => {
    const [item] = (await m.q.getOrder(A.t.id, id))!.items;
    return m.orders.deliverOrder(entregador, id, { delivered: { [item.id]: n }, note: "cliente quis menos" });
  };

  // 3 x 110 = 330, sendo 100 em dinheiro e 230 no Pix já pago; chega só 1 (110): o Pix cobre tudo e sobram 120
  const a = await pedido(3, 10000, d.id);
  await m.orders.confirmPix(caixa, a.id);
  await parcial(a.id, 1);
  const pa = (await m.q.getOrder(A.t.id, a.id))!;
  assert.equal(pa.totalCents, 11000);
  assert.equal(pa.paymentMethod, "pix");
  assert.equal(pa.cashPartCents, 0);
  assert.equal(pa.pixDevolverCents, 12000);

  // 300 em dinheiro e 30 no Pix pago; chega 1 (110): o entregador cobra só os 80 que faltam, nada a devolver
  const b = await pedido(3, 30000, d.id);
  await m.orders.confirmPix(caixa, b.id);
  await parcial(b.id, 1);
  const pb = (await m.q.getOrder(A.t.id, b.id))!;
  assert.equal(pb.cashPartCents, 8000);
  assert.equal(pb.pixDevolverCents, 0);

  // cancelado depois do Pix conferido: o Pix inteiro volta
  const c = await pedido(1, 0, null);
  await m.orders.confirmPix(caixa, c.id);
  await m.orders.cancelOrder({ ...A.ctx, role: "atendente" }, c.id, "cliente desistiu");
  assert.equal((await m.q.getOrder(A.t.id, c.id))!.pixDevolverCents, 11000);
  // cancelado sem Pix pago: nada a devolver
  const e = await pedido(1, 0, null);
  await m.orders.cancelOrder(A.ctx, e.id, "lançado errado");
  assert.equal((await m.q.getOrder(A.t.id, e.id))!.pixDevolverCents, 0);

  // a lista do caixa mostra os dois a devolver, e outra empresa não vê nada
  const lista = await m.q.listPixDevolver(A.t.id, A.branch.id);
  assert.deepEqual(lista.filter((l) => [a.id, c.id].includes(l.id)).map((l) => l.cents).sort(), [11000, 12000]);
  assert.equal((await m.q.listPixDevolver(B.t.id, null)).some((l) => l.id === a.id), false);

  // só dono ou caixa marca como devolvido, uma vez só, e outra empresa não mexe
  await assert.rejects(m.orders.marcarPixDevolvido({ ...A.ctx, role: "atendente" }, c.id), /Sem permissão/);
  await assert.rejects(m.orders.marcarPixDevolvido(B.ctx, c.id), /não tem Pix a devolver/);
  await m.orders.marcarPixDevolvido(caixa, c.id);
  assert.equal((await m.q.getOrder(A.t.id, c.id))!.pixDevolverCents, 0);
  await assert.rejects(m.orders.marcarPixDevolvido(caixa, c.id), /não tem Pix a devolver/);
});

test("aviso no celular: o cliente se inscreve pelo link do pedido e recebe saiu e entregue; ao terminar, a inscrição sai", async () => {
  const { db } = m.db;
  const { avisosPedido } = m.schema;
  const { eq } = await import("drizzle-orm");
  const webpush = (await import("web-push")).default;
  const k = webpush.generateVAPIDKeys();
  process.env.NEXT_PUBLIC_VAPID_PUBLICA = k.publicKey;
  process.env.VAPID_PRIVADA = k.privateKey;
  const aviso = await import("@/domain/aviso");
  const enviados: { endpoint: string; corpo: { title: string; body: string; url: string } }[] = [];
  let morto = "";
  aviso.usarEnvio(async (sub, payload) => {
    if (sub.endpoint === morto) throw Object.assign(new Error("Gone"), { statusCode: 410 });
    enviados.push({ endpoint: sub.endpoint, corpo: JSON.parse(String(payload)) });
    return { statusCode: 201, body: "", headers: {} };
  });
  // o aviso roda depois da mudança gravada, sem segurar quem chamou: espera ele chegar
  const esperar = async (n: number) => {
    for (let i = 0; i < 50 && enviados.length < n; i++) await new Promise((r) => setTimeout(r, 20));
  };
  const insc = (n: string) => ({ endpoint: `https://fcm.googleapis.com/fcm/send/${n}`, keys: { p256dh: "B".repeat(87), auth: "a".repeat(22) } });

  const o = await m.orders.createOrder(A.ctx, {
    mode: "entrega", origin: "portal", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
  });
  // só pelo link certo, na loja certa, com uma inscrição válida
  await assert.rejects(m.portal.inscreverAviso(B.t.slug, o.trackingId, insc("x")), /não encontrado/);
  await assert.rejects(m.portal.inscreverAviso(A.t.slug, o.trackingId, { endpoint: "http://inseguro", keys: {} }));
  // endereço que não é serviço de push: o servidor faria POST para dentro da rede
  await assert.rejects(m.portal.inscreverAviso(A.t.slug, o.trackingId, { ...insc("x"), endpoint: "https://127.0.0.1:8080/x" }));
  await assert.rejects(m.portal.inscreverAviso(A.t.slug, o.trackingId, { ...insc("x"), endpoint: "https://fcm.googleapis.com.mal.com/x" }));
  await m.portal.inscreverAviso(A.t.slug, o.trackingId, insc("celular"));
  await m.portal.inscreverAviso(A.t.slug, o.trackingId, insc("celular"));
  await m.portal.inscreverAviso(A.t.slug, o.trackingId, insc("velho"));
  assert.equal((await db.select().from(avisosPedido).where(eq(avisosPedido.orderId, o.id))).length, 2);

  // o navegador desfez uma inscrição (410): ela sai do banco no primeiro aviso
  morto = "https://fcm.googleapis.com/fcm/send/velho";
  await m.orders.dispatchOrder(A.ctx, o.id, A.driver.id);
  await esperar(1);
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(enviados.length, 1);
  assert.match(enviados[0].corpo.body, /Saiu para entrega com Entregador/);
  assert.match(enviados[0].corpo.url, new RegExp(`/acompanhar/${o.trackingId}$`));
  assert.equal((await db.select().from(avisosPedido).where(eq(avisosPedido.orderId, o.id))).length, 1);

  // entregue: avisa e a inscrição sai (o pedido acabou)
  await m.orders.deliverOrder({ ...A.ctx, role: "entregador", userId: A.driver.id }, o.id);
  await esperar(2);
  await new Promise((r) => setTimeout(r, 100));
  assert.match(enviados[1].corpo.body, /entregue/);
  assert.equal((await db.select().from(avisosPedido).where(eq(avisosPedido.orderId, o.id))).length, 0);
  await assert.rejects(m.portal.inscreverAviso(A.t.slug, o.trackingId, insc("tarde")), /já terminou/);
  delete process.env.NEXT_PUBLIC_VAPID_PUBLICA;
  delete process.env.VAPID_PRIVADA;
});

test("contas a pagar: nasce com vencimento, paga vira despesa, cancelar a despesa reabre, boleto da compra vira conta", async () => {
  const { db } = m.db;
  const { contasPagar, expenses } = m.schema;
  const { eq } = await import("drizzle-orm");
  const contas = await import("@/domain/contas");
  const { todayISO } = await import("@/lib/period");
  const hoje = todayISO();
  const ontem = new Date(Date.parse(`${hoje}T12:00:00Z`) - 864e5).toISOString().slice(0, 10);
  const daqui10 = new Date(Date.parse(`${hoje}T12:00:00Z`) + 10 * 864e5).toISOString().slice(0, 10);
  const nova = { description: "Boleto do gás", category: "fornecedor" as const, amountCents: 120000, dueOn: hoje };
  const antes = await contas.contasVencendo(A.t.id, A.branch.id);

  await assert.rejects(contas.criarConta({ ...A.ctx, role: "atendente" }, nova), /Sem permissão/);
  await assert.rejects(contas.criarConta(A.ctx, { ...nova, dueOn: "" }), /vencimento/);
  await assert.rejects(contas.criarConta(A.ctx, { ...nova, supplierId: crypto.randomUUID() }), /Fornecedor não encontrado/);
  const c1 = await contas.criarConta({ ...A.ctx, role: "caixa" }, nova);
  const c2 = await contas.criarConta(A.ctx, { ...nova, description: "Aluguel", category: "aluguel", dueOn: ontem });
  const c3 = await contas.criarConta(A.ctx, { ...nova, description: "Luz", category: "aluguel", dueOn: daqui10 });
  // na lista, da que vence primeiro para a última; o Painel conta vencida e a que vence hoje/amanhã
  const abertas = await contas.contasEmAberto(A.t.id, A.branch.id);
  assert.deepEqual(abertas.filter((c) => [c1.id, c2.id, c3.id].includes(c.id)).map((c) => c.description), ["Aluguel", "Boleto do gás", "Luz"]);
  const agora = await contas.contasVencendo(A.t.id, A.branch.id);
  assert.equal(agora.vencidas, antes.vencidas + 1);
  assert.equal(agora.vencendo, antes.vencendo + 1);
  // outra empresa não vê nem paga
  assert.ok((await contas.contasEmAberto(B.t.id, B.branch.id)).every((c) => c.id !== c1.id));
  await assert.rejects(contas.pagarConta(B.ctx, c1.id, { method: "pix", paidOn: hoje }), /não encontrada/);

  // pagou: vira despesa com a forma e a data do pagamento, e sai de "A pagar"
  await assert.rejects(contas.pagarConta(A.ctx, c1.id, { method: "pix", paidOn: daqui10 }), /futuro/);
  await contas.pagarConta(A.ctx, c1.id, { method: "pix", paidOn: hoje });
  await assert.rejects(contas.pagarConta(A.ctx, c1.id, { method: "pix", paidOn: hoje }), /já foi paga/);
  const [paga] = await db.select().from(contasPagar).where(eq(contasPagar.id, c1.id));
  const [despesa] = await db.select().from(expenses).where(eq(expenses.id, paga.expenseId!));
  assert.equal(despesa.amountCents, 120000);
  assert.equal(despesa.method, "pix");
  assert.equal(despesa.category, "fornecedor");
  assert.ok((await contas.contasEmAberto(A.t.id, A.branch.id)).every((c) => c.id !== c1.id));
  // a despesa do pagamento foi cancelada: a conta volta para "A pagar"
  await m.exp.voidExpense(A.ctx, despesa.id, "paguei errado");
  assert.ok((await contas.contasEmAberto(A.t.id, A.branch.id)).some((c) => c.id === c1.id));

  // cancelar: só o dono, só em aberto
  await assert.rejects(contas.cancelarConta({ ...A.ctx, role: "caixa" }, c3.id, "lançada duas vezes"), /Sem permissão/);
  await contas.cancelarConta(A.ctx, c3.id, "lançada duas vezes");
  assert.ok((await contas.contasEmAberto(A.t.id, A.branch.id)).every((c) => c.id !== c3.id));
  await assert.rejects(contas.cancelarConta(A.ctx, c3.id, "de novo"), /em aberto/);

  // entrada de compra no boleto vira conta a pagar (com vencimento); no Pix, despesa de hoje
  const compra = { productId: A.product.id, full: 5, emptiesReturned: 0, note: "", costCents: 50000 };
  await assert.rejects(m.stock.receivePurchase(A.ctx, { ...compra, costMethod: "boleto" }), /vencimento do boleto/);
  await m.stock.receivePurchase(A.ctx, { ...compra, costMethod: "boleto", dueOn: daqui10 });
  assert.ok((await contas.contasEmAberto(A.t.id, A.branch.id)).some((c) => c.description.startsWith("Compra: 5 x") && c.dueOn === daqui10));
  const despesasAntes = (await db.select().from(expenses).where(eq(expenses.tenantId, A.t.id))).length;
  await m.stock.receivePurchase(A.ctx, { ...compra, costMethod: "pix" });
  assert.equal((await db.select().from(expenses).where(eq(expenses.tenantId, A.t.id))).length, despesasAntes + 1);
  await contas.cancelarConta(A.ctx, c2.id, "fim do teste");
});

test("entregador sem celular: entra na equipe sem e-mail nem senha, e a loja lança a entrega dele", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const { eq } = await import("drizzle-orm");
  await assert.rejects(m.registry.createUser(A.ctx, { name: "Sem Email", email: "", password: "", role: "entregador" }), /E-mail inválido/);
  await assert.rejects(m.registry.createUser(A.ctx, { name: "Atendente Sem", semAcesso: true, role: "atendente" }), /Só entregador/);
  const u = await m.registry.createUser(A.ctx, { name: "Zé Sem Celular", semAcesso: true, role: "entregador" });
  const [z] = await db.select().from(users).where(eq(users.id, u.id));
  assert.ok(m.registry.semAcesso(z.email));
  assert.equal(z.branchId, A.branch.id);
  // turno, saída e entrega lançados pela atendente, sem o entregador entrar no sistema
  const atendente = { ...A.ctx, role: "atendente" as const };
  await m.shifts.openShift(atendente, u.id, 2000);
  const o = await m.orders.createOrder(atendente, {
    mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: u.id,
  });
  await m.orders.deliverOrder(atendente, o.id);
  assert.equal((await m.q.getOrder(A.t.id, o.id))!.status, "entregue");
});

test("cadastro pelo próprio dono: empresa, principal e dono com termos aceitos; e-mail repetido não passa", async () => {
  const { db } = m.db;
  const { users, branches } = m.schema;
  const { eq } = await import("drizzle-orm");
  const email = `novo-${Date.now()}@cadastro.test`;
  const input = { company: "Água Boa", ownerName: "Rita", email, password: "senha-boa-1", vende: "ambos" as const };
  assert.throws(() => m.platform.cadastroSchema.parse({ ...input, vende: "pao" }), /Escolha o que a revenda vende/);
  await assert.rejects(m.platform.cadastrarEmpresa(m.platform.cadastroSchema.parse({ ...input, email: A.owner.email }), "v1"), /Já existe/);
  assert.throws(() => m.platform.cadastroSchema.parse({ ...input, password: "curta" }), /8 caracteres/);
  const { tenant, ownerId } = await m.platform.cadastrarEmpresa(m.platform.cadastroSchema.parse({ ...input, email: email.toUpperCase() }), "v1");
  const [dono] = await db.select().from(users).where(eq(users.id, ownerId));
  assert.equal(dono.email, email);
  assert.equal(dono.role, "dono");
  assert.equal(dono.termsVersion, "v1");
  const filiais = await db.select().from(branches).where(eq(branches.tenantId, tenant.id));
  assert.deepEqual(filiais.map((b) => [b.name, b.main]), [["Principal", true]]);
  // nasce com os produtos do que vende, com preço sugerido, e nada da empresa A aparece
  const prods = await m.q.listProducts(tenant.id);
  assert.deepEqual(prods.map((p) => [p.name, p.precoSugerido]), [["Galão de água 20L", true], ["Gás P13", true], ["Gás P45", true]]);
  assert.equal((await m.q.primeirosPassos(tenant.id)).produtos, false);
  await m.registry.saveProduct({ tenantId: tenant.id, userId: ownerId, role: "dono", branchId: filiais[0].id }, { name: "Gás P13", priceCents: 12000, returnable: true, minStock: 10, active: true }, prods[1].id);
  assert.equal((await m.q.listProducts(tenant.id)).find((p) => p.id === prods[1].id)!.precoSugerido, false);
  assert.equal((await m.q.stockOverview(tenant.id, filiais[0].id)).length, 3);
});

test("mensalidade: teste grátis no cadastro, Pix na conta da Solace, pago soma um mês uma vez só", async () => {
  const { db } = m.db;
  const { tenants, branches } = m.schema;
  const { eq } = await import("drizzle-orm");
  const mp = await import("@/lib/mercadopago");
  const ass = await import("@/domain/assinatura");
  const { somarDias, PLANO } = await import("@/lib/plano");
  const { todayISO } = await import("@/lib/period");
  const hoje = todayISO();

  const { tenant, ownerId } = await m.platform.cadastrarEmpresa(
    m.platform.cadastroSchema.parse({ company: "Gás Pago", ownerName: "Davi", email: `davi-${Date.now()}@cadastro.test`, password: "senha-boa-1", vende: "gas" }),
    "v1",
  );
  const pagoAte = async () => (await db.select({ p: tenants.pagoAte }).from(tenants).where(eq(tenants.id, tenant.id)))[0].p;
  assert.equal(await pagoAte(), somarDias(hoje, PLANO.diasGratis));
  const [filial] = await db.select().from(branches).where(eq(branches.tenantId, tenant.id));
  const dono = { tenantId: tenant.id, userId: ownerId, role: "dono" as const, branchId: filial.id };

  delete process.env.MP_TOKEN_SOLACE;
  await assert.rejects(ass.pixAssinatura(dono), /não está ligada/);
  process.env.MP_TOKEN_SOLACE = "APP_USR-solace";
  const cobrancas = new Map<string, { ref: string; valor: number; pago: boolean }>();
  mp.usarRede(async (url, init) => {
    if (new Headers(init?.headers).get("Authorization") !== "Bearer APP_USR-solace") return new Response("{}", { status: 401 });
    const json = (o: unknown) => new Response(JSON.stringify(o), { status: 200 });
    const caminho = String(url).replace("https://api.mercadopago.com", "");
    if (caminho === "/v1/orders" && init?.method === "POST") {
      const b = JSON.parse(String(init.body));
      // como o Mercado Pago de verdade: referência só com letras, números, - e _ (o ":" dava 400 em produção)
      if (!/^[\w-]{1,64}$/.test(b.external_reference)) return new Response(JSON.stringify({ errors: [{ code: "property_value" }] }), { status: 400 });
      const id = String(7000 + cobrancas.size);
      cobrancas.set(id, { ref: b.external_reference, valor: Math.round(Number(b.total_amount) * 100), pago: false });
      return json({ id: `ORD00000000000${id}`, status: "action_required", transactions: { payments: [{ payment_method: { qr_code: `000201SOLACE${id}` } }] } });
    }
    const c = cobrancas.get(caminho.split("/").pop()!.replace(/^ORD0+/, ""));
    return c ? json({ status: c.pago ? "processed" : "action_required", external_reference: c.ref, total_amount: (c.valor / 100).toFixed(2) }) : new Response("{}", { status: 404 });
  });

  await assert.rejects(ass.pixAssinatura({ ...dono, role: "caixa" }), /Sem permissão/);
  // dois cliques juntos: uma cobrança só no Mercado Pago
  const [pix, pix2] = await Promise.all([ass.pixAssinatura(dono), ass.pixAssinatura(dono)]);
  assert.equal(pix2.id, pix.id);
  assert.equal(pix.codigo, "000201SOLACE7000");
  assert.equal(pix.valorCents, PLANO.mensalCents);
  assert.equal((await ass.pixAssinatura(dono)).id, pix.id);
  assert.equal(cobrancas.size, 1);
  // a cobrança não aparece para outra empresa
  assert.equal(await ass.pixEmAberto(A.t.id), null);

  assert.equal(await ass.conferirAssinatura(tenant.id), false);
  cobrancas.get("7000")!.pago = true;
  // o aviso com o pagamento certo confirma; repetir não soma de novo
  const aviso = await import("@/app/api/mercadopago/route");
  await aviso.POST(new Request("http://x/api/mercadopago", { method: "POST", body: JSON.stringify({ type: "order", data: { id: "ORD000000000007000" } }) }));
  const esperado = new Date(Date.parse(`${somarDias(hoje, PLANO.diasGratis)}T00:00:00Z`));
  esperado.setUTCMonth(esperado.getUTCMonth() + 1);
  assert.equal(await pagoAte(), esperado.toISOString().slice(0, 10));
  assert.equal(await ass.conferirAssinatura(tenant.id), false);
  assert.equal(await pagoAte(), esperado.toISOString().slice(0, 10));
  assert.equal((await ass.pagamentosFeitos(tenant.id)).length, 1);
  assert.equal(await ass.pixEmAberto(tenant.id), null);
  delete process.env.MP_TOKEN_SOLACE;
});

test("mensalidade no cartão: cada cobrança do Mercado Pago soma um mês, uma vez só; desligar mantém o que foi pago", async () => {
  const { db } = m.db;
  const { tenants, branches } = m.schema;
  const { eq } = await import("drizzle-orm");
  const mp = await import("@/lib/mercadopago");
  const ass = await import("@/domain/assinatura");
  const { somarDias, PLANO } = await import("@/lib/plano");
  const { todayISO } = await import("@/lib/period");
  const hoje = todayISO();
  const { tenant, ownerId } = await m.platform.cadastrarEmpresa(
    m.platform.cadastroSchema.parse({ company: "Gás no Cartão", ownerName: "Lia", email: `lia-${Date.now()}@cadastro.test`, password: "senha-boa-1", vende: "gas" }),
    "v1",
  );
  const [filial] = await db.select().from(branches).where(eq(branches.tenantId, tenant.id));
  const dono = { tenantId: tenant.id, userId: ownerId, role: "dono" as const, branchId: filial.id };
  const pagoAte = async () => (await db.select({ p: tenants.pagoAte }).from(tenants).where(eq(tenants.id, tenant.id)))[0].p;
  const mais = (meses: number) => {
    const d = new Date(Date.parse(`${somarDias(hoje, PLANO.diasGratis)}T00:00:00Z`));
    d.setUTCMonth(d.getUTCMonth() + meses);
    return d.toISOString().slice(0, 10);
  };

  process.env.MP_TOKEN_SOLACE = "APP_USR-solace";
  const antes = process.env.APP_URL;
  process.env.APP_URL = "https://depo.test";
  const assinaturas = new Map<string, { ref: string; valor: number; situacao: string; cobradas: number; email: string }>();
  mp.usarRede(async (url, init) => {
    if (new Headers(init?.headers).get("Authorization") !== "Bearer APP_USR-solace") return new Response("{}", { status: 401 });
    const json = (o: unknown) => new Response(JSON.stringify(o), { status: 200 });
    const caminho = String(url).replace("https://api.mercadopago.com", "");
    if (caminho === "/preapproval" && init?.method === "POST") {
      const b = JSON.parse(String(init.body));
      const id = `2c938084${String(assinaturas.size).padStart(24, "0")}`;
      assinaturas.set(id, { ref: b.external_reference, valor: Math.round(b.auto_recurring.transaction_amount * 100), situacao: "pending", cobradas: 0, email: b.payer_email });
      return json({ id, status: "pending", init_point: `https://www.mercadopago.com.br/subscriptions/checkout?preapproval_id=${id}` });
    }
    if (caminho.startsWith("/authorized_payments/")) return json({ preapproval_id: [...assinaturas.keys()].at(-1) });
    const a = assinaturas.get(caminho.split("/").pop()!);
    if (!a) return new Response("{}", { status: 404 });
    if (init?.method === "PUT") a.situacao = JSON.parse(String(init.body)).status;
    return json({ id: caminho.split("/").pop(), status: a.situacao, external_reference: a.ref, auto_recurring: { transaction_amount: a.valor / 100 }, summarized: { charged_quantity: a.cobradas } });
  });

  await assert.rejects(ass.assinarNoCartao({ ...dono, role: "caixa" }, "lia@mp.test"), /Sem permissão/);
  const link = await ass.assinarNoCartao(dono, "lia@mp.test");
  assert.match(link, /^https:\/\/www\.mercadopago\.com\.br\//);
  const [id1] = assinaturas.keys();
  assert.equal(assinaturas.get(id1)!.email, "lia@mp.test");
  assert.equal(assinaturas.get(id1)!.valor, PLANO.mensalCents);
  assert.equal((await ass.conferirCartao(tenant.id))?.situacao, "pending");

  // começar de novo cancela a que ficou pela metade: nunca duas cobrando
  await ass.assinarNoCartao(dono, "lia@mp.test");
  const id2 = [...assinaturas.keys()][1];
  assert.equal(assinaturas.get(id1)!.situacao, "cancelled");

  // autorizou e o Mercado Pago cobrou: o aviso da cobrança soma um mês, e repetir não soma de novo
  Object.assign(assinaturas.get(id2)!, { situacao: "authorized", cobradas: 1 });
  const aviso = await import("@/app/api/mercadopago/route");
  const avisar = (type: string, id: string) => aviso.POST(new Request("http://x/api/mercadopago", { method: "POST", body: JSON.stringify({ type, data: { id } }) }));
  await Promise.all([avisar("subscription_authorized_payment", "123456"), avisar("subscription_preapproval", id2)]);
  assert.equal(await pagoAte(), mais(1));
  assert.equal((await ass.conferirCartao(tenant.id))?.caiu, false);
  assert.equal(await pagoAte(), mais(1));
  await assert.rejects(ass.assinarNoCartao(dono, "lia@mp.test"), /já está ligada/);

  // dois meses depois, sem aviso: a conferência da tela conta os dois
  assinaturas.get(id2)!.cobradas = 3;
  assert.equal((await ass.conferirCartao(tenant.id))?.caiu, true);
  assert.equal(await pagoAte(), mais(3));
  assert.equal((await ass.pagamentosFeitos(tenant.id)).length, 3);

  // outra empresa não pega a assinatura desta, nem com o aviso
  assert.equal(await ass.conferirCartao(A.t.id), null);

  // vence no último dia do mês: continua no último dia, sem ficar preso no 28 depois de fevereiro
  await db.update(tenants).set({ pagoAte: "2027-01-31" }).where(eq(tenants.id, tenant.id));
  assinaturas.get(id2)!.cobradas = 4;
  await ass.conferirCartao(tenant.id);
  assert.equal(await pagoAte(), "2027-02-28");
  assinaturas.get(id2)!.cobradas = 5;
  await ass.conferirCartao(tenant.id);
  assert.equal(await pagoAte(), "2027-03-31");

  // uma cobrança cai e o dono desliga antes de alguém conferir: ela conta mesmo assim
  assinaturas.get(id2)!.cobradas = 6;
  await ass.cancelarCartao(dono);
  assert.equal(assinaturas.get(id2)!.situacao, "cancelled");
  assert.equal(await ass.conferirCartao(tenant.id), null);
  assert.equal(await pagoAte(), "2027-04-30", "o que já foi pago continua, inclusive a última cobrança");
  delete process.env.MP_TOKEN_SOLACE;
  process.env.APP_URL = antes;
});

test("admin da Solace nasce com filial: sem ela o login quebrava ao procurar onde a pessoa trabalha", async () => {
  const { eq } = await import("drizzle-orm");
  const { db } = m.db;
  const { users, branches } = m.schema;
  const email = `admin-${Date.now()}@teste`;
  assert.equal(await m.platform.ensurePlatformAdmin(email, "senha-forte-123"), true);
  const [u] = await db.select().from(users).where(eq(users.email, email));
  const filiais = await db.select().from(branches).where(eq(branches.tenantId, u.tenantId));
  assert.deepEqual(
    filiais.map((b) => [b.name, b.main, b.active]),
    [["Principal", true, true]],
  );
  // de novo não cria nada: o admin já existe
  assert.equal(await m.platform.ensurePlatformAdmin(email, "senha-forte-123"), false);
});

test("Mercado Pago pelo botão: só aceita a aplicação certa, guarda a renovação cifrada e renova perto de vencer", async () => {
  const { eq } = await import("drizzle-orm");
  const { randomBytes } = await import("node:crypto");
  const { db } = m.db;
  const { tenants } = m.schema;
  process.env.SEGREDO_CHAVE ??= randomBytes(32).toString("base64");
  Object.assign(process.env, { MP_CLIENT_ID: "app-1", MP_CLIENT_SECRET: "segredo-1", APP_URL: "https://app.teste" });
  const mp = await import("@/lib/mercadopago");
  const pix = await import("@/domain/pix");
  const pedidos: string[] = [];
  mp.usarRede(async (url, init) => {
    const caminho = String(url).replace("https://api.mercadopago.com", "");
    const b = init?.body ? JSON.parse(String(init.body)) : {};
    if (caminho === "/oauth/token") {
      pedidos.push(b.grant_type);
      if (b.client_secret !== "segredo-1" || b.redirect_uri === "https://outro") return Response.json({ message: "invalid_client" }, { status: 400 });
      const novo = b.grant_type === "refresh_token";
      return Response.json({ access_token: novo ? "APP_USR-novo" : "APP_USR-primeiro", refresh_token: novo ? "TG-novo" : "TG-primeiro", expires_in: 15_552_000 });
    }
    if (caminho === "/users/me") return Response.json({ id: 9, email: "loja-o@mp.com" });
    return new Response("{}", { status: 404 });
  });

  const app = mp.appMp()!;
  assert.equal(app.redirectUri, "https://app.teste/api/mercadopago/retorno");
  const ida = new URL(mp.urlAutorizacao(app, "st-1"));
  assert.deepEqual([ida.searchParams.get("client_id"), ida.searchParams.get("state"), ida.searchParams.get("redirect_uri")], ["app-1", "st-1", app.redirectUri]);
  await assert.rejects(mp.trocarCodigoMp({ ...app, clientSecret: "errado" }, "codigo-1"), /recusou a autorização/);

  const O = await makeTenant("O");
  await assert.rejects(pix.conectarMercadoPagoOAuth({ ...O.ctx, role: "atendente" }, await mp.trocarCodigoMp(app, "c")), /Sem permissão/);
  await pix.conectarMercadoPagoOAuth(O.ctx, await mp.trocarCodigoMp(app, "codigo-1"));
  const ler = async () => (await db.select().from(tenants).where(eq(tenants.id, O.t.id)))[0];
  let t = await ler();
  assert.equal(t.mpConta, "loja-o@mp.com");
  assert.ok(t.mpRefreshEnc && !t.mpRefreshEnc.includes("TG-primeiro"));
  assert.ok(t.mpExpiraEm! > new Date(Date.now() + 170 * 86_400_000));

  // longe de vencer: usa o token atual, sem perguntar nada ao Mercado Pago
  const antes = pedidos.length;
  assert.equal(await pix.tokenMp(O.t.id, { ...t, mpTokenEnc: t.mpTokenEnc! }), "APP_USR-primeiro");
  assert.equal(pedidos.length, antes);

  // faltando 5 dias: renova, guarda o token e a chave novos e a validade nova
  await db.update(tenants).set({ mpExpiraEm: new Date(Date.now() + 5 * 86_400_000) }).where(eq(tenants.id, O.t.id));
  t = await ler();
  assert.equal(await pix.tokenMp(O.t.id, { ...t, mpTokenEnc: t.mpTokenEnc! }), "APP_USR-novo");
  t = await ler();
  assert.ok(t.mpExpiraEm! > new Date(Date.now() + 170 * 86_400_000));
  assert.equal(await pix.tokenMp(O.t.id, { ...t, mpTokenEnc: t.mpTokenEnc! }), "APP_USR-novo");
  assert.equal(pedidos.at(-1), "refresh_token");

  await pix.desconectarMercadoPago(O.ctx);
  t = await ler();
  assert.deepEqual([t.mpTokenEnc, t.mpRefreshEnc, t.mpExpiraEm, t.mpConta], [null, null, null, null]);
  for (const k of ["MP_CLIENT_ID", "MP_CLIENT_SECRET", "APP_URL"]) delete process.env[k];
});

test("empresa: o dono salva nome, telefone e endereço, e o portal mostra o contato", async () => {
  const { db } = m.db;
  const { tenants } = m.schema;
  const { eq } = await import("drizzle-orm");
  const [antes] = await db.select({ name: tenants.name, phone: tenants.phone, address: tenants.address, slug: tenants.slug, portal: tenants.portalEnabled }).from(tenants).where(eq(tenants.id, A.t.id));
  await assert.rejects(m.registry.saveSettings(A.ctx, { phone: "123" }), /DDD/);
  await assert.rejects(m.registry.saveSettings({ ...A.ctx, role: "atendente" }, { phone: "" }));
  await m.registry.saveSettings(A.ctx, { name: "Fonte Azul", phone: "11987654321", address: "Rua A, 1" });
  await m.registry.saveSettings(A.ctx, { portalEnabled: true });
  const t = await m.portal.portalTenant(antes.slug);
  assert.deepEqual([t?.name, t?.phone, t?.address], ["Fonte Azul", "(11) 98765-4321", "Rua A, 1"]);
  // telefone vazio vale: a loja pode não querer mostrar
  await m.registry.saveSettings(A.ctx, { phone: "" });
  await db.update(tenants).set({ name: antes.name, phone: antes.phone, address: antes.address, portalEnabled: antes.portal }).where(eq(tenants.id, A.t.id));
});

test("lista de clientes traz quando cada um pediu pela última vez", async () => {
  const lista = await m.q.listCustomers(A.t.id);
  const comPedido = lista.find((c) => c.id === A.customer.id);
  assert.ok(comPedido?.ultimoPedido instanceof Date, "o cliente com pedido mostra a data do último");
  const { and, eq, max, ne } = await import("drizzle-orm");
  const { orders } = m.schema;
  const [ultimo] = await m.db.db
    .select({ m: max(orders.createdAt) })
    .from(orders)
    .where(and(eq(orders.customerId, A.customer.id), ne(orders.status, "cancelado")));
  assert.equal(comPedido!.ultimoPedido!.getTime(), ultimo.m!.getTime());
});

test("viagem: saem juntos, o acerto da volta conta só o dinheiro dela e o que ficou na rua vai para a próxima", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const [driver] = await db.insert(users).values({ tenantId: A.t.id, name: "Entregador Viagem", email: `vg@${A.t.id}.test`, role: "entregador", passwordHash: "x", branchId: A.branch.id }).returning();
  const caixa = { ...A.ctx, role: "caixa" as const };
  const atendente = { ...A.ctx, role: "atendente" as const };
  const comDriver = { tenantId: A.t.id, userId: driver.id, role: "entregador" as const, branchId: A.branch.id };
  const shift = await m.shifts.openShift(atendente, driver.id, 3000);
  const novo = (paymentMethod: "dinheiro" | "pix") =>
    m.orders.createOrder(A.ctx, {
      mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
      paymentMethod, deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
    });
  const [o1, o2, o3] = [await novo("dinheiro"), await novo("pix"), await novo("dinheiro")];

  // tudo ou nada: um pedido inválido segura os outros na fila
  await assert.rejects(m.orders.dispatchOrders(atendente, [o1.id, crypto.randomUUID()], driver.id));
  const viagens0 = await m.q.listViagens(A.t.id, A.branch.id);
  assert.equal(viagens0.filter((v) => v.driverId === driver.id).length, 0);

  await m.orders.dispatchOrders(atendente, [o1.id, o2.id], driver.id);
  // saiu depois, mas antes de ele voltar: entra na mesma viagem
  await m.orders.dispatchOrder(atendente, o3.id, driver.id);
  const naRua = (await m.q.listViagens(A.t.id, A.branch.id)).filter((v) => v.driverId === driver.id);
  assert.equal(naRua.length, 3);
  const trip = naRua[0].tripId!;
  assert.ok(naRua.every((v) => v.tripId === trip), "os três na mesma viagem");
  assert.equal((await m.q.listViagens(B.t.id, B.branch.id)).some((v) => v.tripId === trip), false, "B não vê a viagem de A");

  await m.orders.deliverOrder(comDriver, o1.id);
  await m.orders.deliverOrder(comDriver, o2.id);
  // o3 ainda não foi entregue quando ele passa na loja

  await assert.rejects(m.shifts.settleTrip(atendente, shift.id, trip, 11000, ""), /Sem permissão/);
  await assert.rejects(m.shifts.settleTrip(B.ctx, shift.id, trip, 11000, ""), /não encontrado/);
  await assert.rejects(m.shifts.settleTrip(caixa, shift.id, trip, 10000, ""), /explique/);
  // só o dinheiro de o1 conta nesta volta: o Pix não passa pela mão dele, e o troco fica com ele
  const r = await m.shifts.settleTrip(caixa, shift.id, trip, 11000, "");
  assert.deepEqual(r, { esperado: 11000, diff: 0 });
  await assert.rejects(m.shifts.settleTrip(caixa, shift.id, trip, 11000, ""), /já foi acertada/);

  const depois = (await m.q.listViagens(A.t.id, A.branch.id)).filter((v) => v.driverId === driver.id);
  assert.deepEqual(depois.map((v) => v.id), [o3.id], "só o que ficou na rua continua, numa viagem nova");
  assert.notEqual(depois[0].tripId, trip);

  // a volta seguinte fecha com falta: o turno cobra de novo no fim
  await m.orders.deliverOrder(comDriver, o3.id);
  await m.shifts.settleTrip(caixa, shift.id, depois[0].tripId!, 10000, "faltou dez");
  const view = await m.q.getShift(A.t.id, shift.id);
  assert.equal(view!.expected, 3000 + 1000, "troco mais a falta da segunda volta");

  // estornar o acerto da volta reabre a viagem
  const { cashEntries } = m.schema;
  const { eq } = await import("drizzle-orm");
  const [entrada] = await db.select().from(cashEntries).where(eq(cashEntries.tripId, trip));
  await m.shifts.voidCashEntry(A.ctx, entrada.id, "contou errado");
  assert.equal((await m.q.listViagens(A.t.id, A.branch.id)).filter((v) => v.tripId === trip).length, 2);
});

test("nota do entregador: viagem acertada com falta, demora para voltar pelo celular e ocorrência", async () => {
  const { db } = m.db;
  const { users } = m.schema;
  const [driver] = await db.insert(users).values({ tenantId: A.t.id, name: "Entregador Nota", email: `nota@${A.t.id}.test`, role: "entregador", passwordHash: "x", branchId: A.branch.id }).returning();
  const caixa = { ...A.ctx, role: "caixa" as const };
  const comDriver = { tenantId: A.t.id, userId: driver.id, role: "entregador" as const, branchId: A.branch.id };
  const shift = await m.shifts.openShift(A.ctx, driver.id, 0);
  const novo = () =>
    m.orders.createOrder(A.ctx, {
      mode: "entrega", customerId: A.customer.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
      paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
    });
  const [o1, o2, o3] = [await novo(), await novo(), await novo()];
  await m.orders.dispatchOrders(A.ctx, [o1.id, o2.id, o3.id], driver.id);
  await m.orders.deliverOrder(comDriver, o1.id);
  await m.orders.deliverOrder(comDriver, o2.id);
  await m.orders.reportOccurrence(comDriver, o3.id, "ausente", "");
  const [{ tripId }] = (await m.q.listViagens(A.t.id, A.branch.id)).filter((v) => v.driverId === driver.id);
  await m.shifts.settleTrip(caixa, shift.id, tripId!, 21000, "faltou");

  const desde = new Date(Date.now() - 86400000), ate = new Date(Date.now() + 60000);
  const lista = await m.q.metricasEntregadores(A.t.id, A.branch.id, desde, ate);
  const n = lista.find((x) => x.id === driver.id)!;
  assert.equal(n.entregas, 2);
  assert.equal(n.viagemEntregas, 2, "a viagem acertada conta as duas entregas");
  assert.equal(n.voltaViagens, 1, "as duas foram confirmadas pelo celular dele");
  assert.equal(n.acertos, 1);
  assert.equal(n.acertosComFalta, 1, "entregou 210 de 220");
  assert.deepEqual(n.ocorrencias, { ausente: 1 });
  assert.ok(n.horasTurno > 0);
  // o turno fechado sem falta conta como mais um acerto
  await m.shifts.closeShift(caixa, shift.id, 1000, "");
  const depois = (await m.q.metricasEntregadores(A.t.id, A.branch.id, desde, ate)).find((x) => x.id === driver.id)!;
  assert.deepEqual([depois.acertos, depois.acertosComFalta], [2, 1]);
  // outra empresa não vê ninguém daqui
  assert.equal((await m.q.metricasEntregadores(B.t.id, B.branch.id, desde, ate)).some((x) => x.id === driver.id), false);
});

test("pedido programado: lança no dia uma vez só, pula, pausa e some com o cliente anonimizado", async () => {
  const { db } = m.db;
  const { pedidosProgramados, orders, customers } = m.schema;
  const { eq } = await import("drizzle-orm");
  const { todayISO, somaDias } = await import("@/lib/period");
  const hoje = todayISO();
  const atendente = { ...A.ctx, role: "atendente" as const };
  const [cliente] = await db.insert(customers).values({ tenantId: A.t.id, name: "Cliente Programado", address: "Rua do Teste, 10" }).returning();
  const origem = await m.orders.createOrder(A.ctx, {
    mode: "entrega", customerId: cliente.id, items: [{ productId: A.product.id, quantity: 2, returnsEmpty: true }],
    paymentMethod: "dinheiro", deliveryFeeCents: 500, changeForCents: null, notes: "", driverId: null,
  });

  await assert.rejects(m.prog.programar(atendente, { orderId: origem.id, aCadaDias: 15, proxima: somaDias(hoje, -1) }), /antes de hoje/);
  await assert.rejects(m.prog.programar(B.ctx, { orderId: origem.id, aCadaDias: 15, proxima: hoje }), /não encontrado/);
  const p = await m.prog.programar(atendente, { orderId: origem.id, aCadaDias: 15, proxima: hoje });
  assert.deepEqual(p.itens, [{ productId: A.product.id, quantity: 2, returnsEmpty: true }]);
  assert.equal(p.deliveryFeeCents, 500);

  const doDia = await m.q.programadosParaHoje(A.t.id, A.branch.id);
  const meu = doDia.find((x) => x.id === p.id)!;
  assert.ok(meu, "aparece na lista do dia");
  assert.match(meu.resumo, /^2× /);
  assert.equal(meu.endereco, "Rua do Teste, 10");
  assert.equal((await m.q.programadosParaHoje(B.t.id, B.branch.id)).some((x) => x.id === p.id), false, "outra empresa não vê");

  await assert.rejects(m.prog.lancarProgramado(B.ctx, p.id), /não encontrado/);
  const { pedido, proxima } = await m.prog.lancarProgramado(atendente, p.id);
  assert.equal(proxima, somaDias(hoje, 15));
  const [novo] = await db.select().from(orders).where(eq(orders.id, pedido.id));
  assert.equal(novo.origin, "programado");
  assert.equal(novo.status, "aberto");
  assert.equal(novo.totalCents, origem.totalCents, "mesmos itens e taxa, preço do dia");
  // o segundo toque não lança outro
  await assert.rejects(m.prog.lancarProgramado(atendente, p.id), /ainda não é para hoje/);
  assert.equal((await m.q.programadosParaHoje(A.t.id, A.branch.id)).some((x) => x.id === p.id), false);

  // atrasado: pular conta a partir de hoje, não acumula
  await db.update(pedidosProgramados).set({ proxima: somaDias(hoje, -40) }).where(eq(pedidosProgramados.id, p.id));
  assert.equal(await m.prog.pularProgramado(atendente, p.id), somaDias(hoje, 15));

  // pausado não aparece; ao retomar com data vencida, volta para hoje
  await db.update(pedidosProgramados).set({ proxima: somaDias(hoje, -3) }).where(eq(pedidosProgramados.id, p.id));
  await m.prog.pausarProgramado(atendente, p.id, true);
  assert.equal((await m.q.programadosParaHoje(A.t.id, A.branch.id)).some((x) => x.id === p.id), false);
  await assert.rejects(m.prog.lancarProgramado(atendente, p.id), /pausado/);
  await m.prog.pausarProgramado(atendente, p.id, false);
  const [retomado] = await db.select().from(pedidosProgramados).where(eq(pedidosProgramados.id, p.id));
  assert.equal(retomado.proxima, hoje);

  await m.prog.alterarProgramado(atendente, p.id, { aCadaDias: 30, proxima: somaDias(hoje, 2) });
  assert.equal((await m.q.programadosDoCliente(A.t.id, cliente.id))[0].aCadaDias, 30);

  // anonimizar o cliente leva o programado junto (ele guarda endereço)
  await m.orders.cancelOrder(A.ctx, origem.id, "teste");
  await m.orders.cancelOrder(A.ctx, pedido.id, "teste");
  await m.registry.anonymizeCustomer(A.ctx, cliente.id);
  assert.equal((await db.select().from(pedidosProgramados).where(eq(pedidosProgramados.customerId, cliente.id))).length, 0);
});

test("robô do WhatsApp: repete o último pedido uma vez só, cada empresa com os seus clientes, e some com o cliente anonimizado", async () => {
  const { db } = m.db;
  const { conversasWhatsapp, customers, orders } = m.schema;
  const { and, eq } = await import("drizzle-orm");
  const [cliente] = await db.insert(customers).values({ tenantId: A.t.id, name: "Maria do Robô", phone: "(11) 98888-7777", address: "Rua do Robô, 7" }).returning();
  const origem = await m.orders.createOrder(A.ctx, {
    mode: "entrega", customerId: cliente.id, items: [{ productId: A.product.id, quantity: 1, returnsEmpty: true }],
    paymentMethod: "pix", deliveryFeeCents: 300, changeForCents: null, notes: "", driverId: null,
  });
  const fala = (tenantId: string, entrada: { texto?: string; id?: string }) => m.robo.conversar(tenantId, "+55 11 98888-7777", entrada, { base: "https://depo.test" });

  // a tela de teste confere o total, mas não deixa pedido em Entregas
  const teste = (entrada: { texto?: string; id?: string }) => m.robo.conversar(A.t.id, "+55 11 98888-7777", entrada, { base: "https://depo.test", teste: true });
  await teste({ texto: "Oi" });
  const [t1] = await teste({ id: "repetir" });
  assert.match(t1.texto, /Total: R\$\s113,00[\s\S]*não foi lançado/);
  assert.equal((await db.select().from(orders).where(and(eq(orders.customerId, cliente.id), eq(orders.origin, "whatsapp")))).length, 0);
  // a conversa da tela de teste é separada: parar no meio dela não deixa o cliente de verdade preso
  await teste({ texto: "Oi" });
  await teste({ texto: "loja" });

  // celular cadastrado sem o 9 e fixo com +55 também são achados pelo número que chega do WhatsApp
  const [antigo] = await db.insert(customers).values({ tenantId: A.t.id, name: "Zé do Nove", phone: "(21) 8765-4321", address: "Rua Velha, 1" }).returning();
  const [fixo] = await db.insert(customers).values({ tenantId: A.t.id, name: "Padaria Fixa", phone: "+55 (21) 3222-1111", address: "Rua Fixa, 2" }).returning();
  assert.match((await m.robo.conversar(A.t.id, "5521987654321", { texto: "Oi" }, { base: "https://depo.test" }))[0].texto, /Zé!/);
  assert.match((await m.robo.conversar(A.t.id, "552132221111", { texto: "Oi" }, { base: "https://depo.test" }))[0].texto, /Padaria Fixa!/);
  for (const tel of ["21987654321", "2132221111"]) await db.delete(conversasWhatsapp).where(and(eq(conversasWhatsapp.tenantId, A.t.id), eq(conversasWhatsapp.telefone, tel)));
  await db.delete(customers).where(and(eq(customers.tenantId, A.t.id), eq(customers.id, antigo.id)));
  await db.delete(customers).where(and(eq(customers.tenantId, A.t.id), eq(customers.id, fixo.id)));

  const [menu] = await fala(A.t.id, { texto: "Oi" });
  assert.ok(menu.tipo === "botoes" && menu.botoes[0].id === "repetir", "o \"loja\" da tela de teste não calou o cliente de verdade");
  await m.robo.recomecarConversa(A.t.id, "+55 11 98888-7777");
  assert.match(menu.texto, /(Bom dia|Boa tarde|Boa noite), Maria! .*\n.*\n\n1x Gás A\nTaxa de entrega: R\$\s3,00\nTotal: R\$\s113,00 no Pix\nEntrega: Rua do Robô, 7/);

  // dois toques ao mesmo tempo em "Repetir pedido": um pedido só
  const [r1, r2] = await Promise.all([fala(A.t.id, { id: "repetir" }), fala(A.t.id, { id: "repetir" })]);
  const lancados = [r1, r2].filter((r) => /Pedido #\d+ anotado/.test(r[0].texto));
  assert.equal(lancados.length, 1);
  assert.match(lancados[0][0].texto, /https:\/\/depo\.test\/pedir\/.+\/acompanhar\//);
  const novos = await db.select().from(orders).where(and(eq(orders.customerId, cliente.id), eq(orders.origin, "whatsapp")));
  assert.equal(novos.length, 1);
  assert.equal(novos[0].totalCents, origem.totalCents);
  assert.equal(novos[0].address, "Rua do Robô, 7");
  assert.equal(novos[0].status, "aberto", "Pix pelo robô entra na fila: paga na entrega");

  // o mesmo telefone em outra empresa não é cliente dela: o robô cadastra pela conversa
  const [outra] = await fala(B.t.id, { texto: "Oi" });
  assert.match(outra.texto, /qual é o seu nome?/);
  await fala(B.t.id, { texto: "Maria Nova" });
  const [produtos] = await fala(B.t.id, { texto: "Rua Nova, 45, Centro" });
  assert.match(produtos.texto, /Anotado, Maria!/);
  const [cadB] = await db.select().from(customers).where(and(eq(customers.tenantId, B.t.id), eq(customers.name, "Maria Nova")));
  assert.equal(cadB.phone, "(11) 98888-7777");
  assert.equal(cadB.address, "Rua Nova, 45, Centro");

  // anonimizar o cliente apaga onde a conversa parou (é do telefone dele)
  for (const o of [origem, novos[0]]) await m.orders.cancelOrder(A.ctx, o.id, "teste");
  await m.registry.anonymizeCustomer(A.ctx, cliente.id);
  const conversa = await db.select().from(conversasWhatsapp).where(and(eq(conversasWhatsapp.tenantId, A.t.id), eq(conversasWhatsapp.telefone, "11988887777")));
  assert.equal(conversa.length, 0);
  assert.equal((await db.select().from(conversasWhatsapp).where(eq(conversasWhatsapp.tenantId, B.t.id))).length, 1, "a da outra empresa fica");
});

test("relatórios novos: pedidos por hora, clientes com compras e venda por produto, cada empresa só com os seus", async () => {
  const { db } = m.db;
  const { customers } = m.schema;
  const [fiel] = await db.insert(customers).values({ tenantId: A.t.id, name: "Cliente Fiel", phone: "11999990000" }).returning();
  for (let i = 0; i < 3; i++) {
    const o = await m.orders.createOrder(A.ctx, {
      mode: "entrega", customerId: fiel.id, items: [{ productId: A.product.id, quantity: 2, returnsEmpty: true }],
      paymentMethod: "dinheiro", deliveryFeeCents: 0, changeForCents: null, notes: "", driverId: null,
    });
    await m.orders.dispatchOrder(A.ctx, o.id, A.driver.id);
    await m.orders.deliverOrder(A.ctx, o.id);
  }
  const desde = new Date(Date.now() - 86400e3), ate = new Date(Date.now() + 60000);
  const horas = await m.q.pedidosPorHora(A.t.id, desde, ate, A.branch.id);
  const agora = Number(new Intl.DateTimeFormat("en", { hour: "numeric", hourCycle: "h23", timeZone: "America/Sao_Paulo" }).format(new Date()));
  assert.ok((horas.find((h) => h.hora === agora)?.n ?? 0) >= 3, "os pedidos de agora caem na hora de Brasília");

  const compras = await m.q.comprasPorCliente(A.t.id, A.branch.id);
  const c = compras.find((x) => x.id === fiel.id)!;
  assert.equal(c.pedidos, 3);
  assert.ok(c.primeiro instanceof Date && c.ultimo instanceof Date);
  assert.equal((await m.q.comprasPorCliente(B.t.id, B.branch.id)).some((x) => x.id === fiel.id), false);

  const vendidos = await m.q.vendidosPorProduto(A.t.id, A.branch.id, 28);
  assert.ok((vendidos.find((v) => v.productId === A.product.id)?.n ?? 0) >= 6);
  assert.equal((await m.q.vendidosPorProduto(B.t.id, B.branch.id, 28)).some((v) => v.productId === A.product.id), false);
});

test("admin dá dias de acesso com registro e publica o aviso para todas as empresas", async () => {
  const { db } = m.db;
  const { tenants, auditLog } = m.schema;
  const { eq, and } = await import("drizzle-orm");
  const { somarDias } = await import("@/lib/plano");
  const { todayISO } = await import("@/lib/period");
  const hoje = todayISO();
  const admin = { ...A.ctx, platformAdmin: true, name: "", email: "", tenantName: "", totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "", branches: [] };
  const pagoAte = async () => (await db.select({ p: tenants.pagoAte }).from(tenants).where(eq(tenants.id, B.t.id)))[0].p;
  const [{ antes }] = await db.select({ antes: tenants.pagoAte }).from(tenants).where(eq(tenants.id, B.t.id));

  // sem cobrança: não tem o que estender
  await db.update(tenants).set({ pagoAte: null }).where(eq(tenants.id, B.t.id));
  await assert.rejects(m.platform.darDias(admin, { tenantId: B.t.id, dias: 7, motivo: "teste" }), /não tem cobrança/);
  // vencida: conta de hoje, não do vencimento (senão os dias dados já nasciam gastos)
  await db.update(tenants).set({ pagoAte: somarDias(hoje, -5) }).where(eq(tenants.id, B.t.id));
  await m.platform.darDias(admin, { tenantId: B.t.id, dias: 7, motivo: "Pix não caiu" });
  assert.equal(await pagoAte(), somarDias(hoje, 7));
  // em dia: soma ao vencimento
  await m.platform.darDias(admin, { tenantId: B.t.id, dias: 3, motivo: "cortesia" });
  assert.equal(await pagoAte(), somarDias(hoje, 10));
  const reg = await db.select().from(auditLog).where(and(eq(auditLog.tenantId, B.t.id), eq(auditLog.action, "assinatura.dias")));
  assert.equal(reg.length, 2);
  assert.equal((reg.find((r) => (r.data as { dias: number }).dias === 3)!.data as { motivo: string }).motivo, "cortesia");
  // quem não é admin não dá dias
  await assert.rejects(m.platform.darDias({ ...admin, platformAdmin: false }, { tenantId: B.t.id, dias: 1, motivo: "x" }), /Sem permissão/);
  await db.update(tenants).set({ pagoAte: antes }).where(eq(tenants.id, B.t.id));

  await assert.rejects(m.platform.publicarAviso(admin, { texto: "Manutenção", ate: somarDias(hoje, -1) }), /já passou/);
  await m.platform.publicarAviso(admin, { texto: "Manutenção domingo", ate: hoje });
  assert.equal((await m.platform.avisoAtual())?.texto, "Manutenção domingo", "com a data de hoje, vale até o fim do dia");
  await m.platform.publicarAviso(admin, { texto: "Novidade no sistema", ate: "" });
  assert.equal((await m.platform.avisoAtual())?.texto, "Novidade no sistema", "o novo substitui o anterior");
  await m.platform.tirarAviso(admin);
  assert.equal(await m.platform.avisoAtual(), null);
});

test("estoque baixo só abaixo do mínimo: igual ao mínimo não avisa", async () => {
  const p = await m.registry.saveProduct(A.ctx, { name: "Galão Mínimo", priceCents: 1400, returnable: false, minStock: 10, active: true });
  await m.stock.receivePurchase(A.ctx, { productId: p.id, full: 10, emptiesReturned: 0, note: "carga do teste" });
  const linha = async () => (await m.q.stockOverview(A.t.id, A.branch.id)).find((x) => x.id === p.id)!;
  assert.equal((await linha()).fullStore, 10);
  assert.equal((await linha()).low, false);
  await m.registry.saveProduct(A.ctx, { name: "Galão Mínimo", priceCents: 1400, returnable: false, minStock: 11, active: true }, p.id);
  assert.equal((await linha()).low, true);
});

test("reajuste da mensalidade: quem já pagou no preço antigo continua nele, no Pix e no cartão; quem chega paga o novo", async () => {
  const { db } = m.db;
  const { tenants, branches, assinaturaPagamentos } = m.schema;
  const { eq } = await import("drizzle-orm");
  const mp = await import("@/lib/mercadopago");
  const ass = await import("@/domain/assinatura");
  const { PLANO } = await import("@/lib/plano");
  const nova = async (nome: string) => {
    const { tenant, ownerId } = await m.platform.cadastrarEmpresa(
      m.platform.cadastroSchema.parse({ company: nome, ownerName: "Ana", email: `ana-${Date.now()}-${Math.random()}@cadastro.test`, password: "senha-boa-1", vende: "agua" }),
      "v1",
    );
    const [filial] = await db.select().from(branches).where(eq(branches.tenantId, tenant.id));
    return { tenant, dono: { tenantId: tenant.id, userId: ownerId, role: "dono" as const, branchId: filial.id } };
  };
  const antiga = await nova("Água de Antes");
  const recente = await nova("Água de Agora");
  // a antiga pagou uma mensalidade no preço de antes do reajuste
  await db.insert(assinaturaPagamentos).values({ tenantId: antiga.tenant.id, mpPaymentId: "antiga-1", codigo: "x", valorCents: PLANO.precoMantidoCents, expiraEm: new Date(), pagoEm: new Date() });
  assert.equal(await ass.precoDaEmpresa(antiga.tenant.id), PLANO.precoMantidoCents);
  assert.equal(await ass.precoDaEmpresa(recente.tenant.id), PLANO.mensalCents);
  assert.notEqual(PLANO.mensalCents, PLANO.precoMantidoCents);

  process.env.MP_TOKEN_SOLACE = "APP_USR-solace";
  let n = 0;
  const assinaturas = new Map<string, { valor: number; cobradas: number }>([["2c93808400000000000000000000aaaa", { valor: PLANO.precoMantidoCents, cobradas: 1 }]]);
  mp.usarRede(async (url, init) => {
    const caminho = String(url).replace("https://api.mercadopago.com", "");
    const json = (o: unknown) => new Response(JSON.stringify(o), { status: 200 });
    if (caminho.startsWith("/v1/orders") && init?.method === "POST") {
      const b = JSON.parse(String(init.body));
      n++;
      return json({ id: `ORD${n}`, status: "action_required", total_amount: b.total_amount, transactions: { payments: [{ id: `PAY${n}`, payment_method: { qr_code: `PIX${b.total_amount}` } }] } });
    }
    const a = assinaturas.get(caminho.split("/").pop()!);
    if (a) return json({ id: caminho.split("/").pop(), status: "authorized", external_reference: `assinatura-cartao:${antiga.tenant.id}`, auto_recurring: { transaction_amount: a.valor / 100 }, summarized: { charged_quantity: a.cobradas } });
    return new Response("{}", { status: 404 });
  });
  // o Pix de cada uma sai no preço dela
  assert.equal((await ass.pixAssinatura(antiga.dono)).valorCents, PLANO.precoMantidoCents);
  assert.equal((await ass.pixAssinatura(recente.dono)).valorCents, PLANO.mensalCents);
  // o cartão ligado antes do reajuste continua cobrando o preço antigo e somando o mês
  await db.update(tenants).set({ mpAssinaturaId: "2c93808400000000000000000000aaaa", mpAssinaturaCobradas: 0 }).where(eq(tenants.id, antiga.tenant.id));
  assert.equal((await ass.conferirCartao(antiga.tenant.id))?.caiu, true);
  delete process.env.MP_TOKEN_SOLACE;
});

test("assistente: consulta só a empresa de quem pergunta, sobe para a análise quando o modelo pede, conta o uso e para no limite do dia", async () => {
  const { db } = m.db;
  const { assistenteUso } = m.schema;
  const { eq } = await import("drizzle-orm");
  const ass = await import("@/domain/assistente");
  const { LIMITES, MODELOS } = await import("@/lib/assistente");
  const dono = { ...A.ctx, name: "Dono A", email: "", tenantName: "A", platformAdmin: false, totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "Principal", branches: [] };
  process.env.ANTHROPIC_API_KEY = "teste";

  // a API simulada: cada pedido recebe a próxima resposta da fila; o corpo de cada um fica guardado para conferir
  const pedidos: { corpo: Record<string, unknown>; beta: string | null }[] = [];
  let fila: unknown[][] = [];
  ass.usarRedeAssistente(async (_url, init) => {
    const corpo = JSON.parse(String(init!.body));
    pedidos.push({ corpo, beta: new Headers(init!.headers).get("anthropic-beta") });
    const [content, stop_reason] = fila.shift()!;
    return new Response(
      JSON.stringify({ id: `msg_${pedidos.length}`, type: "message", role: "assistant", model: corpo.model, content, stop_reason, stop_sequence: null, usage: { input_tokens: 1000, output_tokens: 100, cache_read_input_tokens: 3000, cache_creation_input_tokens: 0 } }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  });
  const ultimoUso = async () => (await db.select().from(assistenteUso).where(eq(assistenteUso.tenantId, A.t.id))).at(-1)!;

  // pergunta direta: o modelo barato consulta o estoque e responde
  fila = [
    [[{ type: "tool_use", id: "tu_1", name: "estoque", input: {} }], "tool_use"],
    [[{ type: "text", text: "Você tem 9 cheios." }], "end_turn"],
  ];
  const r1 = await ass.perguntar(dono, "Quanto gás eu tenho?", [{ pergunta: "Oi", resposta: "Olá!" }]);
  assert.equal(r1.resposta, "Você tem 9 cheios.");
  assert.equal(r1.analise, false);
  assert.equal(r1.restam, LIMITES.perguntasDia - 1);
  const [p1, p2] = pedidos;
  assert.equal(p1.corpo.model, MODELOS.rapido.id);
  assert.ok((p1.corpo.tools as { name: string }[]).some((t) => t.name === "pedir_analise"));
  const msgs1 = p1.corpo.messages as { role: string; content: unknown }[];
  assert.equal(msgs1.length, 3, "a conversa anterior vai junto");
  assert.match(String(msgs1[2].content), /Hoje é [\s\S]*Quanto gás eu tenho\?/);
  // o resultado da consulta tem o produto desta empresa e nunca o da outra
  const resultado = JSON.stringify((p2.corpo.messages as { content: unknown }[]).at(-1));
  assert.match(resultado, /Gás A/);
  assert.doesNotMatch(resultado, /Gás B/);
  const u1 = await ultimoUso();
  assert.equal(u1.nivel, "rapido");
  assert.equal(u1.tokensSaida, 200);
  assert.equal(u1.custoMicro, 2 * (1000 * 0.1 + 3000 * 0.01 + 100 * 0.5));

  // pergunta elaborada: o modelo barato pede a análise e o maior responde, com o reserva ligado e sem pedir_analise
  pedidos.length = 0;
  fila = [
    [[{ type: "tool_use", id: "tu_2", name: "pedir_analise", input: { motivo: "comparar períodos" } }], "tool_use"],
    [[{ type: "text", text: "A venda caiu porque..." }], "end_turn"],
  ];
  const r2 = await ass.perguntar(dono, "Por que vendi menos esse mês?", []);
  assert.equal(r2.analise, true);
  assert.equal(pedidos[1].corpo.model, MODELOS.analise.id);
  assert.equal(pedidos[1].corpo.fallbacks, "default");
  assert.match(pedidos[1].beta ?? "", /server-side-fallback/);
  assert.ok(!(pedidos[1].corpo.tools as { name: string }[]).some((t) => t.name === "pedir_analise"));
  assert.equal((await ultimoUso()).nivel, "analise");

  // consulta com data errada volta como erro para o modelo, sem derrubar a pergunta
  pedidos.length = 0;
  fila = [
    [[{ type: "tool_use", id: "tu_3", name: "resumo_vendas", input: { de: "2026-13-01", ate: "2026-13-31" } }], "tool_use"],
    [[{ type: "text", text: "Não entendi o período." }], "end_turn"],
  ];
  assert.equal((await ass.perguntar(dono, "Vendas de ontem", [])).resposta, "Não entendi o período.");
  assert.match(JSON.stringify(pedidos[1].corpo.messages), /"is_error":true/);

  // só o dono pergunta; no limite do dia, a pergunta nem chega à API
  await assert.rejects(ass.perguntar({ ...dono, role: "atendente" }, "Quanto vendi?", []), /permissão/);
  await db.insert(assistenteUso).values(Array.from({ length: LIMITES.perguntasDia }, () => ({ tenantId: A.t.id, userId: A.owner.id, nivel: "rapido", tokensEntrada: 0, tokensCache: 0, tokensSaida: 0, custoMicro: 0 })));
  pedidos.length = 0;
  await assert.rejects(ass.perguntar(dono, "Quanto vendi?", []), /limite/);
  assert.equal(pedidos.length, 0);
  assert.equal(await ass.perguntasRestantes(B.t.id), LIMITES.perguntasDia, "o limite é de cada empresa");
  await db.delete(assistenteUso).where(eq(assistenteUso.tenantId, A.t.id));
  delete process.env.ANTHROPIC_API_KEY;
});

test("admin vê o gasto do assistente no mês, no total e por empresa; quem não é admin não vê", async () => {
  const { db } = m.db;
  const { assistenteUso } = m.schema;
  const { eq } = await import("drizzle-orm");
  const admin = { ...B.ctx, platformAdmin: true, name: "", email: "", tenantName: "", totpEnabled: false, termsVersion: null, pagoAte: null, branchName: "", branches: [] };
  const linha = (tenantId: string, userId: string, nivel: string, custoMicro: number, createdAt = new Date()) => ({ tenantId, userId, nivel, tokensEntrada: 0, tokensCache: 0, tokensSaida: 0, custoMicro, createdAt });
  await db.insert(assistenteUso).values([
    linha(A.t.id, A.owner.id, "rapido", 1000),
    linha(A.t.id, A.owner.id, "analise", 20_000),
    linha(B.t.id, B.owner.id, "rapido", 3000),
    // do mês passado: não entra na conta deste mês
    linha(A.t.id, A.owner.id, "analise", 999_999, new Date(Date.now() - 40 * 86400e3)),
  ]);
  const mes = await m.platform.assistenteNoMes(admin);
  assert.deepEqual(mes, { perguntas: 3, analises: 1, empresas: 2, micro: 24_000, microAnalise: 20_000 });
  const a = (await m.platform.listTenants(admin)).find((t) => t.id === A.t.id)!;
  assert.equal(a.iaPerguntas, 2);
  assert.equal(a.iaMicro, 21_000);
  await assert.rejects(m.platform.assistenteNoMes({ ...admin, platformAdmin: false }), /permissão/);
  for (const t of [A.t.id, B.t.id]) await db.delete(assistenteUso).where(eq(assistenteUso.tenantId, t));
});
