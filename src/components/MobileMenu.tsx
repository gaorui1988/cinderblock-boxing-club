import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { gym, nav } from '../content.ts'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: Props) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-ink lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.12 : 0.42, ease: EASE }}
        >
          <nav className="flex h-full flex-col px-5 pb-10 pt-24" aria-label="Mobile">
            <ul className="flex flex-col gap-3">
              {nav.map((item, index) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 font-display text-[48px] uppercase leading-none text-chalk"
                    initial={reduce ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: reduce ? 0.12 : 0.42, ease: EASE, delay: reduce ? 0 : 0.05 * index }}
                  >
                    <span className="font-mono text-[13px] tracking-[0.1em] text-signal">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-1 font-mono text-[13px] uppercase tracking-[0.1em] text-dust">
              <p>{gym.street}</p>
              <p>{gym.locality}</p>
              <a href={gym.phoneHref} className="inline-block text-dust">
                {gym.phone}
              </a>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
