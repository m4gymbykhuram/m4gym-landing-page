import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { POSTS, formatPostDate } from '@/lib/blog'
import { CHANGELOG, formatReleaseDate } from '@/lib/changelog'
import { formatPrice, getPricing, limitLine, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { Notification } from '../components/Artifacts'
import { CtaBand, SectionTitle } from '../components/Blocks'
import { DayTimeline, type DayEvent } from '../components/DayTimeline'
import { BrowserFrame, PhoneFrame } from '../components/Frames'
import { isFreePlan } from '../components/PlanCard'
import { RoleTabs } from '../components/RoleTabs'
import { StoreButtons } from '../components/StoreButtons'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/** A crop of a real screenshot, shown as a card. */
function Snippet({ src, alt, phone, height = 'h-72' }: { src: string; alt: string; phone?: boolean; height?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-[var(--surface)] shadow-[var(--shadow-pop)] ${height}`}>
      <Image
        src={src}
        alt={alt}
        width={phone ? 750 : 1920}
        height={phone ? 1631 : 1200}
        sizes="28rem"
        className={phone ? 'absolute top-0 left-1/2 w-[78%] max-w-none -translate-x-1/2' : 'absolute top-0 left-0 w-[210%] max-w-none'}
      />
    </div>
  )
}

// Times and wording come from the server's reminder service.
const DAY: DayEvent[] = [
  {
    time: '06:00',
    who: 'Members',
    title: 'Members check in',
    text: 'A tap on Check in, or the QR code on their membership card scanned at the desk. You can require members to be at the gym. With no signal, the check-in is stored on the phone and sent with its original time later.',
    artifact: <Snippet src="/shots/app-member-card.webp" alt="A member’s membership card with its QR code" phone />,
  },
  {
    time: '08:00',
    who: 'Members',
    title: 'Workout reminder',
    text: 'Sent at 8:00 on days the member has a workout planned.',
    artifact: <Notification title="Today’s workout is ready" body="Open the app when you’re at the gym and start it." />,
  },
  {
    time: '09:00',
    who: 'Owners, on Mondays',
    title: 'Weekly fee summary',
    text: 'Fees that are overdue and fees due in the next seven days. Members get their own reminder three days before their membership ends, and again the day after.',
    artifact: <Notification title="Iron Yard: fees this week" body="3 overdue, 5 due in the next 7 days." />,
  },
  {
    time: '12:30',
    who: 'Coaches',
    title: 'Coaches plan next week',
    text: 'Ask M4 drafts a week from the member’s goal, available days and recent workouts. The coach edits it and saves it to the member’s app.',
    artifact: <Snippet src="/shots/app-coach-plan-editor.webp" alt="A coach editing a member’s weekly plan" phone />,
  },
  {
    time: '17:00',
    who: 'Members',
    title: 'A message after a quiet week',
    text: 'If a member hasn’t trained for seven days, the app sends one message. They don’t get another for the same gap.',
    artifact: <Notification title="It’s been a week" body="One short session gets you going again. Your plan is waiting in the app." />,
  },
  {
    time: '18:00',
    who: 'Members and coaches',
    title: 'Class reminder',
    text: 'Everyone booked into a class, and the coaches running it, hear about it an hour before it starts.',
    artifact: <Notification title="HIIT at 7:00 PM" body="Starts in about an hour." />,
  },
  {
    time: '21:30',
    who: 'Owners',
    title: 'The dashboard at the end of the day',
    text: 'Check-ins, money collected this month, people waiting to join, overdue fees and open issues.',
    artifact: <Snippet src="/shots/web-dashboard.webp" alt="The owner dashboard" />,
  },
]

export default async function Home() {
  const pricing = await getPricing()
  const gymPlans = pricing?.gym ?? []
  const freePlan = gymPlans.find(isFreePlan)
  const coachingPrice = pricing?.personal ? formatPrice(pricing.personal.price, pricing.personal.currency) : null

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="container-site pt-12 md:pt-20">
          <h1 className="rise headline max-w-[22ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">
            Gym management software, with an app for your members and coaches
          </h1>
          <p className="rise-2 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            Record membership fees and see who is overdue. Check members in with a QR card. Schedule classes and coaches. Give every
            member a weekly training plan they follow in the app.
          </p>
          <div className="rise-3 mt-8 flex flex-wrap gap-3">
            <a href={links.signUp} className="btn btn-primary">
              Create your gym <ArrowRight aria-hidden="true" strokeWidth={2.25} />
            </a>
            <Link href={links.features} className="btn btn-outline">
              See the features
            </Link>
          </div>
          <p className="rise-3 mt-4 text-sm text-[var(--text-muted)]">
            {freePlan?.memberLimit ? `Free for up to ${freePlan.memberLimit} members. ` : 'Free plan available. '}
            No card needed. The iPhone and Android app is included for your coaches and members.
          </p>

          <div className="rise-4 relative mt-14 pb-16 md:mt-16">
            <BrowserFrame src="/shots/web-dashboard.webp" alt="The M4GYM owner dashboard: check-ins today, money collected, active members and overdue fees" priority />
            <PhoneFrame
              src="/shots/app-member-home.webp"
              alt="The member app: this week’s training, the next workout and check-in"
              className="absolute -right-2 bottom-0 hidden w-[22%] max-w-60 sm:block md:-right-6"
              priority
            />
          </div>
        </div>
      </section>

      {/* Who uses what */}
      <section className="container-site py-16 md:py-24">
        <SectionTitle
          title="Who uses what"
          intro="Owners and managers work in the web console. Coaches and members use the app on their phones. Everyone works from the same records."
        />
        <div className="mt-10">
          <RoleTabs />
        </div>
      </section>

      {/* A normal day */}
      <section className="container-site pb-16 md:pb-24">
        <SectionTitle
          title="A normal day with M4GYM"
          intro="The times below are when M4GYM sends each reminder, in your gym’s time zone. Members and coaches can turn each kind off in the app’s settings."
        />
        <div className="mt-12">
          <DayTimeline events={DAY} />
        </div>
      </section>

      {/* Personal coaching */}
      <section className="container-site pb-16 md:pb-24">
        <div className="grid items-center gap-10 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--surface-raised)] px-6 pt-10 text-white md:px-12 md:pt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="pb-10 md:pb-12">
            <h2 className="headline max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)]">Personal coaching for people without a gym</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              The same app works for people who train alone. They answer a few questions about their goal, body, equipment and the days
              they can train, and get a weekly plan that adjusts as they log workouts. Ask M4 answers questions about the plan.
            </p>
            <p className="mt-5 text-[15px] text-white/80">
              {coachingPrice
                ? `Free for the first week, then ${coachingPrice} a ${periodLabel(pricing?.personal?.billingPeriod ?? null)}. Cancel at any time.`
                : 'Free for the first week. Cancel at any time.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <StoreButtons />
              <Link href={links.coaching} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--lime)] hover:underline">
                About personal coaching <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center self-end">
            <div className="w-[62%] max-w-72 rounded-t-[40px] bg-black p-[6px] pb-0 ring-1 ring-white/10">
              <Image src="/shots/app-member-workout.webp" alt="A workout in progress: back squat, four sets of eight" width={750} height={1631} sizes="18rem" className="h-[22rem] rounded-t-[34px] object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-site pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionTitle title="Pricing" intro="One subscription per gym, billed monthly. Coaches and members don’t pay for the app." />
          <div>
            {gymPlans.length > 0 && (
              <ul className="sheet divide-y divide-[var(--border-subtle)] px-2">
                {gymPlans.map((plan) => {
                  const price = formatPrice(plan.price, plan.currency)
                  return (
                    <li key={plan.key} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{plan.name}</p>
                        <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                          {limitLine(plan.memberLimit, 'member', 'members')} · {limitLine(plan.trainerLimit, 'coach', 'coaches')}
                        </p>
                      </div>
                      <p className="display text-3xl tabular-nums">
                        {price ?? '—'}
                        {!isFreePlan(plan) && price && <span className="ml-1 text-sm font-medium text-[var(--text-muted)]">/{periodLabel(plan.billingPeriod).slice(0, 2)}</span>}
                      </p>
                    </li>
                  )
                })}
              </ul>
            )}
            <Link href={links.pricing} className="btn btn-outline mt-5">
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      {/* Recently shipped and the blog */}
      <section className="container-site grid gap-10 pb-16 md:pb-24 lg:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">Recently shipped</h2>
            <Link href={links.changelog} className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              Changelog
            </Link>
          </div>
          <ul className="sheet mt-5 divide-y divide-[var(--border-subtle)] px-6">
            {CHANGELOG.slice(0, 2).flatMap((release) =>
              release.items.slice(0, 3).map((item) => (
                <li key={release.date + item.title} className="py-4">
                  <p className="text-xs font-medium text-[var(--text-muted)]">{formatReleaseDate(release.date)}</p>
                  <p className="mt-1 font-semibold leading-snug">{item.title}</p>
                </li>
              )),
            )}
          </ul>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">From the blog</h2>
            <Link href={links.blog} className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              All posts
            </Link>
          </div>
          <ul className="sheet mt-5 divide-y divide-[var(--border-subtle)] px-2">
            {POSTS.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block rounded-[16px] px-4 py-4 transition-colors hover:bg-[var(--surface-soft)]">
                  <p className="text-xs font-medium text-[var(--text-muted)]">
                    {post.category} · {formatPostDate(post.date)}
                  </p>
                  <p className="mt-1 font-semibold leading-snug">{post.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
