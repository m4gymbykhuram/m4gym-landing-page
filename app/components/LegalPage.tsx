import type { ReactNode } from 'react'
import { site } from '@/lib/site'

/** The shared frame for legal and help pages: title, date, contents, prose. */
export function LegalPage({
  title,
  intro,
  sections,
  updated = true,
  children,
}: {
  title: string
  intro: ReactNode
  sections?: Array<{ id: string; title: string }>
  updated?: boolean
  children: ReactNode
}) {
  return (
    <div className="container-site pt-10 pb-20 md:pt-14 md:pb-28">
      <header>
        <p className="rise flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
          {updated ? `Last updated ${site.legalUpdated}` : 'Help'}
        </p>
        <h1 className="rise-2 headline mt-6 max-w-[14ch] text-[clamp(2.75rem,6vw,5.75rem)]">{title}</h1>
        <div className="rise-3 mt-8 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">{intro}</div>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        {sections?.length ? (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-medium text-[var(--text-muted)]">On this page</p>
              <ol className="mt-3 space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="block rounded-[12px] px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}
        <article className="sheet prose-legal max-w-3xl p-6 md:p-12 [&>*:first-child]:mt-0">
          {children}
        </article>
      </div>
    </div>
  )
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  )
}
