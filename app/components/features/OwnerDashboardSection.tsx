'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import CustomButton from '@/app/components/CustomButton'

export const ownerFeatures = [
  {
    label: 'Real-Time Business Dashboard',
    title: 'Real-Time Business Dashboard',
    description:
      'Track branch activity, revenue, attendance, and operations from one command center built for owners.',
    image: '/assets/dashboard-mockup.png',
    imageAlt: 'M4GYM business dashboard preview',
    fit: 'contain',
  },
  {
    label: 'Member Management',
    title: 'Member Management',
    description:
      'View member details, requests, plans, and account status without moving between disconnected tools.',
    image: '/assets/member-bg.jpg',
    imageAlt: 'Gym member management preview',
    fit: 'cover',
  },
  {
    label: 'Class & Schedule Oversight',
    title: 'Class & Schedule Oversight',
    description:
      'Keep class schedules, trainer assignments, and attendance windows clear for every location.',
    image: '/assets/calendar.png',
    imageAlt: 'Class and schedule calendar preview',
    fit: 'contain',
  },
  {
    label: 'Revenue & Financial Reports',
    title: 'Revenue & Financial Reports',
    description:
      'Review payment activity and revenue records with a focused owner view for smarter decisions.',
    image: '/assets/payment_records.png',
    imageAlt: 'Payment records preview',
    fit: 'contain',
  },
  {
    label: 'Equipment & Maintenance Tracking',
    title: 'Equipment & Maintenance Tracking',
    description:
      'Monitor equipment status, service needs, and inventory visibility before small issues become daily blockers.',
    image: '/assets/equipment.png',
    imageAlt: 'Equipment maintenance preview',
    fit: 'contain',
  },
]

interface CardProps {
  index: number
  title: string
  description: string
  image: string
  imageAlt: string
  fit: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

const StickyCard = ({
  index,
  title,
  description,
  image,
  imageAlt,
  fit,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Transform scale based on smooth spring-interpolated scroll progress
  const scale = useTransform(progress, range, [1, targetScale])

  // Skiper 34 style tilt effect: rotate card frame, counter-rotate image content
  const targetRotation = index % 2 === 0 ? -3 : 3
  const rotate = useTransform(progress, range, [0, targetRotation])
  const negateRotate = useTransform(rotate, (val) => -val)

  return (
    <div
      ref={containerRef}
      className="sticky top-16 md:top-20 flex items-start justify-center min-h-[65vh] w-full pt-4 md:pt-6"
    >
      <motion.div
        style={{
          scale,
          rotate,
          top: `calc(2vh + ${index * 18}px)`,
        }}
        className="relative w-full max-w-6xl rounded-3xl border border-primary/25 bg-[#161718] p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(221,235,24,0.15),0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden origin-top transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(221,235,24,0.28)] will-change-transform"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Card Header & Content */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4 border border-primary/20">
                0{index + 1} / OWNER DASHBOARD
              </span>
              <h3 className="font-anton text-2xl sm:text-4xl text-white uppercase leading-tight">
                {title}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="mt-4">
              <CustomButton text="Explore Feature" className="cursor-pointer" />
            </div>
          </div>

          {/* Card Image Preview with counter-rotation */}
          <motion.div
            style={{ rotate: negateRotate }}
            className="relative h-60 sm:h-76 lg:h-88 w-full overflow-hidden rounded-2xl  will-change-transform"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 600px"
              className={`transition-opacity duration-500 ${
                fit === 'cover' ? 'object-cover' : 'object-contain p-4'
              }`}
              priority={index === 0}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const FeatureOwnerDashboardSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress across the entire sticky cards section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Add spring physics smoothing for inertia-based scroll animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#080809] px-4 md:px-10 pt-12 pb-32 md:pb-28 mb-1 lg:mb-0"
    >
      {/* Section Title */}
      <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Command Center
        </span>
        <h2 className="font-anton text-3xl sm:text-5xl uppercase text-white leading-tight mt-2">
          Run Your Gym From One <span className="text-primary">Dashboard</span>
        </h2>
        <p className="mt-4 text-base text-white/50">
          Scroll down to explore the 5 core modules built specifically for gym
          owners.
        </p>
      </div>

      {/* Sticky Cards Stack */}
      <div className="relative mx-auto max-w-6xl flex flex-col items-center">
        {ownerFeatures.map((feature, index) => {
          const targetScale = 1 - (ownerFeatures.length - index) * 0.03
          const start = index / ownerFeatures.length
          const end = 1

          return (
            <StickyCard
              key={feature.label}
              index={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              fit={feature.fit}
              progress={smoothProgress}
              range={[start, end]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

export { FeatureOwnerDashboardSection, StickyCard }
