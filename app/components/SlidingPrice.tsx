'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface SlidingPriceProps {
  value: string
  className?: string
}

export default function SlidingPrice({
  value,
  className = '',
}: SlidingPriceProps) {
  const characters = value.split('')

  return (
    <span className={`inline-flex ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[1.2em]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${char}-${index}-${value}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.03,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}
