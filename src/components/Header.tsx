import { useCallback, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gym, nav } from '../content.ts'
import { Button } from './Button.tsx'
import { MobileMenu } from './MobileMenu.tsx'

type Props = {
  page: 'home' | 'timetable'
}

export function Header({ page }: Props) {
  const [scrolled, setScrolled] = useState(page === 'timetable')
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const solid = page === 'timetable' || scrolled || open

  useEffect(() => {
    if (page === 'timetable') return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-200 md:h-[72px] ${
        solid ? 'border-b border-slab bg-ink/92 backdrop-blur-[10px]' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-3">
        <a href="./index.html" className="flex min-w-0 items-center gap-2.5 text-chalk">
          <span className="h-3.5 w-3.5 shrink-0 bg-signal" aria-hidden />
          <span className="min-w-0 truncate font-display text-[clamp(12px,3.2vw,22px)] uppercase leading-none tracking-[0.02em]">
            {gym.brand}
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = page === 'timetable' && item.label === 'Timetable'
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative font-sans text-[14px] font-semibold uppercase tracking-[0.08em] ${
                  active ? 'text-signal' : 'text-chalk'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-signal transition-transform duration-[180ms] ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            )
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button href="./index.html#trial" display="hidden lg:inline-flex">
            Free trial
          </Button>
          <Button href="./index.html#trial" size="sm" display="inline-flex lg:hidden">
            Free trial
          </Button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-slab text-chalk lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={close} />
    </header>
  )
}
