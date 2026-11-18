import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  // sem script de nonce ainda: trava o que não depende dele (plugin, <base> trocado, moldura de outro site, formulário para fora)
  { key: "Content-Security-Policy", value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // só vale em HTTPS; navegador ignora em http://localhost
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // os testes de ponta a ponta sobem um segundo servidor em outra pasta
  distDir: process.env.NEXT_DIST_DIR || ".next",
  agentRules: false,
  poweredByHeader: false,
  // o driver do banco fica fora do pacote: o Turbopack copiava o código dele como arquivo público em /_next/static/media
  serverExternalPackages: ["postgres"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
