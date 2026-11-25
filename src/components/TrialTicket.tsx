import { motion, useReducedMotion } from 'motion/react'
import type { Session } from '../content.ts'
import { gym } from '../content.ts'
import { coachById, DAY_SHORT, rangeLabel, sessionName } from '../lib/schedule.ts'
import { Button } from './Button.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  firstName: string
  email: string
  session: Session
  reference: string
  minHeight?: number
  onReset: () => void
}

export function TrialTicket({ firstName, email, session, reference, minHeight, onReset }: Props) {
  const reduce = useReducedMotion()
  const coach = coachById(session.coachId)
  return (
    <motion.div
      className="relative border border-slab bg-ink"
      style={{ minHeight }}
      initial={reduce ? { opacity: 0 } : { y: -24, rotate: -1.5, opacity: 0 }}
      animate={{ y: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.12 : 0.42, ease: EASE }}
    >
      <motion.div
        className="h-1.5 origin-left bg-signal"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 0.36, ease: EASE, delay: reduce ? 0 : 0.42 }}
      />
      <div className="px-6 py-8 sm:px-10">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-signal">Trial confirmed</p>
        <h3 className="mt-3 font-display text-[40px] uppercase leading-none text-chalk">
          You're in, {firstName}.
        </h3>
      </div>
      <div className="relative border-t border-dashed border-slab">
        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-concrete" aria-hidden />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-concrete" aria-hidden />
      </div>
      <div className="grid gap-5 px-6 py-8 sm:grid-cols-3 sm:px-10">
        <Field label="Class" value={sessionName(session)} />
        <Field label="When" value={`${DAY_SHORT[session.day]} ${rangeLabel(session)}`} />
        <Field label="Coach" value={coach.name} />
      </div>
      <div className="px-6 pb-8 sm:px-10">
        <p className="font-mono text-[20px] tracking-[0.12em] text-chalk">{reference}</p>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-chalk/80">
          Arrive 15 minutes early at {gym.street}. Bring water and wear trainers; we'll handle the rest. A confirmation
          is on its way to {email}.
        </p>
        <Button variant="secondary" className="mt-6" onClick={onReset}>
          Book another
        </Button>
      </div>
    </motion.div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-dust">{label}</p>
      <p className="mt-1 font-sans text-[16px] font-semibold text-chalk">{value}</p>
    </div>
  )
}
