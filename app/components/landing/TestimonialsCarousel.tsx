'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/testimonials-data'
import TestimonialCard from './TestimonialCard'
import SectionHeading from './SectionHeading'
import { useScreenSize } from '@/hooks/useScreenSize'

const PAGE_SIZE = 2

export default function TestimonialsCarousel() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const { isMobile, isTablet } = useScreenSize()

  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE)
  const currentItems = testimonials.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  )

  const goPrev = () => {
    setDirection(-1)
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1))
  }

  const goNext = () => {
    setDirection(1)
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1))
  }

  return (
    <div>
      <div className="mb-5 md:mb-10 lg:mb-5 flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Arrow controls */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={goPrev}
            className="w-13 h-13 rounded-full flex items-center justify-center bg-bg-elevated"
            style={{
              width: '3.5rem',
              height: '3.5rem',
              backgroundImage: `linear-gradient(#1A1A1A, #1A1A1A), linear-gradient(180deg, #666666 0%, #000000 100%)`,
              backgroundOrigin: 'border-box, border-box',
              backgroundClip: 'padding-box, border-box',
              border: '1px solid transparent',
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white/70" strokeWidth={2} />
          </button>
          <button
            onClick={goNext}
            className="w-13 h-13 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #E8FF5C 0%, #C6FF4D 100%)',
            }}
          >
            <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
          </button>
        </div>
        <SectionHeading
          badge="Testimonials"
          title="Success Stories Across Every Gym Role"
          align={isMobile || isTablet ? 'center' : 'right'}
        />
      </div>

      {/* Cards */}
      <div className="relative overflow-hidden min-h-55">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {currentItems.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className={
                  i === 1
                    ? 'hidden lg:block md:pl-10 lg:border-l md:border-white/10'
                    : ''
                }
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Arrow controls */}
      <div className="flex lg:hidden items-center justify-center gap-4">
        <button
          onClick={goPrev}
          className="w-13 h-13 rounded-full flex items-center justify-center bg-bg-elevated"
          style={{
            width: '3rem',
            height: '3rem',
            backgroundImage: `linear-gradient(#1A1A1A, #1A1A1A), linear-gradient(180deg, #666666 0%, #000000 100%)`,
            backgroundOrigin: 'border-box, border-box',
            backgroundClip: 'padding-box, border-box',
            border: '1px solid transparent',
          }}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" strokeWidth={2} />
        </button>
        <button
          onClick={goNext}
          className="w-13 h-13 rounded-full flex items-center justify-center"
          style={{
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(180deg, #E8FF5C 0%, #C6FF4D 100%)',
          }}
        >
          <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
