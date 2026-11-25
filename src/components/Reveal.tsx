import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const EASE = [0.7, 0, 0.2, 1] as const

type Props = {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const show = Boolean(reduce) || inView
  return (
    <div ref={ref} className={`h-full ${className}`}>
      <motion.div
        className="h-full"
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)', y: 24 }}
        animate={show ? { clipPath: 'inset(0% 0% 0% 0)', y: 0 } : { clipPath: 'inset(0 0 100% 0)', y: 24 }}
        transition={{ duration: reduce ? 0 : 0.56, ease: EASE, delay: show ? delay : 0 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
