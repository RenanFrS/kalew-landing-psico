/**
 * Versões de imagem geradas no build, no lugar do otimizador da Vercel.
 *
 * O plano Hobby dá 5 mil transformações por mês para a conta inteira, somando
 * todos os projetos. Elas acabaram em novembro de 2026 e toda foto fora do cache
 * passou a voltar 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), sumindo da
 * página. Agora o `scripts/gerar-imagens.mjs` cria um WebP por largura antes do
 * `next build`, e o carregador do `next/image` aponta direto para esses arquivos,
 * que saem como estáticos comuns.
 *
 * Três pontas leem este arquivo e precisam concordar: o `next.config.ts`, que
 * só pede ao `next/image` estas larguras; o script, que gera um arquivo para cada
 * uma; e o `src/lib/carregador-imagem.ts`, que monta o endereço do arquivo.
 */

/** Viram o `deviceSizes` do Next: imagens que ocupam boa parte da tela. */
export const LARGURAS_DE_TELA = [640, 828, 1080, 1200, 1920]

/** Viram o `imageSizes` do Next: ícones, avatares e miniaturas. */
export const LARGURAS_DE_IMAGEM = [32, 64, 128, 256, 384]

/** Pasta dentro de `public/`, fora do git, recriada a cada build. */
export const PASTA_DAS_VERSOES = '_img'

/** O resto (SVG, GIF, imagem de outro domínio) sai como está. */
export const EXTENSOES_OTIMIZAVEIS = /\.(png|jpe?g|webp)$/i

/** Endereço da versão de uma imagem de `public/` numa largura. */
export const enderecoDaVersao = (caminho, largura) =>
  `/${PASTA_DAS_VERSOES}${caminho}/${largura}.webp`
