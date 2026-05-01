'use client'

import { useEffect, useRef } from 'react'
import type { ProcessStep } from '@/types'

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'O que repete',
    description:
      'Certos padrões voltam — nos relacionamentos, nas escolhas, no sofrimento. A psicanálise não trata o sintoma como inimigo, mas como mensagem: algo que pede para ser escutado.',
  },
  {
    number: '02',
    title: 'A escuta',
    description:
      'O consultório analítico é um espaço diferente: você fala, e algo no que diz começa a revelar o que ainda não sabia sobre si mesmo. A escuta clínica cria essa abertura.',
  },
  {
    number: '03',
    title: 'A elaboração',
    description:
      'Com o tempo, o que era opaco começa a ganhar contorno. Não se trata de cura rápida — mas de uma transformação real, que parte do seu próprio encontro com sua história.',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const cards = entry.target.querySelectorAll<HTMLElement>('[data-step]')
          cards.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 200)
          })
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="relative bg-brand-parchment py-28 md:py-36 overflow-hidden"
    >
      {/* Decorative line left */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-clay/10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-brand-clay" />
            <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">
              O processo analítico
            </span>
          </div>
          <h2 className="font-serif font-light text-brand-umber leading-tight max-w-lg"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Para o que dói e<br />
            <em className="italic text-brand-clay">não tem explicação fácil</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              data-step
              style={{
                opacity: 0,
                transform: 'translateY(32px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
              className="group relative pl-6 border-l border-brand-clay/20 hover:border-brand-clay/60 transition-colors duration-500"
            >
              <span className="font-serif text-5xl font-light text-brand-clay/20 group-hover:text-brand-clay/40 transition-colors duration-500 block mb-4 -ml-1">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-medium text-brand-umber mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm font-light text-brand-soil/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-24 border-l-4 border-brand-clay/40 pl-8 max-w-2xl">
          <blockquote className="font-serif text-2xl md:text-3xl font-light italic text-brand-umber/70 leading-relaxed">
            "A palavra tem o poder de criar o que ela nomeia."
          </blockquote>
          <cite className="font-sans text-xs tracking-widest text-brand-clay uppercase not-italic mt-4 block">
            — Sigmund Freud
          </cite>
        </div>
      </div>
    </section>
  )
}
