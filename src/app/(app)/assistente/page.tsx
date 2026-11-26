import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/ui";
import { assistenteLigado, perguntasRestantes } from "@/domain/assistente";
import { dashboard } from "@/domain/queries";
import { contasVencendo } from "@/domain/contas";
import { sugestoesVivas } from "@/lib/assistente";
import { Conversa } from "./conversa";

export const metadata = { title: "Assistente" };

// pelo relógio de Brasília: o servidor roda em UTC
const horaSP = () => Number(new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hourCycle: "h23", timeZone: "America/Sao_Paulo" }).format(new Date()));
const periodo = (h: number) => (h < 5 ? "Boa noite" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite");

export default async function Assistente({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await requireUser("dono");
  const { q } = await searchParams;
  if (!assistenteLigado())
    return (
      <div>
        <PageHeader title="Pergunte ao depo" />
        <p className="panel p-4 text-muted">O assistente ainda não está ligado nesta instalação.</p>
      </div>
    );
  // as sugestões saem do dia de hoje, as mesmas do Painel
  const [restam, d, contas] = await Promise.all([
    perguntasRestantes(user.tenantId),
    dashboard(user.tenantId, { branchId: user.branchId }),
    contasVencendo(user.tenantId, user.branchId),
  ]);
  return (
    <div>
      <PageHeader title="Pergunte ao depo" />
      <Conversa
        dono={user.userId}
        restamNoComeco={restam}
        saudacao={`${periodo(horaSP())}, ${user.name.split(" ")[0]}.`}
        sugestoes={sugestoesVivas({ ...d, contas })}
        perguntaInicial={q?.trim() || undefined}
      />
    </div>
  );
}
