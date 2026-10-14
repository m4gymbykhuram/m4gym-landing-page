import type { Metadata } from 'next'
import Image from 'next/image'
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
  Sparkles,
  Wrench,
} from 'lucide-react'
import { formatPrice, getPricing, limitLine, periodLabel, type PublicPlan } from '@/lib/plans'
import { links, site } from '@/lib/site'
import { BrowserFrame, PhoneFrame } from '../components/Frames'
import { StoreButtons } from '../components/StoreButtons'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

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
  { icon: Bell, title: 'Announcements', text: 'Send a message to every member, or only to your coaches.' },
  { icon: MessageSquareText, title: 'Ask M4', text: 'Ask about your gym in plain words: who hasn’t visited, what’s overdue.' },
]

const FAQ = [
  {
    q: 'Do my members and coaches pay for the app?',
    a: 'No. The app is free for everyone at your gym; your plan covers it. Personal coaching is a separate, optional subscription for people training on their own.',
  },
  {
    q: 'Who uses the website and who uses the app?',
    a: 'Owners and managers run the gym from the website. Coaches and members use the app on their phones, so nobody has to learn two tools.',
  },
  {
    q: 'How do members check in?',
    a: 'They tap Check in when they arrive, or show the QR code on their membership card and staff scan it at the desk. You can require them to be at the gym to check in.',
  },
  {
    q: 'Do you take payments from my members?',
    a: 'Not yet. You record the fees members pay you, by cash or bank transfer, and M4GYM keeps track of who has paid and who is overdue.',
  },
  {
    q: 'How do I bring my existing members over?',
    a: 'Add them at the desk or invite them by email. Anyone can also find your gym’s public page and ask to join, and you approve the request.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. Free covers a small gym with no card needed. Paid plans raise the limits and add the activity log, member export and priority support.',
  },
  {
    q: 'What happens to my data if I leave?',
    a: 'It’s yours. Paid plans can export members to CSV, and you can delete your account at any time. See our Privacy Policy for exactly what we keep and why.',
  },
]

