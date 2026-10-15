import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { links } from '@/lib/site'
import type { FaqItem } from '@/lib/faq'

/** The top of every marketing page: a small label, the headline, one paragraph, and actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  centered,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  centered?: boolean
}) {
  return (
    <div className={`container-site pt-14 pb-12 md:pt-20 md:pb-16 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`rise inline-flex items-center gap-2 rounded-full border border-[var(--border-solid)] bg-[var(--surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-secondary)]`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime-deep)]" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h1 className={`rise-2 display mt-6 max-w-4xl text-balance text-[clamp(2.5rem,6.5vw,5rem)] ${centered ? 'mx-auto' : ''}`}>{title}</h1>
      {intro && (
        <div className={`rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl ${centered ? 'mx-auto' : ''}`}>
          {intro}
        </div>
      )}
      {children && <div className={`rise-3 mt-9 ${centered ? 'flex justify-center' : ''}`}>{children}</div>}
    </div>
  )
}

/** A section heading used inside pages. */
export function SectionTitle({ eyebrow, title, intro, className = '' }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className="text-sm font-semibold text-[var(--text-muted)]">{eyebrow}</p>}
      <h2 className="display mt-2 text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">{intro}</p>}
    </div>
  )
}

/** The lime closing band that ends most pages with one clear next step. */
export function CtaBand({
  title = 'Set up your gym this afternoon.',
  text = 'Add your logo, your first members and your coaches. Everyone else gets the app.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="container-site pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[var(--radius-sheet)] bg-[var(--lime)] p-10 text-[var(--ink)] md:p-16">
        <Image src="/m4gym-mark.svg" alt="" width={220} height={220} className="pointer-events-none absolute -right-8 -bottom-10 w-56 opacity-10" aria-hidden="true" />
        <h2 className="display max-w-2xl text-4xl md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-xl text-lg text-[var(--ink)]/75">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={links.signUp} className="btn bg-[var(--ink)] text-[var(--lime)] hover:bg-[#26281b]">
            Start free <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
          <a href={links.signIn} className="btn border border-[var(--ink)]/20 text-[var(--ink)] hover:border-[var(--ink)]/40">
            Sign in
          </a>
        </div>
      </div>
    </section>
  )
}

/** Questions that open in place; works without any script. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-raised)] text-xl leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Structured data for search engines. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
