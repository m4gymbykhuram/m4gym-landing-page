import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { POSTS } from '@/lib/blog'
import { formatPrice, getPricing, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { CtaBand, SectionTitle } from '../components/Blocks'
import { PostCard } from '../components/BlogParts'
import { BrowserFrame, PhoneFrame } from '../components/Frames'
import { isFreePlan } from '../components/PlanCard'
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

const HIGHLIGHTS = [
  {
    id: 'fees',
    eyebrow: 'Fees',
    title: 'Know who has paid before they walk in.',
    image: '/shots/web-payments.webp',
    alt: 'The payments page with money collected this month',
    kind: 'web' as const,
  },
  {
    id: 'check-in',
    eyebrow: 'Check-in',
    title: 'In the door in a second.',
    image: '/shots/app-member-card.webp',
    alt: 'A digital membership card with a QR code',
    kind: 'phone' as const,
  },
  {
    id: 'coaching',
    eyebrow: 'Coaching',
    title: 'Every member gets a coach and a plan.',
    image: '/shots/app-coach-plan-editor.webp',
    alt: 'A coach editing a weekly plan',
    kind: 'phone' as const,
  },
]

export default async function Home() {
  const pricing = await getPricing()
  const freePlan = pricing?.gym.find(isFreePlan)
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
          <h1 className="rise-2 display mx-auto mt-6 max-w-5xl text-balance text-[clamp(2.75rem,7vw,5.5rem)]">Your whole gym, in one place.</h1>
          <p className="rise-3 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            Members, fees, check-ins, classes and coaching. Owners run it from the web; coaches and members have it on their phones.
          </p>
          <div className="rise-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={links.signUp} className="btn btn-primary w-full sm:w-auto">
              Start free <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
            <Link href={links.features} className="btn btn-outline w-full sm:w-auto">
              See what it does
            </Link>
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
          <SectionTitle title="Everyone at the gym, on the same page." />
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

      {/* Highlights, each opening its part of the features page */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle title="Built for the work you do every day." />
            <Link href={links.features} className="btn btn-outline w-fit shrink-0">
              All features <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <Link
                key={item.id}
                href={`${links.features}#${item.id}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--surface)] shadow-[var(--shadow-sheet)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex-1 p-7 pb-0">
                  <p className="text-sm font-semibold text-[var(--text-muted)]">{item.eyebrow}</p>
                  <h3 className="display mt-2 text-3xl">{item.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
                <div className="relative mt-8 h-64 overflow-hidden bg-[var(--surface-soft)]">
                  {item.kind === 'web' ? (
                    <Image src={item.image} alt={item.alt} width={1920} height={1200} sizes="(min-width: 1024px) 40vw, 100vw" className="absolute top-6 left-6 w-[160%] max-w-none rounded-tl-xl border border-[var(--border-solid)]" />
                  ) : (
                    <div className="absolute top-6 left-1/2 w-44 -translate-x-1/2 rounded-t-[32px] bg-[var(--ink)] p-[6px] pb-0">
                      <Image src={item.image} alt={item.alt} width={750} height={1631} sizes="11rem" className="rounded-t-[26px]" />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personal coaching */}
      <section className="container-site pb-20 md:pb-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--ink)] p-8 text-white md:p-14 lg:grid-cols-[1.2fr_0.8fr] dark:bg-[var(--surface)]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--lime)]">
              <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Personal coaching
            </p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Training without a gym?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Get the app anyway. Tell it your goal, the kit you have and the days you can train, and it builds your week, adjusts as you go,
              and answers questions with Ask M4.
            </p>
            <p className="mt-5 text-white/90">
              {coachingPrice
                ? `Try a week free, then ${coachingPrice} a ${periodLabel(pricing?.personal?.billingPeriod ?? null)}.`
                : 'Try a week free.'}{' '}
              <span className="text-white/60">Cancel any time.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <StoreButtons />
              <Link href={links.coaching} className="inline-flex items-center gap-1 font-semibold text-[var(--lime)]">
                How it works <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PhoneFrame src="/shots/app-member-workout.webp" alt="A workout in the app, set by set" className="w-[60%] max-w-64 ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-24">
        <div className="container-site flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionTitle
            title="Start free. Upgrade when the gym grows."
            intro={`One price for the gym; the app is free for your coaches and members.${freePlan?.memberLimit ? ` Free covers up to ${freePlan.memberLimit} members.` : ''}`}
          />
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href={links.pricing} className="btn btn-primary">
              See pricing <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link href={links.faq} className="btn btn-outline">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* From the blog */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="From the blog" title="Guides for running a better gym." />
            <Link href={links.blog} className="btn btn-outline w-fit shrink-0">
              All posts <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
