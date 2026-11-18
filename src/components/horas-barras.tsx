import { Dicas } from "@/components/dicas";
import { pico } from "@/lib/relatorios";

// Pedidos lançados em cada hora do dia, como as barras da semana do painel: as horas de pico na cor da marca, as
// outras neutras. O pico vem escrito em cima (no celular a dica não aparece) e há uma lista para leitor de tela.

const umaCasa = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
const pedidos = (n: number) => `${n} ${n === 1 ? "pedido" : "pedidos"}`;

export function HorasBarras({ porHora, dias }: { porHora: { hora: number; n: number }[]; dias: number }) {
  const comPedido = porHora.filter((h) => h.n > 0).map((h) => h.hora);
  const p = pico(porHora);
  if (!comPedido.length || !p) return null;
  // só as horas em que a loja trabalha, com ao menos 8 horas na tela para as barras não ficarem largas demais
  let ini = Math.min(...comPedido);
  let fim = Math.max(...comPedido);
  while (fim - ini < 7 && (ini > 0 || fim < 23)) {
    if (ini > 0) ini--;
    if (fim - ini < 7 && fim < 23) fim++;
  }
  const horas = Array.from({ length: fim - ini + 1 }, (_, i) => ({ hora: ini + i, n: porHora.find((h) => h.hora === ini + i)?.n ?? 0 }));
  const max = Math.max(...horas.map((h) => h.n), 1);
  const noPico = horas.filter((h) => h.hora >= p.de && h.hora < p.ate).reduce((s, h) => s + h.n, 0);
  return (
    <figure>
      <p className="text-sm">
        Mais movimento: <span className="font-semibold">{p.de}h às {p.ate}h</span>
        <span className="text-muted">
          , {pedidos(noPico)}
          {dias > 1 && ` (${umaCasa(noPico / dias)} por dia)`}
        </span>
      </p>
      {/* espaço para a dica da barra mais alta não cobrir a frase de cima */}
      <Dicas toque contida className="mt-11 flex h-28 items-end gap-0.5">
        {horas.map((h) => (
          <div
            key={h.hora}
            className="semana-barra group relative flex h-full flex-1 items-end"
            data-atual={(h.hora >= p.de && h.hora < p.ate) || undefined}
            data-dica={`${h.hora}h: ${pedidos(h.n)}${dias > 1 && h.n ? `, ${umaCasa(h.n / dias)} por dia` : ""}`}
          >
            <span className="w-full rounded-t-[4px]" style={{ height: h.n ? `${Math.max((h.n / max) * 100, 4)}%` : "2px" }} />
          </div>
        ))}
      </Dicas>
      <div aria-hidden="true" className="mt-1 flex gap-0.5">
        {horas.map((h) => (
          <span key={h.hora} className={`flex-1 text-center text-[10.5px] ${h.hora >= p.de && h.hora < p.ate ? "font-medium text-fg" : "text-muted"}`}>
            {/* rótulo a cada 3 horas, e sempre nas do pico: mais que isso não cabe no celular */}
            {h.hora % 3 === 0 || h.hora === p.de ? `${h.hora}h` : ""}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">
        Pedidos por hora: {horas.filter((h) => h.n).map((h) => `${h.hora}h ${pedidos(h.n)}`).join(", ")}
      </figcaption>
    </figure>
  );
}
