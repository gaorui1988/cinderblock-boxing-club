import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import type { Plan } from '../content.ts'
import { perClassMonthly, perClassPack } from '../lib/schedule.ts'
import { Button } from './Button.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

function Roll({ text, className = '' }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span className={`block overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="block"
          initial={reduce ? false : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function PlanCard({ plan, mode }: { plan: Plan; mode: 'monthly' | 'pack' }) {
  const price = mode === 'monthly' ? plan.monthlyPrice : plan.packPrice
  const suffix = mode === 'monthly' ? '/ month' : '/ 10 classes'
  const allowance = mode === 'monthly' ? plan.monthlyAllowance : plan.packTerms
  const math =
    mode === 'monthly'
      ? `$${perClassMonthly(plan.monthlyPrice, plan.weeklyVisits)} per class at ${plan.weeklyVisits} classes a week`
      : `$${perClassPack(plan.packPrice)} per class, never auto-renews`

  return (
    <article
      className={`relative flex h-full flex-col border bg-ink p-8 ${
        plan.featured ? 'border-2 border-signal lg:-translate-y-3' : 'border-slab'
      } ${plan.featured ? 'order-first lg:order-none' : ''}`}
    >
      {plan.tag ? (
        <span className="absolute -top-3.5 left-8 bg-signal px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-ink">
          {plan.tag}
        </span>
      ) : null}
      <h3 className="font-display text-[28px] uppercase leading-none text-chalk">{plan.name}</h3>
      <div className="mt-6 flex items-end gap-3">
        <div className="font-display text-[72px] leading-none text-chalk">
          <Roll text={`$${price}`} />
        </div>
        <div className="mb-2 font-mono text-[13px] uppercase tracking-[0.1em] text-dust">
          <Roll text={suffix} />
        </div>
      </div>
      <p className="mt-4 min-h-[3.2em] text-[16px] text-chalk/80">
        <Roll text={allowance} />
      </p>
      <p className="mt-3 flex items-start gap-2 font-mono text-[13px] uppercase tracking-[0.1em] text-chalk/85">
        <span className="text-signal">=</span>
        <Roll text={math} />
      </p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[15px] text-chalk/85">
            <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-signal" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={`./index.html?plan=${plan.id}#trial`}
        variant={plan.featured ? 'primary' : 'secondary'}
        display="flex"
        className="mt-8 w-full"
      >
        Start free
      </Button>
    </article>
  )
}
