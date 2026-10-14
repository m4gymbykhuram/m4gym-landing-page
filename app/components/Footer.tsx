import Link from 'next/link'
import { links, site } from '@/lib/site'
import { Logo } from './Logo'

const COLUMNS = [
  {
    title: 'Product',
    items: [
      { href: '/#features', label: 'Features' },
      { href: '/#coaching', label: 'Personal coaching' },
      { href: '/#pricing', label: 'Pricing' },
      { href: links.signIn, label: 'Sign in', external: true },
    ],
  },
  {
    title: 'Help',
    items: [
      { href: links.support, label: 'Support' },
      { href: `mailto:${site.supportEmail}`, label: site.supportEmail, external: true },
    ],
  },
  {
    title: 'Legal',
    items: [
      { href: links.privacy, label: 'Privacy Policy' },
      { href: links.terms, label: 'Terms of Use' },
      { href: links.deleteAccount, label: 'Delete your account' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--ground)]">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo className="h-7" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
            Members, fees, check-ins, classes and coaching for gyms, in one place.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{column.title}</p>
            <ul className="mt-3 space-y-2.5">
              {column.items.map((item) => (
                <li key={item.href}>
                  {'external' in item && item.external ? (
                    <a href={item.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-[var(--border-subtle)] py-6 text-xs text-[var(--text-faint)] sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.company}. M4GYM is a product of {site.company}.
        </p>
        <p>Made for gyms in {site.country} and everywhere else.</p>
      </div>
    </footer>
  )
}
