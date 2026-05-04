'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS, SITE_CONFIG, WHATSAPP_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-brand-linen/95 backdrop-blur-sm shadow-sm py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-lg font-light tracking-widest text-brand-umber uppercase">
            Passer Par La Mer
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] text-brand-clay uppercase mt-0.5">
            {SITE_CONFIG.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-light tracking-wide text-brand-umber/70 hover:text-brand-clay transition-colors duration-300 animated-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium tracking-wide text-brand-cream bg-brand-clay px-5 py-2.5 rounded-none hover:bg-brand-umber transition-colors duration-300"
          >
            Agendar sessão
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={cn('w-6 h-px bg-brand-umber transition-all duration-300', menuOpen && 'rotate-45 translate-y-2.5')} />
          <span className={cn('w-6 h-px bg-brand-umber transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-px bg-brand-umber transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2.5')} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-brand-linen/98 backdrop-blur-sm border-t border-brand-parchment',
          'transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-96 py-6' : 'max-h-0'
        )}
      >
        <nav className="flex flex-col gap-4 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-base font-light text-brand-umber/80 py-1 border-b border-brand-parchment last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center font-sans text-sm font-medium text-brand-cream bg-brand-clay px-5 py-3"
          >
            Agendar sessão
          </a>
        </nav>
      </div>
    </header>
  )
}
