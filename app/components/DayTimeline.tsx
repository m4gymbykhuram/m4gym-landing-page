'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface DayEvent {
  time: string
  who: string
  title: string
  text: string
  artifact: ReactNode
}

const DAY_START = 5
const DAY_END = 23

function dayProgress(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return Math.min(1, Math.max(0, (hours + minutes / 60 - DAY_START) / (DAY_END - DAY_START)))
}

/**
 * A gym's day, scrolled. On wide screens a clock holds still on the left and
 * moves to the time of whichever moment is in the middle of the screen.
 */
export function DayTimeline({ events }: { events: DayEvent[] }) {
  const [active, setActive] = useState(0)
  const refs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const element of refs.current) if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const current = events[active]

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-sm font-medium text-[var(--text-muted)]">Local time at the gym</p>
          <p key={current.time} className="headline rise mt-2 text-[8.5rem] tabular-nums leading-[0.85]" aria-live="polite">
            {current.time}
          </p>
          <div className="mt-8">
            <div className="relative h-1.5 rounded-full bg-[var(--surface-strong)]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--lime-deep)] transition-[width] duration-700 ease-[var(--ease-out)]"
                style={{ width: `${dayProgress(current.time) * 100}%` }}
              />
              {events.map((event, index) => (
                <span
                  key={event.time}
                  className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--ground)] transition-colors duration-300 ${
                    index <= active ? 'bg-[var(--ink)] dark:bg-[var(--lime)]' : 'bg-[var(--border-hover)]'
                  }`}
                  style={{ left: `${dayProgress(event.time) * 100}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs tabular-nums text-[var(--text-faint)]">
              <span>05:00</span>
              <span>23:00</span>
            </div>
          </div>
          <p className="mt-8 text-sm font-medium tabular-nums text-[var(--text-muted)]">
            {String(active + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')} · {current.who}
          </p>
        </div>
      </div>

      <ol className="border-b border-[var(--rule)]">
        {events.map((event, index) => (
          <li
            key={event.time}
            ref={(element) => {
              refs.current[index] = element
            }}
            data-index={index}
            className={`border-t border-[var(--rule)] py-10 transition-opacity duration-500 lg:flex lg:min-h-[min(62vh,40rem)] lg:flex-col lg:justify-center lg:py-16 ${
              index === active ? 'lg:opacity-100' : 'lg:opacity-35'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="headline text-4xl tabular-nums lg:hidden">{event.time}</span>
              <span className="badge badge-neutral">{event.who}</span>
            </div>
            <h3 className="headline mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)]">{event.title}</h3>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">{event.text}</p>
            <div className="mt-8 max-w-md">{event.artifact}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
