import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  Boxes,
  CalendarDays,
  Check,
  ClipboardList,
  MessageSquareText,
  ScanLine,
  ShieldCheck,
  WifiOff,
  Wrench,
} from 'lucide-react'
import { links } from '@/lib/site'
import { CtaBand, PageHero, SectionTitle } from '../../components/Blocks'
import { BrowserFrame, PhoneFrame } from '../../components/Frames'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Fees, check-in, coaching plans, progress, members, classes, equipment and Ask M4: everything M4GYM does for gym owners, coaches and members.',
  alternates: { canonical: '/features' },
}

const JUMP = [
  { id: 'fees', label: 'Fees' },
  { id: 'check-in', label: 'Check-in' },
  { id: 'coaching', label: 'Coaching' },
  { id: 'progress', label: 'Progress' },
  { id: 'members', label: 'Members' },
  { id: 'more', label: 'Everything else' },
]

const ROLES = [
  {
    who: 'Owners and managers',
    where: 'On the web',
    lines: ['Members, fees and who still owes', 'Check-ins, classes and coach calendars', 'Equipment, stock and issues'],
  },
  {
    who: 'Coaches',
    where: 'In the app',
    lines: ['Their clients and each one’s progress', 'Weekly plans, drafted with Ask M4', 'Appointments and classes in one schedule'],
  },
  {
    who: 'Members',
    where: 'In the app',
    lines: ['Today’s workout, set by set', 'Check in with a tap or a card', 'Weight, streaks and what’s next'],
  },
]

const MORE = [
  { icon: CalendarDays, title: 'Classes and calendar', text: 'Schedule classes, take bookings, and see every coach’s week at once.' },
  { icon: Wrench, title: 'Equipment and repairs', text: 'Log what’s on the floor, book maintenance, and know what’s out of order.' },
  { icon: ClipboardList, title: 'Issues and feedback', text: 'Members report a broken machine from the app; you track it to fixed.' },
  { icon: Boxes, title: 'Shop and stock', text: 'Sell supplements and merch at the desk, with low-stock warnings.' },
  { icon: Bell, title: 'Announcements and reminders', text: 'Message every member or only your coaches. Reminders for workouts, classes and fees go out on their own.' },
  { icon: MessageSquareText, title: 'Ask M4', text: 'Ask about your gym in plain words: who hasn’t visited lately, whose fee is overdue.' },
]

function Feature({
  id,
  eyebrow,
  title,
  children,
  media,
  flip,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  media: ReactNode
  flip?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? 'lg:order-2' : ''}>
        <p className="text-sm font-semibold text-[var(--text-muted)]">{eyebrow}</p>
        <h2 className="display mt-2 text-4xl md:text-5xl">{title}</h2>
        <div className="mt-5 space-y-5 text-lg leading-relaxed text-[var(--text-secondary)]">{children}</div>
      </div>
      <div className={flip ? 'lg:order-1' : ''}>{media}</div>
    </section>
  )
}

