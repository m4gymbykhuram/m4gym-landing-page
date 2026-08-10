'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { fadeUp, slideLeft } from '@/lib/motion-variants'
import SectionHeading from './SectionHeading'
import { useScreenSize } from '@/hooks/useScreenSize'

/* ── Role cards data ── */
const roles = [
  {
    id: '01',
    title: 'GYM OWNER',
    tags: ['Revenue', 'Manage Staff', 'Manage Multiple Branches'],
    image: '/images/GYM-OWNER.jpg',
    accent: '#DDEB18',
  },
  {
    id: '02',
    title: 'TRAINER / COACH',
    image: '/images/TRAINER.jpg',
    tags: ['Workout Plans', 'Client Progress', 'Session Booking'],
    accent: '#E0F300',
  },
  {
    id: '03',
    title: 'MANAGER',
    image: '/images/MANAGER.jpg',
    tags: ['Schedule Classes', 'Staff Reports', 'Member Oversight'],
    accent: '#B7FF3C',
  },
  {
    id: '04',
    title: 'MEMBER',
    image: '/images/MEMBER.jpg',
    tags: ['Check-In', 'My Classes', 'Payment History'],
    accent: '#DDEB18',
  },
]

/* ──────────────────────────────────────────────────
   Individual role card (shared between mobile & desktop)
────────────────────────────────────────────────── */
function RoleCard({
  role,
  className = '',
}: {
  role: (typeof roles)[number]
  className?: string
}) {
  return (
    <div
      className={`relative flex items-end group border border-white/8 rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        backgroundImage: `url(${role.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Gradient overlay — always present, dims on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-end p-5 pt-16 h-max w-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 25%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 25%)',
        }}
      >
        <span className="font-archivo text-4xl font-semibold leading-none mb-3 text-primary">
          {role.id}
        </span>
        <h3 className="font-anton text-3xl text-white uppercase mb-4 leading-tight">
          {role.title}
        </h3>
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
    </div>
  )
}

/* ──────────────────────────────────────────────────
   Desktop infinite marquee
   – Duplicates the card list so the seam is invisible
   – Animates x from 0 → -50% (one full copy width)
   – Pauses when any card is hovered; resumes smoothly
────────────────────────────────────────────────── */

/** px gap between cards */
const CARD_GAP = 20
/** card width in px — keep in sync with the inline style below */
const CARD_W = 340
/** scroll speed: pixels per second */
const SPEED = 60

function DesktopMarquee() {
  const controls = useAnimation()
  const isPaused = useRef(false)
  /** accumulated x offset when we paused, so we resume from the right place */
  const currentX = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  // Total width of ONE set of cards (used to loop seamlessly)
  const setWidth = roles.length * (CARD_W + CARD_GAP)

  /* ── rAF-based scroller ── */
  const tick = useCallback(
    (timestamp: number) => {
      if (isPaused.current) return
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp

      const delta = (timestamp - lastTimeRef.current) / 1000 // seconds
      lastTimeRef.current = timestamp

      currentX.current -= SPEED * delta

      // Loop: when we've scrolled one full set, reset seamlessly
      if (Math.abs(currentX.current) >= setWidth) {
        currentX.current = 0
      }

      controls.set({ x: currentX.current })
      rafRef.current = requestAnimationFrame(tick)
    },
    [controls, setWidth],
  )

  const startScroll = useCallback(() => {
    lastTimeRef.current = null
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pauseScroll = useCallback(() => {
    isPaused.current = true
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const resumeScroll = useCallback(() => {
    isPaused.current = false
    startScroll()
  }, [startScroll])

  useEffect(() => {
    startScroll()
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [startScroll])

  /* ── Render two copies of the card list side-by-side for seamless loop ── */
  const cardList = [...roles, ...roles]

  return (
    /* Outer clip — hides overflow so only the viewport strip is visible */
    <div
      className="relative overflow-hidden mb-24"
      /* Fade edges with mask */
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <motion.div
        animate={controls}
        className="flex"
        style={{ gap: CARD_GAP, willChange: 'transform' }}
      >
        {cardList.map((role, i) => (
          <motion.div
            key={`${role.id}-${i}`}
            style={{ width: CARD_W, flexShrink: 0 }}
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onHoverStart={pauseScroll}
            onHoverEnd={resumeScroll}
          >
            <RoleCard role={role} className="h-95 w-full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ──────────────────────────────────────────────────
   Main section
────────────────────────────────────────────────── */
export default function WhatInsited() {
  const sectionRef = useRef<HTMLElement>(null)
  const rolesRef = useRef(null)
  const rolesInView = useInView(rolesRef, { once: true, margin: '-80px' })
  const { isMobile } = useScreenSize()

  /* ── Mobile drag-scroll ── */
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
    const walk = (x - startX.current) * 1.2
    el.scrollLeft = scrollLeft.current - walk
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  return (
    <section
      ref={sectionRef}
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
      </div>

      {/* ── Mobile: drag-scroll row ── */}
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="flex overflow-x-auto scrollbar-hide gap-4 mb-10 px-4 snap-x snap-proximity scroll-smooth cursor-grab active:cursor-grabbing select-none lg:hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          scrollPaddingLeft: '1rem',
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
            className="relative h-55 md:h-95 w-[65%] sm:w-[45%] shrink-0 flex items-end group border border-white/8 rounded-2xl overflow-hidden cursor-pointer snap-start"
            style={{
              backgroundImage: `url(${role.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {/* Content */}
            <div
              className="relative z-10 flex flex-col justify-end p-2 md:p-5 pt-16 h-max w-full"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                maskImage: 'linear-gradient(180deg, transparent 0%, black 25%)',
                WebkitMaskImage:
                  'linear-gradient(180deg, transparent 0%, black 25%)',
              }}
            >
              <span className="font-archivo text-2xl sm:text-4xl font-semibold leading-none mb-2 md:mb-3 text-primary">
                {role.id}
              </span>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase mb-2 md:mb-4 leading-tight">
                {role.title}
              </h3>
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

      {/* ── Desktop: infinite auto-scroll marquee ── */}
      <div className="hidden lg:block">
        <DesktopMarquee />
      </div>
    </section>
  )
}
