import { coaches, sections } from '../content.ts'
import { classesForCoach, coachYears } from '../lib/schedule.ts'
import { Mask } from './Mask.tsx'
import { Monogram } from './Monogram.tsx'
import { Reveal } from './Reveal.tsx'
import { SectionHead } from './SectionHead.tsx'

export function Coaches() {
  const years = coachYears()
  return (
    <section id="coaches" className="section-y bg-ink">
      <div className="wrap">
        <SectionHead
          index={sections.coaches.index}
          label={sections.coaches.label}
          count={`${coaches.length} coaches · ${years} years combined`}
        />
        <Mask
          lines={sections.coaches.lines}
          className="mt-10 font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk"
        />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach, index) => (
            <Reveal key={coach.id} delay={index * 0.07}>
              <article className="group h-full border border-slab">
                <Monogram initials={coach.initials} />
                <div className="p-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-signal">{coach.role}</p>
                  <h3 className="mt-2 font-display text-[30px] uppercase leading-none text-chalk">{coach.name}</h3>
                  <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-dust">
                    {coach.years} years coaching
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {coach.specialities.map((item) => (
                      <li
                        key={item}
                        className="border border-slab px-2 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-chalk/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[15px] leading-relaxed text-chalk/80">{coach.bio}</p>
                  <p className="mt-4 text-[14px] text-chalk/80">
                    <span className="text-dust">Teaches: </span>
                    {classesForCoach(coach.id).join(' · ')}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
