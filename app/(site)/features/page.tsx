import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { links } from '@/lib/site'
import { CtaBand, PageHero, SectionTitle } from '../../components/Blocks'
import { BrowserFrame, PhoneFrame } from '../../components/Frames'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Membership fees, check-in, training plans, progress, members, classes, equipment, shop stock and Ask M4: what M4GYM does for gym owners, coaches and members.',
  alternates: { canonical: '/features' },
}

const SECTIONS = [
  { id: 'fees', label: 'Fees' },
  { id: 'check-in', label: 'Check-in' },
  { id: 'training', label: 'Training plans' },
  { id: 'progress', label: 'Progress' },
  { id: 'members', label: 'Members' },
  { id: 'more', label: 'Also included' },
]

const MORE = [
  ['Classes and calendar', 'Weekly classes with a capacity. Members book in the app; coaches mark who came. The calendar shows every coach’s week.'],
  ['One-to-one sessions', 'Coaches book sessions with a client. Members can ask to move one, and the coach accepts or declines.'],
  ['Equipment', 'A list of every machine with its condition and next service date. Machines that are out of order are flagged on the dashboard.'],
  ['Issues', 'Members report a broken machine or a complaint from the app. Staff reply in a thread and close it when it’s fixed.'],
  ['Shop stock', 'Sell supplements and merchandise at the desk. Stock goes down with each sale and you’re warned when it’s low.'],
  ['Announcements', 'Send a message to every member, or only to your coaches.'],
  ['Ask M4', 'Ask questions about your gym in plain words, such as who hasn’t visited in two weeks or whose fee is overdue.'],
  ['Activity log', 'Every change, who made it and when. Included on paid plans.'],
]

function Feature({
  id,
  title,
  text,
  points,
  media,
}: {
  id: string
  title: string
  text: string
  points: string[]
  media: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 grid gap-10 border-t border-[var(--rule)] py-14 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div>
        <h2 className="headline text-[clamp(2rem,3.5vw,3rem)]">{title}</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">{text}</p>
        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.5} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div>{media}</div>
    </section>
  )
}

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-[24rem] items-start justify-center gap-6 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--surface-raised)] px-6 pt-10 sm:px-10">
      {children}
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        title="Features"
        intro="What M4GYM does for the people who run a gym, coach in it and train in it. Owners use the web console; coaches and members use the app."
      >
        <nav aria-label="Sections" className="flex flex-wrap gap-2">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex h-10 items-center rounded-full border border-[var(--border-solid)] bg-[var(--surface)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-hover)]"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container-site">
        <Feature
          id="fees"
          title="Membership fees"
          text="Record a payment with the member, amount, method and plan. M4GYM works out when the membership runs out and lists who is due this week and who is overdue."
          points={[
            'Cash, bank transfer or another method; M4GYM records payments, it doesn’t take them',
            'Members are reminded three days before their membership ends',
            'Owners get a summary of overdue and upcoming fees every Monday',
          ]}
          media={<BrowserFrame src="/shots/web-payments.webp" alt="The payments page: money collected this month and each payment recorded" />}
        />

        <Feature
          id="check-in"
          title="Check-in"
          text="Members tap Check in when they arrive, or show the QR code on the membership card in their app and the desk scans it. Each visit is recorded with the time and how they checked in."
          points={[
            'You can require members to be at the gym to check in from their phone',
            'With no signal, the check-in is stored and sent with its original time later',
            'Printable cards for members who don’t use the app',
          ]}
          media={
            <Stage>
              <PhoneFrame src="/shots/app-member-card.webp" alt="A member’s membership card with a QR code" className="w-[46%] max-w-60" />
              <PhoneFrame src="/shots/app-member-attendance.webp" alt="A member’s visits this month on a calendar" className="mt-12 w-[46%] max-w-60" />
            </Stage>
          }
        />

        <Feature
          id="training"
          title="Training plans"
          text="Each member is matched to a coach and gets a starter plan. Coaches write weekly plans in the app, or ask Ask M4 to draft one from the member’s goal, available days and recent workouts, then edit it."
          points={[
            'Sets, reps, weight, rest and timed exercises',
            'Members follow the workout set by set and mark each set done',
            'Coaches see which workouts were finished, skipped or left half-done',
          ]}
          media={
            <Stage>
              <PhoneFrame src="/shots/app-coach-plan-editor.webp" alt="A coach editing a weekly plan" className="w-[46%] max-w-60" />
              <PhoneFrame src="/shots/app-member-workout.webp" alt="A workout in progress, set by set" className="mt-12 w-[46%] max-w-60" />
            </Stage>
          }
        />

        <Feature
          id="progress"
          title="Progress"
          text="Members log their weight and see it against their goal, with twelve weeks of workouts and gym visits. Achievements unlock with check-ins, classes and workouts."
          points={[
            'Progress belongs to the member and follows them if they change gym',
            'Coaches see the same progress for each of their clients',
          ]}
          media={
            <Stage>
              <PhoneFrame src="/shots/app-member-progress.webp" alt="Weight against a goal and twelve weeks of training" className="w-[46%] max-w-60" />
              <PhoneFrame src="/shots/app-member-home.webp" alt="The member’s home screen" className="mt-12 w-[46%] max-w-60" />
            </Stage>
          }
        />

        <Feature
          id="members"
          title="Members"
          text="Add members at the desk with their first fee, invite them by email, or approve people who ask to join from your gym’s public page. The list shows each member’s status, coach and last visit."
          points={[
            'Invitation links open straight in the app',
            'Members who haven’t trained for a week get one reminder',
            'Export members to CSV on paid plans',
          ]}
          media={<BrowserFrame src="/shots/web-members.webp" alt="The members list with status, join date and last visit" />}
        />

        <section id="more" className="scroll-mt-20 border-t border-[var(--rule)] py-14 md:py-20">
          <SectionTitle title="Also included" />
          <dl className="sheet mt-8 grid divide-y divide-[var(--border-subtle)] px-6 md:grid-cols-2 md:gap-x-10 md:divide-y-0 md:px-8 md:py-2">
            {MORE.map(([title, text]) => (
              <div key={title} className="py-5 md:border-b md:border-[var(--border-subtle)] md:[&:nth-last-child(-n+2)]:border-0">
                <dt className="text-[17px] font-bold">{title}</dt>
                <dd className="mt-1 leading-relaxed text-[var(--text-secondary)]">{text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={links.pricing} className="btn btn-primary">
              See pricing <ArrowRight aria-hidden="true" strokeWidth={2.25} />
            </Link>
            <Link href={links.coaching} className="btn btn-outline">
              Personal coaching
            </Link>
          </div>
        </section>
      </div>

      <CtaBand />
    </>
  )
}
