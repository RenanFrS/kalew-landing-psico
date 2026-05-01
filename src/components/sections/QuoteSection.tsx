export function QuoteSection() {
  return (
    <section className="bg-brand-clay py-20 md:py-28 overflow-hidden relative">
      {/* Decorative element */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-sand/20"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-brand-sand/20">
          {[
            {
              stat: 'Online',
              label: 'Atendimento',
              sub: 'Brasil e exterior',
            },
            {
              stat: '50 min',
              label: 'Por sessão',
              sub: 'Com horário fixo semanal',
            },
            {
              stat: 'Sigiloso',
              label: 'Ético e seguro',
              sub: 'Sigilo profissional garantido',
            },
          ].map((item) => (
            <div
              key={item.stat}
              className="text-center px-8 py-6 md:py-0 first:pt-0 last:pb-0 md:first:pt-0 md:last:pb-0"
            >
              <p
                className="font-serif font-light text-brand-cream mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {item.stat}
              </p>
              <p className="font-sans text-sm font-medium text-brand-cream/80 tracking-wide mb-1">
                {item.label}
              </p>
              <p className="font-sans text-xs font-light text-brand-cream/50 tracking-wide">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
