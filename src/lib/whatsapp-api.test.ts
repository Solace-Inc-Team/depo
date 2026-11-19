import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { assinaturaMetaOk, mensagemParaWhats, mensagensDoAviso, telefoneDoWhats } from "./whatsapp-api.ts";

test("whatsapp api: assinatura do aviso confere só com o segredo certo e o corpo intacto", () => {
  const corpo = '{"entry":[]}';
  const sig = "sha256=" + createHmac("sha256", "segredo").update(corpo).digest("hex");
  assert.equal(assinaturaMetaOk("segredo", corpo, sig), true);
  assert.equal(assinaturaMetaOk("outro", corpo, sig), false);
  assert.equal(assinaturaMetaOk("segredo", corpo + " ", sig), false);
  assert.equal(assinaturaMetaOk("segredo", corpo, null), false);
  assert.equal(assinaturaMetaOk("segredo", corpo, "sha256=abc"), false);
  // sem segredo configurado, nada passa
  assert.equal(assinaturaMetaOk("", corpo, sig), false);
});

test("whatsapp api: celular antigo sem o 9 ganha o 9; fixo e número completo ficam como vieram", () => {
  assert.equal(telefoneDoWhats("5511987654321"), "11987654321");
  assert.equal(telefoneDoWhats("551187654321"), "11987654321");
  assert.equal(telefoneDoWhats("551134556677"), "1134556677");
});

test("whatsapp api: lê texto, botão e lista; ignora status e áudio", () => {
  const aviso = {
    entry: [
      {
        changes: [
          {
            field: "messages",
            value: {
              metadata: { phone_number_id: "123" },
              messages: [
                { from: "5511987654321", id: "m1", type: "text", text: { body: "oi" } },
                { from: "5511987654321", id: "m2", type: "interactive", interactive: { button_reply: { id: "repetir", title: "Repetir pedido" } } },
                { from: "5511987654321", id: "m3", type: "interactive", interactive: { list_reply: { id: "p:abc", title: "Água 20L" } } },
                { from: "5511987654321", id: "m4", type: "audio" },
              ],
              statuses: [{ id: "m0", status: "read" }],
            },
          },
        ],
      },
    ],
  };
  assert.deepEqual(mensagensDoAviso(aviso), [
    { numeroId: "123", de: "5511987654321", id: "m1", entrada: { texto: "oi" } },
    { numeroId: "123", de: "5511987654321", id: "m2", entrada: { id: "repetir", texto: "Repetir pedido" } },
    { numeroId: "123", de: "5511987654321", id: "m3", entrada: { id: "p:abc", texto: "Água 20L" } },
  ]);
  assert.deepEqual(mensagensDoAviso({ entry: [{ changes: [{ field: "messages", value: { statuses: [{}] } }] }] }), []);
  assert.deepEqual(mensagensDoAviso(null), []);
});

test("whatsapp api: respostas do robô respeitam os limites da Cloud API", () => {
  const botoes = mensagemParaWhats("55119", {
    tipo: "botoes",
    texto: "Como vai pagar?",
    botoes: [
      { id: "a", titulo: "Um título de botão comprido demais" },
      { id: "b", titulo: "B" },
      { id: "c", titulo: "C" },
      { id: "d", titulo: "D" },
    ],
  }) as { type: string; interactive: { action: { buttons: { reply: { title: string } }[] } } };
  assert.equal(botoes.type, "interactive");
  assert.equal(botoes.interactive.action.buttons.length, 3);
  assert.ok(botoes.interactive.action.buttons.every((b) => b.reply.title.length <= 20));

  const lista = mensagemParaWhats("55119", {
    tipo: "lista",
    texto: "Escolha",
    botao: "Ver produtos",
    itens: Array.from({ length: 12 }, (_, i) => ({ id: `p:${i}`, titulo: `Produto ${i}`, descricao: "R$ 14,00" })),
  }) as { interactive: { type: string; action: { sections: { rows: unknown[] }[] } } };
  assert.equal(lista.interactive.type, "list");
  assert.equal(lista.interactive.action.sections[0].rows.length, 10);

  // botão sem opção vira texto: a Cloud API recusa mensagem interativa vazia
  assert.equal((mensagemParaWhats("55119", { tipo: "botoes", texto: "Oi", botoes: [] }) as { type: string }).type, "text");
});
