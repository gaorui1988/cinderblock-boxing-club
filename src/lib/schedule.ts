import {
  classTypes,
  coaches,
  sessions,
  type ClassType,
  type Coach,
  type DayKey,
  type Session,
} from '../content.ts'

export const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export const DAY_SHORT: Record<DayKey, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

export const DAY_FULL: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

export const DAY_LETTER: Record<DayKey, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

const classMap = new Map(classTypes.map((item) => [item.id, item]))
const coachMap = new Map(coaches.map((item) => [item.id, item]))
const sessionMap = new Map(sessions.map((item) => [item.id, item]))

export function classById(id: string): ClassType {
  const found = classMap.get(id)
  if (!found) throw new Error(`Unknown class ${id}`)
  return found
}

export function coachById(id: string): Coach {
  const found = coachMap.get(id)
  if (!found) throw new Error(`Unknown coach ${id}`)
  return found
}

export function sessionById(id: string): Session | undefined {
  return sessionMap.get(id)
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function todayKey(now = new Date()): DayKey {
  const index = now.getDay()
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[index]
}

export function durationOf(session: Session): number {
  return session.durationMin ?? classById(session.classId).duration
}

export function endTime(session: Session): string {
  return fromMinutes(toMinutes(session.time) + durationOf(session))
}

export function sessionName(session: Session): string {
  return session.name ?? classById(session.classId).name
}

export function sessionsFor(day: DayKey): Session[] {
  return sessions
    .filter((session) => session.day === day)
    .sort((a, b) => toMinutes(a.time) - toMinutes(b.time))
}

export function startTimes(): string[] {
  return Array.from(new Set(sessions.map((session) => session.time))).sort(
    (a, b) => toMinutes(a) - toMinutes(b),
  )
}

export function spotsLeft(session: Session): number {
  return Math.max(0, session.capacity - session.booked)
}

export type SpotTone = 'ok' | 'last' | 'full'

export function spotTone(session: Session): SpotTone {
  const left = spotsLeft(session)
  if (left <= 0) return 'full'
  if (left <= 2) return 'last'
  return 'ok'
}

export function spotsLabel(session: Session, variant: 'short' | 'grid' = 'short'): string {
  const left = spotsLeft(session)
  if (left <= 0) return variant === 'grid' ? 'Full · waitlist' : 'Full'
  if (left <= 2) return `Last ${left} spot${left === 1 ? '' : 's'}`
  return `${left} spots`
}

export function hasEnded(session: Session, now: Date): boolean {
  if (session.day !== todayKey(now)) return false
  const nowMin = now.getHours() * 60 + now.getMinutes()
  return toMinutes(endTime(session)) <= nowMin
}

export function isEarlierToday(session: Session, now: Date): boolean {
  if (session.day !== todayKey(now)) return false
  const nowMin = now.getHours() * 60 + now.getMinutes()
  return toMinutes(session.time) < nowMin
}

export function weeklyCount(classId: string): number {
  return sessions.filter((session) => session.classId === classId).length
}

export function classesForCoach(coachId: string): string[] {
  const ids = new Set(sessions.filter((session) => session.coachId === coachId).map((session) => session.classId))
  return classTypes.filter((item) => ids.has(item.id)).map((item) => item.name)
}

export function coachYears(): number {
  return coaches.reduce((sum, coach) => sum + coach.years, 0)
}

export function firstName(name: string): string {
  return name.split(' ')[0] ?? name
}

export function rangeLabel(session: Session): string {
  return `${session.time}–${endTime(session)}`
}

export function levelSlug(level: string): string {
  return level.toLowerCase().replace(/\s+/g, '-')
}

export function levelFromSlug(slug: string | null): string | null {
  if (!slug) return null
  const match = classTypes.find((item) => levelSlug(item.level) === slug)
  return match ? match.level : null
}

export function sessionMatches(session: Session, types: string[], level: string | null): boolean {
  const typeOk = types.length === 0 || types.includes(session.classId)
  const levelOk = !level || classById(session.classId).level === level
  return typeOk && levelOk
}

export function upcomingBadge(now: Date): string | null {
  const today = todayKey(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const start = DAY_ORDER.indexOf(today)

  const format = (session: Session, when: string) => {
    const left = spotsLeft(session)
    return `${when} ${session.time} · ${sessionName(session)} · ${left} spot${left === 1 ? '' : 's'}`
  }

  const todayOpen = sessionsFor(today).filter(
    (session) => toMinutes(session.time) > nowMin && spotsLeft(session) > 0,
  )
  if (todayOpen[0]) {
    const when = toMinutes(todayOpen[0].time) >= 17 * 60 ? 'Tonight' : 'Today'
    return format(todayOpen[0], when)
  }

  for (let step = 1; step <= 7; step += 1) {
    const day = DAY_ORDER[(start + step) % 7]
    const next = sessionsFor(day).find((session) => spotsLeft(session) > 0)
    if (next) {
      const when = step === 1 ? 'Tomorrow' : DAY_SHORT[day]
      return format(next, when)
    }
  }
  return null
}

export function isBookable(session: Session, now: Date): boolean {
  if (spotsLeft(session) <= 0) return false
  if (session.day === todayKey(now) && toMinutes(session.time) <= now.getHours() * 60 + now.getMinutes()) {
    return false
  }
  return true
}

export function nextOpenFundamentals(now: Date, count = 2): Session[] {
  const today = todayKey(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const start = DAY_ORDER.indexOf(today)
  const found: Session[] = []
  for (let step = 0; step < 7 && found.length < count; step += 1) {
    const day = DAY_ORDER[(start + step) % 7]
    const list = sessionsFor(day).filter(
      (session) => session.classId === 'fundamentals' && spotsLeft(session) > 0,
    )
    for (const session of list) {
      if (step === 0 && toMinutes(session.time) <= nowMin) continue
      found.push(session)
      if (found.length >= count) break
    }
  }
  return found
}

export function whenLabel(session: Session): string {
  return `${DAY_SHORT[session.day]} ${session.time}`
}

export function perClassMonthly(price: number, weeklyVisits: number): string {
  return (price / (weeklyVisits * 4)).toFixed(2)
}

export function perClassPack(price: number): string {
  return (price / 10).toFixed(2)
}
