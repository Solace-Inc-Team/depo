module.exports = [
"[project]/src/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onRequestError",
    ()=>onRequestError,
    "register",
    ()=>register
]);
const onRequestError = async (err, request, context)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { recordError } = await __turbopack_context__.A("[project]/src/domain/monitoring.ts [instrumentation] (ecmascript, async loader)");
    await recordError(err, {
        path: request.path,
        method: request.method,
        kind: context.routeType
    });
};
async function register() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { db, runMigrations } = await __turbopack_context__.A("[project]/src/db/index.ts [instrumentation] (ecmascript, async loader)");
    const { tenants } = await __turbopack_context__.A("[project]/src/db/schema.ts [instrumentation] (ecmascript, async loader)");
    await runMigrations();
    const { company } = await __turbopack_context__.A("[project]/src/lib/legal.ts [instrumentation] (ecmascript, async loader)");
    const missing = Object.entries(company).filter(([, v])=>v.startsWith("["));
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // a demo vem antes do admin: ela só é criada com o banco vazio
    if (process.env.SEED_DEMO === "true") {
        const existing = await db.select({
            id: tenants.id
        }).from(tenants).limit(1);
        if (!existing.length) {
            const { seedDemo } = await __turbopack_context__.A("[project]/src/db/seed.ts [instrumentation] (ecmascript, async loader)");
            await seedDemo();
            console.log("[seed] empresa demo criada (dono@demo.com / demo1234)");
        }
    }
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
        const { ensurePlatformAdmin } = await __turbopack_context__.A("[project]/src/domain/platform.ts [instrumentation] (ecmascript, async loader)");
        if (await ensurePlatformAdmin(ADMIN_EMAIL, ADMIN_PASSWORD)) console.log(`[admin] ${ADMIN_EMAIL} criado`);
    }
}
}),
];

//# sourceMappingURL=src_instrumentation_ts_07j_8w1ivtswj._.js.map