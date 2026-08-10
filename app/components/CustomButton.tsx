'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronsRight } from 'lucide-react'

interface CustomButtonProps {
  text: string
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
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
      href,
      target,
      rel = 'noopener noreferrer',
      variant = 'filled',
      className = '',
      type = 'button',
      disabled = false,
      bg,
      circleBg,
      arrowColor,
      animate = true,
      textCenter,
    },
    ref,
  ) => {
    const isFilled = variant === 'filled'

    // ==========================================
    // Navigation
    // ==========================================

    const targetHref =
      href ||
      (text.toLowerCase().includes('get started')
        ? 'https://app.m4gym.com/'
        : undefined)

    const resolvedTarget =
      target ||
      (targetHref?.startsWith('http') ? '_blank' : '_self')

    const handleClick = () => {
      onClick?.()

      if (!targetHref) return

      if (targetHref.startsWith('http')) {
        window.open(
          targetHref,
          resolvedTarget,
          'noopener,noreferrer',
        )
      } else {
        window.location.href = targetHref
      }
    }

    // ==========================================
    // Colors
    // ==========================================

    const resolvedBg =
      bg ||
      (isFilled
        ? 'linear-gradient(90deg, #C6FF4D 0%, #E8FF5C 100%)'
        : '#141414')

    const resolvedCircleBg =
      circleBg ||
      (isFilled
        ? '#0A0A0A'
        : 'linear-gradient(180deg, #E8FF5C 0%, #C6FF4D 100%)')

    const resolvedArrowColor =
      arrowColor ||
      (isFilled
        ? '#DFFF3D'
        : '#0A0A0A')

    // ==========================================
    // Button styles
    // ==========================================

    const buttonClass = `
      relative
      inline-flex
      items-center
      rounded-full
      font-archivo
      font-semibold
      pl-1
      py-1
      overflow-hidden
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${
        isFilled
          ? 'text-black'
          : 'text-white border border-[#2D2D2D]'
      }
      ${textCenter ? 'pr-1' : 'pr-7'}
      ${className}
    `

    const buttonStyle = {
      background: resolvedBg,

      boxShadow: isFilled
        ? 'none'
        : `
          0px 0px 2px rgba(0,0,0,0.3),
          0px 1px 8px rgba(0,0,0,0.35),
          inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.12),
          inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.14),
          inset -1px -1px 1px 0.5px rgba(255,255,255,0.1),
          inset 0px 0px 1px 1px rgba(255,255,255,0.1),
          inset 0px 0px 1px 1px rgba(153,153,153,0.4)
        `,
    }

    // ==========================================
    // NON-ANIMATED VERSION
    // ==========================================

    if (!animate) {
      return (
        <motion.button
          ref={ref}
          type={type}
          onClick={handleClick}
          disabled={disabled}
          className={`
            relative
            inline-flex
            items-center
            rounded-full
            font-archivo
            font-semibold
            pl-1
            py-1
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${
              isFilled
                ? 'text-black'
                : 'text-white border border-white/10'
            }
            ${textCenter ? 'pr-1' : 'pr-7'}
            ${className}
          `}
          style={buttonStyle}
        >
          {/* ==============================
              LEFT ICON
          =============================== */}

          <span
            className="
              flex
              items-center
              justify-center
              rounded-full
              shrink-0
              w-[2.2rem]
              h-[2.2rem]
              md:w-[2.75rem]
              md:h-[2.75rem]
            "
            style={{
              background: resolvedCircleBg,
              marginRight: textCenter ? 0 : '1rem',
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{
                color: resolvedArrowColor,
              }}
              strokeWidth={2.5}
            />
          </span>

          {/* ==============================
              TEXT
          =============================== */}

          {textCenter ? (
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base">
              {text}
            </span>
          ) : (
            <span className="text-sm md:text-base">
              {text}
            </span>
          )}
        </motion.button>
      )
    }

    // ==========================================
    // ANIMATION SETTINGS
    // ==========================================

    const expandDuration = 0.55
    const exitDuration = 0.35
    const revealDelay = 0.25
    const revealDuration = 0.3

    /*
     * Outline:
     *
     * REST:
     * dark button
     * lime left circle
     *
     * HOVER:
     * lime expands from left
     * text becomes black
     * black circle appears on right
     *
     *
     * Filled:
     *
     * REST:
     * lime button
     * black left circle
     *
     * HOVER:
     * button remains lime
     * no black overlay
     * black right circle appears
     */

    const hoverBackground = isFilled
      ? resolvedBg
      : resolvedCircleBg

    const hoverTextColor = '#0A0A0A'

    const hoverIconBg = '#0A0A0A'

    const hoverIconColor = '#DFFF3D'

    // ==========================================
    // ANIMATED VERSION
    // ==========================================

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={buttonClass}
        style={buttonStyle}
      >
        {/* ======================================
            1. EXPANDING HOVER BACKGROUND
        ======================================= */}

        <motion.span
          aria-hidden
          className="
            absolute
            -left-10
            top-0
            bottom-0
            rounded-full
            pointer-events-none
            z-10
          "
          style={{
            background: hoverBackground,
          }}
          variants={{
            rest: {
              width: '2.2rem',
              opacity: isFilled ? 0 : 1,
              transition: {
                duration: expandDuration,
                ease: [0.4, 0, 0.2, 1],
              },
            },

            hover: {
              width: '140%',
              opacity: 1,
              transition: {
                duration: expandDuration,
                ease: [0.4, 0, 0.2, 1],
              },
            },
          }}
        />

        {/* ======================================
            2. ORIGINAL CONTENT
        ======================================= */}

        <motion.span
          className="
            relative
            z-20
            inline-flex
            items-center
            w-full
          "
          variants={{
            rest: {
              x: 0,
              opacity: 1,
              transition: {
                duration: exitDuration,
                ease: [0.4, 0, 0.2, 1],
              },
            },

            hover: {
              x: '110%',
              opacity: 0,
              transition: {
                duration: exitDuration,
                ease: [0.4, 0, 0.2, 1],
              },
            },
          }}
        >
          {/* ==================================
              LEFT CIRCLE
          =================================== */}

          <span
            className="
              flex
              items-center
              justify-center
              rounded-full
              shrink-0
              w-[2.2rem]
              h-[2.2rem]
              md:w-[2.75rem]
              md:h-[2.75rem]
            "
            style={{
              background: resolvedCircleBg,
              marginRight: textCenter ? 0 : '1rem',
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{
                color: resolvedArrowColor,
              }}
              strokeWidth={2.5}
            />
          </span>

          {/* ==================================
              ORIGINAL TEXT
          =================================== */}

          {textCenter ? (
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base">
              {text}
            </span>
          ) : (
            <span className="text-sm md:text-base">
              {text}
            </span>
          )}
        </motion.span>

        {/* ======================================
            3. HOVER CONTENT
        ======================================= */}

        <motion.span
          aria-hidden
          className="
            absolute
            inset-0
            z-30
            pointer-events-none
          "
          variants={{
            rest: {
              opacity: 0,
            },

            hover: {
              opacity: 1,
              transition: {
                delay: revealDelay,
                duration: revealDuration,
              },
            },
          }}
        >
          {/* ==================================
              HOVER TEXT
          =================================== */}

          <motion.span
            className="
              absolute
              inset-y-0
              left-2
              right-12
              md:left-3
              md:right-14
              flex
              items-center
              justify-center
              text-sm
              md:text-base
              font-semibold
              whitespace-nowrap
            "
            style={{
              color: hoverTextColor,
            }}
            variants={{
              rest: {
                x: '-40%',
              },

              hover: {
                x: 0,
                transition: {
                  delay: revealDelay,
                  duration: revealDuration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {text}
          </motion.span>

          {/* ==================================
              RIGHT CIRCLE
          =================================== */}

          <motion.span
            className="
              absolute
              right-1
              top-1/2
              -translate-y-1/2
              flex
              items-center
              justify-center
              rounded-full
              shrink-0
              w-[2.2rem]
              h-[2.2rem]
              md:w-[2.75rem]
              md:h-[2.75rem]
            "
            style={{
              background: hoverIconBg,
            }}
            variants={{
              rest: {
                scale: 0.85,
                opacity: 0,
              },

              hover: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: revealDelay,
                  duration: revealDuration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <ChevronsRight
              className="w-5 h-5"
              style={{
                color: hoverIconColor,
              }}
              strokeWidth={2.5}
            />
          </motion.span>
        </motion.span>
      </motion.button>
    )
  },
)

CustomButton.displayName = 'CustomButton'

export default CustomButton