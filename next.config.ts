import type { NextConfig } from 'next'

import { LARGURAS_DE_IMAGEM, LARGURAS_DE_TELA } from './imagens.config.mjs'

const config: NextConfig = {
  // As imagens saem pré geradas no build, e não pelo otimizador da Vercel, cuja
  // cota do plano Hobby é pequena e dividida entre todos os projetos. O motivo
  // está em imagens.config.mjs. As larguras ficam restritas às que o script gera.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/carregador-imagem.ts',
    deviceSizes: LARGURAS_DE_TELA,
    imageSizes: LARGURAS_DE_IMAGEM,
  },
}

export default config
