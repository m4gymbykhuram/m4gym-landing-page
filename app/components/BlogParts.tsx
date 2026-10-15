import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatPostDate, type Post } from '@/lib/blog'

/** The cover: a real product screenshot that relates to the post. */
export function PostCover({ post, large }: { post: Post; large?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-raised)]">
      {post.imageKind === 'web' ? (
        <Image
          src={post.image}
          alt=""
          width={1920}
          height={1200}
          sizes={large ? '60vw' : '30vw'}
          className="absolute top-[12%] left-[8%] w-[150%] max-w-none rounded-tl-[12px] shadow-[var(--shadow-pop)]"
        />
      ) : (
        <div className="absolute top-[10%] left-1/2 w-[38%] -translate-x-1/2 rounded-t-[28px] bg-[var(--ink)] p-[5px] pb-0 shadow-[var(--shadow-pop)]">
          <Image src={post.image} alt="" width={750} height={1631} sizes="16rem" className="rounded-t-[23px]" />
        </div>
      )}
    </div>
  )
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="label text-[var(--text-muted)]">
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
        <h3 className="headline mt-3 text-[1.875rem]">
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
