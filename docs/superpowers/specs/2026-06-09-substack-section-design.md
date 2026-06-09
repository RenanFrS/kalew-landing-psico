# Substack Section — Design

**Data:** 2026-06-09

## Objetivo

Adicionar uma nova section à landing page que reproduz visualmente o "menu de
posts" do perfil Substack do Kalew (publicação *passer par la mer*), adaptado à
identidade visual do site. A section entra **logo após a `FAQSection`**.

## Requisitos

- Aparência inspirada na lista de posts do perfil Substack: linhas empilhadas
  com miniatura, título, subtítulo e data.
- **Sem** os botões *Subscribe* / *Message* do Substack.
- CTA(s) apontando para o perfil/publicação do Substack.
- Cada card de post linka para o **post específico** (links reais do feed RSS).
- Posicionada após a section de FAQ.

## Decisões (confirmadas com o usuário)

1. **Dados:** fixos no código (mesmo padrão de `src/data/instagram.ts`).
   Atualização manual quando houver novo post.
2. **Destino dos cards:** cada card abre seu post individual no Substack.

### Revisão após print de referência (`public/print-exemplo-substack/substack.png`)

3. **Escopo:** replicar o **perfil inteiro** do print — avatar, nome
   "Kalew Nicholas", @handle, bio, chip da publicação "passer par la mer" (+nº),
   "525 assinantes", abas (Atividade / Publicações ativa / Likes e respostas /
   Leituras (6)) e a lista de posts com ícones de engajamento.
4. **Botões Atualize / Mensagem:** mantidos visualmente, mas viram links
   (`<a href>`) para o perfil do Substack (sem a função real de subscribe/message).
   O botão "..." é decorativo.
5. **Paleta:** manter a paleta quente do site (linen/cream/umber/clay/fog),
   não o branco/cinza do Substack.
6. **Miniaturas dos posts:** pequenas e em paisagem (~104×72 / 124×84 px),
   `object-cover`, à direita junto da data — como no print (correção do tamanho
   grande/quadrado da primeira versão).

## Arquitetura

### Novos arquivos

- `src/data/substack.ts`
  - `interface SubstackPost { id, title, subtitle, date, displayDate, url, imageSrc }`
  - `export const SUBSTACK_POSTS: SubstackPost[]` com os 3 posts atuais.
- `src/components/sections/SubstackSection.tsx`
  - Componente server (sem hooks/interatividade). Lista vertical de posts.

### Arquivos alterados

- `src/lib/constants.ts` — adicionar `SUBSTACK_URL = 'https://kalewnicholas.substack.com'`.
- `src/app/page.tsx` — importar e renderizar `<SubstackSection />` após `<FAQSection />`.

### Assets

- `public/substack/post-1.jpg`, `post-2.jpg`, `post-3.jpg` — miniaturas baixadas
  do CDN do Substack (evita hotlink). Exibidas com `object-cover` em proporção
  fixa para uniformizar as diferentes dimensões originais.

## Layout

- `<section id="substack">` com fundo `brand-linen`, padding vertical igual às
  sections irmãs (`py-24/28 md:py-32/36`), container `max-w-6xl`.
- **Header:** eyebrow `— SUBSTACK`, título serif (ex.: *"Textos & ensaios"* com
  ênfase em itálico clay), e link "Ler no Substack →" (estilo do link do header
  da `InstagramSection`) para `SUBSTACK_URL`.
- **Lista:** cada item é um `<a target="_blank">` para `post.url`, com:
  - miniatura à direita (proporção fixa, `object-cover`, cantos arredondados),
  - título serif + subtítulo (sans, `brand-soil/60`) + data (eyebrow `brand-clay`) à esquerda,
  - divisor `border-brand-clay/15` entre itens (padrão da `FAQSection`),
  - hover: título → `brand-clay`.
- **Rodapé:** CTA "Ver todos no Substack" → `SUBSTACK_URL`.

## Conteúdo dos posts

1. *O homem contra a natureza?* — "Ou: Atualizando um velho conflito" — 20 jan 2026
   — `/p/o-homem-contra-a-natureza`
2. *Depressão não é doença* — "E essa afirmação não resume um problema biológico,
   mas um problema de linguagem" — 1 dez 2025 — `/p/depressao-nao-e-doenca`
3. *A incapacidade de ir além dos símbolos e compreender a realidade* —
   "Ou: Pra você dar nome" — 15 ago 2025 — `/p/a-incapacidade-de-ir-alem-dos-simbolos`

## Fora de escopo

- Integração ao vivo via RSS.
- Link na navegação do header.
- Botões de subscribe/message reais.
