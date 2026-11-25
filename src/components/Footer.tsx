import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { classTypes, footer, gym, visit } from '../content.ts'
import { Tape } from './Tape.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

export function Footer() {
  const reduce = useReducedMotion()
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const inView = useInView(wordmarkRef, { once: true, amount: 0.3 })
  const show = Boolean(reduce) || inView
  return (
    <footer className="bg-ink pb-8 pt-0">
      <Tape />
      <div className="wrap pt-[72px]">
        <h2
          ref={wordmarkRef}
          className="mb-14 flex flex-wrap gap-x-[0.22em] border-b border-slab pb-8 font-display text-[clamp(64px,12vw,200px)] uppercase leading-[0.85] text-chalk"
        >
          {gym.words.map((word, index) => {
            const last = index === gym.words.length - 1
            return (
              <span key={word} className="overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${last ? 'text-signal' : ''}`}
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: show ? '0%' : '110%' }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: show ? index * 0.08 : 0 }}
                >
                  {word}
                </motion.span>
              </span>
            )
          })}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Train">
            {classTypes.map((item) => (
              <a key={item.id} href={`./timetable.html?type=${item.id}`} className="block text-[15px] text-chalk/80">
                {item.name}
              </a>
            ))}
          </Column>
          <Column title="Club">
            {footer.club.map((item) => (
              <a key={item.href} href={item.href} className="block text-[15px] text-chalk/80">
                {item.label}
              </a>
            ))}
          </Column>
          <Column title="Visit">
            <p className="text-[15px] text-chalk/80">{gym.street}</p>
            <p className="text-[15px] text-chalk/80">{gym.locality}</p>
            <a href={gym.phoneHref} className="block text-[15px] text-chalk/80">
              {gym.phone}
            </a>
          </Column>
          <Column title="Hours">
            {visit.hours.map((row) => (
              <p key={row.id} className="text-[15px] text-chalk/80">
                {row.label} {row.time}
              </p>
            ))}
          </Column>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-slab pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-chalk/75">{footer.blurb}</p>
          <a href={footer.creditHref} className="font-mono text-[11px] uppercase tracking-[0.1em] text-dust">
            {footer.credit}
          </a>
        </div>
      </div>
    </footer>
  )
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-signal">{title}</h3>
      {children}
    </div>
  )
}
