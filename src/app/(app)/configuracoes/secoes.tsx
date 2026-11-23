import { siteUrl } from "@/lib/request";
import Link from "next/link";
import QRCode from "qrcode";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  Clock,
  ExternalLink,
  Globe,
  KeyRound,
  MapPin,
  MessageCircle,
  Percent,
  Phone,
  Plus,
  Store,
  UserRound,
  Zap,
} from "lucide-react";
import { getSettings } from "@/domain/queries";
import { listFiliais } from "@/domain/filiais";
import { ActionForm } from "@/components/action-form";
import { CaixaQueSalva } from "@/components/caixa-que-salva";
import { CopyButton } from "@/components/copy-button";
import { JanelaAcao } from "@/components/janela-acao";
import { PLANO, dataBR, situacaoAssinatura } from "@/lib/plano";
import { todayISO } from "@/lib/period";
import { formatBRL } from "@/lib/money";
import { appMp } from "@/lib/mercadopago";
import { AvisoMp } from "./aviso-mp";
import { ConexaoWhatsappPainel } from "./conexao-whatsapp";
import { CamposEndereco } from "@/components/campos-endereco";
import {
  ativarFilialAction,
  conectarMercadoPagoAction,
  criarFilialAction,
  desconectarMercadoPagoAction,
  saveSettingsAction,
} from "@/app/actions";

// Peças das seções: cada seção abre com título e uma frase, e os ajustes vêm em cartões de linhas
// (ícone, nome e explicação à esquerda; o controle à direita), como nas configurações do Linear e do Vercel.
function Cabecalho({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <header className="mb-5">
      {/* no celular a aba escolhida já diz o nome da seção: o título repetia */}
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] max-sm:sr-only">{titulo}</h3>
      <p className="mt-0.5 text-[13px] text-muted">{descricao}</p>
    </header>
  );
}

function Grupo({ titulo, children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <section className="ajuste-grupo">
      {titulo && <h4 className="ajuste-grupo-titulo">{titulo}</h4>}
      <div className="ajuste-lista">{children}</div>
    </section>
  );
}

/** `campo`: o controle é um campo de texto, que desce para baixo do nome no celular e ocupa a largura. */
function Linha({
  icone: Icone,
  titulo,
  descricao,
  htmlFor,
  campo = false,
  children,
}: {
  icone: LucideIcon;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  htmlFor?: string;
  campo?: boolean | "largo";
  children?: React.ReactNode;
}) {
  const Nome = htmlFor ? "label" : "p";
  return (
    <div className="ajuste-linha" data-campo={campo === "largo" ? "largo" : campo || undefined}>
      <span aria-hidden="true" className="ajuste-icone">
        <Icone size={16} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <Nome htmlFor={htmlFor} className="block text-[13.5px] font-medium">
          {titulo}
        </Nome>
        {descricao && <p className="mt-0.5 text-[12.5px] text-muted">{descricao}</p>}
      </div>
      {children && <div className="ajuste-controle">{children}</div>}
    </div>
  );
}

/** Campo de número com a unidade dentro ("10 %", "60 min"). */
function ComUnidade({ unidade, children }: { unidade: string; children: React.ReactNode }) {
  return (
    <span className="campo-unidade">
      {children}
      <span aria-hidden="true">{unidade}</span>
    </span>
  );
}

