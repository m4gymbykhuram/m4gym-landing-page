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
        eyebrow="Blog"
        title="Notes on running a gym, coaching and training."
        intro="Practical, plain-words guides for owners, coaches and anyone training on their own."
      />

      <section className="container-site pb-16">
        <article className="group relative grid items-center gap-8 rounded-[var(--radius-sheet)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sheet)] md:grid-cols-[1.15fr_1fr] md:p-5">
          <PostCover post={featured} large />
          <div className="p-3 md:p-6">
            <p className="text-sm font-semibold text-[var(--text-muted)]">Latest · {featured.category}</p>
            <h2 className="display mt-3 text-4xl text-balance md:text-5xl">
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
        <div className="flex items-end justify-between gap-6 border-b border-[var(--border-subtle)] pb-4">
          <h2 className="text-2xl font-bold">All posts</h2>
          <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <Rss className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> RSS
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
