'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface Role {
  id: string
  who: string
  where: string
  headline: string
  points: string[]
  shots: Array<{ src: string; alt: string; kind: 'web' | 'phone' }>
}

const ROLES: Role[] = [
  {
    id: 'owner',
    who: 'Owners',
    where: 'Web console',
    headline: 'Owners run the gym from the web console',
    points: ['Who has paid, who is due, who is late', 'Today’s check-ins and the busiest hours', 'Members, coaches, classes and calendars', 'Equipment, repairs, shop stock and issues'],
    shots: [{ src: '/shots/web-dashboard.webp', alt: 'The owner dashboard on the web', kind: 'web' }],
  },
  {
    id: 'coach',
    who: 'Coaches',
    where: 'iOS & Android',
    headline: 'Coaches manage clients from the app',
    points: ['Clients and how each one is progressing', 'Weekly plans, drafted by Ask M4, approved by you', 'Appointments and classes in one schedule', 'What was finished, skipped or left half-done'],
    shots: [
      { src: '/shots/app-coach-home.webp', alt: 'The coach home screen', kind: 'phone' },
      { src: '/shots/app-coach-plan-editor.webp', alt: 'A coach editing a weekly plan', kind: 'phone' },
    ],
  },
  {
    id: 'member',
    who: 'Members',
    where: 'iOS & Android',
    headline: 'Members train and check in with the app',
    points: ['Check in with a tap or a QR card', 'A plan from their coach for every week', 'Weight, streaks and achievements', 'Reminders that are easy to switch off'],
    shots: [
      { src: '/shots/app-member-home.webp', alt: 'The member home screen', kind: 'phone' },
      { src: '/shots/app-member-progress.webp', alt: 'A member’s progress', kind: 'phone' },
    ],
  },
]

/** One system, three views: switch between what owners, coaches and members see. */
export function RoleTabs() {
  const [activeId, setActiveId] = useState(ROLES[0].id)
  const role = ROLES.find((item) => item.id === activeId) ?? ROLES[0]

  return (
    <div>
      <div role="tablist" aria-label="Who uses M4GYM" className="inline-grid w-full grid-cols-3 gap-1 rounded-[16px] bg-[var(--surface-raised)] p-1 sm:w-auto">
        {ROLES.map((item) => {
          const selected = item.id === role.id
          return (
            <button
              key={item.id}
              id={`role-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`role-panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={`rounded-[13px] px-3 py-2.5 text-left transition-[background-color,box-shadow,color] duration-200 sm:min-w-44 sm:px-5 ${
                selected ? 'bg-[var(--surface)] shadow-[0_1px_3px_rgb(22_23_15/0.12)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="block text-[15px] font-bold sm:text-[17px]">{item.who}</span>
              <span className="block text-xs font-medium text-[var(--text-muted)]">{item.where}</span>
            </button>
          )
        })}
      </div>

      <div
        key={role.id}
        id={`role-panel-${role.id}`}
        role="tabpanel"
        aria-labelledby={`role-tab-${role.id}`}
        className="sheet rise mt-6 grid overflow-hidden lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div className="p-6 md:p-10">
          <h3 className="headline text-[clamp(1.875rem,3vw,2.75rem)]">{role.headline}</h3>
          <ul className="mt-8 space-y-1">
            {role.points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-[14px] bg-[var(--surface-soft)] px-4 py-3.5 text-[15px] font-medium">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--lime)] text-[var(--ink)]" aria-hidden="true">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex h-[24rem] items-start justify-center gap-5 overflow-hidden bg-[var(--surface-soft)] px-6 pt-8 sm:h-[32rem] sm:px-10 sm:pt-10">
          {role.shots.map((shot, index) =>
            shot.kind === 'web' ? (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={1920}
                height={1200}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="absolute top-8 left-6 w-[170%] max-w-none rounded-tl-[16px] shadow-[var(--shadow-pop)] sm:top-10 sm:left-10 sm:w-[150%]"
              />
            ) : (
              <div key={shot.src} className={`w-[44%] max-w-60 rounded-t-[36px] bg-[var(--ink)] p-[6px] pb-0 shadow-[var(--shadow-pop)] ${index ? 'mt-12' : ''}`}>
                <Image src={shot.src} alt={shot.alt} width={750} height={1631} sizes="15rem" className="rounded-t-[30px]" />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
