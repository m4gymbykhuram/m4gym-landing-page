import type { Metadata } from 'next'
import Link from 'next/link'
import { faqGroup, faqJsonLd } from '@/lib/faq'
import { formatPrice, getPricing, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { Notification } from '../../components/Artifacts'
import { FaqList, JsonLd, PageHero, SectionTitle } from '../../components/Blocks'
import { PhoneFrame } from '../../components/Frames'
import { StoreButtons } from '../../components/StoreButtons'

export const metadata: Metadata = {
  title: 'Personal coaching',
  description:
    'Training without a gym? M4GYM builds a weekly plan from your goal, your equipment and the days you can train, and adjusts it as you log workouts.',
  alternates: { canonical: '/personal-coaching' },
}

const SETUP = [
  'Your goal: build muscle, lose fat, or general fitness',
  'Your date of birth and gender',
  'Your height and weight',
  'How many days a week you can train',
  'Then Ask M4 asks about your equipment, experience and any injuries, and the plan uses your answers',
]

const INCLUDED = [
  ['A weekly plan', 'One workout for each day you said you can train, with sets, reps, weight and rest.'],
  ['Workouts set by set', 'Mark each set as you finish it. Timed exercises have a timer.'],
  ['Plans that adjust', 'Next week’s plan takes into account what you finished and what you skipped.'],
  ['Ask M4', 'Ask why an exercise is in your plan, what to swap it for, or how to fit training into a busy week.'],
  ['Progress', 'Your weight against your goal, twelve weeks of training, and achievements.'],
  ['A morning reminder', 'At 8:00 on training days. You can turn it off in Settings.'],
]

export default async function PersonalCoachingPage() {
  const pricing = await getPricing()
  const personal = pricing?.personal
  const price = personal ? formatPrice(personal.price, personal.currency) : null
  const period = periodLabel(personal?.billingPeriod ?? null)
  const questions = faqGroup('coaching')

  return (
    <>
      <JsonLd data={faqJsonLd(questions)} />
      <PageHero
        eyebrow="For people training without a gym"
        title="Personal coaching"
        intro="A weekly training plan built from your goal, your equipment and the days you can train. It changes as you log workouts, and Ask M4 answers your questions about it."
      >
        <div className="flex flex-col gap-5">
          <p className="text-[15px] text-[var(--text-secondary)]">
            {price ? (
              <>
                Free for the first week, then <strong className="text-[var(--text-primary)]">{price} a {period}</strong>. Billed through Whop; cancel at any time.
              </>
            ) : (
              'Free for the first week. Cancel at any time.'
            )}
          </p>
          <StoreButtons />
        </div>
      </PageHero>

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionTitle title="What the app asks when you start" intro="A few short questions. You can change any answer later in your profile." />
            <ol className="sheet mt-8 divide-y divide-[var(--border-subtle)] px-6">
              {SETUP.map((line, index) => (
                <li key={line} className="flex gap-4 py-4">
                  <span className="text-sm tabular-nums text-[var(--text-faint)]">{index + 1}</span>
                  <span className="font-medium">{line}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-start justify-center gap-4 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--surface-raised)] px-6 pt-10">
            <PhoneFrame src="/shots/app-member-home.webp" alt="The home screen with the week’s training and the next workout" className="w-[46%] max-w-60" />
            <PhoneFrame src="/shots/app-member-workout.webp" alt="A workout in progress, set by set" className="mt-12 w-[46%] max-w-60" />
          </div>
        </div>
      </section>

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <SectionTitle title="What’s included" />
            <dl className="sheet mt-8 divide-y divide-[var(--border-subtle)] px-6">
              {INCLUDED.map(([title, text]) => (
                <div key={title} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-bold">{title}</dt>
                  <dd className="leading-relaxed text-[var(--text-secondary)]">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4 lg:pt-20">
            <Notification title="Today’s workout is ready" body="Open the app when you’re at the gym and start it." when="08:00" />
            <p className="text-sm text-[var(--text-muted)]">The training-day reminder, as it appears on your phone.</p>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 border-t border-[var(--rule)] py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionTitle title="Questions" />
          <p className="mt-4 text-[var(--text-secondary)]">
            The free week includes a week of training and a few Ask M4 messages. Already training at a gym that uses M4GYM?{' '}
            <Link href={links.features} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              Your gym’s plan covers the app
            </Link>
            .
          </p>
        </div>
        <FaqList items={questions} />
      </section>
    </>
  )
}