function PlanCard({ plan }: { plan: PublicPlan }) {
  const isFree = plan.price === 0 || plan.key === 'free'
  const price = formatPrice(plan.price, plan.currency)
  const lines = [
    limitLine(plan.memberLimit, 'member', 'members'),
    limitLine(plan.trainerLimit, 'coach', 'coaches'),
    limitLine(plan.classLimit, 'class', 'classes'),
    limitLine(plan.equipmentLimit, 'equipment item', 'equipment items'),
    ...(plan.features?.length
      ? plan.features
      : isFree
        ? ['Ask M4: 5 messages a month']
        : ['Activity log of every change', 'Member export', 'Priority support']),
  ]
  return (
    <article
      className={`relative flex flex-col rounded-[var(--radius-card)] border bg-[var(--surface)] p-7 ${
        plan.highlight ? 'border-[var(--emphasis)] ring-1 ring-[var(--emphasis)]' : 'border-[var(--border-subtle)]'
      }`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-[var(--lime)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
          Most gyms pick this
        </span>
      )}
      <h3 className="text-lg font-bold">{plan.name}</h3>
      {plan.description && <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.description}</p>}
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="display text-5xl">{price ?? '—'}</span>
        {!isFree && price && <span className="text-sm text-[var(--text-muted)]">/ {periodLabel(plan.billingPeriod)}</span>}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--text-secondary)]">
        {lines.map((line) => (
          <li key={line} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.25} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
      <a href={links.signUp} className={`btn mt-7 w-full ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>
        {isFree ? 'Start free' : `Start with ${plan.name}`}
      </a>
    </article>
  )
}

export default async function Home() {
  const pricing = await getPricing()
  const freePlan = pricing?.gym.find((plan) => plan.price === 0 || plan.key === 'free')
  const coachingPrice = pricing?.personal ? formatPrice(pricing.personal.price, pricing.personal.currency) : null

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="container-site pt-16 pb-10 text-center md:pt-24">
          <p className="rise mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border-solid)] bg-[var(--surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime-deep)]" aria-hidden="true" />
            For gym owners, coaches and members
          </p>
          <h1 className="rise-2 display mx-auto mt-6 max-w-5xl text-balance text-[clamp(2.75rem,7vw,5.5rem)]">
            Your whole gym, in one place.
          </h1>
          <p className="rise-3 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            Members, fees, check-ins, classes and coaching. Owners run it from the web; coaches and members have it on their phones.
          </p>
          <div className="rise-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={links.signUp} className="btn btn-primary w-full sm:w-auto">
              Start free <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
            <a href="#features" className="btn btn-outline w-full sm:w-auto">
              See what it does
            </a>
          </div>
          <p className="rise-3 mt-4 text-sm text-[var(--text-muted)]">
            {freePlan?.memberLimit ? `Free for up to ${freePlan.memberLimit} members.` : 'Free plan available.'} No card needed.
          </p>
        </div>

        <div className="rise-4 container-site relative pb-20">
          <div className="relative mx-auto max-w-5xl">
            <BrowserFrame src="/shots/web-dashboard.webp" alt="The M4GYM dashboard: today’s check-ins, active members, overdue fees and what needs attention" priority />
            <PhoneFrame
              src="/shots/app-member-home.webp"
              alt="The member app home: this week’s workouts, today’s plan and check-in"
              className="absolute -right-2 bottom-[-3.5rem] hidden w-[24%] max-w-60 sm:block md:-right-8"
              priority
            />
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-24">
        <div className="container-site">
          <h2 className="display max-w-2xl text-4xl md:text-5xl">Everyone at the gym, on the same page.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {ROLES.map((role) => (
              <div key={role.who} className="rounded-[var(--radius-card)] bg-[var(--surface-soft)] p-7">
                <p className="text-sm font-medium text-[var(--text-muted)]">{role.where}</p>
                <h3 className="mt-1 text-xl font-bold">{role.who}</h3>
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
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="container-site space-y-24 md:space-y-32">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Fees</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">Know who has paid before they walk in.</h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
                Record a fee in seconds at the desk, by cash or bank transfer. M4GYM works out who is due this week and who is overdue,
                and puts both on your dashboard every morning.
              </p>
            </div>
            <BrowserFrame src="/shots/web-payments.webp" alt="The payments page: money collected this month and every payment recorded" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex justify-center gap-5 lg:order-1">
              <PhoneFrame src="/shots/app-member-card.webp" alt="A member’s digital membership card with a QR code to scan at the desk" className="w-[46%] max-w-64" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-[var(--text-muted)]">Check-in</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">In the door in a second.</h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
                Members tap Check in when they arrive or show the card on their phone. Staff scan it at the desk. You see who’s training
                right now and when the floor is busiest.
              </p>
              <ul className="mt-6 space-y-2 text-[15px] text-[var(--text-secondary)]">
                <li className="flex gap-2.5">
                  <ScanLine className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" /> QR membership cards, no plastic to print
                </li>
                <li className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" /> Optional location check, so check-ins happen at the gym
                </li>
              </ul>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Coaching</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">Every member gets a coach and a plan.</h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
                New members are matched to a coach and start with a plan straight away. Coaches build each week’s training with Ask M4
                drafting it from the member’s goal, then adjust it. Members follow it set by set.
              </p>
            </div>
            <div className="flex justify-center gap-4 sm:gap-6">
              <PhoneFrame src="/shots/app-coach-plan-editor.webp" alt="A coach editing a member’s weekly workout plan" className="w-[44%] max-w-64" />
              <PhoneFrame src="/shots/app-member-workout.webp" alt="A member working through today’s workout set by set" className="mt-12 w-[44%] max-w-64" />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex justify-center lg:order-1">
              <PhoneFrame src="/shots/app-member-progress.webp" alt="A member’s progress: weight trend toward their goal and a training streak" className="w-[46%] max-w-64" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-[var(--text-muted)]">Progress</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">Progress people can see.</h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
                Weight toward the goal, weeks in a row of training, and milestones as they hit them. It belongs to the member, so it
                follows them if they ever change gym.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[var(--text-muted)]">Members</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">Your members, at a glance.</h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
                Add people at the desk, invite them by email, or let them ask to join from your gym’s public page. See who’s active, who
                is new, and who hasn’t been in for a while.
              </p>
            </div>
            <BrowserFrame src="/shots/web-members.webp" alt="The members table with status, join date and last visit" />
          </div>
        </div>

        <div className="container-site mt-24 md:mt-32">
          <h2 className="display max-w-2xl text-4xl md:text-5xl">And the rest of running a gym.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MORE.map((item) => (
              <div key={item.title} className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
                <item.icon className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal coaching */}
      <section id="coaching" className="container-site pb-20 md:pb-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--ink)] p-8 text-white md:p-14 lg:grid-cols-[1.2fr_0.8fr] dark:bg-[var(--surface)]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--lime)]">
              <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Personal coaching
            </p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Training without a gym?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Get the app anyway. Tell it your goal, the kit you have and the days you can train, and it builds your week, adjusts as you
              go, and answers questions with Ask M4.
            </p>
            <p className="mt-5 text-white/90">
              {coachingPrice
                ? `Try a week free, then ${coachingPrice} a ${periodLabel(pricing?.personal?.billingPeriod ?? null)}.`
                : 'Try a week free.'}{' '}
              <span className="text-white/60">Cancel any time.</span>
            </p>
            <div className="mt-8" id="app">
              <StoreButtons />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PhoneFrame src="/shots/app-member-home.webp" alt="The app’s home screen with this week’s training" className="w-[60%] max-w-64 ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="display text-4xl md:text-5xl">Start free. Upgrade when the gym grows.</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              One price for the gym. The app is free for your coaches and members.
            </p>
          </div>
          {pricing?.gym.length ? (
            <>
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pricing.gym.map((plan) => (
                  <PlanCard key={plan.key} plan={plan} />
                ))}
              </div>
              <p className="mt-6 text-sm text-[var(--text-muted)]">
                Paid plans are billed monthly through Whop. Change or cancel from Billing in your console.
              </p>
            </>
          ) : (
            <div className="mt-10 rounded-[var(--radius-card)] bg-[var(--surface-soft)] p-7">
              <p className="font-semibold">Plans and prices are shown when you sign up.</p>
              <p className="mt-1 text-[var(--text-secondary)]">Start on the free plan; no card needed.</p>
              <a href={links.signUp} className="btn btn-primary mt-5">
                Start free
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display text-4xl md:text-5xl">Questions, answered.</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Something else? Email{' '}
              <a href={`mailto:${site.supportEmail}`} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
                {site.supportEmail}
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-raised)] text-xl leading-none transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="container-site pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--lime)] p-10 text-[var(--ink)] md:p-16">
          <Image src="/m4gym-mark.svg" alt="" width={220} height={220} className="pointer-events-none absolute -right-8 -bottom-10 w-56 opacity-10" aria-hidden="true" />
          <h2 className="display max-w-2xl text-4xl md:text-6xl">Set up your gym this afternoon.</h2>
          <p className="mt-4 max-w-xl text-lg text-[var(--ink)]/75">
            Add your logo, your first members and your coaches. Everyone else gets the app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.signUp} className="btn bg-[var(--ink)] text-[var(--lime)] hover:bg-[#26281b]">
              Start free <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
            <a href={links.signIn} className="btn border border-[var(--ink)]/20 text-[var(--ink)] hover:border-[var(--ink)]/40">
              Sign in
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
