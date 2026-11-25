import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, Check, Loader2 } from 'lucide-react'
import { gym, images, plans, sections, sessions, trial } from '../content.ts'
import {
  coachById,
  DAY_ORDER,
  DAY_SHORT,
  firstName,
  isBookable,
  nextOpenFundamentals,
  sessionById,
  sessionName,
  whenLabel,
} from '../lib/schedule.ts'
import { useNow } from '../lib/useOpenNow.ts'
import { emptyTrial, FIELD_ORDER, validateTrial, type TrialField, type TrialValues } from '../lib/validate.ts'
import { Button } from './Button.tsx'
import { DuoPhoto } from './DuoPhoto.tsx'
import { Mask } from './Mask.tsx'
import { SectionHead } from './SectionHead.tsx'
import { TrialTicket } from './TrialTicket.tsx'

const EASE = [0.7, 0, 0.2, 1] as const

export function TrialForm() {
  const now = useNow()
  const formRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<TrialValues>(() => emptyTrial())
  const [touched, setTouched] = useState<Partial<Record<TrialField, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [phase, setPhase] = useState<'edit' | 'booking' | 'done'>('edit')
  const [reference, setReference] = useState('')
  const [ticketMin, setTicketMin] = useState<number>()
  const [planId, setPlanId] = useState<string | null>(null)
  const baseId = useId()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const classId = params.get('class')
    const plan = params.get('plan')
    setPlanId(plan)
    if (classId && sessions.some((session) => session.id === classId && isBookable(session, new Date()))) {
      setValues((current) => ({ ...current, sessionId: classId }))
    }
  }, [])

  useEffect(() => {
    if (phase !== 'booking') return
    const id = window.setTimeout(() => {
      setReference(`${gym.prefix}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`)
      setPhase('done')
    }, 800)
    return () => window.clearTimeout(id)
  }, [phase])

  const errors = validateTrial(values)
  const visible = (field: TrialField) => (touched[field] || submitted ? errors[field] : undefined)
  const errorCount = FIELD_ORDER.filter((field) => errors[field]).length
  const plan = plans.find((item) => item.id === planId)
  const chosen = values.sessionId ? sessionById(values.sessionId) : undefined
  const cautious =
    values.experience === 'never' && chosen && (chosen.classId === 'sparring' || chosen.classId === 'pad-lab')
  const suggestions = nextOpenFundamentals(now)
  const suggestion =
    suggestions.length >= 2
      ? `Most first-timers start at Fundamentals. You can keep this class, but we'd suggest ${whenLabel(suggestions[0])} or ${whenLabel(suggestions[1])}.`
      : suggestions[0]
        ? `Most first-timers start at Fundamentals. You can keep this class, but we'd suggest ${whenLabel(suggestions[0])}.`
        : 'Most first-timers start at Fundamentals. You can keep this class.'

  const groups = DAY_ORDER.map((day) => ({
    day,
    items: sessions.filter((session) => session.day === day && isBookable(session, now)),
  })).filter((group) => group.items.length > 0)

  const set = <K extends TrialField>(key: K, value: TrialValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const blur = (field: TrialField) => setTouched((current) => ({ ...current, [field]: true }))

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    const next = validateTrial(values)
    const first = FIELD_ORDER.find((field) => next[field])
    if (first) {
      const node = document.getElementById(`${baseId}-${first}`)
      if (node) node.focus()
      else document.querySelector<HTMLElement>('input[name="experience"]')?.focus()
      return
    }
    if (formRef.current) setTicketMin(formRef.current.offsetHeight)
    setPhase('booking')
  }

  const reset = () => {
    setValues(emptyTrial())
    setTouched({})
    setSubmitted(false)
    setPhase('edit')
    setReference('')
  }

  const confirmed = phase === 'done' ? chosen : undefined

  return (
    <section id="trial" className="section-y bg-concrete">
      <div className="wrap grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead index={sections.trial.index} label={sections.trial.label} count={sections.trial.count} />
          <Mask
            lines={trial.lines}
            className="mt-10 font-display text-[clamp(52px,7.4vw,120px)] uppercase leading-[0.9] text-chalk"
          />
          <p className="mt-6 max-w-[48ch] text-[20px] leading-[1.5] text-chalk/85">{trial.lead}</p>
          <ul className="mt-7 space-y-3">
            {trial.checks.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] text-chalk/85">
                <Check size={16} strokeWidth={2} className="text-signal" />
                {item}
              </li>
            ))}
          </ul>
          <DuoPhoto
            src={images.benchGloves.src}
            alt={images.benchGloves.alt}
            className="mt-10 hidden aspect-square lg:block"
          />
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {confirmed ? (
            <TrialTicket
              firstName={values.firstName.trim()}
              email={values.email.trim()}
              session={confirmed}
              reference={reference}
              minHeight={ticketMin}
              onReset={reset}
            />
          ) : (
            <div ref={formRef} className="border border-slab bg-ink p-6 sm:p-10">
              <h3 className="font-display text-[32px] uppercase leading-none text-chalk">Book your trial</h3>
              <form noValidate onSubmit={onSubmit} className="mt-6">
                {submitted && errorCount > 0 ? (
                  <p role="alert" className="mb-4 text-[15px] text-signal">
                    Fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} to book your class.
                  </p>
                ) : null}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    id={`${baseId}-firstName`}
                    label="First name"
                    value={values.firstName}
                    error={visible('firstName')}
                    onBlur={() => blur('firstName')}
                    onChange={(value) => set('firstName', value)}
                    autoComplete="given-name"
                  />
                  <Field
                    id={`${baseId}-lastName`}
                    label="Last name"
                    value={values.lastName}
                    error={visible('lastName')}
                    onBlur={() => blur('lastName')}
                    onChange={(value) => set('lastName', value)}
                    autoComplete="family-name"
                  />
                </div>
                <div className="mt-4">
                  <Field
                    id={`${baseId}-email`}
                    label="Email"
                    type="email"
                    value={values.email}
                    error={visible('email')}
                    onBlur={() => blur('email')}
                    onChange={(value) => set('email', value)}
                    autoComplete="email"
                  />
                </div>
                <div className="mt-4">
                  <Field
                    id={`${baseId}-phone`}
                    label="Phone"
                    type="tel"
                    value={values.phone}
                    error={visible('phone')}
                    onBlur={() => blur('phone')}
                    onChange={(value) => set('phone', value)}
                    autoComplete="tel"
                    optional
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor={`${baseId}-sessionId`}
                    className="mb-2 block font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk/80"
                  >
                    Which class?
                  </label>
                  <select
                    id={`${baseId}-sessionId`}
                    value={values.sessionId}
                    onBlur={() => blur('sessionId')}
                    onChange={(event) => set('sessionId', event.target.value)}
                    aria-invalid={visible('sessionId') ? true : undefined}
                    aria-describedby={visible('sessionId') ? `${baseId}-sessionId-error` : undefined}
                    className={`h-[52px] w-full border bg-coal px-4 text-[16px] text-chalk ${
                      visible('sessionId') ? 'border-signal' : 'border-slab'
                    }`}
                  >
                    <option value="">Select a class</option>
                    {groups.map((group) => (
                      <optgroup key={group.day} label={DAY_SHORT[group.day]}>
                        {group.items.map((session) => (
                          <option key={session.id} value={session.id}>
                            {DAY_SHORT[session.day]} {session.time} · {sessionName(session)} ·{' '}
                            {firstName(coachById(session.coachId).name)}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <Error id={`${baseId}-sessionId-error`} message={visible('sessionId')} />
                  {cautious ? (
                    <p className="mt-3 border border-signal px-3 py-3 text-[14px] leading-relaxed text-chalk">
                      {suggestion}
                    </p>
                  ) : null}
                </div>
                <fieldset
                  id={`${baseId}-experience`}
                  tabIndex={-1}
                  className="mt-5"
                  aria-describedby={visible('experience') ? `${baseId}-experience-error` : undefined}
                >
                  <legend className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk/80">
                    Boxing experience
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {trial.experiences.map((item) => {
                      const selected = values.experience === item.id
                      return (
                        <label
                          key={item.id}
                          className={`flex min-h-[52px] cursor-pointer items-center justify-center border px-3 text-center text-[14px] font-semibold ${
                            selected ? 'border-2 border-signal text-chalk' : 'border-slab text-dust'
                          }`}
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={item.id}
                            checked={selected}
                            onChange={() => set('experience', item.id as TrialValues['experience'])}
                            onBlur={() => blur('experience')}
                            className="sr-only"
                          />
                          {item.label}
                        </label>
                      )
                    })}
                  </div>
                  <Error id={`${baseId}-experience-error`} message={visible('experience')} />
                </fieldset>
                <div className="mt-4">
                  <label
                    htmlFor={`${baseId}-notes`}
                    className="mb-2 block font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk/80"
                  >
                    Injuries or anything we should know?
                  </label>
                  <textarea
                    id={`${baseId}-notes`}
                    value={values.notes}
                    maxLength={300}
                    onChange={(event) => set('notes', event.target.value)}
                    onBlur={() => blur('notes')}
                    className="min-h-[120px] w-full resize-none border border-slab bg-coal px-4 py-3 text-[16px] text-chalk"
                  />
                  <p className="mt-1 text-right font-mono text-[12px] tracking-[0.08em] text-dust">
                    {values.notes.length} / 300
                  </p>
                </div>
                <div className="mt-4">
                  <label className="flex items-start gap-3 text-[15px] leading-snug text-chalk/85">
                    <input
                      id={`${baseId}-ageConfirm`}
                      type="checkbox"
                      checked={values.ageConfirm}
                      onChange={(event) => set('ageConfirm', event.target.checked)}
                      onBlur={() => blur('ageConfirm')}
                      aria-invalid={visible('ageConfirm') ? true : undefined}
                      aria-describedby={visible('ageConfirm') ? `${baseId}-ageConfirm-error` : undefined}
                      className="mt-1 h-4 w-4 shrink-0 appearance-none border border-slab bg-coal checked:border-signal checked:bg-signal"
                    />
                    <span>{trial.age}</span>
                  </label>
                  <Error id={`${baseId}-ageConfirm-error`} message={visible('ageConfirm')} />
                </div>
                {plan ? (
                  <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.1em] text-chalk/80">
                    Interested in: {plan.name}
                  </p>
                ) : null}
                <Button type="submit" display="flex" className="mt-5 w-full" disabled={phase === 'booking'}>
                  {phase === 'booking' ? (
                    <>
                      Booking…
                      <Loader2 size={14} strokeWidth={2} className="animate-spin" />
                    </>
                  ) : (
                    'Book my free class'
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoComplete,
  optional = false,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  type?: string
  autoComplete?: string
  optional?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-chalk/80">
        {label}
        {optional ? <span className="ml-2 text-dust">Optional</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-[52px] w-full border bg-coal px-4 text-[16px] text-chalk ${error ? 'border-signal' : 'border-slab'}`}
      />
      <Error id={`${id}-error`} message={error} />
    </div>
  )
}

function Error({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="overflow-hidden text-[13px] text-signal"
        >
          <span className="mt-2 flex items-start gap-1.5">
            <AlertTriangle size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
            {message}
          </span>
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}
