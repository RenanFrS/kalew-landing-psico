import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import SmoothScroll from '@/components/layout/SmoothScroll'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Psicanálise Online | Passer Par La Mer',
    template: '%s | Passer Par La Mer',
  },
  description:
    'Atendimento psicanalítico online. Um espaço de escuta, elaboração e travessia. Para quem busca compreender o que repete, o que dói e o que ainda não tem nome.',
  keywords: [
    'psicanálise',
    'psicanalista',
    'terapia online',
    'análise',
    'atendimento psicanalítico',
    'bem-estar mental',
    'saúde mental',
  ],
  icons: {
    icon: '/instagram/passerparlamer_logo.jpg',
    shortcut: '/instagram/passerparlamer_logo.jpg',
    apple: '/instagram/passerparlamer_logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Passer Par La Mer — Psicanálise',
    title: 'Psicanálise Online | Passer Par La Mer',
    description:
      'O consultório analítico é um espaço diferente: você fala, e algo no que diz começa a revelar o que ainda não sabia sobre si mesmo. A escuta clínica cria essa abertura.',
    images: [
      {
        url: '/instagram/passerparlamer_logo_dark.jpg',
        width: 1200,
        height: 630,
        alt: 'Passer Par La Mer - Psicanálise',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicanálise Online | Passer Par La Mer',
    description:
      'Atendimento psicanalítico online. Um espaço de escuta, elaboração e travessia.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
