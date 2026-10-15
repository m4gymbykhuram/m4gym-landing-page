import Link from 'next/link'
import { links, site } from '@/lib/site'

const COLUMNS = [
  {
    title: 'Product',
    items: [
      { href: links.features, label: 'Features' },
      { href: links.pricing, label: 'Pricing' },
      { href: links.coaching, label: 'Personal coaching' },
      { href: links.download, label: 'Get the app' },
      { href: links.signIn, label: 'Sign in', external: true },
    ],
  },
  {
    title: 'Company',
    items: [
      { href: links.about, label: 'About' },
      { href: links.blog, label: 'Blog' },
      { href: links.contact, label: 'Contact' },
      { href: links.changelog, label: 'Changelog' },
    ],
  },
  {
    title: 'Help',
    items: [
      { href: links.support, label: 'Support' },
      { href: links.faq, label: 'FAQ' },
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
    <footer className="bg-[var(--ink)] text-white">
      <div className="container-site grid gap-10 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div className="max-w-xs sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-bold text-[var(--lime)]">M4GYM</p>
          <p className="mt-4 text-lg leading-snug text-white/80">Members, fees, check-ins, classes and coaching for gyms, in one place.</p>
          <a href={`mailto:${site.supportEmail}`} className="mt-6 inline-block text-sm text-white/60 hover:text-[var(--lime)]">
            {site.supportEmail}
          </a>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium text-white/45">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.items.map((item) => (
                <li key={item.href}>
                  {'external' in item && item.external ? (
                    <a href={item.href} className="text-[15px] text-white/80 hover:text-[var(--lime)]">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-[15px] text-white/80 hover:text-[var(--lime)]">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}
          </p>
          <p>Made for gyms everywhere</p>
        </div>
      </div>
    </footer>
  )
}
