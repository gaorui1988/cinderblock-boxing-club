import { useCallback, useRef, useState } from 'react'
import type { DayKey } from '../content.ts'
import { Footer } from '../components/Footer.tsx'
import { Header } from '../components/Header.tsx'
import { ClassDrawer } from '../components/timetable/ClassDrawer.tsx'
import { DayList } from '../components/timetable/DayList.tsx'
import { FilterBar } from '../components/timetable/FilterBar.tsx'
import { Masthead } from '../components/timetable/Masthead.tsx'
import { Rules } from '../components/timetable/Rules.tsx'
import { WeekGrid } from '../components/timetable/WeekGrid.tsx'
import { classTypes, sessions } from '../content.ts'
import {
  DAY_ORDER,
  levelFromSlug,
  sessionMatches,
  todayKey,
} from '../lib/schedule.ts'
import { useNow } from '../lib/useOpenNow.ts'
import { useQueryState } from '../lib/useQueryState.ts'

export function Timetable() {
  const now = useNow()
  const { params, replace } = useQueryState()
  const opener = useRef<HTMLElement | null>(null)
  const [day, setDay] = useState<DayKey>(() => todayKey())
  const [direction, setDirection] = useState(1)

  const known = new Set(classTypes.map((item) => item.id))
  const types = (params.get('type') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => known.has(item))
  const level = levelFromSlug(params.get('level'))
  const classParam = params.get('class')
  const openId = classParam && sessions.some((session) => session.id === classParam) ? classParam : null
  const showing = sessions.filter((session) => sessionMatches(session, types, level)).length

  const writeTypes = (next: string[]) => {
    replace((query) => {
      if (next.length) query.set('type', next.join(','))
      else query.delete('type')
    })
  }

  const onToggleType = (id: string) => {
    if (types.includes(id)) writeTypes(types.filter((item) => item !== id))
    else writeTypes([...types, id])
  }

  const onLevel = (slug: string | null) => {
    replace((query) => {
      if (slug) query.set('level', slug)
      else query.delete('level')
    })
  }

  const onClear = () => {
    replace((query) => {
      query.delete('type')
      query.delete('level')
    })
  }

  const onOpen = (id: string, element: HTMLElement) => {
    opener.current = element
    replace((query) => query.set('class', id))
  }

  const onClose = useCallback(() => {
    replace((query) => query.delete('class'))
    window.requestAnimationFrame(() => opener.current?.focus())
  }, [replace])

  const onDay = (next: DayKey) => {
    setDirection(DAY_ORDER.indexOf(next) >= DAY_ORDER.indexOf(day) ? 1 : -1)
    setDay(next)
  }

  return (
    <>
      <Header page="timetable" />
      <main className="pt-16 md:pt-[72px]">
        <Masthead />
        <div className="sticky top-16 z-30 md:top-[72px]">
          <FilterBar
            types={types}
            level={level}
            showing={showing}
            total={sessions.length}
            onToggleType={onToggleType}
            onSelectAll={() => writeTypes([])}
            onLevel={onLevel}
            onClear={onClear}
          />
          <DayList
            part="tabs"
            now={now}
            day={day}
            direction={direction}
            types={types}
            level={level}
            onDay={onDay}
            onOpen={onOpen}
            onClear={onClear}
          />
        </div>
        <WeekGrid now={now} types={types} level={level} onOpen={onOpen} />
        <DayList
          part="panel"
          now={now}
          day={day}
          direction={direction}
          types={types}
          level={level}
          onDay={onDay}
          onOpen={onOpen}
          onClear={onClear}
        />
        <Rules />
      </main>
      <Footer />
      <ClassDrawer sessionId={openId} onClose={onClose} onSwitch={(id) => onOpen(id, opener.current ?? document.body)} />
    </>
  )
}
