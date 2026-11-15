// Recebe as notificações do andamento do pedido (web push) mesmo com a página fechada e, no toque,
// abre o acompanhamento do pedido. Não guarda nada em cache: o sistema continua sempre on-line.
self.addEventListener("push", (event) => {
  let dados = {};
  try {
    dados = event.data ? event.data.json() : {};
  } catch {
    dados = { title: "Seu pedido", body: event.data ? event.data.text() : "" };
  }
  event.waitUntil(
    self.registration.showNotification(dados.title || "Seu pedido", {
      body: dados.body || "",
      // a mesma etiqueta substitui o aviso anterior do mesmo pedido em vez de empilhar
      tag: dados.tag,
      renotify: true,
      icon: "/icones/192.png",
      data: { url: dados.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((abertas) => {
      const ja = abertas.find((c) => c.url === url);
      return ja ? ja.focus() : self.clients.openWindow(url);
    }),
  );
});
