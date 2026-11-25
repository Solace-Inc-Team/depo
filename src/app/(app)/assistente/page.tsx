import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/ui";
import { assistenteLigado, perguntasRestantes } from "@/domain/assistente";
import { Conversa } from "./conversa";

export const metadata = { title: "Assistente" };

// pelo relógio de Brasília: o servidor roda em UTC
const horaSP = () => Number(new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hourCycle: "h23", timeZone: "America/Sao_Paulo" }).format(new Date()));
const periodo = (h: number) => (h < 5 ? "Boa noite" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite");

export default async function Assistente() {
  const user = await requireUser("dono");
  return (
    <div className="max-w-2xl">
      <PageHeader title="Assistente" />
      {assistenteLigado() ? (
        <Conversa dono={user.userId} restamNoComeco={await perguntasRestantes(user.tenantId)} saudacao={`${periodo(horaSP())}, ${user.name.split(" ")[0]}.`} />
      ) : (
        <p className="panel p-4 text-muted">O assistente ainda não está ligado nesta instalação.</p>
      )}
    </div>
  );
}
