import { type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import type { DayKey } from '../../content.ts'
import {
  classById,
  coachById,
  DAY_FULL,
  DAY_LETTER,
  DAY_ORDER,
  firstName,
  isEarlierToday,
  rangeLabel,
  sessionMatches,
  sessionName,
  sessionsFor,
  spotTone,
  spotsLabel,
} from '../../lib/schedule.ts'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  now: Date
  day: DayKey
  direction: number
  types: string[]
  level: string | null
  onDay: (day: DayKey) => void
  onOpen: (id: string, element: HTMLElement) => void
  onClear: () => void
  part: 'tabs' | 'panel'
}

export function DayList({ now, day, direction, types, level, onDay, onOpen, onClear, part }: Props) {
  const reduce = useReducedMotion()
  const rows = sessionsFor(day).filter((session) => sessionMatches(session, types, level))

  const onKey = (event: KeyboardEvent) => {
    const index = DAY_ORDER.indexOf(day)
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onDay(DAY_ORDER[(index + 1) % 7])
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onDay(DAY_ORDER[(index + 6) % 7])
    } else if (event.key === 'Home') {
      event.preventDefault()
      onDay(DAY_ORDER[0])
    } else if (event.key === 'End') {
      event.preventDefault()
      onDay(DAY_ORDER[6])
    }
  }

  if (part === 'tabs') {
    return (
      <div role="tablist" aria-label="Days" className="wrap grid grid-cols-7 border-b border-slab bg-ink lg:hidden" onKeyDown={onKey}>
        {DAY_ORDER.map((key) => {
          const count = sessionsFor(key).filter((session) => sessionMatches(session, types, level)).length
          const selected = key === day
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`day-tab-${key}`}
              aria-selected={selected}
              aria-controls={`day-panel-${key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onDay(key)}
              className={`flex h-14 flex-col items-center justify-center border-b-[3px] font-display text-[18px] uppercase leading-none ${
                selected ? 'border-signal text-signal' : 'border-transparent text-chalk/70'
              }`}
            >
              {DAY_LETTER[key]}
              <span className="mt-1 font-mono text-[10px] tracking-[0.08em]">{count}</span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="wrap pb-4 lg:hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={day}
          id={`day-panel-${day}`}
          role="tabpanel"
          aria-labelledby={`day-tab-${day}`}
          custom={direction}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -16 }}
          transition={{ duration: reduce ? 0.12 : 0.22, ease: EASE }}
        >
          {rows.length === 0 ? (
            <div className="py-10">
              <p className="text-[16px] text-chalk/80">No classes match on {DAY_FULL[day]}.</p>
              <button
                type="button"
                onClick={onClear}
                className="mt-4 border border-chalk px-4 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-chalk"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul>
              {rows.map((session) => {
                const type = classById(session.classId)
                const coach = coachById(session.coachId)
                const done = isEarlierToday(session, now)
                const tone = spotTone(session)
                return (
                  <li key={session.id} className="border-b border-slab">
                    <button
                      type="button"
                      onClick={(event) => onOpen(session.id, event.currentTarget)}
                      className="grid w-full grid-cols-[76px_1fr_18px] items-center gap-4 py-4 text-left"
                    >
                      <span>
                        <span className="block font-display text-[30px] leading-none text-chalk">{session.time}</span>
                        <span className="mt-1 block font-mono text-[12px] text-dust">{rangeLabel(session).split('–')[1]}</span>
                      </span>
                      <span>
                        <span className="block font-sans text-[16px] font-bold uppercase text-chalk">{sessionName(session)}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-dust">
                          <span className="border border-slab px-1.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-chalk/75">
                            {type.level}
                          </span>
                          <span>{firstName(coach.name)}</span>
                          <span
                            className={`font-mono text-[12px] uppercase tracking-[0.08em] ${
                              tone === 'last' && !done ? 'text-signal' : 'text-dust'
                            }`}
                          >
                            {done ? 'Done' : spotsLabel(session, 'grid')}
                          </span>
                        </span>
                      </span>
                      <ChevronRight size={18} strokeWidth={2} className="text-chalk" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
