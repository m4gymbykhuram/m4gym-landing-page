'use client'

import React, { useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import gsap from 'gsap'
import CustomButton from './CustomButton'
import { containerVariants, fadeUp, scaleIn } from '../../lib/motion-variants'
import TitleWithLines from './TitleWithLines'
import { useScreenSize } from '@/hooks/useScreenSize'

const badges = [
  { icon: '/svg/cloud.svg',    title: 'Cloud Based',    subtitle: 'Access anywhere' },
  { icon: '/svg/location.svg', title: 'Multi Location', subtitle: 'Manage all gyms' },
  { icon: '/svg/secure.svg',   title: 'Secure',         subtitle: 'Enterprise grade' },
]

const stats = [
  { value: '2,452', label: 'Active Members' },
  { value: '$58K+', label: 'Monthly Revenue' },
  { value: '320',   label: 'New Enrollments' },
]

const CARD_W_DESKTOP = 150
const CARD_H_DESKTOP = 188
const CARD_W_MOBILE  = 90
const CARD_H_MOBILE  = Math.round((CARD_H_DESKTOP / CARD_W_DESKTOP) * CARD_W_MOBILE)
const CARD_GAP = 20
const SPEED = 32
const IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1671316149443-d722ef4f960d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1648995361141-30676a75fd27?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1659350776313-2223577feeda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const TRACK = [...IMAGES, ...IMAGES, ...IMAGES]

export default function HeroSection() {
  const { isMobile } = useScreenSize()
  const sectionRef   = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([])
  const CARD_W = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP
  const CARD_H = isMobile ? CARD_H_MOBILE : CARD_H_DESKTOP
  const CARD_SLOT = CARD_W + CARD_GAP
  const ONE_SET_PX = IMAGES.length * CARD_SLOT
  const containerWidthRef = useRef<number>(0)

  const { scrollYProgress } = useScroll({
     target: sectionRef,
     offset: ['start start', 'end start'],
   })

 const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
   const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
   const carouselY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  /* ── GSAP ticker: 3-D arc carousel, right-to-left ── */
  useEffect(() => {
    const containerEl = containerRef.current
    const sectionEl = sectionRef.current
    if (!containerEl || !sectionEl) return

    let x = -ONE_SET_PX
    let running = false

    // Measure width once up front, then only on resize — never inside the
    // per-frame loop.
    containerWidthRef.current = containerEl.offsetWidth || window.innerWidth
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) containerWidthRef.current = w
    })
    ro.observe(containerEl)

    const update = (_time: number, deltaTime: number) => {
      x -= SPEED * (deltaTime / 1000)
      if (x <= -(ONE_SET_PX * 2)) x += ONE_SET_PX

      const containerW = containerWidthRef.current
      const center = containerW / 2
      const arcNorm = containerW * 0.50

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const cardCenterX = i * CARD_SLOT + x + CARD_W / 2
        const relX        = cardCenterX - center
        const t           = relX / arcNorm
        const absT        = Math.abs(t)

        if (absT > 2.6) {
          card.style.opacity = '0'
          return
        }

        const clamped = Math.min(1, absT)
        const beyond  = Math.max(0, absT - 1)

        const ry = -(t * 42)
        const tz = (1 - clamped * clamped) * 220
        const ty = absT * 16
        const scale   = Math.max(0.55, 1 - beyond * 0.30)
        const opacity = beyond > 0.75
          ? Math.max(0, 1 - (beyond - 0.75) / 0.55)
          : 1

        const px = center + relX - CARD_W / 2

        card.style.transform = `translate3d(${px}px, ${ty}px, ${tz}px) rotateY(${ry}deg) scale(${scale})`
        card.style.opacity   = String(Math.max(0, opacity))
      })
    }

    // Only run the ticker while the hero section is actually on screen —
    // this stops ~48 elements from being recalculated every frame, forever,
    // long after the user has scrolled past this section.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          gsap.ticker.add(update)
          running = true
        } else if (!entry.isIntersecting && running) {
          gsap.ticker.remove(update)
          running = false
        }
      },
      { threshold: 0 },
    )
    io.observe(sectionEl)

    return () => {
      if (running) gsap.ticker.remove(update)
      io.disconnect()
      ro.disconnect()
    }
    // Re-run when isMobile flips (e.g. tablet rotation crossing the
    // breakpoint) since CARD_W/CARD_H/CARD_SLOT/ONE_SET_PX all derive from it.
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-full xl:min-h-screen flex flex-col px-4 md:px-0 overflow-hidden bg-bg-base"
    >
      {/* ── Background ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <img
          className="h-full w-full object-cover object-center"
          src="/assets/hero-section-bg.png"
          alt=""
        />
        <div className="absolute inset-0 opacity-75" style={{ background: '#0A0A0B' }} />
      </motion.div>

      {/* ── Main content column ── */}
      <div className="relative z-10 w-full pt-28 lg:pt-36 pb-8 flex flex-col items-center gap-8 flex-1">

        {/* ── Text block ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:max-w-xl"
        >
          <div className="flex justify-center">
            <TitleWithLines title="Gym Management Platform" className="text-center mb-2" />
          </div>

          <motion.h1
            variants={fadeUp}
            className="font-anton text-center uppercase mt-2 md:mt-0 leading-[1.05] text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white mb-4"
          >
            Run Your Entire Gym
            <br />
            From One Place
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="px-4 md:px-0 font-archivo text-center text-white/60 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
          >
            One organized system for owners, managers, trainers and members —
            replacing spreadsheets, paper attendance, scattered payment records
            and group-chat chaos.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <CustomButton
              text="Get Started"
              variant="filled"
              href="https://app.m4gym.com/"
              target="_blank"
              className="cursor-pointer"
              animate
            />
            <CustomButton
              text="How it Works"
              variant="outline"
              onClick={() => {
                const el = document.getElementById('how-it-works')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="cursor-pointer"
              animate={true}
            />
          </motion.div>
        </motion.div>

        {/* ── 3-D Arc Carousel ── */}
        <motion.div
          style={{ y: carouselY }}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="hidden lg:block w-full mt-auto pt-10"
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                width: '100%',
                height: `${CARD_H + 64}px`,
                perspective: '900px',
                perspectiveOrigin: '50% 55%',
                transformStyle: 'preserve-3d',
              }}
            >
              {TRACK.map((src, i) => (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  style={{
                    position: 'absolute',
                    top: `${(CARD_H + 64) / 2 - CARD_H / 2}px`,
                    left: 0,
                    width:  `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#111',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Badges ── */}
       <div
          className="hidden xl:inline-flex items-center rounded-3xl gradient-border-mask px-2 py-2"
          style={{ background: '#1A1A1A36' }}
        >
          {badges.map((badge, i) => (
            <div key={badge.title} className="flex items-center">
              <div className="flex items-center gap-4 px-6 py-4">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundImage: `linear-gradient(#1A1A1A, #1A1A1A), linear-gradient(180deg, #666666 0%, #000000 100%)`,
                    backgroundOrigin: 'border-box, border-box',
                    backgroundClip: 'padding-box, border-box',
                    border: '1px solid transparent',
                  }}
                >
                  {badge.icon ? (
                    <img className="w-5 h-5" src={badge.icon} alt="" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#DFFF3D' }} />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white font-archivo font-normal text-lg leading-tight whitespace-nowrap">
                    {badge.title}
                  </span>
                  <span className="text-white/45 font-archivo text-sm leading-tight whitespace-nowrap">
                    {badge.subtitle}
                  </span>
                </div>
              </div>

              {i < stats.length - 1 && (
                <span
                  className="w-px h-10 shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                />
              )}
            </div>
          ))}
        </div> 
      </div>
    </section>
  )
}