'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import CustomButton from '../CustomButton'
import Image from 'next/image'

interface CardProps {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  range: [number, number]
  targetScale: number
  title: string
  description: string
  image: string
  imageAlt: string
  fit: string
}

const StickyCard = ({
  index,
  total,
  scrollYProgress,
  range,
  targetScale,
  title,
  description,
  image,
  imageAlt,
  fit,
}: CardProps) => {
  const targetRotation = index % 2 === 0 ? -3 : 3
  const scale = useTransform(scrollYProgress, range, [1, targetScale])
  const rotate = useTransform(scrollYProgress, range, [0, targetRotation])

  return (
    <div
      className="sticky top-20 md:top-24 flex items-start justify-center w-full pt-4 md:pt-6"
      style={{
        minHeight: index === total - 1 ? '75vh' : '70vh',
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
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
              <CustomButton
                text="Explore Feature"
                variant="outline"
                href="https://app.m4gym.com/"
                target="_blank"
                className="cursor-pointer"
                animate={true}
              />
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