import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell, CalendarCheck, MessageSquareText, Sparkles, TrendingUp, Dumbbell } from 'lucide-react'
import { faqGroup, faqJsonLd } from '@/lib/faq'
import { formatPrice, getPricing, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { FaqList, JsonLd, SectionTitle } from '../../components/Blocks'
import { PhoneFrame } from '../../components/Frames'
import { StoreButtons } from '../../components/StoreButtons'

export const metadata: Metadata = {
  title: 'Personal coaching',
  description:
    'Training without a gym? M4GYM builds your week from your goal, your kit and your days, adjusts as you go, and answers questions with Ask M4.',
  alternates: { canonical: '/personal-coaching' },
}

const STEPS = [
  { title: 'Tell it about you', text: 'Your goal, your height and weight, the kit you have, the days you can train, and any injuries to work around.' },
  { title: 'Get your week', text: 'A plan for each training day, with sets, reps and rest, built for what you told it.' },
  { title: 'Train, and it adapts', text: 'Follow each workout set by set. Next week’s plan builds on what you actually did.' },
]

const INCLUDED = [
  { icon: CalendarCheck, title: 'A weekly plan', text: 'Built around your days and equipment, from a pair of dumbbells to a full home gym.' },
  { icon: Dumbbell, title: 'Workouts set by set', text: 'What to lift, how many times, and how long to rest, with timers for timed work.' },
  { icon: MessageSquareText, title: 'Ask M4', text: 'Ask why an exercise is in your plan, what to swap it for, or how to fit training round a busy week.' },
  { icon: TrendingUp, title: 'Progress', text: 'Your weight toward your goal, weeks in a row of training, and achievements as you hit them.' },
  { icon: Bell, title: 'Reminders', text: 'A nudge on the morning of a planned workout. Turn it off any time in Settings.' },
  { icon: Sparkles, title: 'Yours to keep', text: 'Join a gym later and your progress and achievements come with you.' },
]

export default async function PersonalCoachingPage() {
  const pricing = await getPricing()
  const personal = pricing?.personal
  const price = personal ? formatPrice(personal.price, personal.currency) : null
  const questions = faqGroup('coaching')

  return (
    <>
      <JsonLd data={faqJsonLd(questions)} />
      <section className="overflow-hidden">
        <div className="container-site grid items-center gap-12 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border border-[var(--border-solid)] bg-[var(--surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-secondary)]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> Personal coaching
            </p>
            <h1 className="rise-2 display mt-6 max-w-3xl text-balance text-[clamp(2.5rem,6.5vw,5rem)]">A coach in your pocket, no gym needed.</h1>
            <p className="rise-3 mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
              Tell M4GYM your goal, the kit you have and the days you can train. It builds your week, adjusts as you go, and answers your
              questions.
            </p>
            <p className="rise-3 mt-6 text-lg font-semibold">
              {price ? `Try a week free, then ${price} a ${periodLabel(personal?.billingPeriod ?? null)}.` : 'Try a week free.'}{' '}
              <span className="font-normal text-[var(--text-muted)]">Cancel any time.</span>
            </p>
            <div className="rise-4 mt-8">
              <StoreButtons />
            </div>
          </div>
          <div className="rise-4 flex justify-center">
            <PhoneFrame src="/shots/app-member-home.webp" alt="The app’s home screen with this week’s training" className="w-[62%] max-w-72" priority />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-24">
        <div className="container-site">
          <SectionTitle eyebrow="How it works" title="Three steps to your first week." />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-[var(--radius-card)] bg-[var(--surface-soft)] p-7">
                <span className="display flex h-11 w-11 items-center justify-center rounded-full bg-[var(--lime)] text-xl text-[var(--ink)]">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex justify-center gap-4">
            <PhoneFrame src="/shots/app-member-workout.webp" alt="A workout, set by set" className="w-[46%] max-w-60" />
            <PhoneFrame src="/shots/app-member-progress.webp" alt="Progress toward a goal weight and a training streak" className="mt-12 w-[46%] max-w-60" />
          </div>
          <div>
            <SectionTitle title="What you get." />
            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <div key={item.title}>
                  <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <div className="grid gap-8 rounded-[var(--radius-sheet)] bg-[var(--ink)] p-8 text-white md:grid-cols-2 md:p-14 dark:bg-[var(--surface)]">
          <div>
            <h2 className="display text-4xl md:text-5xl">Start with a free week.</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/75">
              The trial includes a week of training and a few Ask M4 messages. After that it’s a subscription through Whop, and you
              can cancel any time.
            </p>
            <div className="mt-8">
              <StoreButtons />
            </div>
          </div>
          <div className="flex flex-col justify-end md:items-end md:text-right">
            <p className="display text-6xl text-[var(--lime)]">{price ?? 'Free'}</p>
            <p className="mt-2 text-white/60">{price ? `a ${periodLabel(personal?.billingPeriod ?? null)} after your free week` : 'for your first week'}</p>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 pb-20 md:pb-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="display text-4xl md:text-5xl">Questions.</h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Training at a gym already?{' '}
            <Link href={links.features} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              See what your gym gets
            </Link>
            .
          </p>
        </div>
        <FaqList items={questions} />
      </section>
    </>
  )
}
