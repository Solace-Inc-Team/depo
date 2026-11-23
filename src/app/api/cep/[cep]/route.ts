import { attempt } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

// Busca do CEP para preencher rua e bairro sozinhos (cadastro, pedido e link de pedido). Passa pelo servidor para
// guardar a resposta em cache e não depender do navegador falar com o serviço de fora.

type ViaCep = { logradouro?: string; bairro?: string; localidade?: string; uf?: string; erro?: boolean | string };

export async function GET(_req: Request, { params }: { params: Promise<{ cep: string }> }) {
  const cep = (await params).cep.replace(/\D/g, "");
  if (cep.length !== 8) return Response.json({ erro: "CEP com 8 números." }, { status: 400 });
  // é público (o link de pedido usa): um limite folgado por IP para ninguém usar como serviço de CEP
  if (await attempt(`cep:${await clientIp()}`, 120)) return Response.json({ erro: "Muitas buscas. Preencha à mão." }, { status: 429 });
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: AbortSignal.timeout(5000), next: { revalidate: 60 * 60 * 24 * 30 } });
    const d = (await r.json()) as ViaCep;
    if (!r.ok || d.erro) return Response.json({ erro: "CEP não encontrado." }, { status: 404 });
    return Response.json({ rua: d.logradouro ?? "", bairro: d.bairro ?? "", cidade: d.localidade ?? "", uf: d.uf ?? "" });
  } catch {
    return Response.json({ erro: "A busca do CEP não respondeu. Preencha à mão." }, { status: 503 });
  }
}
