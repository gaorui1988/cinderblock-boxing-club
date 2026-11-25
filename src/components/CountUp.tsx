import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useCountUp } from '../lib/useCountUp.ts'

type Props = {
  value: number
  pad?: number
  suffix?: string
  className?: string
}

export function CountUp({ value, pad, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const current = useCountUp(value, inView)
  const rounded = Math.round(current)
  const digits = pad ? String(rounded).padStart(pad, '0') : rounded.toLocaleString('en-US')
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {digits}
      {suffix}
    </span>
  )
}
