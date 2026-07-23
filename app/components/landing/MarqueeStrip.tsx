'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const items = [
  '12 MODULES',
  '4  ROLES',
  'INVENTORY',
  'MULTI BRANCHES',
  'PAYMENTS',
  'CLASS SCHEDULING',
  'ATTENDANCE',
  'MEMBER MANAGEMENT',
  'REPORTS & ANALYTICS',
  'MOBILE APP',
]

function BulletDot() {
  return (
    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary-gradient shadow-[0_0_8px_#DDEB18aa]" />
  )
}

export default function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /* Subtle parallax on the strip itself */
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  /* Duplicate items for seamless loop */
  const doubled = [...items, ...items]

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative z-20 w-full overflow-hidden border-y border-white/8 bg-bg-elevated"
      aria-label="Feature highlights marquee"
    >
      {/* Top hairline accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DDEB18]/40 to-transparent" />

      <div className="py-4 overflow-hidden">
        <div className="marquee-track">
          {doubled.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="flex items-center gap-5 px-6 whitespace-nowrap select-none"
            >
              <BulletDot />
              <span className="font-anton font-normal text-md tracking-[0.18em] uppercase text-white/70 hover:text-[#DDEB18] transition-colors duration-200 cursor-default">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hairline accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DDEB18]/40 to-transparent" />

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10" />
    </motion.div>
  )
}
