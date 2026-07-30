'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  animate?: boolean
  textCenter?: boolean
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
      animate = false,
      textCenter,
    },
    ref,
  ) => {
    const isFilled = variant === 'filled'
    const { isMobile } = useScreenSize()

    const circleSize = isMobile ? '2.2rem' : '2.75rem'

    const resolvedBg = bg
      ? bg
      : isFilled
        ? 'linear-gradient(90deg, #C6FF4D 0%, #E8FF5C 100%)'
        : '#141414'

    const resolvedCircleBg = circleBg
      ? circleBg
      : isFilled
        ? '#0A0A0A'
        : 'linear-gradient(180deg, #E8FF5C 0%, #C6FF4D 100%)'

    const resolvedArrowColor = arrowColor
      ? arrowColor
      : isFilled
        ? '#DFFF3D'
        : '#0A0A0A'

    /* ── Non-animated variant ── */
    if (!animate) {
      return (
        <motion.button
          ref={ref}
          type={type}
          onClick={onClick}
          disabled={disabled}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative inline-flex items-center rounded-full font-archivo font-semibold pl-1 py-1 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFilled ? 'text-black' : 'text-white border border-white/10'
          } ${textCenter ? 'pr-1' : 'pr-7'} ${className}`}
          style={{
            background: resolvedBg,
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
          {/* Icon pill — always left */}
          <span
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: circleSize,
              height: circleSize,
              background: resolvedCircleBg,
              marginRight: textCenter ? 0 : '1rem',
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{ color: resolvedArrowColor }}
              strokeWidth={2.5}
            />
          </span>

          {/* Text — centered over full button width when textCenter, inline otherwise */}
          {textCenter ? (
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base">
              {text}
            </span>
          ) : (
            <span className="text-sm md:text-base">{text}</span>
          )}
        </motion.button>
      )
    }

    /* ── Animated variant ── */
    /*
     * Layout: `relative overflow-hidden` pill container.
     *
     * Layers (bottom → top):
     *  1. Expanding circle  — absolutely positioned, grows from left to full width on hover
     *  2. Original row      — [circle icon] [label]  slides right & fades out on hover
     *  3. Centered reveal   — [icon + label] centred, fades in after expansion
     */

    // Timing constants (seconds)
    const expandDur = 0.62
    const revealDelay = 0.4
    const revealDur = 0.38
    const exitDur = 0.46

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={`group relative inline-flex items-center rounded-full font-archivo font-semibold pl-1 py-1 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
          isFilled ? 'text-black' : 'text-white border border-white/10'
        } ${textCenter ? 'pr-1' : 'pr-7'} ${className}`}
        style={{
          background: resolvedBg,
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
        {/* ── Layer 1: Expanding fill circle ── */}
        {/*
         * Anchored at left-0 / top-0 / bottom-0 so it fills edge-to-edge
         * with no gap on the left. Resting height = full button height;
         * resting width = circleSize (visually identical to the icon pill).
         */}
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 rounded-full pointer-events-none z-10"
          style={{
            background: resolvedCircleBg,
            width: circleSize,
          }}
          variants={{
            rest: {
              width: circleSize,
              borderRadius: '9999px',
              transition: { duration: expandDur, ease: [0.4, 0, 0.2, 1] },
            },
            hover: {
              width: '100%',
              borderRadius: '9999px',
              transition: { duration: expandDur, ease: [0.4, 0, 0.2, 1] },
            },
          }}
        />

        {/* ── Layer 2: Original row — slides right out on hover ── */}
        <motion.span
          className="relative z-20 inline-flex items-center w-full"
          variants={{
            rest: {
              x: 0,
              opacity: 1,
              transition: { duration: exitDur, ease: [0.4, 0, 0.2, 1] },
            },
            hover: {
              x: '110%',
              opacity: 0,
              transition: { duration: exitDur, ease: [0.4, 0, 0.2, 1] },
            },
          }}
        >
          {/* Icon pill — always left */}
          <span
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: circleSize,
              height: circleSize,
              background: resolvedCircleBg,
              marginRight: textCenter ? 0 : '1rem',
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{ color: resolvedArrowColor }}
              strokeWidth={2.5}
            />
          </span>

          {/* Text — centered over full button or inline */}
          {textCenter ? (
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base">
              {text}
            </span>
          ) : (
            <span className="text-sm md:text-base">{text}</span>
          )}
        </motion.span>

        {/* ── Layer 3: Reveal — text slides left-edge→center, icon fades in place ── */}
        {/*
         * The wrapper only handles opacity.
         * Text label is its own motion.span: starts at x:'-50%' which, on an
         * inset-0 span (= full button width W), translates by -W/2 — placing
         * the centered content exactly at the button's left edge — then slides
         * to x:0 (natural center). Overflow-hidden on the button clips the rest.
         * Icon pill is a plain span; it just fades with the wrapper, staying
         * pinned at the right corner throughout.
         */}
        <motion.span
          aria-hidden
          className="absolute inset-0 z-30 pointer-events-none"
          variants={{
            rest: {
              opacity: 0,
              transition: { duration: 0.18 },
            },
            hover: {
              opacity: 1,
              transition: {
                delay: revealDelay,
                duration: revealDur,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {/* Text — slides from left edge (x:'-50%') to center (x:0) */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-semibold"
            style={{ color: isFilled ? '#0A0A0A' : '#DFFF3D' }}
            variants={{
              rest: {
                x: '-50%',
                transition: { duration: 0.18 },
              },
              hover: {
                x: 0,
                transition: {
                  delay: revealDelay,
                  duration: revealDur,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {text}
          </motion.span>

          {/* Icon pill — right-edge corner, fades only (no slide) */}
          <span
            className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full shrink-0"
            style={{
              width: circleSize,
              height: circleSize,
              background: resolvedCircleBg,
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{ color: resolvedArrowColor }}
              strokeWidth={2.5}
            />
          </span>
        </motion.span>
      </motion.button>
    )
  },
)

CustomButton.displayName = 'CustomButton'

export default CustomButton
