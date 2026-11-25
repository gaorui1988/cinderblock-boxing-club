import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { classTypes, levels } from '../../content.ts'
import { levelSlug } from '../../lib/schedule.ts'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  types: string[]
  level: string | null
  showing: number
  total: number
  onToggleType: (id: string) => void
  onSelectAll: () => void
  onLevel: (slug: string | null) => void
  onClear: () => void
}

export function FilterBar({ types, level, showing, total, onToggleType, onSelectAll, onLevel, onClear }: Props) {
  const reduce = useReducedMotion()
  const active = types.length > 0 || Boolean(level)
  return (
    <div className="border-b border-slab bg-ink/95 py-4 backdrop-blur-[8px]">
      <div className="wrap flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3">
        <Group label="Class">
          <Chip pressed={types.length === 0} onClick={onSelectAll}>
            All
          </Chip>
          {classTypes.map((item) => (
            <Chip key={item.id} pressed={types.includes(item.id)} onClick={() => onToggleType(item.id)}>
              {item.name}
            </Chip>
          ))}
        </Group>
        <Group label="Level">
          {levels.map((item) => (
            <Chip
              key={item.id}
              pressed={item.id === 'any' ? !level : levelSlug(level ?? '') === item.id}
              onClick={() => onLevel(item.id === 'any' ? null : item.id)}
            >
              {item.label}
            </Chip>
          ))}
        </Group>
        <div className="flex items-center gap-4 md:ml-auto">
          <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-chalk" aria-live="polite">
            Showing{' '}
            <span className="inline-block overflow-hidden align-bottom">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={showing}
                  className="inline-block"
                  initial={reduce ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  {showing}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            of {total}
          </p>
          {active ? (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk"
            >
              <X size={14} strokeWidth={2} />
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-dust">{label}</span>
      <div className="chip-scroll flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">{children}</div>
    </div>
  )
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-9 shrink-0 border px-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] transition-[background-color,color,transform] duration-150 active:scale-95 ${
        pressed ? 'border-signal bg-signal text-ink' : 'border-slab text-chalk/75'
      }`}
    >
      {children}
    </button>
  )
}
