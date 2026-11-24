import { clientIp } from "@/lib/request";

// Busca do CEP para preencher rua e bairro sozinhos (cadastro, pedido e link de pedido). Passa pelo servidor para
// guardar a resposta em cache e não depender do navegador falar com o serviço de fora.

type ViaCep = { logradouro?: string; bairro?: string; localidade?: string; uf?: string; erro?: boolean | string };

// shortcut: limite em memória, por processo (com várias réplicas cada uma conta o seu); basta para o CEP, que é de
// graça. No banco, cada busca gravava e apagava uma linha, até com a resposta em cache.
const JANELA_MS = 15 * 60 * 1000;
const buscas = new Map<string, number[]>();
function demais(ip: string) {
  const agora = Date.now();
  if (buscas.size > 10_000) buscas.clear();
  const l = (buscas.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  l.push(agora);
  buscas.set(ip, l);
  return l.length > 120;
}

export async function GET(_req: Request, { params }: { params: Promise<{ cep: string }> }) {
  const cep = (await params).cep.replace(/\D/g, "");
  if (cep.length !== 8) return Response.json({ erro: "CEP com 8 números." }, { status: 400 });
  // é público (o link de pedido usa): um limite folgado por IP para ninguém usar como serviço de CEP
  if (demais(await clientIp())) return Response.json({ erro: "Muitas buscas. Preencha à mão." }, { status: 429 });
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: AbortSignal.timeout(5000), next: { revalidate: 60 * 60 * 24 * 30 } });
    // ViaCEP fora do ar (5xx) não é "CEP não encontrado": a pessoa pode tentar de novo
    if (r.status >= 500) throw new Error(`ViaCEP ${r.status}`);
    const d = (r.ok ? await r.json() : { erro: true }) as ViaCep;
    if (d.erro) return Response.json({ erro: "CEP não encontrado. Preencha à mão." }, { status: 404 });
    return Response.json({ rua: d.logradouro ?? "", bairro: d.bairro ?? "", cidade: d.localidade ?? "", uf: d.uf ?? "" });
  } catch {
    return Response.json({ erro: "Não deu para buscar o CEP agora. Preencha à mão." }, { status: 503 });
  }
}
