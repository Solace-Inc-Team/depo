import { test } from "node:test";
import assert from "node:assert/strict";
import { bairroDe, sugerirEntregadores } from "./sugestao.ts";

test("bairro sai do fim do endereço, nos formatos que as lojas digitam", () => {
  assert.equal(bairroDe("Rua das Flores, 99 - Centro"), "centro");
  assert.equal(bairroDe("Rua XV de Novembro, 300, Centro"), "centro");
  assert.equal(bairroDe("Rua das Acácias, 120, Jd. Primavera"), "jd. primavera");
  assert.equal(bairroDe("Passagem Marcílio Dias, 58 - Guamá"), "guama");
  assert.equal(bairroDe("Rua Manoel Barata - Cruzeiro (Icoaraci)"), "cruzeiro (icoaraci)");
  assert.equal(bairroDe("Rua Sem Bairro, 120"), null);
  assert.equal(bairroDe("Edifício Fontana D'oro"), null);
  assert.equal(bairroDe(null), null);
});

const carlos = { id: "c", nome: "Carlos", enderecosNaRua: [] as (string | null)[], entreguesNoTurno: 5 };
const joao = { id: "j", nome: "João", enderecosNaRua: [] as (string | null)[], entreguesNoTurno: 2 };

test("quem já vai para o bairro leva; senão, quem está mais livre", () => {
  const comRota = { ...carlos, enderecosNaRua: ["Av. Brasil, 820, Centro"] };
  const s = sugerirEntregadores([{ id: "p1", endereco: "Rua das Flores, 99 - Centro" }], [comRota, joao]);
  assert.deepEqual(s.get("p1"), { entregadorId: "c", motivo: "bairro", bairro: "centro", bairroEscrito: "Centro" });
  // outro bairro: vai para quem tem menos na rua (João, livre)
  const s2 = sugerirEntregadores([{ id: "p2", endereco: "Rua Projetada, 10, Vila Nova" }], [comRota, joao]);
  assert.deepEqual(s2.get("p2"), { entregadorId: "j", motivo: "livre" });
});

test("empate de livres: quem entregou menos no turno; a fila não manda tudo para o mesmo", () => {
  const fila = [
    { id: "a", endereco: "Rua 1, 10, Centro" },
    { id: "b", endereco: "Rua 2, 20, Vila Nova" },
    { id: "c", endereco: "Rua 3, 30, Centro" },
  ];
  const s = sugerirEntregadores(fila, [carlos, joao]);
  // João entregou menos: leva o primeiro; o segundo (outro bairro) vai para o Carlos; o terceiro acompanha o primeiro
  assert.equal(s.get("a")?.entregadorId, "j");
  assert.equal(s.get("b")?.entregadorId, "c");
  assert.deepEqual(s.get("c"), { entregadorId: "j", motivo: "bairro", bairro: "centro", bairroEscrito: "Centro" });
  assert.equal(sugerirEntregadores(fila, []).size, 0);
});
