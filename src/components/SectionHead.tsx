type Props = {
  index: string
  label: string
  count?: string
}

export function SectionHead({ index, label, count }: Props) {
  return (
    <div>
      <div className="h-px bg-slab" />
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-signal">{index}</span>
          <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-chalk/70">{label}</span>
        </div>
        {count ? (
          <span className="text-right font-mono text-[13px] uppercase tracking-[0.1em] text-dust">{count}</span>
        ) : null}
      </div>
    </div>
  )
}
