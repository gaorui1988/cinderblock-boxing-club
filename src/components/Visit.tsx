import { gym, visit } from '../content.ts'
import { useOpenNow } from '../lib/useOpenNow.ts'
import { BlockMap } from './BlockMap.tsx'

export function Visit() {
  const status = useOpenNow()
  return (
    <section className="border-t border-slab bg-coal py-[88px]" aria-label="Visit">
      <div className="wrap grid grid-cols-12 gap-6">
        <div className="col-span-12 grid gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-signal">Find us</h3>
            <p className="mt-4 font-sans text-[18px] text-chalk">{gym.street}</p>
            <p className="text-[18px] text-chalk">{gym.locality}</p>
            <p className="mt-3 text-[15px] text-chalk/80">{gym.entrance}</p>
          </div>
          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-signal">Desk hours</h3>
            <div className="mt-4 space-y-2 font-mono text-[13px] uppercase tracking-[0.08em]">
              {visit.hours.map((row) => {
                const today = row.id === status.todayRow
                return (
                  <div key={row.id} className={`grid grid-cols-[auto_1fr] gap-3 ${today ? 'text-signal' : 'text-chalk/80'}`}>
                    <span>{row.label}</span>
                    <span className="flex items-center gap-2">
                      {row.time}
                      {today ? (
                        <span className="bg-signal px-1.5 py-0.5 text-[10px] tracking-[0.12em] text-ink">Today</span>
                      ) : null}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 font-mono text-[13px] uppercase tracking-[0.1em] text-chalk">{status.text}</p>
          </div>
          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-signal">Call or write</h3>
            <p className="mt-4">
              <a href={gym.phoneHref} className="text-[18px] text-chalk">
                {gym.phone}
              </a>
            </p>
            <p className="mt-2">
              <a href={gym.emailHref} className="break-all text-[16px] text-chalk/85">
                {gym.email}
              </a>
            </p>
          </div>
        </div>
        <div className="col-span-12 aspect-[4/3] border border-slab lg:col-span-5">
          <BlockMap />
        </div>
      </div>
    </section>
  )
}
