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
    'Train on your own with a plan built around your goals, daily updates and AI guidance in the M4GYM mobile app.',
  alternates: { canonical: '/personal-coaching' },
}

const SETUP = [
  'Describe your goal and what makes training difficult',
  'Review the details picked up from your description',
  'Answer only what is missing with short questions and quick choices',
  'Get a plan based on your equipment, experience, available time and reported limitations',
  'Share a daily update so upcoming training reflects how you feel',
]

const INCLUDED = [
  ['A plan around you', 'Training and recovery built around your goal, equipment and available days.'],
  ['Today’s workout', 'Open the mobile app to see what comes next and record your workout as you go.'],
  ['A quick daily update', 'Tap through energy, sleep, soreness and workout feedback. Add a note when you need to. Rest days count too.'],
  ['Training that adapts', 'AI coaching adjusts upcoming training from your feedback while keeping your overall goal stable.'],
  ['Ask M4', 'Ask about your exercises, your schedule or what to do when training is difficult.'],
  ['Progress that stays yours', 'Your training history and personal Coaching Credits follow your account if you join or leave a gym.'],
  ['A reminder at your time', 'Choose a daily reminder hour in the app, or turn reminders off.'],
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
        eyebrow="Train on your own"
        title="Your training. A plan that fits."
        intro="Tell us what you want to achieve and what’s getting in the way. M4GYM turns that into a training plan, then checks in each day to help you keep moving."
      >
        <div className="flex flex-col gap-5">
          <p className="text-[15px] text-[var(--text-secondary)]">
            {price ? (
              <>
                Start with trial Coaching Credits. Subscriptions are <strong className="text-[var(--text-primary)]">{price} a {period}</strong>. Each subscription includes Coaching Credits. Cancel at any time.
              </>
            ) : (
              'Start with trial Coaching Credits. Subscriptions include a monthly allowance, with optional top-ups.'
            )}
          </p>
          <StoreButtons />
        </div>
      </PageHero>

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionTitle title="Explain once. Get going." intro="Start with your own words. Review your details before your plan is built." />
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
            <Notification title="How are you feeling today?" body="A few quick taps help tailor your training and recovery. Rest days count too." when="19:00" />
            <p className="text-sm text-[var(--text-muted)]">Choose the daily reminder hour that fits your routine.</p>
          </div>
        </div>
      </section>

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <SectionTitle title="Coaching Credits, clearly explained" intro="Your subscription includes a monthly allowance. Top up when you need more AI guidance." />
        <dl className="sheet mt-8 divide-y divide-[var(--border-subtle)] px-6">
          {[
            ['Your balance stays yours', 'Personal top-ups are for your own coaching. Purchased credits carry over.'],
            ['Training keeps going', 'When credits run out, AI pauses. Your existing plan, workout logs, daily updates and human coaching remain available.'],
            ['Joining a gym?', 'Owners can top up a shared balance for their members. If it runs out, the app asks before spending your personal credits unless you have enabled automatic use.'],
            ['AI or human coaching', 'Your gym chooses the coach for each member. Human coaches review and approve suggested plan changes.'],
          ].map(([title, text]) => <div key={title} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]"><dt className="font-bold">{title}</dt><dd className="text-[var(--text-secondary)]">{text}</dd></div>)}
        </dl>
      </section>

      <section className="container-site grid gap-10 border-t border-[var(--rule)] py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionTitle title="Questions" />
          <p className="mt-4 text-[var(--text-secondary)]">
            Coaching Credits cover AI chat, plan generation and adjustments. Already training at a gym that uses M4GYM?{' '}
            <Link href={links.features} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              Your gym can provide AI or human coaching
            </Link>
            .
          </p>
        </div>
        <FaqList items={questions} />
      </section>
    </>
  )
}
