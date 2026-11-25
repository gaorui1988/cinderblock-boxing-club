import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const EASE = [0.7, 0, 0.2, 1] as const

type Line = { text: string; accent?: boolean }

type Props = {
  lines: Line[]
  as?: 'h1' | 'h2'
  className?: string
  immediate?: boolean
  baseDelay?: number
}

export function Mask({ lines, as = 'h2', className = '', immediate = false, baseDelay = 0 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const show = immediate || Boolean(reduce) || inView
  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={`${line.text}-${index}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block leading-[0.86] ${line.accent ? 'text-signal' : ''}`}
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: show ? '0%' : '110%' }}
            transition={{
              duration: reduce ? 0 : 0.7,
              ease: EASE,
              delay: show ? baseDelay + index * 0.08 : 0,
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
