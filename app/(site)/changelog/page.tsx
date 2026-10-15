import type { Metadata } from 'next'
import { CHANGELOG, formatReleaseDate } from '@/lib/changelog'
import { PageHero } from '../../components/Blocks'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'What’s new in M4GYM: changes to the web console and the iPhone and Android app.',
  alternates: { canonical: '/changelog' },
}

const AREA_BADGE = {
  'Web console': 'badge-neutral',
  App: 'badge-success',
  Everywhere: 'badge-lime',
} as const

export default function ChangelogPage() {
  return (
    <>
      <PageHero title="Changelog" intro="Changes to the web console and the app, newest first." />

      <div className="container-site pb-20 md:pb-28">
        <ol className="space-y-12">
          {CHANGELOG.map((release) => (
            <li key={release.date} className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
              <h2 className="text-sm font-semibold text-[var(--text-muted)] lg:sticky lg:top-24 lg:self-start lg:pt-6">
                <time dateTime={release.date}>{formatReleaseDate(release.date)}</time>
              </h2>
              <ul className="sheet divide-y divide-[var(--border-subtle)] px-6 md:px-8">
                {release.items.map((item) => (
                  <li key={item.title} className="py-5">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <h3 className="max-w-2xl text-[17px] font-bold leading-snug">{item.title}</h3>
                      <span className={`badge ${AREA_BADGE[item.area]}`}>{item.area}</span>
                    </div>
                    {item.detail && <p className="mt-1.5 max-w-2xl leading-relaxed text-[var(--text-secondary)]">{item.detail}</p>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
