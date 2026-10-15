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
        eyebrow="FAQ"
        title="Questions, answered."
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

      <div className="container-site grid gap-12 pb-20 md:pb-28 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="Topics" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-semibold">Topics</p>
            <ol className="mt-3 space-y-2 border-l border-[var(--border-solid)]">
              {FAQ.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="max-w-3xl space-y-16">
          {FAQ.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-bold">{group.title}</h2>
              <FaqList items={group.items} />
            </section>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  )
}
