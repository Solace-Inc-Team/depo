import Form from "next/form";
import Link from "next/link";
import { CornerDownRight, SendHorizontal } from "lucide-react";
import type { Sugestao } from "@/lib/assistente";

/**
 * O assistente onde o dono já olha todo dia: um campo no Painel e perguntas tiradas do próprio dia.
 * Perguntar abre a tela do Assistente já respondendo (?q=).
 */
export function PergunteAoDepo({ sugestoes }: { sugestoes: Sugestao[] }) {
  return (
    <section aria-label="Pergunte ao depo" className="panel mb-6 p-4 max-sm:p-3">
      <Form action="/assistente" className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <span aria-hidden="true" className="assistente-ponto pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2" />
          <label htmlFor="pergunta-painel" className="sr-only">Pergunte ao depo</label>
          <input id="pergunta-painel" name="q" required maxLength={400} autoComplete="off" className="input w-full pl-9" placeholder="Pergunte sobre o seu dia" />
        </div>
        <button className="btn btn-primary max-sm:min-w-11">
          <SendHorizontal size={16} aria-hidden="true" /> <span className="max-sm:sr-only">Perguntar</span>
        </button>
      </Form>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sugestoes.map((s) => (
          <li key={s.pergunta} className="min-w-0">
            <Link href={`/assistente?q=${encodeURIComponent(s.pergunta)}`} className="btn btn-sm h-auto max-w-full py-1.5 text-left whitespace-normal">
              <CornerDownRight size={14} aria-hidden="true" className="shrink-0" />
              <span className="min-w-0">
                {s.fato && <span className="text-muted">{s.fato}. </span>}
                {s.pergunta}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
