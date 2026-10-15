import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQ, faqJsonLd } from '@/lib/faq'
import { links, site } from '@/lib/site'
import { CtaBand, FaqList, JsonLd, PageHero } from '../../components/Blocks'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about M4GYM: getting started, members and check-in, fees and billing, coaching and Ask M4, and your data.',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ.flatMap((group) => group.items))} />
      <PageHero
        title="Frequently asked questions"
        intro={
          <p>
            Can’t find yours? Email{' '}
            <a href={`mailto:${site.supportEmail}`} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              {site.supportEmail}
            </a>{' '}
            or visit{' '}
            <Link href={links.support} className="font-semibold text-[var(--text-primary)] underline underline-offset-4">
              Support
            </Link>
            .
          </p>
        }
      />

      <div className="container-site grid gap-12 pb-20 md:pb-28 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Topics" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="label text-[var(--text-muted)]">Topics</p>
            <ol className="mt-3 space-y-0.5">
              {FAQ.map((group, index) => (
                <li key={group.id}>
                  <a href={`#${group.id}`} className="flex gap-3 rounded-[12px] px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]">
                    <span className="tabular-nums text-[var(--text-faint)]">{String(index + 1).padStart(2, '0')}</span>
                    {group.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="space-y-14">
          {FAQ.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="headline mb-6 text-[clamp(1.75rem,3vw,2.5rem)]">{group.title}</h2>
              <FaqList items={group.items} />
            </section>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  )
}
