module.exports = [
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/diagnostics_channel [external] (diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("diagnostics_channel", () => require("diagnostics_channel"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/db/index.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "pgClient",
    ()=>pgClient,
    "runMigrations",
    ()=>runMigrations,
    "scoped",
    ()=>scoped,
    "tenantTransaction",
    ()=>tenantTransaction,
    "withTenant",
    ()=>withTenant
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$async_hooks__$5b$external$5d$__$28$node$3a$async_hooks$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$driver$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/postgres-js/driver.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$migrator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/postgres-js/migrator.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/postgres/src/index.js [instrumentation] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
function connect() {
    const url = process.env.DATABASE_URL;
    // no `next build` não há banco; o cliente postgres só conecta na primeira consulta
    if (!url && process.env.NEXT_PHASE !== "phase-production-build") throw new Error("DATABASE_URL não definido. Em desenvolvimento, use `npm run dev` (sobe o Postgres local).");
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url ?? "", {
        max: 20,
        onnotice: ()=>{}
    });
    return {
        client,
        db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$driver$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["drizzle"])(client, {
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__
        })
    };
}
const g = globalThis;
const conn = g.__conn ??= connect();
const scope = g.__scope ??= new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$async_hooks__$5b$external$5d$__$28$node$3a$async_hooks$2c$__cjs$29$__["AsyncLocalStorage"]();
const db = new Proxy(conn.db, {
    get (base, prop) {
        const target = scope.getStore()?.tx ?? base;
        const value = Reflect.get(target, prop, target);
        return typeof value === "function" ? value.bind(target) : value;
    }
});
async function withTenant(tenantId, fn) {
    const current = scope.getStore();
    if (current) {
        if (current.tenantId !== tenantId) throw new Error("Operação de outra empresa dentro do escopo atual.");
        return fn();
    }
    return conn.db.transaction(async (tx)=>{
        await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`set local role app_tenant`);
        await tx.execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`select set_config('app.tenant_id', ${tenantId}, true)`);
        return scope.run({
            tenantId,
            tx
        }, fn);
    });
}
function scoped(fn) {
    return (...args)=>withTenant(args[0], ()=>Promise.resolve(fn(...args)));
}
const pgClient = conn.client;
async function runMigrations() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$postgres$2d$js$2f$migrator$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["migrate"])(conn.db, {
        migrationsFolder: "drizzle"
    });
    await conn.db.execute(garantirIsolamento);
}
// O backup (pg_dump) guarda o banco, mas não os papéis do servidor. Restaurado num Postgres novo,
// o app_tenant não existe e as permissões e políticas dele ficam de fora, mesmo com as migrações
// já marcadas como feitas. Toda subida refaz o que faltar; as tabelas com RLS ligado dizem onde.
const garantirIsolamento = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"].raw(`
DO $$
DECLARE
  t text;
  col text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_tenant') THEN
    CREATE ROLE app_tenant NOLOGIN;
  END IF;
  IF NOT pg_has_role(current_user, 'app_tenant', 'MEMBER') THEN
    EXECUTE format('GRANT app_tenant TO %I', current_user);
  END IF;
  GRANT USAGE ON SCHEMA public TO app_tenant;
  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_tenant;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_tenant;
  FOR t IN
    SELECT c.relname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relrowsecurity
      AND NOT EXISTS (SELECT 1 FROM pg_policy p WHERE p.polrelid = c.oid AND p.polname = 'tenant_isolation')
  LOOP
    col := CASE WHEN t = 'tenants' THEN 'id' ELSE 'tenant_id' END;
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I TO app_tenant
         USING (%2$I = current_setting(''app.tenant_id'')::uuid)
         WITH CHECK (%2$I = current_setting(''app.tenant_id'')::uuid)', t, col);
  END LOOP;
END
$$`);
const tenantTransaction = (ctx, fn)=>withTenant(ctx.tenantId, ()=>db.transaction(fn));
}),
"[project]/src/db/schema.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assinaturaPagamentos",
    ()=>assinaturaPagamentos,
    "auditLog",
    ()=>auditLog,
    "avisosPedido",
    ()=>avisosPedido,
    "avisosPlataforma",
    ()=>avisosPlataforma,
    "branches",
    ()=>branches,
    "cashEntries",
    ()=>cashEntries,
    "cashEntryKindEnum",
    ()=>cashEntryKindEnum,
    "containerLoans",
    ()=>containerLoans,
    "containerStateEnum",
    ()=>containerStateEnum,
    "contasPagar",
    ()=>contasPagar,
    "conversasWhatsapp",
    ()=>conversasWhatsapp,
    "customerAddresses",
    ()=>customerAddresses,
    "customerPayments",
    ()=>customerPayments,
    "customers",
    ()=>customers,
    "errorEvents",
    ()=>errorEvents,
    "expenseMethodEnum",
    ()=>expenseMethodEnum,
    "expenses",
    ()=>expenses,
    "loginAttempts",
    ()=>loginAttempts,
    "orderItems",
    ()=>orderItems,
    "orderStatusEnum",
    ()=>orderStatusEnum,
    "orders",
    ()=>orders,
    "paymentMethodEnum",
    ()=>paymentMethodEnum,
    "pedidosProgramados",
    ()=>pedidosProgramados,
    "products",
    ()=>products,
    "roleEnum",
    ()=>roleEnum,
    "sessions",
    ()=>sessions,
    "shiftStatusEnum",
    ()=>shiftStatusEnum,
    "shifts",
    ()=>shifts,
    "stockMovements",
    ()=>stockMovements,
    "suppliers",
    ()=>suppliers,
    "tenantDeletions",
    ()=>tenantDeletions,
    "tenants",
    ()=>tenants,
    "users",
    ()=>users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/enum.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/date.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/uuid.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/jsonb.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/indexes.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
;
;
const id = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("id").primaryKey().defaultRandom();
const tenantId = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("tenant_id").notNull().references(()=>tenants.id);
const createdAt = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow();
const roleEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("role", [
    "dono",
    "atendente",
    "caixa",
    "entregador"
]);
const orderStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("order_status", [
    // pedido do portal pago no Pix: fica fora da fila até o Pix ser confirmado
    "aguardando_pagamento",
    "aberto",
    "em_rota",
    "entregue",
    "cancelado",
    "estornado"
]);
const paymentMethodEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("payment_method", [
    "dinheiro",
    "pix",
    "cartao",
    "fiado"
]);
const shiftStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("shift_status", [
    "aberto",
    "fechado"
]);
const expenseMethodEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("expense_method", [
    "dinheiro",
    "pix",
    "cartao",
    "boleto"
]);
const cashEntryKindEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("cash_entry_kind", [
    "repasse",
    "saida"
]);
const containerStateEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgEnum"])("container_state", [
    "cheio",
    "vazio",
    "avariado"
]);
const tenants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("tenants", {
    id: id(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    // dados da empresa que o cliente vê no portal de pedidos e no acompanhamento
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("phone").notNull().default(""),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("address").notNull().default(""),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    // conta o prazo da política: dados de empresa cancelada saem em até 90 dias
    suspendedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("suspended_at", {
        withTimezone: true
    }),
    // regras da casa, ajustadas pelo dono em Configurações
    staffDiscountPct: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("staff_discount_pct").notNull().default(10),
    lateAfterMinutes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("late_after_minutes").notNull().default(60),
    // recebimento por Pix na chave da própria empresa
    pixKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("pix_key").notNull().default(""),
    pixName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("pix_name").notNull().default(""),
    pixCity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("pix_city").notNull().default(""),
    // conta do Mercado Pago da própria empresa: cada pedido no Pix vira uma cobrança com confirmação automática.
    // O token fica cifrado (lib/segredo); a conta é só para mostrar a qual conta está ligada.
    mpTokenEnc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_token_enc"),
    mpConta: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_conta"),
    // conectado pelo botão (OAuth): chave de renovação cifrada e até quando o token vale; colado à mão fica vazio
    mpRefreshEnc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_refresh_enc"),
    mpExpiraEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("mp_expira_em", {
        withTimezone: true
    }),
    // número do WhatsApp da empresa na Cloud API (Phone Number ID da Meta): a mensagem que chega nele vai para o robô desta empresa
    whatsappNumeroId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("whatsapp_numero_id").unique(),
    // portal de pedidos: endereço público /pedir/<slug>
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("slug").notNull().unique(),
    portalEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("portal_enabled").notNull().default(false),
    // assinatura: o acesso vale até este dia (teste grátis ou mês pago). Vazio = sem cobrança (empresas da Solace e as criadas por ela)
    pagoAte: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["date"])("pago_ate", {
        mode: "string"
    }),
    // mensalidade no cartão (assinatura do Mercado Pago na conta da Solace) e quantas cobranças dela já viraram mês
    mpAssinaturaId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_assinatura_id"),
    mpAssinaturaCobradas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("mp_assinatura_cobradas").notNull().default(0),
    createdAt: createdAt()
});
const branches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("branches", {
    id: id(),
    tenantId: tenantId(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    // parte do link de pedido da filial: /pedir/<empresa>?filial=<slug>
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("slug").notNull(),
    main: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("main").notNull().default(false),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("branches_tenant_slug_uq").on(t.tenantId, t.slug),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("branches_tenant_name_uq").on(t.tenantId, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`lower(${t.name})`),
        // uma principal por empresa
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("branches_tenant_main_uq").on(t.tenantId).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${t.main}`)
    ]);
