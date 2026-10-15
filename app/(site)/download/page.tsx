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
  {
    title: 'Members',
    text: 'Your workouts, check-in card, classes and progress. Free when your gym uses M4GYM.',
  },
  {
    title: 'Coaches',
    text: 'Your clients, their plans and your schedule, all on your phone. Free with your gym’s plan.',
  },
  {
    title: 'Training on your own',
    text: 'A weekly plan built for you, with a free first week.',
    href: links.coaching,
    cta: 'About personal coaching',
  },
]

export default function DownloadPage() {
  return (
    <section className="overflow-hidden">
      <div className="container-site grid items-center gap-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="rise display text-balance text-[clamp(2.75rem,7vw,5.5rem)]">Get the app.</h1>
          <p className="rise-2 mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            One app for members, coaches and anyone training on their own. Sign in with the email your gym invited, or with Apple or
            Google.
          </p>
          <div className="rise-3 mt-8">
            <StoreButtons />
          </div>
          <div className="rise-3 mt-12 grid gap-6 sm:grid-cols-3">
            {WHO.map((item) => (
              <div key={item.title} className="border-t border-[var(--border-solid)] pt-4">
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
                {item.href && (
                  <Link href={item.href} className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">
                    {item.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-[var(--text-muted)]">
            Running a gym? Owners use the web console at{' '}
            <a href={links.signIn} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              app.m4gym.com
            </a>
            .
          </p>
        </div>
        <div className="rise-4 flex justify-center gap-4">
          <PhoneFrame src="/shots/app-member-home.webp" alt="The member home screen" className="w-[46%] max-w-64" priority />
          <PhoneFrame src="/shots/app-coach-home.webp" alt="The coach home screen" className="mt-14 w-[46%] max-w-64" priority />
        </div>
      </div>
    </section>
  )
}