function Points({ items }: { items: Array<{ icon?: typeof Check; text: string }> }) {
  return (
    <ul className="space-y-2.5 text-[15px]">
      {items.map(({ icon: Icon = Check, text }) => (
        <li key={text} className="flex gap-2.5">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-primary)]" strokeWidth={1.75} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything a gym runs on."
        intro="Owners run the gym from the web. Coaches and members have it in the app. Here is what each of them gets."
      >
        <nav aria-label="Features on this page" className="flex flex-wrap gap-2">
          {JUMP.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-[var(--border-solid)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-16 md:py-20">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {ROLES.map((role) => (
            <div key={role.who} className="rounded-[var(--radius-card)] bg-[var(--surface-soft)] p-7">
              <p className="text-sm font-medium text-[var(--text-muted)]">{role.where}</p>
              <h2 className="mt-1 text-xl font-bold">{role.who}</h2>
              <ul className="mt-5 space-y-3 text-[15px] text-[var(--text-secondary)]">
                {role.lines.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.25} aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="container-site space-y-24 py-20 md:space-y-32 md:py-28">
        <Feature
          id="fees"
          eyebrow="Fees"
          title="Know who has paid before they walk in."
          media={<BrowserFrame src="/shots/web-payments.webp" alt="The payments page: money collected this month and every payment recorded" />}
        >
          <p>
            Record a fee in seconds at the desk, by cash or bank transfer. M4GYM works out who is due this week and who is overdue, and
            puts both on your dashboard every morning.
          </p>
          <Points
            items={[
              { text: 'Members are reminded three days before a fee runs out' },
              { text: 'A summary of what’s due and overdue every Monday morning' },
              { text: 'Every payment, by member, month and method' },
            ]}
          />
        </Feature>

        <Feature
          id="check-in"
          eyebrow="Check-in"
          title="In the door in a second."
          flip
          media={
            <div className="flex justify-center">
              <PhoneFrame src="/shots/app-member-card.webp" alt="A member’s digital membership card with a QR code to scan at the desk" className="w-[52%] max-w-64" />
            </div>
          }
        >
          <p>
            Members tap Check in when they arrive or show the card on their phone, and staff scan it at the desk. You see who’s training
            right now and when the floor is busiest.
          </p>
          <Points
            items={[
              { icon: ScanLine, text: 'QR membership cards, no plastic to print' },
              { icon: ShieldCheck, text: 'Optional location check, so check-ins happen at the gym' },
              { icon: WifiOff, text: 'Works with bad signal: saved on the phone, sent when it reconnects' },
            ]}
          />
        </Feature>

        <Feature
          id="coaching"
          eyebrow="Coaching"
          title="Every member gets a coach and a plan."
          media={
            <div className="flex justify-center gap-4 sm:gap-6">
              <PhoneFrame src="/shots/app-coach-plan-editor.webp" alt="A coach editing a member’s weekly workout plan" className="w-[44%] max-w-64" />
              <PhoneFrame src="/shots/app-member-workout.webp" alt="A member working through today’s workout set by set" className="mt-12 w-[44%] max-w-64" />
            </div>
          }
        >
          <p>
            New members are matched to a coach and start with a plan straight away. Coaches build each week’s training with Ask M4 drafting
            it from the member’s goal, then adjust it. Members follow it set by set.
          </p>
          <Points
            items={[
              { text: 'Coaches see what was completed, skipped or left unfinished' },
              { text: 'Appointments and classes in one schedule' },
              { text: 'A reminder on the morning of each planned workout' },
            ]}
          />
        </Feature>

        <Feature
          id="progress"
          eyebrow="Progress"
          title="Progress people can see."
          flip
          media={
            <div className="flex justify-center">
              <PhoneFrame src="/shots/app-member-progress.webp" alt="A member’s progress: weight trend toward their goal and a training streak" className="w-[52%] max-w-64" />
            </div>
          }
        >
          <p>
            Weight toward the goal, weeks in a row of training, and milestones as they hit them. It belongs to the member, so it follows
            them if they ever change gym.
          </p>
        </Feature>

        <Feature
          id="members"
          eyebrow="Members"
          title="Your members, at a glance."
          media={<BrowserFrame src="/shots/web-members.webp" alt="The members table with status, join date and last visit" />}
        >
          <p>
            Add people at the desk, invite them by email, or let them ask to join from your gym’s public page. See who’s active, who is
            new, and who hasn’t been in for a while.
          </p>
          <Points
            items={[
              { text: 'Invitation links that open straight in the app' },
              { text: 'A friendly nudge to anyone who hasn’t trained for a week' },
              { text: 'Export members to CSV on paid plans' },
            ]}
          />
        </Feature>
      </div>

      <section id="more" className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-28">
        <div className="container-site">
          <SectionTitle title="And the rest of running a gym." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MORE.map((item) => (
              <div key={item.title} className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-6">
                <item.icon className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href={links.pricing} className="btn btn-primary">
              See pricing <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href={links.coaching} className="btn btn-outline">
              Training without a gym?
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CtaBand />
      </div>
    </>
  )
}
