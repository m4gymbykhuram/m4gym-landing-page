'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomButton from '../CustomButton'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface CardProps {
  index: number
  total: number
  progress: number
  range: [number, number]
  targetScale: number
  title: string
  description: string
  image: string
  imageAlt: string
  fit: string
  containerRef: React.RefObject<HTMLDivElement | null>
}

function mapRange(
  value: number,
  [inMin, inMax]: [number, number],
  [outMin, outMax]: [number, number],
) {
  if (inMax === inMin) return outMin
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

const StickyCard = ({
  index,
  total,
  progress,
  range,
  targetScale,
  title,
  description,
  image,
  imageAlt,
  fit,
  containerRef,
}: CardProps) => {
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pinRef.current
    const container = containerRef.current
    if (!el || !container) return

    // Pin each card until the BOTTOM of the whole section.
    // pinSpacing: false → cards stack on top of each other instead of pushing content down.
    // Result: cards stay sticky while in view and only the whole stack scrolls away
    // after the last card is reached.
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top+=80',          // stick a bit below the header
      endTrigger: container,
      end: 'bottom bottom',          // stay pinned until the entire section ends
      pin: true,
      pinSpacing: false,             // critical for stacking
      anticipatePin: 1,
    })

    return () => st.kill()
  }, [containerRef])

  const scale = mapRange(progress, range, [1, targetScale])
  const targetRotation = index % 2 === 0 ? -3 : 3
  const rotate = mapRange(progress, range, [0, targetRotation])

  return (
    <div
      ref={pinRef}
      className="flex items-start justify-center w-full pt-4 md:pt-6"
      style={{
        // Give each card enough height so the pin has room to work
        minHeight: index === total - 1 ? '75vh' : '70vh',
        zIndex: index + 1, // later cards sit on top
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          // slight vertical offset so the stack has depth
          top: `calc(2vh + ${index * 14}px)`,
        }}
        className="relative w-full max-w-6xl rounded-3xl border border-primary/25 bg-[#161718] p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(221,235,24,0.15),0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden origin-top transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(221,235,24,0.28)] will-change-transform"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Content */}
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

          {/* Image */}
          <div className="relative h-60 sm:h-76 lg:h-88 w-full overflow-hidden rounded-2xl will-change-transform">
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
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export { StickyCard }