import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/ui";
import { assistenteLigado, perguntasRestantes } from "@/domain/assistente";
import { Conversa } from "./conversa";

export const metadata = { title: "Assistente" };

export default async function Assistente() {
  const user = await requireUser("dono");
  const ligado = assistenteLigado();
  return (
    <div className="max-w-2xl">
      <PageHeader title="Assistente" />
      <p className="-mt-3 mb-6 text-muted">Pergunte sobre vendas, estoque, contas e clientes. Os números vêm do próprio sistema.</p>
      {ligado ? (
        <Conversa restamNoComeco={await perguntasRestantes(user.tenantId)} />
      ) : (
        <p className="panel p-4 text-muted">O assistente ainda não está ligado nesta instalação.</p>
      )}
    </div>
  );
}
