'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { fadeUp, slideLeft } from '@/lib/motion-variants'
import SectionHeading from './SectionHeading'
import { useScreenSize } from '@/hooks/useScreenSize'

/* ── Role cards data ── */
const roles = [
  {
    id: '01',
    title: 'GYM OWNER',
    tags: ['Revenue', 'Manage Staff', 'Manage Multiple Branches'],
    image: '/assets/gym-owner-bg.jpg',
    accent: '#DDEB18',
  },
  {
    id: '02',
    title: 'TRAINER / COACH',
    image: '/assets/trainer-bg.jpg',
    tags: ['Workout Plans', 'Client Progress', 'Session Booking'],
    accent: '#E0F300',
  },
  {
    id: '03',
    title: 'MANAGER',
    image: '/assets/manager-bg.png',
    tags: ['Schedule Classes', 'Staff Reports', 'Member Oversight'],
    accent: '#B7FF3C',
  },
  {
    id: '04',
    title: 'MEMBER',
    image: '/assets/member-bg.jpg',
    tags: ['Check-In', 'My Classes', 'Payment History'],
    accent: '#DDEB18',
  },
]

export default function WhatInsited() {
  const rolesRef = useRef(null)
  const rolesInView = useInView(rolesRef, { once: true, margin: '-80px' })
  const { isMobile } = useScreenSize()
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current
    if (!el) return
    isDragging.current = true
    startX.current = e.pageX - el.offsetLeft
    scrollLeft.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current
    if (!isDragging.current || !el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX.current) * 1.2 // drag speed multiplier
    el.scrollLeft = scrollLeft.current - walk
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  return (
    <section
      id="what-insited"
      className="relative bg-[#111214] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-125 h-125 rounded-full bg-primary/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-100 h-100 rounded-full bg-primary-light/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-2 md:px-2 pt-10 md:pt-24">
        <div className="flex flex-col-reverse md:flex-row gap-3 lg:gap-20 items-center md:items-start mb-10 md:mb-20">
          {/* Left description */}
          <motion.div
            ref={rolesRef}
            variants={slideLeft}
            initial="hidden"
            animate={rolesInView ? 'visible' : 'hidden'}
            className="flex-1 max-w-md"
          >
            <p className="font-archivo text-white/55 md:text-md lg:text-lg text-center md:text-start sm:text-lg leading-relaxed">
              Manage your gym efficiently with four dedicated roles: Owner,
              Manager, Coach, and Member. Each role has personalized access to
              simplify operations, training, and member management.
            </p>
          </motion.div>

          {/* Right heading */}
          <div className="flex-1">
            <SectionHeading
              badge="Inside Your Gym"
              title="Designed for Everyone"
              align={isMobile ? 'center' : 'right'}
            />
          </div>
        </div>

        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="flex overflow-x-auto scrollbar-hide gap-4 mb-24 -mx-4 pl-8 pr-4 snap-x snap-proximity scroll-smooth cursor-grab active:cursor-grabbing select-none lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:cursor-auto"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            scrollPaddingLeft: '2rem',
          }}
        >
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={rolesInView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative h-55 md:h-95 w-[65%] sm:w-[45%] lg:w-auto shrink-0 lg:shrink flex items-end p-0 group border border-white/8 rounded-2xl overflow-hidden cursor-pointer snap-start`}
              style={{
                backgroundImage: ` url(${role.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover, 100%',
              }}
            >
              {/* Content */}
              <div
                className="relative z-10 flex flex-col justify-end p-2 md:p-5 pt-16 h-max w-full lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  maskImage:
                    'linear-gradient(180deg, transparent 0%, black 25%)',
                  WebkitMaskImage:
                    'linear-gradient(180deg, transparent 0%, black 25%)',
                }}
              >
                {/* ID number */}
                <span className="font-archivo text-2xl sm:text-4xl font-semibold leading-none mb-2 md:mb-3 text-primary">
                  {role.id}
                </span>

                {/* Title */}
                <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase mb-2 md:mb-4 leading-tight">
                  {role.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 md:gap-4">
                  {role.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: role.accent }}
                      />
                      <span className="font-archivo text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
