import type { ReactNode } from 'react'

type Props = {
  href?: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  display?: string
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const look =
  'items-center justify-center gap-2 font-sans font-bold uppercase tracking-[0.08em] transition-[transform,background-color,color,box-shadow] duration-150'

const sizes = {
  md: 'h-[54px] px-[26px] text-[14px]',
  sm: 'h-10 px-3 text-[12px] tracking-[0.06em]',
}

const variants = {
  primary:
    'bg-signal text-ink hover:bg-signal-deep hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#EDEAE3] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:pointer-events-none disabled:opacity-80',
  secondary: 'border-[1.5px] border-chalk text-chalk hover:bg-chalk hover:text-ink',
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  display = 'inline-flex',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
}: Props) {
  const cls = `${display} ${look} ${sizes[size]} ${variants[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
