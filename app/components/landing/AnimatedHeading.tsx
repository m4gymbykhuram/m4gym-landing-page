'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface AnimatedHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  highlightClassName?: string
  once?: boolean
  amount?: number
  staggerDelay?: number
}

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function AnimatedHeading({
  text,
  as = 'h2',
  className = '',
  highlightClassName = 'text-primary',
  once = false,
  amount = 0.6,
  staggerDelay,
}: AnimatedHeadingProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })

  const MotionTag = motion[as]

  // Split text on **highlight** markers, keeping track of which parts are highlighted
  const segments = text.split(/(\*\*.*?\*\*)/g).filter(Boolean)

  const containerVariants: Variants = staggerDelay
    ? {
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
      }
    : headingContainer

  let wordIndex = 0

  return (
    <MotionTag
      ref={ref}
      className={`font-anton max-w-2xl text-center uppercase leading-tight text-white ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {segments.map((segment, si) => {
        const isHighlight = segment.startsWith('**') && segment.endsWith('**')
        const content = isHighlight ? segment.slice(2, -2) : segment

        return content.split(' ').map((word, wi) => {
          if (!word) return null
          wordIndex += 1
          return (
            <motion.span
              key={`${si}-${wi}-${wordIndex}`}
              className={`inline-block mr-[0.25em] ${isHighlight ? highlightClassName : ''}`}
              variants={wordVariant}
            >
              {word}
            </motion.span>
          )
        })
      })}
    </MotionTag>
  )
}

export default AnimatedHeading
