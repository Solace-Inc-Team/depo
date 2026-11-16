"use client";

import { useSyncExternalStore } from "react";

// Safari e qualquer navegador do iPhone (todos usam o WebKit). O Chrome do iPhone se chama CriOS e também é WebKit.
const ehWebKit = () => /AppleWebKit/.test(navigator.userAgent) && !/Chrome\/|Chromium|Edg\//.test(navigator.userAgent);
const nada = () => () => {};

/**
 * No WebKit a troca de tela animada do React desenha a tela nova ao vivo, por baixo da foto da antiga, enquanto a
 * antiga ainda está saindo: as duas aparecem sobrepostas. Lá a troca é sem essa animação (a cascata de entrada da
 * página continua). No servidor e na primeira pintura vale false, e só as props mudam depois: nada é remontado.
 */
export const useWebKit = () => useSyncExternalStore(nada, ehWebKit, () => false);
