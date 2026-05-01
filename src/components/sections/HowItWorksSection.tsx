'use client'

import { useEffect, useRef } from 'react'
import { WHATSAPP_URL } from '@/lib/constants'

const STEPS = [
  {
    step: '1',
    title: 'Primeiro contato',
    description: 'Você me escreve pelo WhatsApp ou Instagram. Conversamos brevemente para que possamos marcar um horário adequado.',
  },
  {
    step: '2',
    title: 'Sessão inicial',
    description: 'A primeira sessão é de apresentação mútua: você fala sobre o que te trouxe, e eu escuto sem pressa de concluir ou resolver.',
  },
  {
    step: '3',
    title: 'O processo',
    description: 'As sessões têm frequência semanal, com 50 minutos de duração. O trabalho se constrói ao longo do tempo, no ritmo do que emerge.',
  },
  {
    step: '4',
    title: 'A travessia',
    description: 'Não há destino fixo. Há, sim, uma transformação que acontece quando você se permite ser escutado — por mim e por si mesmo.',
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const els = entry.target.querySelectorAll<HTMLElement>('[data-hiw]')
          els.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 150)
          })
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative bg-brand-umber py-28 md:py-36 overflow-hidden"
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-brand-sand/5 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-brand-sand/8 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          data-hiw
          style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-brand-sand/50" />
            <span className="font-sans text-xs tracking-[0.3em] text-brand-sand/50 uppercase">
              Como funciona
            </span>
          </div>
          <h2
            className="font-serif font-light text-brand-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            O caminho começa<br />
            <em className="italic text-brand-sand">por um primeiro passo</em>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              data-hiw
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
              className="group"
            >
              <div className="flex items-start gap-3 mb-5">
                <span className="font-serif text-4xl font-light text-brand-clay/60 group-hover:text-brand-clay transition-colors duration-500 leading-none">
                  {step.step}
                </span>
                <div className="flex-1 h-px bg-brand-sand/20 mt-4 group-hover:bg-brand-sand/40 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-cream mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm font-light text-brand-sand/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          data-hiw
          style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
          className="mt-20 pt-16 border-t border-brand-sand/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <p className="font-serif text-xl md:text-2xl font-light italic text-brand-cream/70 max-w-md">
            "Às vezes, basta dizer o que ainda não se disse."
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              font-sans text-sm font-medium tracking-wide
              text-brand-umber bg-brand-sand
              px-8 py-4
              hover:bg-brand-cream
              transition-colors duration-300
              group shrink-0
            "
          >
            Agendar minha sessão
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