const branchId = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("branch_id").notNull().references(()=>branches.id);
const tenantDeletions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("tenant_deletions", {
    id: id(),
    tenantId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("tenant_id").notNull(),
    tenantName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("tenant_name").notNull(),
    deletedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("deleted_by").notNull(),
    counts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["jsonb"])("counts").notNull(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("users", {
    id: id(),
    tenantId: tenantId(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("email").notNull(),
    passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("password_hash").notNull(),
    role: roleEnum("role").notNull(),
    // filial de quem não é dono; o dono fica sem e escolhe qual ver
    branchId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("branch_id").references(()=>branches.id),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    // equipe da Solace: acessa /admin
    platformAdmin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("platform_admin").notNull().default(false),
    // segredo TOTP (base32); só vale depois que o usuário confirma um código
    totpSecret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("totp_secret"),
    totpEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("totp_enabled").notNull().default(false),
    // versão dos termos que o dono aceitou e quando (aceite eletrônico)
    termsVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("terms_version"),
    termsAcceptedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("terms_accepted_at", {
        withTimezone: true
    }),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("users_email_uq").on(t.email)
    ]);
const sessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("sessions", {
    // sha256 do token, o token puro só existe no cookie
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("user_id").notNull().references(()=>users.id),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("expires_at", {
        withTimezone: true
    }).notNull(),
    // senha conferida, falta o código de 2FA: a sessão ainda não dá acesso
    mfaPending: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("mfa_pending").notNull().default(false)
});
const loginAttempts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("login_attempts", {
    id: id(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("key").notNull(),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("login_attempts_key_idx").on(t.key, t.createdAt)
    ]);
const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("products", {
    id: id(),
    tenantId: tenantId(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    priceCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("price_cents").notNull(),
    // botijão/galão: venda troca cheio por vazio
    returnable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("returnable").notNull().default(true),
    minStock: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("min_stock").notNull().default(0),
    // cobrado a mais quando o cliente não devolve um vazio e fica com o vasilhame
    containerPriceCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("container_price_cents").notNull().default(0),
    // cadastrado sozinho na criação da conta, com preço de mercado: fica marcado até o dono salvar o produto
    precoSugerido: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("preco_sugerido").notNull().default(false),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("products_tenant_idx").on(t.tenantId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("products_tenant_name_uq").on(t.tenantId, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`lower(${t.name})`)
    ]);
const customers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("customers", {
    id: id(),
    tenantId: tenantId(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("phone").notNull().default(""),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("address").notNull().default(""),
    reference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("reference").notNull().default(""),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("notes").notNull().default(""),
    // LGPD: dados pessoais apagados a pedido do cliente; os pedidos continuam nos relatórios
    anonymizedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("anonymized_at", {
        withTimezone: true
    }),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("customers_tenant_idx").on(t.tenantId)
    ]);
const shifts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("shifts", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    driverId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("driver_id").notNull().references(()=>users.id),
    status: shiftStatusEnum("status").notNull().default("aberto"),
    openingCashCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("opening_cash_cents").notNull().default(0),
    expectedCashCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("expected_cash_cents"),
    countedCashCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("counted_cash_cents"),
    differenceCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("difference_cents"),
    closingNotes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("closing_notes").notNull().default(""),
    openedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("opened_by").notNull().references(()=>users.id),
    closedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("closed_by").references(()=>users.id),
    openedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("opened_at", {
        withTimezone: true
    }).notNull().defaultNow(),
    closedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("closed_at", {
        withTimezone: true
    }),
    // diferença no acerto fica pendente até o dono dizer o que foi feito dela
    resolution: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("resolution"),
    resolutionNotes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("resolution_notes"),
    resolvedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("resolved_by").references(()=>users.id),
    resolvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("resolved_at", {
        withTimezone: true
    })
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("shifts_tenant_status_idx").on(t.tenantId, t.status)
    ]);
const cashEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("cash_entries", {
    id: id(),
    tenantId: tenantId(),
    shiftId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("shift_id").notNull().references(()=>shifts.id),
    kind: cashEntryKindEnum("kind").notNull(),
    amountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("amount_cents").notNull(),
    note: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("note").notNull().default(""),
    // saída autorizada também entra nas despesas da empresa
    expenseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("expense_id"),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("created_by").notNull().references(()=>users.id),
    createdAt: createdAt(),
    voidedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("voided_at", {
        withTimezone: true
    }),
    voidedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("voided_by").references(()=>users.id),
    voidReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("void_reason"),
    // repasse que fecha uma volta do entregador (acerto da viagem); sem ele, é um repasse avulso
    tripId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("trip_id")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("cash_entries_shift_idx").on(t.shiftId)
    ]);
const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("orders", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    number: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("number").notNull(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("customer_id").references(()=>customers.id),
    status: orderStatusEnum("status").notNull().default("aberto"),
    driverId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("driver_id").references(()=>users.id),
    shiftId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("shift_id").references(()=>shifts.id),
    // viagem: os pedidos que saíram juntos com o entregador e são acertados juntos quando ele volta
    tripId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("trip_id"),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    // pagamento misto: parte em dinheiro de um pedido pago no Pix ou no cartão (passa pela mão do entregador)
    cashPartCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("cash_part_cents").notNull().default(0),
    origin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("origin").notNull().default("telefone"),
    deliveryFeeCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("delivery_fee_cents").notNull().default(0),
    discountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("discount_cents").notNull().default(0),
    discountReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("discount_reason"),
    totalCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("total_cents").notNull(),
    // endereço de entrega quando não é o principal do cliente
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("address"),
    reference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("reference"),
    // última tentativa de entrega que não deu certo
    occurrence: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("occurrence"),
    occurrenceAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("occurrence_at", {
        withTimezone: true
    }),
    // Pix só conta como recebido depois que alguém confere no extrato do banco
    pixConfirmedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("pix_confirmed_at", {
        withTimezone: true
    }),
    pixConfirmedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("pix_confirmed_by").references(()=>users.id),
    // Pix já pago que precisa voltar ao cliente (pedido cancelado ou entrega parcial depois do pagamento).
    // Zera quando a loja marca que devolveu; a devolução é feita fora do depo, pelo banco.
    pixDevolverCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("pix_devolver_cents").notNull().default(0),
    // cobrança Pix no Mercado Pago: o código copia e cola dela e o valor que cobra. Se o total muda
    // (entrega parcial) ou ela vence, nasce outra.
    mpPaymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_payment_id"),
    mpPixCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_pix_code"),
    mpAmountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("mp_amount_cents"),
    mpExpiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("mp_expires_at", {
        withTimezone: true
    }),
    changeForCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("change_for_cents"),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("notes").notNull().default(""),
    cancelReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("cancel_reason"),
    refundReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("refund_reason"),
    refundedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("refunded_at", {
        withTimezone: true
    }),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("created_by").notNull().references(()=>users.id),
    createdAt: createdAt(),
    dispatchedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("dispatched_at", {
        withTimezone: true
    }),
    deliveredAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("delivered_at", {
        withTimezone: true
    }),
    // código secreto do link que o cliente usa para acompanhar o pedido (sem login); não dá para adivinhar
    trackingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("tracking_id").notNull().defaultRandom()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("orders_tracking_uq").on(t.trackingId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_tenant_status_idx").on(t.tenantId, t.status),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_branch_status_idx").on(t.branchId, t.status),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_trip_idx").on(t.tripId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_tenant_created_idx").on(t.tenantId, t.createdAt),
        // lista de clientes (último pedido) e ficha do cliente
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_tenant_customer_idx").on(t.tenantId, t.customerId, t.createdAt),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("orders_tenant_number_uq").on(t.tenantId, t.number),
        // o aviso do Mercado Pago chega só com o id da cobrança
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("orders_mp_payment_idx").on(t.mpPaymentId)
    ]);
const conversasWhatsapp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("conversas_whatsapp", {
    id: id(),
    tenantId: tenantId(),
    telefone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("telefone").notNull(),
    estado: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["jsonb"])("estado").$type(),
    atualizadoEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("atualizado_em", {
        withTimezone: true
    }).notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("conversas_whatsapp_tel_uq").on(t.tenantId, t.telefone)
    ]);
const pedidosProgramados = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("pedidos_programados", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("customer_id").notNull().references(()=>customers.id, {
        onDelete: "cascade"
    }),
    aCadaDias: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("a_cada_dias").notNull(),
    proxima: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["date"])("proxima", {
        mode: "string"
    }).notNull(),
    itens: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["jsonb"])("itens").$type().notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    // endereço do pedido de origem quando não era o principal do cliente
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("address"),
    reference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("reference").notNull().default(""),
    deliveryFeeCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("delivery_fee_cents").notNull().default(0),
    pausado: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("pausado").notNull().default(false),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("created_by").notNull().references(()=>users.id),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("pedidos_programados_dia_idx").on(t.tenantId, t.proxima),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("pedidos_programados_cliente_idx").on(t.customerId)
    ]);
const avisosPedido = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("avisos_pedido", {
    id: id(),
    tenantId: tenantId(),
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("order_id").notNull().references(()=>orders.id, {
        onDelete: "cascade"
    }),
    endpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("endpoint").notNull(),
    p256dh: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("p256dh").notNull(),
    auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("auth").notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uniqueIndex"])("avisos_pedido_endpoint_uq").on(t.orderId, t.endpoint)
    ]);
const orderItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("order_items", {
    id: id(),
    tenantId: tenantId(),
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("order_id").notNull().references(()=>orders.id),
    productId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("product_id").notNull().references(()=>products.id),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("quantity").notNull(),
    // entrega parcial: quanto chegou de fato ao cliente (vazio = tudo)
    deliveredQuantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("delivered_quantity"),
    unitPriceCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("unit_price_cents").notNull(),
    // false = cliente levou o vasilhame junto
    returnsEmpty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("returns_empty").notNull().default(true),
    // sem vazio para trocar, a loja empresta o vasilhame (comodato) em vez de vender: o cliente fica com o casco sem pagar
    loan: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("loan").notNull().default(false)
}, // os itens são sempre lidos pelo pedido
(t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("order_items_order_idx").on(t.orderId)
    ]);
const containerLoans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("container_loans", {
    id: id(),
    tenantId: tenantId(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("customer_id").notNull().references(()=>customers.id),
    productId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("product_id").notNull().references(()=>products.id),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("quantity").notNull(),
    depositCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("deposit_cents").notNull().default(0),
    depositMethod: paymentMethodEnum("deposit_method"),
    note: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("note").notNull().default(""),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("user_id").notNull().references(()=>users.id),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("container_loans_tenant_customer_idx").on(t.tenantId, t.customerId)
    ]);
const customerPayments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("customer_payments", {
    id: id(),
    tenantId: tenantId(),
    // filial onde o pagamento foi recebido (entra no caixa dela); o saldo do cliente soma todas
    branchId: branchId(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("customer_id").notNull().references(()=>customers.id),
    amountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("amount_cents").notNull(),
    method: paymentMethodEnum("method").notNull(),
    note: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("note").notNull().default(""),
    receivedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("received_by").notNull().references(()=>users.id),
    createdAt: createdAt(),
    // lançado por engano: fica no histórico, mas não abate a dívida
    voidedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("voided_at", {
        withTimezone: true
    }),
    voidedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("voided_by").references(()=>users.id),
    voidReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("void_reason")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("customer_payments_tenant_customer_idx").on(t.tenantId, t.customerId)
    ]);
const expenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("expenses", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("category").notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    amountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("amount_cents").notNull(),
    method: expenseMethodEnum("method").notNull(),
    paidOn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["date"])("paid_on", {
        mode: "string"
    }).notNull(),
    // preenchido quando a despesa é a devolução de um pedido estornado
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("order_id").references(()=>orders.id),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("created_by").notNull().references(()=>users.id),
    createdAt: createdAt(),
    voidedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("voided_at", {
        withTimezone: true
    }),
    voidedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("voided_by").references(()=>users.id),
    voidReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("void_reason")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("expenses_tenant_paid_idx").on(t.tenantId, t.paidOn)
    ]);
const customerAddresses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("customer_addresses", {
    id: id(),
    tenantId: tenantId(),
    customerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("customer_id").notNull().references(()=>customers.id),
    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("label").notNull(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("address").notNull(),
    reference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("reference").notNull().default(""),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("customer_addresses_customer_idx").on(t.customerId)
    ]);
const errorEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("error_events", {
    id: id(),
    fingerprint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("fingerprint").notNull().unique(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("message").notNull(),
    stack: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("stack").notNull().default(""),
    path: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("path").notNull().default(""),
    method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("method").notNull().default(""),
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("kind").notNull().default(""),
    count: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("count").notNull().default(1),
    firstSeen: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("first_seen", {
        withTimezone: true
    }).notNull().defaultNow(),
    lastSeen: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("last_seen", {
        withTimezone: true
    }).notNull().defaultNow(),
    lastAlertAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("last_alert_at", {
        withTimezone: true
    }),
    resolvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("resolved_at", {
        withTimezone: true
    })
});
const avisosPlataforma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("avisos_plataforma", {
    id: id(),
    texto: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("texto").notNull(),
    ate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("ate", {
        withTimezone: true
    }),
    removidoEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("removido_em", {
        withTimezone: true
    }),
    criadoPor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("criado_por").references(()=>users.id),
    createdAt: createdAt()
});
const stockMovements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("stock_movements", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    productId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("product_id").notNull().references(()=>products.id),
    state: containerStateEnum("state").notNull(),
    driverId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("driver_id").references(()=>users.id),
    quantity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("quantity").notNull(),
    reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("reason").notNull(),
    orderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("order_id").references(()=>orders.id),
    shiftId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("shift_id").references(()=>shifts.id),
    supplierId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("supplier_id"),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("user_id").notNull().references(()=>users.id),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("stock_tenant_product_idx").on(t.tenantId, t.productId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("stock_branch_product_idx").on(t.branchId, t.productId)
    ]);
const suppliers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("suppliers", {
    id: id(),
    tenantId: tenantId(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("phone").notNull().default(""),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("notes").notNull().default(""),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("suppliers_tenant_idx").on(t.tenantId)
    ]);
const contasPagar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("contas_pagar", {
    id: id(),
    tenantId: tenantId(),
    branchId: branchId(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("category").notNull(),
    supplierId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("supplier_id").references(()=>suppliers.id),
    amountCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("amount_cents").notNull(),
    dueOn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["date"])("due_on", {
        mode: "string"
    }).notNull(),
    // paga: a despesa que nasceu do pagamento (se ela for cancelada, a conta volta a ficar em aberto)
    paidAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("paid_at", {
        withTimezone: true
    }),
    expenseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("expense_id").references(()=>expenses.id),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("created_by").notNull().references(()=>users.id),
    createdAt: createdAt(),
    voidedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("voided_at", {
        withTimezone: true
    }),
    voidedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("voided_by").references(()=>users.id),
    voidReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("void_reason")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("contas_pagar_tenant_due_idx").on(t.tenantId, t.dueOn)
    ]);
const assinaturaPagamentos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("assinatura_pagamentos", {
    id: id(),
    tenantId: tenantId(),
    mpPaymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("mp_payment_id").notNull(),
    codigo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("codigo").notNull(),
    valorCents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["integer"])("valor_cents").notNull(),
    expiraEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("expira_em", {
        withTimezone: true
    }).notNull(),
    pagoEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["timestamp"])("pago_em", {
        withTimezone: true
    }),
    createdAt: createdAt()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("assinatura_pagamentos_tenant_idx").on(t.tenantId, t.createdAt),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("assinatura_pagamentos_mp_idx").on(t.mpPaymentId)
    ]);
const auditLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pgTable"])("audit_log", {
    id: id(),
    tenantId: tenantId(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["uuid"])("user_id").references(()=>users.id),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("action").notNull(),
    entity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("entity").notNull(),
    entityId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["text"])("entity_id"),
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["jsonb"])("data"),
    createdAt: createdAt()
}, // o segundo serve ao histórico de um pedido
(t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("audit_tenant_created_idx").on(t.tenantId, t.createdAt),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["index"])("audit_tenant_entity_idx").on(t.tenantId, t.entity, t.entityId)
    ]);
}),
"[project]/src/db/seed.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_PASSWORD",
    ()=>DEMO_PASSWORD,
    "seedDemo",
    ()=>seedDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/password.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$legal$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/legal.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/orders.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$shifts$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/shifts.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
