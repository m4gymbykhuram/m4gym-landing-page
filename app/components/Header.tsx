'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { links } from '@/lib/site'
import { Logo } from './Logo'

const NAV = [
  { href: links.features, label: 'Features' },
  { href: links.pricing, label: 'Pricing' },
  { href: links.coaching, label: 'Personal coaching' },
  { href: links.blog, label: 'Blog' },
  { href: links.contact, label: 'Contact' },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  // Remembering the page the menu was opened on closes it on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--ground)_88%,transparent)] backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--text-primary)] ${
                  active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-[var(--lime-deep)] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={links.signIn} className="rounded-[12px] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]">
            Sign in
          </a>
          <a href={links.signUp} className="btn btn-primary h-10 px-4 text-sm">
            Start free <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--surface-raised)] lg:hidden"
          aria-label={open ? 'Close menu' : 'Menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--ground)] px-5 pb-8 pt-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className="headline flex items-center justify-between border-b border-[var(--rule)] py-3 text-5xl"
              >
                {item.label}
                {isActive(pathname, item.href) && <span className="h-3 w-3 rounded-full bg-[var(--lime-deep)]" aria-hidden="true" />}
              </Link>
            ))}
            <a href={links.signIn} className="py-5 text-base font-semibold text-[var(--text-secondary)]">
              Sign in to the console
            </a>
          </nav>
          <a href={links.signUp} className="btn btn-primary mt-2 w-full">
            Start free <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>
      )}
    </header>
  )
}
