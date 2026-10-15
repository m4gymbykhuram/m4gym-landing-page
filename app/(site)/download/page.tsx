import type { Metadata } from 'next'
import Link from 'next/link'
import { links } from '@/lib/site'
import { PhoneFrame } from '../../components/Frames'
import { StoreButtons } from '../../components/StoreButtons'

export const metadata: Metadata = {
  title: 'Get the app',
  description: 'Download M4GYM for iPhone and Android. Free for members and coaches at gyms that use M4GYM.',
  alternates: { canonical: '/download' },
}

const WHO = [
  ['Members', 'Your workouts, check-in card, classes and progress. Free when your gym uses M4GYM.'],
  ['Coaches', 'Your clients, their plans and your schedule. Free with your gym’s plan.'],
  ['On your own', 'A weekly plan built for you, with a free first week.'],
]

export default function DownloadPage() {
  return (
    <section className="overflow-hidden">
      <div className="container-site grid gap-12 pt-10 pb-20 md:pt-14 md:pb-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <h1 className="rise headline text-[clamp(2.5rem,5.5vw,4.75rem)]">Get the M4GYM app</h1>
          <p className="rise-2 mt-6 max-w-lg text-xl leading-relaxed text-[var(--text-secondary)]">
            One app for members, coaches and anyone training on their own. Sign in with the email your gym invited, or with Apple or Google.
          </p>
          <div className="rise-3 mt-8">
            <StoreButtons />
          </div>
          <div className="mt-14">
            <h2 className="text-lg font-bold">Who it’s for</h2>
            <dl className="sheet mt-4 divide-y divide-[var(--border-subtle)] px-6">
              {WHO.map(([title, text]) => (
                <div key={title} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-[17px] font-bold">{title}</dt>
                  <dd className="leading-relaxed text-[var(--text-secondary)]">{text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Training alone?{' '}
              <Link href={links.coaching} className="text-[var(--text-primary)] underline underline-offset-4">
                About personal coaching
              </Link>{' '}
              · Running a gym?{' '}
              <a href={links.signIn} className="text-[var(--text-primary)] underline underline-offset-4">
                Web console
              </a>
            </p>
          </div>
        </div>
        <div className="rise-4 flex items-start justify-center gap-4 overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--surface-raised)] px-6 pt-12 lg:pt-16">
          <PhoneFrame src="/shots/app-member-home.webp" alt="The member home screen" className="w-[46%] max-w-64" priority />
          <PhoneFrame src="/shots/app-coach-home.webp" alt="The coach home screen" className="mt-16 w-[46%] max-w-64" priority />
        </div>
      </div>
    </section>
  )
}
