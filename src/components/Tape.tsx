import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const EASE = [0.7, 0, 0.2, 1] as const

export function Tape({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const show = Boolean(reduce) || inView
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="tape-stripe"
        initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={show ? { clipPath: 'inset(0% 0% 0% 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      />
    </div>
  )
}
