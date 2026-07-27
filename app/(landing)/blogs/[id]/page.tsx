import Image from 'next/image'
import { notFound } from 'next/navigation'
import blogs from '@/lib/blogs.json'
import { Blog } from '@/app/components/blogs/BlogCard'
import Link from 'next/link'
import { slugify } from '@/lib/slugify'
import { ChevronLeft } from 'lucide-react'
import GlassButton from '@/app/components/GlassButton'
import ScrollToTop from '@/app/components/ScrollToTop'

export function generateStaticParams() {
  return (blogs as Blog[]).map((blog) => ({ id: blog.id }))
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = (blogs as Blog[]).find((b) => b.id === id)

  if (!blog) return notFound()

  return (
    <>
      <ScrollToTop />
      <main
        className="min-h-screen  px-6 py-16 pt-38 md:px-16 bg-[radial-gradient(ellipse_at_25%_30%,_#5c5c1a_0%,_transparent_55%),
            radial-gradient(ellipse_at_75%_70%,_#5c5c1a_0%,_transparent_55%)]"
      >
        {/* Left glow */}
        <div
          className="
          absolute top-[15%] left-[8%]
          w-[320px] h-85
          bg-[#4a4a12]
          rounded-full
          blur-[100px]
          opacity-80
        "
        />

        {/* Right glow */}
        <div
          className="
          absolute bottom-[1%] right-[6%]
          w-95 h-90
          bg-[#4a4a12]
          rounded-full
          blur-[110px]
          opacity-70
        "
        />

        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-1 text-lg text-white relative"
          >
            <span aria-hidden>
              {' '}
              <ChevronLeft />{' '}
            </span>{' '}
            Back to Blogs
          </Link>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-3 relative">
            {blog.tags.map((tag) => (
              <GlassButton key={tag}>{tag}</GlassButton>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-8 text-4xl relative font-medium text-white md:text-5xl">
            {blog.title}
          </h1>

          {/* Hero image */}
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px]">
            {/* Main article column */}
            <article>
              {/* Author + date */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full bg-neutral-700">
                    <Image
                      src={blog.authorAvatar}
                      alt={blog.author}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-white">{blog.author}</p>
                </div>
                <p className="text-sm text-primary">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Intro paragraphs */}
              <div className="space-y-4 text-neutral-400">
                {blog.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Numbered sections */}
              <div className="mt-10 space-y-10">
                {blog.sections.map((section) => {
                  const id = slugify(section.heading)
                  return (
                    <section key={id} id={id} className="scroll-mt-32">
                      <h2 className="mb-4 text-2xl font-medium text-white">
                        {section.heading}
                      </h2>
                      <div className="space-y-3 text-neutral-400">
                        {section.paragraphs.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="h-fit lg:sticky lg:top-32 lg:border-l lg:border-white/10 lg:pl-10">
              <h3 className="mb-4 text-lg font-medium text-white">
                Table of Content
              </h3>
              <ul className="mb-10 space-y-3">
                {blog.sections.map((section) => {
                  const id = slugify(section.heading)
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="text-sm text-neutral-400 hover:text-primary"
                      >
                        {section.heading}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <h3 className="mb-4 text-lg font-medium text-white">
                Share this article
              </h3>
              <div className="flex gap-3">
                <Image
                  src={'/assets/twitter.png'}
                  height={25}
                  width={25}
                  alt={'twitter'}
                />
                <Image
                  src={'/assets/facebook.png'}
                  height={25}
                  width={25}
                  alt={'facebook'}
                />
                <Image
                  src={'/assets/whatsapp.png'}
                  height={25}
                  width={25}
                  alt={'whatsapp'}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
