'use client'

import { useEffect, useRef } from 'react'
import { INSTAGRAM_URL, SITE_CONFIG } from '@/lib/constants'
import Image from 'next/image'

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const els = entry.target.querySelectorAll<HTMLElement>('[data-about-reveal]')
          els.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 180)
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
      id="sobre"
      className="relative bg-brand-linen py-28 md:py-36 overflow-hidden"
    >
      {/* Large bg text */}
      <div
        aria-hidden="true"
        className="absolute top-8 left-4 font-serif font-light text-[clamp(5rem,14vw,14rem)] leading-none text-brand-clay/[0.04] select-none pointer-events-none"
      >
        eu
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — visual placeholder (replace with real photo) */}
          <div
            data-about-reveal
            style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
            className="relative"
          >
            {/* Photo placeholder */}
            <div className="relative aspect-[3/4] bg-brand-parchment overflow-hidden">
              {/* Placeholder texture */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-brand-clay/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif text-3xl text-brand-clay/50">P</span>
                  </div>
                  <p className="font-sans text-xs text-brand-fog tracking-widest uppercase">
                    Foto do analista
                  </p>
                </div>
              </div>
              <Image
                src="/kalew-com-filtro.png"
                alt="Kalew Nicholas, psicanalista"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Name badge */}
            <div className="absolute -bottom-4 -right-4 bg-brand-clay text-brand-cream px-5 py-3">
              <p className="font-sans text-xs tracking-widest uppercase">Kalew Nicholas</p>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <div
              data-about-reveal
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-brand-clay" />
              <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">
                Sobre
              </span>
            </div>

            <h2
              data-about-reveal
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              className="font-serif font-light text-brand-umber mb-6 leading-tight"
            >
              Passar Par La Mer —<br />
              <em className="italic text-brand-clay">atravessar o mar</em>
            </h2>

            <div
              data-about-reveal
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
              className="space-y-4 font-sans text-sm font-light text-brand-soil/65 leading-relaxed"
            >
              <p>
                O nome é uma metáfora: nem tudo se atravessa facilmente. Algumas travessias
                pedem tempo, escuta e a presença de quem pode acompanhar sem antecipar o destino.
              </p>
              <p>
                Sou psicanalista com formação em psicanálise de orientação lacaniana,
                dedicada ao atendimento de adultos em sofrimento — seja ele nomeável
                ou ainda sem forma definida.
              </p>
              <p>
                Meu trabalho é um convite: que você possa falar e, ao falar, descobrir
                o que não sabia que sabia sobre si mesmo.
              </p>
            </div>

            <div
              data-about-reveal
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
              className="mt-10 pt-10 border-t border-brand-parchment grid grid-cols-2 gap-6"
            >
              {[
                { label: 'Formação', value: 'Psicanálise Lacaniana' },
                { label: 'Atendimento', value: 'Online · Brasil e exterior' },
                { label: 'Duração', value: '50 minutos por sessão' },
                { label: 'Instagram', value: '@passerparlamer' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-sans text-[10px] tracking-[0.2em] text-brand-fog uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm text-brand-umber">
                    {item.label === 'Instagram' ? (
                      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">
                        {item.value}
                      </a>
                    ) : item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
