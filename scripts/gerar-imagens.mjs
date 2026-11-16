/**
 * Gera em `public/_img/` um WebP por largura de cada imagem de `public/`, para o
 * carregador do `next/image`. Roda antes do `next build`, pelo script "build" do
 * package.json, então vale na Vercel e na máquina. O motivo de existir está em
 * `imagens.config.mjs`.
 *
 * Qualquer falha encerra com erro e derruba o build: melhor o deploy não subir do
 * que subir com foto quebrada.
 */
import { mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import {
  EXTENSOES_OTIMIZAVEIS,
  LARGURAS_DE_IMAGEM,
  LARGURAS_DE_TELA,
  PASTA_DAS_VERSOES,
  enderecoDaVersao,
} from '../imagens.config.mjs'

const PUBLIC = fileURLToPath(new URL('../public/', import.meta.url))
const SAIDA = path.join(PUBLIC, PASTA_DAS_VERSOES)
const LARGURAS = [...new Set([...LARGURAS_DE_IMAGEM, ...LARGURAS_DE_TELA])].sort((a, b) => a - b)
const MAIOR = LARGURAS.at(-1)

async function listar(pasta) {
  const encontrados = []
  for (const entrada of await readdir(pasta, { withFileTypes: true })) {
    const caminho = path.join(pasta, entrada.name)
    if (entrada.isDirectory()) {
      if (caminho !== SAIDA) encontrados.push(...(await listar(caminho)))
    } else if (EXTENSOES_OTIMIZAVEIS.test(entrada.name)) {
      encontrados.push(caminho)
    }
  }
  return encontrados
}

const inicio = performance.now()
await rm(SAIDA, { recursive: true, force: true })
const arquivos = await listar(PUBLIC)

for (const arquivo of arquivos) {
  // O caminho como o site escreve no `src`, do tipo /images/socials/ig-01.jpg.
  const caminho = '/' + path.relative(PUBLIC, arquivo).split(path.sep).join('/')

  // Decodifica uma vez só, já reduzida à maior largura. Há original com 6250px,
  // e decodificar de novo para cada largura multiplicaria o tempo de build. O
  // rotate() aplica a orientação do EXIF, que não passa para o WebP.
  const { data, info } = await sharp(arquivo)
    .rotate()
    .resize({ width: MAIOR, withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const raw = { width: info.width, height: info.height, channels: info.channels }

  await Promise.all(
    LARGURAS.map(async (largura) => {
      const destino = path.join(PUBLIC, enderecoDaVersao(caminho, largura))
      await mkdir(path.dirname(destino), { recursive: true })
      // Foto mais estreita que a largura sai no tamanho dela, sem ampliar. O
      // arquivo existe mesmo assim, porque o srcset pode pedir qualquer uma.
      await sharp(data, { raw })
        .resize({ width: largura, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(destino)
    }),
  )
}

const segundos = ((performance.now() - inicio) / 1000).toFixed(1)
console.log(`gerar-imagens: ${arquivos.length} imagens em ${LARGURAS.length} larguras, ${segundos}s`)
