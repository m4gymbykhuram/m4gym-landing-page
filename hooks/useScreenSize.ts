'use client'

import { useState, useEffect } from 'react'

export type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop'

interface UseScreenSizeReturn {
  screenSize: ScreenSize
  width: number
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
}

// Adjust these to match your actual Tailwind breakpoints if they differ
const BREAKPOINTS = {
  mobile: 640, // < 640px  → mobile
  tablet: 1024, // 640–1023 → tablet
  laptop: 1440, // 1024–1439 → laptop
  // >= 1440 → desktop
}

function getScreenSize(width: number): ScreenSize {
  if (width < BREAKPOINTS.mobile) return 'mobile'
  if (width < BREAKPOINTS.tablet) return 'tablet'
  if (width < BREAKPOINTS.laptop) return 'laptop'
  return 'desktop'
}

export function useScreenSize(): UseScreenSizeReturn {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    handleResize() // sync on mount, in case SSR width (0) doesn't match client
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const screenSize = getScreenSize(width)

  return {
    screenSize,
    width,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isLaptop: screenSize === 'laptop',
    isDesktop: screenSize === 'desktop',
  }
}
