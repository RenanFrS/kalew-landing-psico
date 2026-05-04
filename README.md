# Passer Par La Mer — Landing Page

Landing page para consultório de psicanálise, desenvolvida em **Next.js 15 + TypeScript + Tailwind CSS v4**.

## Identidade Visual

- **Paleta terrosa**: clay `#8B5E3C`, sand `#C9A97A`, linen `#F2EAD8`, umber `#4A3728`
- **Tipografia**: Cormorant Garamond (serif display) + Jost (sans-serif corpo)
- **Estética**: editorial refinado, minimalismo expressivo, tons de terra e pergaminho

## Estrutura

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Página principal (composição das seções)
│   └── globals.css         # Tailwind base + utilidades customizadas
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Nav fixo com scroll effect + menu mobile
│   │   └── Footer.tsx      # Rodapé com links e CRP
│   └── sections/
│       ├── HeroSection.tsx       # Above-the-fold principal
│       ├── ProcessSection.tsx    # O processo analítico (3 colunas)
│       ├── AboutSection.tsx      # Sobre o analista
│       ├── QuoteSection.tsx      # Banda de stats (online, 50min, sigilo)
│       ├── HowItWorksSection.tsx # Como funciona (4 passos)
│       ├── FAQSection.tsx        # FAQ com accordion
│       └── ContactSection.tsx   # CTA final com WhatsApp + Instagram
├── lib/
│   ├── utils.ts            # cn() helper
│   └── constants.ts        # WhatsApp, Instagram, CRP, nav links
└── types/
    └── index.ts            # Tipos compartilhados
```

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build de produção
npm run build
```

## Customizações necessárias

Antes de publicar, edite `src/lib/constants.ts`:

```ts
export const WHATSAPP_NUMBER = '5511999999999'  // ← número real do WhatsApp
export const SITE_CONFIG = {
  crp: 'CRP 06/XXXXXX',  // ← CRP real do profissional
}
```

### Foto do analista

Em `src/components/sections/AboutSection.tsx`, substitua o placeholder pela foto real:

```tsx
import Image from 'next/image'

// Substitua o div placeholder por:
<Image
  src="/foto-analista.jpg"    // coloque a foto em /public/
  alt="Nome do analista, psicanalista"
  fill
  className="object-cover"
  priority
/>
```

## Tecnologias

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Google Fonts**: Cormorant Garamond + Jost via `next/font`
- **Animações**: CSS puro + IntersectionObserver (sem Framer Motion — zero bundle overhead)