const DEMO_PASSWORD = "demo1234";
async function seedDemo() {
    const [t] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).values({
        name: "Distribuidora Fonte Azul",
        slug: "fonte-azul",
        portalEnabled: true,
        pixKey: "financeiro@fonteazul.com.br",
        pixName: "Distribuidora Fonte Azul",
        pixCity: "São Paulo"
    }).returning();
    const [loja] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"]).values({
        tenantId: t.id,
        name: "Principal",
        slug: "principal",
        main: true
    }).returning();
    const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["hashPassword"])(DEMO_PASSWORD);
    const mk = (name, email, role)=>({
            tenantId: t.id,
            name,
            email,
            role,
            passwordHash,
            branchId: role === "dono" ? null : loja.id
        });
    const [dono, atendente, joao, carlos] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).values([
        {
            ...mk("Marina Souza", "dono@demo.com", "dono"),
            termsVersion: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$legal$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["TERMS_VERSION"],
            termsAcceptedAt: new Date()
        },
        mk("Paulo Lima", "atendente@demo.com", "atendente"),
        mk("João Pereira", "joao@demo.com", "entregador"),
        mk("Carlos Mendes", "carlos@demo.com", "entregador"),
        mk("Rita Campos", "caixa@demo.com", "caixa")
    ]).returning();
    const ctx = {
        tenantId: t.id,
        userId: atendente.id,
        role: "atendente",
        branchId: loja.id
    };
    const owner = {
        tenantId: t.id,
        userId: dono.id,
        role: "dono",
        branchId: loja.id
    };
    const [gas, agua, gas45, suporte] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["products"]).values([
        {
            tenantId: t.id,
            name: "Gás P13",
            priceCents: 11000,
            returnable: true,
            minStock: 10
        },
        {
            tenantId: t.id,
            name: "Galão de água 20L",
            priceCents: 1400,
            returnable: true,
            minStock: 15
        },
        {
            tenantId: t.id,
            name: "Gás P45",
            priceCents: 42000,
            returnable: true,
            minStock: 2
        },
        {
            tenantId: t.id,
            name: "Suporte para galão",
            priceCents: 2500,
            returnable: false,
            minStock: 3
        }
    ]).returning();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"]).values([
        [
            gas,
            "cheio",
            40
        ],
        [
            gas,
            "vazio",
            6
        ],
        [
            agua,
            "cheio",
            60
        ],
        [
            agua,
            "vazio",
            10
        ],
        [
            gas45,
            "cheio",
            4
        ],
        [
            suporte,
            "cheio",
            8
        ]
    ].map(([p, state, quantity])=>({
            tenantId: t.id,
            branchId: loja.id,
            productId: p.id,
            state: state,
            quantity: quantity,
            reason: "inventário inicial",
            userId: dono.id
        })));
    const cs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"]).values([
        [
            "Ana Ribeiro",
            "(11) 98811-2034",
            "Rua das Acácias, 120, Jd. Primavera",
            "Portão verde"
        ],
        [
            "Bar do Zé",
            "(11) 97722-4410",
            "Av. Brasil, 1500, Centro",
            "Entregar nos fundos"
        ],
        [
            "Cláudia Martins",
            "(11) 99654-0098",
            "Rua Ipê Roxo, 45, Vila Nova",
            "Casa 2"
        ],
        [
            "Restaurante Sabor Caseiro",
            "(11) 3344-9087",
            "Rua XV de Novembro, 300, Centro",
            "Falar com Rose"
        ],
        [
            "Diego Alves",
            "(11) 98123-7765",
            "Rua Palmeiras, 88, Jd. Primavera",
            ""
        ],
        [
            "Escola Pequeno Saber",
            "(11) 3322-1100",
            "Rua Projetada, 10, Vila Nova",
            "Recepção, até 17h"
        ],
        [
            "Fernanda Costa",
            "(11) 99001-2233",
            "Travessa Sol, 7, Centro",
            "Apto 31"
        ],
        [
            "Padaria Pão Quente",
            "(11) 3455-6677",
            "Av. Brasil, 820, Centro",
            ""
        ]
    ].map(([name, phone, address, reference])=>({
            tenantId: t.id,
            name,
            phone,
            address,
            reference
        }))).returning();
    const order = (customer, items, paymentMethod, driverId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["createOrder"])(ctx, {
            mode: "entrega",
            customerId: cs[customer].id,
            items: items.map(([p, quantity])=>({
                    productId: p.id,
                    quantity,
                    returnsEmpty: true
                })),
            paymentMethod,
            deliveryFeeCents: 0,
            changeForCents: null,
            notes: "",
            driverId
        });
    // turno anterior do Carlos, fechado com falta de R$ 20
    const old = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$shifts$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["openShift"])(ctx, carlos.id, 5000);
    for (const [c, items, pm] of [
        [
            1,
            [
                [
                    agua,
                    4
                ]
            ],
            "dinheiro"
        ],
        [
            3,
            [
                [
                    gas,
                    2
                ]
            ],
            "pix"
        ],
        [
            4,
            [
                [
                    gas,
                    1
                ]
            ],
            "dinheiro"
        ],
        [
            7,
            [
                [
                    agua,
                    2
                ]
            ],
            "dinheiro"
        ]
    ]){
        const o = await order(c, items, pm, carlos.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["deliverOrder"])(ctx, o.id);
    }
    // esperado 50 + 56 + 110 + 28 = 244
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$shifts$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["closeShift"])(owner, old.id, 22400, "Cliente do Bar do Zé pagou R$ 20 a menos; combinado de acertar amanhã.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$shifts$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["openShift"])(ctx, joao.id, 5000);
    for (const [c, items, pm] of [
        [
            0,
            [
                [
                    gas,
                    1
                ]
            ],
            "dinheiro"
        ],
        [
            2,
            [
                [
                    agua,
                    2
                ]
            ],
            "pix"
        ],
        [
            5,
            [
                [
                    agua,
                    6
                ]
            ],
            "fiado"
        ]
    ]){
        const o = await order(c, items, pm, joao.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["deliverOrder"])(ctx, o.id);
    }
    await order(6, [
        [
            gas,
            1
        ]
    ], "dinheiro", joao.id);
    const waiting = await order(4, [
        [
            agua,
            3
        ]
    ], "cartao", null);
    await order(1, [
        [
            gas,
            1
        ],
        [
            agua,
            2
        ]
    ], "dinheiro", null);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$shifts$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["openShift"])(ctx, carlos.id, 3000);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["dispatchOrder"])(ctx, waiting.id, carlos.id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$orders$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["createOrder"])(ctx, {
        mode: "balcao",
        customerId: null,
        items: [
            {
                productId: agua.id,
                quantity: 1,
                returnsEmpty: true
            },
            {
                productId: suporte.id,
                quantity: 1,
                returnsEmpty: false
            }
        ],
        paymentMethod: "pix",
        deliveryFeeCents: 0,
        changeForCents: null,
        notes: "",
        driverId: null
    });
    return t;
}
}),
"[project]/src/domain/aviso.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "avisarCliente",
    ()=>avisarCliente,
    "avisosLigados",
    ()=>avisosLigados,
    "inscricaoSchema",
    ()=>inscricaoSchema,
    "salvarInscricao",
    ()=>salvarInscricao,
    "usarEnvio",
    ()=>usarEnvio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$push$2f$src$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/web-push/src/index.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/functions/aggregate.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$url$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .url>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
// Notificação no celular de quem pediu pelo site (web push): o cliente aceita na página do pedido e o
// celular avisa quando o Pix cai, quando sai para entrega e quando é entregue, mesmo com a página fechada.
// Sem as chaves VAPID no ambiente, nada é guardado nem enviado (e o botão nem aparece).
// lidas na hora de usar: o ambiente pode ser preenchido depois de o módulo carregar (testes, recarga do .env)
const chaves = ()=>({
        publica: ("TURBOPACK compile-time value", "BMz_MYdRoUL7syw-RaEUAKrXyDREG0u-zIsgWL0yinhnMPd6LxJTguRT5W51UVqx-SHKquF6Vxv0Qen9oxN_BXk") ?? "",
        privada: process.env.VAPID_PRIVADA ?? ""
    });
const avisosLigados = ()=>!!(chaves().publica && chaves().privada);
// os testes trocam o envio por um de mentira, como fazem com a rede do Mercado Pago
let enviar = (...a)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$push$2f$src$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].sendNotification(...a);
const usarEnvio = (f)=>void (enviar = f);
// só os serviços de push dos navegadores: a inscrição vem de página pública, e o servidor faz POST no endereço
const PUSH = [
    "fcm.googleapis.com",
    "push.services.mozilla.com",
    "notify.windows.com",
    "push.apple.com"
];
const ehPush = (u)=>{
    try {
        const h = new URL(u).hostname;
        return PUSH.some((d)=>h === d || h.endsWith("." + d));
    } catch  {
        return false;
    }
};
const inscricaoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    endpoint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$url$3e$__["z"].url().startsWith("https://").max(1000).refine(ehPush, "Serviço de aviso desconhecido."),
    keys: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        p256dh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(20).max(200),
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(8).max(100)
    })
});
async function salvarInscricao(tenantId, orderId, bruto) {
    if (!avisosLigados()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Avisos desligados nesta instalação.");
    const sub = inscricaoSchema.parse(bruto);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])({
        tenantId
    }, async (tx)=>{
        // um pedido não precisa de mais que alguns celulares avisados (quem pediu e alguém da casa)
        const [{ n }] = await tx.select({
            n: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["count"])()
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].orderId, orderId)));
        if (n >= 5) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este pedido já avisa celulares demais.");
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"]).values({
            tenantId,
            orderId,
            endpoint: sub.endpoint,
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth
        }).onConflictDoNothing();
    });
}
const fim = [
    "entregue",
    "cancelado"
];
async function avisarCliente(tenantId, orderId, evento) {
    if (!avisosLigados()) return;
    try {
        const dados = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["withTenant"])(tenantId, async ()=>{
            const subs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].orderId, orderId)));
            if (!subs.length) return null;
            const [o] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
                number: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].number,
                trackingId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].trackingId,
                loja: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name,
                slug: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].slug,
                entregador: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].name
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId)).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].driverId)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, orderId)));
            return o ? {
                subs,
                o
            } : null;
        });
        if (!dados) return;
        const { subs, o } = dados;
        const quem = o.entregador ? ` com ${o.entregador.split(" ")[0]}` : "";
        const texto = {
            pago: "Pix confirmado. A loja está separando seu pedido.",
            saiu: `Saiu para entrega${quem}.`,
            entregue: "Pedido entregue. Obrigado!",
            nao_entregue: "Não conseguimos entregar. A loja vai combinar com você.",
            cancelado: "Pedido cancelado."
        };
        const payload = JSON.stringify({
            title: `${o.loja}: pedido #${o.number}`,
            body: texto[evento],
            url: `/pedir/${o.slug}/acompanhar/${o.trackingId}`,
            tag: `pedido-${o.number}`
        });
        const site = process.env.APP_URL || "http://localhost:3000";
        const mortas = [];
        await Promise.all(subs.map((s)=>enviar({
                endpoint: s.endpoint,
                keys: {
                    p256dh: s.p256dh,
                    auth: s.auth
                }
            }, payload, {
                vapidDetails: {
                    subject: site.startsWith("https://") ? site : "mailto:avisos@deposito.app",
                    publicKey: chaves().publica,
                    privateKey: chaves().privada
                },
                TTL: 60 * 60
            }).catch((e)=>{
                if (e.statusCode === 404 || e.statusCode === 410) mortas.push(s.id);
                else console.error(`[aviso] pedido ${orderId}: ${e.statusCode ?? ""} ${e.message ?? e}`);
            })));
        const sair = fim.includes(evento) ? subs.map((s)=>s.id) : mortas;
        if (sair.length) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])({
            tenantId
        }, async (tx)=>{
            for (const id of sair)await tx.delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPedido"].id, id)));
        });
    } catch (e) {
        console.error(`[aviso] pedido ${orderId} sem aviso:`, e.message);
    }
}
}),
"[project]/src/domain/contas.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelarConta",
    ()=>cancelarConta,
    "contaSchema",
    ()=>contaSchema,
    "contasEmAberto",
    ()=>contasEmAberto,
    "contasVencendo",
    ()=>contasVencendo,
    "criarConta",
    ()=>criarConta,
    "criarContaTx",
    ()=>criarContaTx,
    "pagarConta",
    ()=>pagarConta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .uuid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .int>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .iso>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/period.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
