import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { POSTS, getPost, relatedPosts } from '@/lib/blog'
import { site } from '@/lib/site'
import { CtaBand, JsonLd } from '../../../components/Blocks'
import { PostCard, PostCover, PostMeta } from '../../../components/BlogParts'

export const dynamicParams = false

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, publishedTime: post.date },
  }
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const { Body } = post

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: `${site.url}/blog/${post.slug}`,
          author: { '@type': 'Organization', name: 'M4GYM' },
          publisher: { '@type': 'Organization', name: site.company },
        }}
      />
      <article>
        <header className="container-site max-w-4xl pt-10 md:pt-14">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> All posts
          </Link>
          <p className="rise mt-8 text-sm font-semibold text-[var(--text-muted)]">{post.category}</p>
          <h1 className="rise-2 display mt-3 text-balance text-[clamp(2.4rem,5.5vw,4.25rem)]">{post.title}</h1>
          <p className="rise-3 mt-5 max-w-2xl text-xl leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
          <div className="rise-3 mt-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--lime)] text-xs font-extrabold text-[var(--ink)]" aria-hidden="true">
              M4
            </span>
            <div>
              <p className="text-sm font-semibold">The M4GYM team</p>
              <PostMeta post={post} />
            </div>
          </div>
        </header>

        <div className="rise-4 container-site mt-10 max-w-4xl">
          <PostCover post={post} large />
        </div>

        <div className="container-site max-w-4xl">
          <div className="prose-post mx-auto max-w-[42rem] py-12 md:py-16">
            <Body />
          </div>
        </div>
      </article>

      <section className="border-t border-[var(--border-subtle)] bg-[var(--surface)] py-16 md:py-20">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-3xl md:text-4xl">Keep reading</h2>
            <Link href="/blog" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              All posts
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {relatedPosts(post).map((other) => (
              <PostCard key={other.slug} post={other} />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 md:pt-28">
        <CtaBand />
      </div>
    </>
  )
}
