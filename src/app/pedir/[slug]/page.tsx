import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portalProducts, portalTenant } from "@/domain/portal";
import { portalOrderAction } from "@/app/actions";
import { PortalForm } from "./portal-form";
import { ContatoLoja } from "./contato-loja";
import Beams from "@/components/reactbits/Beams";

export async function generateMetadata({ params }: PageProps<"/pedir/[slug]">): Promise<Metadata> {
  const t = await portalTenant((await params).slug);
  return { title: t ? `Pedido em ${t.name}` : "Pedidos", robots: { index: false } };
}

export default async function Pedir({ params, searchParams }: PageProps<"/pedir/[slug]">) {
  const { slug } = await params;
  // cada filial tem seu link: /pedir/<empresa>?filial=<slug da filial>
  const filial = (await searchParams).filial;
  const t = await portalTenant(slug, typeof filial === "string" ? filial : "");
  if (!t) notFound();
  const products = await portalProducts(t.id, t.branchId);

  return (
    // a página do cliente é sempre escura, como a vitrine: o tema escolhido no sistema naquele aparelho não vale aqui.
    // Um fundo só, fixo na tela (feixes de luz azul): a página rola por cima e sempre há luz atrás dos cartões.
    // Mais calmo e em resolução menor que o padrão: roda o tempo todo enquanto a página está aberta
    <div className="pagina-escura isolate">
      <div aria-hidden="true" className="fundo-tela">
        <Beams color="#6d9dff" quality={0.5} grain={0.15} speed={0.6} brightness={1.3} mouseInteraction={false} backgroundColor={undefined} dpr={undefined} style={undefined} />
      </div>
    <main className="stagger mx-auto min-h-screen max-w-lg px-5 py-8">
      {/* o feixe de luz passa por trás do topo: um véu escuro, como o dos cartões, mantém o texto legível */}
      <header className="mb-6 rounded-2xl bg-bg/60 px-4 py-3 backdrop-blur-md">
        <p className="text-[13px] text-muted">Pedido pelo site</p>
        <h1 className="h1">{t.name}</h1>
        {t.branchName && <p className="mt-0.5 font-medium">{t.branchName}</p>}
        <ContatoLoja phone={t.phone} address={t.address} />
      </header>
      {products.length ? (
        <PortalForm slug={slug} loja={{ phone: t.phone, address: t.address }} action={portalOrderAction.bind(null, slug, typeof filial === "string" ? filial : "")} products={products} pixEnabled={!!t.pixKey || t.mp} />
      ) : (
        <p className="panel p-4 text-muted">Nenhum produto disponível agora. Ligue para a loja.</p>
      )}
      <p className="mt-8 text-[13px] text-muted">
        Usamos seu nome, telefone e endereço só para entregar o pedido e falar com você sobre ele. Eles ficam guardados neste aparelho para o próximo pedido. Veja a{" "}
        <Link href="/privacidade" className="underline">política de privacidade</Link>.
      </p>
    </main>
    </div>
  );
}
