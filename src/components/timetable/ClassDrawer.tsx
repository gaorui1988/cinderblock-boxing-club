import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { gym, sessions } from '../../content.ts'
import {
  classById,
  coachById,
  DAY_FULL,
  DAY_SHORT,
  durationOf,
  firstName,
  rangeLabel,
  sessionById,
  sessionName,
  spotsLeft,
} from '../../lib/schedule.ts'
import { Button } from '../Button.tsx'
import { DuoPhoto } from '../DuoPhoto.tsx'
import { Intensity } from '../Intensity.tsx'
import { Monogram } from '../Monogram.tsx'

type Props = {
  sessionId: string | null
  onClose: () => void
  onSwitch: (id: string) => void
}

export function ClassDrawer({ sessionId, onClose, onSwitch }: Props) {
  const reduce = useReducedMotion()
  const session = sessionId ? sessionById(sessionId) : undefined
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!session) {
      wasOpen.current = false
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!wasOpen.current) closeRef.current?.focus()
    wasOpen.current = true
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select'),
      ).filter((item) => item.tabIndex !== -1)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [session, onClose])

  const type = session ? classById(session.classId) : undefined
  const coach = session ? coachById(session.coachId) : undefined
  const others = session
    ? sessions.filter((item) => item.classId === session.classId && item.id !== session.id)
    : []
  const full = session ? spotsLeft(session) <= 0 : false
  const titleId = 'class-drawer-title'

  return (
    <AnimatePresence>
      {session && type && coach ? (
        <>
          <motion.button
            type="button"
            aria-label="Close class details"
            className="fixed inset-0 z-[60] bg-ink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[460px] flex-col border-l border-slab bg-ink"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={reduce ? { duration: 0.12 } : { type: 'spring', stiffness: 420, damping: 40 }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slab px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center bg-concrete font-mono text-[11px] text-chalk">{type.code}</span>
                <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-signal">
                  {DAY_FULL[session.day]} · {rangeLabel(session)}
                </p>
              </div>
              <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="text-chalk">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={session.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  <DuoPhoto src={type.image} alt={type.alt} className="aspect-video" />
                  <div className="space-y-4 px-5 py-6">
                    <h2 id={titleId} className="font-display text-[48px] uppercase leading-none text-chalk">
                      {sessionName(session)}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Chip>{type.level}</Chip>
                      <Chip>{durationOf(session)} min</Chip>
                      <Chip>Max {session.capacity}</Chip>
                    </div>
                    <Intensity value={type.intensity} />
                    <p className="text-[16px] leading-relaxed text-chalk/80">
                      {type.description} {type.detail}
                    </p>
                    <div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal">What to bring</p>
                      <p className="mt-2 text-[15px] text-chalk/80">{type.bring}</p>
                    </div>
                    <div className="flex items-center gap-3 border border-slab p-3">
                      <Monogram initials={coach.initials} size="sm" />
                      <div>
                        <p className="font-display text-[24px] uppercase leading-none text-chalk">{coach.name}</p>
                        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-signal">{coach.role}</p>
                        <p className="mt-1 text-[13px] text-dust">{coach.specialities.join(' · ')}</p>
                      </div>
                    </div>
                    <div>
                      <div className="h-1.5 bg-slab">
                        <div
                          className="h-full bg-signal"
                          style={{ width: `${(session.booked / session.capacity) * 100}%` }}
                        />
                      </div>
                      <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.1em] text-chalk/80">
                        {session.booked} of {session.capacity} booked · {spotsLeft(session)} spots left
                      </p>
                    </div>
                    {others.length > 0 ? (
                      <div>
                        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-dust">Also this week</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {others.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => onSwitch(item.id)}
                              className="border border-slab px-2 py-1 font-mono text-[12px] uppercase tracking-[0.08em] text-chalk"
                            >
                              {DAY_SHORT[item.day]} {item.time} · {firstName(coachById(item.coachId).name)}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex gap-3 border-t border-slab bg-ink p-4">
              {full ? (
                <Button href={gym.phoneHref} display="flex" className="flex-1">
                  Join waitlist at the desk
                </Button>
              ) : (
                <Button href={`./index.html?class=${session.id}#trial`} display="flex" className="flex-1">
                  Book as free trial
                </Button>
              )}
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-slab px-2 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-chalk/80">
      {children}
    </span>
  )
}
