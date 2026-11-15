import { test, expect, type Page } from "@playwright/test";

// Roda sobre a empresa de demonstração recém-criada (scripts/e2e-server.mjs).
const SENHA = "demo1234";

async function entrar(page: Page, email: string) {
  await page.context().clearCookies();
  await page.goto("/login");
  // espera a página ficar pronta: com o servidor frio, o React chegava depois e limpava os campos já digitados
  await page.waitForLoadState("networkidle");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(SENHA);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).not.toHaveURL(/login/);
}

/** Cadastro em dois passos: você, depois a revenda. */
async function cadastrar(page: Page, d: { nome: string; email: string; revenda: string; vende: "Água" | "Gás" | "Os dois" }) {
  await page.getByLabel("Seu nome").fill(d.nome);
  await page.getByLabel("E-mail").fill(d.email);
  await page.getByLabel("Senha", { exact: true }).fill("senha-boa-1");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Nome da revenda").fill(d.revenda);
  await page.getByText(d.vende, { exact: true }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Criar conta" }).click();
}

const mais = (page: Page, produto: string) => page.getByRole("group", { name: `Quantidade de ${produto}` }).getByRole("button", { name: "Aumentar" });

test("pedido em dinheiro: atendente lança, entregador entrega, caixa faz o acerto", async ({ page }) => {
  await entrar(page, "atendente@demo.com");
  await page.goto("/pedidos/novo");
  await page.getByLabel(/Buscar por nome/).fill("Ana");
  await page.getByRole("button", { name: /Ana Ribeiro/ }).click();
  await mais(page, "Gás P13").click();
  await page.getByLabel("Entregador").selectOption({ label: "Carlos Mendes" });
  await page.getByRole("button", { name: "Lançar pedido" }).click();
  await expect(page).toHaveURL(/\/pedidos\/[0-9a-f-]{36}/);
  await expect(page.getByText("Em rota").first()).toBeVisible();

  // o atendente não fecha acerto: só o caixa e o dono
  await page.goto("/caixa");
  await expect(page.getByRole("link", { name: "Ver turno" }).first()).toBeVisible();

  await entrar(page, "carlos@demo.com");
  await expect(page).toHaveURL(/entregador/);
  await expect(page.getByRole("heading", { name: "2 entregas para fazer" })).toBeVisible();
  for (const restam of ["1 entrega para fazer", "Nenhuma entrega pendente"]) {
    await page.getByRole("button", { name: /^Entreguei/ }).first().click();
    await expect(page.getByRole("button", { name: "Desfazer" })).toBeVisible();
    await expect(page.getByRole("heading", { name: restam })).toBeVisible({ timeout: 15_000 });
  }
  // troco de 30 + 110 da entrega em dinheiro; a outra era no cartão
  await expect(page.getByLabel("Seu caixa")).toContainText("R$ 140,00");

  await entrar(page, "caixa@demo.com");
  await page.goto("/caixa");
  await page.getByRole("listitem").filter({ hasText: "Carlos Mendes" }).getByRole("link", { name: "Acerto", exact: true }).click();
  await expect(page.getByLabel("Conta do acerto")).toContainText("R$ 140,00");
  await page.getByLabel("Dinheiro contado").fill("140,00");
  await page.getByRole("button", { name: "Fechar acerto" }).click();
  // confirmação na janela do sistema: título é a pergunta, o texto traz a conta
  const janela = page.getByRole("dialog", { name: "Fechar o acerto?" });
  await expect(janela).toContainText("bateu");
  await janela.getByRole("button", { name: "Fechar acerto" }).click();
  await expect(page.getByText("Contado no acerto")).toBeVisible();
  await expect(page.getByLabel("Conta do acerto")).toContainText("sem diferença");
});

test("fiado: venda no balcão vira dívida e o pagamento quita", async ({ page }) => {
  await entrar(page, "dono@demo.com");
  await page.goto("/pedidos/novo");
  await page.getByRole("tab", { name: "Venda no balcão" }).click();
  await page.getByLabel(/Buscar por nome/).fill("Cláudia");
  await page.getByRole("button", { name: /Cláudia Martins/ }).click();
  await mais(page, "Galão de água 20L").click();
  await page.getByRole("button", { name: "Fiado", exact: true }).click();
  await page.getByRole("button", { name: "Registrar venda" }).click();
  await expect(page).toHaveURL(/\/pedidos\/[0-9a-f-]{36}/);

  await page.getByRole("link", { name: "Cláudia Martins" }).click();
  await expect(page.getByText("Saldo devedor")).toBeVisible();
  await page.getByRole("button", { name: "Registrar", exact: true }).click();
  await expect(page.getByText("Tudo pago")).toBeVisible();
});

test("portal: cliente pede pelo link e o pedido chega à fila com o selo do site", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/pedir/fonte-azul");
  await mais(page, "Galão de água 20L").click();
  await page.getByLabel("Seu nome").fill("Cliente do Portal");
  await page.getByLabel("Telefone com DDD").fill("(11) 95555-0101");
  await page.getByLabel("Endereço").fill("Rua das Flores, 12 - Centro");
  await page.getByRole("button", { name: "Dinheiro na entrega" }).click();
  await page.getByRole("button", { name: "Fazer pedido" }).click();
  await expect(page.getByText(/Pedido #\d+ recebido/)).toBeVisible();
  // o cliente acompanha pelo link: a página abre sem login com o pedido recebido
  await page.getByRole("link", { name: "Acompanhar pedido" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Pedido #\d+/);
  await expect(page.getByText("Recebido, a loja está separando")).toBeVisible();

  await entrar(page, "atendente@demo.com");
  await page.goto("/entregas");
  const naFila = page.getByRole("listitem").filter({ hasText: "Cliente do Portal" });
  await expect(naFila).toContainText("Site");
  await expect(naFila).toContainText("Rua das Flores, 12");
});

test("portal no Pix: o pedido só entra na fila depois que a loja confirma o pagamento", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/pedir/fonte-azul");
  await mais(page, "Galão de água 20L").click();
  await page.getByLabel("Seu nome").fill("Cliente do Pix");
  await page.getByLabel("Telefone com DDD").fill("(11) 95555-0202");
  await page.getByLabel("Endereço").fill("Rua do Pix, 7 - Centro");
  await page.getByRole("button", { name: "Pix" }).click();
  await page.getByRole("button", { name: "Fazer pedido" }).click();
  // a loja de demonstração não tem Mercado Pago: quem libera é a loja, ao conferir o extrato
  await expect(page.getByText(/assim que a loja confirmar o pagamento/)).toBeVisible();

  await entrar(page, "caixa@demo.com");
  await page.goto("/entregas");
  const esperando = page.getByRole("listitem").filter({ hasText: "Cliente do Pix" });
  await expect(page.getByRole("heading", { name: /Esperando o Pix/ })).toBeVisible();
  // fora da fila: não há como mandar para entrega antes de pagar
  await expect(esperando.getByRole("button", { name: "Saiu para entrega" })).toHaveCount(0);
  await esperando.getByRole("button", { name: "Recebi o Pix" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Recebi o Pix" }).click();
  await expect(page.getByRole("heading", { name: /Esperando o Pix/ })).toHaveCount(0);
  const naFila = page.getByRole("listitem").filter({ hasText: "Cliente do Pix" });
  await expect(naFila.getByRole("button", { name: "Saiu para entrega" })).toBeVisible();
});

test("cada perfil só entra no que é seu", async ({ page }) => {
  await entrar(page, "joao@demo.com");
  await page.goto("/caixa");
  await expect(page).toHaveURL(/entregador/);
  await page.goto("/configuracoes");
  await expect(page).toHaveURL(/entregador/);

  await entrar(page, "atendente@demo.com");
  await page.goto("/configuracoes");
  await expect(page).not.toHaveURL(/configuracoes/);
  // auditoria é só do dono
  await page.goto("/auditoria");
  await expect(page).not.toHaveURL(/auditoria/);
  expect((await page.goto("/admin"))?.status()).toBe(404);
  expect((await page.request.get("/exportar")).status()).toBe(401);
});

test("na raiz, visitante vê a apresentação e quem está logado cai no painel", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Onde está cada casco");

  await entrar(page, "dono@demo.com");
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Painel do dia" })).toBeVisible();
});

test("cadastro: o dono cria a conta pela página inicial e cai no painel com os primeiros passos", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/");
  await page.getByRole("link", { name: "Criar conta" }).first().click();
  await expect(page).toHaveURL(/\/cadastro/);
  await page.waitForLoadState("networkidle");
  // sem e-mail não passa do primeiro passo
  await page.getByLabel("Seu nome").fill("Rita");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText(/Preencha o campo "E-mail"/)).toBeVisible();
  // e-mail que já tem conta: volta ao primeiro passo, com o aviso no próprio campo
  await cadastrar(page, { nome: "Rita", email: "dono@demo.com", revenda: "Gás do Teste", vende: "Gás" });
  await expect(page.getByText("Já existe um usuário com este e-mail.")).toBeVisible();
  await expect(page.getByLabel("E-mail")).toBeFocused();
  await page.getByLabel("E-mail").fill(`rita-${Date.now()}@cadastro.test`);
  await page.getByRole("button", { name: "Continuar" }).click();
  // o segundo passo guardou o que foi digitado
  await expect(page.getByLabel("Nome da revenda")).toHaveValue("Gás do Teste");
  await page.getByRole("button", { name: "Criar conta" }).click();
  await expect(page.getByText("Gás do Teste está no ar.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Primeiros passos" })).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  // vende gás: os botijões já estão cadastrados, com preço para conferir
  await expect(page.getByText("Confira os preços sugeridos")).toBeVisible();
  await page.goto("/produtos");
  await expect(page.getByLabel("Nome", { exact: true }).first()).toHaveValue("Gás P13");
  await expect(page.getByText("Preço sugerido")).toHaveCount(2);
  await page.getByRole("button", { name: "Preço certo" }).first().click();
  await expect(page.getByText("Preço sugerido")).toHaveCount(1);
});

test("assinatura: o selo do plano fica à vista desde o cadastro; vencida, o sistema pausa e só abre a tela de pagar", async ({ page }) => {
  const { default: postgres } = await import("postgres");
  const sql = postgres((process.env.TEST_PG_URL ?? "postgres://app:app@localhost:5433/postgres").replace(/\/[^/]*$/, "/gestao_e2e"), { max: 1 });
  const email = `ana-${Date.now()}@cadastro.test`;
  await page.context().clearCookies();
  await page.goto("/cadastro");
  await page.waitForLoadState("networkidle");
  await cadastrar(page, { nome: "Ana", email, revenda: "Água da Ana", vende: "Água" });
  await expect(page.getByRole("heading", { name: "Primeiros passos" })).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  // logo depois de criar a conta: o selo no menu e o aviso nos primeiros passos
  const selo = page.getByRole("link", { name: /Teste grátis.*Assinar/ });
  await expect(selo).toContainText("Faltam 14 dias");
  await expect(page.getByText(/Teste grátis até .* Depois, R\$.129,00 por mês/)).toBeVisible();
  await page.screenshot({ path: "../qa/evidencias/selo-plano.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "../qa/evidencias/selo-plano-celular.png" });
  await page.setViewportSize({ width: 1280, height: 720 });

  const mudar = (dias: number) => sql`update tenants set pago_ate = (now() at time zone 'America/Sao_Paulo')::date + ${dias}::int where id = (select tenant_id from users where email = ${email})`;
  await mudar(1);
  await page.reload();
  await expect(selo).toContainText("Acaba amanhã");
  await selo.click();
  await expect(page.getByRole("heading", { name: "Teste grátis" })).toBeVisible();
  await expect(page.getByText("Acerto de caixa por entregador")).toBeVisible();
  await page.screenshot({ path: "../qa/evidencias/assinatura-teste.png" });

  await mudar(-4);
  await page.goto("/pedidos");
  await expect(page).toHaveURL(/\/assinatura/);
  await expect(page.getByRole("heading", { name: "O acesso está pausado" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Voltar ao sistema" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
  await page.screenshot({ path: "../qa/evidencias/assinatura-pausado.png" });
  await sql.end();
});
