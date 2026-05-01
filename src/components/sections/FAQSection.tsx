'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/types'

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'O que é psicanálise e como ela difere de outras terapias?',
    answer:
      'A psicanálise parte de um pressuposto diferente: o sofrimento tem um sentido, mesmo quando não é imediatamente visível. Em vez de treinar comportamentos ou reestruturar pensamentos, a psicanálise cria um espaço para que você possa falar livremente — e, nessa fala, encontrar o que sua história tem a dizer.',
  },
  {
    question: 'Quanto tempo dura o processo analítico?',
    answer:
      'Não há prazo fixo. A psicanálise é um trabalho de longo prazo — mas isso não significa que nada acontece no início. Muitas pessoas percebem mudanças já nas primeiras semanas. A duração depende do que cada pessoa traz e do que quer alcançar.',
  },
  {
    question: 'Como funciona o atendimento online?',
    answer:
      'As sessões acontecem por videoconferência, em plataforma segura e com sigilo profissional. Atendo brasileiros no Brasil e no exterior. O que muda é a tela entre nós — a escuta, não.',
  },
  {
    question: 'Qual a frequência das sessões?',
    answer:
      'Em geral, as sessões são semanais, com 50 minutos de duração. Em alguns momentos do processo, pode fazer sentido aumentar a frequência — isso é discutido no próprio trabalho.',
  },
  {
    question: 'Para quem é indicada a psicanálise?',
    answer:
      'Para adultos que sentem que algo repete — nos relacionamentos, nas escolhas, no sofrimento — e que querem compreender o que está por trás disso. Não é preciso ter um "diagnóstico" para buscar análise. É preciso ter vontade de se escutar.',
  },
  {
    question: 'Como posso começar?',
    answer:
      'Basta me escrever pelo WhatsApp ou pelo Instagram. Conversamos para nos apresentar e, se fizer sentido para ambas, marcamos uma sessão inicial sem compromisso.',
  },
]

interface AccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-brand-clay/15">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg font-light text-brand-umber group-hover:text-brand-clay transition-colors duration-300">
          {item.question}
        </span>
        <span
          className={cn(
            'text-brand-clay transition-transform duration-300 mt-1 shrink-0 text-xl leading-none',
            isOpen ? 'rotate-45' : 'rotate-0'
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-400 ease-in-out',
          isOpen ? 'max-h-64 pb-6' : 'max-h-0'
        )}
      >
        <p className="font-sans text-sm font-light text-brand-soil/60 leading-relaxed max-w-2xl">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-brand-linen py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left */}
          <div className="md:sticky md:top-28 h-fit">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-clay" />
              <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">FAQ</span>
            </div>
            <h2
              className="font-serif font-light text-brand-umber leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Perguntas<br />
              <em className="italic text-brand-clay">frequentes</em>
            </h2>
            <p className="font-sans text-sm font-light text-brand-soil/60 leading-relaxed">
              Dúvidas são bem-vindas. Se a sua não estiver aqui,
              você pode me perguntar diretamente.
            </p>
          </div>

          {/* Right — accordion */}
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
