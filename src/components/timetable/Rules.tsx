import { Clock, Droplets, Hand, ShieldCheck } from 'lucide-react'
import { rules, timetablePage } from '../../content.ts'
import { Button } from '../Button.tsx'
import { Mask } from '../Mask.tsx'
import { Reveal } from '../Reveal.tsx'

const icons = [Clock, Hand, Droplets, ShieldCheck]

export function Rules() {
  return (
    <section className="bg-coal py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((rule, index) => {
            const Icon = icons[index]
            return (
              <Reveal key={rule.title} delay={index * 0.07}>
                <article className="h-full border border-slab p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] tracking-[0.12em] text-signal">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon size={18} strokeWidth={2} className="text-chalk" />
                  </div>
                  <h3 className="mt-6 font-display text-[24px] uppercase leading-none text-chalk">{rule.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-chalk/80">{rule.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
        <div className="relative mt-24 bg-ink px-6 py-14 sm:px-10">
          <span className="absolute inset-x-0 top-0 h-2.5 bg-[repeating-linear-gradient(-45deg,#FF4F1F_0_10px,#0C0C0B_10px_20px)]" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Mask
              lines={timetablePage.ctaLines}
              className="font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk"
            />
            <div className="flex flex-wrap gap-3">
              <Button href="./index.html#trial">Book trial</Button>
              <Button href="./index.html#pricing" variant="secondary">
                See prices
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
