import { chromium, type FullConfig, type Page } from "@playwright/test";

// O servidor dos testes é um `next dev`: depois de qualquer mudança no código, a primeira visita a cada tela
// compila na hora e a página recarrega sozinha ao conectar. Os testes esperavam "rede parada" no meio disso
// e a primeira rodada falhava toda. Aqui cada tela usada nos testes é aberta antes, até assentar.
const publicas = ["/login", "/inicio", "/pedir/fonte-azul", "/termos"];
const internas = ["/", "/pedidos/novo", "/pedidos", "/entregas", "/caixa", "/clientes", "/auditoria"];

async function assentar(page: Page, rota: string) {
  // até três tentativas: a compilação pode derrubar a primeira carga no meio
  for (let i = 0; i < 3; i++) {
    try {
      await page.goto(rota, { waitUntil: "load", timeout: 60_000 });
      await page.waitForLoadState("networkidle", { timeout: 30_000 });
      return;
    } catch {
      // segue para a próxima tentativa
    }
  }
}

async function entrar(page: Page, email: string) {
  await assentar(page, "/login");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill("demo1234");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 60_000 });
}

export default async function aquecer(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ baseURL, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const r of publicas) await assentar(page, r);
  await entrar(page, "dono@demo.com");
  for (const r of internas) await assentar(page, r);
  // a tela do entregador
  await ctx.clearCookies();
  await entrar(page, "joao@demo.com");
  await assentar(page, "/entregador");
  await browser.close();
}
