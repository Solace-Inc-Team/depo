import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/ui";
import { clientesParaTeste } from "@/domain/robo";
import { Simulador } from "./simulador";

export const metadata = { title: "Robô do WhatsApp" };

export default async function RoboWhatsapp() {
  const user = await requireUser("dono");
  const clientes = await clientesParaTeste(user.tenantId);
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Robô do WhatsApp" />
      <p className="-mt-3 mb-6 text-muted">
        Converse como o cliente. Pedido confirmado aqui cai em Entregas, marcado como teste.
      </p>
      <Simulador clientes={clientes} loja={user.tenantName} />
    </div>
  );
}
