import { useEffect, useState } from 'react'

export type HourRow = 'weekday' | 'fri' | 'sat' | 'sun'

export type OpenStatus = {
  text: string
  todayRow: HourRow
}

const WINDOWS: { day: number; open: number; close: number }[] = [
  { day: 1, open: 5 * 60 + 45, close: 21 * 60 + 30 },
  { day: 2, open: 5 * 60 + 45, close: 21 * 60 + 30 },
  { day: 3, open: 5 * 60 + 45, close: 21 * 60 + 30 },
  { day: 4, open: 5 * 60 + 45, close: 21 * 60 + 30 },
  { day: 5, open: 5 * 60 + 45, close: 19 * 60 + 30 },
  { day: 6, open: 8 * 60 + 30, close: 13 * 60 },
  { day: 0, open: 8 * 60 + 30, close: 11 * 60 + 30 },
]

const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatClock(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
}

export function laParts(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  let hour = Number(map.hour)
  if (hour === 24) hour = 0
  return { day: dayMap[map.weekday] ?? 0, minutes: hour * 60 + Number(map.minute) }
}

export function openStatus(date: Date): OpenStatus {
  const { day, minutes } = laParts(date)
  const row: HourRow = day === 5 ? 'fri' : day === 6 ? 'sat' : day === 0 ? 'sun' : 'weekday'
  const today = WINDOWS.find((window) => window.day === day) ?? WINDOWS[0]
  if (minutes >= today.open && minutes < today.close) {
    return { text: `Open now · until ${formatClock(today.close)}`, todayRow: row }
  }
  for (let step = 0; step < 8; step += 1) {
    const nextDay = (day + step) % 7
    const slot = WINDOWS.find((item) => item.day === nextDay) ?? WINDOWS[0]
    if (step === 0 && minutes >= slot.close) continue
    if (step === 0 && minutes < slot.open) {
      return { text: `Closed · opens ${SHORT[nextDay]} ${formatClock(slot.open)}`, todayRow: row }
    }
    if (step > 0) {
      return { text: `Closed · opens ${SHORT[nextDay]} ${formatClock(slot.open)}`, todayRow: row }
    }
  }
  return { text: 'Closed', todayRow: row }
}

export function useNow(interval = 30000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), interval)
    return () => window.clearInterval(id)
  }, [interval])
  return now
}

export function useOpenNow(): OpenStatus {
  const now = useNow()
  return openStatus(now)
}
