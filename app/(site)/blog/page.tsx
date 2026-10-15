import type { Metadata } from 'next'
import Link from 'next/link'
import { Rss } from 'lucide-react'
import { POSTS } from '@/lib/blog'
import { CtaBand, PageHero } from '../../components/Blocks'
import { PostCard, PostCover, PostMeta } from '../../components/BlogParts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical guides for gym owners, coaches and anyone training on their own, from the team behind M4GYM.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS

  return (
    <>
      <PageHero
        title="Blog"
        intro="Guides for gym owners, coaches and people training on their own, from the team that builds M4GYM."
      />

      <section className="container-site pb-16">
        <article className="sheet group relative grid items-center gap-8 p-3 md:grid-cols-[1.2fr_1fr] md:gap-12">
          <PostCover post={featured} large />
          <div className="p-4 md:p-6">
            <p className="text-sm font-medium text-[var(--text-muted)]">Latest · {featured.category}</p>
            <h2 className="headline mt-4 text-[clamp(2.75rem,5vw,4.5rem)] transition-colors group-hover:text-[var(--text-secondary)]">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">{featured.description}</p>
            <div className="mt-5">
              <PostMeta post={featured} />
            </div>
          </div>
        </article>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">All posts</h2>
          <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Rss className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> RSS
          </a>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
