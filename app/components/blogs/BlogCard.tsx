import Image from 'next/image'
import Link from 'next/link'

export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface Blog {
  id: string
  title: string
  tags: string[]
  author: string
  authorAvatar: string
  date: string
  image: string
  intro: string[]
  sections: BlogSection[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group block rounded-2xl hover:border border-[#2D2D2D] hover:bg-bg-elevated p-3 transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-black">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.1] group-hover:rotate-1"
        />
      </div>

      {/* Text content */}
      <div className="px-1 pt-5 pb-2">
        <h3 className="text-lg font-medium leading-snug text-white line-clamp-2">
          {blog.title}
        </h3>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-700">
            <Image
              src={blog.authorAvatar}
              alt={blog.author}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <p className="text-sm text-neutral-400">
            {blog.author} <span className="text-neutral-500">|</span>{' '}
            <span className="text-primary">{formatDate(blog.date)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
