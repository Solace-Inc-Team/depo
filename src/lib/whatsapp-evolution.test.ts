import { test } from "node:test";
import assert from "node:assert/strict";
import { chaveOk, mensagemDoAviso, textoParaWhats } from "./whatsapp-evolution.ts";

const aviso = (key: object, message: object = { conversation: "oi" }, event = "messages.upsert") => ({ event, instance: "depo-teste", data: { key, message } });

test("evolution: lê a mensagem do cliente e ignora o resto", () => {
  const m = mensagemDoAviso(aviso({ remoteJid: "559184747881@s.whatsapp.net", fromMe: false, id: "A1" }));
  assert.deepEqual(m, { instancia: "depo-teste", jid: "559184747881@s.whatsapp.net", telefone: "559184747881", id: "A1", entrada: { texto: "oi" } });
  assert.equal(mensagemDoAviso(aviso({ remoteJid: "559184747881@s.whatsapp.net", fromMe: true, id: "A2" })), null, "o que o próprio número mandou");
  assert.equal(mensagemDoAviso(aviso({ remoteJid: "1203630@g.us", id: "A3" })), null, "grupo");
  assert.equal(mensagemDoAviso(aviso({ remoteJid: "559184747881@s.whatsapp.net", id: "A4" }, { imageMessage: {} })), null, "foto");
  assert.equal(mensagemDoAviso(aviso({ remoteJid: "559184747881@s.whatsapp.net", id: "A5" }, {}, "messages.update")), null, "outro evento");
  assert.equal(mensagemDoAviso(aviso({ remoteJid: "123@lid", id: "A6" })), null, "@lid sem o celular ao lado");
  const lid = mensagemDoAviso(aviso({ remoteJid: "123@lid", remoteJidAlt: "5591984747881@s.whatsapp.net", id: "A7" }, { extendedTextMessage: { text: "2" } }));
  assert.equal(lid?.jid, "123@lid", "responde no mesmo endereço da conversa");
  assert.equal(lid?.telefone, "5591984747881");
  assert.equal(lid?.entrada.texto, "2");
});

test("evolution: opções viram lista numerada", () => {
  assert.equal(textoParaWhats({ tipo: "texto", texto: "Certo!" }), "Certo!");
  assert.equal(
    textoParaWhats({ tipo: "lista", texto: "Escolha o produto:", botao: "Ver", itens: [{ id: "p:g", titulo: "Gás P13", descricao: "R$ 115,00" }, { id: "p:a", titulo: "Água 20L" }] }),
    "Escolha o produto:\n\n*1* Gás P13 · R$ 115,00\n*2* Água 20L\n\n_Responda com o número._",
  );
  assert.equal(textoParaWhats({ tipo: "botoes", texto: "Quantos?", botoes: [{ id: "q:1", titulo: "1" }, { id: "q:2", titulo: "2" }] }), "Quantos?\n\n_Responda com o número._");
});

test("evolution: chave do webhook", () => {
  assert.equal(chaveOk("segredo", "segredo"), true);
  assert.equal(chaveOk("segredo", "errado!"), false);
  assert.equal(chaveOk("", ""), false, "sem chave configurada, recusa tudo");
  assert.equal(chaveOk("segredo", null), false);
});
