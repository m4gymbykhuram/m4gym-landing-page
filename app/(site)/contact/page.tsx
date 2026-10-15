import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { links, mailto, site } from '@/lib/site'
import { PageHero } from '../../components/Blocks'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the M4GYM team about moving your gym over, getting help, your data, or working together.',
  alternates: { canonical: '/contact' },
}

const TOPICS = [
  {
    title: 'Moving your gym to M4GYM',
    text: 'Tell us about your gym. We’ll help you set it up, bring your members across and pick a plan.',
    href: mailto('My gym and M4GYM'),
  },
  {
    title: 'Help with your account',
    text: 'Already on M4GYM? The help centre in the app keeps your request and our replies in one thread.',
    href: links.support,
    internal: true,
  },
  {
    title: 'Privacy and your data',
    text: 'Ask for a copy of your data, correct it, or have it deleted. Write from the email on your account.',
    href: mailto('Privacy request'),
  },
  {
    title: 'Partnerships and press',
    text: 'Equipment suppliers, gym groups, coaches with a following, or writing about us.',
    href: mailto('Partnership'),
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" intro={`Email ${site.supportEmail} for anything at all. Choose a topic below and the subject line is filled in for you. We reply within one working day.`} />

      <section className="container-site pb-20 md:pb-28">
        <ul className="sheet divide-y divide-[var(--border-subtle)] p-2">
          {TOPICS.map((topic) => {
            const className =
              'group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-[var(--radius-card)] px-4 py-6 transition-colors hover:bg-[var(--surface-soft)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:gap-8 md:px-6'
            const body = (
              <>
                <span className="text-lg font-bold">{topic.title}</span>
                <span className="col-start-1 row-start-2 leading-relaxed text-[var(--text-secondary)] md:col-start-auto md:row-start-auto">
                  {topic.text}
                </span>
                <span className="col-start-2 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-raised)] transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--lime)] md:col-start-auto md:row-span-1 md:row-start-auto">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2} aria-hidden="true" />
                </span>
              </>
            )
            return (
              <li key={topic.title}>
                {topic.internal ? (
                  <Link href={topic.href} className={className}>
                    {body}
                  </Link>
                ) : (
                  <a href={topic.href} className={className}>
                    {body}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="card-soft bg-[var(--surface)] p-5">
            <dt className="text-sm font-medium text-[var(--text-muted)]">Email</dt>
            <dd className="mt-2 text-lg font-semibold">
              <a href={`mailto:${site.supportEmail}`} className="underline decoration-[var(--rule)] underline-offset-4 hover:decoration-current">
                {site.supportEmail}
              </a>
            </dd>
          </div>
          <div className="card-soft bg-[var(--surface)] p-5">
            <dt className="text-sm font-medium text-[var(--text-muted)]">Company</dt>
            <dd className="mt-2 text-lg font-semibold">
              {site.company}
            </dd>
          </div>
          <div className="card-soft bg-[var(--surface)] p-5">
            <dt className="text-sm font-medium text-[var(--text-muted)]">Quick answers</dt>
            <dd className="mt-2 text-lg font-semibold">
              <Link href={links.faq} className="underline decoration-[var(--rule)] underline-offset-4 hover:decoration-current">
                Read the FAQ
              </Link>
            </dd>
          </div>
        </dl>
      </section>
    </>
  )
}
