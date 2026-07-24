'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CustomButton from '../CustomButton'

const tabs = [
  {
    id: 'members',
    label: 'Members / Requests',
    index: '/01',
    title: 'MEMBERS & REQUESTS',
    description:
      'Accept or reject join requests, open member details, assign trainers, freeze or reactivate memberships.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    imageAlt: 'Gym member performing barbell squat',
  },
  {
    id: 'goals',
    label: 'Goals & Workout plans',
    index: '/02',
    title: 'GOALS & WORKOUT PLANS',
    description:
      'Create personalised workout plans for each member, track progress milestones, and adjust programs in real time.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    imageAlt: 'Trainer coaching a client with workout plan',
  },
  {
    id: 'issues',
    label: 'Issues & Complaints',
    index: '/03',
    title: 'ISSUES & COMPLAINTS',
    description:
      'Log member complaints, track resolution status, and keep a full audit trail of every issue raised across all branches.',
    image:
      'https://images.unsplash.com/photo-1599058917765-a780eda501f3?w=800&q=80',
    imageAlt: 'Gym receptionist helping member at front desk',
  },
  {
    id: 'attendance',
    label: 'Attendance & Check In',
    index: '/04',
    title: 'ATTENDANCE & CHECK IN',
    description:
      'Staff mark members present, or members self check-in with QR code. Everyone keeps a clean, searchable attendance history.',
    image:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    imageAlt: 'Member scanning QR code at gym entrance',
  },
]

/* ── Animation variants ── */
const contentVariants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
}

const imageVariants = {
  enter: { opacity: 0, scale: 0.96, x: 20 },
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
  exit: { opacity: 0, scale: 0.96, x: -20, transition: { duration: 0.25 } },
}

export default function WhatWeOffer() {
  const [activeTab, setActiveTab] = useState(0)
  const active = tabs[activeTab]
  const tabHasDraggedSignificantly = useRef(false)

  const constraintsRef = useRef<HTMLDivElement>(null)
  const [dragStartX, setDragStartX] = useState(0)
  const hasDraggedSignificantly = useRef(false)

  const handleTabClick = (index: number) => {
    if (hasDraggedSignificantly.current) {
      hasDraggedSignificantly.current = false
      return
    }
    setActiveTab(index)
  }
  return (
    <section
      id="what-we-offer"
      className="relative bg-bg-base py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#DDEB18]/5 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* ── Section heading ── */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="bg-primary text-bg-base font-archivo font-bold text-sm uppercase tracking-[0.2em] px-5 py-4 rounded-xl mb-6">
            What We Offer
          </span>
          <h2 className="font-anton uppercase text-3xl sm:text-4xl  xl:text-[44px] text-white leading-tight max-w-2xl">
            Turning Repetitive Work Into Time-Saving Systems
          </h2>
        </div>

        <div
          ref={constraintsRef}
          className="relative max-w-full md:max-w-fit mx-auto mb-8 overflow-hidden bg-transparent sm:bg-bg-card border-0 sm:border sm:border-white/8 rounded-full"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            dragTransition={{ power: 0.15, timeConstant: 200 }}
            onDragStart={(e, info) => {
              hasDraggedSignificantly.current = false
              setDragStartX(info.point.x)
            }}
            onDrag={(e, info) => {
              if (Math.abs(info.point.x - dragStartX) > 5) {
                hasDraggedSignificantly.current = true
              }
            }}
            className="relative flex items-center gap-1 w-fit p-0 sm:p-1.5 pr-0 cursor-grab active:cursor-grabbing"
            role="tablist"
            aria-label="Feature tabs"
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTabClick(i)}
                className={`
          relative shrink-0 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-archivo font-medium text-sm sm:text-md
          transition-colors duration-200 whitespace-nowrap cursor-pointer
          ${
            activeTab === i
              ? 'bg-linear-to-b from-[#111214]/18 to-[#dde118]/18 text-white shadow-sm'
              : 'text-white/50 hover:text-white/80'
          }
        `}
              >
                {activeTab === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[#1e1e0e] border border-primary/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10 pointer-events-none">
                  {tab.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Content card ── */}
        <div
          className="relative bg-[#111] border border-white/8 rounded-4xl overflow-hidden"
          style={{ minHeight: '320px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col md:flex-row items-stretch gap-8 p-8 md:p-10"
            >
              {/* Left: text content */}
              <motion.div
                variants={contentVariants}
                className="flex-1 flex flex-col justify-center gap-2 md:gap-5"
              >
                {/* Index number */}
                <span className="font-anton text-2xl text-primary">
                  {active.index}
                </span>

                {/* Title */}
                <h3 className="font-anton text-2xl md:text-3xl text-white uppercase leading-tight">
                  {active.title}
                </h3>

                {/* Description */}
                <p className="font-archivo text-white/55 text-sm md:text-base leading-relaxed max-w-md">
                  {active.description}
                </p>

                {/* CTA */}
                <div className="mt-2">
                  <CustomButton
                    text="Get Started"
                    variant="filled"
                    className="cursor-pointer"
                  />
                </div>
              </motion.div>

              {/* Right: image with corner brackets */}
              <motion.div
                variants={imageVariants}
                className="relative flex-1 min-h-[200px] md:min-h-[240px] md:max-w-[440px] overflow-hidden"
              >
                {/* Corner brackets decoration (matching reference image) */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary z-20 pointer-events-none" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary z-20 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority={activeTab === 0}
                />

                {/* Dark vignette on left edge for blend */}
                <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-[#111] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-r from-transparent to-[#111]  z-10" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
