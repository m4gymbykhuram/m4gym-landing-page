'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronsRight } from 'lucide-react'
import { useScreenSize } from '@/hooks/useScreenSize'

interface CustomButtonProps {
  text: string
  onClick?: () => void
  variant?: 'filled' | 'outline'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  bg?: string
  circleBg?: string
  arrowColor?: string
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      text,
      onClick,
      variant = 'filled',
      className = '',
      type = 'button',
      disabled = false,
      bg,
      circleBg,
      arrowColor,
    },
    ref,
  ) => {
    const isFilled = variant === 'filled'
    const { isMobile } = useScreenSize()

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`inline-flex items-center rounded-full font-archivo font-semibold pl-1 pr-7 py-1 disabled:opacity-50 disabled:cursor-not-allowed ${
          isFilled ? 'text-black' : 'text-white border border-white/10'
        } ${className}`}
        style={{
          background: bg
            ? bg
            : isFilled
              ? 'linear-gradient(90deg, #C6FF4D 0%, #E8FF5C 100%)'
              : '#141414',
          boxShadow: isFilled
            ? 'none'
            : `0px 0px 2px rgba(0,0,0,0.3),
     0px 1px 8px rgba(0,0,0,0.35),
     inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.12),
     inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.14),
     inset -1px -1px 1px 0.5px rgba(255,255,255,0.1),
     inset 0px 0px 1px 1px rgba(255,255,255,0.1),
     inset 0px 0px 1px 1px rgba(153,153,153,0.4)`,
        }}
      >
        <span
          className="flex items-center justify-center rounded-full shrink-0 mr-4"
          style={{
            width: isMobile ? '2.2rem' : '2.75rem',
            height: isMobile ? '2.2rem' : '2.75rem',
            background: circleBg
              ? circleBg
              : isFilled
                ? '#0A0A0A'
                : 'linear-gradient(180deg, #E8FF5C 0%, #C6FF4D 100%)',
          }}
        >
          <ChevronsRight
            className="w-5 h-5"
            style={{
              color: arrowColor ? arrowColor : isFilled ? '#DFFF3D' : '#0A0A0A',
            }}
            strokeWidth={2.5}
          />
        </span>
        <span className="text-sm md:text-base">{text}</span>
      </motion.button>
    )
  },
)

CustomButton.displayName = 'CustomButton'

export default CustomButton
