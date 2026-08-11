'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  '12 MODULES',
  '4 ROLES',
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
    <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-primary-gradient shadow-[0_0_8px_#DDEB18aa]" />
  )
}

function ItemRow({
  item,
  hidden = false,
}: {
  item: string
  hidden?: boolean
}) {
  return (
    <div
      className="flex items-center gap-5 px-6 whitespace-nowrap select-none"
      aria-hidden={hidden}
    >
      <BulletDot />

      <span className="font-anton font-normal text-md tracking-[0.18em] uppercase text-white/70 hover:text-[#DDEB18] transition-colors duration-200 cursor-default">
        {item}
      </span>
    </div>
  )
}

export default function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null)

  // Only controls whether the CSS marquee runs.
  // It does NOT hide the section.
  const inView = useInView(ref, {
    margin: '-100px',
  })

  return (
    <motion.div
      ref={ref}
      className="relative z-20 w-full overflow-hidden border-y border-white/8 bg-bg-elevated"
      aria-label="Feature highlights"
    >
      {/* Top hairline accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#DDEB18]/40 to-transparent" />

      <div className="py-4 overflow-hidden">
        <div
          className="marquee-track"
          style={{
            animationPlayState: inView ? 'running' : 'paused',
          }}
        >
          {items.map((item, idx) => (
            <ItemRow
              key={`a-${item}-${idx}`}
              item={item}
            />
          ))}

          {/* Duplicate copy for seamless marquee loop */}
          {items.map((item, idx) => (
            <ItemRow
              key={`b-${item}-${idx}`}
              item={item}
              hidden
            />
          ))}
        </div>
      </div>

      {/* Bottom hairline accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DDEB18]/40 to-transparent" />

      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg-elevated to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg-elevated to-transparent" />
    </motion.div>
  )
}