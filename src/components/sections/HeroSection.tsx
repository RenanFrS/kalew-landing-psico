'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { WHATSAPP_URL } from '@/lib/constants'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const els = entry.target.querySelectorAll<HTMLElement>('[data-reveal]')
          els.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 160)
          })
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const revealStyle = {
    opacity: 0,
    transform: 'translateY(28px)',
    transition: 'opacity 0.9s ease, transform 0.9s ease',
  } as const

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-linen"
    >
      {/* Background decorative elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 80% at 80% 50%, #8B5E3C 0%, transparent 70%)`,
        }}
      />

      {/* Thin vertical line — decorative */}
      <div
        aria-hidden="true"
        className="absolute left-[8%] top-0 bottom-0 w-px bg-brand-clay/15 hidden lg:block"
      />

      {/* Large background word */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-6 md:right-16 font-serif text-[clamp(6rem,18vw,18rem)] font-light leading-none text-brand-clay/[0.10] lg:text-brand-clay/[0.04] tracking-tighter select-none pointer-events-none z-10"
      >
        mar
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto w-full px-6 md:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div data-reveal style={revealStyle} className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-brand-clay" />
              <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">
                Psicoterapia Online
              </span>
            </div>

            {/* Headline */}
            <h1
              data-reveal
              style={{ ...revealStyle, fontSize: 'clamp(2.8rem, 6.5vw, 6rem)' }}
              className="font-serif font-light text-brand-umber leading-[1.06] mb-8 tracking-tight"
            >
              Existe algo<br />
              <em className="not-italic text-brand-clay">em você</em><br />
              que ainda<br />
              não tem nome.
            </h1>

            {/* Subtext */}
            <p
              data-reveal
              style={{ ...revealStyle, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
              className="font-sans font-light text-brand-soil/70 leading-relaxed mb-12 max-w-xl"
            >
              A psicanálise é um espaço para escutar o que repete, o que dói
              e o que insiste — mesmo quando não há palavras para isso ainda.
            </p>

            {/* CTA */}
            <div data-reveal style={revealStyle} className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-3
                  font-sans text-sm font-medium tracking-wide
                  text-brand-cream bg-brand-clay
                  px-8 py-4
                  hover:bg-brand-umber
                  transition-colors duration-300
                  group
                "
              >
                Agendar uma sessão
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <a
                href="#sobre"
                className="
                  inline-flex items-center gap-2
                  font-sans text-sm font-light tracking-wide
                  text-brand-umber/60
                  px-2 py-4
                  hover:text-brand-clay
                  transition-colors duration-300
                  border-b border-brand-fog/40 hover:border-brand-clay
                "
              >
                Saber mais
              </a>
            </div>
          </div>

          {/* Right — analyst photo */}
          <div
            data-reveal
            style={revealStyle}
            className="relative order-first lg:order-none w-full max-w-[260px] sm:max-w-xs mx-auto lg:max-w-md lg:mx-0 lg:ml-auto mb-8 lg:mb-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/kalew-filtro-2.png"
                alt="Kalew Nicholas, psicanalista"
                fill
                sizes="(min-width: 1024px) 40vw, 260px"
                className="object-cover"
                priority
              />
              {/* Soft overlay to blend with linen background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-linen/30 via-transparent to-transparent pointer-events-none"
              />
            </div>

            {/* Decorative frame line */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 w-24 h-px bg-brand-clay/40"
            />
            <div
              aria-hidden="true"
              className="absolute -top-3 -right-3 h-24 w-px bg-brand-clay/40"
            />
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-brand-clay/50 animate-pulse" />
      </div>
    </section>
  )
}
