import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "depo: entregas e caixa",
    short_name: "depo",
    start_url: "/entregador",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icones/192.png", sizes: "192x192", type: "image/png" },
      { src: "/icones/512.png", sizes: "512x512", type: "image/png" },
      // o Android recorta este em círculo ou gota: o símbolo fica dentro da área segura
      { src: "/icones/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
