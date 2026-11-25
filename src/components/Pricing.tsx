import { useState, type KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { plans, sections } from '../content.ts'
import { Mask } from './Mask.tsx'
import { PlanCard } from './PlanCard.tsx'
import { Reveal } from './Reveal.tsx'
import { SectionHead } from './SectionHead.tsx'

type Mode = 'monthly' | 'pack'

export function Pricing() {
  const [mode, setMode] = useState<Mode>('monthly')
  const reduce = useReducedMotion()

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      setMode((current) => (current === 'monthly' ? 'pack' : 'monthly'))
    }
  }

  return (
    <section id="pricing" className="section-y bg-coal">
      <div className="wrap">
        <SectionHead index={sections.pricing.index} label={sections.pricing.label} count={sections.pricing.count} />
        <Mask
          lines={sections.pricing.lines}
          className="mt-10 font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk"
        />
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="relative mx-auto mt-12 flex h-[52px] w-full max-w-[360px] border border-slab"
          onKeyDown={onKey}
        >
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/2 bg-signal"
            animate={{ x: mode === 'monthly' ? '0%' : '100%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
          />
          {(
            [
              ['monthly', 'Monthly'],
              ['pack', '10-class pack'],
            ] as const
          ).map(([id, label]) => {
            const active = mode === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMode(id)}
                className={`relative z-10 w-1/2 font-sans text-[14px] font-bold uppercase tracking-[0.06em] ${
                  active ? 'text-ink' : 'text-chalk/70'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 pt-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.08} className={plan.featured ? 'order-first lg:order-none' : ''}>
              <PlanCard plan={plan} mode={mode} />
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-[14px] text-dust">{sections.pricing.note}</p>
      </div>
    </section>
  )
}
