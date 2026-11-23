(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/inicio/demo-acerto.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoAcerto",
    ()=>DemoAcerto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/window.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Check.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Connector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Connector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$States$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/States.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/inicio/palco.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const INICIO = {
    contado: "",
    foco: false,
    bateu: false,
    fechado: false
};
const FIM = {
    contado: "165,00",
    foco: false,
    bateu: true,
    fechado: true
};
const CONTA = [
    [
        "Troco inicial",
        3000
    ],
    [
        "Vendas em dinheiro",
        38500
    ],
    [
        "Já repassou",
        -20000
    ],
    [
        "Gastos autorizados",
        -5000
    ]
];
async function script(a) {
    await a.wait(900);
    await a.click({
        at: "contado",
        x: 0.8,
        y: 0.55
    });
    a.put({
        foco: true
    });
    await a.wait(250);
    await a.type("contado", "165,00", {
        interval: 110
    });
    await a.wait(300);
    a.put({
        bateu: true
    });
    await a.wait(1300);
    await a.click({
        at: "fechar",
        x: 0.78,
        y: 0.6
    });
    a.put({
        foco: false
    });
    await a.wait(700);
    a.put({
        fechado: true
    });
    await a.move({
        at: "fechar",
        x: 0.9,
        y: 2.2
    });
    await a.wait(2000);
}
function DemoAcerto({ escuro = false }) {
    _s();
    const dark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"])() || escuro;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
        width: 560,
        height: 300,
        compact: {
            below: 480,
            width: 358,
            height: 310
        },
        initial: INICIO,
        poster: FIM,
        script: script,
        play: "once",
        cursor: {
            at: {
                wide: {
                    x: 520,
                    y: 270
                },
                compact: {
                    x: 330,
                    y: 290
                }
            }
        },
        theme: dark ? "dark" : "light",
        className: "da palco",
        children: (s, rect, layout)=>{
            // a linha liga o "bateu" ao valor que ele confere; no estreito os dois ficam empilhados e ela sai
            const total = rect("total");
            const bateu = rect("bateu");
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Window"], {
                        title: "Acerto de João",
                        className: "da-janela",
                        lights: "grey",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "da-corpo",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                    className: "da-conta",
                                    children: [
                                        CONTA.map(([rotulo, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "da-termo",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        children: rotulo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        children: v < 0 ? `− ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(-v)}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(v)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, rotulo, true, {
                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "da-termo da-termo--total",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    children: "Deve apresentar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    "data-target": "total",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(16500)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "da-form",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Dinheiro contado",
                                            value: s.contado,
                                            placeholder: "0,00",
                                            focused: s.foco,
                                            leading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "da-rs",
                                                children: "R$"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                lineNumber: 82,
                                                columnNumber: 30
                                            }, this),
                                            box: {
                                                "data-target": "contado",
                                                "data-cursor": "ibeam"
                                            },
                                            className: "da-campo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                            lineNumber: 77,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "da-faixa",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$States$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["States"], {
                                                align: "start",
                                                value: s.bateu ? "bateu" : "dica",
                                                states: {
                                                    dica: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "da-dica",
                                                        children: "Conte na frente do entregador"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 31
                                                    }, this),
                                                    bateu: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "da-bateu",
                                                        "data-target": "bateu",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                                                on: s.bateu,
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                                lineNumber: 94,
                                                                columnNumber: 29
                                                            }, this),
                                                            " bateu, sem diferença"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 27
                                                    }, this)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "primary",
                                            size: "large",
                                            className: "da-fechar",
                                            "data-target": "fechar",
                                            icon: s.fechado ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                                on: true,
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                lineNumber: 105,
                                                columnNumber: 39
                                            }, this) : undefined,
                                            children: s.fechado ? "Acerto fechado" : "Fechar acerto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                    lineNumber: 76,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "da-lancamentos",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                            w: 96,
                                            h: 7,
                                            tone: 3
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, this),
                                        [
                                            132,
                                            104,
                                            148
                                        ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "da-lancamento",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        w: w,
                                                        h: 6,
                                                        tone: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        w: 52,
                                                        h: 6,
                                                        tone: 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this),
                    layout === "wide" && total && bateu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Connector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Connector"], {
                        from: {
                            x: bateu.x - 6,
                            y: bateu.y + bateu.height / 2
                        },
                        to: {
                            x: total.x + total.width + 6,
                            y: total.y + total.height / 2
                        },
                        show: s.bateu,
                        className: "da-confere"
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                        lineNumber: 123,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/demo-acerto.tsx",
                lineNumber: 60,
                columnNumber: 11
            }, this);
        }
    }, void 0, false, {
        fileName: "[project]/src/app/inicio/demo-acerto.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(DemoAcerto, "QLjs5uGR4mPHeU14L1D4OQWb7Ag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"]
    ];
});
_c = DemoAcerto;
var _c;
__turbopack_context__.k.register(_c, "DemoAcerto");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/inicio/demo-entrega.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cartao",
    ()=>Cartao,
    "DemoEntrega",
    ()=>DemoEntrega,
    "pedido",
    ()=>pedido
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/window.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Collapse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Collapse.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Count.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$phone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/phone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Roll.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$States$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/States.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.mjs [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.mjs [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/inicio/palco.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/logo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const BASE = [
    {
        cliente: "Marta Ribeiro",
        rua: "Rua XV de Novembro, 300",
        item: "1× Gás P13",
        valor: 11500,
        pix: false
    },
    {
        cliente: "Bar do Zé",
        rua: "Av. Brasil, 1.240",
        item: "3× Galão 20L",
        valor: 4500,
        pix: true
    },
    {
        cliente: "Carlos Mendes",
        rua: "Rua das Acácias, 85",
        item: "1× Gás P13",
        valor: 11500,
        pix: false
    },
    {
        cliente: "Padaria Estrela",
        rua: "Rua Sete de Setembro, 42",
        item: "2× Galão 20L",
        valor: 3000,
        pix: false
    }
];
const pedido = (i)=>{
    const b = BASE[(i % BASE.length + BASE.length) % BASE.length];
    const min = 10 * 60 + 12 + i * 9;
    return {
        ...b,
        numero: 58 + i,
        hora: `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`
    };
};
const INICIO = {
    atual: 0,
    fase: "rota",
    resta: 5,
    vendido: 106300,
    rua: 24800,
    entregues: 15
};
const DEPOIS = {
    ...INICIO,
    fase: "entregue",
    vendido: INICIO.vendido + 11500,
    rua: INICIO.rua + 11500,
    entregues: 16
};
const REPOUSO = {
    x: 930,
    y: 470
};
async function script(a) {
    for(;;){
        await a.wait(1300);
        await a.click({
            at: "entregar",
            x: 0.7,
            y: 0.55
        });
        a.put({
            fase: "confirmando",
            resta: 5
        });
        // a contagem real é de 5s; aqui corre mais rápido para não cansar
        for(let r = 4; r >= 1; r--){
            await a.wait(420);
            a.put({
                resta: r
            });
        }
        await a.wait(500);
        a.put((s)=>{
            const p = pedido(s.atual);
            return {
                fase: "entregue",
                vendido: s.vendido + p.valor,
                rua: s.rua + (p.pix ? 0 : p.valor),
                entregues: s.entregues + 1
            };
        });
        await a.move(REPOUSO);
        await a.wait(2600);
        a.put((s)=>({
                atual: s.atual + 1,
                fase: "rota",
                resta: 5
            }));
        await a.wait(700);
    }
}
const NAV = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
        nome: "Painel"
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
        w: 52
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
        w: 46
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
        w: 60
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        w: 40
    }
];
function Status({ entregue }) {
    return(// a mesma etiqueta do sistema (bolinha e contorno, components/ui StatusBadge): a demonstração mostra o produto como ele é
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "de-status inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: `size-1.5 rounded-full transition-colors duration-300 ${entregue ? "bg-ok" : "pulse-dot bg-accent"}`
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Roll"], {
                variant: "fade",
                children: entregue ? "Entregue" : "Em rota"
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this));
}
_c = Status;
function Cartao({ p, fase, resta, topo }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "de-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "de-card__head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "de-card__cliente",
                        children: p.cliente
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "de-card__num",
                        children: [
                            "#",
                            p.numero
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "de-card__rua",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                        size: 16,
                        strokeWidth: 1.9,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    p.rua
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "de-card__item",
                children: p.item
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "de-card__cobrar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Cobrar ",
                            p.pix ? "no Pix" : "em dinheiro"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(p.valor)
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$States$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["States"], {
                className: "de-card__acao",
                align: "start",
                value: fase === "rota" ? "rota" : "confirmando",
                states: {
                    rota: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        size: "large",
                        className: "de-entregar",
                        "data-target": topo ? "entregar" : undefined,
                        children: p.pix ? "Entreguei, Pix pago" : "Entreguei e recebi"
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, this),
                    confirmando: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "de-confirma",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "de-confirma__linha",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Confirmando em ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Roll"], {
                                                children: String(resta)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                lineNumber: 107,
                                                columnNumber: 34
                                            }, this),
                                            "s…"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "large",
                                        "data-target": topo ? "desfazer" : undefined,
                                        children: "Desfazer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "de-confirma__barra",
                                "data-on": fase !== "rota" || undefined
                            }, void 0, false, {
                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, this)
                }
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c1 = Cartao;
function DemoEntrega({ escuro = false }) {
    _s();
    const dark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"])() || escuro;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
        width: 1040,
        height: 540,
        compact: {
            below: 640,
            width: 358,
            height: 560
        },
        initial: INICIO,
        poster: DEPOIS,
        script: script,
        cursor: {
            at: {
                wide: REPOUSO,
                compact: {
                    x: 330,
                    y: 540
                }
            },
            style: "touch"
        },
        theme: dark ? "dark" : "light",
        className: "de palco",
        children: (s, _rect, layout)=>{
            const linhas = [];
            // da mais nova para a mais antiga; a de cima ainda não chegou e abre quando chega
            for(let i = s.atual + 2; i >= s.atual - 3; i--)linhas.push(i);
            const cartoes = [
                s.atual,
                s.atual + 1,
                s.atual + 2,
                s.atual + 3
            ];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Window"], {
                        className: "de-janela",
                        lights: "grey",
                        sidebar: layout === "wide" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "de-nav",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "de-marca",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                        size: 20,
                                        animar: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                        lineNumber: 148,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                    lineNumber: 147,
                                    columnNumber: 19
                                }, this),
                                NAV.map(({ icon: I, nome, w }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "de-nav__item",
                                        "data-on": i === 0 || undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I, {
                                                size: 16,
                                                strokeWidth: 1.9,
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                lineNumber: 152,
                                                columnNumber: 23
                                            }, this),
                                            nome ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                w: w,
                                                h: 6,
                                                tone: 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                lineNumber: 153,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                        lineNumber: 151,
                                        columnNumber: 21
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                            lineNumber: 146,
                            columnNumber: 37
                        }, this) : undefined,
                        sidebarWidth: 176,
                        title: "Painel do dia",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "de-main",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "de-numeros",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "de-numero",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "de-rotulo",
                                                    children: "Vendido hoje"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Count"], {
                                                    className: "de-valor",
                                                    value: s.vendido,
                                                    format: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"],
                                                    duration: 900
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "de-sub",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Count"], {
                                                            value: s.entregues,
                                                            duration: 600
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 23
                                                        }, this),
                                                        " pedidos entregues"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "de-numero",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "de-rotulo",
                                                    children: "Dinheiro na rua"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Count"], {
                                                    className: "de-valor",
                                                    value: s.rua,
                                                    format: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"],
                                                    duration: 900
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "de-sub",
                                                    children: "com 3 entregadores, a acertar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                            lineNumber: 170,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                    lineNumber: 162,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "de-colunas",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "de-lista",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "de-lista__topo",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Pedidos de hoje"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 21
                                                }, this),
                                                linhas.map((i)=>{
                                                    const p = pedido(i);
                                                    const entregue = i < s.atual || i === s.atual && s.fase === "entregue";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Collapse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapse"], {
                                                        open: i <= s.atual + 1,
                                                        reveal: "drop",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "de-linha",
                                                            "data-foco": i === s.atual || undefined,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "de-linha__num",
                                                                    children: [
                                                                        "#",
                                                                        p.numero
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                    lineNumber: 185,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "de-linha__quem",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: p.cliente
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                            lineNumber: 187,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                            children: [
                                                                                p.hora,
                                                                                ", João"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                            lineNumber: 188,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                    lineNumber: 186,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Status, {
                                                                    entregue: entregue
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "de-linha__valor",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(p.valor)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                    lineNumber: 193,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, p.numero, false, {
                                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                            lineNumber: 177,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "de-lado",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                    w: 120,
                                                    h: 7,
                                                    tone: 3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 21
                                                }, this),
                                                [
                                                    72,
                                                    56,
                                                    80
                                                ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "de-lado__linha",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                w: w,
                                                                h: 6,
                                                                tone: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                w: 44,
                                                                h: 6,
                                                                tone: 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                                lineNumber: 204,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                            lineNumber: 161,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$phone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Phone"], {
                        width: layout === "compact" ? 300 : 292,
                        className: "de-celular",
                        time: "10:41",
                        dark: dark,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "de-app",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "de-app__ola",
                                    children: "Olá, João"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                    lineNumber: 214,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "de-app__titulo",
                                    children: "Suas entregas"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this),
                                cartoes.map((i, k)=>{
                                    const p = pedido(i);
                                    const fica = !(k === 0 && s.fase === "entregue");
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Collapse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapse"], {
                                        open: k === 3 ? s.fase === "entregue" : fica,
                                        reveal: "drop",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cartao, {
                                            p: p,
                                            fase: k === 0 ? s.fase : "rota",
                                            resta: s.resta,
                                            topo: k === 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                            lineNumber: 221,
                                            columnNumber: 23
                                        }, this)
                                    }, p.numero, false, {
                                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                                        lineNumber: 220,
                                        columnNumber: 21
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                            lineNumber: 213,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                        lineNumber: 212,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/demo-entrega.tsx",
                lineNumber: 141,
                columnNumber: 11
            }, this);
        }
    }, void 0, false, {
        fileName: "[project]/src/app/inicio/demo-entrega.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(DemoEntrega, "QLjs5uGR4mPHeU14L1D4OQWb7Ag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"]
    ];
});
_c2 = DemoEntrega;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Status");
__turbopack_context__.k.register(_c1, "Cartao");
__turbopack_context__.k.register(_c2, "DemoEntrega");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/inicio/demo-portal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoPortal",
    ()=>DemoPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Check.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Count.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$phone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/phone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pix.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/inicio/palco.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// o portal abre com o Pix já escolhido (quando a loja tem Pix): a demo também
const INICIO = {
    gas: 0,
    pagamento: 1,
    enviando: false,
    feito: false
};
const FIM = {
    gas: 1,
    pagamento: 1,
    enviando: false,
    feito: true
};
// um código Pix de verdade, montado como o sistema monta; a chave é aleatória
const PIX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pixPayload"])({
    key: "7d9f0335-8dcc-4054-9bf9-0dbd61d36906",
    name: "Fonte Azul",
    city: "Campinas",
    amountCents: 11500,
    txid: "PEDIDO62"
});
const QR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create(PIX, {
    errorCorrectionLevel: "M"
}).modules;
function Qr() {
    const n = QR.size;
    let d = "";
    for(let y = 0; y < n; y++)for(let x = 0; x < n; x++)if (QR.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `-2 -2 ${n + 4} ${n + 4}`,
        className: "dp-qr",
        "aria-hidden": "true",
        shapeRendering: "crispEdges",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -2,
                y: -2,
                width: n + 4,
                height: n + 4,
                fill: "#fff"
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: d,
                fill: "#111"
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/inicio/demo-portal.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = Qr;
async function script(a) {
    await a.wait(900);
    await a.click({
        at: "mais",
        x: 0.5,
        y: 0.5
    });
    a.put({
        gas: 1
    });
    await a.wait(1100);
    await a.click({
        at: "pedir",
        x: 0.62,
        y: 0.55
    });
    a.put({
        enviando: true
    });
    await a.wait(800);
    a.put({
        enviando: false,
        feito: true
    });
    await a.wait(2400);
}
function DemoPortal({ escuro = false }) {
    _s();
    const dark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"])() || escuro;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
        width: 360,
        height: 400,
        initial: INICIO,
        poster: FIM,
        script: script,
        play: "once",
        cursor: {
            at: {
                x: 300,
                y: 340
            },
            style: "touch"
        },
        theme: dark ? "dark" : "light",
        className: "dp palco",
        children: (s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$phone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Phone"], {
                width: 300,
                className: "dp-celular",
                time: "9:41",
                dark: dark,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "dp-app",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dp-sobre",
                            children: "Pedido pelo site"
                        }, void 0, false, {
                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "dp-loja",
                            children: "Fonte Azul"
                        }, void 0, false, {
                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "dp-tela",
                            "data-on": !s.feito || undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dp-card",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "dp-produto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "dp-produto__nome",
                                                children: [
                                                    "Gás P13",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(11500)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "dp-qtd",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "dp-qtd__b",
                                                        children: "−"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Count"], {
                                                        value: s.gas,
                                                        duration: 400,
                                                        className: "dp-qtd__n"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "dp-qtd__b",
                                                        "data-target": "mais",
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                lineNumber: 74,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "dp-titulo",
                                    children: "Pagamento"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dp-opcoes",
                                    children: [
                                        "Dinheiro",
                                        "Pix",
                                        "Cartão"
                                    ].map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dp-opcao",
                                            "data-on": s.pagamento === i || undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "dp-opcao__marca",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this),
                                                l
                                            ]
                                        }, l, true, {
                                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dp-card dp-total",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dp-total__linha",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "dp-total__valor",
                                                    children: [
                                                        "R$",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Count"], {
                                                            value: s.gas * 11500,
                                                            format: (c)=>(c / 100).toLocaleString("pt-BR", {
                                                                    minimumFractionDigits: 2
                                                                }),
                                                            duration: 700,
                                                            className: "dp-total__digitos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "primary",
                                            size: "large",
                                            className: "dp-pedir",
                                            "data-target": "pedir",
                                            children: s.enviando ? "Enviando…" : "Fazer pedido"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "dp-tela dp-feito",
                            "data-on": s.feito || undefined,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dp-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dp-recebido",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Check"], {
                                                on: s.feito,
                                                size: 22
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                                lineNumber: 110,
                                                columnNumber: 19
                                            }, this),
                                            " Pedido #62 recebido"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dp-linha",
                                        children: [
                                            "1× Gás P13, total de ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brl"])(11500)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dp-pix",
                                        children: "Pague com Pix"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Qr, {}, void 0, false, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "large",
                                        className: "dp-copiar",
                                        children: "Copiar código Pix"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/inicio/demo-portal.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/inicio/demo-portal.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/demo-portal.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/inicio/demo-portal.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(DemoPortal, "QLjs5uGR4mPHeU14L1D4OQWb7Ag=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$inicio$2f$palco$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEscuro"]
    ];
});
_c1 = DemoPortal;
var _c, _c1;
__turbopack_context__.k.register(_c, "Qr");
__turbopack_context__.k.register(_c1, "DemoPortal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/inicio/painel-vivo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PainelVivo",
    ()=>PainelVivo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2d$coins$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HandCoins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand-coins.mjs [app-client] (ecmascript) <export default as HandCoins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt-text.mjs [app-client] (ecmascript) <export default as ReceiptText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.mjs [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.mjs [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$live$2d$number$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/live-number.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/money.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const NOVOS = [
    {
        cliente: "Padaria Pão Quente",
        item: "2× Galão 20L",
        cents: 2800
    },
    {
        cliente: "Marta Ribeiro",
        item: "1× Gás P13",
        cents: 11500
    },
    {
        cliente: "Escola Pequeno Saber",
        item: "6× Galão 20L",
        cents: 8400
    },
    {
        cliente: "Bar do Zé",
        item: "1× Gás P13",
        cents: 11500
    },
    {
        cliente: "Cláudia Martins",
        item: "3× Galão 20L",
        cents: 4200
    }
];
const ENTREGADORES = [
    "João",
    "Carlos",
    "Ana"
];
const INICIO = [
    {
        n: 61,
        cliente: "Restaurante Sabor",
        item: "1× Gás P45",
        cents: 42000,
        status: "aberto"
    },
    {
        n: 60,
        cliente: "Diego Alves",
        item: "1× Gás P13",
        cents: 11500,
        status: "em_rota",
        quem: "Carlos"
    },
    {
        n: 59,
        cliente: "Fernanda Costa",
        item: "2× Galão 20L",
        cents: 2800,
        status: "em_rota",
        quem: "João"
    },
    {
        n: 58,
        cliente: "Ana Ribeiro",
        item: "1× Gás P13",
        cents: 11500,
        status: "entregue",
        quem: "Ana"
    },
    {
        n: 57,
        cliente: "Leonardo Kennedy",
        item: "1× Galão 20L",
        cents: 1400,
        status: "entregue",
        quem: "João"
    }
];
const nav = [
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
        "Novo pedido"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
        "Painel"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__["ReceiptText"],
        "Pedidos"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
        "Entregas"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
        "Caixa e acertos"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
        "Estoque"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        "Clientes"
    ],
    [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2d$coins$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HandCoins$3e$__["HandCoins"],
        "Fiado"
    ]
];
function PainelVivo() {
    _s();
    const caixa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pedidos, setPedidos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INICIO);
    // a lista de verdade fica aqui; o estado só redesenha (assim cada passo conta uma vez, mesmo em modo estrito)
    const atual = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(INICIO);
    const [mudou, setMudou] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vendido, setVendido] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cents: 116300,
        entregues: 15
    });
    const [ativo, setAtivo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // só anda na tela, com a aba à vista e sem pedido de menos movimento
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PainelVivo.useEffect": ()=>{
            const el = caixa.current;
            if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            let visto = false;
            const atualiza = {
                "PainelVivo.useEffect.atualiza": ()=>setAtivo(visto && !document.hidden)
            }["PainelVivo.useEffect.atualiza"];
            const io = new IntersectionObserver({
                "PainelVivo.useEffect": ([e])=>{
                    visto = e.isIntersecting;
                    atualiza();
                }
            }["PainelVivo.useEffect"]);
            io.observe(el);
            document.addEventListener("visibilitychange", atualiza);
            return ({
                "PainelVivo.useEffect": ()=>{
                    io.disconnect();
                    document.removeEventListener("visibilitychange", atualiza);
                }
            })["PainelVivo.useEffect"];
        }
    }["PainelVivo.useEffect"], []);
    // três passos que se repetem: entrega, saída para a rua, pedido novo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PainelVivo.useEffect": ()=>{
            if (!ativo) return;
            let passo = 0;
            const id = setInterval({
                "PainelVivo.useEffect.id": ()=>{
                    const fase = passo++ % 3;
                    const lista = atual.current;
                    let nova = lista;
                    if (fase === 0) {
                        const alvo = [
                            ...lista
                        ].reverse().find({
                            "PainelVivo.useEffect.id.alvo": (p)=>p.status === "em_rota"
                        }["PainelVivo.useEffect.id.alvo"]);
                        if (alvo) {
                            nova = lista.map({
                                "PainelVivo.useEffect.id": (p)=>p === alvo ? {
                                        ...p,
                                        status: "entregue"
                                    } : p
                            }["PainelVivo.useEffect.id"]);
                            setMudou(alvo.n);
                            setVendido({
                                "PainelVivo.useEffect.id": (v)=>({
                                        cents: v.cents + alvo.cents,
                                        entregues: v.entregues + 1
                                    })
                            }["PainelVivo.useEffect.id"]);
                        }
                    } else if (fase === 1) {
                        const alvo = [
                            ...lista
                        ].reverse().find({
                            "PainelVivo.useEffect.id.alvo": (p)=>p.status === "aberto"
                        }["PainelVivo.useEffect.id.alvo"]);
                        if (alvo) {
                            nova = lista.map({
                                "PainelVivo.useEffect.id": (p)=>p === alvo ? {
                                        ...p,
                                        status: "em_rota",
                                        quem: ENTREGADORES[alvo.n % 3]
                                    } : p
                            }["PainelVivo.useEffect.id"]);
                            setMudou(alvo.n);
                        }
                    } else {
                        const n = lista[0].n + 1;
                        nova = [
                            {
                                n,
                                ...NOVOS[n % NOVOS.length],
                                status: "aberto"
                            },
                            ...lista
                        ].slice(0, 6);
                        setMudou(n);
                    }
                    atual.current = nova;
                    setPedidos(nova);
                }
            }["PainelVivo.useEffect.id"], 2600);
            return ({
                "PainelVivo.useEffect": ()=>clearInterval(id)
            })["PainelVivo.useEffect"];
        }
    }["PainelVivo.useEffect"], [
        ativo
    ]);
    const conta = (s)=>pedidos.filter((p)=>p.status === s).length;
    const naRua = pedidos.filter((p)=>p.status === "em_rota").reduce((s, p)=>s + p.cents, 0) + 24800;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: caixa,
        className: "pv flex text-left text-[13px]",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden w-52 shrink-0 border-r border-line p-4 md:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 mb-5 truncate text-[12px] text-muted",
                        children: "Distribuidora Fonte Azul"
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-0.5",
                        children: nav.map(([Icone, rotulo])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 ${rotulo === "Painel" ? "bg-subtle font-medium text-fg" : "text-muted"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icone, {
                                        size: 15,
                                        strokeWidth: 1.75
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    rotulo
                                ]
                            }, rotulo, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1 p-5 sm:p-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-muted",
                                        children: "Quinta-feira, 12 de novembro"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[19px] font-semibold tracking-[-0.02em]",
                                        children: "Painel do dia"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-fg px-3 py-1.5 text-[12px] font-medium text-bg",
                                children: "Novo pedido"
                            }, void 0, false, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-surface",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-muted",
                                        children: "Vendido hoje"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$live$2d$number$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveNumber"], {
                                        value: vendido.cents,
                                        cents: true,
                                        className: "mt-1 text-[22px] font-semibold tracking-[-0.03em]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[12px] text-muted",
                                        children: [
                                            vendido.entregues,
                                            " entregues · ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-ok",
                                                children: "+12% que ontem"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                lineNumber: 137,
                                                columnNumber: 47
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-muted",
                                        children: "Dinheiro na rua"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$live$2d$number$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveNumber"], {
                                        value: naRua,
                                        cents: true,
                                        className: "mt-1 text-[22px] font-semibold tracking-[-0.03em]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[12px] text-muted",
                                        children: "com 3 entregadores, a acertar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-muted",
                                        children: "Fila agora"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[22px] font-semibold tracking-[-0.03em]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$live$2d$number$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveNumber"], {
                                                value: conta("aberto")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                lineNumber: 148,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] font-normal text-muted",
                                                children: "aguardando"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                lineNumber: 148,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[12px] text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$live$2d$number$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveNumber"], {
                                                value: conta("em_rota")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                lineNumber: 151,
                                                columnNumber: 15
                                            }, this),
                                            " em rota"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden rounded-xl border border-line bg-surface",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "border-b border-line px-4 py-2.5 font-medium",
                                        children: "Pedidos de hoje"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: pedidos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: `pv-linha flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0 ${mudou === p.n ? "pv-mudou" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "num w-8 text-muted",
                                                        children: [
                                                            "#",
                                                            p.n
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate",
                                                        children: [
                                                            p.cliente,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted",
                                                                children: [
                                                                    " · ",
                                                                    p.item
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden w-14 text-muted sm:block",
                                                        children: p.quem ?? ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "pv-troca w-24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                            status: p.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, p.status, false, {
                                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "num w-20 text-right font-medium",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBRL"])(p.cents)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, p.n, true, {
                                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden rounded-xl border border-line bg-surface lg:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "border-b border-line px-4 py-2.5 font-medium",
                                        children: "Entregadores em turno"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    [
                                        [
                                            "João Pereira",
                                            27000
                                        ],
                                        [
                                            "Carlos Mendes",
                                            13500
                                        ],
                                        [
                                            "Ana Souza",
                                            5000
                                        ]
                                    ].map(([nome, cents])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-line px-4 py-2.5 last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: nome
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "num font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBRL"])(cents)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, nome, true, {
                                            fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/inicio/painel-vivo.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/inicio/painel-vivo.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(PainelVivo, "3Ia/Ocaf3Y/a6lNH5TfKjjrEgho=");
_c = PainelVivo;
var _c;
__turbopack_context__.k.register(_c, "PainelVivo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/inicio/palavra-que-gira.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PalavraQueGira",
    ()=>PalavraQueGira
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$texto$2d$que$2d$troca$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/texto-que-troca.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PalavraQueGira({ palavras, intervalo = 2400, inicio = 2300 }) {
    _s();
    const [i, setI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [larguras, setLarguras] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const medidas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // mede cada palavra na fonte da página; mede de novo quando a fonte termina de carregar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "PalavraQueGira.useLayoutEffect": ()=>{
            const medir = {
                "PalavraQueGira.useLayoutEffect.medir": ()=>setLarguras([
                        ...medidas.current?.children ?? []
                    ].map({
                        "PalavraQueGira.useLayoutEffect.medir": (e)=>e.getBoundingClientRect().width
                    }["PalavraQueGira.useLayoutEffect.medir"]))
            }["PalavraQueGira.useLayoutEffect.medir"];
            medir();
            document.fonts?.ready.then(medir);
            addEventListener("resize", medir);
            return ({
                "PalavraQueGira.useLayoutEffect": ()=>removeEventListener("resize", medir)
            })["PalavraQueGira.useLayoutEffect"];
        }
    }["PalavraQueGira.useLayoutEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PalavraQueGira.useEffect": ()=>{
            if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            let laco;
            const gira = {
                "PalavraQueGira.useEffect.gira": ()=>!document.hidden && setI({
                        "PalavraQueGira.useEffect.gira": (v)=>(v + 1) % palavras.length
                    }["PalavraQueGira.useEffect.gira"])
            }["PalavraQueGira.useEffect.gira"];
            // a primeira troca vem logo que o título assenta (antes esperava mais um intervalo inteiro e passava de 5 s)
            const comeca = setTimeout({
                "PalavraQueGira.useEffect.comeca": ()=>{
                    gira();
                    laco = setInterval(gira, intervalo);
                }
            }["PalavraQueGira.useEffect.comeca"], inicio);
            return ({
                "PalavraQueGira.useEffect": ()=>{
                    clearTimeout(comeca);
                    clearInterval(laco);
                }
            })["PalavraQueGira.useEffect"];
        }
    }["PalavraQueGira.useEffect"], [
        palavras.length,
        intervalo,
        inicio
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "palavra-gira",
        style: larguras[i] ? {
            width: larguras[i]
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: palavras[0]
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$texto$2d$que$2d$troca$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextoQueTroca"], {
                    texto: palavras[i]
                }, void 0, false, {
                    fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: medidas,
                "aria-hidden": "true",
                className: "palavra-gira-medida",
                children: palavras.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: p
                    }, p, false, {
                        fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/inicio/palavra-que-gira.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(PalavraQueGira, "3AzwwHPN6E9cUPB60QD7/xN1fQc=");
_c = PalavraQueGira;
var _c;
__turbopack_context__.k.register(_c, "PalavraQueGira");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/inicio/palco.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brl",
    ()=>brl,
    "useEscuro",
    ()=>useEscuro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tema.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const useEscuro = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temaEscuro"].assinar, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["temaEscuro"].agora, {
        "useEscuro.useSyncExternalStore": ()=>false
    }["useEscuro.useSyncExternalStore"]);
};
_s(useEscuro, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
const brl = (c)=>`R$ ${(c / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2
    })}`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/in-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InView",
    ()=>InView,
    "useInView",
    ()=>useInView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function useInView(ref, enabled = true) {
    _s();
    const [seen, setSeen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!enabled);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInView.useEffect": ()=>{
            const el = ref.current;
            if (seen || !el) return;
            const io = new IntersectionObserver({
                "useInView.useEffect": ([e])=>{
                    if (!e.isIntersecting) return;
                    setSeen(true);
                    io.disconnect();
                }
            }["useInView.useEffect"], {
                threshold: 0.35
            });
            io.observe(el);
            return ({
                "useInView.useEffect": ()=>io.disconnect()
            })["useInView.useEffect"];
        }
    }["useInView.useEffect"], [
        ref,
        seen
    ]);
    return seen;
}
_s(useInView, "CpskbrNc+spKnpnvR2pNyp9CIyo=");
function InView({ children, className }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seen = useInView(ref);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        "data-inview": seen,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/in-view.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s1(InView, "RGm5zGIM/JgMfeQdpRgz8y+bqUY=", false, function() {
    return [
        useInView
    ];
});
_c = InView;
var _c;
__turbopack_context__.k.register(_c, "InView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/live-number.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveNumber",
    ()=>LiveNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$number$2d$flow$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@number-flow/react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$number$2d$flow$2f$react$2f$dist$2f$NumberFlow$2d$client$2d$BGPmzcXX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__N__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@number-flow/react/dist/NumberFlow-client-BGPmzcXX.mjs [app-client] (ecmascript) <export N as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/money.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$in$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/in-view.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const money = {
    style: "currency",
    currency: "BRL"
};
// "once": só a primeira abertura conta do zero (os números que montam juntos nesse primeiro segundo);
// voltar ao painel mostra o valor direto, sem a pausa no zero contradizendo o resto da tela
let firstOpenAt = 0;
const isFirstOpen = ()=>{
    firstOpenAt ||= Date.now();
    return Date.now() - firstOpenAt < 1000;
};
function LiveNumber({ value, cents = false, fromZero = false, className = "" }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const visible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$in$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, fromZero === "visible");
    // começa no zero e depois vai para o valor real: é isso que faz rolar ao abrir. Ao abrir a tela espera a
    // troca de tela terminar, senão as duas animações disputam o mesmo quadro em celular fraco
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LiveNumber.useState": ()=>!fromZero || fromZero === "once" && !isFirstOpen()
    }["LiveNumber.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveNumber.useEffect": ()=>{
            if (ready || !visible) return;
            const id = setTimeout({
                "LiveNumber.useEffect.id": ()=>setReady(true)
            }["LiveNumber.useEffect.id"], fromZero === "visible" ? 0 : 340);
            return ({
                "LiveNumber.useEffect": ()=>clearTimeout(id)
            })["LiveNumber.useEffect"];
        }
    }["LiveNumber.useEffect"], [
        ready,
        visible,
        fromZero
    ]);
    const shown = ready ? value : 0;
    // contando do zero pode demorar; mudança de valor numa tela de trabalho tem que ser rápida, senão passa
    // por números errados no meio do caminho
    const timing = {
        duration: fromZero && !ready ? 700 : 250,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    };
    // o leitor de tela lê dígito por dígito o que está rolando; ele recebe só o valor final, em texto comum
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: `inline-block ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$number$2d$flow$2f$react$2f$dist$2f$NumberFlow$2d$client$2d$BGPmzcXX$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__N__as__default$3e$__["default"], {
                "aria-hidden": "true",
                transformTiming: timing,
                spinTiming: timing,
                value: cents ? shown / 100 : shown,
                locales: "pt-BR",
                format: cents ? money : undefined,
                className: "num"
            }, void 0, false, {
                fileName: "[project]/src/components/live-number.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: cents ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBRL"])(value) : value.toLocaleString("pt-BR")
            }, void 0, false, {
                fileName: "[project]/src/components/live-number.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/live-number.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(LiveNumber, "pM6lov/K4qnd0XpnXQSKU2jOpws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$in$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = LiveNumber;
var _c;
__turbopack_context__.k.register(_c, "LiveNumber");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Logo",
    ()=>Logo,
    "MarcaDaSessao",
    ()=>MarcaDaSessao
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
// Logotipo depo. (kit em GestãoEMP/marca): letras de anel e haste, traço 24 para altura de x 100, e o ponto na cor
// da marca. A animação "Saída" é CSS (globals.css, .depo-logo): o ponto nasce dentro do "o" e sai em arco até o
// fim da palavra. Por ser CSS ela já toca no primeiro quadro, sem esperar o JavaScript e sem piscar o logo pronto.
const W = 24, R = 38, CY = 50, GAP = 14, LARG = 2 * R + W, DOT = 15;
const XS = [
    0,
    1,
    2,
    3
].map(_c = (i)=>i * (LARG + GAP) + LARG / 2);
_c1 = XS;
const X_PONTO = 4 * (LARG + GAP) + DOT; // 471
const LARGURA = X_PONTO + DOT; // 486
const ALTURA = 192; // da ponta do d (-46) ao pé do p (146)
const ARCO = (()=>{
    const p = (a)=>[
            XS[1] + R * Math.cos(a * Math.PI / 180),
            CY + R * Math.sin(a * Math.PI / 180)
        ].map((v)=>+v.toFixed(3));
    const [x1, y1] = p(0), [x2, y2] = p(42);
    return `M${x1} ${y1}A${R} ${R} 0 1 0 ${x2} ${y2}`;
})();
function Logo({ size = 22, animar = "passar" }) {
    // o ponto pula com o mouse em cima; não interrompe a entrada que ainda está tocando
    const pular = (e)=>{
        const s = e.currentTarget;
        if (s.getAnimations({
            subtree: true
        }).some((a)=>a.playState === "running")) return;
        s.removeAttribute("data-tocando");
        void s.getBoundingClientRect();
        s.setAttribute("data-tocando", "pulo");
    };
    // pathLength 1: o traço de cada peça se desenha com o mesmo stroke-dashoffset, qualquer que seja o tamanho
    const traco = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: W,
        pathLength: 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 -46 ${LARGURA} ${ALTURA}`,
        width: Math.round(size * LARGURA / ALTURA),
        height: size,
        role: "img",
        "aria-label": "depo",
        "data-tocando": animar === "entrada" ? "entrada" : undefined,
        onMouseEnter: animar ? pular : undefined,
        className: "depo-logo shrink-0 overflow-visible text-fg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                "data-letra": true,
                style: {
                    "--i": 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: XS[0],
                        cy: CY,
                        r: R,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: XS[0] + R,
                        y1: -46,
                        x2: XS[0] + R,
                        y2: 100,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                "data-letra": true,
                style: {
                    "--i": 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: ARCO,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: XS[1] - R,
                        y1: CY,
                        x2: XS[1] + R,
                        y2: CY,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                "data-letra": true,
                style: {
                    "--i": 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: XS[2],
                        cy: CY,
                        r: R,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: XS[2] - R,
                        y1: 0,
                        x2: XS[2] - R,
                        y2: 146,
                        ...traco
                    }, void 0, false, {
                        fileName: "[project]/src/components/logo.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                "data-ponto": true,
                cx: X_PONTO,
                cy: 100 - DOT,
                r: DOT,
                fill: "var(--marca)"
            }, void 0, false, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                "data-letra": true,
                style: {
                    "--i": 3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: XS[3],
                    cy: CY,
                    r: R,
                    ...traco
                }, void 0, false, {
                    fileName: "[project]/src/components/logo.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/logo.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/logo.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c2 = Logo;
function MarcaDaSessao({ size, animar }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewTransition"], {
        name: "marca",
        share: "marca-viaja",
        default: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {
            size: size,
            animar: animar
        }, void 0, false, {
            fileName: "[project]/src/components/logo.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/logo.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c3 = MarcaDaSessao;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "XS$[0, 1, 2, 3].map");
__turbopack_context__.k.register(_c1, "XS");
__turbopack_context__.k.register(_c2, "Logo");
__turbopack_context__.k.register(_c3, "MarcaDaSessao");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/spotlight-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Spotlight Card, do React Bits (https://reactbits.dev/components/spotlight-card), de David Haz.
// Licença MIT + Commons Clause (https://github.com/DavidHDev/react-bits): uso dentro do produto, sem revender o componente.
// Mudança da casa: as configurações vão para a ref fora da renderização.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const THEMES = {
    dark: {
        surface: '#111111',
        border: 'rgba(255, 255, 255, 0.08)',
        shadow: '0 24px 48px -24px rgba(0, 0, 0, 0.6)',
        light: '#ffffff',
        fill: 1,
        edge: 1
    },
    light: {
        surface: '#ffffff',
        border: 'rgba(24, 24, 27, 0.1)',
        shadow: '0 1px 2px rgba(24, 24, 27, 0.04), 0 18px 40px -20px rgba(24, 24, 27, 0.16)',
        light: '#18181b',
        fill: 0.28,
        edge: 0.7
    }
};
const SHAPES = [
    'circle',
    'beam'
];
const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const clamp = (value, min, max)=>Math.min(max, Math.max(min, value));
const falloff = (color, softness)=>{
    const soft = clamp(softness, 0, 1);
    const core = (1 - soft) ** 1.5 * 0.85;
    const stop = (alpha, at)=>`color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
    const list = [
        stop(1, 0)
    ];
    for(let i = 0; i <= 14; i++){
        const t = core + (1 - core) * i / 14;
        const g = (t - core) / (1 - core);
        const smooth = 1 - g * g * (3 - 2 * g);
        const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
        list.push(stop(smooth + (glow - smooth) * soft, t));
    }
    return list.join(', ');
};
const CARD = 'relative isolate overflow-hidden rounded-3xl p-8 [background-color:var(--spotlight-card-surface)] [box-shadow:var(--spotlight-card-shadow)]';
const SpotlightCard = ({ children, className = '', style, spotlightColor, intensity = 0.15, spotlightSize = 240, softness = 0.7, shape = 'circle', borderGlow = 0.6, proximity = 80, smoothing = 0.3, ambient = false, flare = true, grain = 0, theme = 'dark', ...rest })=>{
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const grainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const edgeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wakeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const palette = THEMES[theme] ?? THEMES.dark;
    const color = spotlightColor ?? palette.light;
    const form = SHAPES.includes(shape) ? shape : 'circle';
    const settings = {
        shape: form,
        fill: falloff(color, softness),
        edge: falloff(color, 1),
        size: Math.max(20, spotlightSize),
        intensity: clamp(intensity, 0, 1) * palette.fill,
        borderGlow: clamp(borderGlow, 0, 1) * palette.edge,
        proximity: Math.max(0, proximity),
        smoothing: clamp(smoothing, 0, 1),
        ambient,
        flare,
        grain: clamp(grain, 0, 1)
    };
    const settingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(settings);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SpotlightCard.useLayoutEffect": ()=>{
            settingsRef.current = settings;
            wakeRef.current?.();
        }
    }["SpotlightCard.useLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpotlightCard.useEffect": ()=>{
            const root = rootRef.current;
            const light = lightRef.current;
            const noise = grainRef.current;
            const edge = edgeRef.current;
            if (!root || !light || !noise || !edge) return undefined;
            const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
            const state = {
                x: 0,
                y: 0,
                presence: 0,
                flare: 0,
                time: Math.random() * 60,
                pressed: false,
                visible: true
            };
            const pointer = {
                x: 0,
                y: 0,
                active: false
            };
            const drawn = {
                light: '',
                edge: '',
                noise: ''
            };
            let focus = null;
            let raf = 0;
            let last = 0;
            let alive = true;
            const gradient = {
                "SpotlightCard.useEffect.gradient": (s, size, x, y, stops)=>{
                    if (s.shape === 'beam') {
                        const reach = Math.max(size * 0.6, y + size * 0.55);
                        return `radial-gradient(${(size * 0.55).toFixed(1)}px ${reach.toFixed(1)}px at ${x.toFixed(1)}px 0px, ${stops})`;
                    }
                    return `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;
                }
            }["SpotlightCard.useEffect.gradient"];
            const paint = {
                "SpotlightCard.useEffect.paint": (s)=>{
                    const size = s.size * (1 + 0.2 * state.flare);
                    const boost = 1 + 0.7 * state.flare;
                    const fill = gradient(s, size, state.x, state.y, s.fill);
                    const rim = gradient(s, size * 0.6, state.x, s.shape === 'beam' ? 0 : state.y, s.edge);
                    if (fill !== drawn.light) {
                        drawn.light = fill;
                        light.style.background = fill;
                    }
                    if (rim !== drawn.edge) {
                        drawn.edge = rim;
                        edge.style.background = rim;
                    }
                    light.style.opacity = String(Math.min(1, state.presence * s.intensity * boost));
                    edge.style.opacity = String(Math.min(1, state.presence * s.borderGlow * boost));
                    const grainy = s.grain > 0 ? gradient(s, size, state.x, state.y, '#000 0%, transparent 100%') : 'none';
                    if (grainy !== drawn.noise) {
                        drawn.noise = grainy;
                        noise.style.webkitMaskImage = grainy;
                        noise.style.maskImage = grainy;
                    }
                    noise.style.opacity = String(state.presence * s.grain);
                }
            }["SpotlightCard.useEffect.paint"];
            const tick = {
                "SpotlightCard.useEffect.tick": (now)=>{
                    raf = 0;
                    if (!alive) return;
                    const s = settingsRef.current;
                    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
                    last = now;
                    const rect = root.getBoundingClientRect();
                    let tx = state.x;
                    let ty = state.y;
                    let target = 0;
                    if (focus && root.contains(focus)) {
                        const box = focus.getBoundingClientRect();
                        tx = box.left + box.width / 2 - rect.left;
                        ty = box.top + box.height / 2 - rect.top;
                        target = 1;
                    } else if (pointer.active) {
                        tx = pointer.x - rect.left;
                        ty = pointer.y - rect.top;
                        const gap = Math.hypot(Math.max(0, -tx, tx - rect.width), Math.max(0, -ty, ty - rect.height));
                        if (gap === 0) target = 1;
                        else if (s.proximity > 0) target = Math.max(0, 1 - gap / s.proximity) ** 2;
                    }
                    if (target < 0.6 && s.ambient && state.visible) {
                        if (!reduce) state.time += dt;
                        const drift = 0.6 - target;
                        tx += (rect.width * (0.5 + 0.34 * Math.sin(state.time * 0.43)) - tx) * (drift / 0.6);
                        ty += (rect.height * (0.5 + 0.3 * Math.sin(state.time * 0.61 + 1.3)) - ty) * (drift / 0.6);
                        target = 0.6;
                    }
                    if (state.presence < 0.02 && target > 0 && !s.ambient) {
                        state.x = tx;
                        state.y = ty;
                    }
                    const follow = reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.015 + s.smoothing * 0.22));
                    state.x += (tx - state.x) * follow;
                    state.y += (ty - state.y) * follow;
                    const fade = reduce ? 1 : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32));
                    state.presence += (target - state.presence) * fade;
                    if (Math.abs(target - state.presence) < 0.002) state.presence = target;
                    const press = state.pressed && s.flare && !reduce ? 1 : 0;
                    state.flare += (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)));
                    if (Math.abs(press - state.flare) < 0.002) state.flare = press;
                    paint(s);
                    const moving = Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1;
                    const settled = !moving && state.presence === target && state.flare === press;
                    if (!settled || s.ambient && state.visible && !reduce) raf = requestAnimationFrame(tick);
                }
            }["SpotlightCard.useEffect.tick"];
            const wake = {
                "SpotlightCard.useEffect.wake": ()=>{
                    if (raf || !alive) return;
                    last = performance.now();
                    raf = requestAnimationFrame(tick);
                }
            }["SpotlightCard.useEffect.wake"];
            wakeRef.current = wake;
            const onMove = {
                "SpotlightCard.useEffect.onMove": (event)=>{
                    pointer.x = event.clientX;
                    pointer.y = event.clientY;
                    pointer.active = true;
                    if (state.presence > 0 || settingsRef.current.proximity > 0 || root.contains(event.target)) wake();
                }
            }["SpotlightCard.useEffect.onMove"];
            const onOut = {
                "SpotlightCard.useEffect.onOut": (event)=>{
                    if (event.relatedTarget) return;
                    pointer.active = false;
                    wake();
                }
            }["SpotlightCard.useEffect.onOut"];
            const onDown = {
                "SpotlightCard.useEffect.onDown": (event)=>{
                    pointer.x = event.clientX;
                    pointer.y = event.clientY;
                    pointer.active = true;
                    state.pressed = true;
                    wake();
                }
            }["SpotlightCard.useEffect.onDown"];
            const onUp = {
                "SpotlightCard.useEffect.onUp": (event)=>{
                    if (event.pointerType !== 'mouse') pointer.active = false;
                    if (!state.pressed && event.pointerType === 'mouse') return;
                    state.pressed = false;
                    wake();
                }
            }["SpotlightCard.useEffect.onUp"];
            const onFocusIn = {
                "SpotlightCard.useEffect.onFocusIn": (event)=>{
                    if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
                    focus = event.target;
                    wake();
                }
            }["SpotlightCard.useEffect.onFocusIn"];
            const onFocusOut = {
                "SpotlightCard.useEffect.onFocusOut": (event)=>{
                    if (root.contains(event.relatedTarget)) return;
                    focus = null;
                    wake();
                }
            }["SpotlightCard.useEffect.onFocusOut"];
            const onScroll = {
                "SpotlightCard.useEffect.onScroll": ()=>{
                    if (pointer.active || state.presence > 0) wake();
                }
            }["SpotlightCard.useEffect.onScroll"];
            const observer = new IntersectionObserver({
                "SpotlightCard.useEffect": (entries)=>{
                    state.visible = entries.some({
                        "SpotlightCard.useEffect": (entry)=>entry.isIntersecting
                    }["SpotlightCard.useEffect"]);
                    if (state.visible) wake();
                }
            }["SpotlightCard.useEffect"]);
            observer.observe(root);
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onUp);
            window.addEventListener('scroll', onScroll, {
                capture: true,
                passive: true
            });
            document.addEventListener('pointerout', onOut);
            root.addEventListener('pointerdown', onDown);
            root.addEventListener('focusin', onFocusIn);
            root.addEventListener('focusout', onFocusOut);
            wake();
            return ({
                "SpotlightCard.useEffect": ()=>{
                    alive = false;
                    cancelAnimationFrame(raf);
                    observer.disconnect();
                    window.removeEventListener('pointermove', onMove);
                    window.removeEventListener('pointerup', onUp);
                    window.removeEventListener('pointercancel', onUp);
                    window.removeEventListener('scroll', onScroll, {
                        capture: true
                    });
                    document.removeEventListener('pointerout', onOut);
                    root.removeEventListener('pointerdown', onDown);
                    root.removeEventListener('focusin', onFocusIn);
                    root.removeEventListener('focusout', onFocusOut);
                    wakeRef.current = null;
                }
            })["SpotlightCard.useEffect"];
        }
    }["SpotlightCard.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: `${CARD}${className ? ` ${className}` : ''}`,
        style: {
            '--spotlight-card-surface': palette.surface,
            '--spotlight-card-border': palette.border,
            '--spotlight-card-shadow': palette.shadow,
            ...style
        },
        ...rest,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: lightRef,
                className: "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/spotlight-card.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: grainRef,
                className: "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[length:160px_160px] opacity-0 mix-blend-overlay",
                style: {
                    backgroundImage: NOISE
                },
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/spotlight-card.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px [background:var(--spotlight-card-border)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/spotlight-card.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: edgeRef,
                className: "pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px opacity-0 [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/spotlight-card.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/spotlight-card.tsx",
        lineNumber: 305,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SpotlightCard, "P3nd7Fz2nw3T+69lD5+b3El2xY4=");
_c = SpotlightCard;
const __TURBOPACK__default__export__ = SpotlightCard;
var _c;
__turbopack_context__.k.register(_c, "SpotlightCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/status-sistema.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusSistema",
    ()=>StatusSistema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const texto = {
    conferindo: "Conferindo o sistema",
    ok: "Sistema funcionando",
    fora: "Sistema com instabilidade agora"
};
function StatusSistema() {
    _s();
    const [estado, setEstado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("conferindo");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusSistema.useEffect": ()=>{
            const parar = new AbortController();
            fetch("/api/health", {
                cache: "no-store",
                signal: parar.signal
            }).then({
                "StatusSistema.useEffect": (r)=>setEstado(r.ok ? "ok" : "fora")
            }["StatusSistema.useEffect"]).catch({
                "StatusSistema.useEffect": ()=>{
                    if (!parar.signal.aborted) setEstado("fora");
                }
            }["StatusSistema.useEffect"]);
            return ({
                "StatusSistema.useEffect": ()=>parar.abort()
            })["StatusSistema.useEffect"];
        }
    }["StatusSistema.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        role: "status",
        className: "inline-flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: `size-2 rounded-full transition-colors duration-500 ${estado === "ok" ? "status-vivo bg-ok" : estado === "fora" ? "bg-warn" : "bg-line"}`
            }, void 0, false, {
                fileName: "[project]/src/components/status-sistema.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            texto[estado]
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/status-sistema.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(StatusSistema, "KSMkmmn+3zIxFX8Gjl3uasYhrFY=");
_c = StatusSistema;
var _c;
__turbopack_context__.k.register(_c, "StatusSistema");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/texto-que-troca.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextoQueTroca",
    ()=>TextoQueTroca
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TextoQueTroca({ texto, brilho = false, className = "" }) {
    _s();
    const [mostrado, setMostrado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(texto);
    const [fase, setFase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const atual = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(texto);
    // só a troca de texto pede animação; os passos não cancelam uns aos outros (a sequência é uma só)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextoQueTroca.useEffect": ()=>{
            if (texto === atual.current) return;
            atual.current = texto;
            let quadro = 0;
            const timers = [
                setTimeout({
                    "TextoQueTroca.useEffect": ()=>setFase("saindo")
                }["TextoQueTroca.useEffect"], 0),
                setTimeout({
                    "TextoQueTroca.useEffect": ()=>{
                        setMostrado(texto);
                        setFase("entrando");
                        // um quadro desenhado na posição de partida, depois a transição leva ao lugar. Por quadro e não por
                        // tempo: com 30 ms, em aparelho lento os dois estados caíam no mesmo quadro e o texto aparecia seco
                        quadro = requestAnimationFrame({
                            "TextoQueTroca.useEffect": ()=>quadro = requestAnimationFrame({
                                    "TextoQueTroca.useEffect": ()=>setFase(undefined)
                                }["TextoQueTroca.useEffect"])
                        }["TextoQueTroca.useEffect"]);
                    }
                }["TextoQueTroca.useEffect"], 150)
            ];
            return ({
                "TextoQueTroca.useEffect": ()=>{
                    timers.forEach(clearTimeout);
                    cancelAnimationFrame(quadro);
                }
            })["TextoQueTroca.useEffect"];
        }
    }["TextoQueTroca.useEffect"], [
        texto
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `troca-texto ${brilho ? "brilho" : ""} ${className}`,
        "data-fase": fase,
        "data-text": mostrado,
        children: mostrado
    }, void 0, false, {
        fileName: "[project]/src/components/texto-que-troca.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(TextoQueTroca, "aJpaivjX9dKqq7im6Ya9s/PTEMg=");
_c = TextoQueTroca;
var _c;
__turbopack_context__.k.register(_c, "TextoQueTroca");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Difference",
    ()=>Difference,
    "Empty",
    ()=>Empty,
    "Money",
    ()=>Money,
    "PageHeader",
    ()=>PageHeader,
    "SiteBadge",
    ()=>SiteBadge,
    "StatusBadge",
    ()=>StatusBadge,
    "fmtDateTime",
    ()=>fmtDateTime,
    "fmtQuando",
    ()=>fmtQuando,
    "fmtTime",
    ()=>fmtTime,
    "paymentLabel",
    ()=>paymentLabel,
    "roleLabel",
    ()=>roleLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/money.ts [app-client] (ecmascript)");
;
;
const statusStyle = {
    aguardando_pagamento: [
        "Aguardando Pix",
        "bg-muted"
    ],
    aberto: [
        "Aguardando",
        "bg-warn"
    ],
    em_rota: [
        "Em rota",
        "bg-accent"
    ],
    entregue: [
        "Entregue",
        "bg-ok"
    ],
    cancelado: [
        "Cancelado",
        "bg-muted/50"
    ],
    estornado: [
        "Estornado",
        "bg-danger"
    ]
};
function StatusBadge({ status }) {
    const [label, dot] = statusStyle[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: `size-1.5 rounded-full ${dot} ${status === "aberto" || status === "em_rota" || status === "aguardando_pagamento" ? "pulse-dot" : ""}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: status === "cancelado" || status === "estornado" ? "text-muted" : "",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
const paymentLabel = {
    dinheiro: "Dinheiro",
    pix: "Pix",
    cartao: "Cartão",
    fiado: "Fiado"
};
const roleLabel = {
    dono: "Dono",
    atendente: "Atendente",
    caixa: "Caixa",
    entregador: "Entregador"
};
function Money({ cents, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `num ${className}`,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBRL"])(cents)
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
_c1 = Money;
function Difference({ cents, className = "" }) {
    const color = cents < 0 ? "text-danger" : cents > 0 ? "text-ok" : "text-muted";
    const label = cents < 0 ? "falta " : cents > 0 ? "sobra " : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `num font-semibold ${color} ${className}`,
        children: cents === 0 ? "sem diferença" : `${label}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$money$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBRL"])(Math.abs(cents))}`
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = Difference;
const SiteBadge = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ml-2 rounded bg-accent-soft px-1.5 py-0.5 text-xs font-semibold text-accent",
        children: "Site"
    }, void 0, false, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 41,
        columnNumber: 32
    }, ("TURBOPACK compile-time value", void 0));
_c3 = SiteBadge;
function PageHeader({ title, description, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 flex flex-wrap items-start justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "h1",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 max-w-2xl text-muted",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui.tsx",
                        lineNumber: 48,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "acoes-topo flex flex-wrap gap-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 50,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c4 = PageHeader;
function Empty({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-6 py-12 text-center text-muted",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 40 48",
                className: "ink mx-auto mb-3 h-12 w-10 opacity-80",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        pathLength: 1,
                        d: "M15 4 H25 V9 H15 Z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        pathLength: 1,
                        d: "M17 13 C9 14 6 17 6 21 V40 C6 43 8 44 11 44 H29 C32 44 34 43 34 40 V21 C34 17 31 14 23 13 V9 M17 9 V13"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        pathLength: 1,
                        d: "M10 39 H30",
                        className: "tracejado"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c5 = Empty;
/** Cabeçalho interno de painel: título à esquerda, ação ou link à direita. */ const dt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo"
});
const tm = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
    timeZone: "America/Sao_Paulo"
});
const fmtDateTime = (d)=>d ? dt.format(d) : "-";
const fmtTime = (d)=>d ? tm.format(d) : "-";
const diaSP = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo"
});
const fmtQuando = (d)=>{
    if (!d) return "-";
    const dia = diaSP.format(d);
    if (dia === diaSP.format(new Date())) return `hoje, ${tm.format(d)}`;
    if (dia === diaSP.format(new Date(Date.now() - 864e5))) return `ontem, ${tm.format(d)}`;
    return dt.format(d);
};
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "Money");
__turbopack_context__.k.register(_c2, "Difference");
__turbopack_context__.k.register(_c3, "SiteBadge");
__turbopack_context__.k.register(_c4, "PageHeader");
__turbopack_context__.k.register(_c5, "Empty");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/pix.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pix "copia e cola" (BR Code do Banco Central) gerado aqui mesmo, sem provedor:
// o cliente paga direto na chave da empresa e o pedido vai identificado no campo txid.
/** CRC16-CCITT (polinômio 0x1021, início 0xFFFF), exigido no fim do BR Code. */ __turbopack_context__.s([
    "crc16",
    ()=>crc16,
    "pixPayload",
    ()=>pixPayload
]);
function crc16(text) {
    let crc = 0xffff;
    for (const byte of new TextEncoder().encode(text)){
        crc ^= byte << 8;
        for(let i = 0; i < 8; i++)crc = crc & 0x8000 ? (crc << 1 ^ 0x1021) & 0xffff : crc << 1 & 0xffff;
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
}
const field = (id, value)=>`${id}${String(value.length).padStart(2, "0")}${value}`;
// nome e cidade vão sem acento e com tamanho limitado, como pede o padrão
const plain = (s, max)=>s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 .-]/g, "").trim().slice(0, max).toUpperCase();
function pixPayload(p) {
    const body = field("00", "01") + field("26", field("00", "br.gov.bcb.pix") + field("01", p.key.trim())) + field("52", "0000") + field("53", "986") + field("54", (p.amountCents / 100).toFixed(2)) + field("58", "BR") + field("59", plain(p.name, 25) || "RECEBEDOR") + field("60", plain(p.city, 15) || "BRASIL") + field("62", field("05", p.txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***")) + "6304";
    return body + crc16(body);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tema.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tema claro, escuro ou automático (segue o aparelho). A escolha fica no próprio aparelho
// (localStorage) e vira o atributo data-tema no <html>, que é o que o CSS lê.
// Sem escolha guardada, o sistema abre escuro: é a identidade da página inicial e do login,
// que são sempre escuros; o claro e o automático ficam a um toque no botão de tema.
__turbopack_context__.s([
    "aplicar",
    ()=>aplicar,
    "lerEscolha",
    ()=>lerEscolha,
    "scriptTema",
    ()=>scriptTema,
    "temaEscuro",
    ()=>temaEscuro
]);
const CHAVE = "tema";
const scriptTema = `(function(){try{var m=matchMedia("(prefers-color-scheme: dark)");function a(){var t=localStorage.getItem("${CHAVE}");document.documentElement.dataset.tema=t!=="claro"&&(t!=="auto"||m.matches)?"escuro":"claro"}a();m.addEventListener("change",a);window.addEventListener("storage",a)}catch(e){document.documentElement.dataset.tema="escuro"}})()`;
function lerEscolha() {
    try {
        const t = localStorage.getItem(CHAVE);
        return t === "claro" || t === "auto" ? t : "escuro";
    } catch  {
        return "escuro";
    }
}
function aplicar(escolha, origem) {
    try {
        // o automático também fica guardado: sem nada guardado, vale o escuro padrão
        localStorage.setItem(CHAVE, escolha);
    } catch  {
    // aparelho sem armazenamento: vale só nesta página
    }
    const html = document.documentElement;
    const novo = escolha === "escuro" || escolha === "auto" && matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
    const trocar = ()=>{
        html.dataset.tema = novo;
        // de claro para automático num aparelho claro o atributo não muda: o evento avisa mesmo assim
        window.dispatchEvent(new Event("tema"));
    };
    const animar = origem && novo !== html.dataset.tema && "startViewTransition" in document && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animar) return trocar();
    // o raio vai até o canto mais distante do botão, para o círculo cobrir a tela toda
    const raio = Math.hypot(Math.max(origem.x, innerWidth - origem.x), Math.max(origem.y, innerHeight - origem.y));
    html.style.setProperty("--tema-x", `${origem.x}px`);
    html.style.setProperty("--tema-y", `${origem.y}px`);
    html.style.setProperty("--tema-r", `${raio}px`);
    // janela aberta: o fundo escurecido já entrou. Sem isto o Safari refazia a entrada dele no meio da troca
    // (o topo ficava nítido e depois escurecia de novo); vale até a janela fechar
    document.querySelectorAll("dialog[open]").forEach((d)=>{
        d.dataset.assentou = "";
        d.addEventListener("close", ()=>delete d.dataset.assentou, {
            once: true
        });
    });
    html.dataset.trocandoTema = "";
    document.startViewTransition(trocar).finished.finally(()=>delete html.dataset.trocandoTema);
}
const temaEscuro = {
    assinar (fn) {
        const obs = new MutationObserver(fn);
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "data-tema"
            ]
        });
        window.addEventListener("tema", fn);
        return ()=>{
            obs.disconnect();
            window.removeEventListener("tema", fn);
        };
    },
    agora: ()=>document.documentElement.dataset.tema === "escuro"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/act.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stopped",
    ()=>Stopped,
    "checkSeam",
    ()=>checkSeam,
    "createAct",
    ()=>createAct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$keys$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/keys.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/measure.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ease$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/ease.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/util.ts [app-client] (ecmascript)");
;
;
;
;
;
// The touch dot lingers a beat after a lift, then goes
const fingerGone = (el)=>{
    if (!el) return;
    window.setTimeout(()=>el.removeAttribute('data-touching'), 240);
};
class Stopped extends Error {
}
function createAct(signal, env) {
    const { rootRef, cursorRef, pos, hovered, kindRef, keysRef, dragging, autoUsed, autoRef, scaleRef, speed, layout, cursor, resolve, place, remeasure, ripple, setState, setKind, setKeys, setLastKeys } = env;
    const entering = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ease$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bezier"])('enter');
    const check = ()=>{
        if (signal.aborted) throw new Stopped();
    };
    // Both clocks belong to this run. A settled wait releases its listener;
    // abort cancels the pending work before another run can take over.
    const pause = (schedule, cancel)=>new Promise((res, rej)=>{
            check();
            const abort = ()=>{
                cancel(id);
                signal.removeEventListener('abort', abort);
                rej(new Stopped());
            };
            const id = schedule(()=>{
                signal.removeEventListener('abort', abort);
                if (signal.aborted) rej(new Stopped());
                else res();
            });
            signal.addEventListener('abort', abort, {
                once: true
            });
        });
    const frame = ()=>pause((done)=>requestAnimationFrame(done), cancelAnimationFrame);
    const wait = (ms)=>pause((done)=>setTimeout(done, ms / speed), clearTimeout);
    // Release transient DOM/ref state synchronously on abort. The guarded
    // finally call cannot then clear a new run's press or drag ownership.
    const own = (release)=>{
        let live = true;
        const done = ()=>{
            if (!live) return;
            live = false;
            signal.removeEventListener('abort', done);
            release();
        };
        signal.addEventListener('abort', done, {
            once: true
        });
        return done;
    };
    const tween = async (ms, step)=>{
        const start = performance.now();
        const dur = ms / speed;
        for(;;){
            check();
            const t = Math.min(1, (performance.now() - start) / dur);
            step(t);
            if (t === 1) return;
            await frame();
        }
    };
    // Hover is the target and every data-target around it, as in a browser:
    // a row stays hovered while the cursor is on a button inside it.
    const chain = (el)=>{
        const out = [];
        for(let n = el; n && n !== rootRef.current; n = n.parentElement)if (n.hasAttribute('data-target')) out.push(n);
        return out;
    };
    // Kind from what's under the cursor, as a real one works: any element
    // marked data-cursor="hand" | "ibeam" | ... sets the kind while the cursor
    // is over it, switching the moment it crosses the edge. Stages that mark
    // nothing keep the kind the script sets.
    const auto = (p)=>{
        const root = rootRef.current;
        if (!root) return;
        const marked = root.querySelectorAll('[data-cursor]');
        // A stage that never marks anything keeps the script's kind. One that
        // did falls back to the pointer once its marked elements are gone, so
        // a hand doesn't outlive the thing it was over.
        if (!marked.length && !autoUsed.current) return;
        if (marked.length) autoUsed.current = true;
        const box = root.getBoundingClientRect();
        const s = box.width / root.offsetWidth || 1;
        // What it shows over anything unmarked: the pointer, or the stage's own
        // base kind (a launch film keeps the hand throughout)
        const base = root.dataset.cursorBase ?? 'pointer';
        let next = base;
        // What is actually on top under the point decides, as a real pointer
        // works: a button in a popover over a text area is not text. Walk up
        // from the topmost element to the nearest marked one.
        // Every layer, with pointer-events forced on for the test: demos turn
        // them off on overlays (a menu, margin buttons), and the cursor must
        // still read what is visibly on top, not the text beneath it. Layers
        // that are see-through (faded out) are skipped.
        root.setAttribute('data-hit', '');
        const stack = document.elementsFromPoint(box.left + p.x * s, box.top + p.y * s);
        root.removeAttribute('data-hit');
        const top = stack.find((el)=>{
            if (!root.contains(el) || el.closest('.ss-cursor, .ss-keys, .ss-ripple')) return false;
            // A layer that turned pointer-events off counts only where it is a
            // control or a target; a bare overlay (connectors, a flight layer)
            // must not cover what is under it
            if (getComputedStyle(el).pointerEvents === 'none' && !el.closest('[data-cursor], [data-target], button, a[href], [role="button"], [role="menuitem"], [role="option"], [role="tab"]')) return false;
            let o = 1;
            for(let n = el; n && n !== root.parentElement; n = n.parentElement){
                const cs = getComputedStyle(n);
                if (cs.visibility === 'hidden') return false;
                o *= Number(cs.opacity);
            }
            return o > 0.15;
        });
        if (top) {
            // A control inside a marked area (a button over text) is the pointer
            // again unless it's marked itself, as on a real screen
            const n = top.closest('[data-cursor], button, a[href], [role="button"], [role="menuitem"], [role="option"], [role="tab"]');
            next = n && root.contains(n) && n.dataset.cursor ? n.dataset.cursor : base;
            if (next !== kindRef.current) setKind(next);
            return;
        }
        // Off screen (nothing to hit-test): judge by boxes alone
        marked.forEach((n)=>{
            const r = n.getBoundingClientRect();
            const x = (r.left - box.left) / s;
            const y = (r.top - box.top) / s;
            // Later (inner) matches win, so a link inside a text block is a hand
            if (p.x >= x && p.x <= x + r.width / s && p.y >= y && p.y <= y + r.height / s) next = n.dataset.cursor;
        });
        if (next !== kindRef.current) setKind(next);
    };
    autoRef.current = auto;
    // A run starts in the kind of what the cursor rests on, so a loop's first
    // frame matches its last
    if (!dragging.current) auto(pos.current);
    const hover = (el)=>{
        if (hovered.current === el) return;
        const next = chain(el);
        chain(hovered.current).forEach((n)=>next.includes(n) || n.removeAttribute('data-hover'));
        next.forEach((n)=>n.setAttribute('data-hover', ''));
        hovered.current = el;
    };
    // Stage keeps the last key row through resets; a new Act must not reuse its identity.
    let keyId = keysRef.current.id;
    let carets = 0;
    const targetEl = (t)=>{
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nameOf"])(t);
        return name === null ? null : rootRef.current?.querySelector(`[data-target="${name}"]`) ?? null;
    };
    const a = {
        get signal () {
            return signal;
        },
        put (patch) {
            if (!signal.aborted) setState((s)=>({
                    ...s,
                    ...typeof patch === 'function' ? patch(s) : patch
                }));
        },
        async set (patch) {
            check();
            a.put(patch);
            await frame();
            await frame();
            // The scene changed under a still pointer: a button that left, a menu
            // that opened. Re-read what is under it now, as a real cursor would
            autoRef.current?.(pos.current);
            check();
        },
        wait: async (ms)=>{
            check();
            await wait(ms);
        },
        rect: (name, opts)=>{
            const root = rootRef.current;
            const el = root?.querySelector(`[data-target="${name}"]`);
            if (!root || !el) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])(`no element with data-target="${name}"`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY"];
            }
            return opts?.layout ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layoutRectOf"])(root, el) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectOf"])(root, el, scaleRef.current);
        },
        center: (name)=>resolve(name),
        caret (name, at) {
            carets++;
            const el = targetEl(name);
            const root = rootRef.current;
            if (!el || !root) return 0;
            const box = root.getBoundingClientRect();
            const k = box.width / root.offsetWidth || 1;
            const x = box.left + at.x * k;
            const y = box.top + at.y * k;
            // Measure the element's own characters rather than hit-testing, so
            // overlays (a rewrite, a highlight layer, the cursor) never get in the way
            const chars = [];
            const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const r = document.createRange();
            let offset = 0;
            // Text that can't be seen isn't selectable: a rewrite waiting at opacity 0
            // over the original would otherwise pull the caret onto its own lines
            const hidden = (node)=>{
                for(let p = node.parentElement; p; p = p === el ? null : p.parentElement){
                    const cs = getComputedStyle(p);
                    if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') return true;
                }
                return false;
            };
            for(let n = walk.nextNode(); n; n = walk.nextNode()){
                const text = n.textContent ?? '';
                if (hidden(n)) continue;
                for(let c = 0; c < text.length; c++){
                    r.setStart(n, c);
                    r.setEnd(n, c + 1);
                    const b = r.getBoundingClientRect();
                    if (b.width || b.height) chars.push({
                        left: b.left,
                        right: b.right,
                        mid: (b.left + b.right) / 2,
                        top: b.top,
                        bottom: b.bottom,
                        at: offset + c
                    });
                }
                offset += text.length;
            }
            if (!chars.length) return 0;
            if (y < chars[0].top) return 0;
            if (y > chars[chars.length - 1].bottom) return offset;
            // The visual line nearest the pointer, then the boundary nearest it on that line
            let line = chars[0];
            for (const ch of chars)if (Math.abs((ch.top + ch.bottom) / 2 - y) < Math.abs((line.top + line.bottom) / 2 - y)) line = ch;
            const row = chars.filter((ch)=>Math.abs(ch.top - line.top) < (line.bottom - line.top) / 2);
            const next = row.find((ch)=>ch.mid > x);
            return next ? next.at : row[row.length - 1].at + 1;
        },
        async move (to, opts) {
            check();
            const from = {
                ...pos.current
            };
            const end = resolve(to);
            const dist = Math.hypot(end.x - from.x, end.y - from.y);
            if (dist < 0.5) return hover(targetEl(to));
            // Leave hover only on what the cursor actually leaves: moving from a
            // row onto a button inside it keeps the row hovered all the way
            const dest = chain(targetEl(to));
            hover(chain(hovered.current).find((n)=>dest.includes(n)) ?? null);
            // A hand travels in a shallow arc, quicker over short hops
            const ms = opts?.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(260 + dist * 0.9, 300, 650);
            const curve = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOutCubic"];
            const bow = Math.min(dist * 0.08, 24);
            const nx = -(end.y - from.y) / dist;
            const ny = (end.x - from.x) / dist;
            await tween(ms, (t)=>{
                const e = curve(t);
                const lift = Math.sin(Math.PI * e) * bow;
                const p = opts?.path ? opts.path(e, from, end) : {
                    x: from.x + (end.x - from.x) * e + nx * lift,
                    y: from.y + (end.y - from.y) * e + ny * lift
                };
                place(p);
                auto(p);
                if (opts?.onMove) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>opts.onMove(p, from, t));
            });
            check();
            hover(targetEl(to));
        },
        async click (to, opts) {
            check();
            if (to !== undefined) {
                await a.move(to);
                await wait(120);
            }
            check();
            const el = to !== undefined ? targetEl(to) : hovered.current;
            const cursorEl = cursorRef.current;
            const finger = cursor?.style === 'touch';
            const release = own(()=>{
                cursorEl?.removeAttribute('data-pressed');
                el?.removeAttribute('data-pressed');
                if (finger) fingerGone(cursorEl);
            });
            try {
                // A finger is only there when it touches: it shows just before, and goes after it lifts
                if (finger) {
                    cursorEl?.setAttribute('data-touching', '');
                    await wait(140);
                    check();
                }
                for(let i = 0; i < (opts?.double ? 2 : 1); i++){
                    if (i) await wait(70);
                    check();
                    cursorEl?.setAttribute('data-pressed', 'true');
                    if (cursor?.ripple) ripple(pos.current);
                    el?.setAttribute('data-pressed', opts?.right ? 'right' : '');
                    await wait(opts?.double ? 80 : 100);
                    check();
                    cursorEl?.removeAttribute('data-pressed');
                    el?.removeAttribute('data-pressed');
                }
            } finally{
                release();
            }
        },
        async scroll (name, to, opts) {
            check();
            const el = targetEl(name);
            if (!el) return;
            const from = el.scrollTop;
            let end = typeof to === 'number' ? to : from;
            if (typeof to === 'string') {
                const t = targetEl(to);
                if (t) end = from + (t.getBoundingClientRect().top - el.getBoundingClientRect().top) / (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawnScale"])(rootRef.current, scaleRef.current) - (opts?.offset ?? 0);
            }
            end = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(end, 0, el.scrollHeight - el.clientHeight);
            // You can only scroll what the pointer is over: a visible cursor
            // outside the area moves into it first, then holds still while the
            // content moves under it
            if (cursor) {
                const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectOf"])(rootRef.current, el, scaleRef.current || 1);
                const p = pos.current;
                const inside = p.x >= box.x + 8 && p.x <= box.x + box.width - 8 && p.y >= box.y + 8 && p.y <= box.y + box.height - 8;
                if (!inside) {
                    await this.move({
                        x: box.x + box.width * 0.6,
                        y: box.y + box.height * 0.55
                    });
                    await this.wait(120);
                }
            }
            // A Scroll's overlay bar shows while it moves and fades once it rests
            const wrap = el.parentElement?.classList.contains('ss-scroller') ? el.parentElement : null;
            wrap?.setAttribute('data-scrolling', '');
            const release = own(()=>wrap?.removeAttribute('data-scrolling'));
            try {
                await tween(opts?.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(420 + Math.abs(end - from) * 1.2, 500, 1400), (t)=>{
                    el.scrollTop = from + (end - from) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOutCubic"])(t);
                    el.toggleAttribute('data-scrolled', el.scrollTop > 0.5);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thumb"])(el);
                });
                check();
            } finally{
                release();
            }
            remeasure();
            autoRef.current?.(pos.current);
        },
        async snap (patch, scope) {
            check();
            const el = scope ? rootRef.current?.querySelector(`[data-target="${scope}"]`) : rootRef.current;
            el?.setAttribute('data-instant', '');
            const release = own(()=>el?.removeAttribute('data-instant'));
            try {
                a.put(patch);
                await frame();
                await frame();
                check();
            } finally{
                release();
            }
        },
        async key (combo) {
            check();
            const caps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$keys$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["capsOf"])(combo);
            const id = ++keyId;
            const k = keysRef.current;
            setLastKeys(k.caps.length ? {
                ...k,
                show: false,
                down: false
            } : null);
            setKeys({
                id,
                caps,
                show: false,
                down: false
            });
            await frame();
            await frame();
            check();
            setKeys({
                id,
                caps,
                show: true,
                down: false
            });
            await wait(180);
            check();
            setKeys({
                id,
                caps,
                show: true,
                down: true
            });
            await wait(140);
            check();
            setKeys({
                id,
                caps,
                show: true,
                down: false
            });
            // The caps linger and fade without holding up the script.
            void wait(600).then(()=>{
                if (keyId === id && !signal.aborted) setKeys({
                    id,
                    caps,
                    show: false,
                    down: false
                });
            }, (error)=>{
                if (!(error instanceof Stopped)) console.error('[stageshow] script error', error);
            });
        },
        async stagger (items, fn, gap = 60) {
            await Promise.all(items.map(async (item, i)=>{
                if (i) await wait(gap * i);
                check();
                await fn(item, i);
            }));
        },
        mark (name) {
            if (!signal.aborted) rootRef.current?.setAttribute('data-mark', name);
        },
        async cursor (k) {
            check();
            setKind(k);
            await frame();
        },
        async type (key, text, opts) {
            const interval = opts?.interval ?? 35;
            for(let i = 0; i <= text.length; i++){
                check();
                setState((s)=>({
                        ...s,
                        [key]: text.slice(0, i)
                    }));
                // Uneven but repeatable rhythm, so every loop types the same way
                await wait(interval * (0.7 + 0.6 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hash"])(i)));
            }
        },
        place (to) {
            if (signal.aborted) return;
            const p = resolve(to);
            place(p);
            autoRef.current?.(p);
        },
        async enter (to, opts) {
            check();
            const end = resolve(to);
            // The frame: the stage, in stage px
            const root = rootRef.current;
            const f = {
                x: 0,
                y: 0,
                w: root.offsetWidth,
                h: root.offsetHeight
            };
            // Out past the edge nearest the target, far enough that the hand is hidden
            const out = 40;
            const gaps = [
                end.x - f.x,
                f.x + f.w - end.x,
                end.y - f.y,
                f.y + f.h - end.y
            ];
            const side = gaps.indexOf(Math.min(...gaps));
            const from = side === 0 ? {
                x: f.x - out,
                y: end.y + f.h * 0.12
            } : side === 1 ? {
                x: f.x + f.w + out * 0.4,
                y: end.y + f.h * 0.12
            } : side === 2 ? {
                x: end.x - f.w * 0.06,
                y: f.y - out
            } : {
                x: end.x + f.w * 0.06,
                y: f.y + f.h + out * 0.4
            };
            place(from);
            hover(null);
            await tween(opts?.duration ?? 700, (t)=>{
                const e = entering(t);
                const p = {
                    x: from.x + (end.x - from.x) * e,
                    y: from.y + (end.y - from.y) * e
                };
                place(p);
                auto(p);
            });
            check();
            hover(targetEl(to));
        },
        async drag (to, onMove, opts) {
            check();
            const from = {
                ...pos.current
            };
            const end = resolve(to);
            const dist = Math.hypot(end.x - from.x, end.y - from.y);
            hover(null);
            // The hand closes only while the button is held, as a real cursor's
            // does: on press here, and back to what it was on release. Over text
            // (I-beam) or a canvas (crosshair) a drag selects, so it keeps its kind.
            const before = kindRef.current;
            const selects = before === 'ibeam' || before === 'crosshair';
            const closesHand = !selects && opts?.cursor !== 'preserve';
            // A finger swipes in one motion: it lands and is already moving, fast
            // first and slowing as it goes. A mouse presses, then carries.
            const finger = cursor?.style === 'touch';
            // Gathers speed over the first quarter, then one speed to the lift,
            // still moving when it leaves so the throw carries straight on
            const fingerEase = (t)=>{
                const a = 0.25, k = 1 / (1 - a / 2);
                return t < a ? t * t / (2 * a) * k : (t - a / 2) * k;
            };
            if (finger) {
                cursorRef.current?.setAttribute('data-touching', '');
                await wait(140);
                check();
            }
            // The trail: one streak from where the finger was a few frames ago to
            // where it is now, turned along the motion and fading toward its tail
            const streak = finger ? cursorRef.current?.querySelector('.ss-cursor__streak') ?? null : null;
            const trail = [];
            const drawTrail = (at)=>{
                trail.unshift({
                    ...at
                });
                if (trail.length > 9) trail.pop();
                const h = trail[trail.length - 1];
                const dx = at.x - h.x, dy = at.y - h.y;
                const len = Math.min(Math.hypot(dx, dy), 100);
                if (!streak) return;
                streak.style.width = `${len}px`;
                streak.style.left = `${-len}px`;
                streak.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
            };
            dragging.current = true;
            const cursorEl = cursorRef.current;
            const release = own(()=>{
                dragging.current = false;
                cursorEl?.removeAttribute('data-pressed');
                cursorEl?.removeAttribute('data-swiping');
                if (finger) fingerGone(cursorEl);
            });
            try {
                // The press dips first and the hand closes at the bottom of it, so
                // the change of shape sits inside the press
                cursorEl?.setAttribute('data-pressed', 'true');
                // A finger presses first, seen as a press, and then swipes
                await wait(finger ? 170 : 60);
                if (finger) {
                    if (streak) streak.style.width = '0px';
                    cursorEl?.setAttribute('data-swiping', '');
                }
                check();
                if (closesHand && !finger) setKind('grab');
                if (!finger) await wait(70);
                check();
                cursorEl?.removeAttribute('data-pressed');
                // Carried by a hand: the same shallow arc and ease as a move, a little
                // slower for the weight, never a ruler-straight slide
                // A selection is precise: straight, so the caret never leaves the text
                const bow = selects ? 0 : Math.min(dist * 0.06, 18);
                const nx = dist ? -(end.y - from.y) / dist : 0;
                const ny = dist ? (end.x - from.x) / dist : 0;
                // A selection across lines drops into its last line first, then
                // sweeps along it, as a hand does. A straight diagonal runs back past
                // the anchor on the first line (selecting nothing, or backwards) and
                // then fills everything at once as it crosses into the next.
                const lines = selects && Math.abs(end.y - from.y) > 6;
                // Ending left of where it started, no path reads right: the beam runs
                // back along the first line or past the end on the last
                if (lines && end.y > from.y && end.x < from.x - 2) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])('a text selection that ends left of where it starts overshoots and shrinks back; select text that starts a line, or fits on one');
                const caretsBefore = carets;
                // A flick is brief, about a quarter second; the throw does the rest
                await tween(finger ? opts?.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(180 + dist * 0.5, 240, 300) : opts?.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(360 + dist * 1.1, 450, 900), (t)=>{
                    // A finger gathers speed for a few frames and then runs at one
                    // speed until it lifts, still moving: what it threw carries on at
                    // that speed and eases off. A finger that slows before it lifts
                    // makes the throw jolt; one that eases out early reads as a pause
                    const e = finger ? fingerEase(t) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOutCubic"])(t);
                    const lift = Math.sin(Math.PI * e) * bow;
                    // The drop: y arrives early, x mostly late (a curve through (from.x, end.y))
                    const ey = lines ? 1 - (1 - e) * (1 - e) : e;
                    const ex = lines ? e * e : e;
                    const at = opts?.path?.(e, from, end) ?? {
                        x: from.x + (end.x - from.x) * ex + nx * lift,
                        y: from.y + (end.y - from.y) * ey + ny * lift
                    };
                    // The cursor and whatever follows it (a card, a selection) paint in
                    // the same frame: render the scene now, not a frame behind
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>onMove?.(at, from, t));
                    place(at);
                    if (finger) drawTrail(at);
                });
                // A selection grown by time or a word count drifts off the I-beam,
                // ahead of it on one line and behind on the next
                if (selects && onMove && carets === caretsBefore) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])('selection drift: a text selection drag never read a.caret(), so the highlight is not under the I-beam; set it from a.caret(name, at) in onMove');
                check();
                if (closesHand && !finger) setKind(before === 'grab' ? 'pointer' : before);
            } finally{
                release();
            }
            // What's under the cursor now decides (the thing it was over may have moved or gone)
            autoRef.current?.(end);
        },
        layout
    };
    // A beat started without await (a move alongside other beats) rejects
    // with Stopped when the stage stops; that is expected, so it must not
    // surface as an unhandled rejection. Any other error is reported here,
    // since nobody may be awaiting it. Awaited calls still see the rejection.
    for (const k of Object.keys(a)){
        const fn = a[k];
        if (typeof fn !== 'function') continue;
        a[k] = (...args)=>{
            const out = fn.apply(a, args);
            if (out instanceof Promise) out.catch((e)=>{
                if (!(e instanceof Stopped)) console.error('[stageshow] script error', e);
            });
            return out;
        };
    }
    return a;
}
function checkSeam(end, initial, at, rest) {
    const changed = Object.keys(initial).filter((k)=>JSON.stringify(end[k]) !== JSON.stringify(initial[k]));
    if (changed.length) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])(`loop seam: state still differs from initial at the end of the script (${changed.join(', ')})`);
    if (rest && Math.hypot(at.x - rest.x, at.y - rest.y) > 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])('loop seam: cursor does not end where it starts');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chart",
    ()=>Chart,
    "chartPoints",
    ()=>chartPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function chartPoints({ data, kind = 'line', width, height, dot = true, max }) {
    const top = max ?? Math.max(...data, 1);
    const pad = kind === 'line' && dot ? 4 : 1;
    const h = height - pad * 2;
    if (kind === 'bars') {
        const gap = Math.max(2, Math.round(width / data.length / 4));
        const bw = (width - gap * (data.length - 1)) / data.length;
        return data.map((v, i)=>({
                x: i * (bw + gap) + bw / 2,
                y: height - Math.max(2, v / top * h)
            }));
    }
    return data.map((v, i)=>({
            x: pad + i / Math.max(1, data.length - 1) * (width - pad * 2),
            y: pad + h - v / top * h
        }));
}
/** A smooth path through the points (Catmull-Rom as cubic Béziers), never overshooting the ends. */ function smooth(p) {
    if (!p.length) return '';
    let d = `M${p[0].x} ${p[0].y}`;
    for(let i = 0; i < p.length - 1; i++){
        const a = p[i - 1] ?? p[i];
        const b = p[i];
        const c = p[i + 1];
        const e = p[i + 2] ?? c;
        d += `C${b.x + (c.x - a.x) / 6} ${b.y + (c.y - a.y) / 6} ${c.x - (e.x - b.x) / 6} ${c.y - (e.y - b.y) / 6} ${c.x} ${c.y}`;
    }
    return d;
}
/**
 * The same curve as smooth(), sampled at a fixed number of points. A path
 * only eases into another with the same commands, so a line drawn from 8
 * points and one from 9 would swap in a frame while the dot traveled.
 * Sampling keeps every line the same shape of path, whatever the data's length.
 */ const SAMPLES = 48;
