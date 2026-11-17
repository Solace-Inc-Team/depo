import { test } from "node:test";
import assert from "node:assert/strict";
import { linkWhatsApp, mensagemFiado, mensagemSaida } from "./whatsapp.ts";

test("whatsapp: link com o 55 do Brasil e a mensagem codificada; sem DDD não há link", () => {
  assert.equal(linkWhatsApp("(11) 98888-7777"), "https://wa.me/5511988887777");
  assert.equal(linkWhatsApp("+55 11 98888-7777", "Oi & tchau"), "https://wa.me/5511988887777?text=Oi%20%26%20tchau");
  assert.equal(linkWhatsApp("98888-7777"), null);
  assert.equal(linkWhatsApp(null), null);
});

test("whatsapp: aviso de saída e cobrança do fiado", () => {
  assert.equal(
    mensagemSaida({ cliente: "Maria Souza", loja: "Fonte Azul", numero: 12, entregador: "João Pereira", link: "https://x/a" }),
    "Olá, Maria! Seu pedido #12 da Fonte Azul saiu para entrega com João. Acompanhe por aqui: https://x/a",
  );
  const fiado = mensagemFiado({ cliente: "Maria", loja: "Fonte Azul", devendoCents: 5600, pixKey: " 11222333000144 " });
  assert.match(fiado, /Consta em aberto R\$\s56,00 das compras no fiado\.\nSe puder, pague pelo Pix: 11222333000144\n/);
  assert.doesNotMatch(mensagemFiado({ cliente: "Maria", loja: "X", devendoCents: 100, pixKey: "" }), /Pix/, "sem chave, não fala em Pix");
});