;
const contaSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Descreva a conta.").max(160, "A descrição pode ter até 160 letras."),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "combustivel",
        "fornecedor",
        "salarios",
        "manutencao",
        "aluguel",
        "impostos",
        "outros"
    ], {
        message: "Escolha a categoria."
    }),
    supplierId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid().nullable().default(null),
    amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(1, "Informe o valor.").max(10_000_000_00, "Valor muito alto."),
    dueOn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__["z"].iso.date("Informe o vencimento.")
});
async function criarContaTx(tx, ctx, input) {
    if (input.supplierId) {
        const [s] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id, input.supplierId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].tenantId, ctx.tenantId)));
        if (!s) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Fornecedor não encontrado.");
    }
    const [c] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).values({
        ...input,
        tenantId: ctx.tenantId,
        branchId: ctx.branchId,
        createdBy: ctx.userId
    }).returning();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "conta.criar", "conta", c.id, {
        description: c.description,
        amountCents: c.amountCents,
        dueOn: c.dueOn
    });
    return c;
}
async function criarConta(ctx, raw) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "caixa");
    const input = contaSchema.parse(raw);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, (tx)=>criarContaTx(tx, ctx, input));
}
async function pagarConta(ctx, contaId, pagamento) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "caixa");
    const { method, paidOn } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
            "dinheiro",
            "pix",
            "cartao",
            "boleto"
        ]),
        paidOn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__["z"].iso.date("Data inválida.")
    }).parse(pagamento);
    if (paidOn > (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A data do pagamento não pode ser no futuro.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [c] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].id, contaId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].tenantId, ctx.tenantId), ctx.role === "dono" ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].branchId, ctx.branchId))).for("update");
        if (!c || c.voidedAt) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Conta não encontrada.");
        if (c.paidAt) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Esta conta já foi paga.");
        const [e] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).values({
            tenantId: ctx.tenantId,
            branchId: c.branchId,
            category: c.category,
            description: c.description,
            amountCents: c.amountCents,
            method,
            paidOn,
            createdBy: ctx.userId
        }).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id
        });
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).set({
            paidAt: new Date(),
            expenseId: e.id
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].id, c.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "conta.pagar", "conta", c.id, {
            description: c.description,
            amountCents: c.amountCents,
            method,
            paidOn
        });
    });
}
async function cancelarConta(ctx, contaId, reason) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do cancelamento.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [c] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).set({
            voidedAt: new Date(),
            voidedBy: ctx.userId,
            voidReason: reason.trim()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].id, contaId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].paidAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].voidedAt))).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].id,
            description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].description
        });
        if (!c) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Só dá para cancelar conta em aberto.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "conta.cancelar", "conta", c.id, {
            description: c.description,
            reason: reason.trim()
        });
    });
}
const contasEmAberto = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(function contasEmAberto(tenantId, branchId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].id,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].description,
        category: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].category,
        amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].amountCents,
        dueOn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].dueOn,
        fornecedor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].name
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].supplierId)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].tenantId, tenantId), branchId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].branchId, branchId) : undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].paidAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].voidedAt))).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["asc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].dueOn));
});
const contasVencendo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(async function contasVencendo(tenantId, branchId) {
    const hoje = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])();
    const amanha = new Date(`${hoje}T12:00:00-03:00`);
    amanha.setDate(amanha.getDate() + 1);
    const ate = amanha.toISOString().slice(0, 10);
    const [r] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        vencidas: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(count(*) filter (where ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].dueOn} < ${hoje}))::int`,
        vencendo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(count(*) filter (where ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].dueOn} >= ${hoje}))::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].tenantId, tenantId), branchId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].branchId, branchId) : undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].paidAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].voidedAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["lte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].dueOn, ate)));
    return r;
});
}),
"[project]/src/domain/expenses.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createExpense",
    ()=>createExpense,
    "expenseCategories",
    ()=>expenseCategories,
    "expenseSchema",
    ()=>expenseSchema,
    "expensesTotal",
    ()=>expensesTotal,
    "listExpenses",
    ()=>listExpenses,
    "voidExpense",
    ()=>voidExpense
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .int>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .iso>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
const expenseCategories = {
    combustivel: "Combustível",
    fornecedor: "Fornecedor",
    salarios: "Salários e diárias",
    manutencao: "Manutenção",
    aluguel: "Aluguel e contas",
    impostos: "Impostos e taxas",
    outros: "Outros",
    estorno: "Estorno de venda"
};
const expenseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    // "estorno" só nasce do estorno de pedido, nunca à mão
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "combustivel",
        "fornecedor",
        "salarios",
        "manutencao",
        "aluguel",
        "impostos",
        "outros"
    ], {
        message: "Escolha a categoria."
    }),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Descreva a despesa.").max(160, "A descrição pode ter até 160 letras."),
    amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(1, "Informe o valor.").max(10_000_000_00, "Valor muito alto."),
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "dinheiro",
        "pix",
        "cartao",
        "boleto"
    ]),
    paidOn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__["z"].iso.date("Data inválida.")
});
async function createExpense(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [e] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).values({
            ...input,
            tenantId: ctx.tenantId,
            branchId: ctx.branchId,
            createdBy: ctx.userId
        }).returning();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "despesa.criar", "expense", e.id, input);
        return e;
    });
}
async function voidExpense(ctx, expenseId, reason) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do cancelamento.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [e] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id, expenseId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].tenantId, ctx.tenantId))).for("update");
        if (!e) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Despesa não encontrada.");
        if (e.voidedAt) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Despesa já cancelada.");
        if (e.orderId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Esta saída é a devolução de um pedido estornado e não pode ser cancelada.");
        const [fromShift] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].expenseId, e.id));
        if (fromShift) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este gasto saiu do dinheiro de um entregador. Estorne o lançamento na tela do acerto.");
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).set({
            voidedAt: new Date(),
            voidedBy: ctx.userId,
            voidReason: reason.trim()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id, e.id));
        // a despesa era o pagamento de uma conta: a conta volta para "A pagar"
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"]).set({
            paidAt: null,
            expenseId: null
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contasPagar"].expenseId, e.id)));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "despesa.cancelar", "expense", e.id, {
            reason
        });
    });
}
const listExpenses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(function listExpenses(tenantId, fromStr, toStr, branchId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id,
        category: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].category,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].description,
        amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].amountCents,
        method: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].method,
        paidOn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn,
        orderId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].orderId,
        voidedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].voidedAt,
        voidReason: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].voidReason,
        by: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].name
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].createdBy)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].tenantId, tenantId), branchId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].branchId, branchId) : undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn, fromStr), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["lte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn, toStr))).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].createdAt));
});
const expensesTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(async function expensesTotal(tenantId, fromStr, toStr, branchId, excludeRefunds = false) {
    const [r] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        total: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].amountCents}), 0)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].tenantId, tenantId), branchId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].branchId, branchId) : undefined, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].voidedAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn, fromStr), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["lte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].paidOn, toStr), excludeRefunds ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["ne"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].category, "estorno") : undefined));
    return r.total;
});
}),
"[project]/src/domain/orders.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelOrder",
    ()=>cancelOrder,
    "confirmPix",
    ()=>confirmPix,
    "createOrder",
    ()=>createOrder,
    "criarPedidoNaTx",
    ()=>criarPedidoNaTx,
    "deliverOrder",
    ()=>deliverOrder,
    "dispatchOrder",
    ()=>dispatchOrder,
    "dispatchOrders",
    ()=>dispatchOrders,
    "liberaParaFila",
    ()=>liberaParaFila,
    "marcarPixDevolvido",
    ()=>marcarPixDevolvido,
    "newOrderSchema",
    ()=>newOrderSchema,
    "occurrenceKinds",
    ()=>occurrenceKinds,
    "originLabel",
    ()=>originLabel,
    "reassignOrder",
    ()=>reassignOrder,
    "refundOrder",
    ()=>refundOrder,
    "reportOccurrence",
    ()=>reportOccurrence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .uuid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .int>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .boolean>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cash.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/money.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/period.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$receivables$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/receivables.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/aviso.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const newOrderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "entrega",
        "balcao"
    ]),
    customerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid().nullable(),
    items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid(),
        quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(1, "Quantidade mínima é 1.").max(99, "No máximo 99 unidades por item."),
        returnsEmpty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean()
    })).min(1, "Adicione ao menos um item."),
    paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "dinheiro",
        "pix",
        "cartao",
        "fiado"
    ]),
    cashPartCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(0).max(100_000_00, "Valor em dinheiro muito alto.").default(0),
    origin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "whatsapp",
        "telefone",
        "balcao",
        "portal",
        "programado"
    ]).default("telefone"),
    addressId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid().nullable().default(null),
    // endereço digitado na hora (portal); vale só para este pedido
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(200).optional(),
    reference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(200).default(""),
    discountCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(0, "Desconto inválido.").max(100_000_00, "Desconto muito alto.").default(0),
    discountReason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(160, "O motivo do desconto pode ter até 160 letras.").default(""),
    deliveryFeeCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(0, "Taxa de entrega inválida.").max(100_00, "A taxa de entrega vai até R$ 100,00."),
    changeForCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(0).max(100_000_00, "Valor para troco muito alto.").nullable(),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().max(500, "A observação pode ter até 500 letras."),
    driverId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid().nullable(),
    // pedido do site: só aceita o que tem na loja agora (a atendente vê o estoque e decide por conta própria)
    exigirEstoque: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean().default(false)
}).refine((o)=>o.mode === "balcao" || o.customerId, {
    message: "Entrega precisa de cliente."
}).refine((o)=>o.paymentMethod !== "fiado" || o.customerId, {
    message: "Fiado precisa de cliente identificado."
}).refine((o)=>!o.cashPartCents || o.paymentMethod === "pix" || o.paymentMethod === "cartao", {
    message: "Parte em dinheiro só vale para pedido no Pix ou no cartão."
}).refine((o)=>!o.discountCents || o.discountReason.length >= 3, {
    message: "Informe o motivo do desconto."
});
const originLabel = {
    whatsapp: "WhatsApp",
    telefone: "Telefone",
    balcao: "Balcão",
    portal: "Portal",
    programado: "Programado"
};
const occurrenceKinds = {
    ausente: "Cliente ausente",
    endereco: "Endereço não encontrado",
    recusou: "Cliente recusou",
    sem_pagamento: "Cliente sem dinheiro ou sem troco",
    outro: "Outro motivo"
};
async function loadOrder(tx, ctx, orderId) {
    const [o] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, orderId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, ctx.tenantId))).for("update");
    // a equipe só mexe nos pedidos da própria filial; o dono, em qualquer uma
    if (!o || ctx.role !== "dono" && o.branchId !== ctx.branchId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido não encontrado.");
    const items = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].orderId, o.id));
    const prods = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["lockProducts"])(tx, ctx, [
        ...new Set(items.map((i)=>i.productId))
    ]);
    const name = (id)=>prods.find((p)=>p.id === id)?.name ?? "produto";
    const returnable = (id)=>prods.find((p)=>p.id === id)?.returnable ?? false;
    // o estoque que se mexe é o da filial do pedido, não o da filial que o dono está vendo
    const c = {
        ...ctx,
        branchId: o.branchId
    };
    return {
        o,
        items,
        name,
        returnable,
        c
    };
}
async function createOrder(ctx, raw) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    const input = newOrderSchema.parse(raw);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, (tx)=>criarPedidoNaTx(tx, ctx, input));
}
async function criarPedidoNaTx(tx, ctx, input) {
    // preço sempre do banco, nunca do form
    const prods = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["lockProducts"])(tx, ctx, [
        ...new Set(input.items.map((i)=>i.productId))
    ]);
    const items = input.items.map((i)=>{
        const p = prods.find((x)=>x.id === i.productId && x.active);
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto indisponível.");
        const returnsEmpty = p.returnable && i.returnsEmpty;
        // sem vazio para trocar, o cliente compra o vasilhame junto (as revendas não emprestam casco)
        const container = p.returnable && !returnsEmpty ? p.containerPriceCents : 0;
        return {
            ...i,
            unitPriceCents: p.priceCents + container,
            returnsEmpty,
            name: p.name
        };
    });
    if (input.exigirEstoque) {
        // com os produtos travados acima, dois pedidos ao mesmo tempo não levam o mesmo último galão
        const livre = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["disponivelNaLoja"])(tx, ctx.tenantId, ctx.branchId, [
            ...new Set(items.map((i)=>i.productId))
        ]);
        for (const id of livre.keys()){
            const pedido = items.filter((i)=>i.productId === id).reduce((s, i)=>s + i.quantity, 0);
            const tem = Math.max(0, livre.get(id));
            const nome = items.find((i)=>i.productId === id).name;
            if (pedido > tem) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](tem ? `Só temos ${tem} de ${nome} agora.` : `${nome} acabou. Escolha outro produto.`);
        }
    }
    if (input.customerId) {
        const [c] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id, input.customerId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].anonymizedAt)));
        if (!c) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Cliente não encontrado.");
    }
    let place = input.address ? {
        address: input.address,
        reference: input.reference
    } : null;
    if (input.mode === "entrega" && input.addressId && input.customerId && !place) {
        [place] = await tx.select({
            address: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerAddresses"].address,
            reference: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerAddresses"].reference
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerAddresses"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerAddresses"].id, input.addressId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerAddresses"].customerId, input.customerId)));
        if (!place) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Endereço de entrega não encontrado.");
    }
    // trava a empresa: dois pedidos ao mesmo tempo não pegam o mesmo número
    const [house] = await tx.select({
        staffDiscountPct: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].staffDiscountPct
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, ctx.tenantId)).for("update");
    const subtotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["itemsSubtotal"])(items);
    if (input.discountCents > subtotal) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O desconto não pode ser maior que o valor dos produtos.");
    // desconto acima do limite da casa só com o dono
    const limit = Math.floor(subtotal * house.staffDiscountPct / 100);
    if (ctx.role !== "dono" && input.discountCents > limit) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Desconto acima do seu limite (${house.staffDiscountPct}%, até ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["formatBRL"])(limit)} neste pedido). Peça ao dono para lançar.`);
    const fee = input.mode === "balcao" ? 0 : input.deliveryFeeCents;
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderTotal"])(items, fee, input.discountCents);
    if (input.paymentMethod === "dinheiro" && input.changeForCents !== null && input.changeForCents < total) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O valor para troco é menor que o total.");
    if (input.cashPartCents >= total && input.cashPartCents > 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A parte em dinheiro precisa ser menor que o total. Se for tudo em dinheiro, escolha Dinheiro.");
    const [{ next }] = await tx.select({
        next: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(max(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].number}), 0)::int + 1`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, ctx.tenantId));
    const now = new Date();
    const [order] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).values({
        tenantId: ctx.tenantId,
        branchId: ctx.branchId,
        number: next,
        customerId: input.customerId,
        paymentMethod: input.paymentMethod,
        cashPartCents: input.cashPartCents,
        origin: input.mode === "balcao" ? "balcao" : input.origin,
        address: place?.address,
        reference: place?.reference,
        deliveryFeeCents: fee,
        discountCents: input.discountCents,
        discountReason: input.discountCents ? input.discountReason : null,
        totalCents: total,
        changeForCents: input.paymentMethod === "dinheiro" ? input.changeForCents : null,
        notes: input.notes,
        createdBy: ctx.userId,
        ...input.mode === "balcao" ? {
            status: "entregue",
            deliveredAt: now
        } : {},
        // pedido do site pago no Pix só entra na fila de entrega depois que o Pix é confirmado
        ...input.mode === "entrega" && input.origin === "portal" && input.paymentMethod === "pix" ? {
            status: "aguardando_pagamento"
        } : {}
    }).returning();
    await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"]).values(items.map((i)=>({
            tenantId: ctx.tenantId,
            orderId: order.id,
            productId: i.productId,
            quantity: i.quantity,
            unitPriceCents: i.unitPriceCents,
            returnsEmpty: i.returnsEmpty
        })));
    if (input.mode === "balcao") {
        for (const i of items){
            const base = {
                productId: i.productId,
                driverId: null,
                orderId: order.id,
                reason: `venda balcão #${next}`
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, ctx, {
                ...base,
                state: "cheio",
                quantity: -i.quantity
            }, i.name);
            if (i.returnsEmpty) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, ctx, {
                ...base,
                state: "vazio",
                quantity: i.quantity
            }, i.name);
        }
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.criar", "order", order.id, {
        number: next,
        total,
        mode: input.mode,
        discount: input.discountCents || undefined
    });
    if (input.mode === "entrega" && input.driverId) await dispatchInTx(tx, ctx, order.id, input.driverId);
    return order;
}
/**
 * A viagem em que o pedido entra: a que o entregador já tem e ainda não foi acertada, senão uma nova.
 * Quem sai com três pedidos sai numa viagem só; depois do acerto da volta, a próxima saída abre outra.
 */ async function viagemDe(tx, shiftId, driverId) {
    const [aberta] = await tx.select({
        tripId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tripId
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].shiftId, shiftId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].driverId, driverId), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tripId} is not null`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`not exists (select 1 from ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]} e where e.trip_id = ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tripId} and e.voided_at is null)`)).limit(1);
    return aberta?.tripId ?? crypto.randomUUID();
}
async function dispatchInTx(tx, ctx, orderId, driverId) {
    const { o, items, name, c } = await loadOrder(tx, ctx, orderId);
    if (o.status !== "aberto") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Só pedidos em aberto podem sair para entrega.");
    const [shift] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].branchId, o.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].driverId, driverId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status, "aberto")))// espera um acerto em andamento terminar; se ele fechar o turno, esta busca não acha mais nada
    .for("update");
    if (!shift) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este entregador não tem turno aberto nesta filial. Abra o turno no Caixa.");
    for (const i of items){
        const base = {
            productId: i.productId,
            orderId: o.id,
            shiftId: shift.id,
            reason: `saída pedido #${o.number}`
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
            ...base,
            state: "cheio",
            driverId: null,
            quantity: -i.quantity
        }, name(i.productId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
            ...base,
            state: "cheio",
            driverId,
            quantity: i.quantity
        }, name(i.productId));
    }
    await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
        status: "em_rota",
        driverId,
        shiftId: shift.id,
        tripId: await viagemDe(tx, shift.id, driverId),
        dispatchedAt: new Date(),
        occurrence: null,
        occurrenceAt: null
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.saida", "order", o.id, {
        driverId,
        shiftId: shift.id
    });
}
// tira da conta do entregador os cheios de um pedido que não vai mais ser entregue por ele
async function returnToStore(tx, loaded, reason) {
    const { o, items, name, c } = loaded;
    for (const i of items){
        const base = {
            productId: i.productId,
            orderId: o.id,
            shiftId: o.shiftId ?? undefined,
            state: "cheio",
            reason
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
            ...base,
            driverId: o.driverId,
            quantity: -i.quantity
        }, name(i.productId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
            ...base,
            driverId: null,
            quantity: i.quantity
        }, name(i.productId));
    }
}
async function reportOccurrence(ctx, orderId, kind, note) {
    if (!(kind in occurrenceKinds)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha o que aconteceu.");
    if (kind === "outro" && note.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Conte o que aconteceu.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const loaded = await loadOrder(tx, ctx, orderId);
        const { o } = loaded;
        if (ctx.role === "entregador" && o.driverId !== ctx.userId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido de outro entregador.");
        if (o.status !== "em_rota" || !o.driverId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido não está em rota.");
        await returnToStore(tx, loaded, `retorno sem entrega #${o.number}`);
        const text = [
            occurrenceKinds[kind],
            note.trim()
        ].filter(Boolean).join(": ");
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            status: "aberto",
            driverId: null,
            shiftId: null,
            tripId: null,
            dispatchedAt: null,
            occurrence: text,
            occurrenceAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.ocorrencia", "order", o.id, {
            kind,
            note: note.trim(),
            driverId: o.driverId
        });
    });
    // o celular do cliente fica sabendo depois da mudança gravada (falha no aviso não desfaz nada)
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisarCliente"])(ctx.tenantId, orderId, "nao_entregue");
}
const liberaParaFila = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`case when ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status} = 'aguardando_pagamento' then 'aberto'::order_status else ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status} end`;
async function confirmPix(ctx, orderId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "caixa");
    const [antes] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, (tx)=>tx.select({
            status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, orderId))));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [o] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            pixConfirmedAt: new Date(),
            pixConfirmedBy: ctx.userId,
            status: liberaParaFila
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, orderId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, ctx.tenantId), ctx.role === "dono" ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].branchId, ctx.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].paymentMethod, "pix"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].pixConfirmedAt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status, [
            "aguardando_pagamento",
            "aberto",
            "em_rota",
            "entregue"
        ]))).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id
        });
        if (!o) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este pedido não tem Pix a conferir.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.pix_conferido", "order", o.id);
    });
    if (antes?.status === "aguardando_pagamento") void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisarCliente"])(ctx.tenantId, orderId, "pago");
}
async function reassignOrder(ctx, orderId, driverId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const { o, items, name, c } = await loadOrder(tx, ctx, orderId);
        if (o.status !== "em_rota" || !o.driverId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Só pedidos em rota podem trocar de entregador.");
        if (o.driverId === driverId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O pedido já está com este entregador.");
        const [shift] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].branchId, o.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].driverId, driverId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status, "aberto"))).for("update");
        if (!shift) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este entregador não tem turno aberto nesta filial. Abra o turno no Caixa.");
        for (const i of items){
            const base = {
                productId: i.productId,
                orderId: o.id,
                state: "cheio",
                reason: `troca de entregador #${o.number}`
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                shiftId: o.shiftId ?? undefined,
                driverId: o.driverId,
                quantity: -i.quantity
            }, name(i.productId));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                shiftId: shift.id,
                driverId,
                quantity: i.quantity
            }, name(i.productId));
        }
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            driverId,
            shiftId: shift.id,
            tripId: await viagemDe(tx, shift.id, driverId)
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.trocar_entregador", "order", o.id, {
            from: o.driverId,
            to: driverId
        });
    });
}
async function dispatchOrder(ctx, orderId, driverId) {
    return dispatchOrders(ctx, [
        orderId
    ], driverId);
}
async function dispatchOrders(ctx, orderIds, driverId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    const ids = [
        ...new Set(orderIds)
    ];
    if (!ids.length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha os pedidos que vão sair.");
    if (ids.length > 30) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha até 30 pedidos por saída.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        for (const id of ids)await dispatchInTx(tx, ctx, id, driverId);
    });
    for (const id of ids)void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisarCliente"])(ctx.tenantId, id, "saiu");
}
async function deliverOrder(ctx, orderId, partial) {
    const total = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const { o, items, name, c } = await loadOrder(tx, ctx, orderId);
        if (ctx.role === "entregador" && o.driverId !== ctx.userId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido de outro entregador.");
        // confirmação repetida (celular sem rede reenviando): já está entregue, não faz nada de novo
        if (o.status === "entregue" && !partial) return o.totalCents;
        if (o.status !== "em_rota" || !o.driverId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido não está em rota.");
        const got = items.map((i)=>{
            const q = partial?.delivered[i.id] ?? i.quantity;
            if (!Number.isInteger(q) || q < 0 || q > i.quantity) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Quantidade entregue inválida para ${name(i.productId)}.`);
            return {
                ...i,
                got: q
            };
        });
        const isPartial = got.some((i)=>i.got < i.quantity);
        if (partial && !isPartial) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]('Você marcou tudo como entregue. Use "Entreguei".');
        if (isPartial) {
            if (got.every((i)=>i.got === 0)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Nada foi entregue: use \"Não consegui entregar\".");
            if ((partial?.note.trim().length ?? 0) < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Explique por que a entrega foi parcial.");
        }
        for (const i of got.filter((i)=>i.got > 0)){
            const base = {
                productId: i.productId,
                orderId: o.id,
                shiftId: o.shiftId ?? undefined,
                driverId: o.driverId
            };
            const reason = `entrega pedido #${o.number}`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                state: "cheio",
                quantity: -i.got,
                reason
            }, name(i.productId));
            if (i.returnsEmpty) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                state: "vazio",
                quantity: i.got,
                reason
            }, name(i.productId));
        }
        const changes = {
            status: "entregue",
            deliveredAt: new Date()
        };
        if (isPartial) {
            for (const i of got)await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"]).set({
                deliveredQuantity: i.got
            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].id, i.id));
            const delivered = got.map((i)=>({
                    quantity: i.got,
                    unitPriceCents: i.unitPriceCents
                }));
            const discount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["partialDiscount"])(o.discountCents, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["itemsSubtotal"])(items), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["itemsSubtotal"])(delivered));
            const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderTotal"])(delivered, o.deliveryFeeCents, discount);
            // Pix já pago antes da entrega: ele cobre o novo total primeiro; o que passar volta ao cliente,
            // e o que faltar continua em dinheiro com o entregador
            const pixPago = o.paymentMethod === "pix" && o.pixConfirmedAt ? o.totalCents - o.cashPartCents : null;
            Object.assign(changes, {
                totalCents: total,
                discountCents: discount,
                // a conta mudou: troco e divisão do pagamento combinados antes deixam de valer
                changeForCents: null,
                // se a parte em dinheiro cobre o novo total, o pedido passou a ser todo em dinheiro
                ...pixPago !== null ? {
                    cashPartCents: Math.max(0, total - pixPago),
                    pixDevolverCents: Math.max(0, pixPago - total)
                } : o.cashPartCents >= total && o.cashPartCents > 0 ? {
                    paymentMethod: "dinheiro",
                    cashPartCents: 0
                } : {},
                notes: [
                    o.notes,
                    `Entrega parcial: ${partial.note.trim()}`
                ].filter(Boolean).join(" | ")
            });
        }
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set(changes).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, isPartial ? "pedido.entrega_parcial" : "pedido.entregue", "order", o.id, isPartial ? {
            before: o.totalCents,
            after: changes.totalCents,
            note: partial.note,
            pixDevolver: changes.pixDevolverCents || undefined
        } : undefined);
        return changes.totalCents ?? o.totalCents;
    });
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisarCliente"])(ctx.tenantId, orderId, "entregue");
    return total;
}
async function cancelOrder(ctx, orderId, reason) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    if (reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do cancelamento.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const loaded = await loadOrder(tx, ctx, orderId);
        const { o } = loaded;
        if (o.status === "entregue") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido entregue não pode ser cancelado. Use o estorno.");
        if (o.status === "estornado") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido já estornado.");
        if (o.status === "cancelado") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pedido já cancelado.");
        if (o.status === "em_rota" && o.driverId) await returnToStore(tx, loaded, `retorno cancelamento #${o.number}`);
        // Pix já pago: o cliente tem esse valor a receber de volta, e o pedido mostra isso até a loja devolver
        const devolver = o.pixConfirmedAt ? o.totalCents - o.cashPartCents : 0;
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            status: "cancelado",
            cancelReason: reason.trim(),
            pixDevolverCents: devolver
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.cancelar", "order", o.id, {
            reason,
            previous: o.status,
            ...devolver ? {
                pixDevolver: devolver
            } : {}
        });
    });
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$aviso$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisarCliente"])(ctx.tenantId, orderId, "cancelado");
}
async function marcarPixDevolvido(ctx, orderId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "caixa");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [o] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            pixDevolverCents: 0
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, orderId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, ctx.tenantId), ctx.role === "dono" ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].branchId, ctx.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].pixDevolverCents, 0))).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id
        });
        if (!o) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este pedido não tem Pix a devolver.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.pix_devolvido", "order", o.id);
    });
}
async function refundOrder(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (input.reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do estorno.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const { o, items, name, c } = await loadOrder(tx, ctx, input.orderId);
        if (o.status !== "entregue") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Só pedidos entregues podem ser estornados.");
        if ((o.paymentMethod === "dinheiro" || o.cashPartCents > 0) && o.shiftId) {
            const [sh] = await tx.select({
                status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id, o.shiftId));
            if (sh?.status === "aberto") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O turno deste pedido ainda está aberto. Faça o acerto do entregador antes de estornar.");
        }
        if (o.paymentMethod === "fiado" && o.customerId) {
            // trava o cliente junto com os pagamentos de fiado
            await tx.select({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id, o.customerId)).for("update");
            const owed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$receivables$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["fiadoBalance"])(tx, ctx.tenantId, o.customerId);
            if (owed < o.totalCents) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O cliente já pagou parte deste fiado. Estorne os pagamentos antes de estornar o pedido.");
        }
        if (input.restock) {
            for (const i of items){
                const qty = i.deliveredQuantity ?? i.quantity;
                if (!qty) continue;
                const base = {
                    productId: i.productId,
                    driverId: null,
                    orderId: o.id,
                    reason: `estorno pedido #${o.number}`
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                    ...base,
                    state: "cheio",
                    quantity: qty
                }, name(i.productId));
                // o cliente recebe de volta o vazio que tinha entregado na troca
                if (i.returnsEmpty) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                    ...base,
                    state: "vazio",
                    quantity: -qty
                }, name(i.productId));
            }
        }
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            status: "estornado",
            refundReason: input.reason.trim(),
            refundedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, o.id));
        if (o.paymentMethod !== "fiado") {
            const devolucao = {
                tenantId: ctx.tenantId,
                branchId: o.branchId,
                category: "estorno",
                description: `Devolução do pedido #${o.number}`,
                paidOn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])(),
                orderId: o.id,
                createdBy: ctx.userId
            };
            // pedido pago parte em dinheiro: cada parte volta pela forma em que entrou (o caixa e os relatórios separam)
            const emDinheiro = o.paymentMethod === "dinheiro" ? o.totalCents : o.cashPartCents;
            const resto = o.totalCents - emDinheiro;
            const linhas = [
                ...emDinheiro > 0 ? [
                    {
                        ...devolucao,
                        amountCents: emDinheiro,
                        method: "dinheiro"
                    }
                ] : [],
                ...resto > 0 ? [
                    {
                        ...devolucao,
                        amountCents: resto,
                        method: o.paymentMethod
                    }
                ] : []
            ];
            if (linhas.length) await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).values(linhas);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "pedido.estornar", "order", o.id, input);
    });
}
}),
"[project]/src/domain/receivables.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customerBalance",
    ()=>customerBalance,
    "customerStatement",
    ()=>customerStatement,
    "fiadoBalance",
    ()=>fiadoBalance,
    "listDebtors",
    ()=>listDebtors,
    "paymentSchema",
    ()=>paymentSchema,
    "paymentsByDay",
    ()=>paymentsByDay,
    "receivePayment",
    ()=>receivePayment,
    "voidPayment",
    ()=>voidPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .uuid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .int>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
