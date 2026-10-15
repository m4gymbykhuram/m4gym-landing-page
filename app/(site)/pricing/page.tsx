import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { faqGroup, faqJsonLd } from '@/lib/faq'
import { formatPrice, getPricing, limitLine, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { CtaBand, FaqList, JsonLd, PageHero, SectionTitle } from '../../components/Blocks'
import { PlanCard } from '../../components/PlanCard'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Start free, upgrade when the gym grows. One price for the gym; the app is free for your coaches and members.',
  alternates: { canonical: '/pricing' },
}

const EVERY_PLAN = [
  'The app for every coach and member, at no extra cost',
  'Fees, due dates and overdue tracking',
  'Check-in by tap or QR membership card',
  'Workout plans, progress and achievements',
  'Classes, appointments and coach calendars',
  'Reminders and announcements',
  'Equipment, issues and shop stock',
  'Your gym’s public page and join requests',
]

export default async function PricingPage() {
  const pricing = await getPricing()
  const gymPlans = pricing?.gym ?? []
  const personal = pricing?.personal
  const coachingPrice = personal ? formatPrice(personal.price, personal.currency) : null
  const questions = faqGroup('billing')

  return (
    <>
      <JsonLd data={faqJsonLd(questions)} />
      <PageHero
        eyebrow="Pricing"
        title="Start free. Upgrade when the gym grows."
        intro="One price for the gym. The app is free for your coaches and members, and there’s no card needed to start."
        centered
      />

      <section className="container-site pb-20">
        {gymPlans.length ? (
          <>
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${gymPlans.length > 2 ? 'lg:grid-cols-3' : 'mx-auto max-w-4xl'}`}>
              {gymPlans.map((plan) => (
                <PlanCard key={plan.key} plan={plan} />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Paid plans are billed monthly through Whop. Change or cancel from Billing in your console.
            </p>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-sheet)]">
            <p className="text-lg font-semibold">Plans and prices are shown when you sign up.</p>
            <p className="mt-1 text-[var(--text-secondary)]">Start on the free plan; no card needed.</p>
            <a href={links.signUp} className="btn btn-primary mt-6">
              Start free
            </a>
          </div>
        )}
      </section>

      {gymPlans.length > 1 && (
        <section className="container-site pb-20">
          <SectionTitle title="Compare plans." />
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface)]">
            <table className="w-full min-w-[36rem] table-fixed text-left text-[15px]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th scope="col" className="w-36 p-4 font-semibold text-[var(--text-muted)]">
                    Limit
                  </th>
                  {gymPlans.map((plan) => (
                    <th key={plan.key} scope="col" className="p-4 font-bold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                {(
                  [
                    ['Members', 'memberLimit', 'member', 'members'],
                    ['Coaches', 'trainerLimit', 'coach', 'coaches'],
                    ['Classes', 'classLimit', 'class', 'classes'],
                    ['Equipment', 'equipmentLimit', 'item', 'items'],
                    ['Shop products', 'inventoryLimit', 'product', 'products'],
                  ] as const
                ).map(([label, key, one, many]) => (
                  <tr key={key}>
                    <th scope="row" className="p-4 font-semibold text-[var(--text-primary)]">
                      {label}
                    </th>
                    {gymPlans.map((plan) => (
                      <td key={plan.key} className="p-4">
                        {limitLine(plan[key], one, many)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle title="In every plan, free included." intro="Plans differ in limits and extras. The core of running a gym is in all of them." />
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {EVERY_PLAN.map((line) => (
              <li key={line} className="flex gap-2.5 text-[var(--text-secondary)]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.25} aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-20 md:py-24">
        <div className="grid items-center gap-8 rounded-[var(--radius-sheet)] bg-[var(--ink)] p-8 text-white md:grid-cols-[1.3fr_0.7fr] md:p-12 dark:bg-[var(--surface)]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--lime)]">
              <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Personal coaching
            </p>
            <h2 className="display mt-3 text-4xl">Training without a gym?</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
              The app builds your week from your goal and the kit you have, and adjusts as you go. Separate from gym plans.
            </p>
          </div>
          <div className="md:text-right">
            <p className="display text-5xl text-white">{coachingPrice ?? 'Free trial'}</p>
            {coachingPrice && <p className="mt-1 text-white/60">a {periodLabel(personal?.billingPeriod ?? null)}, after a free week</p>}
            <Link href={links.coaching} className="btn btn-lime mt-6">
              How it works <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 pb-20 md:pb-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="display text-4xl md:text-5xl">Billing questions.</h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            More in the{' '}
            <Link href={links.faq} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              FAQ
            </Link>
            .
          </p>
        </div>
        <FaqList items={questions} />
      </section>

      <CtaBand />
    </>
  )
}
