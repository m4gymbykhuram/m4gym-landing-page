import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Building2, LifeBuoy, Mail, ShieldCheck, Handshake } from 'lucide-react'
import { links, mailto, site } from '@/lib/site'
import { PageHero } from '../../components/Blocks'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the M4GYM team about moving your gym over, getting help, your data, or working together.',
  alternates: { canonical: '/contact' },
}

const TOPICS = [
  {
    icon: Building2,
    title: 'Bring your gym to M4GYM',
    text: 'Tell us about your gym and we’ll help you set it up, bring your members over, and pick the right plan.',
    href: mailto('My gym and M4GYM'),
    cta: 'Talk to us',
  },
  {
    icon: LifeBuoy,
    title: 'Help with your account',
    text: 'Already using M4GYM? The help centre in the app keeps your request and our replies in one thread.',
    href: links.support,
    cta: 'Go to Support',
    internal: true,
  },
  {
    icon: ShieldCheck,
    title: 'Privacy and your data',
    text: 'Ask for a copy of your data, correct it, or ask us to delete it. Write from the email on your account.',
    href: mailto('Privacy request'),
    cta: 'Email a privacy request',
  },
  {
    icon: Handshake,
    title: 'Partnerships and press',
    text: 'Equipment suppliers, gym chains, coaches with a following, or writing about us: we’d like to hear from you.',
    href: mailto('Partnership'),
    cta: 'Get in touch',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a person." intro="Real people read every message. We reply within one working day." />

      <section className="container-site pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {TOPICS.map((topic) => {
            const className =
              'group flex h-full flex-col rounded-[var(--radius-card)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sheet)] transition-transform duration-300 hover:-translate-y-0.5 md:p-8'
            const body = (
              <>
                <topic.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                <h2 className="mt-5 text-xl font-bold">{topic.title}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-[var(--text-secondary)]">{topic.text}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-semibold">
                  {topic.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
                </span>
              </>
            )
            return topic.internal ? (
              <Link key={topic.title} href={topic.href} className={className}>
                {body}
              </Link>
            ) : (
              <a key={topic.title} href={topic.href} className={className}>
                {body}
              </a>
            )
          })}
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <div className="grid gap-8 rounded-[var(--radius-sheet)] border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-8 md:grid-cols-3 md:p-10">
          <div>
            <p className="text-sm font-semibold text-[var(--text-muted)]">Email</p>
            <a href={`mailto:${site.supportEmail}`} className="mt-1 inline-flex items-center gap-2 text-lg font-bold">
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> {site.supportEmail}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-muted)]">Company</p>
            <p className="mt-1 text-lg font-bold">{site.company}</p>
            <p className="text-[var(--text-secondary)]">{site.country}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-muted)]">Quick answers</p>
            <Link href={links.faq} className="mt-1 inline-block text-lg font-bold underline underline-offset-4">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
