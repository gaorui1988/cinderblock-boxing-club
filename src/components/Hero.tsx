import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { hero, images } from '../content.ts'
import { upcomingBadge } from '../lib/schedule.ts'
import { useNow } from '../lib/useOpenNow.ts'
import { Button } from './Button.tsx'
import { CountUp } from './CountUp.tsx'
import { DuoPhoto } from './DuoPhoto.tsx'
import { Mask } from './Mask.tsx'

const EASE = [0.2, 0.7, 0.2, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const now = useNow()
  const badge = upcomingBadge(now)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  return (
    <section id="top" className="relative flex min-h-[max(100svh,680px)] items-end overflow-hidden pb-[72px] pt-20 lg:pt-0">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
      >
        <DuoPhoto
          src={images.gymFloor.src}
          alt={images.gymFloor.alt}
          className="h-full w-full"
          imgClassName="object-[35%_50%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-ink/10" />
      <div className="wrap relative z-10 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <motion.p
            className="mb-6 flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.16em] text-signal"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: 0.45 }}
          >
            <span className="h-2 w-2 bg-signal" aria-hidden />
            {hero.eyebrow}
          </motion.p>
          <Mask
            as="h1"
            lines={hero.lines}
            immediate
            baseDelay={0.15}
            className="font-display text-[clamp(76px,13.5vw,212px)] uppercase leading-[0.86] tracking-[-0.01em] text-chalk"
          />
          <motion.p
            className="mt-7 max-w-[46ch] font-sans text-[20px] leading-[1.5] text-chalk/85"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: 0.55 }}
          >
            {hero.lead}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: 0.61 }}
          >
            <Button href="#trial">
              Book trial
              <ArrowRight size={18} strokeWidth={2} />
            </Button>
            <Button href="./timetable.html" variant="secondary">
              See timetable
            </Button>
          </motion.div>
          <motion.div
            className="mt-14 grid grid-cols-2 gap-y-6 sm:flex sm:gap-0"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, delay: 0.67 }}
          >
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`sm:px-6 sm:first:pl-0 ${index < hero.stats.length - 1 ? 'sm:border-r sm:border-slab' : ''}`}
              >
                <div className="font-display text-[44px] leading-none text-chalk">
                  <CountUp value={stat.value} pad={'pad' in stat ? stat.pad : undefined} suffix={stat.suffix} />
                </div>
                <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-dust">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {badge ? (
        <p className="absolute bottom-[72px] right-10 z-10 hidden max-w-[280px] items-center gap-3 text-right font-mono text-[12px] uppercase tracking-[0.1em] text-chalk lg:flex">
          <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden />
          {badge}
        </p>
      ) : null}
    </section>
  )
}
