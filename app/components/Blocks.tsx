import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { links } from '@/lib/site'
import type { FaqItem } from '@/lib/faq'

/** The top of a page: an optional context line, the title, one paragraph, actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="container-site pt-12 pb-12 md:pt-20 md:pb-16">
      {eyebrow && <p className="rise text-sm font-medium text-[var(--text-muted)]">{eyebrow}</p>}
      <h1 className="rise-2 headline mt-3 max-w-[20ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">{title}</h1>
      {intro && <div className="rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">{intro}</div>}
      {children && <div className="rise-3 mt-8">{children}</div>}
    </header>
  )
}

/** A section heading with an optional line underneath. */
export function SectionTitle({ title, intro, className = '' }: { title: ReactNode; intro?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="headline max-w-[22ch] text-[clamp(2rem,4vw,3.25rem)]">{title}</h2>
      {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">{intro}</p>}
    </div>
  )
}

/** The closing panel on most pages: what to do next, stated plainly. */
export function CtaBand({
  title = 'Try M4GYM with your own gym',
  text = 'The free plan needs no card. Add your gym, your first members and a coach, and send them the app.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="container-site pb-16 md:pb-24">
      <div className="flex flex-col gap-8 rounded-[var(--radius-sheet)] bg-[var(--lime)] p-8 text-[var(--ink)] md:flex-row md:items-end md:justify-between md:p-12">
        <div className="max-w-2xl">
          <h2 className="headline text-[clamp(2rem,4vw,3.25rem)]">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--ink)]/75">{text}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a href={links.signUp} className="btn bg-[var(--ink)] text-[var(--lime)] shadow-[0_8px_20px_rgb(22_23_15/0.2)] hover:bg-[#26281b]">
            Create your gym <ArrowRight aria-hidden="true" strokeWidth={2.25} />
          </a>
          <a href={links.signIn} className="btn border border-[var(--ink)]/20 text-[var(--ink)] hover:bg-[var(--ink)]/5">
            Sign in
          </a>
        </div>
      </div>
    </section>
  )
}

/** Questions that open in place, as one list inside one card. Works without script. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="sheet divide-y divide-[var(--border-subtle)] px-2">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-5 rounded-[16px] px-4 py-5 transition-colors hover:bg-[var(--surface-soft)] [&::-webkit-details-marker]:hidden">
            <span className="flex-1 text-[17px] font-bold leading-snug">{item.q}</span>
            <span
              aria-hidden="true"
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-raised)] transition-colors group-open:bg-[var(--ink)] group-open:text-[var(--lime)]"
            >
              <span className="absolute h-[2px] w-3 rounded-full bg-current" />
              <span className="absolute h-3 w-[2px] rounded-full bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-2xl px-4 pb-6 leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Structured data for search engines. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
