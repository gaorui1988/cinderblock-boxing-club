import { classTypes, marquee } from '../content.ts'

const items = [...classTypes.map((item) => item.name), ...marquee.extras]

function Row({ copy }: { copy: string }) {
  return (
    <div className={copy === 'clone' ? 'marquee-clone contents' : 'contents'}>
      {items.map((item, index) => {
        const outlined = index % 2 === 1
        return (
          <span key={`${copy}-${item}`} className="flex items-center gap-10">
            <span
              className={`font-display text-[56px] uppercase leading-none ${
                outlined ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(237,234,227,0.6)]' : 'text-chalk'
              }`}
            >
              {item}
            </span>
            <span className="relative h-5 w-5 shrink-0" aria-hidden>
              <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-signal" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-signal" />
            </span>
          </span>
        )
      })}
    </div>
  )
}

export function Marquee() {
  return (
    <div className="marquee overflow-hidden bg-coal py-[22px]">
      <p className="sr-only">{items.join(', ')}</p>
      <div className="marquee-track" aria-hidden>
        <Row copy="a" />
        <Row copy="clone" />
      </div>
    </div>
  )
}
