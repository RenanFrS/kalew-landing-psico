import Link from 'next/link'
import { INSTAGRAM_URL, SITE_CONFIG, WHATSAPP_URL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-brand-umber text-brand-sand">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-light tracking-widest text-brand-cream uppercase mb-2">
              Passar Par La Mer
            </p>
            <p className="font-sans text-xs tracking-[0.25em] text-brand-sand/60 uppercase mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <p className="font-sans text-sm font-light text-brand-sand/70 leading-relaxed max-w-xs">
              Um espaço de escuta, onde o que repete pode, afinal, ser dito.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-brand-sand/50 uppercase mb-6">Navegação</p>
            <nav className="flex flex-col gap-3">
              {['#processo', '#sobre', '#como-funciona', '#contato'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="font-sans text-sm font-light text-brand-sand/70 hover:text-brand-sand transition-colors animated-underline"
                >
                  {['O processo', 'Sobre', 'Como funciona', 'Contato'][i]}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-brand-sand/50 uppercase mb-6">Contato</p>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-light text-brand-sand/70 hover:text-brand-sand transition-colors animated-underline"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-light text-brand-sand/70 hover:text-brand-sand transition-colors animated-underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-sand/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-xs font-light text-brand-sand/40">
            {SITE_CONFIG.crp} · Atendimento online
          </p>
          <p className="font-sans text-xs font-light text-brand-sand/40">
            © {new Date().getFullYear()} Passar Par La Mer. Todos os direitos reservados.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-brand-sand/20">
          <p className="font-sans text-xs font-light text-brand-sand/40">
            Desenvolvido por:{' '}
            <a
              href="https://instagram.com/renanrocha.01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-sand/60 hover:text-brand-sand transition-colors"
            >
              Renan Rocha
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
