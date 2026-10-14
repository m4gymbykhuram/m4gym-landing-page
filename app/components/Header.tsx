import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { links } from '@/lib/site'
import { Logo } from './Logo'

const NAV = [
  { href: '/#features', label: 'Features' },
  { href: '/#coaching', label: 'Personal coaching' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--ground)_82%,transparent)] backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[var(--btnr)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={links.signIn} className="px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Sign in
          </a>
          <a href={links.signUp} className="btn btn-primary h-10 px-4 text-sm">
            Start free
          </a>
        </div>

        {/* Phones: a disclosure, so the menu works without any script. */}
        <details className="group md:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-[var(--text-primary)] [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 group-open:hidden" strokeWidth={1.75} />
            <X className="hidden h-5 w-5 group-open:block" strokeWidth={1.75} />
          </summary>
          <div className="absolute inset-x-0 top-16 border-b border-[var(--border-subtle)] bg-[var(--ground)] px-5 pb-6 pt-2 shadow-[var(--shadow-pop)]">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-[var(--border-subtle)] py-3.5 text-base font-semibold">
                  {item.label}
                </Link>
              ))}
              <a href={links.signIn} className="py-3.5 text-base font-semibold">
                Sign in
              </a>
            </nav>
            <a href={links.signUp} className="btn btn-primary mt-3 w-full">
              Start free
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}
