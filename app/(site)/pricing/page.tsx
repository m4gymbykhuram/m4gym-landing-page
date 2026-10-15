import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { faqGroup, faqJsonLd } from '@/lib/faq'
import { formatPrice, getPricing, limitLine, periodLabel } from '@/lib/plans'
import { links } from '@/lib/site'
import { CtaBand, FaqList, JsonLd, PageHero, SectionTitle } from '../../components/Blocks'
import { PlanCard } from '../../components/PlanCard'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'M4GYM pricing: a free plan for small gyms and monthly plans for larger ones. The app is free for your coaches and members.',
  alternates: { canonical: '/pricing' },
}

const EVERY_PLAN = [
  'The iPhone and Android app for every coach and member',
  'Membership fees, due dates and overdue lists',
  'Check-in by tap or QR membership card',
  'Workout plans, progress and achievements',
  'Classes, one-to-one sessions and coach calendars',
  'Reminders and announcements',
  'Equipment, issues and shop stock',
  'A public gym page where people can ask to join',
]

const LIMITS = [
  ['Members', 'memberLimit', 'member', 'members'],
  ['Coaches', 'trainerLimit', 'coach', 'coaches'],
  ['Classes', 'classLimit', 'class', 'classes'],
  ['Equipment', 'equipmentLimit', 'item', 'items'],
  ['Shop products', 'inventoryLimit', 'product', 'products'],
] as const

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
        title="Pricing"
        intro="One subscription per gym, billed monthly through Whop. The app is free for your coaches and members. Start on the free plan; no card needed."
      />

      <section className="container-site pb-14 md:pb-20">
        {gymPlans.length ? (
          <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${gymPlans.length > 2 ? 'lg:grid-cols-3' : ''}`}>
            {gymPlans.map((plan) => (
              <PlanCard key={plan.key} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="sheet p-8">
            <p className="text-lg font-semibold">Plans and prices are shown when you sign up.</p>
            <p className="mt-1 text-[var(--text-secondary)]">Start on the free plan; no card needed.</p>
            <a href={links.signUp} className="btn btn-primary mt-6">
              Create your gym <ArrowRight aria-hidden="true" strokeWidth={2.25} />
            </a>
          </div>
        )}
        <p className="mt-4 text-sm text-[var(--text-muted)]">Change or cancel from Billing in your console. You keep paid features until the end of the period.</p>
      </section>

      {gymPlans.length > 1 && (
        <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
          <SectionTitle title="Limits by plan" />
          <div className="sheet mt-8 overflow-x-auto px-6 py-2">
            <table className="w-full min-w-[36rem] table-fixed text-left">
              <thead>
                <tr className="border-b border-[var(--border-solid)]">
                  <th scope="col" className="w-40 py-4 pr-4 text-sm font-medium text-[var(--text-muted)]">
                    <span className="sr-only">Limit</span>
                  </th>
                  {gymPlans.map((plan) => (
                    <th key={plan.key} scope="col" className="py-4 pr-4 font-bold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LIMITS.map(([label, key, one, many]) => (
                  <tr key={key} className="border-b border-[var(--border-subtle)] last:border-0">
                    <th scope="row" className="py-4 pr-4 text-sm font-medium text-[var(--text-muted)]">
                      {label}
                    </th>
                    {gymPlans.map((plan) => (
                      <td key={plan.key} className="py-4 pr-4 font-semibold tabular-nums">
                        {plan[key] == null ? 'Unlimited' : limitLine(plan[key], one, many).split(' ')[0]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <SectionTitle title="Included in every plan" intro="Plans differ in limits and a few extras. These are in all of them, the free plan too." />
        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {EVERY_PLAN.map((line) => (
            <li key={line} className="flex items-start gap-3 leading-relaxed">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.5} aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site pb-14 md:pb-20">
        <div className="flex flex-col gap-6 rounded-[var(--radius-sheet)] bg-[var(--surface-raised)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <h2 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">Personal coaching</h2>
            <p className="mt-3 text-lg text-white/70">
              For people who train without a gym. Separate from gym plans:{' '}
              {coachingPrice ? `free for the first week, then ${coachingPrice} a ${periodLabel(personal?.billingPeriod ?? null)}.` : 'free for the first week.'}
            </p>
          </div>
          <Link href={links.coaching} className="btn btn-lime shrink-0">
            About personal coaching <ArrowRight aria-hidden="true" strokeWidth={2.25} />
          </Link>
        </div>
      </section>

      <section className="container-site grid gap-10 border-t border-[var(--rule)] py-14 md:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionTitle title="Billing questions" />
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