/** The draw-in's timing: the same curve the rest of the kit's travel uses. */ const DRAW_MS = 1200;
function ease(t) {
    // cubic-bezier(0.45, 0, 0.2, 1), solved for x by bisection
    const b = (a, c, u)=>3 * a * u * (1 - u) ** 2 + 3 * c * u * u * (1 - u) + u ** 3;
    let lo = 0;
    let hi = 1;
    for(let i = 0; i < 20; i++){
        const m = (lo + hi) / 2;
        if (b(0.45, 0.2, m) < t) lo = m;
        else hi = m;
    }
    return b(0, 1, (lo + hi) / 2);
}
/** The curve's height at x, from its sampled points. */ function yAt(p, x) {
    let i = 1;
    while(i < p.length - 1 && p[i].x < x)i++;
    const a = p[i - 1];
    const c = p[i];
    const t = c.x === a.x ? 0 : Math.max(0, Math.min(1, (x - a.x) / (c.x - a.x)));
    return a.y + (c.y - a.y) * t;
}
function resample(p) {
    if (p.length < 2) return p;
    const out = [];
    for(let s = 0; s <= SAMPLES; s++){
        const u = s / SAMPLES * (p.length - 1);
        const i = Math.min(Math.floor(u), p.length - 2);
        const t = u - i;
        const a = p[i - 1] ?? p[i];
        const b = p[i];
        const c = p[i + 1];
        const e = p[i + 2] ?? c;
        // The Bézier segment smooth() draws between b and c
        const c1 = {
            x: b.x + (c.x - a.x) / 6,
            y: b.y + (c.y - a.y) / 6
        };
        const c2 = {
            x: c.x - (e.x - b.x) / 6,
            y: c.y - (e.y - b.y) / 6
        };
        const m = 1 - t;
        const k = (p0, p1, p2, p3)=>m * m * m * p0 + 3 * m * m * t * p1 + 3 * m * t * t * p2 + t * t * t * p3;
        out.push({
            x: k(b.x, c1.x, c2.x, c.x),
            y: k(b.y, c1.y, c2.y, c.y)
        });
    }
    return out;
}
function Chart({ data, kind = 'line', width, height, show = true, area = true, dot = true, max, className, style }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const drawRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wipeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const samples = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Draw-in: the dot leads and the line follows it. One timeline moves the
    // wipe's edge and puts the dot on the curve at that edge, every frame.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Chart.useLayoutEffect": ()=>{
            const was = shown.current;
            const g = drawRef.current;
            shown.current = show && data.length > 1 && !!g;
            if (!show || was || !g) return;
            const c = dotRef.current;
            const p = samples.current;
            if (reduced || p.length < 2) return;
            const x0 = p[0].x;
            const x1 = p[p.length - 1].x;
            const wipe = wipeRef.current;
            if (!wipe) return;
            // The clip is a rect in the chart's own units, so its edge is exactly the dot's x
            const at = {
                "Chart.useLayoutEffect.at": (e)=>{
                    const x = x0 + (x1 - x0) * e;
                    wipe.setAttribute('width', `${x + 6}`);
                    if (c) {
                        c.style.setProperty('cx', `${x}px`);
                        c.style.setProperty('cy', `${yAt(p, x)}px`);
                    }
                }
            }["Chart.useLayoutEffect.at"];
            g.style.transition = 'opacity 0.15s ease';
            if (c) {
                c.style.transition = 'opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)';
                c.style.opacity = '1';
                c.style.transform = 'none';
            }
            at(0);
            const t0 = performance.now();
            let drawing = true;
            let raf = requestAnimationFrame(function step(now) {
                const t = Math.min(1, (now - t0) / DRAW_MS);
                at(ease(t));
                if (t < 1) raf = requestAnimationFrame(step);
                else done();
            });
            // Back to the stylesheet: the end state matches it, so nothing moves
            const done = {
                "Chart.useLayoutEffect.done": ()=>{
                    drawing = false;
                    wipe.setAttribute('width', `${width + 12}`);
                    g.style.removeProperty('transition');
                    if (c) for (const k of [
                        'cx',
                        'cy',
                        'transition',
                        'opacity',
                        'transform'
                    ])c.style.removeProperty(k);
                }
            }["Chart.useLayoutEffect.done"];
            return ({
                "Chart.useLayoutEffect": ()=>{
                    cancelAnimationFrame(raf);
                    // An interrupted setup (including StrictMode's rehearsal) can draw
                    // again. A completed draw does not replay when motion is restored.
                    if (drawing) shown.current = false;
                    done();
                }
            })["Chart.useLayoutEffect"];
        }
    }["Chart.useLayoutEffect"], [
        show,
        reduced,
        kind,
        width,
        data.length > 1
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    const top = max ?? Math.max(...data, 1);
    const pad = kind === 'line' && dot ? 4 : 1;
    const h = height - pad * 2;
    if (!data.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `ss-chart${className ? ` ${className}` : ''}`,
        "data-kind": kind,
        "data-show": show || undefined,
        width: width,
        height: height,
        style: style,
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/chart.tsx",
        lineNumber: 181,
        columnNumber: 28
    }, this);
    if (kind === 'bars') {
        const gap = Math.max(2, Math.round(width / data.length / 4));
        const bw = (width - gap * (data.length - 1)) / data.length;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: `ss-chart${className ? ` ${className}` : ''}`,
            "data-kind": "bars",
            "data-still": reduced || undefined,
            "data-show": show || undefined,
            width: width,
            height: height,
            style: style,
            "aria-hidden": true,
            children: data.map((v, i)=>{
                const bh = Math.max(2, v / top * h);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    className: "ss-chart__bar",
                    x: i * (bw + gap),
                    width: bw,
                    rx: Math.min(2, bw / 2),
                    style: {
                        y: height - (show ? bh : 0),
                        height: show ? bh : 0,
                        transitionDelay: `${i * 22}ms`
                    }
                }, i, false, {
                    fileName: "[project]/src/vendor/stageshow/chart.tsx",
                    lineNumber: 189,
                    columnNumber: 18
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/chart.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, this);
    }
    const pts = chartPoints({
        data,
        kind,
        width,
        height,
        dot,
        max
    });
    const curve = resample(pts);
    samples.current = curve;
    const line = smooth(curve);
    const fill = `${line}L${pts[pts.length - 1].x} ${height}L${pts[0].x} ${height}Z`;
    const end = pts[pts.length - 1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `ss-chart${className ? ` ${className}` : ''}`,
        "data-kind": "line",
        "data-still": reduced || undefined,
        "data-show": show || undefined,
        width: width,
        height: height,
        style: style,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: `${id}-fill`,
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0",
                                stopColor: "var(--ss-accent)",
                                stopOpacity: "0.18"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/chart.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "var(--ss-accent)",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/chart.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/chart.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                        id: `${id}-wipe`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            ref: wipeRef,
                            x: -6,
                            y: -6,
                            width: width + 12,
                            height: height + 12
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/chart.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/chart.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/chart.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                ref: drawRef,
                className: "ss-chart__draw",
                clipPath: `url(#${id}-wipe)`,
                children: [
                    area && pts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "ss-chart__area",
                        d: fill,
                        style: {
                            d: `path("${fill}")`
                        },
                        fill: `url(#${id}-fill)`
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/chart.tsx",
                        lineNumber: 215,
                        columnNumber: 36
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "ss-chart__line",
                        d: line,
                        style: {
                            d: `path("${line}")`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/chart.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/chart.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                ref: dotRef,
                className: "ss-chart__dot",
                "data-lead": "",
                cx: end.x,
                cy: end.y,
                r: 3.5,
                style: {
                    cx: end.x,
                    cy: end.y
                }
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/chart.tsx",
                lineNumber: 218,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/chart.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, this);
}
_s(Chart, "QIgaVT9W4rRdK0A6icMp5fDxtE4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = Chart;
var _c;
__turbopack_context__.k.register(_c, "Chart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/clock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The stage clock. Everything on a stage moves on the browser's own clocks:
// performance.now, requestAnimationFrame, setTimeout/setInterval, and CSS
// transitions and animations on the compositor. With nothing attached, that
// is all this file is: `clock` reads those same globals, so a stage plays in
// real time exactly as it always has.
//
// A recorder or the playground runs installVirtualClock() in the page
// before any of its code loads. From then on time only moves when the
// recorder steps it, by exactly 1/fps: timers fire in time order, one
// animation frame runs, and every CSS transition and animation is set to the
// new time. Live playback instead calls advance() with the native RAF's
// elapsed time, so its motion follows the display refresh rate. Each fixed
// frame of a video is then the same on every render, a
// timed beat lands on a known frame, and nothing drops or doubles.
//
// Chrome's own virtual time (Emulation.setVirtualTimePolicy) doesn't do this:
// it moves timers but runs no animation frames and leaves CSS animations
// where they are.
/** What a recorder drives, at window.__stageshow.clock once installed. */ __turbopack_context__.s([
    "clock",
    ()=>clock,
    "installVirtualClock",
    ()=>installVirtualClock
]);
const clock = {
    now: ()=>performance.now(),
    raf: (fn)=>requestAnimationFrame(fn),
    cancelRaf: (id)=>cancelAnimationFrame(id),
    // Layout must finish even when a preview is paused. Keep these callbacks
    // separate: running arbitrary motion RAFs at a frozen timestamp can still
    // advance a spring that integrates once per callback.
    layoutRaf: (fn)=>clock.recording?.requestLayoutFrame(fn) ?? requestAnimationFrame(fn),
    cancelLayoutRaf: (id)=>{
        const recording = clock.recording;
        if (recording) recording.cancelLayoutFrame(id);
        else cancelAnimationFrame(id);
    },
    timeout: (fn, ms)=>window.setTimeout(fn, ms),
    clearTimeout: (id)=>window.clearTimeout(id),
    /** The recorder's control while one drives the page, else null. */ get recording () {
        return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.__stageshow?.clock ?? null;
    }
};
function installVirtualClock(opts = {}) {
    const w = window;
    if (w.__stageshow?.clock) return w.__stageshow.clock;
    const fps = opts.fps ?? 60;
    const RealDate = Date;
    const epoch = opts.epoch ?? RealDate.now();
    // Not 0: code that tests a timestamp for truthiness must still see one
    const BASE = 1000;
    let vt = BASE;
    let frame = 0;
    let fixedAnchor = BASE;
    let fixedFrame = 0;
    const timers = new Map();
    let nextId = 1;
    let seq = 0;
    let frameCbs = new Map();
    let layoutCbs = new Map();
    const arm = (fn, ms, args, every)=>{
        const d = Math.max(0, Number(ms) || 0);
        const id = nextId++;
        timers.set(id, {
            id,
            at: vt + d,
            seq: seq++,
            fn,
            args,
            every: every ? Math.max(1, d) : null
        });
        return id;
    };
    w.setTimeout = (fn, ms, ...args)=>arm(fn, ms, args, false);
    w.setInterval = (fn, ms, ...args)=>arm(fn, ms, args, true);
    w.clearTimeout = w.clearInterval = (id)=>void timers.delete(id);
    w.requestAnimationFrame = (fn)=>{
        const id = nextId++;
        frameCbs.set(id, fn);
        return id;
    };
    w.cancelAnimationFrame = (id)=>void frameCbs.delete(id);
    performance.now = ()=>vt;
    const dateNow = ()=>Math.floor(epoch + (vt - BASE));
    const VDate = function(...a) {
        if (!new.target) return new RealDate(dateNow()).toString();
        return a.length ? new RealDate(...a) : new RealDate(dateNow());
    };
    Object.assign(VDate, {
        prototype: RealDate.prototype,
        now: dateNow,
        parse: RealDate.parse,
        UTC: RealDate.UTC
    });
    w.Date = VDate;
    // Queued work (React renders on a MessageChannel, effects after them,
    // promise chains) runs between tasks; a few message round trips let it all
    // land before time moves on.
    const tick = ()=>new Promise((r)=>{
            const c = new MessageChannel();
            c.port1.onmessage = ()=>{
                c.port1.close();
                c.port2.close();
                r();
            };
            c.port2.postMessage(0);
        });
    // Anything that started meanwhile is held from here on (see scan below).
    const settle = async ()=>{
        for(let i = 0; i < 4; i++)await tick();
        scan();
    };
    const run = (fn, args)=>{
        try {
            // String callbacks are ignored: running them would need eval
            if (typeof fn === 'function') fn(...args);
        } catch (e) {
            console.error(e);
        }
    };
    const held = new WeakMap();
    const live = new Set();
    const scan = ()=>{
        for (const a of document.getAnimations()){
            if (held.has(a) || a.playState === 'finished' || a.playState === 'idle') continue;
            held.set(a, {
                local: 0,
                rate: a.playbackRate || 1,
                born: vt
            });
            a.playbackRate = 0;
            a.currentTime = 0;
            live.add(a);
        }
    };
    const moveAnimations = (from)=>{
        scan();
        for (const a of Array.from(live)){
            const h = held.get(a);
            if (a.playState === 'idle' || a.playState === 'finished') {
                live.delete(a);
                continue;
            }
            if (a.playState !== 'paused') h.local += (vt - Math.max(from, h.born)) * h.rate;
            const end = a.effect?.getComputedTiming().endTime;
            if (typeof end === 'number' && Number.isFinite(end) && h.local >= end) {
                // Cancel a pending play task before restoring the rate. Otherwise a
                // delayed transition can restart on the native timeline after finish().
                a.pause();
                a.playbackRate = h.rate;
                a.finish();
                live.delete(a);
            } else {
                a.currentTime = h.local;
            }
        }
    };
    const stepTo = async (to)=>{
        const from = vt;
        await settle();
        // Timers due by `to`, in time order, each with the work it queued. A
        // hair of slack, so a wait summed from frame-sized steps can't miss its
        // frame by a rounding error
        for(let guard = 0; guard < 10000; guard++){
            let next = null;
            for (const t of Array.from(timers.values()))if (t.at <= to + 1e-6 && (!next || t.at < next.at || t.at === next.at && t.seq < next.seq)) next = t;
            if (!next) break;
            vt = next.at;
            if (next.every === null) timers.delete(next.id);
            else {
                next.at += next.every;
                next.seq = seq++;
            }
            run(next.fn, next.args);
            await settle();
        }
        vt = to;
        frame++;
        const cbs = frameCbs;
        const layout = layoutCbs;
        frameCbs = new Map();
        layoutCbs = new Map();
        for (const fn of Array.from(layout.values()))run(fn, [
            vt
        ]);
        for (const fn of Array.from(cbs.values()))run(fn, [
            vt
        ]);
        await settle();
        moveAnimations(from);
    };
    const control = {
        fps,
        get frame () {
            return frame;
        },
        now: ()=>vt,
        async step (n = 1) {
            // Keep recorder timestamps exact, without accumulating rounded deltas.
            for(let i = 0; i < n; i++)await stepTo(fixedAnchor + ++fixedFrame * 1000 / fps);
        },
        async advance (milliseconds) {
            if (!Number.isFinite(milliseconds) || milliseconds < 0) throw new RangeError('Clock advance must be a finite, non-negative duration');
            if (milliseconds === 0) return;
            await stepTo(vt + milliseconds);
            // A manual fixed step after live playback starts at the current time.
            fixedAnchor = vt;
            fixedFrame = 0;
        },
        settle,
        requestLayoutFrame (callback) {
            const empty = layoutCbs.size === 0;
            const id = nextId++;
            layoutCbs.set(id, callback);
            // A paused React/ResizeObserver commit can enqueue measurement work
            // without changing any observed DOM attributes. Wake its host directly.
            if (empty) opts.onLayout?.();
            return id;
        },
        cancelLayoutFrame: (id)=>void layoutCbs.delete(id),
        get layoutPending () {
            return layoutCbs.size > 0;
        },
        async flushLayout () {
            await settle();
            // Snapshot once: a nested layout frame belongs to the next native
            // paint, rather than an unbounded drain in this task.
            const callbacks = layoutCbs;
            layoutCbs = new Map();
            for (const fn of Array.from(callbacks.values()))run(fn, [
                vt
            ]);
            await settle();
        }
    };
    w.__stageshow = {
        ...w.__stageshow ?? {},
        clock: control
    };
    return control;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/code.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Code",
    ()=>Code
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const KEYWORDS = /^(const|let|var|function|return|if|else|await|async|import|from|export|default|new|true|false|null|undefined|for|of|in|while|try|catch|throw|class|extends|type|interface|def|self|None|True|False)$/;
/** A light tokenizer: comments, strings, numbers, keywords, function calls. */ function tokens(line) {
    const out = [];
    const re = /(\/\/.*$|#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d[\d._]*\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)/g;
    let last = 0;
    let m;
    let k = 0;
    while(m = re.exec(line)){
        if (m.index > last) out.push(line.slice(last, m.index));
        const [text, com, str, num, call, word] = m;
        const kind = com ? 'com' : str ? 'str' : num ? 'num' : call ? KEYWORDS.test(call) ? 'key' : 'fn' : word && KEYWORDS.test(word) ? 'key' : null;
        out.push(kind ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `ss-code__${kind}`,
            children: text
        }, k++, false, {
            fileName: "[project]/src/vendor/stageshow/code.tsx",
            lineNumber: 28,
            columnNumber: 21
        }, this) : text);
        last = m.index + text.length;
    }
    if (last < line.length) out.push(line.slice(last));
    return out;
}
function Code({ lines, start = 1, numbers = true, count, highlight = true, className, style }) {
    _s();
    let n = start;
    // Only lines that really run past the block fade at the edge
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Code.useLayoutEffect": ()=>{
            const mark = {
                "Code.useLayoutEffect.mark": ()=>ref.current?.querySelectorAll('.ss-code__text').forEach({
                        "Code.useLayoutEffect.mark": (t)=>{
                            t.toggleAttribute('data-over', t.scrollWidth > t.clientWidth + 1);
                        }
                    }["Code.useLayoutEffect.mark"])
            }["Code.useLayoutEffect.mark"];
            mark();
            const ro = new ResizeObserver(mark);
            if (ref.current) ro.observe(ref.current);
            return ({
                "Code.useLayoutEffect": ()=>ro.disconnect()
            })["Code.useLayoutEffect"];
        }
    }["Code.useLayoutEffect"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `ss-code${className ? ` ${className}` : ''}`,
        style: style,
        children: lines.map((raw, i)=>{
            const line = typeof raw === 'string' ? {
                text: raw
            } : raw;
            // A removed line keeps the old number; the line after it reuses it
            const num = line.kind === 'del' || line.number === false ? n : n++;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-code__line",
                "data-kind": line.kind,
                "data-on": count === undefined || i < count || undefined,
                children: [
                    numbers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-code__num",
                        children: line.kind === 'del' || line.number === false ? '' : num
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/code.tsx",
                        lineNumber: 62,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-code__mark",
                        children: line.kind === 'add' ? '+' : line.kind === 'del' ? '−' : ''
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/code.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-code__text",
                        children: highlight ? tokens(line.text) : line.text
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/code.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/vendor/stageshow/code.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/code.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(Code, "JkctLsMDw5W2MbVlMaFRM76c/8g=");
_c = Code;
var _c;
__turbopack_context__.k.register(_c, "Code");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Badge({ tone = 'neutral', dot, icon, children, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-badge${className ? ` ${className}` : ''}`,
        "data-tone": tone,
        "data-lead": dot || icon ? '' : undefined,
        children: [
            dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-badge__dot"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Badge.tsx",
                lineNumber: 12,
                columnNumber: 15
            }, this),
            icon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-badge__label",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Badge.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Badge.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Roll.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Button({ variant = 'secondary', size = 'medium', icon, trailingIcon, children, className, ...rest }) {
    _s();
    // The leading slot stays mounted once it has held an icon, so it can open
    // and close; an icon that arrives after mount opens it a frame later, from
    // closed, rather than appearing at full size
    const [last, setLast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(icon);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!icon);
    const has = !!icon;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Button.useLayoutEffect": ()=>{
            if (!has) return setOpen(false);
            setLast(icon);
            if (open) return;
            const id = requestAnimationFrame({
                "Button.useLayoutEffect.id": ()=>setOpen(true)
            }["Button.useLayoutEffect.id"]);
            return ({
                "Button.useLayoutEffect": ()=>cancelAnimationFrame(id)
            })["Button.useLayoutEffect"];
        }
    }["Button.useLayoutEffect"], [
        has
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        role: "button",
        "data-cursor": "pointer",
        ...rest,
        className: `ss-button${className ? ` ${className}` : ''}`,
        "data-variant": variant,
        "data-size": size,
        "data-leading": open ? '' : undefined,
        "data-trailing": trailingIcon ? '' : undefined,
        children: [
            last != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-button__icon ss-button__lead",
                "data-open": open || undefined,
                onTransitionEnd: (e)=>{
                    if (!has && e.propertyName === 'width') setLast(null);
                },
                children: icon ?? last
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Button.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            children != null && children !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-button__label",
                children: typeof children === 'string' || typeof children === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Roll"], {
                    variant: "fade",
                    children: String(children)
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/controls/Button.tsx",
                    lineNumber: 63,
                    columnNumber: 108
                }, this) : children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Button.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this),
            trailingIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-button__icon",
                children: trailingIcon
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Button.tsx",
                lineNumber: 65,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Button.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(Button, "0ueV8vSryFNa5+mLBZlECaDbB+U=");
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Draft.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Draft",
    ()=>Draft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Draft({ value, full, editing, placeholder, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-draft${className ? ` ${className}` : ''}`,
        "data-editing": editing || undefined,
        "data-empty": !value || undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-draft__box",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-draft__words",
                children: [
                    full != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-draft__size",
                        "aria-hidden": true,
                        children: full
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
                        lineNumber: 35,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-draft__typed",
                        children: [
                            value,
                            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-draft__caret"
                            }, value.length, false, {
                                fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
                                lineNumber: 38,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this),
                    placeholder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-draft__ph",
                        "aria-hidden": true,
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
                        lineNumber: 40,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/controls/Draft.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Draft;
var _c;
__turbopack_context__.k.register(_c, "Draft");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>Field
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Field({ label, value, placeholder, focused, password, status, chip, remove, leading, trailing, box, className, style, ...rest }) {
    _s();
    // A cleared chip keeps its text while it fades, then lets go
    // (decided while rendering, so not one frame passes without it)
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [, release] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    if (chip || value) held.current = chip ? value : '';
    const let_go = ()=>{
        if (!held.current) return;
        held.current = '';
        release((n)=>n + 1);
    };
    const out = !chip && !value && !!held.current;
    // Keep the text only while its fade is visible. A stage reset can disable
    // the transition before it starts, or cancel it halfway through.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Field.useLayoutEffect": ()=>{
            const el = text.current;
            if (!out || !el) return;
            const check = {
                "Field.useLayoutEffect.check": ()=>{
                    if (Number(getComputedStyle(el).opacity) === 0) let_go();
                }
            }["Field.useLayoutEffect.check"];
            const settle = {
                "Field.useLayoutEffect.settle": (event)=>{
                    if (event.target === el && event.propertyName === 'opacity') check();
                }
            }["Field.useLayoutEffect.settle"];
            el.addEventListener('transitionend', settle);
            el.addEventListener('transitioncancel', settle);
            check();
            return ({
                "Field.useLayoutEffect": ()=>{
                    el.removeEventListener('transitionend', settle);
                    el.removeEventListener('transitioncancel', settle);
                }
            })["Field.useLayoutEffect"];
        }
    }["Field.useLayoutEffect"], [
        out
    ]);
    const shown = out ? held.current : value;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-field${className ? ` ${className}` : ''}`,
        "data-focused": focused || undefined,
        "data-status": status,
        "data-filled": value ? true : undefined,
        style: style,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-field__label",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                lineNumber: 69,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-cursor": "ibeam",
                ...box,
                className: `ss-field__box${box?.className ? ` ${box.className}` : ''}`,
                children: [
                    leading,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-field__text",
                        children: [
                            placeholder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-field__placeholder",
                                children: placeholder
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                lineNumber: 73,
                                columnNumber: 27
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: text,
                                className: "ss-field__value",
                                "data-password": password || undefined,
                                "data-chip": chip || out || undefined,
                                "data-leaving": out || undefined,
                                "data-removable": remove !== undefined || undefined,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-field__chars",
                                        children: password ? '•'.repeat(shown.length) : shown
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    remove !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-field__x",
                                        role: "button",
                                        "data-cursor": "hand",
                                        "data-target": remove || undefined,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "close",
                                            size: 10,
                                            stroke: 1.8
                                        }, void 0, false, {
                                            fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            focused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-field__caret"
                            }, value.length, false, {
                                fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                                lineNumber: 83,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    status === 'valid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "ss-field__ok",
                        viewBox: "0 0 16 16",
                        width: "14",
                        height: "14",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M3.5 8.5 6.5 11.5 12.5 4.5",
                            pathLength: 1
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    trailing
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Field.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Field, "quQieLjJrgHpys+CXKnC6yRjLkU=");
_c = Field;
var _c;
__turbopack_context__.k.register(_c, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Segmented.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Segmented",
    ()=>Segmented
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Segmented({ items, value, targets, cursor, className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-seg${className ? ` ${className}` : ''}`,
        style: {
            ['--n']: items.length,
            ...style
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-seg__thumb",
                style: {
                    transform: `translateX(${value * 100}%)`
                }
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Segmented.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            items.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-seg__option",
                    "data-on": i === value || undefined,
                    "data-target": targets?.[i],
                    "data-cursor": cursor,
                    children: o
                }, i, false, {
                    fileName: "[project]/src/vendor/stageshow/controls/Segmented.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Segmented.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Segmented;
var _c;
__turbopack_context__.k.register(_c, "Segmented");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Slot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slot",
    ()=>Slot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Slot({ open, height, gap = 0, dashed, className, style, children, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-slot${className ? ` ${className}` : ''}`,
        "data-open": open || undefined,
        "data-dashed": dashed || undefined,
        style: {
            height: open ? height : 0,
            marginTop: open ? 0 : -gap,
            ...style
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-slot__clip",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-slot__mark",
                    style: {
                        height
                    }
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/controls/Slot.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Slot.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Slot.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Slot;
var _c;
__turbopack_context__.k.register(_c, "Slot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Tabs({ items, value, targets, className, style, ...rest }) {
    _s();
    const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [bar, setBar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        w: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Tabs.useLayoutEffect": ()=>{
            const el = row.current?.children[value + 1];
            if (el) setBar({
                x: el.offsetLeft,
                w: el.offsetWidth
            });
        }
    }["Tabs.useLayoutEffect"], [
        value,
        items.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        ref: row,
        className: `ss-tabs${className ? ` ${className}` : ''}`,
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-tabs__bar",
                style: {
                    transform: `translateX(${bar.x}px) scaleX(${bar.w})`
                }
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/controls/Tabs.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-tabs__tab",
                    "data-on": i === value || undefined,
                    "data-target": targets?.[i],
                    children: t
                }, i, false, {
                    fileName: "[project]/src/vendor/stageshow/controls/Tabs.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/controls/Tabs.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(Tabs, "x/0rAidXppv3CfkeF6qqRbJt5OU=");
_c = Tabs;
var _c;
__turbopack_context__.k.register(_c, "Tabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/Toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Toggle({ on, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-toggle${className ? ` ${className}` : ''}`,
        "data-on": on || undefined,
        role: "switch",
        "aria-checked": on,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-toggle__knob"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/controls/Toggle.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/controls/Toggle.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Toggle;
var _c;
__turbopack_context__.k.register(_c, "Toggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/controls/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Form controls every product demo needs, with the motion done once: a text
// field that types with a caret, a segmented control and tabs whose
// highlight slides, a switch, a badge, a button, a comment draft that posts in place, and a slot that opens a gap in a list.
// One file per part, each importing its own CSS.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Segmented$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Segmented.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Draft$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Draft.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$Slot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/Slot.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cursor",
    ()=>Cursor,
    "ripple",
    ()=>ripple
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/cursors.tsx [app-client] (ecmascript)");
;
;
;
const GLYPHS = {
    pointer: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacPointer"],
    ibeam: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacIbeam"],
    crosshair: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacCrosshair"],
    hand: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacPointingHand"],
    open: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacOpenHand"],
    grab: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacGrab"],
    wait: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacWait"],
    'resize-ns': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacResizeNS"],
    'resize-ew': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacResizeEW"],
    'resize-nwse': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacResizeNWSE"],
    'resize-nesw': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MacResizeNESW"]
};
// Where each glyph's hotspot sits inside its box, so the point is the click.
const HOTSPOT = {
    pointer: {
        x: 7.5,
        y: 5.25
    },
    ibeam: {
        x: 5,
        y: 8
    },
    crosshair: {
        x: 8.5,
        y: 8.5
    },
    hand: {
        x: 9.75,
        y: 3.25
    },
    open: {
        x: 11.7,
        y: 10.4
    },
    grab: {
        x: 12,
        y: 12
    },
    wait: {
        x: 8,
        y: 8
    },
    'resize-ns': {
        x: 10.5,
        y: 10.5
    },
    'resize-ew': {
        x: 10.5,
        y: 10.5
    },
    'resize-nwse': {
        x: 10.5,
        y: 10.5
    },
    'resize-nesw': {
        x: 10.5,
        y: 10.5
    }
};
// The arrow style's pointer: one solid, rounded arrowhead, tip at the hotspot
const ARROW_HOTSPOT = {
    x: 4,
    y: 3
};
function SolidArrow() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 22 22",
        className: "ss-cursor__arrow",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 3 18.5 9.6 11.8 11.8 9.6 18.5Z"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/cursor.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursor.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c = SolidArrow;
function Cursor({ cursorRef, style = 'real', kind }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cursorRef,
        className: "ss-cursor",
        "data-style": style,
        "data-kind": kind,
        "aria-hidden": true,
        children: [
            style === 'touch' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-cursor__streak"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursor.tsx",
                lineNumber: 68,
                columnNumber: 29
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-cursor__press",
                children: [
                    (style === 'circle' || style === 'touch') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-cursor__dot"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/cursor.tsx",
                        lineNumber: 70,
                        columnNumber: 55
                    }, this),
                    style !== 'circle' && style !== 'touch' && Object.keys(GLYPHS).map((k)=>{
                        const arrow = style === 'arrow';
                        // The arrow style has two glyphs: the arrow, and the I-beam over text
                        if (arrow && k !== 'pointer' && k !== 'ibeam') return null;
                        const Glyph = arrow && k === 'pointer' ? SolidArrow : GLYPHS[k];
                        const hot = arrow && k === 'pointer' ? ARROW_HOTSPOT : HOTSPOT[k];
                        const shown = arrow && kind !== 'ibeam' ? 'pointer' : kind;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ss-cursor__glyph",
                            "data-glyph": k,
                            "data-active": k === shown,
                            style: {
                                marginLeft: -hot.x,
                                marginTop: -hot.y,
                                transformOrigin: `${hot.x}px ${hot.y}px`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {}, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/cursor.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        }, k, false, {
                            fileName: "[project]/src/vendor/stageshow/cursor.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/cursor.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/cursor.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c1 = Cursor;
function ripple(root, at) {
    const r = document.createElement('span');
    r.className = 'ss-ripple';
    r.style.left = `${at.x}px`;
    r.style.top = `${at.y}px`;
    root.appendChild(r);
    r.addEventListener('animationend', ()=>r.remove());
}
var _c, _c1;
__turbopack_context__.k.register(_c, "SolidArrow");
__turbopack_context__.k.register(_c1, "Cursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/cursors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// macOS system cursors. Hotspots are listed in HOTSPOT in stage.tsx.
// The hands draw a little larger than the arrow, as they do on macOS.
__turbopack_context__.s([
    "MacCrosshair",
    ()=>MacCrosshair,
    "MacGrab",
    ()=>MacGrab,
    "MacIbeam",
    ()=>MacIbeam,
    "MacOpenHand",
    ()=>MacOpenHand,
    "MacPointer",
    ()=>MacPointer,
    "MacPointingHand",
    ()=>MacPointingHand,
    "MacResizeEW",
    ()=>MacResizeEW,
    "MacResizeNESW",
    ()=>MacResizeNESW,
    "MacResizeNS",
    ()=>MacResizeNS,
    "MacResizeNWSE",
    ()=>MacResizeNWSE,
    "MacWait",
    ()=>MacWait
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function MacPointer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        height: "24",
        width: "24",
        viewBox: "0 0 32 32",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: "translate(10 7)",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z",
                    fill: "#000"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = MacPointer;
function MacIbeam() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "10",
        height: "16",
        viewBox: "0 0 10 16",
        fill: "none",
        overflow: "visible",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 1H7M3 15H7M5 1V15",
                style: {
                    stroke: 'var(--ss-cursor-edge, #fff)'
                },
                strokeWidth: "2.6",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 1H7M3 15H7M5 1V15",
                style: {
                    stroke: 'var(--ss-cursor-line, #000)'
                },
                strokeWidth: "1",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c1 = MacIbeam;
function MacCrosshair() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "17",
        height: "17",
        viewBox: "0 0 17 17",
        fill: "none",
        overflow: "visible",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.5 0V17M0 8.5H17",
                style: {
                    stroke: 'var(--ss-cursor-edge, #fff)'
                },
                strokeWidth: "2.6"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.5 0V17M0 8.5H17",
                style: {
                    stroke: 'var(--ss-cursor-line, #000)'
                },
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = MacCrosshair;
function MacPointingHand() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "26",
        height: "26",
        viewBox: "0 0 32 32",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.6 6a1.7 1.7 0 0 1 3.4 0v6.6a1.3 1.3 0 0 1 2.6 0v.7a1.3 1.3 0 0 1 2.6 0v.7a1.3 1.3 0 0 1 2.6 0V19c0 3.1-2 5.6-5 5.6h-2.6c-2 0-3.3-.9-4.4-2.4l-3.1-4.1c-.6-.9-.4-2 .5-2.5.8-.4 1.7-.2 2.3.5l1.1 1.4V6Z",
                fill: "#fff",
                stroke: "#000",
                strokeWidth: "1.1",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 12.6v3.6M16.6 13.3v3M19.2 14v2.6",
                stroke: "#000",
                strokeWidth: "1",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c3 = MacPointingHand;
function MacOpenHand() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "26",
        height: "26",
        viewBox: "0 0 32 32",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: "translate(7 6)",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeWidth: ".75",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "m11.566 12.734v-3.459"
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "m9.551 12.746-.016-3.473"
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "m7.555 9.305.021 3.426"
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c4 = MacOpenHand;
function MacGrab() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "30",
        height: "30",
        viewBox: "0 0 32 32",
        fill: "none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: "translate(8 9)",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m3.44281398 1.68449726c-.74326136.27630142-1.05584685.8131257-1.07636853 1.38003696-.01344897.37336893.06665513.72649286.23114214 1.18694303-.02596219-.07267623.09676488.29282004.12116236.37362273.05052942.16918921-.4865367-.05865774-.81377307.00741883-.36363321.07113868-.84783757.38332307-1.10006887.79754775-.29643467.48542737-.3109609 1.04368567-.08235979 2.04824266.12491868.54736183.36572145 1.00836814.71076689 1.44594879.15329951.1944118.5713628.64726015.60307236.6875974l.84854343.94062339c.15080214.1358526.25794954.2361946.57590427.5380259.3147558.2987762.4647038.4380078.60308951.555976.05846214.0492474.10784267.1797116.12740685.3736249.01609788.1595565.01049553.3375341-.0090192.5090254-.00674888.0593077-.01325791.1020883-.01698742.1224696-.04189161.228932.13269563.4403386.36541902.4424835.21585671.0019894.38528595.0046546.82216479.0123538.09483476.0016698.09483476.0016698.18993053.0033129 1.16876447.0200186 1.75308289.0147904 2.17807912-.0385723.45429894-.0572869.92650915-.6110188 1.32698393-1.2957591.34289141.6108338.81859723 1.2057867 1.2995685 1.2820532.1510118.0244148.3353555.0322555.548787.0275887.1606725-.0035131.3307029-.0140241.5021961-.0293376.1276907-.0114022.2293359-.0228648.29003-.0307451.2258836-.0293282.373669-.251611.3133108-.4712481-.0130351-.0474332-.0339838-.1345011-.0551094-.2441635-.0245945-.1276687-.0423383-.2523857-.0503381-.365988-.0050217-.0713101-.0059948-.1359317-.0027687-.1918983.0059157-.0980798.0077938-.1530073.0108033-.281125.0010795-.0448938.0010795-.0448938.0024606-.0845172.0054208-.1364475.0233824-.2649146.0815132-.544638.0250088-.1201275.1473169-.352189.3398902-.639435.0571394-.0852302.1195783-.1742239.1864664-.26609712.1272143-.17473362.2641361-.35131772.4011075-.52030772.082051-.10123129.145482-.17695689.1808122-.21807676.2967593-.42378347.612817-1.11823437.7291396-1.52536348.1117407-.39153936.202351-1.12501196.254373-1.81690429.029923-.39968605.0410555-.72381216.0410555-1.23011613.0000742-.09758414.0000742-.09758414.0002975-.17670236.0003569-.11115478.0003569-.11115478.000115-.20711835-.0008934-.15683883-.0055282-.31323355-.0207085-.69507578-.0313109-.81293139-.4771727-1.33911388-1.1344906-1.44058831-.559108-.08631314-1.0586051.08188477-1.2779293.31625977-.0755526.08073733.0036753-.2781823-.2159489-.62316278-.1644465-.25841586-.593184-.58905957-.9209287-.65355552-.335487-.06535532-.73539548-.05811715-1.1017193.00667481-.32093157.05742909-.68608434.33741751-.87176225.64688068-.12411885.20686477.03884667-.00592296-.09368743-.23401341-.18231052-.31422641-.60754287-.59486422-1.01411454-.67799709-.34643562-.07139428-.74182572-.04452925-1.09945614.0633873-.43336319.1291117-1.01795827.61460976-.94899189 1.15552627-.34375-.54091651-1.25026717-.691379-1.97906097-.42111797z",
                    fill: "#000"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m7.31951013 1.62138197c.20710357.04234751.44724204.20083012.51632974.31990811.08404358.1446387.15562749.36413806.21048667.6366124.02933373.14569467.12179446 1.2125285.29383112 1.32370243.41279229.04533731.41279229.04533731.52658055-.12364345.03545705-.07383858.03545705-.07383858.04226523-.1029106.01416796-.06009544.02463332-.12677987.0351322-.21754028l.00854738-.07915386.00047673-.00942804.00327525-.03167185c.01085148-.11424313.04184125-.4312127.05388392-.53034902.03788792-.31189663.08766449-.52757784.13944093-.6138719.0713024-.11883734.31942298-.28274442.43149612-.30279961.2804398-.04960082.58940103-.05519288.82623993-.00905543.1084394.02134018.3709471.22378689.432331.32024744.1291079.20279957.2524316.84889766.3225486 1.4970065-.0102194.04624251-.0102194.04624251.1640069.28984194.5843296-.06677889.5843296-.06677889.5703629-.17490247.0159511-.03856429.0284824-.08294031.045969-.15118961.0423876-.16089067.0697594-.25204451.111066-.35549917.0288558-.07227096.0592914-.13391873.0904889-.18278042.1209187-.19031132.4335712-.319392.7077174-.27707028.2943447.04543991.4816904.26653537.4994912.72869815.0148821.37434892.0193146.5239164.0201469.6700184l-.0004247.37954865c0 .48831141-.0104951.79388164-.0389535 1.17400348-.0480918.63962116-.1348512 1.34192123-.227649 1.66708484-.0946325.33121345-.3766371.95084197-.6003915 1.27298482-.0161892.01580846-.0841508.09694273-.1710333.20413492-.1445842.17838247-.2892181.36491271-.4247891.5511244-.0723398.09936149-.1402862.19620479-.2030964.2898938-.2440054.36396314-.400553.66098894-.4512157.90434304-.0659304.3172546-.0893838.4850003-.0966379.6675968-.0017072.0490782-.0017072.0490782-.002845.096677-.0028064.119476-.004437.1671639-.0097087.2545848-.0052654.091322-.0038193.187354.00332.2887353.0103318.1467182.1058713.3478531.1058713.3478531s-.2321503-.0119819-.3742084-.0088758c-.1718098.0037567-.3147843-.0023244-.4138162-.0183342-.1440353-.0228411-.53014068-.5057331-.7278511-.8821737-.30227042-.5764228-1.03604858-.5484427-1.33684295-.0394061-.26854779.4591613-.65918083.9172326-.7740684.9317199-.37404082.0469647-.94643778.0520862-2.07160079.0328144-.09480875-.0016381-.46003446-.0128683-.64600494-.0157445-.18597048-.0028763.05008807-.1790283.02786486-.399297-.03726222-.36933-.15125405-.6704984-.38877094-.8705429-.12241569-.1043631-.26774964-.2393104-.56509654-.5215613-.33323493-.3163366-.44236499-.4185353-.57290215-.533275l-.80130455-.89071892c-.03955779-.05174211-.45812831-.5051399-.5872217-.6688539-.28069963-.35597842-.47062947-.71959073-.56844755-1.14820437-.18921973-.83150113-.1793328-1.21146622-.00855589-1.49112273.13743587-.2257023.43815377-.4195862.60596039-.45241793.17165981-.03465512.55153059-.01648617.62179422.02229321.09902279.05401056.13357243.07300285.16379074.09097645.03572494.02124891.05965747.03799198.08182912.05708809.03426437.02951139.07235014.07170412.12420211.14044502.03611591.04821025.07806642.1053997.1423779.19304882.06054643.0816627.09183576.12069421.13369221.1590035.28038907.25662728.68391532.03238058.65052057-.32606956-.00567036-.06086415-.02203766-.12694598-.05458621-.23708502-.04356824-.15021272.00433013-.05284275-.26002629-.56642281-.08720664-.16942124-.13955864-.28835362-.17428227-.4046158l-.03412852-.10219113c-.03838756-.11059767-.09558223-.26854489-.12612861-.35199347l-.02009957-.05467087.002.008-.05974804-.17751191c-.09232236-.28807194-.13413567-.51358087-.12645475-.72681781.01040781-.28751553.16037753-.54506871.58790983-.70400047.40142488-.1488616 1.07786076.00117106 1.20581167.27856864.04319814.09369738.08927466.21199471.13900415.35457792l.03930997.11680217c.05539717.16759437.13470873.41493582.13860471.42816881.02724222.08344874.0471839.13860719.06943813.18441246.00217869.06301886.00217869.06301886.35429398.23177937.41699479-.29154152.41699479-.29154152.38019201-.37525838.00571063-.08773482.00758408-.17356287.00965287-.37317647.00242546-.23402898.00423842-.33154773.00994479-.45966208.01316411-.29554918.0437926-.51142116.09291227-.63864415.09160418-.23801371.25279279-.40993649.4432431-.46667832.24458613-.07380253.51465245-.09215236.73323569-.04710649zm1.21356228 4.27672201c-.20710459.00095412-.37422255.16961903-.37326843.37672361l.016 3.473c.00095412.20710459.16961903.37422251.37672361.37326841.20710459-.0009541.37422255-.16961901.37326843-.37672359l-.016-3.473c-.00095412-.20710459-.16961903-.37422255-.37672361-.37326843zm2.03332759.00229602c-.2071068 0-.375.16789322-.375.375v3.459c0 .20710678.1678932.375.375.375s.375-.16789322.375-.375v-3.459c0-.20710678-.1678932-.375-.375-.375zm-4.01399856.02930704c-.20710289.00126946-.37396385.17018863-.3726944.37729152l.021 3.426c.00126946.20710289.17018863.37396384.37729152.37269444.20710289-.0012695.37396385-.17018867.3726944-.37729156l-.021-3.426c-.00126946-.20710289-.17018863-.37396385-.37729152-.3726944z",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c5 = MacGrab;
function MacWait() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "10",
                r: "8",
                stroke: "rgba(0,0,0,0.15)",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 2A8 8 0 0 1 18 10",
                stroke: "black",
                strokeWidth: "2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_c6 = MacWait;
// The resize cursors, measured from macOS's own: two rounded black
// triangles, a 6pt gap between them, each with a 1pt white edge. The pair
// points north-south, and turns for east-west and the two diagonals. Drawn
// at the pointer's scale (a 28pt box at 21px), hotspot at the center.
const RESIZE_TIP = 'M0-8.4 2.55-3.65H-2.55ZM0 8.4 2.55 3.65H-2.55Z';
function MacResize({ turn }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "21",
        height: "21",
        viewBox: "-14 -14 28 28",
        overflow: "visible",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: `rotate(${turn})`,
            strokeLinejoin: "round",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: RESIZE_TIP,
                    style: {
                        fill: 'var(--ss-cursor-edge, #fff)',
                        stroke: 'var(--ss-cursor-edge, #fff)'
                    },
                    strokeWidth: "3.2"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: RESIZE_TIP,
                    style: {
                        fill: 'var(--ss-cursor-line, #000)',
                        stroke: 'var(--ss-cursor-line, #000)'
                    },
                    strokeWidth: "1.2"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/cursors.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/cursors.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = MacResize;
const MacResizeNS = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacResize, {
        turn: 0
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 103,
        columnNumber: 34
    }, ("TURBOPACK compile-time value", void 0));
_c8 = MacResizeNS;
const MacResizeEW = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacResize, {
        turn: 90
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 104,
        columnNumber: 34
    }, ("TURBOPACK compile-time value", void 0));
_c9 = MacResizeEW;
const MacResizeNWSE = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacResize, {
        turn: -45
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 105,
        columnNumber: 36
    }, ("TURBOPACK compile-time value", void 0));
_c10 = MacResizeNWSE;
const MacResizeNESW = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacResize, {
        turn: 45
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/cursors.tsx",
        lineNumber: 106,
        columnNumber: 36
    }, ("TURBOPACK compile-time value", void 0));
_c11 = MacResizeNESW;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "MacPointer");
__turbopack_context__.k.register(_c1, "MacIbeam");
__turbopack_context__.k.register(_c2, "MacCrosshair");
__turbopack_context__.k.register(_c3, "MacPointingHand");
__turbopack_context__.k.register(_c4, "MacOpenHand");
__turbopack_context__.k.register(_c5, "MacGrab");
__turbopack_context__.k.register(_c6, "MacWait");
__turbopack_context__.k.register(_c7, "MacResize");
__turbopack_context__.k.register(_c8, "MacResizeNS");
__turbopack_context__.k.register(_c9, "MacResizeEW");
__turbopack_context__.k.register(_c10, "MacResizeNWSE");
__turbopack_context__.k.register(_c11, "MacResizeNESW");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/ease.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Named curves, as numbers (for tweens on the clock) and as CSS. The video
// ones are measured from product launch films: one house curve for moves
// inside a shot, a steeper one for moves that end in a cut, and an expo-out
// settle for the shot that picks the move up.
__turbopack_context__.s([
    "EASE",
    ()=>EASE,
    "bezier",
    ()=>bezier,
    "css",
    ()=>css,
    "startSlope",
    ()=>startSlope
]);
const EASE = {
    /** Moves inside a shot (push-in, pan, a long cursor trip): peak at about 40%, long soft tail. 1.4 to 2.7 s. */ house: [
        0.65,
        0,
        0.1,
        1
    ],
    /** The outgoing half of a move that ends in a cut: accelerates into it. */ through: [
        0.8,
        0,
        0.1,
        1
    ],
    /** The incoming half after a cut: arrives at speed, settles. 0.6 to 0.8 s (1.6 s for a big pull-out). */ settle: [
        0.05,
        0.85,
        0.3,
        1
    ],
    /** A cursor arriving from off-frame, already moving. */ enter: [
        0.1,
        0.8,
        0.3,
        0.95
    ],
    /** One long cursor trip across the frame. */ trip: [
        0.78,
        0,
        0.17,
        1
    ],
    /** The kit's camera push-in (Camera). */ camera: [
        0.45,
        0,
        0.1,
        1
    ]
};
const css = (e)=>{
    const [a, b, c, d] = typeof e === 'string' ? EASE[e] : e;
    return `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
};
function bezier(e) {
    const [x1, y1, x2, y2] = typeof e === 'string' ? EASE[e] : e;
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const x = (u)=>((ax * u + bx) * u + cx) * u;
    const dx = (u)=>(3 * ax * u + 2 * bx) * u + cx;
    return (t)=>{
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        // Newton, falling back to bisection where the slope is flat
        let u = t;
        for(let i = 0; i < 8; i++){
            const d = dx(u);
            if (Math.abs(d) < 1e-6) break;
            const next = u - (x(u) - t) / d;
            if (next < 0 || next > 1) break;
            u = next;
        }
        if (Math.abs(x(u) - t) > 1e-6) {
            let lo = 0, hi = 1;
            for(let i = 0; i < 40; i++){
                u = (lo + hi) / 2;
                if (x(u) < t) lo = u;
                else hi = u;
            }
        }
        return ((ay * u + by) * u + cy) * u;
    };
}
const startSlope = (e)=>{
    const [x1, y1] = typeof e === 'string' ? EASE[e] : e;
    return x1 > 0 ? y1 / x1 : 1e3;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Components import their own CSS, so no separate style import is required.
// Which unused styles are removed depends on the host bundler.
// kit/stageshow.css explicitly loads every kit style up front.
// The stage: the canvas, the script, the cursor, measuring and playback
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/measure.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/clock.ts [app-client] (ecmascript)");
// Frames: windows, devices and system surfaces, from real geometry
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/window.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$phone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/phone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ios$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/ios.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$messages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/messages.tsx [app-client] (ecmascript)");
// Motion: behaviors that have to hold up frame by frame (motion/, one file per part)
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ease$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/ease.ts [app-client] (ecmascript)");
// Small parts: starting points with quiet defaults; restyle them as the product does (parts/, controls/)
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$controls$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/controls/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$code$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/code.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/chart.tsx [app-client] (ecmascript)");
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
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/ios.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keyboard",
    ()=>Keyboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
// The iOS 27 keyboard, at true points inside a Phone: the Liquid Glass sheet
// with its predictive bar, softly rounded keys with wide gaps, special keys
// the same color as the letters, a ↵ return key, and the emoji and dictation
// buttons below the keys. Measured from iOS 27 screenshots.
const ROWS = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
];
function Glyph({ name }) {
    const common = {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinejoin: 'round',
        strokeLinecap: 'round'
    };
    switch(name){
        case 'shift':
        case 'shift-on':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                width: "22",
                height: "22",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 3.6 3.4 12.4H8v7.4h8v-7.4h4.6Z",
                    ...common,
                    fill: name === 'shift-on' ? 'currentColor' : 'none'
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/ios.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this);
        case 'delete':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 26 24",
                width: "24",
                height: "22",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8.6 4.5h13.2a2.2 2.2 0 0 1 2.2 2.2v10.6a2.2 2.2 0 0 1-2.2 2.2H8.6L2 12Z",
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m11.4 8.6 6.8 6.8m0-6.8-6.8 6.8",
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this);
        case 'return':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                width: "24",
                height: "24",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M19.5 5.5v6.2a2.3 2.3 0 0 1-2.3 2.3H5",
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m9.2 9.6-4.4 4.4 4.4 4.4",
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this);
        case 'emoji':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 28 28",
                width: "28",
                height: "28",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "14",
                        cy: "14",
                        r: "12.5",
                        fill: "currentColor"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "10",
                        cy: "10.6",
                        rx: "1.5",
                        ry: "2.1",
                        fill: "var(--ss-kb-sheet)"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "18",
                        cy: "10.6",
                        rx: "1.5",
                        ry: "2.1",
                        fill: "var(--ss-kb-sheet)"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M7.4 15.2c.9 3.6 3.6 5.8 6.6 5.8s5.7-2.2 6.6-5.8Z",
                        fill: "var(--ss-kb-sheet)"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this);
        case 'mic':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 28",
                width: "22",
                height: "26",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "7.6",
                        y: "2",
                        width: "8.8",
                        height: "15",
                        rx: "4.4",
                        fill: "currentColor"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4.2 12.8a7.8 7.8 0 0 0 15.6 0M12 20.6V26M8 26h8",
                        ...common,
                        strokeWidth: 1.9
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this);
    }
}
_c = Glyph;
function Keyboard({ typed = '', shift, suggestions = [
    'I',
    'The',
    'I’m'
], pressed, dark, className, style }) {
    _s();
    // The key that just landed, shown in its callout for a moment
    const [pop, setPop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(typed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Keyboard.useEffect": ()=>{
            const was = last.current;
            last.current = typed;
            if (typed.length <= was.length || !typed.startsWith(was)) return;
            const ch = typed[typed.length - 1].toLowerCase();
            setPop({
                "Keyboard.useEffect": (p)=>({
                        ch,
                        n: (p?.n ?? 0) + 1
                    })
            }["Keyboard.useEffect"]);
            const id = setTimeout({
                "Keyboard.useEffect.id": ()=>setPop(null)
            }["Keyboard.useEffect.id"], 140);
            return ({
                "Keyboard.useEffect": ()=>clearTimeout(id)
            })["Keyboard.useEffect"];
        }
    }["Keyboard.useEffect"], [
        typed
    ]);
    const auto = typed === '' || /[.!?]\s$/.test(typed);
    const upper = shift ?? auto;
    const down = (k)=>pressed === k || k.length === 1 && pop?.ch === k;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `ss-kb${className ? ` ${className}` : ''}`,
        "data-dark": dark || undefined,
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-kb__suggest",
                children: suggestions.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: w
                    }, i, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            ROWS.map((row, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-kb__row",
                    "data-row": r,
                    children: [
                        r === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-kb__key ss-kb__key--wide",
                            "data-down": down('shift') || undefined,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                name: upper ? 'shift-on' : 'shift'
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/ios.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        row.split('').map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-kb__key",
                                "data-down": down(k) || undefined,
                                children: [
                                    upper ? k.toUpperCase() : k,
                                    pop?.ch === k && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-kb__callout",
                                        "aria-hidden": true,
                                        children: upper ? k.toUpperCase() : k
                                    }, pop.n, false, {
                                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)),
                        r === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-kb__key ss-kb__key--wide",
                            "data-down": down('delete') || undefined,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                name: "delete"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/ios.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    ]
                }, r, true, {
                    fileName: "[project]/src/vendor/stageshow/ios.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-kb__row ss-kb__row--bottom",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-kb__key ss-kb__key--mode",
                        "data-down": down('123') || undefined,
                        children: "123"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-kb__key ss-kb__key--space",
                        "data-down": down('space') || down(' ') || undefined
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-kb__key ss-kb__key--mode",
                        "data-down": down('return') || undefined,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                            name: "return"
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/ios.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-kb__below",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                        name: "emoji"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                        name: "mic"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/ios.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/ios.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/ios.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(Keyboard, "jME4z7v99WVwNoDnDIqdXUxWcSU=");
_c1 = Keyboard;
var _c, _c1;
__turbopack_context__.k.register(_c, "Glyph");
__turbopack_context__.k.register(_c1, "Keyboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/keys.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keycaps",
    ()=>Keycaps,
    "capsOf",
    ()=>capsOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const KEYCAPS = {
    cmd: '⌘',
    shift: '⇧',
    alt: '⌥',
    option: '⌥',
    ctrl: '⌃',
    enter: '↵',
    return: '↵',
    esc: 'esc',
    tab: '⇥',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    backspace: '⌫'
};
const capsOf = (combo)=>combo.split('+').map((k)=>KEYCAPS[k.trim().toLowerCase()] ?? k.trim().toUpperCase());
function Keycaps({ rows, at }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: rows.map((row)=>row && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-keys",
                "data-show": row.show,
                "data-at": at,
                "aria-hidden": true,
                children: row.caps.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "ss-key",
                        "data-down": row.down,
                        children: c
                    }, i, false, {
                        fileName: "[project]/src/vendor/stageshow/keys.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this))
            }, row.id, false, {
                fileName: "[project]/src/vendor/stageshow/keys.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/keys.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Keycaps;
var _c;
__turbopack_context__.k.register(_c, "Keycaps");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LookContext",
    ()=>LookContext,
    "useLook",
    ()=>useLook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const LookContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: 'light',
    palette: 'accent',
    fidelity: 'standard',
    layout: 'wide'
});
const useLook = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LookContext);
};
_s(useLook, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/measure.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Measuring: where things are, in stage pixels. Targets and rects for the
// script API, the drawn scale that turns screen pixels into stage pixels,
// and the rect helpers demos use to place overlays from measured targets.
__turbopack_context__.s([
    "EMPTY",
    ()=>EMPTY,
    "between",
    ()=>between,
    "box",
    ()=>box,
    "contains",
    ()=>contains,
    "drawnScale",
    ()=>drawnScale,
    "inset",
    ()=>inset,
    "layoutRectOf",
    ()=>layoutRectOf,
    "nameOf",
    ()=>nameOf,
    "rectOf",
    ()=>rectOf,
    "sameRects",
    ()=>sameRects,
    "stageSpace",
    ()=>stageSpace,
    "targetRectOf",
    ()=>targetRectOf,
    "thumb",
    ()=>thumb
]);
const EMPTY = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
const nameOf = (t)=>typeof t === 'string' ? t : 'at' in t ? t.at : null;
const inset = (r, by)=>({
        x: r.x - by,
        y: r.y - by,
        width: r.width + by * 2,
        height: r.height + by * 2
    });
const box = (r)=>({
        left: r.x,
        top: r.y,
        width: r.width,
        height: r.height
    });
const between = (a, b)=>({
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y)
    });
const contains = (outer, inner)=>inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.width <= outer.x + outer.width && inner.y + inner.height <= outer.y + outer.height;
const drawnScale = (root, fallback)=>root?.offsetWidth && root.getBoundingClientRect().width / root.offsetWidth || fallback || 1;
function stageSpace(root, fallback) {
    const bounds = root.getBoundingClientRect();
    return {
        left: bounds.left,
        top: bounds.top,
        scale: root.offsetWidth && bounds.width / root.offsetWidth || fallback || 1,
        borderX: root.clientLeft,
        borderY: root.clientTop
    };
}
function rectOf(root, el, fallback, space = stageSpace(root, fallback)) {
    const b = el.getBoundingClientRect();
    const { scale } = space;
    // From the inside of the stage's border, where its absolute children are placed
    return {
        x: (b.left - space.left) / scale - space.borderX,
        y: (b.top - space.top) / scale - space.borderY,
        width: b.width / scale,
        height: b.height / scale
    };
}
function targetRectOf(root, el, fallback, space = stageSpace(root, fallback)) {
    const r = rectOf(root, el, fallback, space);
    const style = getComputedStyle(el);
    const t = style.transform;
    const m = t && t !== 'none' ? t.match(/^matrix\(([^)]+)\)$/) : null;
    if (!m) return r;
    const [a, b, c, d, e, f] = m[1].split(',').map(Number);
    if (b || c || e || f || !a || !d) return r;
    // Unscaled from the drawn box, not offsetWidth, which rounds to whole pixels
    const w = r.width / a;
    const h = r.height / d;
    const [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
    return {
        x: r.x - ox * (1 - a),
        y: r.y - oy * (1 - d),
        width: w,
        height: h
    };
}
// The untransformed layout box: offsets up to the stage, ignoring any scale
// or slide an element is part way through. When nothing between the element
// and the stage is transformed, the drawn box is the layout box, measured
// exactly; offsets round to whole pixels. Otherwise it walks the offsets. An
// offset is measured from the inside of its parent's border and before its
// scroll, so each parent's border is added and its scroll taken off on the way
// up: without that, an element in a bordered box measured a pixel up and left,
// and whatever landed on it (a flyer) jumped that pixel on the handoff.
const transformed = (n)=>{
    const c = getComputedStyle(n);
    return c.transform !== 'none' || c.translate && c.translate !== 'none' || c.scale && c.scale !== 'none' || c.rotate && c.rotate !== 'none';
};
function layoutRectOf(root, el) {
    let still = true;
    for(let a = el; a && a !== root; a = a.parentElement)if (transformed(a)) {
        still = false;
        break;
    }
    if (still) return rectOf(root, el, 1);
    let x = 0;
    let y = 0;
    let n = el;
    while(n && n !== root){
        x += n.offsetLeft;
        y += n.offsetTop;
        const parent = n.offsetParent;
        if (!parent || !root.contains(parent)) break;
        n = parent;
        if (n !== root) {
            x += n.clientLeft - n.scrollLeft;
            y += n.clientTop - n.scrollTop;
        }
    }
    return {
        x,
        y,
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}
function sameRects(a, b) {
    const ka = Object.keys(a);
    if (ka.length !== Object.keys(b).length) return false;
    return ka.every((k)=>{
        const x = a[k];
        const y = b[k];
        return y && Math.abs(x.x - y.x) < 0.5 && Math.abs(x.y - y.y) < 0.5 && Math.abs(x.width - y.width) < 0.5 && Math.abs(x.height - y.height) < 0.5;
    });
}
function thumb(el) {
    const wrap = el.parentElement;
    if (!wrap?.classList.contains('ss-scroller')) return;
    const h = el.clientHeight;
    const total = el.scrollHeight;
    const size = total > h ? Math.max(24, h / total * h) : 0;
    const y = total > h ? el.scrollTop / (total - h) * (h - size) : 0;
    wrap.style.setProperty('--ss-thumb-h', `${size}px`);
    wrap.style.setProperty('--ss-thumb-y', `${y}px`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/messages.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bubble",
    ()=>Bubble,
    "Receipt",
    ()=>Receipt,
    "Stamp",
    ()=>Stamp,
    "Thread",
    ()=>Thread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Roll.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
// Message threads the way messaging apps draw them: runs of bubbles where only
// the last in a run has a tail, a typing indicator that grows into the reply,
// and older messages easing up as new ones arrive. One part for iMessage-style
// threads and for AI chat, where the reply is plain text with no bubble.
// Whether the thread has finished its first render: bubbles there from the
// start are the opening picture and don't rise in; only arrivals do
const Ready = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    current: true
});
// offsetTop rounds to whole pixels. Keep fractional positions through the
// FLIP, including inside a scaled Phone, or a row steps before its glide starts.
function threadTops(root) {
    const style = getComputedStyle(root);
    const extra = style.boxSizing === 'border-box' ? 0 : [
        style.paddingLeft,
        style.paddingRight,
        style.borderLeftWidth,
        style.borderRightWidth
    ].reduce((sum, value)=>sum + (parseFloat(value) || 0), 0);
    const width = parseFloat(style.width) + extra;
    const scale = width && root.getBoundingClientRect().width / width || 1;
    const parents = new Map();
    return new Map(Array.from(root.children, (el)=>{
        const parent = el.offsetParent;
        if (parent && !parents.has(parent)) parents.set(parent, parent.getBoundingClientRect().top);
        return [
            el,
            (el.getBoundingClientRect().top - (parent ? parents.get(parent) : 0)) / scale
        ];
    }));
}
function Thread({ app = 'imessage', className, style, children }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ready = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Where each message is right before this update. Read fresh every time,
    // not remembered from the last update: CSS motion in between (a receipt
    // opening, a bubble growing) moves messages without a render, and a stale
    // position would glide them from somewhere they no longer are
    const tops = ref.current ? threadTops(ref.current) : new Map();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Thread.useEffect": ()=>{
            ready.current = true;
        }
    }["Thread.useEffect"], []);
    // Glide: every message that moved since the last render starts where it
    // was and eases to where it is (FLIP), so an arrival pushes the rest up
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Thread.useLayoutEffect": ()=>{
            const root = ref.current;
            if (!root) return;
            const next = threadTops(root);
            for (const [node, top] of Array.from(next)){
                const el = node;
                const was = tops.get(el);
                if (was === undefined || Math.abs(was - top) < 0.001) continue;
                // Start from where it is on screen: a glide still under way continues
                // from its current offset instead of jumping back
                // (by top, on the layer each row keeps, so a bubble's words neither hop
                // as they land nor step inside the bubble on the way)
                const now = parseFloat(getComputedStyle(el).top) || 0;
                el.style.transition = 'none';
                el.style.top = `${was + now - top}px`;
                void el.offsetWidth;
                el.style.transition = '';
                el.style.top = '';
            }
        }
    }["Thread.useLayoutEffect"]);
    // A tail closes each run: the last bubble before the sender changes
    const list = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].toArray(children).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"]);
    const fromOf = (c)=>c.type === Bubble ? c.props.from : null;
    const out = list.map((c, i)=>{
        if (c.type !== Bubble || c.props.tail !== undefined) return c;
        const next = list.slice(i + 1).find((n)=>n.type === Bubble);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(c, {
            tail: !next || fromOf(next) !== c.props.from
        });
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ready.Provider, {
        value: ready,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: `ss-thread${className ? ` ${className}` : ''}`,
            "data-app": app,
            style: style,
            children: out
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/messages.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/messages.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(Thread, "ZAZiwGXQ0NeanjxSpFNQ8UF5WVw=");
_c = Thread;
function Bubble({ avatar, from, typing = false, tail, source, tapback, className, style, children, ...data }) {
    _s1();
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    const arrived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ready).current).current;
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Whether this bubble grew out of the typing dots (its words fade in as it grows)
    const wasTyping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(typing);
    const grew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    if (wasTyping.current && !typing) grew.current = true;
    wasTyping.current = typing;
    // Morph: measure the bubble before and after the content changes, then ease
    // its box from the old size to the new
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Bubble.useLayoutEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const was = size.current;
            el.style.width = '';
            el.style.height = '';
            // Resolved CSS dimensions retain the fractions offsetWidth/Height round
            // away, so releasing the measured box doesn't resize it at the endpoint.
            const measured = getComputedStyle(el);
            const now = {
                w: parseFloat(measured.width),
                h: parseFloat(measured.height)
            };
            size.current = now;
            if (!was || was.w === now.w && was.h === now.h) return;
            // The words keep their final line breaks while the box grows around them
            const text = el.querySelector('.ss-bubble__text');
            if (text) text.style.width = getComputedStyle(text).width;
            el.style.transition = 'none';
            el.style.width = `${was.w}px`;
            el.style.height = `${was.h}px`;
            void el.offsetWidth;
            el.style.transition = '';
            el.style.width = `${now.w}px`;
            el.style.height = `${now.h}px`;
            const end = {
                "Bubble.useLayoutEffect.end": ()=>{
                    el.style.width = '';
                    el.style.height = '';
                    if (text) text.style.width = '';
                }
            }["Bubble.useLayoutEffect.end"];
            el.addEventListener('transitionend', end, {
                once: true
            });
            return ({
                "Bubble.useLayoutEffect": ()=>el.removeEventListener('transitionend', end)
            })["Bubble.useLayoutEffect"];
        }
    }["Bubble.useLayoutEffect"], [
        typing,
        children
    ]);
    // Form out of the composer: start where the field's words were, in the
    // field's color with no fill, and travel into place as the fill comes in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Bubble.useLayoutEffect": ()=>{
            const el = ref.current;
            if (!el || !arrived || !source) return;
            const stage = el.closest('.ss-stage') ?? document;
            const src = stage.querySelector(`[data-target="${source}"]`) ?? stage.querySelector(source);
            const text = el.querySelector('.ss-bubble__text');
            if (!src || !text) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || el.closest('[data-still]')) return;
            // Measure where it rests, not where an earlier run already moved it
            el.style.transition = 'none';
            el.style.left = el.style.top = '0px';
            const k = el.getBoundingClientRect().width / el.offsetWidth || 1;
            const o = src.getBoundingClientRect();
            const t = text.getBoundingClientRect();
            const dx = (o.left - t.left) / k;
            const dy = (o.top + o.height / 2 - (t.top + t.height / 2)) / k;
            const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
            // Travels by left and top, so the words land without a sub-pixel hop
            el.style.transition = 'none';
            el.style.left = `${dx}px`;
            el.style.top = `${dy}px`;
            el.setAttribute('data-flying', '');
            el.style.color = getComputedStyle(src).color;
            void el.offsetWidth;
            el.style.transition = `left 0.5s ${ease}, top 0.5s ${ease}, color 0.3s ease 0.06s`;
            el.style.left = el.style.top = '';
            el.removeAttribute('data-flying');
            el.style.color = '';
            const end = {
                "Bubble.useLayoutEffect.end": (e)=>{
                    if (e.target !== el || e.propertyName !== 'top') return;
                    el.style.transition = '';
                    el.removeEventListener('transitionend', end);
                }
            }["Bubble.useLayoutEffect.end"];
            el.addEventListener('transitionend', end);
            return ({
                "Bubble.useLayoutEffect": ()=>el.removeEventListener('transitionend', end)
            })["Bubble.useLayoutEffect"];
        }
    }["Bubble.useLayoutEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    let body = children;
    if (fidelity === 'minimal' && typeof children === 'string') body = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ss-bar ss-bubble__bar",
        style: {
            width: Math.min(180, children.length * 5.5)
        }
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/messages.tsx",
        lineNumber: 213,
        columnNumber: 70
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `ss-bubble-row${className ? ` ${className}` : ''}`,
        "data-from": from,
        "data-avatar": avatar ? '' : undefined,
        style: style,
        children: [
            avatar && from !== 'me' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-bubble__avatar",
                "aria-hidden": true,
                children: avatar
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                lineNumber: 216,
                columnNumber: 35
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...data,
                ref: ref,
                className: "ss-bubble",
                "data-arrived": arrived || undefined,
                "data-source": source ? '' : undefined,
                "data-tail": tail || undefined,
                "data-typing": typing || undefined,
                "data-grew": grew.current || undefined,
                "data-tapback": tapback && tapback.show !== false ? '' : undefined,
                children: [
                    tapback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-tapback",
                        "data-show": tapback.show !== false || undefined,
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-tapback__emoji",
                            children: tapback.emoji
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/messages.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/messages.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this),
                    typing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-bubble__dots",
                        "aria-label": "typing",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/messages.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-bubble__text",
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/messages.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "ss-bubble__tail",
                        viewBox: "0 0 18 16",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: from === 'me' ? 'M0 0H12V8.5C12 12.6 14 15 17.5 16C15 16.7 12.2 16.5 9.8 15.3L0 15Z' : 'M18 0H6V8.5C6 12.6 4 15 0.5 16C3 16.7 5.8 16.5 8.2 15.3L18 15Z'
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/messages.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/messages.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/messages.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_s1(Bubble, "ldP95ZF7czUYXWKm8SVhUrI2tVA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"]
    ];
});
_c1 = Bubble;
function Stamp({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `ss-stamp${className ? ` ${className}` : ''}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/messages.tsx",
        lineNumber: 244,
        columnNumber: 10
    }, this);
}
_c2 = Stamp;
function Receipt({ show = true, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `ss-receipt${className ? ` ${className}` : ''}`,
        "data-show": show || undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Roll"], {
                variant: "fade",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/messages.tsx",
                lineNumber: 255,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/messages.tsx",
            lineNumber: 254,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/messages.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_c3 = Receipt;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Thread");
__turbopack_context__.k.register(_c1, "Bubble");
__turbopack_context__.k.register(_c2, "Stamp");
__turbopack_context__.k.register(_c3, "Receipt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Camera.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Camera",
    ()=>Camera
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ease$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/ease.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Camera({ focus, pad = 32, max = 2, duration = 1100, feather = 28, ease: curve = 'camera', children, className }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    // Followed, not read once: a Stage switching to its compact design (or any
    // resize) changes the frame the zoom is worked out in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Camera.useLayoutEffect": ()=>{
            const p = ref.current?.parentElement?.parentElement;
            if (!p) return;
            const read = {
                "Camera.useLayoutEffect.read": ()=>setSize({
                        "Camera.useLayoutEffect.read": (was)=>was.w === p.offsetWidth && was.h === p.offsetHeight ? was : {
                                w: p.offsetWidth,
                                h: p.offsetHeight
                            }
                    }["Camera.useLayoutEffect.read"])
            }["Camera.useLayoutEffect.read"];
            read();
            const ro = new ResizeObserver(read);
            ro.observe(p);
            return ({
                "Camera.useLayoutEffect": ()=>ro.disconnect()
            })["Camera.useLayoutEffect"];
        }
    }["Camera.useLayoutEffect"], []);
    let transform = 'none';
    if (focus && size.w) {
        const s = Math.max(1, Math.min(max, size.w / (focus.width + pad * 2), size.h / (focus.height + pad * 2)));
        const tx = Math.min(0, Math.max(size.w - size.w * s, size.w / 2 - (focus.x + focus.width / 2) * s));
        const ty = Math.min(0, Math.max(size.h - size.h * s, size.h / 2 - (focus.y + focus.height / 2) * s));
        transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    }
    const ease = `${reduced ? 0 : duration}ms ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$ease$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])(curve)}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ss-camera-view",
        "data-zoomed": transform === 'none' ? undefined : true,
        "data-focus": transform === 'none' || !focus ? undefined : `${focus.x},${focus.y},${focus.width},${focus.height}`,
        "data-feather": feather,
        style: {
            ['--ss-feather']: `${transform === 'none' ? 0 : feather}px`,
            transition: `--ss-feather ${ease}`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: `ss-camera${className ? ` ${className}` : ''}`,
            style: {
                transform,
                transition: `transform ${ease}`
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/motion/Camera.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Camera.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(Camera, "x7Vacm1Xe2so1S3GObF75ljVYzs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Camera;
var _c;
__turbopack_context__.k.register(_c, "Camera");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Collapse.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Collapse",
    ()=>Collapse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Collapse({ open, reveal = 'clip', from = 'above', solid = false, children, className, ...rest }) {
    _s();
    // Marked moving from the frame open changes until the height settles
    const [moving, setMoving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Taller than a row: unfolding from the middle would cut its first line
    // while it's already visible, so it reveals from the top and fades in late
    const [tall, setTall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const first = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // What it showed while open, held through the close (decided while
    // rendering, so the first closing frame already shows it)
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(children);
    const [released, setReleased] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    if (open) held.current = children;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Collapse.useLayoutEffect": ()=>{
            const h = inner.current?.scrollHeight ?? 0;
            if (h) setTall(h > 44);
            if (first.current) return void (first.current = false);
            setMoving(true);
            if (!open) setReleased(false);
            // No transitionend without a transition (reduced motion): never leave it moving
            const t = setTimeout({
                "Collapse.useLayoutEffect.t": ()=>{
                    setMoving(false);
                    setReleased(true);
                }
            }["Collapse.useLayoutEffect.t"], 900);
            return ({
                "Collapse.useLayoutEffect": ()=>clearTimeout(t)
            })["Collapse.useLayoutEffect"];
        }
    }["Collapse.useLayoutEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-collapse${className ? ` ${className}` : ''}`,
        "data-open": open || undefined,
        "data-reveal": reveal,
        "data-solid": solid || undefined,
        "data-from": reveal === 'drop' ? from : undefined,
        "data-moving": moving || undefined,
        "data-tall": tall || undefined,
        onTransitionEnd: (e)=>{
            if (e.target === e.currentTarget && e.propertyName === 'grid-template-rows') {
                setMoving(false);
                setReleased(true);
            }
            rest.onTransitionEnd?.(e);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: inner,
            className: "ss-collapse__inner",
            "data-crop": reveal === 'clip' || undefined,
            children: reveal === 'drop' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-collapse__glide",
                children: open || released ? children : held.current
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Collapse.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this) : open || released ? children : held.current
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/motion/Collapse.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Collapse.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(Collapse, "cqNIULvyRhsg1CWbZ07o0grlgU4=");
_c = Collapse;
var _c;
__turbopack_context__.k.register(_c, "Collapse");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Connector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Connector",
    ()=>Connector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Connector({ from, to, route = 'h', show, radius = 8, dots, arrow, label, labelAt = 0.5, dashed, className }) {
    _s();
    // A curve with an arrow ends a little short and runs straight in, so the
    // head sits on a straight run. Over a short gap the curve only levels out in
    // its last pixels, and a head laid on the bend kinks against the line
    const tip = arrow && route === 'curve' ? {
        x: to.x - Math.sign(to.x - from.x) * Math.min(8, Math.abs(to.x - from.x) / 3),
        y: to.y
    } : to;
    const d = tip === to ? elbow(from, to, route, radius) : `${elbow(from, tip, route, radius)}L${to.x} ${to.y}`;
    const ends = dots ?? (arrow ? 'none' : 'end');
    // A dashed line ends on a dash, never a gap short of its target: stretch
    // the 4/4 pattern a hair so a whole number of dashes fits
    const line = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const revealId = `ss-connector-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '')}`;
    const [arrived, setArrived] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Connector.useLayoutEffect": ()=>{
            const el = line.current;
            if (!el) return;
            if (!dashed) {
                el.style.removeProperty('stroke-dasharray');
                return;
            }
            const len = el.getTotalLength();
            const n = Math.max(1, Math.round((len + 4) / 8));
            const dash = (len / (n * 2 - 1)).toFixed(3);
            el.style.strokeDasharray = `${dash} ${dash}`;
        }
    }["Connector.useLayoutEffect"], [
        d,
        dashed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Connector.useLayoutEffect": ()=>{
            const el = dashed ? reveal.current : line.current;
            setArrived(false);
            if (!show || !el) return;
            // The endpoint belongs to the visible line, not a guessed delay. This
            // also works when reduced motion removes the transition, or a host
            // advances its CSS transition one frame at a time.
            const property = 'stroke-dashoffset';
            const check = {
                "Connector.useLayoutEffect.check": ()=>{
                    const style = getComputedStyle(el);
                    const complete = Math.abs(parseFloat(style.strokeDashoffset)) < .0001;
                    if (complete) setArrived(true);
                }
            }["Connector.useLayoutEffect.check"];
            const settle = {
                "Connector.useLayoutEffect.settle": (event)=>{
                    if (event.target === el && event.propertyName === property) check();
                }
            }["Connector.useLayoutEffect.settle"];
            el.addEventListener('transitionend', settle);
            el.addEventListener('transitioncancel', settle);
            check();
            return ({
                "Connector.useLayoutEffect": ()=>{
                    el.removeEventListener('transitionend', settle);
                    el.removeEventListener('transitioncancel', settle);
                }
            })["Connector.useLayoutEffect"];
        }
    }["Connector.useLayoutEffect"], [
        d,
        dashed,
        show
    ]);
    const pts = tip === to ? corners(from, to, route) : [
        ...corners(from, tip, route),
        to
    ];
    const q = pts[pts.length - 1];
    // A straight horizontal/vertical elbow can end with a zero-length leg.
    // Its arrow follows the last real segment, rather than collapsing to a dot.
    const p = pts.slice(0, -1).reverse().find((p)=>Math.hypot(q.x - p.x, q.y - p.y) > .001) ?? q;
    const directionLength = Math.hypot(q.x - p.x, q.y - p.y);
    const len = directionLength || 1;
    const ux = (q.x - p.x) / len;
    const uy = (q.y - p.y) / len;
    const head = `M${q.x - ux * 6 - uy * 4} ${q.y - uy * 6 + ux * 4}L${q.x} ${q.y}L${q.x - ux * 6 + uy * 4} ${q.y - uy * 6 - ux * 4}`;
    const at = along(pts, labelAt);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: `ss-connector${className ? ` ${className}` : ''}`,
                "data-show": show || undefined,
                "data-arrived": show && arrived || undefined,
                "data-dashed": dashed || undefined,
                "aria-hidden": true,
                children: [
                    dashed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                            id: revealId,
                            maskUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                ref: reveal,
                                className: "ss-connector__reveal",
                                d: d,
                                pathLength: "1",
                                style: {
                                    fill: 'none',
                                    stroke: '#fff',
                                    strokeWidth: 8
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                                lineNumber: 104,
                                columnNumber: 73
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                            lineNumber: 104,
                            columnNumber: 26
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                        lineNumber: 104,
                        columnNumber: 20
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        ref: line,
                        className: "ss-connector__line",
                        d: d,
                        pathLength: dashed ? undefined : 1,
                        mask: dashed ? `url(#${revealId})` : undefined
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    arrow && directionLength > .001 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: head,
                        className: "ss-connector__arrow"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                        lineNumber: 106,
                        columnNumber: 45
                    }, this),
                    ends === 'both' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: from.x,
                        cy: from.y,
                        r: 3,
                        className: "ss-connector__dot ss-connector__dot--start"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                        lineNumber: 107,
                        columnNumber: 29
                    }, this),
                    ends !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: to.x,
                        cy: to.y,
                        r: 3,
                        className: "ss-connector__dot"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                        lineNumber: 108,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            label !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-connector__label",
                "data-show": show || undefined,
                "data-arrived": show && arrived || undefined,
                "data-step": typeof label === 'number' || undefined,
                style: {
                    left: at.x,
                    top: at.y
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/motion/Connector.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(Connector, "GNT1EIwqVX5W4oh8iVfL9XXsN1o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = Connector;
// The S-curve's controls: level out of `a` and level into `b`, half way across
function bend(a, b) {
    const m = (a.x + b.x) / 2;
    return [
        {
            x: m,
            y: a.y
        },
        {
            x: m,
            y: b.y
        }
    ];
}
function corners(a, b, route) {
    if (route === 'straight') return [
        a,
        b
    ];
    if (route === 'curve') {
        // Sampled, so a label and the arrow follow the curve itself
        const [c1, c2] = bend(a, b);
        return Array.from({
            length: 25
        }, (_, i)=>{
            const t = i / 24;
            const u = 1 - t;
            return {
                x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
                y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y
            };
        });
    }
    if (route === 'step') {
        const m = (a.x + b.x) / 2;
        return [
            a,
            {
                x: m,
                y: a.y
            },
            {
                x: m,
                y: b.y
            },
            b
        ];
    }
    return route === 'h' ? [
        a,
        {
            x: b.x,
            y: a.y
        },
        b
    ] : [
        a,
        {
            x: a.x,
            y: b.y
        },
        b
    ];
}
function along(pts, f) {
    const segs = pts.slice(1).map((p, i)=>Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
    let left = segs.reduce((n, s)=>n + s, 0) * Math.max(0, Math.min(1, f));
    for(let i = 0; i < segs.length; i++){
        if (left <= segs[i] || i === segs.length - 1) {
            const t = segs[i] ? Math.min(1, left / segs[i]) : 0;
            return {
                x: pts[i].x + (pts[i + 1].x - pts[i].x) * t,
                y: pts[i].y + (pts[i + 1].y - pts[i].y) * t
            };
        }
        left -= segs[i];
    }
    return pts[0];
}
function elbow(a, b, route, r) {
    if (route === 'straight') return `M${a.x} ${a.y}L${b.x} ${b.y}`;
    if (route === 'curve') {
        const [c1, c2] = bend(a, b);
        return `M${a.x} ${a.y}C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.x} ${b.y}`;
    }
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (route === 'step') {
        const m = (a.x + b.x) / 2;
        const k = Math.min(r, Math.abs(dx) / 2, Math.abs(dy) / 2);
        const sx = Math.sign(dx) || 1;
        const sy = Math.sign(dy) || 1;
        if (!k) return `M${a.x} ${a.y}H${m}V${b.y}H${b.x}`;
        return `M${a.x} ${a.y}H${m - sx * k}Q${m} ${a.y} ${m} ${a.y + sy * k}V${b.y - sy * k}Q${m} ${b.y} ${m + sx * k} ${b.y}H${b.x}`;
    }
    const k = Math.min(r, Math.abs(dx), Math.abs(dy));
    const sx = Math.sign(dx) || 1;
    const sy = Math.sign(dy) || 1;
    if (route === 'h') {
        return `M${a.x} ${a.y}H${b.x - sx * k}Q${b.x} ${a.y} ${b.x} ${a.y + sy * k}V${b.y}`;
    }
    return `M${a.x} ${a.y}V${b.y - sy * k}Q${a.x} ${b.y} ${a.x + sx * k} ${b.y}H${b.x}`;
}
var _c;
__turbopack_context__.k.register(_c, "Connector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Count.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Count",
    ()=>Count
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
// Three decades of figures, so a digit can roll on past 9 into 0 (or back
// past 0 into 9) without ever running off the end of the strip
const STRIP = '012345678901234567890123456789'.split('');
const MIDDLE = 10;
// A unit after the figure ("21°", "240ms", "40%", "12 min"): the run of
// letters or signs that ends the text, after its last digit. It gets a box of
// its own, a hair from the digits (a word space when the format writes one),
// so the pair reads as one figure without the unit sitting on the last digit
const unitOf = (text)=>{
    const m = /^(.*\d)(\s*)([^\d\s.,]+)$/.exec(text);
    return m ? {
        head: m[1],
        space: m[2].length > 0,
        unit: m[3]
    } : {
        head: text,
        space: false,
        unit: ''
    };
};
const digitsFromRight = (text)=>{
    const out = [];
    for(let i = text.length - 1; i >= 0; i--){
        const c = text[i];
        if (c >= '0' && c <= '9') out.push(Number(c));
    }
    return out;
};
function Count({ value, format = (n)=>Math.round(n).toLocaleString('en-US'), duration = 700, stagger = 45, className, style, ...rest }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const el = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const text = format(value);
    const { head, space, unit } = unitOf(text);
    const chars = head.split('');
    const digits = digitsFromRight(text);
    // Where each column's strip sits, by column from the right. Starts in the
    // middle decade; a change moves it by the shortest turn in the value's
    // direction, and it is put back in the middle once the roll has settled
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Count.useState": ()=>digits.map({
                "Count.useState": (d)=>MIDDLE + d
            }["Count.useState"])
    }["Count.useState"]);
    const shown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        text,
        value,
        idx
    });
    shown.current.idx = idx;
    const homing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Count.useLayoutEffect": ()=>{
            const node = el.current;
            if (!node) return;
            const prev = shown.current;
            if (prev.text === text) return;
            const instant = reduced || duration <= 0 || !!node.closest('[data-instant], [data-offscreen]');
            const before = digitsFromRight(prev.text);
            const up = value >= prev.value;
            const next = digits.map({
                "Count.useLayoutEffect.next": (d, c)=>{
                    const was = before[c];
                    const at = prev.idx[c];
                    if (was === undefined || at === undefined || instant) return MIDDLE + d;
                    if (was === d) return at;
                    return up ? at + (d - was + 10) % 10 : at - (was - d + 10) % 10;
                }
            }["Count.useLayoutEffect.next"]);
            node.toggleAttribute('data-snap', instant);
            if (!instant) {
                // Settle the old transforms in the browser first, so the new ones transition
                for (const strip of Array.from(node.querySelectorAll('.ss-count__strip')))void getComputedStyle(strip).transform;
                node.setAttribute('data-rolling', '');
            }
            shown.current = {
                text,
                value,
                idx: next
            };
            setIdx(next);
        }
    }["Count.useLayoutEffect"], [
        text,
        value,
        reduced,
        duration
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // Once every digit has landed, put the strips back in the middle decade
    // without a transition, and drop the rolling mark a still waits on
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Count.useEffect": ()=>{
            const node = el.current;
            if (!node || !node.hasAttribute('data-rolling')) return;
            const id = window.setTimeout({
                "Count.useEffect.id": ()=>{
                    node.setAttribute('data-snap', '');
                    homing.current = true;
                    const home = digits.map({
                        "Count.useEffect.id.home": (d)=>MIDDLE + d
                    }["Count.useEffect.id.home"]);
                    shown.current.idx = home;
                    setIdx(home);
                    node.removeAttribute('data-rolling');
                }
            }["Count.useEffect.id"], duration + stagger * digits.length + 60);
            return ({
                "Count.useEffect": ()=>window.clearTimeout(id)
            })["Count.useEffect"];
        }
    }["Count.useEffect"], [
        idx
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // The snap comes off only after the home transforms are in the DOM (a
    // frame callback could run before React commits them, and the strips
    // would then roll a whole decade back to the middle)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Count.useLayoutEffect": ()=>{
            const node = el.current;
            if (!node || !homing.current) return;
            homing.current = false;
            for (const strip of Array.from(node.querySelectorAll('.ss-count__strip')))void getComputedStyle(strip).transform;
            node.removeAttribute('data-snap');
        }
    }["Count.useLayoutEffect"], [
        idx
    ]);
    // Columns are keyed from the right, so a total that gains a digit keeps the
    // digits it already had rolling in place and only the new leading one appears
    let fromRight = digits.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        ref: el,
        className: `ss-count${className ? ` ${className}` : ''}`,
        style: style,
        "aria-label": text,
        children: [
            chars.map((c, i)=>{
                if (c < '0' || c > '9') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-count__char",
                    "aria-hidden": true,
                    children: c
                }, `s${i}-${c}`, false, {
                    fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
                    lineNumber: 124,
                    columnNumber: 40
                }, this);
                const column = --fromRight;
                const at = idx[column] ?? MIDDLE + Number(c);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-count__digit",
                    "data-crop": true,
                    "aria-hidden": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-count__strip",
                        style: {
                            transform: `translateY(${-at}em)`,
                            transitionDuration: `${duration}ms`,
                            transitionDelay: `${column * stagger}ms`
                        },
                        children: STRIP.map((n, k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: n
                            }, k, false, {
                                fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
                                lineNumber: 133,
                                columnNumber: 36
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
                        lineNumber: 129,
                        columnNumber: 13
                    }, this)
                }, `d${column}`, false, {
                    fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this);
            }),
            unit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-count__unit",
                "data-space": space || undefined,
                "aria-hidden": true,
                children: unit
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
                lineNumber: 138,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/motion/Count.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(Count, "evI+aLwIwqmnHimE38efCxgmHCE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Count;
var _c;
__turbopack_context__.k.register(_c, "Count");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Expand.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Expand",
    ()=>Expand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Expand({ open, from, radius = 16, duration, face, children, className, style, ...rest }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Where the parent sits on the stage, and how much it is scaled on screen
    // (the stage's scale, times a phone screen's own)
    const [box, setBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        k: 1,
        r: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Expand.useLayoutEffect": ()=>{
            const p = ref.current?.parentElement;
            const stage = p?.closest('.ss-stage');
            if (!p || !stage) return;
            const sr = stage.getBoundingClientRect();
            const pr = p.getBoundingClientRect();
            const s = sr.width / stage.offsetWidth || 1;
            const k = pr.width / p.offsetWidth || 1;
            // Inside a Phone, open is the display's own corner, not square: the app
            // keeps its rounded corners all the way in and lands under the bezel's
            const r = parseFloat(getComputedStyle(p).getPropertyValue('--ss-screen-r')) || 0;
            setBox({
                w: p.clientWidth,
                h: p.clientHeight,
                x: (pr.left - sr.left) / s + p.clientLeft * k / s,
                y: (pr.top - sr.top) / s + p.clientTop * k / s,
                k: k / s,
                r
            });
        }
    }["Expand.useLayoutEffect"], [
        from.x,
        from.y,
        from.width,
        from.height
    ]);
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    // Only opening and closing animate. A new `from` while the state holds (the
    // first measure, a re-measure) is applied at once: animating it would sweep
    // the clip in from wherever the unmeasured rect put it, the stage's top left.
    // A card not measured yet (no size) isn't shown at all
    const key = `${open}|${from.x}|${from.y}|${from.width}|${from.height}|${box.w}|${box.h}|${box.x}|${box.y}`;
    const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        open,
        key
    });
    // Open, the target doesn't depend on `from`, so a re-measure mid-open (the
    // tapped notification easing back from its press) must not cut it short
    const moving = last.current.key === key || last.current.open !== open || open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Expand.useLayoutEffect": ()=>{
            last.current = {
                open,
                key
            };
        }
    }["Expand.useLayoutEffect"]);
    const unmeasured = !open && (!from.width || !from.height || !box.w);
    // `from` in the parent's own pixels
    const x = (from.x - box.x) / box.k;
    const y = (from.y - box.y) / box.k;
    const w = from.width / box.k;
    const h = from.height / box.k;
    const r = Math.max(0, box.w - x - w);
    const b = Math.max(0, box.h - y - h);
    // A card: a quick start that settles long, like a UIKit spring with no
    // overshoot. A launch is gentler and longer: with the card's curve the app
    // is nearly full screen within a tenth of a second, which reads as a jump
    const curve = face ? 'cubic-bezier(0.25, 0.6, 0.2, 1)' : 'cubic-bezier(0.3, 0.75, 0.1, 1)';
    const ms = reduced ? 0 : duration ?? (face ? 640 : 520);
    const ease = `${ms}ms ${curve}`;
    if (face) {
        // The app at full size, scaled by the card's width onto the card, its
        // height clipped to the card's (in the window's own pixels)
        const s = box.w ? w / box.w : 1;
        const clipH = Math.max(0, box.h - h / s);
        const shut = {
            transform: `translate(${x}px, ${y}px) scale(${s})`,
            clipPath: `inset(0px 0px ${clipH}px 0px round ${radius / s}px)`
        };
        const wide = {
            transform: 'translate(0px, 0px) scale(1)',
            clipPath: `inset(0px 0px 0px 0px round ${box.r}px)`
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...rest,
            ref: ref,
            className: `ss-expand${className ? ` ${className}` : ''}`,
            "data-open": open || undefined,
            "data-launch": "",
            style: {
                ...open ? wide : shut,
                ['--ss-expand-ms']: `${ms}ms`,
                ['--ss-expand-ease']: curve,
                ...moving ? null : {
                    transition: 'none'
                },
                ...unmeasured ? {
                    visibility: 'hidden'
                } : null,
                ...style
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-expand__content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/motion/Expand.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-expand__face",
                    style: {
                        width: w,
                        height: h,
                        transform: `scale(${1 / s})`
                    },
                    children: face
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/motion/Expand.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/motion/Expand.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    const clip = open ? `inset(0px 0px 0px 0px round ${box.r}px)` : `inset(${y}px ${r}px ${b}px ${x}px round ${radius}px)`;
    // Retain the same composited content layer at both ends, so the text does
    // not re-rasterise when the card finishes opening or closing.
    const ride = {
        transform: `translate3d(0, ${open ? 0 : y}px, 0)`,
        transition: moving ? `transform ${ease}` : 'none'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        ref: ref,
        className: `ss-expand${className ? ` ${className}` : ''}`,
        "data-open": open || undefined,
        style: {
            clipPath: clip,
            transition: moving ? `clip-path ${ease}` : 'none',
            visibility: unmeasured ? 'hidden' : undefined,
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ss-expand__content",
            style: ride,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/motion/Expand.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Expand.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(Expand, "qOmjz0KRqAxrinExb98zK2rywMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Expand;
var _c;
__turbopack_context__.k.register(_c, "Expand");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Fly.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fly",
    ()=>Fly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/util.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Fly({ from: liveFrom, to: liveTo, go, held: shownAtRest = false, duration = 750, children, className }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    // Both ends are fixed at take-off. Measured live, they move under the flight
    // (a closing menu scales the start away) and every change restarts the
    // transition: a creep near the end, then a jump when the real one appears.
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!go) held.current = null;
    else if (!held.current) held.current = {
        from: liveFrom,
        to: liveTo
    };
    const { from: start, to } = held.current ?? {
        from: liveFrom,
        to: liveTo
    };
    // An empty start (nothing measured yet) takes the landing size, so the
    // flyer never grows from a point
    const from = start.width ? start : {
        ...start,
        width: to.width || 1,
        height: to.height || 1
    };
    const at = go ? to : from;
    const ms = reduced ? 0 : duration;
    const sx = at.width / (from.width || 1);
    // A child that doesn't fill the start box takes off or lands at the wrong size
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Fly.useEffect": ()=>{
            const el = body.current?.firstElementChild;
            if (!el || !start.width) return;
            if (Math.abs(el.offsetWidth - from.width) > 1 || Math.abs(el.offsetHeight - from.height) > 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])(`Fly: the child is ${el.offsetWidth}×${el.offsetHeight} but takes off from ${Math.round(from.width)}×${Math.round(from.height)}. Draw it at the start size, and pass the landing element's own rect as \`to\`.`);
        }
    }["Fly.useEffect"], [
        from.width,
        from.height,
        start.width
    ]);
    return(// Horizontal and vertical travel on slightly different curves make a gentle
    // arc. Far apart curves (a fast-out x) read as a skid sideways, then a drop.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `ss-fly${className ? ` ${className}` : ''}`,
        "data-go": go || undefined,
        "data-held": shownAtRest || undefined,
        style: {
            visibility: go || shownAtRest ? undefined : 'hidden',
            left: from.x,
            top: from.y,
            width: from.width,
            height: from.height,
            transform: `translateX(${at.x - from.x}px)`,
            // Two tracks make the arc: x on a plain ease, y and scale on a softer
            // start and a long settle, so a thumbnail growing into a card reads as
            // one smooth swell, not a lurch
            transition: `transform ${ms}ms cubic-bezier(0.35, 0, 0.2, 1)`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                transform: `translateY(${at.y - from.y}px) scale(${sx})`,
                transformOrigin: '0 0',
                transition: `transform ${ms}ms cubic-bezier(0.3, 0.6, 0.15, 1)`
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: body,
                className: "ss-fly__lift",
                style: go ? {
                    animationDuration: `${ms}ms`
                } : undefined,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Fly.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/motion/Fly.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Fly.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this));
}
_s(Fly, "j1H2RlafzgUPjcezrsB6Q/NA/Vk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Fly;
var _c;
__turbopack_context__.k.register(_c, "Fly");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Follow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Follow",
    ()=>Follow,
    "cellOf",
    ()=>cellOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Follow({ to, stiffness = 0.25, className, style, children, ...rest }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const el = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(to);
    target.current = to;
    // The loop sleeps once it has settled; a new target wakes it
    const wake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "Follow.useRef[wake]": ()=>{}
    }["Follow.useRef[wake]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Follow.useLayoutEffect": ()=>{
            let id = 0;
            let running = false;
            const k = stiffness;
            const damp = 2 * Math.sqrt(k) * 0.95;
            const frame = 1000 / 60;
            const keys = [
                'x',
                'y',
                'width',
                'height'
            ];
            let previous = performance.now();
            let remainder = 0;
            let simulation = cur.current ? {
                ...cur.current
            } : null;
            let velocity = {
                ...vel.current
            };
            let priorTarget = null;
            const integrate = {
                "Follow.useLayoutEffect.integrate": (c, v, t)=>{
                    for (const key of keys){
                        v[key] += (t[key] - c[key]) * k - v[key] * damp;
                        c[key] += v[key];
                    }
                }
            }["Follow.useLayoutEffect.integrate"];
            const step = {
                "Follow.useLayoutEffect.step": (time = performance.now())=>{
                    const elapsed = Math.min(100, Math.max(0, time - previous));
                    previous = time;
                    const t = target.current;
                    const node = el.current;
                    // Hidden: forget where it was, so it next appears on its target rather than sliding in from the last one
                    if (!t || reduced) {
                        cur.current = t ? {
                            ...t
                        } : null;
                        vel.current = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        simulation = cur.current ? {
                            ...cur.current
                        } : null;
                        velocity = {
                            ...vel.current
                        };
                        remainder = 0;
                    }
                    if (node && t) {
                        if (!cur.current) cur.current = {
                            ...t
                        };
                        if (!simulation || !priorTarget || keys.some({
                            "Follow.useLayoutEffect.step": (key)=>priorTarget[key] !== t[key]
                        }["Follow.useLayoutEffect.step"])) {
                            // Retarget from the last rendered position and velocity, including
                            // a partial simulation step, so an interruption cannot rewind.
                            simulation = {
                                ...cur.current
                            };
                            velocity = {
                                ...vel.current
                            };
                            remainder = 0;
                        }
                        priorTarget = {
                            ...t
                        };
                        const c = cur.current;
                        const v = vel.current;
                        // Preserve the existing 60Hz spring trajectory. Interpolate its next
                        // step at higher refresh rates instead of integrating faster per RAF.
                        remainder += elapsed;
                        while(remainder >= frame - 1e-6){
                            integrate(simulation, velocity, t);
                            remainder = Math.max(0, remainder - frame);
                        }
                        const next = {
                            ...simulation
                        }, nextVelocity = {
                            ...velocity
                        };
                        integrate(next, nextVelocity, t);
                        const part = remainder / frame;
                        for (const key of keys){
                            c[key] = simulation[key] + (next[key] - simulation[key]) * part;
                            v[key] = velocity[key] + (nextVelocity[key] - velocity[key]) * part;
                            if (Math.abs(t[key] - c[key]) < 0.05 && Math.abs(v[key]) < 0.05) {
                                c[key] = t[key];
                                v[key] = 0;
                            }
                        }
                        node.style.transform = `translate(${c.x}px, ${c.y}px)`;
                        node.style.width = `${c.width}px`;
                        node.style.height = `${c.height}px`;
                    }
                    const c = cur.current;
                    const v = vel.current;
                    const settled = !t || !node || c !== null && v.x === 0 && v.y === 0 && v.width === 0 && v.height === 0 && c.x === t.x && c.y === t.y && c.width === t.width && c.height === t.height;
                    running = !settled;
                    if (running) id = requestAnimationFrame(step);
                }
            }["Follow.useLayoutEffect.step"];
            wake.current = ({
                "Follow.useLayoutEffect": ()=>{
                    if (reduced || !target.current || !cur.current) {
                        // Initial placement and reappearance are layout, not spring motion.
                        // A paused host must not need Step just to reveal the first target.
                        cancelAnimationFrame(id);
                        running = false;
                        step();
                        return;
                    }
                    if (running || keys.every({
                        "Follow.useLayoutEffect": (key)=>cur.current[key] === target.current[key] && vel.current[key] === 0
                    }["Follow.useLayoutEffect"])) return;
                    running = true;
                    previous = performance.now();
                    id = requestAnimationFrame(step);
                }
            })["Follow.useLayoutEffect"];
            wake.current();
            return ({
                "Follow.useLayoutEffect": ()=>{
                    running = false;
                    cancelAnimationFrame(id);
                    wake.current = ({
                        "Follow.useLayoutEffect": ()=>{}
                    })["Follow.useLayoutEffect"];
                }
            })["Follow.useLayoutEffect"];
        }
    }["Follow.useLayoutEffect"], [
        stiffness,
        reduced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Follow.useLayoutEffect": ()=>wake.current()
    }["Follow.useLayoutEffect"], [
        to?.x,
        to?.y,
        to?.width,
        to?.height,
        !to
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        ref: el,
        className: `ss-follow${className ? ` ${className}` : ''}`,
        "data-show": to ? true : undefined,
        style: {
            ...style,
            ...reduced ? {
                transition: 'none'
            } : null
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Follow.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(Follow, "H4DoHvFGlWROi+Yn3UAb+W8QKKc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Follow;
function cellOf(value, size, prev, hysteresis = 0.2) {
    const raw = Math.floor(value / size);
    if (prev === null || raw === prev) return raw;
    const edge = raw > prev ? (prev + 1) * size : prev * size;
    return Math.abs(value - edge) > size * hysteresis ? raw : prev;
}
var _c;
__turbopack_context__.k.register(_c, "Follow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Popover({ show, origin = 'top left', className, style, children, ...rest }) {
    _s();
    // Closing, it keeps the place and contents it had open: a scene that resets
    // the anchor or the items as it closes would otherwise make the fading
    // popover jump or change under the eye. Once it has faded, it lets go and
    // takes the live contents instantly, out of sight, so a change made while
    // it was hidden (a list reset for the next loop) doesn't play when it reopens.
    const held = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [released, setReleased] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Popover.useEffect": ()=>{
            if (show) return setReleased(false);
            const t = setTimeout({
                "Popover.useEffect.t": ()=>setReleased(true)
            }["Popover.useEffect.t"], 320);
            return ({
                "Popover.useEffect": ()=>clearTimeout(t)
            })["Popover.useEffect"];
        }
    }["Popover.useEffect"], [
        show
    ]);
    if (show) held.current = {
        style,
        children,
        origin
    };
    const shown = show || released || !held.current ? {
        style,
        children,
        origin
    } : held.current;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-popover${className ? ` ${className}` : ''}`,
        "data-show": show || undefined,
        "data-instant": !show && released || undefined,
        style: {
            ['--ss-popover-origin']: shown.origin,
            ...shown.style
        },
        children: shown.children
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Popover.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Popover, "mzKsrB9S8zva+O2nIEeUsDWiEKc=");
_c = Popover;
var _c;
__turbopack_context__.k.register(_c, "Popover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Roll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Roll",
    ()=>Roll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function Roll({ delay = 0, children, ...rest }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [held, setHeld] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(children);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Roll.useEffect": ()=>{
            if (!delay || reduced) return setHeld(children);
            const id = setTimeout({
                "Roll.useEffect.id": ()=>setHeld(children)
            }["Roll.useEffect.id"], delay);
            return ({
                "Roll.useEffect": ()=>clearTimeout(id)
            })["Roll.useEffect"];
        }
    }["Roll.useEffect"], [
        children,
        delay,
        reduced
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RollNow, {
        ...rest,
        children: delay && !reduced ? held : children
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
_s(Roll, "WSgrRFDtjEGjsJ5gkE8uvREr8T8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Roll;
function RollNow({ children, stagger = 45, variant = 'roll', align, className, style }) {
    _s1();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: children,
        head: 0,
        tail: 0,
        old: '',
        key: 0,
        numeric: true
    });
    const mid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fromWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Inline text has no computed width. Use the line box's scale to convert
    // its painted width back to local CSS pixels, including inside a Phone or
    // Camera. offsetWidth rounds away the fractions that keep a suffix still.
    const rootWidth = ()=>{
        if (!root.current || !mid.current) return 0;
        const height = parseFloat(getComputedStyle(mid.current).height);
        const scale = height > 0 ? mid.current.getBoundingClientRect().height / height : 1;
        return root.current.getBoundingClientRect().width / (scale || 1);
    };
    const [side, setSide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(align ?? 'start');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "RollNow.useLayoutEffect": ()=>{
            if (align) return setSide(align);
            const el = root.current;
            if (!el?.parentElement) return;
            // Look through wrappers that only hold the roll (a <b>, a value span):
            // they size to it, so where the wrapper sits is where the text pins
            let box = el;
            while(box.parentElement && box.parentElement.childElementCount === 1 && Math.abs(box.parentElement.getBoundingClientRect().width - box.getBoundingClientRect().width) < 1)box = box.parentElement;
            const parent = box.parentElement;
            if (!parent) return;
            const p = getComputedStyle(parent);
            const flex = /flex/.test(p.display) && p.flexDirection.startsWith('row');
            // Pushed to the right edge by an auto margin (or anything else) reads the
            // same from the layout: flush with the row's end, slack before it
            const pushed = {
                "RollNow.useLayoutEffect.pushed": ()=>{
                    const prev = box.previousElementSibling;
                    const r = box.getBoundingClientRect();
                    const pr = parent.getBoundingClientRect();
                    const flush = Math.abs(pr.right - parseFloat(p.paddingRight) - parseFloat(p.borderRightWidth) - r.right) < 1;
                    const slack = prev ? r.left - prev.getBoundingClientRect().right - (parseFloat(p.columnGap) || 0) : 0;
                    return flush && slack > 1;
                }
            }["RollNow.useLayoutEffect.pushed"];
            const end = /right|end/.test(getComputedStyle(el).textAlign) || flex && box === parent.lastElementChild && (/space-between|flex-end|^end/.test(p.justifyContent) || pushed());
            setSide(end ? 'end' : 'start');
        }
    }["RollNow.useLayoutEffect"], [
        align
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RollNow.useEffect": ()=>{
            if (reduced) {
                setView({
                    text: children,
                    head: 0,
                    tail: 0,
                    old: '',
                    key: 0,
                    numeric: true
                });
                return;
            }
            if (view.text === children) return;
            const a = view.text;
            const b = children;
            let head = 0;
            while(head < a.length && head < b.length && a[head] === b[head])head++;
            let tail = 0;
            while(tail < a.length - head && tail < b.length - head && a[a.length - 1 - tail] === b[b.length - 1 - tail])tail++;
            // Digits can change one at a time; words can't. Snap a wordy change out to
            // whole words.
            const numeric = /^[\d.,$€£%+\-−\s]*$/.test(a.slice(head, a.length - tail) + b.slice(head, b.length - tail));
            if (!numeric) {
                const space = {
                    "RollNow.useEffect.space": (c)=>c === undefined || /\s/.test(c)
                }["RollNow.useEffect.space"];
                while(head > 0 && !space(b[head - 1]) && !space(b[head]))head--;
                while(tail > 0 && !space(b[b.length - tail - 1]) && !space(b[b.length - tail]))tail--;
            }
            const key = view.key + 1;
            // Capture the rendered width before repartitioning head/middle/tail.
            // During interruption this is between endpoints, not the old target.
            fromWidth.current = rootWidth();
            setView({
                text: b,
                head,
                tail,
                old: a.slice(head, a.length - tail),
                key,
                numeric
            });
            const id = setTimeout({
                "RollNow.useEffect.id": ()=>setView({
                        "RollNow.useEffect.id": (v)=>v.key === key ? {
                                ...v,
                                old: ''
                            } : v
                    }["RollNow.useEffect.id"])
            }["RollNow.useEffect.id"], 700);
            return ({
                "RollNow.useEffect": ()=>clearTimeout(id)
            })["RollNow.useEffect"];
        }
    }["RollNow.useEffect"], [
        children,
        reduced
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // While the old and new text swap, the box starts at the old text's width,
    // opens to the wider of the two so neither runs into what follows, then
    // settles to the new width. Set on the element directly so the starting
    // width never animates from a stale value.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "RollNow.useLayoutEffect": ()=>{
            const el = mid.current;
            const live = el?.querySelector('[data-live]');
            const out = el?.querySelector('[data-out]');
            if (!el || !live) return;
            const width = {
                "RollNow.useLayoutEffect.width": (node)=>parseFloat(getComputedStyle(node).width) || 0
            }["RollNow.useLayoutEffect.width"];
            const next = width(live);
            if (reduced || view.key === 0) {
                el.style.transition = 'none';
                el.style.width = `${next}px`;
                fromWidth.current = null;
                return;
            }
            // Repartitioning moves unchanged text out of the grid. Subtract its new
            // width from the old rendered total so that move itself changes no room.
            const affixes = rootWidth() - width(el);
            const previous = fromWidth.current;
            fromWidth.current = null;
            const start = previous === null ? out ? width(out) : 0 : Math.max(0, previous - affixes);
            el.style.transition = 'none';
            el.style.width = `${start}px`;
            void el.offsetWidth;
            el.style.transition = '';
            // A control's label: the box and the crossfade are one move, straight to
            // the new width, and the box clips the old label as it goes
            if (variant === 'fade') {
                el.style.width = `${next}px`;
                return;
            }
            const widest = Math.max(next, start, out ? width(out) : 0);
            el.style.width = `${widest}px`;
            if (widest === next) return;
            const id = setTimeout({
                "RollNow.useLayoutEffect.id": ()=>el.style.width = `${next}px`
            }["RollNow.useLayoutEffect.id"], 360);
            return ({
                "RollNow.useLayoutEffect": ()=>clearTimeout(id)
            })["RollNow.useLayoutEffect"];
        }
    }["RollNow.useLayoutEffect"], [
        view.key,
        reduced,
        reduced ? children : undefined
    ]);
    // The settled render must not wait for an effect: a Stage poster can
    // arrive in the same commit that disables its CSS animations.
    const { text, head, tail, old, key, numeric } = reduced ? {
        text: children,
        head: 0,
        tail: 0,
        old: '',
        key: 0,
        numeric: true
    } : view;
    const now = text.slice(head, text.length - tail);
    // Characters for numbers, whole words (with their spaces) for text
    const units = numeric ? now.split('') : now.split(/(?<=\s)/);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: root,
        className: `ss-roll${className ? ` ${className}` : ''}`,
        "data-variant": variant,
        "data-align": side,
        style: style,
        children: [
            text.slice(0, head),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: mid,
                className: "ss-roll__mid",
                children: [
                    old && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-roll__item",
                        "data-out": true,
                        children: old
                    }, `o${key}`, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-roll__item",
                        "data-live": true,
                        children: key > 0 && variant === 'fade' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-roll__char",
                            children: now
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
                            lineNumber: 178,
                            columnNumber: 15
                        }, this) : key > 0 ? units.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-roll__char",
                                style: {
                                    animationDelay: `${i * stagger}ms`
                                },
                                children: c
                            }, i, false, {
                                fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
                                lineNumber: 181,
                                columnNumber: 17
                            }, this)) : now
                    }, `n${key}`, false, {
                        fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            text.slice(text.length - tail)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/motion/Roll.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s1(RollNow, "MtQb2nIweEnopkXyMZ18E8ewDoI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = RollNow;
var _c, _c1;
__turbopack_context__.k.register(_c, "Roll");
__turbopack_context__.k.register(_c1, "RollNow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Scroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Scroll",
    ()=>Scroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/measure.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Scroll({ name, bar = 'overlay', className, style, children, ...rest }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Scroll.useLayoutEffect": ()=>{
            if (ref.current) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thumb"])(ref.current);
        }
    }["Scroll.useLayoutEffect"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-scroller${className ? ` ${className}` : ''}`,
        "data-bar": bar,
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: "ss-scroll",
                "data-target": name,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Scroll.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            bar !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-scroller__thumb"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Scroll.tsx",
                lineNumber: 21,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/motion/Scroll.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Scroll, "JkctLsMDw5W2MbVlMaFRM76c/8g=");
_c = Scroll;
var _c;
__turbopack_context__.k.register(_c, "Scroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/States.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "States",
    ()=>States
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function States({ value, states, align = 'center', className, style, ...rest }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-states${className ? ` ${className}` : ''}`,
        "data-align": align,
        "data-reduced": reduced || undefined,
        style: style,
        children: Object.keys(states).map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-states__item",
                "data-on": k === value || undefined,
                "aria-hidden": k !== value || undefined,
                children: states[k]
            }, k, false, {
                fileName: "[project]/src/vendor/stageshow/motion/States.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/States.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(States, "/JSVQSdN2dVjcj5yyuX/KnOybKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = States;
var _c;
__turbopack_context__.k.register(_c, "States");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Stream.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stream",
    ()=>Stream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Stream({ text, count, mark, className, style, ...rest }) {
    const words = text.split(' ');
    const marked = words.map((w, i)=>!!mark?.(w, i));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-stream${className ? ` ${className}` : ''}`,
        style: style,
        children: words.map((w, i)=>{
            const join = marked[i] && marked[i + 1];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-stream__w",
                        "data-on": i < count || undefined,
                        "data-mark": marked[i] || undefined,
                        "data-join": join || undefined,
                        "data-joined": marked[i] && marked[i - 1] || undefined,
                        children: [
                            w,
                            join ? ' ' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/motion/Stream.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this),
                    !join && i < words.length - 1 ? ' ' : ''
                ]
            }, i, true, {
                fileName: "[project]/src/vendor/stageshow/motion/Stream.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/motion/Stream.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Stream;
var _c;
__turbopack_context__.k.register(_c, "Stream");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/Swap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Swap",
    ()=>Swap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Swap({ id, children, duration = 450, className, style, ...rest }) {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [prev, setPrev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // The id on screen, kept in state so a render React runs twice (Strict
    // Mode) still hands the old content to the fading copy
    const [shownId, setShownId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(id);
    const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(children);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // True while a swap's size transition runs: measuring then would cancel it
    const swapping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    swapping.current = !reduced && prev !== null;
    if (shownId !== id) {
        // The old words keep the width they had, so they never rewrap as the box
        // narrows under them
        setPrev(reduced ? null : {
            id: shownId,
            node: last.current,
            w: size?.w
        });
        setShownId(id);
    }
    // The content last committed: written after commit, never during a render
    // React may repeat, so the fading copy always holds the old words
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Swap.useLayoutEffect": ()=>{
            last.current = children;
        }
    }["Swap.useLayoutEffect"]);
    // Measured on every change of id, and kept current after: a font or the
    // demo's own CSS arriving late changes the size without a swap
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Swap.useLayoutEffect": ()=>{
            const el = inner.current;
            if (!el) return;
            // Measured with the box at its natural size for one synchronous read: the
            // box still holds the old size, and longer text measured inside it would
            // be squeezed to the old width. Restored before the browser paints. The
            // observer skips while a swap runs: switching the transition off for the
            // read would cancel the height animation and snap the box to its end.
            const measure = {
                "Swap.useLayoutEffect.measure": (observed)=>{
                    const b = box.current;
                    if (!b || observed && swapping.current) return;
                    const { width, height, transition } = b.style;
                    const own = {
                        width: el.style.width,
                        maxWidth: el.style.maxWidth
                    };
                    b.style.transition = 'none';
                    b.style.width = '';
                    b.style.height = '';
                    el.style.width = '';
                    el.style.maxWidth = '';
                    // The exact used size, not offsetWidth: that rounds down, and a label
                    // a fraction of a pixel wider than its box wraps onto two lines.
                    // Computed style also ignores the stage's own scale
                    const cs = getComputedStyle(el);
                    const w = parseFloat(cs.width) || 0;
                    const h = parseFloat(cs.height) || 0;
                    el.style.width = own.width;
                    el.style.maxWidth = own.maxWidth;
                    b.style.width = width;
                    b.style.height = height;
                    void b.offsetWidth;
                    b.style.transition = transition;
                    setSize({
                        "Swap.useLayoutEffect.measure": (s)=>s && s.w === w && s.h === h ? s : {
                                w,
                                h
                            }
                    }["Swap.useLayoutEffect.measure"]);
                }
            }["Swap.useLayoutEffect.measure"];
            measure();
            const ro = new ResizeObserver({
                "Swap.useLayoutEffect": ()=>measure(true)
            }["Swap.useLayoutEffect"]);
            ro.observe(el);
            return ({
                "Swap.useLayoutEffect": ()=>ro.disconnect()
            })["Swap.useLayoutEffect"];
        }
    }["Swap.useLayoutEffect"], [
        id,
        reduced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Swap.useEffect": ()=>{
            if (!prev) return;
            if (reduced) {
                setPrev(null);
                return;
            }
            const t = setTimeout({
                "Swap.useEffect.t": ()=>setPrev(null)
            }["Swap.useEffect.t"], duration);
            return ({
                "Swap.useEffect": ()=>clearTimeout(t)
            })["Swap.useEffect"];
        }
    }["Swap.useEffect"], [
        prev,
        duration,
        reduced
    ]);
    // Narrowing, the box waits while the old words fade, so they are never cut
    // by its edge mid-word; widening, it opens at once for the new ones
    const shrink = !!(prev && size && prev.w !== undefined && size.w < prev.w);
    // The soft edge is for words passing a moving edge: an image swapped for
    // one the same size keeps its own edges
    const resizing = !!(prev && size && prev.w !== undefined && size.w !== prev.w);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        ref: box,
        className: `ss-swap${className ? ` ${className}` : ''}`,
        "data-swapping": !reduced && resizing || undefined,
        style: {
            width: size?.w,
            height: size?.h,
            transition: !reduced && prev ? `width ${duration}ms cubic-bezier(0.25, 0.8, 0.25, 1) ${shrink ? Math.round(duration * 0.5) : 0}ms, height ${duration}ms cubic-bezier(0.25, 0.8, 0.25, 1)` : 'none',
            ...style
        },
        children: [
            !reduced && prev && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-swap__out",
                style: {
                    animationDuration: `${duration * 0.5}ms`,
                    width: prev.w,
                    maxWidth: prev.w === undefined ? undefined : 'none'
                },
                children: prev.node
            }, `p${prev.id}`, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Swap.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: inner,
                className: "ss-swap__in",
                style: {
                    animationName: reduced ? 'none' : undefined,
                    animationDuration: `${duration}ms`,
                    ...!reduced && prev && size ? {
                        width: size.w,
                        maxWidth: 'none'
                    } : null
                },
                children: children
            }, `c${id}`, false, {
                fileName: "[project]/src/vendor/stageshow/motion/Swap.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/motion/Swap.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(Swap, "zAPy5Spu4TmUO8Sqt7qSsOhV7iQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Swap;
var _c;
__turbopack_context__.k.register(_c, "Swap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/motion/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Motion: the behaviors a demo is made of, each built to hold up frame by
// frame. A height that opens and carries what follows, text that changes only
// where it changed, a card that opens into a screen, a camera push-in. They
// bring motion, not a look: style what's inside them as the product does.
// One file per part, each importing its own CSS.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Connector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Connector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Count$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Count.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Roll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Roll.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Swap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Swap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Collapse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Collapse.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Fly$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Fly.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Follow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Follow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$States$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/States.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Stream$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Stream.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Camera.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Scroll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Scroll.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$motion$2f$Expand$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/motion/Expand.tsx [app-client] (ecmascript)");
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
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
/** A round avatar with an initial, or an image from src. In minimal fidelity, or with `plain`, it is a plain disc. */ // Six muted, opaque fills that read on light and dark grounds, one per person
const PEOPLE = [
    '#c98f6e',
    '#6f9b7d',
    '#7b86c7',
    '#c47a9e',
    '#8c9ab0',
    '#c2a35a'
];
const hue = (name)=>{
    let h = 0;
    for (const c of name)h = (h * 31 + c.charCodeAt(0)) % 9973;
    return PEOPLE[h % PEOPLE.length];
};
function Avatar({ name = '', plain = false, size = 24, tone = name ? 'person' : 'ink', src, ring, className, style, ...rest }) {
    _s();
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    const disc = plain || fidelity === 'minimal';
    const person = tone === 'person' && !disc ? {
        background: hue(name),
        color: '#fff'
    } : undefined;
    // iOS monograms carry two initials, first and last name
    const words = name.trim().split(/\s+/).filter(Boolean);
    const initials = tone === 'ios' ? (words[0]?.[0] ?? '') + (words.length > 1 ? words[words.length - 1][0] : '') : name.trim()[0] ?? '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-avatar${className ? ` ${className}` : ''}`,
        "data-tone": tone,
        "data-ring": ring,
        style: {
            width: size,
            height: size,
            fontSize: Math.round(size * (tone === 'ios' ? 0.4 : size < 24 ? 0.5 : 0.42)),
            ...person,
            ...style
        },
        children: src && !disc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: ""
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Avatar.tsx",
            lineNumber: 43,
            columnNumber: 23
        }, this) : disc ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-avatar__initial",
            children: initials.toUpperCase()
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Avatar.tsx",
            lineNumber: 43,
            columnNumber: 64
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Avatar.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(Avatar, "hUTSSXXTYq0vfYdAvmoANYDcZ3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"]
    ];
});
_c = Avatar;
var _c;
__turbopack_context__.k.register(_c, "Avatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Card({ pad = 'medium', gap = 12, tone = 'surface', lift, flush, className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-card${className ? ` ${className}` : ''}`,
        "data-pad": pad,
        "data-tone": tone,
        "data-lift": lift || undefined,
        "data-flush": flush || undefined,
        style: {
            ...style,
            '--ss-card-gap': `${gap}px`
        }
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Check.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>Check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Check({ on, pending, size = 16, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-check${className ? ` ${className}` : ''}`,
        "data-on": on || undefined,
        "data-pending": pending && !on || undefined,
        style: {
            width: size,
            height: size,
            ...rest.style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            width: size,
            height: size,
            "aria-hidden": true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "ss-check__ring",
                    cx: "8",
                    cy: "8",
                    r: "7.25"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "ss-check__arc",
                    cx: "8",
                    cy: "8",
                    r: "7.25",
                    pathLength: 1
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "ss-check__fill",
                    cx: "8",
                    cy: "8",
                    r: "8"
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    className: "ss-check__tick",
                    d: "M4.5 8.2 7 10.6l4.6-5",
                    pathLength: 1
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Check.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Check;
var _c;
__turbopack_context__.k.register(_c, "Check");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Chip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chip",
    ()=>Chip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Icon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Chip({ show = true, remove, gap = 0, children, className, style, ...rest }) {
    _s();
    // Measured, so the slot opens to exactly the chip's width wherever it sits (a flex row would shrink a CSS-only version)
    const chip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [w, setW] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Chip.useLayoutEffect": ()=>{
            if (chip.current) setW(chip.current.offsetWidth);
        }
    }["Chip.useLayoutEffect"], [
        children
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-chip-slot${className ? ` ${className}` : ''}`,
        "data-show": show || undefined,
        style: {
            width: show ? w ?? 'auto' : 0,
            marginRight: show ? 0 : -gap,
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            ref: chip,
            className: "ss-chip",
            "data-removable": remove !== undefined || undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-chip__label",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Chip.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                remove !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ss-chip__x",
                    "data-target": remove || undefined,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                        name: "close",
                        size: 10,
                        stroke: 1.8
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/parts/Chip.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Chip.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/parts/Chip.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Chip.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(Chip, "kzKdlvQ3kqwTtt0UFnUgWXjKCfI=");
_c = Chip;
var _c;
__turbopack_context__.k.register(_c, "Chip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Divider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Divider",
    ()=>Divider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Divider({ vertical, inset = 0, className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        role: "separator",
        "aria-orientation": vertical ? 'vertical' : 'horizontal',
        ...rest,
        className: `ss-divider${className ? ` ${className}` : ''}`,
        "data-vertical": vertical || undefined,
        style: inset ? {
            ...style,
            marginInline: inset
        } : style
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Divider.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Divider;
var _c;
__turbopack_context__.k.register(_c, "Divider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Facepile.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Facepile",
    ()=>Facepile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Avatar.tsx [app-client] (ecmascript)");
;
;
;
function Facepile({ names, size = 22, overlap = 6, gap = 2, tones, className, style, ...rest }) {
    const r = size / 2;
    // Center of the next avatar, measured from this one's left edge
    const next = size - overlap + r;
    const mask = `radial-gradient(circle at ${next}px 50%, transparent ${r + gap}px, #000 ${r + gap + 0.5}px)`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-facepile${className ? ` ${className}` : ''}`,
        style: {
            ['--ss-overlap']: `${-overlap}px`,
            ...style
        },
        children: names.map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-facepile__face",
                style: i < names.length - 1 ? {
                    WebkitMaskImage: mask,
                    maskImage: mask
                } : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                    name: n,
                    size: size,
                    tone: tones?.[i] ?? 'person'
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/parts/Facepile.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Facepile.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Facepile.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Facepile;
var _c;
__turbopack_context__.k.register(_c, "Facepile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Icon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/archive.mjs [app-client] (ecmascript) <export default as Archive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.mjs [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ellipsis$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript) <export default as Ellipsis>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.mjs [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.mjs [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-client] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.mjs [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$face$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanFace$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-face.mjs [app-client] (ecmascript) <export default as ScanFace>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.mjs [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.mjs [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-client] (ecmascript) <export default as Zap>");
;
;
;
// Glyphs come from lucide, one family at one construction, so a row of icons
// shares a weight. Two card-specific drawings (a chip, contactless arcs) stay
// hand-drawn because no set has them.
const LUCIDE = {
    check: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
    plus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
    close: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
    'chevron-right': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"],
    'chevron-down': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"],
    search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
    globe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
    external: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"],
    clock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
    archive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__["Archive"],
    trash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"],
    more: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ellipsis$3e$__["Ellipsis"],
    arrow: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
    file: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"],
    user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
    bell: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
    card: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
    bolt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
    lock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
    play: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
    pause: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"],
    faceid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$face$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanFace$3e$__["ScanFace"],
    wifi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"],
    heart: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
    star: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
    calendar: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
    mail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
    send: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
    home: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"],
    gear: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
    grip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"]
};
const DRAWN = {
    chip: 'M3.5 2.5h9a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V4a1.5 1.5 0 0 1 1.5-1.5zM2 6h4M2 10h4M10 6h4M10 10h4M6 2.5v11M10 2.5v11M6 8h4',
    contactless: 'M6.8 6.2a2.5 2.5 0 0 1 0 3.6M8.5 4.5a5 5 0 0 1 0 7M10.3 2.7a7.5 7.5 0 0 1 0 10.6'
};
// Solid versions, for small marks and tinted tiles where a thin outline goes
// wiry. Cut-outs use the even-odd rule.
const FILLED = {
    bolt: 'M9.6 1.2 3.2 8.9a.6.6 0 0 0 .5 1H7.4l-1 4.9a.4.4 0 0 0 .7.3l6.4-7.7a.6.6 0 0 0-.5-1H9.3l1-4.9a.4.4 0 0 0-.7-.3Z',
    card: 'M3 3h10a1.75 1.75 0 0 1 1.75 1.75V5.6H1.25v-.85A1.75 1.75 0 0 1 3 3Zm-1.75 4.4h13.5v3.85A1.75 1.75 0 0 1 13 13H3a1.75 1.75 0 0 1-1.75-1.75Zm2.25 2.6v1h3v-1Z',
    bell: 'M8 1.25a4.25 4.25 0 0 0-4.25 4.25v3.1l-1.3 2.1a.6.6 0 0 0 .5.9h10.1a.6.6 0 0 0 .5-.9l-1.3-2.1V5.5A4.25 4.25 0 0 0 8 1.25ZM6.2 13.1a1.9 1.9 0 0 0 3.6 0Z',
    user: 'M8 1.5a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Zm0 7.4c3.1 0 5.4 1.8 5.9 4.6a.7.7 0 0 1-.7.8H2.8a.7.7 0 0 1-.7-.8C2.6 10.7 4.9 8.9 8 8.9Z',
    clock: 'M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5Zm-.75 3v4.2l2.9 1.75.75-1.25-2.15-1.3V4.25Z',
    check: 'M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5Zm3 4.3-.95-.8-3.3 3.95-1.85-1.8-.85.9 2.8 2.75Z',
    // SF Symbols-style solids for Apple-native demos
    lock: 'M8 1.25A3.25 3.25 0 0 0 4.75 4.5v2H4.5A1.5 1.5 0 0 0 3 8v5.25a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V8a1.5 1.5 0 0 0-1.5-1.5h-.25v-2A3.25 3.25 0 0 0 8 1.25Zm-1.75 5.25v-2a1.75 1.75 0 0 1 3.5 0v2Z',
    play: 'M4.5 2.6v10.8a.8.8 0 0 0 1.2.7l8.6-5.4a.8.8 0 0 0 0-1.4L5.7 1.9a.8.8 0 0 0-1.2.7Z',
    pause: 'M4 2.5h2.6a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6H4a.6.6 0 0 1-.6-.6V3.1a.6.6 0 0 1 .6-.6Zm5.4 0H12a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6H9.4a.6.6 0 0 1-.6-.6V3.1a.6.6 0 0 1 .6-.6Z',
    heart: 'M8 14.2c-.2 0-6.6-3.7-6.6-8.4a3.6 3.6 0 0 1 6.6-2 3.6 3.6 0 0 1 6.6 2c0 4.7-6.4 8.4-6.6 8.4Z',
    star: 'M8 1.2a.6.6 0 0 1 .55.35l1.75 3.6 3.95.55a.6.6 0 0 1 .33 1.03l-2.86 2.8.68 3.94a.6.6 0 0 1-.87.63L8 12.25 4.47 14.1a.6.6 0 0 1-.87-.63l.68-3.94-2.86-2.8a.6.6 0 0 1 .33-1.03l3.95-.55 1.75-3.6A.6.6 0 0 1 8 1.2Z',
    home: 'M7.5 1.6a.8.8 0 0 1 1 0l5.7 4.6a.8.8 0 0 1 .3.6v6.7a1 1 0 0 1-1 1H10V10.3H6v4.2H2.5a1 1 0 0 1-1-1V6.8a.8.8 0 0 1 .3-.6Z',
    gear: 'M6.67 2.46L7.03 0.81L8.97 0.81L9.33 2.46L10.98 3.14L12.40 2.24L13.76 3.60L12.86 5.02L13.54 6.67L15.19 7.03L15.19 8.97L13.54 9.33L12.86 10.98L13.76 12.40L12.40 13.76L10.98 12.86L9.33 13.54L8.97 15.19L7.03 15.19L6.67 13.54L5.02 12.86L3.60 13.76L2.24 12.40L3.14 10.98L2.46 9.33L0.81 8.97L0.81 7.03L2.46 6.67L3.14 5.02L2.24 3.60L3.60 2.24L5.02 3.14ZM5.60 8.00a2.40 2.40 0 1 0 4.80 0a2.40 2.40 0 1 0 -4.80 0Z',
    calendar: 'M3.5 2h9A2 2 0 0 1 14.5 4v8.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm-.5 4.5v6a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-6ZM4.2 7.6h1.6v1.6h-1.6ZM7.2 7.6h1.6v1.6h-1.6ZM10.2 7.6h1.6v1.6h-1.6ZM4.2 10.2h1.6v1.6h-1.6ZM7.2 10.2h1.6v1.6h-1.6ZM10.2 10.2h1.6v1.6h-1.6Z',
    send: 'M14.3 1.7a.55.55 0 0 0-.6-.12L1.75 6.4a.55.55 0 0 0 0 1.02l4.6 1.85 4.9-4.13a.2.2 0 0 1 .28.28L7.4 10.3l1.84 4.6a.55.55 0 0 0 1.02 0l4.83-11.95a.55.55 0 0 0-.12-.6Z',
    mail: 'M2.5 3h11A1.5 1.5 0 0 1 15 4.4L8 8.9 1 4.4A1.5 1.5 0 0 1 2.5 3ZM1 6.1v5.4A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.1l-6.6 4.2a.8.8 0 0 1-.8 0Z'
};
function Icon({ name, size = 16, stroke = 1.5, filled, className, style }) {
    const solid = filled ? FILLED[name] : undefined;
    const cls = `ss-icon${className ? ` ${className}` : ''}`;
    if (!solid && name in LUCIDE) {
        const Glyph = LUCIDE[name];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
            size: size,
            strokeWidth: stroke,
            absoluteStrokeWidth: true,
            className: cls,
            style: style,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Icon.tsx",
            lineNumber: 54,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        width: size,
        height: size,
        className: cls,
        style: style,
        "aria-hidden": true,
        children: solid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: solid,
            fill: "currentColor",
            fillRule: "evenodd"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Icon.tsx",
            lineNumber: 59,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: DRAWN[name],
            fill: "none",
            stroke: "currentColor",
            strokeWidth: stroke,
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Icon.tsx",
            lineNumber: 61,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Icon.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Kbd.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Kbd",
    ()=>Kbd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Kbd({ keys, plain, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-kbd${className ? ` ${className}` : ''}`,
        "data-plain": plain || undefined,
        "aria-label": keys.join(' '),
        children: keys.map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                className: "ss-kbd__key",
                children: k
            }, i, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Kbd.tsx",
                lineNumber: 12,
                columnNumber: 27
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Kbd.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Kbd;
var _c;
__turbopack_context__.k.register(_c, "Kbd");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Menu",
    ()=>Menu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Menu({ items, value, targets, className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-menu${className ? ` ${className}` : ''}`,
        style: style,
        role: "menu",
        children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-menu__item",
                "data-active": i === value || undefined,
                "data-target": targets?.[i],
                role: "menuitem",
                children: item
            }, i, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Menu.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Menu.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Menu;
var _c;
__turbopack_context__.k.register(_c, "Menu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Meter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Meter",
    ()=>Meter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Meter({ value, tone = 'accent', className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-meter${className ? ` ${className}` : ''}`,
        "data-tone": tone,
        style: style,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-meter__fill",
            style: {
                clipPath: `inset(0 ${(1 - Math.max(0, Math.min(1, value))) * 100}% 0 0 round 3px)`
            }
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Meter.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Meter.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Meter;
var _c;
__turbopack_context__.k.register(_c, "Meter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Pin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pin",
    ()=>Pin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Pin({ name = '', src, size = 24, corner = 'bl', tone = 'accent', selected, className, style, ...rest }) {
    _s();
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    const plain = fidelity === 'minimal';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-pin${className ? ` ${className}` : ''}`,
        "data-corner": corner,
        "data-tone": tone,
        "data-selected": selected || undefined,
        style: {
            width: size,
            height: size,
            fontSize: Math.round(size * 0.42),
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-pin__face",
            children: src && !plain ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: ""
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Pin.tsx",
                lineNumber: 36,
                columnNumber: 55
            }, this) : plain ? null : name.trim()[0]?.toUpperCase()
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Pin.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Pin.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Pin, "hUTSSXXTYq0vfYdAvmoANYDcZ3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"]
    ];
});
_c = Pin;
var _c;
__turbopack_context__.k.register(_c, "Pin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Row.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Row",
    ()=>Row
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/window.tsx [app-client] (ecmascript)");
;
;
;
function Row({ lead, title, subtitle, meta, preview, unread, selected, pad = 12, className, style, children, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-row${className ? ` ${className}` : ''}`,
        "data-selected": selected || undefined,
        "data-unread": unread || undefined,
        "data-lead": lead ? '' : undefined,
        style: {
            '--ss-row-pad': `${pad}px`,
            ...style
        },
        children: [
            unread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-row__dot",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                lineNumber: 46,
                columnNumber: 18
            }, this),
            lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-row__lead",
                children: lead
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                lineNumber: 47,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-row__body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-row__head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-row__title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            meta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-row__meta",
                                children: meta
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                                lineNumber: 51,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-row__subtitle",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                        lineNumber: 53,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            preview && (Array.isArray(preview) && preview.every((w)=>typeof w === 'number') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-row__preview",
                "aria-hidden": true,
                children: preview.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$window$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                        w: w,
                        h: 6,
                        tone: 2
                    }, i, false, {
                        fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                        lineNumber: 58,
                        columnNumber: 36
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                lineNumber: 57,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-row__preview",
                "data-text": true,
                children: preview
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, this)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/parts/Row.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Row;
var _c;
__turbopack_context__.k.register(_c, "Row");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Spinner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Spinner",
    ()=>Spinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Spinner({ size = 14, className, style, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...rest,
        className: `ss-spinner${className ? ` ${className}` : ''}`,
        viewBox: "0 0 16 16",
        width: size,
        height: size,
        style: style,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "6.25",
                fill: "none",
                stroke: "currentColor",
                strokeOpacity: "0.18",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Spinner.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 1.75a6.25 6.25 0 0 1 6.25 6.25",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Spinner.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/parts/Spinner.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Spinner;
var _c;
__turbopack_context__.k.register(_c, "Spinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Toast({ show, icon, children, action, className, style, ...rest }) {
    _s();
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    // Minimal: words become a placeholder line, as everywhere else
    if (fidelity === 'minimal' && typeof children === 'string') children = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ss-bar",
        style: {
            width: Math.min(160, children.length * 5.5),
            height: 6,
            borderRadius: 3,
            background: 'var(--ss-ink-3)',
            display: 'inline-block'
        }
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Toast.tsx",
        lineNumber: 14,
        columnNumber: 74
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-toast${className ? ` ${className}` : ''}`,
        "data-show": show || undefined,
        style: style,
        role: "status",
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-toast__icon",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Toast.tsx",
                lineNumber: 17,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Toast.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-toast__action",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/parts/Toast.tsx",
                lineNumber: 19,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/parts/Toast.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(Toast, "hUTSSXXTYq0vfYdAvmoANYDcZ3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"]
    ];
});
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/Tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
function Tooltip({ show, at, side = 'below', gap = 6, children, className, style, ...rest }) {
    const x = at.x + at.width / 2;
    const y = side === 'below' ? at.y + at.height + gap : at.y - gap;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-tooltip${className ? ` ${className}` : ''}`,
        "data-show": show && at.width > 0 || undefined,
        "data-side": side,
        style: {
            left: x,
            top: y,
            ...style
        },
        role: "tooltip",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ss-tooltip__label",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/parts/Tooltip.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/parts/Tooltip.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Tooltip;
var _c;
__turbopack_context__.k.register(_c, "Tooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/parts/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Small parts: avatars, status marks, a few icons, a meter, chips. Starting
// points with quiet defaults, there so a demo doesn't hand-draw the same
// circle twice. Restyle or replace them to match the product being shown.
// One file per part, each importing its own CSS.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Check$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Check.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Spinner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Meter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Meter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Facepile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Facepile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Chip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Chip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Pin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Pin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Kbd.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$parts$2f$Divider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/parts/Divider.tsx [app-client] (ecmascript)");
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
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/phone.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LockScreen",
    ()=>LockScreen,
    "Notification",
    ()=>Notification,
    "Phone",
    ()=>Phone,
    "WALLPAPER",
    ()=>WALLPAPER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
// An iPhone drawn from the real geometry, the iPhone 18 Pro in points, as
// Apple's iOS 27 UI kit lays it out: screen 402 × 874, status bar 62 tall,
// Dynamic Island 95 × 37 sitting 14 from the top, home indicator 144 × 5
// sitting 8 from the bottom. The screen's corner is traced from the cut-out
// in Apple's own product bezel (the kit's screens are square and the bezel
// rounds them): a superellipse 71pt across, exponent 2.31, within 0.7pt of
// Apple's curve all the way round.
//
// The screen is laid out at true points and scaled down as a whole, so type
// inside it renders at the size iOS uses (15pt, not 8px) and keeps the right
// letter shapes and spacing. Inside the screen, 1pt is 1px; `--pt` is kept
// at 1px there so calc(var(--pt) * n) still works.
const IPHONE = {
    w: 402,
    h: 874,
    r: 64
};
const CORNER = {
    a: 71,
    n: 2.31
};
// soft: the illustrative phone marketing pages draw, measured from one (a
// 250 × 527 screen, 28 corners): a little squatter, tighter corners
const SOFT = {
    w: 393,
    h: 829,
    r: 42
};
// Pixel 8: 412 × 915dp, corners about 38, a 24dp punch-hole camera 14 from the top.
const PIXEL = {
    w: 412,
    h: 915,
    r: 38
};
const FRAMES = {
    pro: {
        band: 3,
        glass: 10
    },
    // Apple's photograph of the iPhone 18 Pro (its product bezel): the body runs
    // 16pt past the screen on every side; the image itself is drawn over it
    photo: {
        band: 0,
        glass: 16
    },
    bezel: {
        band: 0,
        glass: 12
    },
    soft: {
        band: 0,
        glass: 12.5
    },
    bare: {
        band: 0,
        glass: 0
    },
    silver: {
        band: 4,
        glass: 9
    },
    clay: {
        band: 0,
        glass: 16
    },
    outline: {
        band: 0,
        glass: 8
    },
    android: {
        band: 2,
        glass: 9
    }
};
// The iOS frames draw their bands as strokes of the screen's own outline,
// each centered on the screen's edge, widest first: every band then stays
// exactly parallel to the screen, corners included. Each is [reach from the
// screen's edge in points, paint]; a paint is a color or one of the
// gradients Phone defines (url(#…-band), url(#…-clay))
const BANDS = {
    pro: [
        [
            13,
            'band'
        ],
        [
            10,
            'var(--ss-phone-rim)'
        ],
        [
            9.25,
            'var(--ss-phone-glass)'
        ]
    ],
    silver: [
        [
            13,
            'band'
        ],
        [
            9,
            'var(--ss-phone-glass)'
        ]
    ],
    bezel: [
        [
            12,
            'var(--ss-phone-glass)'
        ]
    ],
    clay: [
        [
            16,
            'clay'
        ],
        [
            1,
            'var(--ss-phone-seam)'
        ]
    ]
};
/** A rounded rectangle with continuous (superellipse) corners, as an SVG
 * path: corners `a` across with exponent `n` (2 is a circle). */ function superellipsePath(w, h, a, n) {
    const steps = 32;
    const e = 2 / n;
    const pts = [];
    const corners = [
        [
            w - a,
            a,
            1,
            -1
        ],
        [
            w - a,
            h - a,
            1,
            1
        ],
        [
            a,
            h - a,
            -1,
            1
        ],
        [
            a,
            a,
            -1,
            -1
        ]
    ];
    corners.forEach(([cx, cy, sx, sy], c)=>{
        for(let i = 0; i <= steps; i++){
            const t = i / steps * (Math.PI / 2);
            // Clockwise: top-right runs top to right, bottom-right right to bottom, and so on
            const u = c % 2 === 0 ? Math.sin(t) : Math.cos(t);
            const v = c % 2 === 0 ? Math.cos(t) : Math.sin(t);
            pts.push(`${(cx + sx * a * Math.pow(u, e)).toFixed(2)} ${(cy + sy * a * Math.pow(v, e)).toFixed(2)}`);
        }
    });
    return `M${pts.join('L')}Z`;
}
function Phone({ width, frame: asked = 'pro', time = '9:41', island, status, dark, wallpaper, className, style, children, ...rest }) {
    _s();
    // The photo frame uses a caller-provided bezel. Without a configured image,
    // or if it fails to load, the phone draws the pro frame
    // instead of standing as an empty shell
    const photoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [photoOk, setPhotoOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Phone.useEffect": ()=>{
            if (asked !== 'photo' || !photoRef.current) return;
            const bg = getComputedStyle(photoRef.current).backgroundImage;
            const url = bg.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
            if (!url) return void setPhotoOk(false);
            let live = true;
            const img = new Image();
            img.onerror = ({
                "Phone.useEffect": ()=>live && setPhotoOk(false)
            })["Phone.useEffect"];
            img.src = url;
            return ({
                "Phone.useEffect": ()=>{
                    live = false;
                }
            })["Phone.useEffect"];
        }
    }["Phone.useEffect"], [
        asked,
        dark
    ]);
    const frame = asked === 'photo' && !photoOk ? 'pro' : asked;
    const { band, glass } = FRAMES[frame];
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    const SCREEN = frame === 'android' ? PIXEL : frame === 'soft' ? SOFT : IPHONE;
    const edge = band + glass;
    const s = width / (SCREEN.w + edge * 2);
    const pt = (n)=>n * s;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const ios = frame !== 'android' && frame !== 'soft';
    const outline = ios ? superellipsePath(pt(SCREEN.w), pt(SCREEN.h), pt(CORNER.a), CORNER.n) : null;
    const bands = BANDS[frame];
    const chrome = frame === 'pro' || frame === 'photo' || frame === 'bezel' || frame === 'silver' || frame === 'android';
    // The photo has its own island, lens and all
    const showIsland = island ?? (chrome && frame !== 'photo');
    const showStatus = status ?? chrome;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-phone${className ? ` ${className}` : ''}`,
        "data-frame": frame,
        "data-dark": dark || undefined,
        style: {
            width,
            height: pt(SCREEN.h + edge * 2),
            padding: pt(band),
            borderRadius: pt(SCREEN.r + edge),
            ['--ps']: `${s}px`,
            ...style
        },
        children: [
            (bands || frame === 'outline') && outline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "ss-phone__bands",
                width: "100%",
                height: "100%",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                id: `${id}-band`,
                                x1: "0.2",
                                y1: "0",
                                x2: "0.8",
                                y2: "1",
                                children: [
                                    0,
                                    0.22,
                                    0.48,
                                    0.74,
                                    1
                                ].map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: o,
                                        style: {
                                            stopColor: `var(--ss-phone-band-${i + 1})`
                                        }
                                    }, o, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                id: `${id}-clay`,
                                x1: "0",
                                y1: "0",
                                x2: "0",
                                y2: "1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0",
                                        style: {
                                            stopColor: 'var(--ss-phone-clay-top)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "1",
                                        style: {
                                            stopColor: 'var(--ss-phone-clay-bottom)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            frame === 'outline' && // Line art: a ring between 7 and 8pt out, cut from a mask so it is one hairline
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                id: `${id}-ring`,
                                maskUnits: "userSpaceOnUse",
                                x: "-50%",
                                y: "-50%",
                                width: "200%",
                                height: "200%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: outline,
                                        fill: "none",
                                        stroke: "#fff",
                                        strokeWidth: pt(16)
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: outline,
                                        fill: "none",
                                        stroke: "#000",
                                        strokeWidth: pt(16) - 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: `translate(${pt(edge)} ${pt(edge)})`,
                        strokeLinejoin: "round",
                        children: frame === 'outline' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: -pt(9),
                                    y: -pt(9),
                                    width: pt(SCREEN.w + 18),
                                    height: pt(SCREEN.h + 18),
                                    mask: `url(#${id}-ring)`,
                                    style: {
                                        fill: 'var(--ss-phone-line)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                    lineNumber: 177,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: outline,
                                    fill: "none",
                                    strokeWidth: "2",
                                    style: {
                                        stroke: 'var(--ss-line, rgba(0, 0, 0, 0.06))'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/vendor/stageshow/phone.tsx",
                            lineNumber: 176,
                            columnNumber: 15
                        }, this) : bands.map(([d, paint])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: outline,
                                fill: "none",
                                strokeWidth: pt(d * 2),
                                stroke: paint === 'band' || paint === 'clay' ? `url(#${id}-${paint})` : undefined,
                                style: paint === 'band' || paint === 'clay' ? undefined : {
                                    stroke: paint
                                }
                            }, d, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 182,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-phone__glass",
                style: {
                    padding: pt(glass),
                    borderRadius: pt(SCREEN.r + glass)
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-phone__window",
                    style: {
                        width: pt(SCREEN.w),
                        height: pt(SCREEN.h),
                        borderRadius: outline ? undefined : pt(SCREEN.r),
                        clipPath: outline ? `path('${outline}')` : undefined
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ss-phone__screen",
                        style: {
                            width: SCREEN.w,
                            height: SCREEN.h,
                            transform: `scale(${s})`,
                            ['--ss-screen-r']: `${SCREEN.r}px`,
                            ...wallpaper ? {
                                background: wallpaper
                            } : null
                        },
                        children: [
                            showStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ss-phone__status",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-phone__time",
                                        children: fidelity === 'minimal' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ss-phone__time-bar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                            lineNumber: 211,
                                            columnNumber: 76
                                        }, this) : time
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-phone__glyphs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Signal, {}, void 0, false, {
                                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wifi, {}, void 0, false, {
                                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Battery, {}, void 0, false, {
                                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this),
                            showIsland && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-phone__island"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 219,
                                columnNumber: 28
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ss-phone__content",
                                "data-status": showStatus || undefined,
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            chrome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-phone__home"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 223,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/phone.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            frame === 'photo' && // The bezel image is 450 × 920pt with the screen at (24, 23): laid over
            // the body so its cut-out frames the screen exactly
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: photoRef,
                className: "ss-phone__photo",
                style: {
                    left: pt(-8),
                    top: pt(-7),
                    width: pt(450),
                    height: pt(920)
                }
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(Phone, "kircKhAzPrkHC8jlYIDybmAvBiI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = Phone;
const WALLPAPER = 'radial-gradient(120% 70% at 25% 0%, rgba(255, 255, 255, 0.3), transparent 65%), linear-gradient(172deg, #8ea9d6 0%, #9aa1d4 50%, #aca3cf 100%)';
function LockScreen({ date = 'Tuesday, October 21', time = '9:41', controls = true, stack = 'bottom', size = 'full', clock = true, className, children, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-lock${className ? ` ${className}` : ''}`,
        "data-size": size,
        "data-clock": clock ? undefined : 'off',
        children: [
            clock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-lock__date",
                children: date
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 267,
                columnNumber: 17
            }, this),
            clock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-lock__clock",
                children: time
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 268,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-lock__stack",
                "data-at": stack,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            controls && size === 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-lock__controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-lock__control",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            width: "22",
                            height: "22",
                            "aria-hidden": true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fill: "currentColor",
                                fillRule: "evenodd",
                                d: "M7.6 1.6h8.8a1.6 1.6 0 0 1 1.6 1.6v1.9H6V3.2a1.6 1.6 0 0 1 1.6-1.6ZM6 6h12l-2.6 4v10.4a2 2 0 0 1-2 2h-2.8a2 2 0 0 1-2-2V10ZM10.6 14a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0Z"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/phone.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-lock__control",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            width: "24",
                            height: "24",
                            "aria-hidden": true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fill: "currentColor",
                                fillRule: "evenodd",
                                d: "M4.6 6.6h3.3l1.2-1.8a1.3 1.3 0 0 1 1.1-.6h3.6a1.3 1.3 0 0 1 1.1.6l1.2 1.8h3.3A2.6 2.6 0 0 1 22 9.2v8.6a2.6 2.6 0 0 1-2.6 2.6H4.6A2.6 2.6 0 0 1 2 17.8V9.2a2.6 2.6 0 0 1 2.6-2.6ZM7.5 13.4a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0ZM9 13.4a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 285,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/phone.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_c1 = LockScreen;
function Notification({ icon, title, body, time = 'now', banner, className, ...rest }) {
    _s1();
    const el = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        ref: el,
        className: `ss-notification${className ? ` ${className}` : ''}`,
        "data-banner": banner || undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-notification__icon",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-notification__text",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-notification__head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-notification__title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-notification__time",
                                children: time
                            }, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-notification__body",
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/phone.tsx",
                        lineNumber: 326,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
_s1(Notification, "2gW1BzJYK+2Cgeo7mqoyXl52ekw=");
_c2 = Notification;
// The status bar glyphs, taken from Apple's iOS 27 UI kit for Figma
// (Status bar, iPhone): exact paths and sizes in points
function Signal() {
    // Four bars 3.33 wide on a 5.67 pitch, fully rounded, 6.33 to 13.67 tall
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20.33 13.67",
        width: "20.33",
        height: "13.67",
        className: "ss-phone__glyph ss-phone__signal",
        children: [
            6.33,
            8.67,
            11,
            13.67
        ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: i * 5.667,
                y: 13.67 - h,
                width: 3.333,
                height: h,
                rx: 1.667,
                fill: "currentColor"
            }, i, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 338,
        columnNumber: 5
    }, this);
}
_c3 = Signal;
function Wifi() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 19.33 14.33",
        width: "19.33",
        height: "14.33",
        className: "ss-phone__glyph ss-phone__wifi",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fillRule: "evenodd",
            fill: "currentColor",
            d: "M0.415933 5.54283C0.902185 6.04412 1.66017 5.95818 2.27513 5.41393C4.30595 3.58064 6.83731 2.63535 9.66901 2.63535C12.5007 2.63535 15.0464 3.60928 17.0629 5.41393C17.6636 5.97251 18.4215 6.0298 18.9221 5.54283C19.4226 5.02722 19.4942 4.2538 18.9793 3.70954C16.8341 1.51819 13.3302 0 9.66901 0C6.00783 0 2.48965 1.53251 0.358727 3.72387C-0.156127 4.2538 -0.0989213 5.02722 0.415933 5.55715L0.415933 5.54283ZM3.94841 9.13779C4.50617 9.68205 5.22124 9.62476 5.85051 9.10915C6.88022 8.29276 8.25316 7.73418 9.66901 7.7485C11.0706 7.7485 12.4435 8.29276 13.4875 9.12347C14.1168 9.63908 14.8605 9.66773 15.4039 9.12347C15.9331 8.57921 16.0189 7.7485 15.4611 7.23289C14.0739 5.98683 11.9859 5.11315 9.68332 5.11315C7.38077 5.11315 5.27845 5.98683 3.9055 7.23289C3.41925 7.69121 3.31914 8.47896 3.96271 9.13779L3.94841 9.13779ZM8.72511 13.8929C9.34008 14.4801 9.98365 14.4801 10.5986 13.8929L11.757 12.7757C12.372 12.1742 12.5007 11.4151 11.7999 10.8995C11.2136 10.4841 10.4699 10.212 9.66901 10.212C8.86813 10.212 8.11015 10.4841 7.53809 10.9138C6.83731 11.4151 6.98033 12.1885 7.59529 12.7757L8.73942 13.8929L8.72511 13.8929Z"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/phone.tsx",
            lineNumber: 349,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 348,
        columnNumber: 5
    }, this);
}
_c4 = Wifi;
function Battery() {
    // iOS 27 draws a full battery as one solid body, with a small contact
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 29.33 13.67",
        width: "29.33",
        height: "13.67",
        className: "ss-phone__glyph ss-phone__battery",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M0 6.4C0 4.15979 0 3.03969 0.435974 2.18404C0.819467 1.43139 1.43139 0.819467 2.18404 0.435974C3.03969 0 4.15979 0 6.4 0L19.933 0C22.1732 0 23.2933 0 24.149 0.435974C24.9016 0.819467 25.5135 1.43139 25.897 2.18404C26.333 3.03969 26.333 4.15979 26.333 6.4L26.333 7.26666C26.333 9.50687 26.333 10.627 25.897 11.4826C25.5135 12.2353 24.9016 12.8472 24.149 13.2307C23.2933 13.6667 22.1732 13.6667 19.933 13.6667L6.4 13.6667C4.15979 13.6667 3.03969 13.6667 2.18404 13.2307C1.43139 12.8472 0.819467 12.2353 0.435974 11.4826C0 10.627 0 9.50687 0 7.26666L0 6.4Z"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                fill: "currentColor",
                transform: "translate(27.33 4.33)",
                d: "M0 0L0 5C0.601505 4.8625 2 3.75 2 2.5C2 1.25 0.601505 0.1375 0 0Z"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/phone.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/phone.tsx",
        lineNumber: 357,
        columnNumber: 5
    }, this);
}
_c5 = Battery;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Phone");
__turbopack_context__.k.register(_c1, "LockScreen");
__turbopack_context__.k.register(_c2, "Notification");
__turbopack_context__.k.register(_c3, "Signal");
__turbopack_context__.k.register(_c4, "Wifi");
__turbopack_context__.k.register(_c5, "Battery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StillContext",
    ()=>StillContext,
    "useReducedMotion",
    ()=>useReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const StillContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
function useReducedMotion() {
    _s();
    const still = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StillContext);
    const [reduced, setReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useReducedMotion.useEffect": ()=>{
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            const update = {
                "useReducedMotion.useEffect.update": ()=>setReduced(mq.matches)
            }["useReducedMotion.useEffect.update"];
            update();
            mq.addEventListener('change', update);
            return ({
                "useReducedMotion.useEffect": ()=>mq.removeEventListener('change', update)
            })["useReducedMotion.useEffect"];
        }
    }["useReducedMotion.useEffect"], []);
    return still || reduced;
}
_s(useReducedMotion, "53q7mMwThRKAae6PDhPvaR65O7I=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/stage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stage",
    ()=>Stage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$act$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/act.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/cursor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$keys$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/keys.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/measure.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/reduced-motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/clock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/util.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const NONE = {};
function Stage({ width, height, initial = NONE, script, poster, cursor, hover, play: playProp = 'loop', compact, keys: keysAt = 'bottom', palette = 'accent', greys, fidelity = 'standard', specimen, unframed, speed: speedProp = 1, accent, tokens, ground, fill: fillProp = false, theme: themeProp = 'light', className, children }) {
    _s();
    // Hover scripts can hold their ending without returning to the start.
    // On touch, play once rather than assuming the script has a loop seam.
    const play = playProp === 'hover' && ("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia('(hover: none)').matches ? 'once' : playProp;
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('wide');
    const layoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(layout);
    layoutRef.current = layout;
    // Where the cursor rests, for the layout showing
    const restAt = ()=>{
        const at = cursor.at;
        return typeof at === 'object' && 'wide' in at ? at[layoutRef.current] : at;
    };
    const [grows, setGrows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const designW = layout === 'compact' && compact ? compact.width : width;
    const designH = layout === 'compact' && compact ? compact.height : height;
    const fitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const still = !script || reduced;
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Stage.useState": ()=>still && poster ? poster : initial
    }["Stage.useState"]);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(state);
    stateRef.current = state;
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const scaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    scaleRef.current = scale;
    // film.mjs can slow every stage down (--slow) and film any stage dark (--dark)
    const film = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.__stageshow ?? {};
    const speed = speedProp / (film.slow ?? 1);
    const theme = film.theme ?? themeProp;
    const [kind, setKind] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cursor?.kind ?? 'pointer');
    // A ring that spreads from the click point and fades, drawn under the cursor
    const ripple = (at)=>{
        const root = rootRef.current;
        if (!root || reduced) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ripple"])(root, at);
    };
    const kindRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(kind);
    kindRef.current = kind;
    const [keys, setKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 0,
        caps: [],
        show: false,
        down: false
    });
    const [lastKeys, setLastKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const keysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(keys);
    keysRef.current = keys;
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    // The cursor's kind follows what's under it after every commit too, so a
    // hand doesn't linger when the link it was over slides away. Not mid-drag:
    // the drag owns the kind until release.
    const autoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inset, setInset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const autoUsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hovered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fit: pick the layout from the container width, then scale its design
    // size into it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>{
            const fit = fitRef.current;
            if (!fit) return;
            const measure = {
                "Stage.useLayoutEffect.measure": ()=>{
                    const w = fit.clientWidth;
                    // A host that sizes the stage by something other than the screen (a
                    // bento tile set by its row's height) marks a wrapper data-ss-wide to
                    // keep the wide design, scaled, rather than the phone-width one
                    const wide = !!fit.parentElement?.closest('[data-ss-wide]');
                    const next = compact && !wide && w < compact.below ? 'compact' : 'wide';
                    setLayout(next);
                    // fill (or a host wrapper marked data-ss-fill) lets the stage grow past its design size, within reason
                    const grow = fillProp || !!fit.parentElement?.closest('[data-ss-fill]');
                    setGrows(grow);
                    const dw = next === 'compact' ? compact.width : width;
                    const s = Math.min(grow ? 2 : 1, w / dw);
                    setScale(s);
                    // A design narrower than its box (a compact layout, or a stage that has
                    // stopped at its design size) sits in the middle of it, not at its left
                    setInset(Math.max(0, (w - dw * s) / 2));
                }
            }["Stage.useLayoutEffect.measure"];
            measure();
            const ro = new ResizeObserver(measure);
            ro.observe(fit);
            // Hosts can switch layout/fill policy without changing this box's
            // width. Observe only those attributes on its ancestors, not the scene.
            const hosts = new MutationObserver(measure);
            for(let host = fit.parentElement; host; host = host.parentElement){
                hosts.observe(host, {
                    attributes: true,
                    attributeFilter: [
                        'data-ss-wide',
                        'data-ss-fill'
                    ]
                });
            }
            return ({
                "Stage.useLayoutEffect": ()=>{
                    ro.disconnect();
                    hosts.disconnect();
                }
            })["Stage.useLayoutEffect"];
        }
    }["Stage.useLayoutEffect"], [
        width,
        compact?.below,
        compact?.width,
        fillProp
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // Rects of every data-target, in stage pixels, refreshed after each commit.
    const [rects, setRects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const measureAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[measureAll]": ()=>{
            const root = rootRef.current;
            if (!root) return {};
            const out = {};
            const targets = root.querySelectorAll('[data-target]');
            if (!targets.length) return out;
            const space = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageSpace"])(root, scaleRef.current);
            targets.forEach({
                "Stage.useCallback[measureAll]": (el)=>{
                    out[el.dataset.target] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["targetRectOf"])(root, el, scaleRef.current, space);
                }
            }["Stage.useCallback[measureAll]"]);
            return out;
        }
    }["Stage.useCallback[measureAll]"], []);
    // Something placed from rect() can itself be a target, and the two can
    // chase each other. Allow a few passes per frame, then wait for the next.
    const passes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        n: 0,
        frame: 0,
        owed: false
    });
    const remeasure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[remeasure]": ()=>{
            const p = passes.current;
            if (!p.frame) p.frame = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clock"].layoutRaf({
                "Stage.useCallback[remeasure]": ()=>{
                    p.n = 0;
                    p.frame = 0;
                    if (!p.owed) return;
                    p.owed = false;
                    const next = measureAll();
                    setRects({
                        "Stage.useCallback[remeasure]": (prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sameRects"])(prev, next) ? prev : next
                    }["Stage.useCallback[remeasure]"]);
                }
            }["Stage.useCallback[remeasure]"]);
            if (p.n >= 4) {
                p.owed = true;
                return;
            }
            p.n++;
            const next = measureAll();
            setRects({
                "Stage.useCallback[remeasure]": (prev)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sameRects"])(prev, next) ? prev : next
            }["Stage.useCallback[remeasure]"]);
        }
    }["Stage.useCallback[remeasure]"], [
        measureAll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(remeasure);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>({
                "Stage.useLayoutEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clock"].cancelLayoutRaf(passes.current.frame);
                    passes.current = {
                        n: 0,
                        frame: 0,
                        owed: false
                    };
                }
            })["Stage.useLayoutEffect"]
    }["Stage.useLayoutEffect"], []);
    // Things that slide or scale into place move after the commit that started
    // them, so measure again once they settle.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stage.useEffect": ()=>{
            const root = rootRef.current;
            if (!root) return;
            root.addEventListener('transitionend', remeasure);
            root.addEventListener('animationend', remeasure);
            return ({
                "Stage.useEffect": ()=>{
                    root.removeEventListener('transitionend', remeasure);
                    root.removeEventListener('animationend', remeasure);
                }
            })["Stage.useEffect"];
        }
    }["Stage.useEffect"], [
        remeasure
    ]);
    const rectFor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[rectFor]": (name)=>rects[name] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY"]
    }["Stage.useCallback[rectFor]"], [
        rects
    ]);
    // Placing: until the first measurements (after fonts load) have painted,
    // and again after a wide/compact switch, nothing transitions. Otherwise
    // anything placed from rect() would visibly travel from 0,0 into place.
    const [settling, setSettling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>{
            setSettling(true);
            let live = true;
            let frame = 0;
            const release = {
                "Stage.useLayoutEffect.release": ()=>{
                    frame = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clock"].layoutRaf({
                        "Stage.useLayoutEffect.release": ()=>{
                            frame = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clock"].layoutRaf({
                                "Stage.useLayoutEffect.release": ()=>live && setSettling(false)
                            }["Stage.useLayoutEffect.release"]);
                        }
                    }["Stage.useLayoutEffect.release"]);
                }
            }["Stage.useLayoutEffect.release"];
            if (!document.fonts || document.fonts.status === 'loaded') release();
            else document.fonts.ready.then({
                "Stage.useLayoutEffect": ()=>live && release()
            }["Stage.useLayoutEffect"]);
            return ({
                "Stage.useLayoutEffect": ()=>{
                    live = false;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$clock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clock"].cancelLayoutRaf(frame);
                }
            })["Stage.useLayoutEffect"];
        }
    }["Stage.useLayoutEffect"], [
        layout
    ]);
    // When the cursor last did something; while a script plays, a cursor that
    // has sat still for longer than `idle` fades out until its next move
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Each loop: when it began, whether the cursor has moved yet, and (learned
    // from the first run) how long it waits before its first move
    const loopAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const moved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const firstMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const place = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[place]": (p)=>{
            if (loopAt.current && !moved.current && Math.hypot(p.x - pos.current.x, p.y - pos.current.y) > 0.5) {
                moved.current = true;
                firstMove.current ??= performance.now() - loopAt.current;
            }
            pos.current = p;
            active.current = performance.now();
            const el = cursorRef.current;
            if (!el) return;
            el.style.transform = `translate(${p.x}px, ${p.y}px)`;
            el.removeAttribute('data-idle');
        }
    }["Stage.useCallback[place]"], []);
    const resolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[resolve]": (t)=>{
            // One target per layout, as cursor.at takes it
            if (typeof t === 'object' && t !== null && 'wide' in t) t = layoutRef.current === 'compact' ? t.compact : t.wide;
            const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nameOf"])(t);
            if (name === null) return t;
            const root = rootRef.current;
            const el = root?.querySelector(`[data-target="${name}"]`);
            if (!root || !el) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])(`no element with data-target="${name}"`);
                return pos.current;
            }
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectOf"])(root, el, scaleRef.current);
            // A name alone, or { at } without x and y, aims at the middle
            const f = typeof t === 'string' ? {
                x: 0.5,
                y: 0.5
            } : {
                x: t.x ?? 0.5,
                y: t.y ?? 0.5
            };
            return {
                x: r.x + r.width * f.x,
                y: r.y + r.height * f.y
            };
        }
    }["Stage.useCallback[resolve]"], []);
    // Stills have no script to hover things, so mark them here.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>{
            if (!still || !hover) return;
            const root = rootRef.current;
            hover.forEach({
                "Stage.useLayoutEffect": (name)=>root?.querySelector(`[data-target="${name}"]`)?.setAttribute('data-hover', '')
            }["Stage.useLayoutEffect"]);
        }
    }["Stage.useLayoutEffect"]);
    // Rest the cursor at its start point, unless a script is running: then the
    // cursor is mid-story, and a resize must not send it back to rest
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>{
            if (cursor && !loopAt.current) place(resolve(restAt()));
        }
    }["Stage.useLayoutEffect"], [
        scale,
        layout
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // Back to the start. `glide` (a hover stage settling as the pointer leaves)
    // lets the scene's own transitions carry it back and walks the cursor home;
    // otherwise everything jumps, since nobody is watching.
    const glideId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const resetFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const cancelReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[cancelReset]": ()=>{
            ++glideId.current;
            cancelAnimationFrame(resetFrame.current);
            resetFrame.current = 0;
            rootRef.current?.removeAttribute('data-settling');
        }
    }["Stage.useCallback[cancelReset]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[reset]": (glide = false)=>{
            cancelReset();
            const id = glideId.current;
            dragging.current = false;
            setState(initial);
            setKind(cursor?.kind ?? 'pointer');
            setKeys({
                "Stage.useCallback[reset]": (k)=>({
                        ...k,
                        show: false,
                        down: false
                    })
            }["Stage.useCallback[reset]"]);
            setLastKeys(null);
            rootRef.current?.querySelectorAll('[data-hover],[data-pressed]').forEach({
                "Stage.useCallback[reset]": (el)=>{
                    el.removeAttribute('data-hover');
                    el.removeAttribute('data-pressed');
                }
            }["Stage.useCallback[reset]"]);
            rootRef.current?.removeAttribute('data-mark');
            rootRef.current?.querySelectorAll('[data-scrolled]').forEach({
                "Stage.useCallback[reset]": (el)=>{
                    el.scrollTop = 0;
                    el.removeAttribute('data-scrolled');
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$measure$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thumb"])(el);
                }
            }["Stage.useCallback[reset]"]);
            rootRef.current?.querySelectorAll('[data-scrolling]').forEach({
                "Stage.useCallback[reset]": (el)=>el.removeAttribute('data-scrolling')
            }["Stage.useCallback[reset]"]);
            cursorRef.current?.removeAttribute('data-pressed');
            hovered.current = null;
            if (!cursor) return;
            if (!glide) {
                resetFrame.current = requestAnimationFrame({
                    "Stage.useCallback[reset]": ()=>{
                        resetFrame.current = 0;
                        place(resolve(restAt()));
                        autoRef.current?.(pos.current);
                    }
                }["Stage.useCallback[reset]"]);
                return;
            }
            const root = rootRef.current;
            root?.setAttribute('data-settling', '');
            resetFrame.current = requestAnimationFrame({
                "Stage.useCallback[reset]": ()=>{
                    const from = {
                        ...pos.current
                    };
                    const end = resolve(restAt());
                    const ms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(320 + Math.hypot(end.x - from.x, end.y - from.y) * 0.7, 380, 700);
                    const t0 = performance.now();
                    const step = {
                        "Stage.useCallback[reset].step": ()=>{
                            if (glideId.current !== id) return;
                            const t = Math.min(1, (performance.now() - t0) / ms);
                            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOutCubic"])(t);
                            place({
                                x: from.x + (end.x - from.x) * e,
                                y: from.y + (end.y - from.y) * e
                            });
                            if (t < 1) resetFrame.current = requestAnimationFrame(step);
                            else {
                                resetFrame.current = 0;
                                root?.removeAttribute('data-settling');
                            }
                        }
                    }["Stage.useCallback[reset].step"];
                    step();
                }
            }["Stage.useCallback[reset]"]);
        }
    }["Stage.useCallback[reset]"], [
        layout
    ]) // eslint-disable-line react-hooks/exhaustive-deps
    ;
    // Each run gets its own act (act.ts), bound to its own signal, so a
    // canceled run can never pick up the next run's signal and keep going.
    const makeAct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[makeAct]": ()=>({
                "Stage.useMemo[makeAct]": (signal)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$act$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAct"])(signal, {
                        rootRef,
                        cursorRef,
                        pos,
                        hovered,
                        kindRef,
                        keysRef,
                        dragging,
                        autoUsed,
                        autoRef,
                        scaleRef,
                        speed,
                        layout,
                        cursor,
                        resolve,
                        place,
                        remeasure,
                        ripple,
                        setState,
                        setKind,
                        setKeys,
                        setLastKeys
                    })
            })["Stage.useMemo[makeAct]"]
    }["Stage.useMemo[makeAct]"], [
        resolve,
        place,
        speed,
        layout
    ]);
    // Run the loop only while the stage is on screen and the tab is visible.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stage.useEffect": ()=>{
            const stage = rootRef.current;
            if (still || !script) {
                reset();
                stage.removeAttribute('data-offscreen');
                setState(poster ?? initial);
                return cancelReset;
            }
            // A changed script, layout or motion preference starts a fresh scene.
            // Cleanup only releases resources; it never schedules another reset.
            reset();
            const root = fitRef.current;
            let ctrl = null;
            let onScreen = false;
            let hovering = false;
            let done = false;
            // Idle: a cursor waiting to start reads as a stuck one, so before its
            // first move it steps out of the shot. Once it has acted, resting to
            // watch the result is part of the story: only a long stillness fades it,
            // and never while it holds a press or rests on what it hovers.
            const idle = cursor?.idle ?? 4000;
            const LEAD = 1200;
            let idleTimer = 0;
            let revealTimer = 0;
            const watchIdle = {
                "Stage.useEffect.watchIdle": ()=>{
                    window.clearInterval(idleTimer);
                    if (!cursor || idle === false) return;
                    active.current = performance.now();
                    idleTimer = window.setInterval({
                        "Stage.useEffect.watchIdle": ()=>{
                            const el = cursorRef.current;
                            if (!el) return;
                            const now = performance.now();
                            if (!moved.current) {
                                // Later loops know when it moves and handle it in beginLoop
                                if (firstMove.current === null && now - active.current > LEAD) el.setAttribute('data-idle', '');
                                return;
                            }
                            if (el.hasAttribute('data-pressed') || rootRef.current?.querySelector('[data-hover]')) active.current = now;
                            else if (now - active.current > idle) el.setAttribute('data-idle', '');
                        }
                    }["Stage.useEffect.watchIdle"], 150);
                }
            }["Stage.useEffect.watchIdle"];
            const beginLoop = {
                "Stage.useEffect.beginLoop": ()=>{
                    loopAt.current = performance.now();
                    moved.current = false;
                    window.clearTimeout(revealTimer);
                    const el = cursorRef.current;
                    const wait = firstMove.current;
                    if (idle === false || !el || wait === null || wait <= LEAD) return;
                    // A long opening wait: out now, back in just before the first move
                    el.setAttribute('data-idle', '');
                    revealTimer = window.setTimeout({
                        "Stage.useEffect.beginLoop": ()=>el.removeAttribute('data-idle')
                    }["Stage.useEffect.beginLoop"], wait - 400);
                }
            }["Stage.useEffect.beginLoop"];
            const unwatchIdle = {
                "Stage.useEffect.unwatchIdle": ()=>{
                    window.clearInterval(idleTimer);
                    window.clearTimeout(revealTimer);
                    loopAt.current = 0;
                    cursorRef.current?.removeAttribute('data-idle');
                }
            }["Stage.useEffect.unwatchIdle"];
            const finishIdle = {
                "Stage.useEffect.finishIdle": ()=>{
                    window.clearInterval(idleTimer);
                    window.clearTimeout(revealTimer);
                    // A completed once scene cannot move again. Keep a hovered/pressed
                    // cursor visible, or finish its existing idle delay with one timeout.
                    // There is no reason to poll the held ending forever.
                    const el = cursorRef.current;
                    const held = {
                        "Stage.useEffect.finishIdle.held": ()=>el?.hasAttribute('data-pressed') || stage.querySelector('[data-hover]')
                    }["Stage.useEffect.finishIdle.held"];
                    if (!cursor || idle === false || !el || el.hasAttribute('data-idle') || held()) return;
                    const delay = (moved.current ? idle : LEAD) - (performance.now() - active.current);
                    revealTimer = window.setTimeout({
                        "Stage.useEffect.finishIdle": ()=>{
                            if (!held()) el.setAttribute('data-idle', '');
                        }
                    }["Stage.useEffect.finishIdle"], Math.max(0, delay));
                }
            }["Stage.useEffect.finishIdle"];
            const start = {
                "Stage.useEffect.start": ()=>{
                    if (ctrl || done || !onScreen || document.hidden) return;
                    if (play === 'hover' && !hovering) return;
                    cancelReset();
                    if (cursor) place(resolve(restAt()));
                    ctrl = new AbortController();
                    const signal = ctrl.signal;
                    watchIdle();
                    const act = makeAct(signal);
                    ({
                        "Stage.useEffect.start": async ()=>{
                            do {
                                beginLoop();
                                try {
                                    await script(act);
                                } catch (e) {
                                    if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$act$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stopped"]) return;
                                    // A real error in the script: report it once and stand the stage
                                    // down, so a later start() can run it again
                                    console.error('[stageshow] script error', e);
                                    ctrl = null;
                                    unwatchIdle();
                                    return;
                                }
                                if (play === 'loop' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDev"])()) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$act$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkSeam"])(stateRef.current, initial, pos.current, cursor ? resolve(restAt()) : null);
                            }while (play === 'loop' && !signal.aborted)
                            // Once holds its end state for good; hover holds it until the pointer leaves.
                            if (play === 'once' && !signal.aborted) {
                                done = true;
                                finishIdle();
                            }
                        }
                    })["Stage.useEffect.start"]();
                }
            }["Stage.useEffect.start"];
            const stop = {
                "Stage.useEffect.stop": (glide = false)=>{
                    unwatchIdle();
                    if (!ctrl) return;
                    ctrl.abort();
                    ctrl = null;
                    if (!done) reset(glide);
                }
            }["Stage.useEffect.stop"];
            const markOffscreen = {
                "Stage.useEffect.markOffscreen": ()=>stage.toggleAttribute('data-offscreen', !onScreen || document.hidden)
            }["Stage.useEffect.markOffscreen"];
            markOffscreen();
            const io = new IntersectionObserver({
                "Stage.useEffect": ([entry])=>{
                    onScreen = entry.isIntersecting;
                    // Off screen its CSS animations pause too, so nothing runs out of view
                    markOffscreen();
                    onScreen ? start() : stop();
                }
            }["Stage.useEffect"]);
            io.observe(root);
            const onVisibility = {
                "Stage.useEffect.onVisibility": ()=>{
                    markOffscreen();
                    document.hidden ? stop() : start();
                }
            }["Stage.useEffect.onVisibility"];
            document.addEventListener('visibilitychange', onVisibility);
            const enter = {
                "Stage.useEffect.enter": ()=>{
                    hovering = true;
                    start();
                }
            }["Stage.useEffect.enter"];
            const leave = {
                "Stage.useEffect.leave": ()=>{
                    hovering = false;
                    stop(true);
                }
            }["Stage.useEffect.leave"];
            if (play === 'hover') {
                root.addEventListener('pointerenter', enter);
                root.addEventListener('pointerleave', leave);
            }
            return ({
                "Stage.useEffect": ()=>{
                    io.disconnect();
                    document.removeEventListener('visibilitychange', onVisibility);
                    root.removeEventListener('pointerenter', enter);
                    root.removeEventListener('pointerleave', leave);
                    unwatchIdle();
                    ctrl?.abort();
                    ctrl = null;
                    autoRef.current = null;
                    cancelReset();
                }
            })["Stage.useEffect"];
        }
    }["Stage.useEffect"], [
        still,
        script,
        makeAct,
        play,
        layout
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Stage.useLayoutEffect": ()=>{
            if (cursor && !still && !dragging.current) autoRef.current?.(pos.current);
        }
    }["Stage.useLayoutEffect"], [
        state
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    const look = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Stage.useMemo[look]": ()=>({
                theme,
                palette,
                fidelity,
                layout
            })
    }["Stage.useMemo[look]"], [
        theme,
        palette,
        fidelity,
        layout
    ]);
    const showCursor = cursor && (!script || !still || cursor.still);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: fitRef,
        className: `ss-fit${className ? ` ${className}` : ''}`,
        style: {
            maxWidth: grows ? undefined : width,
            height: designH * scale
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: rootRef,
            className: "ss-stage",
            "data-specimen": specimen || undefined,
            "data-unframed": unframed || undefined,
            "data-still": still || undefined,
            "data-placing": settling || undefined,
            "data-theme": theme,
            "data-palette": palette,
            "data-greys": greys === 'cool' ? 'cool' : undefined,
            "data-fidelity": fidelity,
            "data-layout": layout,
            style: {
                width: designW,
                height: designH,
                marginLeft: inset || undefined,
                transform: `scale(${scale})`,
                ...tokens,
                ...accent ? {
                    ['--ss-accent']: accent,
                    ['--ss-accent-2']: accent,
                    ['--ss-accent-soft']: `color-mix(in srgb, ${accent} 14%, transparent)`
                } : null
            },
            children: [
                ground && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-ground",
                    "aria-hidden": true,
                    style: Array.isArray(ground) ? {
                        ['--ss-orb-1']: ground[0],
                        ['--ss-orb-2']: ground[1],
                        ...ground[2] ? {
                            ['--ss-orb-3']: ground[2]
                        } : null
                    } : undefined
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/stage.tsx",
                    lineNumber: 594,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StillContext"].Provider, {
                    value: still,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LookContext"].Provider, {
                        value: look,
                        children: children(state, rectFor, layout)
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/stage.tsx",
                        lineNumber: 605,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/stage.tsx",
                    lineNumber: 604,
                    columnNumber: 9
                }, this),
                script && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$keys$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keycaps"], {
                    rows: [
                        lastKeys,
                        keys
                    ],
                    at: typeof keysAt === 'string' ? keysAt : keysAt[layout]
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/stage.tsx",
                    lineNumber: 607,
                    columnNumber: 20
                }, this),
                showCursor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$cursor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cursor"], {
                    cursorRef: cursorRef,
                    style: cursor.style,
                    kind: kind
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/stage.tsx",
                    lineNumber: 608,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/stage.tsx",
            lineNumber: 572,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/stage.tsx",
        lineNumber: 571,
        columnNumber: 5
    }, this);
}
_s(Stage, "SKPyaMKqdeo4+6HGMXzfZiM4rIM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Stage;
var _c;
__turbopack_context__.k.register(_c, "Stage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/util.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Small helpers shared by the stage and its script API.
// Development only. Bundlers (Vite, Next, esbuild with a define) replace
// process.env.NODE_ENV, so a production build never warns; with no bundler
// to replace it, `process` is missing and this counts as development.
__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "easeInOutCubic",
    ()=>easeInOutCubic,
    "hash",
    ()=>hash,
    "isDev",
    ()=>isDev,
    "warn",
    ()=>warn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function isDev() {
    try {
        return ("TURBOPACK compile-time value", "development") !== 'production';
    } catch  {
        return true;
    }
}
function warn(msg) {
    if (isDev()) console.warn(`[stageshow] ${msg}`);
}
const clamp = (v, lo, hi)=>Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (t)=>t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const hash = (i)=>{
    const x = Math.sin(i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/vendor/stageshow/window.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bar",
    ()=>Bar,
    "Caret",
    ()=>Caret,
    "Prompt",
    ()=>Prompt,
    "Text",
    ()=>Text,
    "Window",
    ()=>Window
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/vendor/stageshow/looks.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
/** The traffic lights. Every chrome puts them in the same spot: centered in the top 38px, 12px in. */ function Lights() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ss-window__lights",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-window__dot"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-window__dot"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-window__dot"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = Lights;
function Lock() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "ss-window__lock",
        width: "7",
        height: "8",
        viewBox: "0 0 7 8",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M1.5 3.3V2.4a2 2 0 0 1 4 0v.9",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.1"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "0",
                y: "3.3",
                width: "7",
                height: "4.7",
                rx: "1.2",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c1 = Lock;
function Chevron({ back }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "ss-window__chev",
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: back ? 'M6.5 1.5 3 5l3.5 3.5' : 'M3.5 1.5 7 5 3.5 8.5',
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.4",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c2 = Chevron;
function Window({ url, urlShape, tabs, nav, title, sidebar, sidebarWidth = 180, sidebarStyle, toolbar, lead, body, className, receded, chrome, lights, lightsSize, barSize, children, ...rest }) {
    const cls = `ss-window ss-recede${className ? ` ${className}` : ''}`;
    const large = lightsSize === 'large' ? 'large' : undefined;
    const tall = barSize === 'tall' ? 'tall' : undefined;
    if (chrome === 'terminal') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...rest,
            className: cls,
            "data-chrome": "terminal",
            "data-lights": lights === 'grey' ? 'grey' : undefined,
            "data-lights-size": large,
            "data-receded": receded || undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-window__bar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        title !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-term__title",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 107,
                            columnNumber: 35
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...body,
                    className: `ss-window__body ss-term${body?.className ? ` ${body.className}` : ''}`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, this);
    }
    if (chrome === 'glass' || chrome === 'card' || chrome === 'hairline') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...rest,
            className: cls,
            "data-chrome": chrome,
            "data-lights": lights === 'color' || lights === 'white' ? lights : chrome === 'glass' ? 'grey' : undefined,
            "data-receded": receded || undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-window__bar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        url !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-window__url",
                            children: [
                                chrome === 'glass' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lock, {}, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                                    lineNumber: 121,
                                    columnNumber: 38
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ss-window__url-text",
                                    children: url
                                }, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ss-window__end",
                            children: toolbar
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...body,
                    className: `ss-window__body${body?.className ? ` ${body.className}` : ''}`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this);
    }
    const address = url !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            nav && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-window__nav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
                        back: true
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {}, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-window__url",
                children: url
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
    if (sidebar !== undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...rest,
            className: cls,
            "data-kind": "sidebar",
            "data-side": sidebarStyle === 'floating' ? 'floating' : undefined,
            "data-lights": lights === 'grey' ? 'grey' : undefined,
            "data-lights-size": large,
            "data-bar": tall,
            "data-receded": receded || undefined,
            "data-url-shape": urlShape,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "ss-window__side",
                    style: {
                        width: sidebarWidth
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ss-window__side-top",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                                fileName: "[project]/src/vendor/stageshow/window.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        sidebar
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-window__main",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ss-window__bar",
                            children: [
                                title !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ss-window__heading",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                                    lineNumber: 155,
                                    columnNumber: 37
                                }, this),
                                lead,
                                address,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ss-window__spacer"
                                }, void 0, false, {
                                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                toolbar
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ...body,
                            className: `ss-window__body${body?.className ? ` ${body.className}` : ''}`,
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this);
    }
    if (tabs?.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...rest,
            className: cls,
            "data-kind": "tabs",
            "data-lights": lights === 'grey' ? 'grey' : undefined,
            "data-lights-size": large,
            "data-receded": receded || undefined,
            "data-url-shape": urlShape,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-window__tabs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                            fileName: "[project]/src/vendor/stageshow/window.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        tabs.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ss-window__tab",
                                "data-active": i === 0 || undefined,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-window__favicon"
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ss-window__tab-label",
                                        children: t
                                    }, void 0, false, {
                                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/vendor/stageshow/window.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ss-window__bar",
                    children: [
                        address,
                        toolbar
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...body,
                    className: `ss-window__body${body?.className ? ` ${body.className}` : ''}`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/vendor/stageshow/window.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: cls,
        "data-receded": receded || undefined,
        "data-url-shape": urlShape,
        "data-lights": lights === 'grey' ? 'grey' : undefined,
        "data-lights-size": large,
        "data-bar": tall,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ss-window__bar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Lights, {}, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    address,
                    title !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-window__title",
                        "data-toolbar": toolbar ? true : undefined,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                        lineNumber: 193,
                        columnNumber: 33
                    }, this),
                    lead,
                    url === undefined && title === undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ss-window__spacer"
                    }, void 0, false, {
                        fileName: "[project]/src/vendor/stageshow/window.tsx",
                        lineNumber: 195,
                        columnNumber: 54
                    }, this),
                    toolbar
                ]
            }, void 0, true, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...body,
                className: `ss-window__body${body?.className ? ` ${body.className}` : ''}`,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_c3 = Window;
const INK = [
    'var(--ss-ink-1)',
    'var(--ss-ink-2)',
    'var(--ss-ink-3)',
    'var(--ss-ink-4)',
    'var(--ss-ink-5)'
];
function Bar({ w, h = 6, tone = 3, r = 2, shrink, className, style, ...rest }) {
    const gives = shrink ?? (typeof w === 'number' && w > h * 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-bar${className ? ` ${className}` : ''}`,
        "data-shrink": gives || undefined,
        style: {
            width: w,
            height: h,
            borderRadius: r,
            background: INK[tone - 1],
            ...style
        }
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 221,
        columnNumber: 10
    }, this);
}
_c4 = Bar;
function Text({ children, w, h = 6, tone = 3, wrap, filler, className, style, ...rest }) {
    _s();
    const { fidelity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"])();
    if (fidelity === 'minimal' || filler && fidelity !== 'realistic') {
        const size = typeof style?.fontSize === 'number' ? style.fontSize : 11;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bar, {
            ...rest,
            w: w ?? Math.round(children.length * size * 0.52),
            h: h,
            tone: tone,
            className: className
        }, void 0, false, {
            fileName: "[project]/src/vendor/stageshow/window.tsx",
            lineNumber: 244,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ...rest,
        className: `ss-text${className ? ` ${className}` : ''}`,
        "data-wrap": wrap || undefined,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_s(Text, "hUTSSXXTYq0vfYdAvmoANYDcZ3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$vendor$2f$stageshow$2f$looks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLook"]
    ];
});
_c5 = Text;
function Prompt({ path = '~', children, className, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...rest,
        className: `ss-term__line ss-term__prompt${className ? ` ${className}` : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-term__path",
                children: path
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-term__sigil",
                children: "❯"
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ss-term__cmd",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/vendor/stageshow/window.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
_c6 = Prompt;
function Caret({ still }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ss-term__caret",
        "data-still": still || undefined,
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/src/vendor/stageshow/window.tsx",
        lineNumber: 275,
        columnNumber: 10
    }, this);
}
_c7 = Caret;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Lights");
__turbopack_context__.k.register(_c1, "Lock");
__turbopack_context__.k.register(_c2, "Chevron");
__turbopack_context__.k.register(_c3, "Window");
__turbopack_context__.k.register(_c4, "Bar");
__turbopack_context__.k.register(_c5, "Text");
__turbopack_context__.k.register(_c6, "Prompt");
__turbopack_context__.k.register(_c7, "Caret");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1jq7n2b48_cvd._.js.map