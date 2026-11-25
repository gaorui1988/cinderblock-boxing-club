export function Intensity({ value, labelled = true }: { value: number; labelled?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {labelled ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dust">Intensity</span>
      ) : null}
      <span className="flex gap-1" aria-label={`Intensity ${value} of 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={`h-[6px] w-[18px] ${index < value ? 'bg-signal' : 'bg-slab'}`} />
        ))}
      </span>
    </div>
  )
}
