module.exports = [
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
"[project]/src/domain/platform.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE_DEADLINE_DAYS",
    ()=>DELETE_DEADLINE_DAYS,
    "VENDE",
    ()=>VENDE,
    "avisoAtual",
    ()=>avisoAtual,
    "avisoSchema",
    ()=>avisoSchema,
    "cadastrarEmpresa",
    ()=>cadastrarEmpresa,
    "cadastroSchema",
    ()=>cadastroSchema,
    "createTenant",
    ()=>createTenant,
    "darDias",
    ()=>darDias,
    "darDiasSchema",
    ()=>darDiasSchema,
    "deleteTenant",
    ()=>deleteTenant,
    "empresaDoNumeroWhats",
    ()=>empresaDoNumeroWhats,
    "ensurePlatformAdmin",
    ()=>ensurePlatformAdmin,
    "ligarWhatsapp",
    ()=>ligarWhatsapp,
    "listDeletions",
    ()=>listDeletions,
    "listDiasDados",
    ()=>listDiasDados,
    "listTenants",
    ()=>listTenants,
    "newTenantSchema",
    ()=>newTenantSchema,
    "publicarAviso",
    ()=>publicarAviso,
    "recebidoNoMes",
    ()=>recebidoNoMes,
    "resetOwnerAccess",
    ()=>resetOwnerAccess,
    "setTenantActive",
    ()=>setTenantActive,
    "slugFor",
    ()=>slugFor,
    "tirarAviso",
    ()=>tirarAviso,
    "whatsappSchema",
    ()=>whatsappSchema
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$email$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .email>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .uuid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$coerce$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .coerce>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$union$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .union>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$literal$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .literal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z .iso>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ctx.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/password.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/stock.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plano$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plano.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/period.ts [instrumentation] (ecmascript)");
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
// Tudo aqui é da equipe da Solace e atravessa empresas, por isso não recebe Ctx de tenant.
function assertAdmin(admin) {
    if (!admin.platformAdmin) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Sem permissão.");
}
const newTenantSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    company: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Informe o nome da empresa.").max(120),
    ownerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Informe o nome do dono.").max(80),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$email$3e$__["z"].email("E-mail inválido.").transform((e)=>e.toLowerCase()),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(8, "A senha inicial precisa de ao menos 8 caracteres.")
});
const slugFor = (name)=>`${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30)}-${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(3).toString("hex")}`;
async function createTenant(admin, input) {
    assertAdmin(admin);
    return (await novaEmpresa(input, admin.userId)).tenant;
}
const VENDE = [
    "agua",
    "gas",
    "ambos"
];
const PRODUTOS_INICIAIS = {
    agua: [
        {
            name: "Galão de água 20L",
            priceCents: 1400,
            minStock: 10
        }
    ],
    gas: [
        {
            name: "Gás P13",
            priceCents: 11500,
            minStock: 10
        },
        {
            name: "Gás P45",
            priceCents: 42000,
            minStock: 2
        }
    ]
};
const cadastroSchema = newTenantSchema.extend({
    vende: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum(VENDE, "Escolha o que a revenda vende."),
    ownerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Informe seu nome.").max(80, "O nome pode ter até 80 letras."),
    company: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Informe o nome da revenda.").max(120, "O nome pode ter até 120 letras."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(8, "A senha precisa de ao menos 8 caracteres.").max(200)
});
async function cadastrarEmpresa(input, termsVersion) {
    const r = await novaEmpresa(input, null, termsVersion);
    // os produtos mais comuns já entram, com preço sugerido para o dono conferir nos primeiros passos
    const lista = input.vende === "ambos" ? [
        ...PRODUTOS_INICIAIS.agua,
        ...PRODUTOS_INICIAIS.gas
    ] : PRODUTOS_INICIAIS[input.vende];
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["products"]).values(lista.map((p)=>({
            ...p,
            tenantId: r.tenant.id,
            returnable: true,
            precoSugerido: true
        })));
    return r;
}
// empresa com a filial principal e o dono; quem registra na auditoria é o admin da Solace ou o próprio dono
async function novaEmpresa(input, criadoPor, termsVersion) {
    const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["hashPassword"])(input.password);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [taken] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].email, input.email));
        if (taken) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Já existe um usuário com este e-mail.");
        // quem se cadastra sozinho começa no teste grátis; quem a Solace cria fica sem cobrança automática
        const pagoAte = termsVersion ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plano$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["somarDias"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])(), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plano$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["PLANO"].diasGratis) : null;
        const [t] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).values({
            name: input.company,
            slug: slugFor(input.company),
            pagoAte
        }).returning();
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"]).values({
            tenantId: t.id,
            name: "Principal",
            slug: "principal",
            main: true
        });
        const [owner] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).values({
            tenantId: t.id,
            name: input.ownerName,
            email: input.email,
            role: "dono",
            passwordHash,
            ...termsVersion && {
                termsVersion,
                termsAcceptedAt: new Date()
            }
        }).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, {
            tenantId: t.id,
            userId: criadoPor ?? owner.id
        }, criadoPor ? "empresa.criar" : "empresa.cadastro", "tenant", t.id, {
            ownerId: owner.id,
            email: input.email
        });
        return {
            tenant: t,
            ownerId: owner.id
        };
    });
}
async function setTenantActive(admin, tenantId, active) {
    assertAdmin(admin);
    if (tenantId === admin.tenantId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Não dá pra suspender a própria Solace.");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [t] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).set({
            active,
            suspendedAt: active ? null : new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, tenantId)).returning({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id
        });
        if (!t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Empresa não encontrada.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, {
            tenantId,
            userId: admin.userId
        }, active ? "empresa.reativar" : "empresa.suspender", "tenant", tenantId);
    });
}
async function resetOwnerAccess(admin, tenantId, password) {
    assertAdmin(admin);
    if (password.length < 8) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A senha nova precisa de ao menos 8 caracteres.");
    const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["hashPassword"])(password);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [owner] = await tx.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id,
            email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].email
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].tenantId, tenantId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].role, "dono"))).orderBy(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].createdAt).limit(1);
        if (!owner) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Empresa sem dono cadastrado.");
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).set({
            passwordHash,
            totpEnabled: false,
            totpSecret: null
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, owner.id));
        await tx.delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["sessions"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["sessions"].userId, owner.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, {
            tenantId,
            userId: admin.userId
        }, "empresa.redefinir_acesso_dono", "user", owner.id);
        return owner.email;
    });
}
const DELETE_DEADLINE_DAYS = 90;
async function deleteTenant(admin, tenantId, confirmName) {
    assertAdmin(admin);
    if (tenantId === admin.tenantId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A Solace não pode ser excluída.");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [t] = await tx.select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, tenantId)).for("update");
        if (!t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Empresa não encontrada.");
        if (t.active) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Suspenda a empresa antes de excluir.");
        if (confirmName.trim() !== t.name) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Digite o nome exato da empresa para confirmar.");
        const counts = {};
        const del = async (label, q)=>{
            const r = await tx.execute(q);
            counts[label] = r.count;
        };
        // ordem pensada nas chaves estrangeiras: primeiro o que aponta para os outros
        await del("historico", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from audit_log where tenant_id = ${t.id}`);
        await del("pagamentos_fiado", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from customer_payments where tenant_id = ${t.id}`);
        await del("lancamentos_de_caixa", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from cash_entries where tenant_id = ${t.id}`);
        await del("comodato", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from container_loans where tenant_id = ${t.id}`);
        // a conta a pagar aponta para a despesa do pagamento e para o fornecedor: sai antes dos dois
        await del("contas_a_pagar", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from contas_pagar where tenant_id = ${t.id}`);
        await del("despesas", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from expenses where tenant_id = ${t.id}`);
        await del("movimentacoes_estoque", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from stock_movements where tenant_id = ${t.id}`);
        await del("itens_pedido", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from order_items where tenant_id = ${t.id}`);
        await del("pedidos", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from orders where tenant_id = ${t.id}`);
        await del("turnos", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from shifts where tenant_id = ${t.id}`);
        await del("conversas_whatsapp", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from conversas_whatsapp where tenant_id = ${t.id}`);
        await del("enderecos", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from customer_addresses where tenant_id = ${t.id}`);
        await del("clientes", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from customers where tenant_id = ${t.id}`);
        await del("produtos", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from products where tenant_id = ${t.id}`);
        await del("fornecedores", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from suppliers where tenant_id = ${t.id}`);
        await del("sessoes", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from sessions where user_id in (select id from users where tenant_id = ${t.id})`);
        await del("tentativas_login", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from login_attempts
        where key like any (select 'login:' || email || ':%' from users where tenant_id = ${t.id})
           or key in (select p || id::text from users cross join (values ('totp:'), ('senha:')) as k(p) where tenant_id = ${t.id})`);
        await del("usuarios", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from users where tenant_id = ${t.id}`);
        await del("mensalidades", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from assinatura_pagamentos where tenant_id = ${t.id}`);
        await del("filiais", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`delete from branches where tenant_id = ${t.id}`);
        await tx.delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, t.id));
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantDeletions"]).values({
            tenantId: t.id,
            tenantName: t.name,
            deletedBy: admin.email,
            counts
        });
        return counts;
    });
}
async function listDeletions(admin) {
    assertAdmin(admin);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantDeletions"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenantDeletions"].deletedAt)).limit(50);
}
async function listTenants(admin) {
    assertAdmin(admin);
    const since = new Date(Date.now() - 30 * 864e5);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id,
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name,
        active: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].active,
        createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].createdAt,
        suspendedAt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].suspendedAt,
        pagoAte: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].pagoAte,
        // nomes qualificados à mão: dentro da subquery o drizzle solta só "id", que viraria users.id
        owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(select u.email from users u where u.tenant_id = tenants.id and u.role = 'dono' order by u.created_at limit 1)`,
        people: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(select count(*)::int from users u where u.tenant_id = tenants.id and u.active)`,
        orders30: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(select count(*)::int from orders o where o.tenant_id = tenants.id and o.created_at >= ${since.toISOString()})`,
        lastOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`(select max(o.created_at) from orders o where o.tenant_id = tenants.id)`,
        // já pagou alguma mensalidade: sem isso, o "pago até" é o fim do teste grátis
        pagou: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`exists (select 1 from assinatura_pagamentos p where p.tenant_id = tenants.id and p.pago_em is not null)`,
        cartao: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].mpAssinaturaId} is not null`,
        whatsappNumeroId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].whatsappNumeroId
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id} <> ${admin.tenantId}`).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].createdAt));
}
async function ensurePlatformAdmin(email, password) {
    const [exists] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].email, email.toLowerCase()));
    if (exists) return false;
    const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$password$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["hashPassword"])(password);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [t] = await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).values({
            name: "Solace",
            slug: slugFor("Solace")
        }).returning();
        // toda empresa precisa de uma filial: sem ela o login não acha onde a pessoa trabalha
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["branches"]).values({
            tenantId: t.id,
            name: "Principal",
            slug: "principal",
            main: true
        });
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"]).values({
            tenantId: t.id,
            name: "Administrador Solace",
            email: email.toLowerCase(),
            role: "dono",
            passwordHash,
            platformAdmin: true
        });
    });
    return true;
}
async function recebidoNoMes(admin) {
    assertAdmin(admin);
    const inicio = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])().slice(0, 8)}01`;
    const [r] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        cents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assinaturaPagamentos"].valorCents}), 0)::int`,
        n: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`count(*)::int`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assinaturaPagamentos"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gte"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["assinaturaPagamentos"].pagoEm, new Date(`${inicio}T00:00:00-03:00`)));
    return r;
}
const darDiasSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    tenantId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$uuid$3e$__["z"].uuid(),
    dias: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$coerce$3e$__["z"].coerce.number().int("Use um número inteiro de dias.").min(1, "Dê pelo menos 1 dia.").max(90, "No máximo 90 dias de uma vez."),
    motivo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(3, "Escreva o motivo, para o registro.").max(200)
});
async function darDias(admin, input) {
    assertAdmin(admin);
    const hoje = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        const [t] = await tx.select({
            pagoAte: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].pagoAte,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, input.tenantId));
        if (!t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Empresa não encontrada.");
        if (!t.pagoAte) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Essa empresa não tem cobrança: o acesso dela não vence.");
        const ate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plano$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["somarDias"])(t.pagoAte > hoje ? t.pagoAte : hoje, input.dias);
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).set({
            pagoAte: ate
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, input.tenantId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, {
            tenantId: input.tenantId,
            userId: admin.userId
        }, "assinatura.dias", "tenant", input.tenantId, {
            dias: input.dias,
            motivo: input.motivo,
            de: t.pagoAte,
            ate
        });
        return {
            nome: t.name,
            ate
        };
    });
}
const whatsappSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    tenantId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().uuid(),
    // o Phone Number ID da Meta (só dígitos) ou o nome da instância na Evolution (letras minúsculas, números e hífen); vazio desliga
    numeroId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$union$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$literal$3e$__["z"].literal(""),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().regex(/^[a-z0-9-]{3,40}$/, "Use o ID da Meta ou o nome da instância (letras minúsculas, números e hífen).")
    ])
});
async function ligarWhatsapp(admin, input) {
    assertAdmin(admin);
    const numeroId = input.numeroId || null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        if (numeroId) {
            const [outra] = await tx.select({
                name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].whatsappNumeroId, numeroId), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id} <> ${input.tenantId}`));
            if (outra) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"](`Esse número já está ligado a ${outra.name}.`);
        }
        const [t] = await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).set({
            whatsappNumeroId: numeroId
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, input.tenantId)).returning({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name
        });
        if (!t) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("Empresa não encontrada.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$stock$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["audit"])(tx, {
            tenantId: input.tenantId,
            userId: admin.userId
        }, "whatsapp.numero", "tenant", input.tenantId, {
            numeroId
        });
        return t.name;
    });
}
async function empresaDoNumeroWhats(numeroId) {
    const [t] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].whatsappNumeroId, numeroId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].active, true)));
    return t?.id ?? null;
}
async function listDiasDados(admin) {
    assertAdmin(admin);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].id,
        empresa: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].name,
        por: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].name,
        data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].data,
        em: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].createdAt
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"]).innerJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["tenants"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].tenantId)).leftJoin(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["users"].id, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].userId)).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].action, "assinatura.dias")).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["auditLog"].createdAt)).limit(20);
}
async function avisoAtual() {
    const [a] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].id,
        texto: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].texto,
        ate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].ate
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].removidoEm), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["or"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].ate), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["gt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].ate, new Date())))).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].createdAt)).limit(1);
    return a ?? null;
}
const avisoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    texto: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(5, "Escreva o aviso.").max(160, "Até 160 caracteres: a faixa precisa caber numa linha."),
    // vazio: fica até tirar
    ate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$union$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$literal$3e$__["z"].literal(""),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$iso$3e$__["z"].iso.date("Data inválida.")
    ])
});
async function publicarAviso(admin, input) {
    assertAdmin(admin);
    if (input.ate && input.ate < (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$period$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["todayISO"])()) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ctx$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["DomainError"]("A data já passou.");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].transaction(async (tx)=>{
        await tx.update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"]).set({
            removidoEm: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].removidoEm));
        await tx.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"]).values({
            texto: input.texto,
            // até o fim daquele dia, no horário de Brasília
            ate: input.ate ? new Date(Date.parse(`${input.ate}T00:00:00-03:00`) + 864e5) : null,
            criadoPor: admin.userId
        });
    });
}
async function tirarAviso(admin) {
    assertAdmin(admin);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"]).set({
        removidoEm: new Date()
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["isNull"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["avisosPlataforma"].removidoEm));
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
"[project]/src/lib/plano.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// O plano do depo e a conta de quando o acesso vence. Pura, sem banco.
__turbopack_context__.s([
    "PLANO",
    ()=>PLANO,
    "dataBR",
    ()=>dataBR,
    "situacaoAssinatura",
    ()=>situacaoAssinatura,
    "somarDias",
    ()=>somarDias
]);
const PLANO = {
    mensalCents: 12900,
    /** dias de uso grátis depois do cadastro */ diasGratis: 14,
    /** depois de vencer, dias em que o sistema ainda abre (com aviso) antes de pausar */ diasTolerancia: 3
};
const DIA = 864e5;
const somarDias = (iso, n)=>new Date(Date.parse(`${iso}T00:00:00Z`) + n * DIA).toISOString().slice(0, 10);
function situacaoAssinatura(pagoAte, hoje) {
    if (!pagoAte) return null;
    const dias = Math.round((Date.parse(`${pagoAte}T00:00:00Z`) - Date.parse(`${hoje}T00:00:00Z`)) / DIA);
    return {
        pagoAte,
        dias,
        bloqueado: dias < -PLANO.diasTolerancia,
        pausaEm: somarDias(pagoAte, PLANO.diasTolerancia + 1)
    };
}
const dataBR = (iso, curta = false)=>{
    const [a, m, d] = iso.split("-");
    return curta ? `${d}/${m}` : `${d}/${m}/${a}`;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0lso0wsi-o-88._.js.map