async function fiadoBalance(exec, tenantId, customerId) {
    const [r] = await exec.execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`
    select
      (select coalesce(sum(total_cents), 0)::int from orders
        where tenant_id = ${tenantId} and customer_id = ${customerId}
          and payment_method = 'fiado' and status = 'entregue') as owed,
      (select coalesce(sum(amount_cents), 0)::int from customer_payments
        where tenant_id = ${tenantId} and customer_id = ${customerId} and voided_at is null) as paid
  `);
    return r.owed - r.paid;
}
const customerBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])((tenantId, customerId)=>fiadoBalance(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"], tenantId, customerId));
const paymentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    customerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid(),
    amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(1, "Informe o valor recebido."),
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "dinheiro",
        "pix",
        "cartao"
    ], {
        message: "Escolha como o cliente pagou."
    }),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(200, "A observação pode ter até 200 letras.")
});
async function receivePayment(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        // trava o cliente: dois pagamentos ao mesmo tempo não passam juntos pela checagem de saldo
        const [c] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].name
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].id, input.customerId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customers"].tenantId, ctx.tenantId))).for("update");
        if (!c) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Cliente não encontrado.");
        const owed = await fiadoBalance(tx, ctx.tenantId, c.id);
        if (owed <= 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`${c.name} não tem fiado em aberto.`);
        if (input.amountCents > owed) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`O valor passa do saldo devedor (R$ ${(owed / 100).toFixed(2).replace(".", ",")}).`);
        const [p] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"]).values({
            ...input,
            tenantId: ctx.tenantId,
            branchId: ctx.branchId,
            receivedBy: ctx.userId
        }).returning();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "fiado.pagamento", "customer", c.id, {
            amountCents: input.amountCents,
            method: input.method,
            before: owed
        });
        return p;
    });
}
async function voidPayment(ctx, paymentId, reason) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do estorno.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [p] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"]).set({
            voidedAt: new Date(),
            voidedBy: ctx.userId,
            voidReason: reason.trim()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].id, paymentId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].voidedAt))).returning();
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Pagamento não encontrado ou já estornado.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "fiado.estorno_pagamento", "customer", p.customerId, {
            paymentId,
            amountCents: p.amountCents,
            reason
        });
    });
}
const listDebtors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(async function listDebtors(tenantId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`
    with fiado as (
      select customer_id, sum(total_cents)::int as total, min(delivered_at) as oldest
      from orders
      where tenant_id = ${tenantId} and payment_method = 'fiado' and status = 'entregue'
      group by customer_id
    ), pago as (
      select customer_id, sum(amount_cents)::int as total, max(created_at) as last_payment
      from customer_payments where tenant_id = ${tenantId} and voided_at is null
      group by customer_id
    )
    select c.id, c.name, c.phone, (f.total - coalesce(p.total, 0))::int as owed, f.oldest, p.last_payment
    from fiado f
    join customers c on c.id = f.customer_id and c.tenant_id = ${tenantId}
    left join pago p on p.customer_id = f.customer_id
    where f.total - coalesce(p.total, 0) > 0
    order by f.oldest
  `);
});
const customerStatement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(async function customerStatement(tenantId, customerId) {
    const bought = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id,
        number: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].number,
        at: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].deliveredAt,
        amount: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].totalCents
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].customerId, customerId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].paymentMethod, "fiado"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status, "entregue")));
    const paid = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].id,
        at: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].createdAt,
        amount: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].amountCents,
        method: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].method,
        note: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].note,
        by: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].name,
        voidedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].voidedAt,
        voidReason: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].voidReason
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].receivedBy)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].customerId, customerId))).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["customerPayments"].createdAt));
    const entries = [
        ...bought.map((b)=>({
                kind: "compra",
                ...b,
                method: null,
                note: "",
                by: null,
                voidedAt: null,
                voidReason: null
            })),
        ...paid.map((p)=>({
                kind: "pagamento",
                number: null,
                ...p
            }))
    ].sort((a, b)=>new Date(b.at ?? 0).getTime() - new Date(a.at ?? 0).getTime());
    const owed = bought.reduce((s, b)=>s + b.amount, 0) - paid.filter((p)=>!p.voidedAt).reduce((s, p)=>s + p.amount, 0);
    return {
        owed,
        entries
    };
});
const paymentsByDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["scoped"])(async function paymentsByDay(tenantId, from, to, branchId) {
    const daFilial = branchId ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`and branch_id = ${branchId}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]``;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`
    select to_char(created_at at time zone 'America/Sao_Paulo', 'YYYY-MM-DD') as day, sum(amount_cents)::int as total
    from customer_payments
    where tenant_id = ${tenantId} and voided_at is null and created_at >= ${from.toISOString()} and created_at < ${to.toISOString()} ${daFilial}
    group by 1 order by 1
  `);
});
}),
"[project]/src/domain/shifts.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCashEntry",
    ()=>addCashEntry,
    "cashEntrySchema",
    ()=>cashEntrySchema,
    "closeShift",
    ()=>closeShift,
    "openShift",
    ()=>openShift,
    "resolutions",
    ()=>resolutions,
    "resolveDifference",
    ()=>resolveDifference,
    "settleTrip",
    ()=>settleTrip,
    "voidCashEntry",
    ()=>voidCashEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .uuid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .int>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cash.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/money.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/period.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$expenses$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/expenses.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// quem confere o dinheiro do entregador: o dono ou o caixa, nunca quem só atende
const CONFERENTE = [
    "dono",
    "caixa"
];
async function handedOver(tx, shiftId) {
    const [r] = await tx.select({
        total: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].amountCents}), 0)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].shiftId, shiftId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].voidedAt)));
    return r.total;
}
async function lockOpenShift(tx, ctx, shiftId) {
    const [shift] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id, shiftId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].tenantId, ctx.tenantId))).for("update");
    // a equipe só confere turnos da própria filial
    if (!shift || ctx.role !== "dono" && shift.branchId !== ctx.branchId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Turno não encontrado.");
    if (shift.status !== "aberto") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Turno já foi fechado.");
    return shift;
}
const shiftOrdersOf = (tx, shiftId)=>tx// cashPartCents junto: a parte em dinheiro de um pedido no Pix ou cartão também é dinheiro do entregador
    .select({
        status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status,
        paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].paymentMethod,
        totalCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].totalCents,
        cashPartCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].cashPartCents
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].shiftId, shiftId));
const cashEntrySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    shiftId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid(),
    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "repasse",
        "saida"
    ]),
    amountCents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$int$3e$__["z"].int().min(1, "Informe o valor."),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(160, "A observação pode ter até 160 letras."),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string()
});
async function addCashEntry(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, ...CONFERENTE);
    if (input.kind === "saida") {
        if (!(input.category in __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$expenses$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenseCategories"]) || input.category === "estorno") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha o tipo do gasto.");
        if (input.note.length < 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Descreva o gasto.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const shift = await lockOpenShift(tx, ctx, input.shiftId);
        const inHand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expectedCash"])(shift.openingCashCents, await shiftOrdersOf(tx, shift.id), await handedOver(tx, shift.id));
        if (input.amountCents > inHand) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Pelo sistema o entregador tem ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["formatBRL"])(inHand)} em dinheiro. Confira as entregas antes de lançar um valor maior.`);
        let expenseId = null;
        if (input.kind === "saida") {
            const [e] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).values({
                tenantId: ctx.tenantId,
                branchId: shift.branchId,
                category: input.category,
                description: input.note,
                amountCents: input.amountCents,
                method: "dinheiro",
                paidOn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])(),
                createdBy: ctx.userId
            }).returning({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id
            });
            expenseId = e.id;
        }
        const [entry] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).values({
            tenantId: ctx.tenantId,
            shiftId: shift.id,
            kind: input.kind,
            amountCents: input.amountCents,
            note: input.note,
            expenseId,
            createdBy: ctx.userId
        }).returning();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, `turno.${input.kind}`, "shift", shift.id, {
            entryId: entry.id,
            amountCents: input.amountCents
        });
        return entry;
    });
}
async function settleTrip(ctx, shiftId, tripId, countedCashCents, notes) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, ...CONFERENTE);
    if (!Number.isInteger(countedCashCents) || countedCashCents < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o valor contado.");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const shift = await lockOpenShift(tx, ctx, shiftId);
        const [feito] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].tripId, tripId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].shiftId, shift.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].voidedAt)));
        if (feito) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Esta volta já foi acertada.");
        const daViagem = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status,
            paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].paymentMethod,
            totalCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].totalCents,
            cashPartCents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].cashPartCents
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].shiftId, shift.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tripId, tripId)));
        if (!daViagem.length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Volta não encontrada.");
        const esperado = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expectedCash"])(0, daViagem);
        const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashDifference"])(esperado, countedCashCents);
        if (diff !== 0 && notes.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`${diff < 0 ? "Faltam" : "Sobram"} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["formatBRL"])(Math.abs(diff))}: explique na observação (ao menos 3 letras).`);
        const inHand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expectedCash"])(shift.openingCashCents, await shiftOrdersOf(tx, shift.id), await handedOver(tx, shift.id));
        if (countedCashCents > inHand) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Pelo sistema o entregador tem ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["formatBRL"])(inHand)} em dinheiro. Confira as entregas antes de lançar um valor maior.`);
        const entregues = daViagem.filter((o)=>o.status === "entregue").length;
        const [entry] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).values({
            tenantId: ctx.tenantId,
            shiftId: shift.id,
            kind: "repasse",
            amountCents: countedCashCents,
            // "1 entrega. Faltou troco": a observação começa com maiúscula depois do ponto
            note: [
                `${entregues} ${entregues === 1 ? "entrega" : "entregas"}`,
                notes.trim().replace(/^./, (c)=>c.toUpperCase())
            ].filter(Boolean).join(". "),
            tripId,
            createdBy: ctx.userId
        }).returning();
        // o que ainda está na rua continua com ele: fica fora desta volta e entra na próxima
        const naRua = daViagem.filter((o)=>o.status === "em_rota").map((o)=>o.id);
        // uma viagem nova só para todos eles
        if (naRua.length) await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"]).set({
            tripId: crypto.randomUUID()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, naRua));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "turno.acerto_volta", "shift", shift.id, {
            tripId,
            esperado,
            countedCashCents,
            diff,
            entryId: entry.id
        });
        return {
            esperado,
            diff
        };
    });
}
async function voidCashEntry(ctx, entryId, reason) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do estorno.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [e] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].id, entryId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].tenantId, ctx.tenantId)));
        if (!e) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Lançamento não encontrado.");
        // trava o turno antes de mexer: o acerto não pode fechar com a conta mudando
        const [open] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id, e.shiftId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status, "aberto"))).for("update");
        if (!open) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("O acerto deste turno já foi fechado. O lançamento não pode mais ser estornado.");
        const voided = {
            voidedAt: new Date(),
            voidedBy: ctx.userId,
            voidReason: reason.trim()
        };
        const [done] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"]).set(voided).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].id, e.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].voidedAt))).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashEntries"].id
        });
        if (!done) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Lançamento já estornado.");
        if (e.expenseId) await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).set(voided).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"].id, e.expenseId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "turno.estornar_lancamento", "shift", e.shiftId, {
            entryId: e.id,
            reason
        });
    });
}
const resolutions = {
    recebido: "Entregador pagou a diferença",
    descontado: "Será descontado do entregador",
    erro_contagem: "Erro de contagem ou de lançamento",
    assumido: "A empresa assume a diferença",
    sobra: "Sobra recolhida ao caixa"
};
async function resolveDifference(ctx, shiftId, resolution, notes) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (!(resolution in resolutions)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha o que foi feito da diferença.");
    if (notes.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Explique em poucas palavras como a diferença foi resolvida.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [s] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).set({
            resolution,
            resolutionNotes: notes.trim(),
            resolvedBy: ctx.userId,
            resolvedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id, shiftId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status, "fechado"), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].differenceCents} <> 0`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].resolvedAt))).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id
        });
        if (!s) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Este acerto não tem diferença pendente.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "turno.resolver_diferenca", "shift", s.id, {
            resolution,
            notes
        });
    });
}
async function openShift(ctx, driverId, openingCashCents) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [driver] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, driverId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].role, "entregador"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].active, true))).for("update"); // dois cliques em "Abrir turno" não abrem dois turnos
        if (!driver) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Entregador não encontrado.");
        // o turno é da filial do entregador; a equipe de uma filial não abre turno na outra
        const branchId = driver.branchId ?? ctx.branchId;
        if (ctx.role !== "dono" && branchId !== ctx.branchId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Entregador de outra filial.");
        const [open] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].driverId, driverId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].status, "aberto")));
        if (open) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`${driver.name} já tem um turno aberto.`);
        const [shift] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).values({
            tenantId: ctx.tenantId,
            branchId,
            driverId,
            openingCashCents,
            openedBy: ctx.userId
        }).returning();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "turno.abrir", "shift", shift.id, {
            driverId,
            openingCashCents
        });
        return shift;
    });
}
async function closeShift(ctx, shiftId, countedCashCents, notes) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, ...CONFERENTE);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const shift = await lockOpenShift(tx, ctx, shiftId);
        const c = {
            ...ctx,
            branchId: shift.branchId
        };
        const shiftOrders = await shiftOrdersOf(tx, shift.id);
        if (shiftOrders.some((o)=>o.status === "em_rota")) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Há pedidos em rota neste turno. Conclua ou cancele antes do acerto.");
        const expected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expectedCash"])(shift.openingCashCents, shiftOrders, await handedOver(tx, shift.id));
        const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cash$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["cashDifference"])(expected, countedCashCents);
        if (diff !== 0 && notes.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Há diferença no caixa: explique na observação (ao menos 3 letras).");
        // o que ficou com o entregador volta pra loja
        const held = await tx.select({
            productId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId,
            state: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].state,
            qty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].quantity})::int`
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].branchId, shift.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].driverId, shift.driverId))).groupBy(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].state);
        for (const h of held.filter((h)=>h.qty > 0)){
            const base = {
                productId: h.productId,
                state: h.state,
                shiftId: shift.id,
                reason: "devolução no acerto"
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                driverId: shift.driverId,
                quantity: -h.qty
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["move"])(tx, c, {
                ...base,
                driverId: null,
                quantity: h.qty
            });
        }
        const [closed] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"]).set({
            status: "fechado",
            expectedCashCents: expected,
            countedCashCents,
            differenceCents: diff,
            closingNotes: notes.trim(),
            closedBy: ctx.userId,
            closedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["shifts"].id, shift.id)).returning();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, ctx, "turno.acerto", "shift", shift.id, {
            expected,
            countedCashCents,
            diff,
            returned: held
        });
        return closed;
    });
}
}),
"[project]/src/domain/stock.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adjustStock",
    ()=>adjustStock,
    "audit",
    ()=>audit,
    "balanceOf",
    ()=>balanceOf,
    "disponivelNaLoja",
    ()=>disponivelNaLoja,
    "lockProducts",
    ()=>lockProducts,
    "markDamaged",
    ()=>markDamaged,
    "move",
    ()=>move,
    "receivePurchase",
    ()=>receivePurchase,
    "runInventory",
    ()=>runInventory,
    "saveSupplier",
    ()=>saveSupplier,
    "supplierSchema",
    ()=>supplierSchema,
    "transferirEstoque",
    ()=>transferirEstoque
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .boolean>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$telefone$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/telefone.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$contas$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/contas.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/period.ts [instrumentation] (ecmascript)");
;
;
;
;
;
;
;
;
async function audit(tx, ctx, action, entity, entityId, data) {
    await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"]).values({
        tenantId: ctx.tenantId,
        userId: ctx.userId,
        action,
        entity,
        entityId,
        data
    });
}
async function lockProducts(tx, ctx, productIds) {
    return tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["products"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["products"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["products"].id, productIds))).for("update");
}
async function balanceOf(tx, ctx, productId, state, driverId) {
    const [row] = await tx.select({
        qty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].quantity}), 0)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].branchId, ctx.branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId, productId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].state, state), driverId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].driverId, driverId) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].driverId)));
    return row.qty;
}
async function disponivelNaLoja(tx, tenantId, branchId, productIds) {
    if (!productIds.length) return new Map();
    const naLoja = await tx.select({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId,
        qty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].quantity}), 0)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].branchId, branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId, productIds), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].state, "cheio"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].driverId))).groupBy(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"].productId);
    const seguros = await tx.select({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].productId,
        qty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].quantity}), 0)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].orderId)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].branchId, branchId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orders"].status, [
        "aberto",
        "aguardando_pagamento"
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].productId, productIds))).groupBy(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["orderItems"].productId);
    return new Map(productIds.map((id)=>[
            id,
            (naLoja.find((r)=>r.productId === id)?.qty ?? 0) - (seguros.find((r)=>r.productId === id)?.qty ?? 0)
        ]));
}
async function move(tx, ctx, m, productName = "produto") {
    if (m.quantity === 0) return;
    if (m.quantity < 0) {
        const have = await balanceOf(tx, ctx, m.productId, m.state, m.driverId);
        if (have + m.quantity < 0) {
            const onde = m.driverId ? "com o entregador" : "na loja";
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Estoque insuficiente de ${productName} (${m.state}) ${onde}: há ${have}.`);
        }
    }
    await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["stockMovements"]).values({
        ...m,
        tenantId: ctx.tenantId,
        branchId: ctx.branchId,
        userId: ctx.userId
    });
}
async function receivePurchase(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    if (input.full < 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe a quantidade recebida.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [p] = await lockProducts(tx, ctx, [
            input.productId
        ]);
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto não encontrado.");
        let supplier;
        if (input.supplierId) {
            [supplier] = await tx.select({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id,
                name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].name
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id, input.supplierId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].tenantId, ctx.tenantId)));
            if (!supplier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Fornecedor não encontrado.");
        }
        const detail = [
            supplier?.name,
            input.note
        ].filter(Boolean).join(", ");
        const reason = `compra${detail ? `: ${detail}` : ""}`;
        const base = {
            productId: p.id,
            driverId: null,
            reason,
            supplierId: supplier?.id
        };
        await move(tx, ctx, {
            ...base,
            state: "cheio",
            quantity: input.full
        }, p.name);
        if (p.returnable && input.emptiesReturned > 0) await move(tx, ctx, {
            ...base,
            state: "vazio",
            quantity: -input.emptiesReturned
        }, p.name);
        const descricao = `Compra: ${input.full} x ${p.name}${supplier ? ` (${supplier.name})` : ""}`.slice(0, 160);
        if (input.costCents && (input.costMethod ?? "boleto") === "boleto") {
            // boleto não é dinheiro que saiu hoje: é conta para o vencimento
            if (!input.dueOn) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o vencimento do boleto.");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$contas$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["criarContaTx"])(tx, ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$contas$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["contaSchema"].parse({
                description: descricao,
                category: "fornecedor",
                supplierId: supplier?.id ?? null,
                amountCents: input.costCents,
                dueOn: input.dueOn
            }));
        } else if (input.costCents) {
            await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["expenses"]).values({
                tenantId: ctx.tenantId,
                branchId: ctx.branchId,
                category: "fornecedor",
                description: descricao,
                amountCents: input.costCents,
                method: input.costMethod ?? "pix",
                paidOn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])(),
                createdBy: ctx.userId
            });
        }
        await audit(tx, ctx, "estoque.compra", "product", p.id, input);
    });
}
async function markDamaged(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    if (input.quantity < 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe a quantidade.");
    if (input.note.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Descreva o defeito.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [p] = await lockProducts(tx, ctx, [
            input.productId
        ]);
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto não encontrado.");
        const base = {
            productId: p.id,
            driverId: null,
            reason: `avaria: ${input.note.trim()}`
        };
        await move(tx, ctx, {
            ...base,
            state: input.from,
            quantity: -input.quantity
        }, p.name);
        await move(tx, ctx, {
            ...base,
            state: "avariado",
            quantity: input.quantity
        }, p.name);
        await audit(tx, ctx, "estoque.avaria", "product", p.id, input);
    });
}
async function transferirEstoque(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    const { cheios, vazios } = input;
    if (!Number.isInteger(cheios) || !Number.isInteger(vazios) || cheios < 0 || vazios < 0 || cheios + vazios < 1) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe quantos cheios ou vazios vão.");
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["isUuid"])(input.para) || input.para === ctx.branchId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Escolha a filial que vai receber.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [p] = await lockProducts(tx, ctx, [
            input.productId
        ]);
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto não encontrado.");
        if (vazios && !p.returnable) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`${p.name} não tem vasilhame que volta.`);
        const filiais = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"].id,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"].name,
            active: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"].active
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"].tenantId, ctx.tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"].id, [
            ctx.branchId,
            input.para
        ])));
        const origem = filiais.find((b)=>b.id === ctx.branchId);
        const destino = filiais.find((b)=>b.id === input.para && b.active);
        if (!origem || !destino) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Filial não encontrada.");
        if (cheios) {
            const livres = (await disponivelNaLoja(tx, ctx.tenantId, ctx.branchId, [
                p.id
            ])).get(p.id) ?? 0;
            if (livres < cheios) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Há ${Math.max(livres, 0)} cheios de ${p.name} livres aqui. O resto está em pedidos aguardando.`);
        }
        const nota = input.note.trim() ? `: ${input.note.trim()}` : "";
        const la = {
            ...ctx,
            branchId: destino.id
        };
        for (const [state, q] of [
            [
                "cheio",
                cheios
            ],
            [
                "vazio",
                vazios
            ]
        ]){
            if (!q) continue;
            await move(tx, ctx, {
                productId: p.id,
                state,
                driverId: null,
                quantity: -q,
                reason: `transferência para ${destino.name}${nota}`
            }, p.name);
            await move(tx, la, {
                productId: p.id,
                state,
                driverId: null,
                quantity: q,
                reason: `transferência de ${origem.name}${nota}`
            }, p.name);
        }
        await audit(tx, ctx, "estoque.transferencia", "product", p.id, {
            cheios,
            vazios,
            de: origem.name,
            para: destino.name,
            note: input.note.trim()
        });
    });
}
async function runInventory(ctx, counts, note) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (!counts.length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Nenhuma contagem informada.");
    if (counts.some((c)=>!Number.isInteger(c.counted) || c.counted < 0)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A contagem não pode ser negativa.");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const prods = await lockProducts(tx, ctx, [
            ...new Set(counts.map((c)=>c.productId))
        ]);
        const diffs = [];
        for (const c of counts){
            const p = prods.find((x)=>x.id === c.productId);
            if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto não encontrado.");
            const have = await balanceOf(tx, ctx, p.id, c.state, null);
            if (have === c.counted) continue;
            await move(tx, ctx, {
                productId: p.id,
                state: c.state,
                driverId: null,
                quantity: c.counted - have,
                reason: `inventário${note.trim() ? `: ${note.trim()}` : ""}`
            }, p.name);
            diffs.push({
                product: p.name,
                state: c.state,
                before: have,
                counted: c.counted
            });
        }
        await audit(tx, ctx, "estoque.inventario", "tenant", ctx.tenantId, {
            counted: counts.length,
            diffs,
            note: note.trim()
        });
        return diffs;
    });
}
const supplierSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Nome muito curto.").max(120, "O nome pode ter até 120 letras."),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$telefone$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["telefoneSchema"],
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(300, "A observação pode ter até 300 letras."),
    active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean()
});
async function saveSupplier(ctx, input, id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono", "atendente", "caixa");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        if (id) {
            const [s] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"]).set(input).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].id, id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"].tenantId, ctx.tenantId))).returning();
            if (!s) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Fornecedor não encontrado.");
            await audit(tx, ctx, "fornecedor.editar", "supplier", s.id, input);
            return s;
        }
        const [s] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["suppliers"]).values({
            ...input,
            tenantId: ctx.tenantId
        }).returning();
        // o nome vai junto: se o fornecedor sumir um dia, a auditoria ainda diz qual era
        await audit(tx, ctx, "fornecedor.criar", "supplier", s.id, {
            name: s.name
        });
        return s;
    });
}
async function adjustStock(ctx, input) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assertRole"])(ctx, "dono");
    if (input.counted < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A contagem não pode ser negativa.");
    if (input.reason.trim().length < 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Informe o motivo do ajuste.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantTransaction"])(ctx, async (tx)=>{
        const [p] = await lockProducts(tx, ctx, [
            input.productId
        ]);
        if (!p) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Produto não encontrado.");
        const have = await balanceOf(tx, ctx, p.id, input.state, null);
        const delta = input.counted - have;
        if (delta === 0) return;
        await move(tx, ctx, {
            productId: p.id,
            state: input.state,
            driverId: null,
            quantity: delta,
            reason: `ajuste: ${input.reason}`
        }, p.name);
        await audit(tx, ctx, "estoque.ajuste", "product", p.id, {
            ...input,
            before: have,
            delta
        });
    });
}
}),
"[project]/src/domain/telefone.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "telefoneSchema",
    ()=>telefoneSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mascara$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mascara.ts [instrumentation] (ecmascript)");
;
;
const telefoneSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().max(30, "Telefone muito longo.").refine(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mascara$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["telefoneValido"], "Telefone com DDD, como (11) 91111-1111.").transform(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mascara$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["formatarTelefone"]);
}),
"[project]/src/lib/cash.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cashDifference",
    ()=>cashDifference,
    "cashOf",
    ()=>cashOf,
    "expectedCash",
    ()=>expectedCash,
    "itemsSubtotal",
    ()=>itemsSubtotal,
    "orderTotal",
    ()=>orderTotal,
    "partialDiscount",
    ()=>partialDiscount,
    "paymentSummary",
    ()=>paymentSummary
]);
const cashOf = (o)=>o.paymentMethod === "dinheiro" ? o.totalCents : o.cashPartCents ?? 0;
function expectedCash(openingCashCents, orders, handedOverCents = 0) {
    return orders.filter((o)=>o.status === "entregue").reduce((sum, o)=>sum + cashOf(o), openingCashCents) - handedOverCents;
}
function paymentSummary(orders) {
    const sum = {
        dinheiro: 0,
        pix: 0,
        cartao: 0,
        fiado: 0
    };
    for (const o of orders){
        if (o.status !== "entregue") continue;
        sum.dinheiro += cashOf(o);
        if (o.paymentMethod !== "dinheiro") sum[o.paymentMethod] += o.totalCents - cashOf(o);
    }
    return sum;
}
const cashDifference = (expectedCents, countedCents)=>countedCents - expectedCents;
const itemsSubtotal = (items)=>items.reduce((s, i)=>s + i.quantity * i.unitPriceCents, 0);
const partialDiscount = (discountCents, orderedSubtotal, deliveredSubtotal)=>orderedSubtotal > 0 ? Math.ceil(discountCents * deliveredSubtotal / orderedSubtotal) : 0;
function orderTotal(items, deliveryFeeCents, discountCents = 0) {
    return itemsSubtotal(items) + deliveryFeeCents - discountCents;
}
}),
"[project]/src/lib/ctx.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DomainError",
    ()=>DomainError,
    "assertRole",
    ()=>assertRole,
    "isUuid",
    ()=>isUuid
]);
class DomainError extends Error {
}
function assertRole(ctx, ...roles) {
    if (!roles.includes(ctx.role)) throw new DomainError("Sem permissão para esta ação.");
}
const isUuid = (s)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}),
"[project]/src/lib/legal.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Dados da Solace usados nos termos e na política de privacidade.
// Preencher antes do primeiro cliente e revisar o texto com um advogado.
__turbopack_context__.s([
    "BACKUP_RETENTION_DAYS",
    ()=>BACKUP_RETENTION_DAYS,
    "DELETE_AFTER_DAYS",
    ()=>DELETE_AFTER_DAYS,
    "EXPORT_WINDOW_DAYS",
    ()=>EXPORT_WINDOW_DAYS,
    "TERMS_VERSION",
    ()=>TERMS_VERSION,
    "company",
    ()=>company,
    "termsDate",
    ()=>termsDate
]);
const company = {
    product: "depo",
    name: "Solace",
    legalName: "63.249.697 LEONARDO KENNEDY FERNANDES DE SOUSA",
    cnpj: "63.249.697/0001-59",
    email: "leonardoks2007@gmail.com",
    privacyEmail: "leonardoks2007@gmail.com",
    city: "Belém/PA"
};
const TERMS_VERSION = "2026-11-15";
const termsDate = "15 de novembro de 2026";
const EXPORT_WINDOW_DAYS = 30;
const DELETE_AFTER_DAYS = 90;
const BACKUP_RETENTION_DAYS = 90;
}),
"[project]/src/lib/mascara.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatarDinheiro",
    ()=>formatarDinheiro,
    "formatarTelefone",
    ()=>formatarTelefone,
    "somenteNumeros",
    ()=>somenteNumeros,
    "telefoneValido",
    ()=>telefoneValido
]);
// Máscaras dos campos: as mesmas regras no navegador (formata enquanto digita) e no servidor (valida e guarda
// sempre no mesmo formato). Funções puras, sem nada de tela.
const digitos = (v)=>v.replace(/\D/g, "");
function formatarTelefone(v) {
    let d = digitos(v);
    // com o código do país (+55 11 9..., colado ou digitado com o +): o 55 sai
    if ((d.length > 11 || v.trim().startsWith("+")) && d.startsWith("55")) d = d.slice(2);
    if (d.startsWith("0800")) {
        d = d.slice(0, 11);
        return [
            d.slice(0, 4),
            d.slice(4, 7),
            d.slice(7)
        ].filter(Boolean).join(" ");
    }
    d = d.slice(0, 11);
    if (!d) return "";
    if (d.length <= 2) return `(${d}`;
    const ddd = `(${d.slice(0, 2)}) `;
    const resto = d.slice(2);
    // celular tem 9 dígitos depois do DDD (5 + 4); fixo, 8 (4 + 4)
    const corte = resto.length > 8 ? 5 : 4;
    return resto.length > corte ? `${ddd}${resto.slice(0, corte)}-${resto.slice(corte)}` : `${ddd}${resto}`;
}
function telefoneValido(v) {
    let d = digitos(v);
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    // vazio de verdade vale; texto sem número nenhum ("abc") não
    if (!v.trim()) return true;
    return d.length === 10 || d.length === 11;
}
function formatarDinheiro(v) {
    // o ponto fica como foi digitado: tecla por tecla, "1.2" ainda pode virar "1.250" (milhar) ou "1.25"
    // (centavos de quem usa ponto). Quem decide é o parseBRL, com o valor inteiro
    const s = v.replace(/[^\d.,]/g, "");
    const [inteiro, ...resto] = s.split(",");
    return resto.length ? `${inteiro},${resto.join("").replace(/\./g, "").slice(0, 2)}` : inteiro;
}
const somenteNumeros = (v)=>digitos(v);
}),
"[project]/src/lib/money.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "centsToInput",
    ()=>centsToInput,
    "formatBRL",
    ()=>formatBRL,
    "parseBRL",
    ()=>parseBRL
]);
const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});
const formatBRL = (cents)=>brl.format(cents / 100);
function parseBRL(input) {
    let s = input.replace(/[R$\s]/g, "");
    s = !s.includes(",") && /^-?\d+\.\d{1,2}$/.test(s) ? s : s.replace(/\./g, "").replace(",", ".");
    if (!/^-?\d+(\.\d{1,2})?$/.test(s)) return null;
    return Math.round(Number(s) * 100);
}
const centsToInput = (cents)=>(cents / 100).toFixed(2).replace(".", ",");
}),
"[project]/src/lib/password.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:util [external] (node:util, cjs)");
;
;
const scryptAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scrypt"]);
async function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(16);
    const hash = await scryptAsync(password, salt, 64);
    return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}
async function verifyPassword(password, stored) {
    const [algo, saltHex, hashHex] = stored.split("$");
    if (algo !== "scrypt" || !saltHex || !hashHex) return false;
    const expected = Buffer.from(hashHex, "hex");
    const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(actual, expected);
}
}),
"[project]/src/lib/period.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataISO",
    ()=>dataISO,
    "parsePeriod",
    ()=>parsePeriod,
    "somaDias",
    ()=>somaDias,
    "todayISO",
    ()=>todayISO
]);
// Datas de filtro em horário de Brasília (sem horário de verão desde 2019).
const iso = (d)=>new Date(d.getTime() - 3 * 3600e3).toISOString().slice(0, 10);
const todayISO = ()=>iso(new Date());
const somaDias = (dia, n)=>new Date(Date.parse(dia + "T00:00:00Z") + n * 86400e3).toISOString().slice(0, 10);
function dataISO(v) {
    if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
    const d = new Date(v + "T00:00:00Z");
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
function parsePeriod(sp) {
    const today = iso(new Date());
    let fromStr = dataISO(sp.de) ? sp.de : iso(new Date(Date.now() - 6 * 864e5));
    let toStr = dataISO(sp.ate) ? sp.ate : today;
    // "De" depois do "Até": era um período vazio, com R$ 0,00 e nenhuma linha. A pessoa quis o intervalo entre as duas
    if (fromStr > toStr) [fromStr, toStr] = [
        toStr,
        fromStr
    ];
    const from = new Date(`${fromStr}T00:00:00-03:00`);
    const to = new Date(new Date(`${toStr}T00:00:00-03:00`).getTime() + 864e5); // fim exclusivo
    return {
        fromStr,
        toStr,
        from,
        to
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_18wodoc48aq._.js.map