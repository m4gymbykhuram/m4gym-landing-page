'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

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

/* ── Animation variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: 'easeOut' as const },
  }),
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

function SectionHeading({
  badge,
  title,
  align = 'left',
}: {
  badge: string
  title: string
  align?: 'left' | 'center' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-end' : ''}`}
    >
      <motion.div variants={slideLeft} className="flex items-start gap-2">
        <span className="w-60 bg-linear-to-r from-primary to-[#0A0A0B] text-bg-base text-start font-archivo font-bold text-sm px-4 py-4 rounded-xl uppercase tracking-widest">
          {badge}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-anton text-4xl sm:text-5xl uppercase text-white leading-tight"
      >
        {title}
      </motion.h2>
    </motion.div>
  )
}

export default function WhatInsited() {
  const rolesRef = useRef(null)
  const featuresRef = useRef(null)
  const rolesInView = useInView(rolesRef, { once: true, margin: '-80px' })
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' })

  return (
    <section
      id="what-insited"
      className="relative bg-[#111214] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#DDEB18]/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B7FF3C]/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">
        {/* ──────────────────────────────────────
            INTRO ROW
        ────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start mb-20">
          {/* Left description */}
          <motion.div
            ref={rolesRef}
            variants={slideLeft}
            initial="hidden"
            animate={rolesInView ? 'visible' : 'hidden'}
            className="flex-1 max-w-md"
          >
            <p className="font-archivo text-white/55 text-base sm:text-lg leading-relaxed">
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
              align="right"
            />
          </div>
        </div>

        {/* ──────────────────────────────────────
            ROLE CARDS GRID
        ────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={rolesInView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative flex items-end p-0 group border border-white/8 rounded-2xl overflow-hidden cursor-pointer`}
              style={{
                minHeight: '380px',
                backgroundImage: ` url(${role.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover, 100%',
              }}
            >
              {/* Content */}
              <div
                className="relative z-10 flex flex-col justify-end p-5 pt-16 h-max w-full lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  maskImage:
                    'linear-gradient(180deg, transparent 0%, black 25%)',
                  WebkitMaskImage:
                    'linear-gradient(180deg, transparent 0%, black 25%)',
                  // background:
                  //   'linear-gradient(180deg, rgba(17,18,20,0) 0%, rgba(17,18,20,0.55) 20%, rgba(17,18,20,0.92) 100%)',
                }}
              >
                {/* ID number */}
                <span className="font-archivo text-2xl sm:text-4xl font-semibold leading-none mb-3 text-primary">
                  {role.id}
                </span>

                {/* Title */}
                <h3 className="font-anton text-lg sm:text-3xl text-white uppercase mb-4 leading-tight">
                  {role.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-4">
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
