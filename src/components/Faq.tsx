import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { faq, images, sections } from '../content.ts'
import { DuoPhoto } from './DuoPhoto.tsx'
import { Mask } from './Mask.tsx'
import { SectionHead } from './SectionHead.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

export function Faq() {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  return (
    <section id="faq" className="section-y bg-ink">
      <div className="wrap grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:sticky lg:top-[104px] lg:col-span-5 lg:self-start">
          <SectionHead index={sections.faq.index} label={sections.faq.label} />
          <Mask
            lines={sections.faq.lines}
            className="mt-10 font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk"
          />
          <figure className="mt-10">
            <DuoPhoto
              src={images.blackGloves.src}
              alt={images.blackGloves.alt}
              className="aspect-[4/5]"
              imgClassName="object-[30%_50%]"
            />
            <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.1em] text-dust">
              {sections.faq.caption}
            </figcaption>
          </figure>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {faq.map((item, index) => {
            const expanded = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`
            return (
              <div key={item.q} className="border-b border-slab">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-6 text-left font-sans text-[19px] font-semibold text-chalk"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <motion.span
                      aria-hidden
                      className={`relative grid h-7 w-7 shrink-0 place-items-center ${expanded ? 'text-signal' : 'text-chalk'}`}
                      animate={{ rotate: expanded ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                    >
                      <span className="absolute h-0.5 w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-0.5 bg-current" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 pr-12 text-[16px] leading-[1.65] text-chalk/80">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
