import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquareText, ShieldCheck } from 'lucide-react'
import { links, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with M4GYM: the help centre in the app, email support, and account questions.',
  alternates: { canonical: '/support' },
}

const ROUTES = [
  {
    icon: MessageSquareText,
    title: 'Help centre in the app',
    text: 'In the app, open More, then Help. On the web, choose Help & support. Your ticket and our replies stay in one thread, and you get a notification when we answer.',
  },
  {
    icon: Mail,
    title: 'Email',
    text: `Write to ${site.supportEmail} from the address on your account. We reply within one working day.`,
    href: `mailto:${site.supportEmail}`,
    cta: 'Email support',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy and your data',
    text: 'Ask for a copy of your data, correct it, or delete your account.',
    href: links.deleteAccount,
    cta: 'Delete your account',
  },
]

const FAQ = [
  {
    q: 'I can’t sign in.',
    a: 'Use “Forgot password?” on the sign-in screen. If you signed up with Apple or Google, sign in the same way again. Still stuck? Email us from the address on your account.',
  },
  {
    q: 'My gym invited me. Where do I start?',
    a: 'Open the link in the invitation on your phone. If you don’t have the app yet, install it, sign in with the email the invitation was sent to, and the invitation is waiting for you.',
  },
  {
    q: 'Check-in says I’m not at the gym.',
    a: 'Your gym asks the app to confirm you’re there. Allow location access for M4GYM in your phone’s settings and try again, or ask the desk to check you in.',
  },
  {
    q: 'How do I cancel a subscription?',
    a: 'Gym owners: Billing in the web console. Personal coaching: in the app under More, then Plan. You keep access until the end of the period you paid for.',
  },
]

export default function SupportPage() {
  return (
    <div className="container-site py-14 md:py-20">
      <h1 className="display max-w-3xl text-[clamp(2.5rem,6vw,4rem)]">How can we help?</h1>
      <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)]">
        Real people answer every request. Gym owners on paid plans get priority.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {ROUTES.map((route) => (
          <div key={route.title} className="flex flex-col rounded-[var(--radius-card)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sheet)]">
            <route.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold">{route.title}</h2>
            <p className="mt-2 flex-1 leading-relaxed text-[var(--text-secondary)]">{route.text}</p>
            {route.href &&
              (route.href.startsWith('mailto:') ? (
                <a href={route.href} className="btn btn-outline mt-6 w-fit">
                  {route.cta}
                </a>
              ) : (
                <Link href={route.href} className="btn btn-outline mt-6 w-fit">
                  {route.cta}
                </Link>
              ))}
          </div>
        ))}
      </div>

      <h2 className="mt-20 text-2xl font-bold">Common questions</h2>
      <div className="mt-6 max-w-3xl divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-raised)] text-xl transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
