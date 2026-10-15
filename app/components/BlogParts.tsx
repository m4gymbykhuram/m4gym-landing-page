import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatPostDate, type Post } from '@/lib/blog'

const TONES = {
  lime: 'bg-[var(--lime)] text-[var(--ink)]',
  ink: 'bg-[var(--ink)] text-white dark:bg-[var(--surface-raised)]',
  stone: 'bg-[var(--surface-raised)] text-[var(--text-primary)]',
} as const

/** Typographic cover art: no stock photos, just the post's idea set large. */
export function PostCover({ post, large }: { post: Post; large?: boolean }) {
  const Icon = post.icon
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] ${TONES[post.tone]}`} aria-hidden="true">
      <Icon className="absolute -right-6 -bottom-8 h-[70%] w-auto opacity-[0.12]" strokeWidth={1.25} />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">{post.category}</span>
        <span className={`display max-w-[85%] ${large ? 'text-[clamp(2.5rem,5vw,4.25rem)]' : 'text-4xl'}`}>{post.cover}</span>
      </div>
    </div>
  )
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-sm text-[var(--text-muted)]">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readMinutes} min read
    </p>
  )
}

/** A post in a list: the cover, its title and one line. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col">
      <PostCover post={post} />
      <div className="mt-5 flex flex-1 flex-col">
        <PostMeta post={post} />
        <h3 className="mt-2 text-xl font-bold leading-snug text-balance">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
          Read <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}

/** A boxed aside inside a post, such as how M4GYM handles the idea. */
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="callout">
      <p className="callout-title">{title}</p>
      {children}
    </aside>
  )
}
