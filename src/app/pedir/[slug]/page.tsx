import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portalProducts, portalTenant } from "@/domain/portal";
import { portalOrderAction } from "@/app/actions";
import { PortalForm } from "./portal-form";
import { ContatoLoja } from "./contato-loja";
import Threads from "@/components/reactbits/Threads";

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
    // Os fios ficam num fundo só, fixo na tela: a página rola por cima e sempre há fios atrás do que se vê
    // (presos a cada seção, o meio ficava vazio e repetir o efeito parecia remendo)
    <div className="pagina-escura isolate">
      <div aria-hidden="true" className="fundo-tela">
        <Threads color={[0.4, 0.6, 1]} accentColor={undefined} lineCount={90} amplitude={1.4} distance={0.5} thickness={0.8} brightness={2} speed={0.5} />
      </div>
    <main className="stagger mx-auto min-h-screen max-w-lg px-5 py-8">
      <p className="text-[13px] text-muted">Pedido pelo site</p>
      <h1 className="h1">{t.name}</h1>
      {t.branchName && <p className="mt-0.5 font-medium">{t.branchName}</p>}
      <ContatoLoja phone={t.phone} address={t.address} />
      <div className="mb-6" />
      {products.length ? (
        <PortalForm action={portalOrderAction.bind(null, slug, typeof filial === "string" ? filial : "")} products={products} pixEnabled={!!t.pixKey || t.mp} />
      ) : (
        <p className="panel p-4 text-muted">Nenhum produto disponível agora. Ligue para a loja.</p>
      )}
      <p className="mt-8 text-[13px] text-muted">
        Usamos seu nome, telefone e endereço só para entregar o pedido e falar com você sobre ele. Veja a{" "}
        <Link href="/privacidade" className="underline">política de privacidade</Link>.
      </p>
    </main>
    </div>
  );
}
