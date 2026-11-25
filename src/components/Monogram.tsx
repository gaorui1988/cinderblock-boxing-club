export function Monogram({ initials, size = 'tile' }: { initials: string; size?: 'tile' | 'sm' }) {
  if (size === 'sm') {
    return (
      <span className="grid h-14 w-14 shrink-0 place-items-center bg-concrete font-display text-[28px] leading-none text-chalk">
        {initials}
      </span>
    )
  }
  return (
    <div className="grain grain-lite relative aspect-square overflow-hidden bg-concrete transition-colors duration-[220ms] group-hover:bg-signal">
      <span className="relative z-[3] grid h-full place-items-center font-display text-[88px] leading-none text-chalk transition-colors duration-[220ms] group-hover:text-ink">
        {initials}
      </span>
      <span className="pointer-events-none absolute -bottom-3 -right-8 z-[3] h-2.5 w-3/5 origin-center rotate-[-45deg] bg-[repeating-linear-gradient(-45deg,#FF4F1F_0_8px,#0C0C0B_8px_16px)] transition-transform duration-[220ms] group-hover:translate-x-3 group-hover:translate-y-3" />
    </div>
  )
}
