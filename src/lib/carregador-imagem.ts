import type { ImageLoaderProps } from 'next/image'

import { EXTENSOES_OTIMIZAVEIS, PASTA_DAS_VERSOES, enderecoDaVersao } from '../../imagens.config.mjs'

/**
 * Carregador global do `next/image`: aponta cada largura do srcset para o WebP
 * que o `scripts/gerar-imagens.mjs` gerou no build, em vez de pedir ao otimizador
 * da Vercel. O motivo está em `imagens.config.mjs`.
 *
 * Roda no servidor e no navegador. Só mexe em imagem de `public/`; endereço de
 * outro domínio, SVG e GIF saem como estão.
 */
export default function carregadorDeImagem({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith('/') || src.startsWith('//')) return src

  let caminho: string
  try {
    caminho = decodeURI(src.split(/[?#]/)[0])
  } catch {
    return src
  }
  if (!EXTENSOES_OTIMIZAVEIS.test(caminho) || caminho.startsWith(`/${PASTA_DAS_VERSOES}/`)) return src

  // No `next dev` as versões não existem, porque o script roda só no build. O
  // `?w=` cala o aviso do Next de carregador que ignora a largura.
  if (process.env.NODE_ENV !== 'production') return `${src}?w=${width}`

  return encodeURI(enderecoDaVersao(caminho, width))
}
