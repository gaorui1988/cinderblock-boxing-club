import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { classTypes, images, sessions, timetablePage } from '../../content.ts'
import { DuoPhoto } from '../DuoPhoto.tsx'
import { Intensity } from '../Intensity.tsx'
import { Mask } from '../Mask.tsx'
import { Tape } from '../Tape.tsx'

export function Masthead() {
  const reduce = useReducedMotion()
  const bandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section className="bg-ink pb-0 pt-16">
      <div className="wrap grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-signal">
            {timetablePage.kicker} · {sessions.length} sessions · Mon–Sun
          </p>
          <Mask
            as="h1"
            lines={timetablePage.lines}
            immediate
            baseDelay={0.1}
            className="mt-4 font-display text-[clamp(72px,12vw,180px)] uppercase leading-[0.86] text-chalk"
          />
          <p className="mt-6 max-w-[46ch] text-[20px] leading-[1.5] text-chalk/85">{timetablePage.lead}</p>
        </div>
        <ul className="col-span-12 flex gap-4 overflow-x-auto pb-2 lg:col-span-4 lg:col-start-9 lg:grid lg:grid-cols-2 lg:overflow-visible">
          {classTypes.map((item, index) => (
            <motion.li
              key={item.id}
              className="flex min-w-[180px] items-center gap-3 lg:min-w-0"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : index * 0.04, duration: 0.35 }}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center bg-concrete font-mono text-[11px] text-chalk">
                {item.code}
              </span>
              <span>
                <span className="block font-sans text-[13px] font-semibold uppercase tracking-[0.04em] text-chalk">
                  {item.name}
                </span>
                <Intensity value={item.intensity} labelled={false} />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div ref={bandRef} className="relative mt-12 aspect-[16/7] overflow-hidden sm:aspect-[16/4]">
        <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={reduce ? undefined : { y }}>
          <DuoPhoto
            src={images.heavyRopes.src}
            alt={images.heavyRopes.alt}
            className="h-full w-full"
            imgClassName="object-[50%_40%]"
          />
        </motion.div>
      </div>
      <Tape />
    </section>
  )
}
