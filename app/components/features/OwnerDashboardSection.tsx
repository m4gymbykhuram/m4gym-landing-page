'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { StickyCard } from './StickyCard'
import { ownerFeatures } from './ownerFeatures'

const FeatureOwnerDashboardSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress is a MotionValue — no React state, no re-renders
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
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
              scrollYProgress={scrollYProgress}
              range={[start, end]}
              index={index}
              total={ownerFeatures.length}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              fit={feature.fit}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

export { FeatureOwnerDashboardSection }