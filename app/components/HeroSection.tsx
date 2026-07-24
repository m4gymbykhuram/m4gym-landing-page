'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
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

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-full md:min-h-screen flex flex-col px-4 md:px-0 overflow-hidden bg-bg-base"
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
      <div className="relative z-10 w-full pt-28 md:pt-36 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 flex-1">
        {/* ── LEFT TEXT BLOCK ── */}
        <motion.div
          style={{ y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 md:max-w-xl md:pl-20"
        >
          {/* Label */}
          <TitleWithLines
            title="Gym Management Platform"
            variants={fadeUp}
            showLeftLine={isMobile ? true : false}
          />

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-anton text-center md:text-start uppercase mt-8 md:mt-0 md:leading-[1.95] text-3xl sm:text-6xl lg:text-5xl text-white mb-6"
          >
            Run Your Entire Gym
            <br />
            From One Place
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="px-4 md:px-0 font-archivo text-center md:text-start text-white/60 text-base sm:text-md leading-relaxed mb-10 md:max-w-md"
          >
            One organized system for owners, managers, trainers and members —
            replacing spreadsheets, paper attendance, scattered payment records
            and group-chat chaos.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <CustomButton
              text="How it Works"
              variant="filled"
              onClick={() => {}}
              className="cursor-pointer"
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT DASHBOARD MOCKUP ── */}
        <motion.div
          style={{ y: dashboardY }}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="flex-1 relative flex items-center justify-center w-full max-w-2xl  lg:max-w-none"
        >
          {/* Glow halo behind mockup */}
          <div className="absolute inset-0 rounded-3xl bg-primary/8 blur-3xl scale-90 pointer-events-none" />

          <div
            className="mockup-image relative rounded-md "
            style={{
              border: '5px solid',
              borderImageSource:
                'linear-gradient(116.84deg, #DDEB18 0%, #FFFFFF 2.99%, #DDEB18 5.37%, #FFFFFF 7.55%, #DDEB18 9.72%, rgba(45, 45, 45, 0.93) 17.68%)',
              borderImageSlice: 1,
              borderRadius: '20px',
            }}
          >
            <Image
              src={'/assets/dashboard-mockup.png'}
              width={900}
              height={900}
              alt="dashboard-mockup "
              className="rounded-md"
            />
            {/* Gradient overlay: linear-gradient(180deg, rgba(10,10,11,0) 0%, #0A0A0B 100%) */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10, 10, 11, 0) 0%, #0A0A0B 100%)',
              }}
            />
          </div>
          {/* badges */}
          <div
            className={`hidden md:inline-flex items-center rounded-3xl absolute bottom-10 -left-30 px-2 py-2 `}
            style={{
              background: '#1A1A1A36',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0px 1px 8px rgba(0,0,0,0.4), inset 0px 1px 0px rgba(255,255,255,0.06)',
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
        </motion.div>
      </div>
    </section>
  )
}