// As seções da janela de Configurações (o que se ajusta uma vez). Renderizadas no servidor e entregues
// prontas à janela, que só mostra a escolhida: trocar de seção não carrega nada.
export async function secoesConfig(tenantId: string, pagoAte: string | null) {
  const [s, filiais] = await Promise.all([getSettings(tenantId), listFiliais(tenantId)]);
  const portalUrl = `${await siteUrl()}/pedir/${s.slug}`;
  // um link por filial ativa; a principal fica com o link de sempre
  const ativas = filiais.filter((b) => b.active);
  const links = s.portalEnabled
    ? await Promise.all(
        ativas.map(async (b) => {
          const url = b.main ? portalUrl : `${portalUrl}?filial=${b.slug}`;
          return { id: b.id, nome: ativas.length > 1 ? b.name : null, url, qr: await QRCode.toString(url, { type: "svg", margin: 1, width: 120 }) };
        }),
      )
    : [];
  const plano = situacaoAssinatura(pagoAte, todayISO());

  return {
    empresa: (
      <>
        <Cabecalho titulo="Empresa" descricao="Como a sua revenda aparece para os clientes no link de pedidos e no acompanhamento." />
        <ActionForm action={saveSettingsAction} salvaAoMudar>
          <input type="hidden" name="section" value="empresa" />
          <Grupo>
            <Linha icone={Building2} titulo="Nome da empresa" htmlFor="emp-nome" campo>
              <input id="emp-nome" name="empresaNome" required minLength={2} maxLength={80} defaultValue={s.name} className="input" />
            </Linha>
            <Linha icone={Phone} titulo="Telefone ou WhatsApp" descricao="Para o cliente chamar a loja direto do pedido." htmlFor="emp-tel" campo>
              <input id="emp-tel" name="phone" type="tel" inputMode="tel" data-mascara="telefone" maxLength={30} defaultValue={s.phone} className="input num" placeholder="(11) 91111-1111" />
            </Linha>
            <Linha icone={MapPin} titulo="Endereço" descricao="Onde fica a loja, para quem quiser buscar no balcão." campo="largo">
              <CamposEndereco nome="address" id="emp-end" inicial={s.address} />
            </Linha>
          </Grupo>
        </ActionForm>
      </>
    ),

    regras: (
      <>
        <Cabecalho titulo="Regras da casa" descricao="Limites que valem para toda a equipe. Salvam sozinhos ao sair do campo." />
        <ActionForm action={saveSettingsAction} salvaAoMudar>
          <input type="hidden" name="section" value="regras" />
          <Grupo>
            <Linha icone={Percent} titulo="Desconto máximo da equipe" descricao="Acima disso, só você lança o desconto." htmlFor="staffDiscountPct">
              <ComUnidade unidade="%">
                <input id="staffDiscountPct" name="staffDiscountPct" type="number" inputMode="numeric" min={0} max={100} required defaultValue={s.staffDiscountPct} className="input num w-24" />
              </ComUnidade>
            </Linha>
            <Linha icone={Clock} titulo="Pedido atrasado depois de" htmlFor="lateAfterMinutes">
              <ComUnidade unidade="min">
                <input id="lateAfterMinutes" name="lateAfterMinutes" type="number" inputMode="numeric" min={10} max={1440} required defaultValue={s.lateAfterMinutes} className="input num w-24" />
              </ComUnidade>
            </Linha>
          </Grupo>
        </ActionForm>
      </>
    ),

    pagamentos: (
      <>
        <Cabecalho titulo="Pagamentos" descricao="Como os clientes pagam no Pix e como o sistema confere esse dinheiro." />
        <AvisoMp />
        <div className="space-y-6">
          {/* salva sozinho ao sair do campo, como Produtos: uma regra só para o que se ajusta uma vez */}
          <ActionForm action={saveSettingsAction} salvaAoMudar>
            <input type="hidden" name="section" value="pix" />
            <Grupo titulo="Pix na chave da empresa">
              <Linha icone={KeyRound} titulo="Chave" descricao="CNPJ, e-mail, telefone ou aleatória." htmlFor="pixKey" campo>
                <input id="pixKey" name="pixKey" maxLength={77} defaultValue={s.pixKey} className="input" />
              </Linha>
              <Linha icone={UserRound} titulo="Nome do recebedor" descricao="Como aparece no app do banco de quem paga." htmlFor="pixName" campo>
                <input id="pixName" name="pixName" maxLength={60} defaultValue={s.pixName} className="input" />
              </Linha>
              <Linha icone={MapPin} titulo="Cidade" htmlFor="pixCity" campo>
                <input id="pixCity" name="pixCity" maxLength={40} defaultValue={s.pixCity} className="input" />
              </Linha>
            </Grupo>
          </ActionForm>

          <Grupo titulo="Confirmação automática">
            <Linha
              icone={Zap}
              titulo="Mercado Pago"
              descricao={
                s.mpConta ? (
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-ok" />
                    <span className="truncate">Conectado a {s.mpConta}</span>
                  </span>
                ) : (
                  "Confirma o Pix de cada pedido sozinho, sem conferir o extrato."
                )
              }
            >
              {s.mpConta ? (
                <ActionForm action={desconectarMercadoPagoAction} confirm="Desconectar o Mercado Pago? Os próximos Pix voltam a ser conferidos à mão.">
                  <button className="btn btn-sm tap hover:text-danger">Desconectar</button>
                </ActionForm>
              ) : (
                <div className="flex flex-wrap justify-end gap-2">
                  {/* com a aplicação da Solace no Mercado Pago, o dono só entra na conta dele e autoriza */}
                  {appMp() && (
                    <a href="/api/mercadopago/conectar" className="btn btn-primary btn-sm">
                      Conectar
                    </a>
                  )}
                  <JanelaAcao label={appMp() ? "Usar Access Token" : "Conectar"} titulo="Conectar com o Access Token">
                    <ActionForm action={conectarMercadoPagoAction} className="space-y-3" reset>
                      <div>
                        <label className="label" htmlFor="mp-token">Chave de acesso (Access Token)</label>
                        <input id="mp-token" name="token" type="password" required autoComplete="off" spellCheck={false} className="input num" placeholder="APP_USR-..." />
                        <p className="mt-1 text-[13px] text-muted">Em mercadopago.com.br/developers, Credenciais de produção.</p>
                      </div>
                      <div>
                        <label className="label" htmlFor="mp-senha">Sua senha</label>
                        <input id="mp-senha" name="confirmPassword" type="password" autoComplete="current-password" required className="input" />
                      </div>
                      <button className="btn btn-primary w-full">Conectar</button>
                    </ActionForm>
                  </JanelaAcao>
                </div>
              )}
            </Linha>
          </Grupo>
        </div>
      </>
    ),

    site: (
      <>
        <Cabecalho titulo="Pedidos pelo site" descricao="Um link da sua revenda em que o cliente escolhe os produtos e manda o pedido sem ligar." />
        <div className="space-y-6">
          <ActionForm action={saveSettingsAction}>
            <input type="hidden" name="section" value="portal" />
            <Grupo>
              <Linha icone={Globe} titulo="Clientes podem pedir pelo link" descricao="Desligado, o link não abre.">
                {/* salva ao marcar */}
                <CaixaQueSalva name="portalEnabled" defaultChecked={s.portalEnabled} />
              </Linha>
            </Grupo>
          </ActionForm>
          {/* sem telefone, o cliente que errou o endereço não tem como falar com a loja */}
          {s.portalEnabled && !s.phone && (
            <p className="rounded-lg bg-warn-soft px-4 py-3 text-[13px] text-warn-fg">
              Seu cliente não vê nenhum telefone da loja no site. Preencha o telefone em Empresa para ele poder ligar se errar o endereço.
            </p>
          )}
          {links.map((l) => (
            <Grupo key={l.id} titulo={l.nome ? `Link da filial ${l.nome}` : "Seu link"}>
              <div className="ajuste-linha" data-campo>
                <span aria-hidden="true" className="ajuste-icone">
                  <ExternalLink size={16} strokeWidth={1.75} />
                </span>
                {/* o link numa linha só (quebrado no meio da palavra parecia defeito); o inteiro vai no Copiar */}
                <a href={l.url} target="_blank" rel="noreferrer" title={l.url} className="min-w-0 truncate text-[13px] text-accent underline">
                  {l.url}
                </a>
                <div className="ajuste-controle flex flex-wrap gap-2">
                  <CopyButton text={l.url} label="Copiar link" />
                  {/* o QR é branco para o celular ler; fica guardado até alguém pedir, para não ofuscar o escuro */}
                  <details className="relative">
                    <summary className="btn w-fit cursor-pointer list-none">QR code</summary>
                    <div className="mt-2 w-fit rounded-md bg-white p-1.5" dangerouslySetInnerHTML={{ __html: l.qr }} />
                  </details>
                </div>
              </div>
            </Grupo>
          ))}
        </div>
      </>
    ),

    whatsapp: (
      <>
        <Cabecalho titulo="WhatsApp" descricao="Um robô que atende o cliente no WhatsApp da loja, cadastra quem é novo e lança o pedido sozinho." />
        <div className="space-y-6">
          <ConexaoWhatsappPainel />
          <Grupo>
            <Linha icone={MessageCircle} titulo="Testar a conversa" descricao="Converse com o robô como se fosse o cliente, sem lançar pedido.">
              <Link href="/whatsapp" className="btn btn-sm">
                <MessageCircle size={14} aria-hidden="true" /> Testar conversa
              </Link>
            </Linha>
          </Grupo>
        </div>
      </>
    ),

    filiais: (
      <>
        <Cabecalho titulo="Filiais" descricao="Cada filial tem estoque, caixa e link de pedidos próprios. A equipe fica na sua." />
        <div className="space-y-6">
          <Grupo>
            {filiais.map((b) => (
              <Linha
                key={b.id}
                icone={Store}
                titulo={
                  <span className={b.active ? "" : "text-muted"}>
                    {b.name}
                    {b.main && b.name.toLowerCase() !== "principal" && <span className="ml-2 text-[12px] font-normal text-muted">principal</span>}
                    {!b.active && <span className="ml-2 text-[12px] font-normal text-muted">desativada</span>}
                  </span>
                }
                descricao={b.equipe === 1 ? "1 pessoa na equipe" : `${b.equipe} pessoas na equipe`}
              >
                {!b.main && (
                  <ActionForm action={ativarFilialAction} confirm={b.active ? `Desativar a filial ${b.name}? O histórico continua guardado.` : undefined}>
                    <input type="hidden" name="branchId" value={b.id} />
                    <input type="hidden" name="active" value={String(!b.active)} />
                    <button className="btn btn-sm tap">{b.active ? "Desativar" : "Reativar"}</button>
                  </ActionForm>
                )}
              </Linha>
            ))}
          </Grupo>
          <ActionForm action={criarFilialAction} reset>
            <Grupo titulo="Nova filial">
              <Linha icone={Plus} titulo="Nome da filial" htmlFor="filial-nome" campo>
                <span className="flex gap-2">
                  <input id="filial-nome" name="name" required minLength={2} maxLength={60} className="input min-w-0 flex-1" placeholder="Ex.: Centro" />
                  <button className="btn">Criar</button>
                </span>
              </Linha>
            </Grupo>
          </ActionForm>
        </div>
      </>
    ),

    assinatura: (
      <>
        <Cabecalho titulo="Assinatura" descricao="O plano da sua revenda no depo." />
        {plano ? (
          <Grupo>
            <Linha icone={BadgeCheck} titulo="Plano mensal" descricao={`${formatBRL(PLANO.mensalCents)} por mês, pago com Pix.`}>
              <Link href="/assinatura" className="btn btn-primary btn-sm">Ver assinatura</Link>
            </Linha>
            <Linha
              icone={CalendarClock}
              titulo={`Acesso até ${dataBR(plano.pagoAte)}`}
              descricao={
                plano.dias > 1
                  ? `Faltam ${plano.dias} dias.`
                  : plano.dias === 1
                    ? "Vence amanhã."
                    : plano.dias === 0
                      ? "Vence hoje."
                      : `Venceu há ${-plano.dias} ${plano.dias === -1 ? "dia" : "dias"}. Pague até ${dataBR(plano.pausaEm)} para não pausar.`
              }
            />
          </Grupo>
        ) : (
          <Grupo>
            <Linha icone={BadgeCheck} titulo="Sem mensalidade" descricao="Sua empresa usa o depo sem cobrança mensal. Nada a pagar." />
          </Grupo>
        )}
      </>
    ),
  };
}
