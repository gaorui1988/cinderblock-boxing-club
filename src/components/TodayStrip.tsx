import { DAY_FULL, classById, coachById, firstName, hasEnded, sessionsFor, spotTone, spotsLabel, todayKey } from '../lib/schedule.ts'
import { useNow } from '../lib/useOpenNow.ts'
import { Reveal } from './Reveal.tsx'

export function TodayStrip() {
  const now = useNow()
  const day = todayKey(now)
  const list = sessionsFor(day)

  return (
    <section className="border-y border-slab bg-concrete py-10" aria-label="Today on the floor">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-stretch">
        <div className="md:w-[280px] md:shrink-0">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-signal">Today · {DAY_FULL[day]}</p>
          <h3 className="mt-2 font-display text-[40px] uppercase leading-none text-chalk">On the floor</h3>
        </div>
        {list.length === 0 ? (
          <p className="self-center font-mono text-[13px] uppercase tracking-[0.1em] text-chalk">
            Rest day. Back tomorrow 06:00.
          </p>
        ) : (
          <div className="today-scroll flex flex-1 gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
            {list.map((session, index) => {
              const done = hasEnded(session, now)
              const tone = spotTone(session)
              const type = classById(session.classId)
              const coach = coachById(session.coachId)
              return (
                <Reveal key={session.id} delay={index * 0.05} className="snap-start">
                  <a
                    href={`./timetable.html?class=${session.id}`}
                    className={`relative block w-[200px] border border-slab bg-ink p-[18px] pl-5 transition-[transform,border-color] duration-150 hover:-translate-y-1 hover:border-signal ${
                      done ? 'opacity-40' : ''
                    }`}
                  >
                    <span className="pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 bg-[repeating-linear-gradient(to_bottom,#232320_0_4px,transparent_4px_8px)]" />
                    <p className={`font-display text-[32px] leading-none text-chalk ${tone === 'full' ? 'line-through' : ''}`}>
                      {session.time}
                    </p>
                    <p className="mt-2 font-sans text-[16px] font-semibold text-chalk">{session.name ?? type.name}</p>
                    <p className="mt-1 text-[13px] text-dust">{firstName(coach.name)}</p>
                    <p
                      className={`mt-3 font-mono text-[12px] uppercase tracking-[0.1em] ${
                        done ? 'text-dust' : tone === 'last' ? 'text-signal' : tone === 'full' ? 'text-dust' : 'text-chalk/80'
                      }`}
                    >
                      {done ? 'Done' : spotsLabel(session)}
                    </p>
                  </a>
                </Reveal>
              )
            })}
            <a
              href="./timetable.html"
              className="grid w-[200px] shrink-0 snap-start place-items-center border border-slab bg-ink p-[18px] text-center font-mono text-[13px] uppercase tracking-[0.1em] text-chalk transition-[transform,border-color] duration-150 hover:-translate-y-1 hover:border-signal"
            >
              Full week →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
