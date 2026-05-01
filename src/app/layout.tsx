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

export const metadata: Metadata = {
  metadataBase: new URL('https://passerparlamer.com.br'),
  title: {
    default: 'Psicanálise Online | Passar Par La Mer',
    template: '%s | Passar Par La Mer',
  },
  description:
    'Atendimento psicanalítico online. Um espaço de escuta, elaboração e travessia. Para quem busca compreender o que repete, o que dói e o que ainda não tem nome.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Passar Par La Mer — Psicanálise',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
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
