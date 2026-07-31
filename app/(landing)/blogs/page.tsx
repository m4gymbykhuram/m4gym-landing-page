'use client'

import CategorySidebar from '@/app/components/blogs/CategorySidebar'
import TitleWithLines from '@/app/components/TitleWithLines'
import { fadeUp } from '@/lib/motion-variants'
import { motion } from 'framer-motion'
import blogs from '@/lib/blogs.json'
import BlogCard, { Blog } from '@/app/components/blogs/BlogCard'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const BlogsPage = () => {
  const allBlogs = blogs as Blog[]

  useScrollToTop()

  return (
    <div className="relative bg-[#111214] w-screen">
      <section
        className="relative bg-[#0A0A0B] flex flex-col items-center justify-center gap-4 h-100 px-4 md:px-8"
        style={{
          backgroundImage: "url('/assets/blogs-banner-bg.jpeg')",
          backgroundPosition: '100%',
          backgroundSize: 'cover',
        }}
      >
        <TitleWithLines title="Blogs" />
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="font-anton text-center text-4xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
        >
          Our Articles & <br /> announcements
        </motion.h2>
      </section>

      <div className="mx-auto flex flex-col lg:flex-row max-w-7xl gap-10 lg:px-5 lg:gap-16 py-20">
        <CategorySidebar />

        <div className="flex-1 px-5 lg:px-0">
          <h1 className="mb-10 text-3xl font-medium text-white">
            Latest Articles
          </h1>

          <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {allBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
