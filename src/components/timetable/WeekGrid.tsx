import { motion, useReducedMotion } from 'motion/react'
import { sessions } from '../../content.ts'
import type { DayKey } from '../../content.ts'
import {
  classById,
  coachById,
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
  startTimes,
  todayKey,
} from '../../lib/schedule.ts'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  now: Date
  types: string[]
  level: string | null
  onOpen: (id: string, element: HTMLElement) => void
}

export function WeekGrid({ now, types, level, onOpen }: Props) {
  const reduce = useReducedMotion()
  const today = todayKey(now)
  const times = startTimes()
  let reveal = 0

  return (
    <div className="wrap hidden py-8 lg:block">
      <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] gap-1.5">
        <div />
        {DAY_ORDER.map((day) => {
          const count = sessionsFor(day).length
          const isToday = day === today
          return (
            <div key={day} className={`px-1 pb-2 ${isToday ? 'border-b-[3px] border-signal text-signal' : 'text-chalk'}`}>
              <p className="font-display text-[28px] uppercase leading-none">{DAY_LETTER[day]}</p>
              {isToday ? <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em]">Today</p> : null}
              <p className={`font-mono text-[11px] uppercase tracking-[0.1em] ${isToday ? 'text-signal/80' : 'text-dust'}`}>
                {count} {count === 1 ? 'class' : 'classes'}
              </p>
            </div>
          )
        })}
        {times.map((time) => (
          <TimeRow
            key={time}
            time={time}
            now={now}
            today={today}
            types={types}
            level={level}
            reduce={Boolean(reduce)}
            revealStart={(() => {
              const start = reveal
              reveal += 7
              return start
            })()}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  )
}

function TimeRow({
  time,
  now,
  today,
  types,
  level,
  reduce,
  revealStart,
  onOpen,
}: {
  time: string
  now: Date
  today: DayKey
  types: string[]
  level: string | null
  reduce: boolean
  revealStart: number
  onOpen: (id: string, element: HTMLElement) => void
}) {
  return (
    <>
      <div className="flex items-start pt-3 font-mono text-[13px] uppercase tracking-[0.08em] text-dust">{time}</div>
      {DAY_ORDER.map((day, dayIndex) => {
        const session = sessions.find((item) => item.day === day && item.time === time)
        const index = revealStart + dayIndex
        if (!session) {
          return (
            <div key={day} className={`min-h-[112px] border border-dashed border-slab ${day === today ? 'bg-coal/40' : ''}`} />
          )
        }
        const match = sessionMatches(session, types, level)
        const type = classById(session.classId)
        const coach = coachById(session.coachId)
        const done = isEarlierToday(session, now)
        const tone = spotTone(session)
        const full = tone === 'full'
        return (
          <motion.button
            key={session.id}
            type="button"
            tabIndex={match ? 0 : -1}
            aria-hidden={match ? undefined : true}
            onClick={(event) => onOpen(session.id, event.currentTarget)}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: match ? 1 : 0.18, y: 0 }}
            transition={{
              y: { duration: 0.35, delay: reduce ? 0 : index * 0.012, ease: EASE },
              opacity: { duration: 0.2 },
            }}
            className={`flex min-h-[112px] flex-col border border-slab p-3 text-left transition-[transform,border-color] duration-150 ${
              full ? 'bg-coal text-dust' : 'bg-concrete text-chalk'
            } ${type.level === 'Beginner' ? 'border-l-[3px] border-l-signal' : ''} ${
              match ? 'hover:-translate-y-0.5 hover:border-signal focus-visible:-translate-y-0.5' : 'pointer-events-none'
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="bg-ink px-1.5 py-0.5 font-mono text-[11px] text-chalk">{type.code}</span>
            </span>
            <span className="mt-2 font-sans text-[15px] font-bold uppercase leading-tight">{sessionName(session)}</span>
            <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-dust">{rangeLabel(session)}</span>
            <span className="mt-1 text-[13px] text-dust">{firstName(coach.name)}</span>
            <span
              className={`mt-auto pt-2 font-mono text-[12px] uppercase tracking-[0.08em] ${
                done ? 'text-dust' : tone === 'last' ? 'text-signal' : tone === 'full' ? 'text-dust' : 'text-chalk/70'
              }`}
            >
              {done ? 'Done' : spotsLabel(session, 'grid')}
            </span>
          </motion.button>
        )
      })}
    </>
  )
}
