import type { Metadata } from 'next'
import Link from 'next/link'
import { links, site } from '@/lib/site'
import { CtaBand, PageHero, SectionTitle } from '../../components/Blocks'
import { BrowserFrame } from '../../components/Frames'

export const metadata: Metadata = {
  title: 'About',
  description: `M4GYM is made by ${site.company}. We build software for the people who run gyms, coach in them and train in them.`,
  alternates: { canonical: '/about' },
}

const PRINCIPLES = [
  {
    title: 'The right tool for each person',
    text: 'Owners need a big screen for members and money. Coaches and members need their phone. So owners get the web console and everyone else gets the app, and they share one set of data.',
  },
  {
    title: 'One account, every gym',
    text: 'Your progress and achievements belong to you, not to a gym. Change gym, train at two, or train on your own, and your history comes with you.',
  },
  {
    title: 'AI drafts, people decide',
    text: 'Ask M4 saves coaches hours by drafting plans and answering questions. A person always reviews the plan, and it never replaces the coach.',
  },
  {
    title: 'Your data is yours',
    text: 'We don’t sell it and we don’t use it for advertising. You can export it, and you can delete your account at any time.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built for the people who run gyms."
        intro={`M4GYM is made by ${site.company}. We build the software that a gym runs on, so owners spend less time on registers and spreadsheets and more time with their members.`}
      />

      <section className="container-site pb-20">
        <BrowserFrame src="/shots/web-dashboard.webp" alt="The M4GYM owner dashboard" />
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface)] py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            title="Why M4GYM exists."
            intro="Most gyms run on a sign-in book, a spreadsheet of fees, and a coach’s memory. It works until it doesn’t: fees slip, new members drift away, and nobody notices until it’s too late."
          />
          <div className="space-y-5 text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              We started M4GYM to give small and growing gyms the tools that big chains have, without the cost or the complexity. Members
              check in with their phone. Fees are tracked without a spreadsheet. Every member gets a coach and a plan from day one.
            </p>
            <p>
              And because not everyone trains at a gym, the same app coaches people on their own, at home or wherever they train.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <SectionTitle title="What we believe." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((item, index) => (
            <div key={item.title} className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface)] p-7 md:p-8">
              <p className="display text-3xl text-[var(--text-faint)]">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-[var(--text-secondary)]">
          Want to talk?{' '}
          <Link href={links.contact} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  )
}
