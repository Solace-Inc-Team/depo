"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { avisoPedidoAction } from "@/app/actions";

type Estado = "carregando" | "sem-suporte" | "pedir" | "pedindo" | "ligado" | "bloqueado" | "erro";

const CHAVE = process.env.NEXT_PUBLIC_VAPID_PUBLICA ?? "";

// a chave pública vem em base64 de URL; o navegador quer os bytes
function bytes(base64: string) {
  const b = atob((base64 + "=".repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

// navegador com o serviço de push desligado (o Brave vem assim) não responde nem com erro: sem prazo, o
// botão ficaria "ligando" para sempre
const PRAZO_MS = 12_000;

async function inscrever() {
  const tentativa = (async () => {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    return (await reg.pushManager.getSubscription()) ?? reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes(CHAVE) });
  })();
  const prazo = new Promise<never>((_, falha) => setTimeout(() => falha(new Error("o serviço de push do navegador não respondeu")), PRAZO_MS));
  return Promise.race([tentativa, prazo]);
}

// no Brave dá para dizer exatamente o que ligar; nos outros, o genérico
const mensagemDeFalha = () =>
  "brave" in navigator
    ? "No Brave, ligue \"Usar os serviços do Google para mensagens push\" em Configurações, Privacidade e segurança, reinicie o navegador e tente de novo."
    : "Este navegador não conseguiu ligar os avisos.";

/**
 * "Avisar no celular": o cliente aceita e o celular avisa quando o Pix cai, quando sai para entrega e quando
 * chega, mesmo com a página fechada. Some onde o navegador não sabe avisar (Safari do iPhone fora da tela
 * de início). Quem já aceitou antes neste celular fica inscrito neste pedido também, sem tocar em nada.
 */
export function AvisoNoCelular({ slug, codigo }: { slug: string; codigo: string }) {
  const [estado, setEstado] = useState<Estado>("carregando");
  const [erro, setErro] = useState("");

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (!CHAVE || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return vivo && setEstado("sem-suporte");
      if (Notification.permission === "denied") return vivo && setEstado("bloqueado");
      if (Notification.permission !== "granted") return vivo && setEstado("pedir");
      // já aceitou noutro pedido: liga neste também
      try {
        const sub = await inscrever();
        const r = await avisoPedidoAction(slug, codigo, sub.toJSON());
        if (vivo) setEstado(r?.error ? "pedir" : "ligado");
      } catch {
        if (vivo) setEstado("pedir");
      }
    })();
    return () => {
      vivo = false;
    };
  }, [slug, codigo]);

  async function ligar() {
    setEstado("pedindo");
    try {
      const permissao = await Notification.requestPermission();
      if (permissao !== "granted") return setEstado(permissao === "denied" ? "bloqueado" : "pedir");
      const sub = await inscrever();
      const r = await avisoPedidoAction(slug, codigo, sub.toJSON());
      if (r?.error) {
        setErro(r.error);
        return setEstado("erro");
      }
      setEstado("ligado");
    } catch (e) {
      // o motivo fica no console (serviço de push desligado no navegador, por exemplo)
      console.error("[aviso] não foi possível ligar:", e);
      setErro(mensagemDeFalha());
      setEstado("erro");
    }
  }

  // avisos bloqueados no navegador: o cliente não precisa de recado sobre isso, a página já mostra o andamento
  if (estado === "carregando" || estado === "sem-suporte" || estado === "bloqueado") return null;
  // a troca de estado acontece no mesmo lugar: o conteúdo novo chega com a entrada curta (.enter)
  return (
    <div key={estado} className="enter mt-4">
      {estado === "ligado" ? (
        <p className="flex items-center gap-2 text-[13px] text-muted">
          <BellRing size={15} strokeWidth={1.75} className="text-ok" aria-hidden="true" />
          Avisaremos neste celular quando o pedido andar.
        </p>
      ) : (
        <>
          <button type="button" onClick={ligar} disabled={estado === "pedindo"} className="btn h-11 w-full gap-2">
            <Bell size={16} strokeWidth={1.75} aria-hidden="true" />
            {estado === "pedindo" ? "Ligando os avisos…" : "Avisar quando sair para entrega"}
          </button>
          {estado === "erro" && <p className="mt-2 text-[13px] text-danger">{erro}</p>}
        </>
      )}
    </div>
  );
}
