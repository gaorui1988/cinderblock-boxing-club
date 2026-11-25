import { motion, useReducedMotion } from 'motion/react'
import { images, quotes, results, sections } from '../content.ts'
import { CountUp } from './CountUp.tsx'
import { DuoPhoto } from './DuoPhoto.tsx'
import { Reveal } from './Reveal.tsx'
import { SectionHead } from './SectionHead.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

export function Results() {
  const reduce = useReducedMotion()
  return (
    <section id="results" className="relative py-[136px]">
      <div className="absolute inset-0">
        <DuoPhoto src={images.ringCorner.src} alt="" className="h-full w-full opacity-35" />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="wrap relative">
        <SectionHead index={sections.results.index} label={sections.results.label} />
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {results.stats.map((stat) => (
            <div key={stat.label}>
              <motion.span
                className="mb-3 block h-1 w-8 origin-left bg-signal"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              />
              <div className="font-display text-[clamp(64px,8vw,120px)] leading-none text-chalk">
                <CountUp value={stat.value} suffix={'suffix' in stat ? stat.suffix : ''} />
              </div>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.1em] text-dust">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <Reveal key={quote.by} delay={index * 0.09}>
              <blockquote className="h-full border border-slab bg-ink/70 p-8">
                <span className="font-display text-[40px] leading-none text-signal" aria-hidden>
                  “
                </span>
                <p className="mt-3 font-sans text-[20px] font-medium leading-snug text-chalk">{quote.text}</p>
                <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.1em] text-signal">{quote.fact}</p>
                <footer className="mt-3 text-[14px] text-dust">{quote.by}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-dust">{results.note}</p>
      </div>
    </section>
  )
}
