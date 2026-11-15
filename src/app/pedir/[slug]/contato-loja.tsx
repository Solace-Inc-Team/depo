import { MapPin, Phone } from "lucide-react";

/** Telefone e endereço que o dono põe em Configurações > Empresa; sem nenhum dos dois, não aparece nada. */
export function ContatoLoja({ phone, address }: { phone: string; address: string }) {
  if (!phone && !address) return null;
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
      {phone && (
        <a href={`tel:+55${phone.replace(/\D/g, "")}`} className="inline-flex min-h-11 items-center gap-1.5 hover:text-fg sm:min-h-0">
          <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
          <span className="num">{phone}</span>
        </a>
      )}
      {address && (
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
          {address}
        </span>
      )}
    </p>
  );
}
