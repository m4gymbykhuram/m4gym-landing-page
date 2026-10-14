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
    <div className="container-site py-14 md:py-20">
      <header className="max-w-3xl">
        <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">{title}</h1>
        {updated && <p className="mt-4 text-sm text-[var(--text-muted)]">Last updated {site.legalUpdated}</p>}
        <div className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">{intro}</div>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
        {sections?.length ? (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-semibold">On this page</p>
              <ol className="mt-3 space-y-2 border-l border-[var(--border-solid)]">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]">
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
        <article className="prose-legal max-w-3xl rounded-[var(--radius-sheet)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sheet)] md:p-12 [&>*:first-child]:mt-0">
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
