'use client'

import { motion, Variants } from 'framer-motion'

interface TitleWithLinesProps {
  title: string
  showLeftLine?: boolean
  showRightLine?: boolean
  variants?: Variants
  className?: string
  lineClassName?: string
  textClassName?: string
}

export default function TitleWithLines({
  title,
  showLeftLine = true,
  showRightLine = true,
  variants,
  className = '',
  lineClassName = '',
  textClassName = '',
}: TitleWithLinesProps) {
  return (
    <motion.div
      variants={variants}
      className={`flex items-center gap-3 mb-0 ${className}`}
    >
      {showLeftLine && (
        <span
          className={`w-32 h-0.5 bg-linear-to-r from-[#0A0A0B] to-primary ${lineClassName}`}
        />
      )}

      <span
        className={`font-archivo text-sm font-semibold tracking-widest capitalize text-primary whitespace-nowrap ${textClassName}`}
      >
        {title}
      </span>

      {showRightLine && (
        <span
          className={`w-32 h-0.5 bg-linear-to-r from-primary to-[#0A0A0B] ${lineClassName}`}
        />
      )}
    </motion.div>
  )
}
