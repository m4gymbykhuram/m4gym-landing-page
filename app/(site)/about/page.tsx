import type { Metadata } from 'next'
import Link from 'next/link'
import { links, site } from '@/lib/site'
import { CtaBand, PageHero, SectionTitle } from '../../components/Blocks'
import { BrowserFrame } from '../../components/Frames'

export const metadata: Metadata = {
  title: 'About',
  description: `M4GYM is gym management software made by ${site.company}: a web console for owners and an app for coaches and members.`,
  alternates: { canonical: '/about' },
}

const PARTS = [
  [
    'The web console',
    'For owners and managers, at app.m4gym.com. Members, fees, check-ins, classes, coaches, equipment, shop stock, issues and billing.',
  ],
  [
    'The app',
    'For coaches and members, on iPhone and Android. Workouts, the membership card, the schedule, progress, and a coach’s view of each client.',
  ],
  ['Ask M4', 'An assistant inside both. It answers questions about the gym for owners and drafts weekly plans for coaches.'],
  ['Personal coaching', 'The app on its own, for people who train without a gym, with a weekly plan that adjusts as they go.'],
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About M4GYM"
        intro={`M4GYM is gym management software made by ${site.company}. It replaces the sign-in book, the fee spreadsheet and the training plans sent over chat with one system that owners, coaches and members all use.`}
      />

      <section className="container-site pb-14 md:pb-20">
        <BrowserFrame src="/shots/web-dashboard.webp" alt="The M4GYM owner dashboard" />
      </section>

      <section className="container-site border-t border-[var(--rule)] py-14 md:py-20">
        <SectionTitle title="What M4GYM is made of" />
        <dl className="sheet mt-8 divide-y divide-[var(--border-subtle)] px-6 md:px-8">
          {PARTS.map(([title, text]) => (
            <div key={title} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <dt className="font-bold">{title}</dt>
              <dd className="leading-relaxed text-[var(--text-secondary)]">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-site grid gap-10 border-t border-[var(--rule)] py-14 md:py-20 lg:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">How it’s built</h2>
          <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
            We ship small improvements every few days, to the web console and the app together. The{' '}
            <Link href={links.changelog} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              changelog
            </Link>{' '}
            lists each one.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Who answers support</h2>
          <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
            The people who build M4GYM. Write from the help centre in the app or email{' '}
            <a href={`mailto:${site.supportEmail}`} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              {site.supportEmail}
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Your data</h2>
          <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
            We don’t sell it or use it for advertising. You can export your members and delete your account at any time. The{' '}
            <Link href={links.privacy} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              Privacy Policy
            </Link>{' '}
            has the details.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
