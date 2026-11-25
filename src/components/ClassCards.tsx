import { classTypes, sections } from '../content.ts'
import { weeklyCount } from '../lib/schedule.ts'
import { DuoPhoto } from './DuoPhoto.tsx'
import { Intensity } from './Intensity.tsx'
import { Mask } from './Mask.tsx'
import { Reveal } from './Reveal.tsx'
import { SectionHead } from './SectionHead.tsx'

export function ClassCards() {
  return (
    <section id="classes" className="section-y bg-ink">
      <div className="wrap">
        <SectionHead index={sections.classes.index} label={sections.classes.label} count="6 types · 34 sessions / week" />
        <div className="mt-10 grid grid-cols-12 items-end gap-6">
          <Mask
            lines={sections.classes.lines}
            className="col-span-12 font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk lg:col-span-7"
          />
          <p className="col-span-12 max-w-[42ch] font-sans text-[20px] leading-[1.5] text-chalk/85 lg:col-span-4 lg:col-start-9">
            {sections.classes.lead}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {classTypes.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="group relative h-full border border-slab bg-coal transition-colors duration-200 hover:border-signal">
                <span className="absolute left-0 top-0 z-10 h-1 w-full origin-left scale-x-0 bg-signal transition-transform duration-[260ms] group-hover:scale-x-100" />
                <div className="relative">
                  <DuoPhoto src={item.image} alt={item.alt} className="aspect-[4/3]" imgClassName="photo-zoom" />
                  <span className="absolute left-3 top-3 z-[3] bg-ink/80 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-chalk">
                    {String(index + 1).padStart(2, '0')} / 06
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[34px] uppercase leading-none text-chalk">{item.name}</h3>
                  <div className="my-4 flex flex-wrap gap-2">
                    <span className="border border-slab px-2 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-chalk/80">
                      {item.level}
                    </span>
                    <span className="border border-slab px-2 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-chalk/80">
                      {item.duration} min
                    </span>
                  </div>
                  <Intensity value={item.intensity} />
                  <p className="mt-4 min-h-[4.8em] text-[16px] leading-normal text-chalk/80">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[12px] uppercase tracking-[0.1em]">
                    <span className="text-dust">{weeklyCount(item.id)} sessions / week</span>
                    <a href={`./timetable.html?type=${item.id}`} className="text-chalk">
                      Times <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
