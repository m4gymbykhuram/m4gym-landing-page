'use client'

import React, { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CustomButton from './CustomButton'
import { containerVariants, fadeUp, scaleIn } from '../../lib/motion-variants'
import TitleWithLines from './TitleWithLines'
import { useScreenSize } from '@/hooks/useScreenSize'

/* ─── Floating badge data ─── */
const badges = [
  {
    icon: '/svg/cloud.svg',
    title: 'Cloud Based',
    subtitle: 'Access anywhere',
    delay: 0,
  },
  {
    icon: '/svg/location.svg',
    title: 'Multi Location',
    subtitle: 'Manage all gyms',
    delay: 0.15,
  },
  {
    icon: '/svg/secure.svg',
    title: 'Secure',
    subtitle: 'Enterprise grade',
    delay: 0.3,
  },
]

/* ─── Stat strip ─── */
const stats = [
  { value: '2,452', label: 'Active Members' },
  { value: '$58K+', label: 'Monthly Revenue' },
  { value: '320', label: 'New Enrollments' },
]

// fixed card dimensions per design
const CARD_W = 100
const CARD_H = 100
const CARD_GAP = 36 // px of visible spacing between adjacent cards
const VISIBLE_COUNT = 8 // exactly this many cards are visible, always

export default function HeroSection() {
  const { isMobile } = useScreenSize()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  /* Parallax transforms */
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const dashboardY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  // images to display in carousel (16 total)
  const images = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1526322722331-8a4a6b3d6b6b?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1532619675605-3d9c1f4b7b23?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1518893061926-6d5d0b36490c?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=600&q=60',
  ]

  // --- Motion values for smooth auto-rotate (no user drag) ---
  const autoRotate = useMotionValue(0) // degrees
  const autoSpring = useSpring(autoRotate, { damping: 18, stiffness: 90 })
  const combinedRotateY = autoSpring

  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  const translateZ = React.useMemo(() => {
    const n = images.length
    const angleHalf = Math.PI / n
    const targetChord = CARD_W + CARD_GAP
    return Math.round(targetChord / (2 * Math.sin(angleHalf)))
  }, [images.length])

  // start a smooth auto-rotate loop (degrees per second)
  useEffect(() => {
    const speed = 8 // degrees per second, tweakable
    function loop(ts: number) {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      // always auto-rotate (no user drag)
      const next = (autoRotate.get() + dt * speed) % 360
      autoRotate.set(next)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTsRef.current = null
    }
  }, [autoRotate])

  // make the hero layout always column-based (stack headline above carousel)
  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-full xl:min-h-screen flex flex-col px-4 md:px-0 overflow-hidden bg-bg-base"
    >
      {/* ── Ambient glow background ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <img
          className="h-full w-full object-cover object-center"
          src={'/assets/hero-section-bg.png'}
        />
        <div
          className="absolute inset-0 opacity-75"
          style={{
            background: '#0A0A0B',
          }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full pt-28 lg:pt-36 pb-8 flex flex-col items-center gap-8 flex-1">
        {/* ── LEFT TEXT BLOCK ── */}
        <motion.div
          style={{ y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:max-w-xl"
        >
          {/* Label */}
          <div className="flex justify-center">
            <TitleWithLines
              title="Gym Management Platform"
              className="text-center mb-2"
            />
          </div>
          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-anton text-center uppercase mt-8 md:mt-0 leading-[1.05] text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white mb-4"
          >
            Run Your Entire Gym
            <br />
            From One Place
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="px-4 md:px-0 font-archivo text-center text-white/60 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
          >
            One organized system for owners, managers, trainers and members —
            replacing spreadsheets, paper attendance, scattered payment records
            and group-chat chaos.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <CustomButton
              text="How it Works"
              variant="filled"
              onClick={() => {}}
              className="cursor-pointer"
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D ROTATABLE CARDS CAROUSEL ── */}
        {/* mt-auto pushes this (and the badges below it) to the bottom of the hero */}
        <motion.div
          style={{ y: dashboardY }}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative flex items-center pt-25 justify-center w-full mt-auto"
        >
          {/* Glow halo */}
          <div className="absolute inset-0 rounded-3xl bg-primary/8 blur-3xl scale-90 pointer-events-none" />

          {/* 3D carousel container — width constrained so the ring stays tight */}
          <div
            className="relative w-full max-w-260 h-35 flex items-center justify-center"
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              style={
                {
                  transformStyle: 'preserve-3d',
                  rotateX: 8,
                  rotateY: combinedRotateY,
                } as any
              }
            >
              {images.map((src, i, arr) => {
                const angle = (360 / arr.length) * i
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-xl overflow-hidden shadow-2xl bg-[#0B0B0C]"
                    style={{
                      width: `${CARD_W}px`,
                      height: `${CARD_H}px`,
                      transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src={src}
                      alt={`card-${i}`}
                      className="w-full h-full object-cover block"
                      style={{ display: 'block' }}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
        {/* badges (kept) */}
        <div
          className={`hidden xl:inline-flex items-center rounded-3xl gradient-border-mask  px-2 py-2 `}
          style={{
            background: '#1A1A1A36',
          }}
        >
          {badges.map((stat, i) => (
            <div key={stat.title} className="flex items-center">
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
                  {stat.icon ? (
                    <img className="w-5 h-5" src={stat.icon} />
                  ) : (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: '#DFFF3D' }}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white font-archivo font-normal text-lg leading-tight whitespace-nowrap">
                    {stat.title}
                  </span>
                  <span className="text-white/45 font-archivo text-sm leading-tight whitespace-nowrap">
                    {stat.subtitle}
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
