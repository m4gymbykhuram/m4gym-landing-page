'use client'

import { useEffect, useState } from 'react'

export type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop'

interface UseScreenSizeReturn {
  screenSize: ScreenSize
  width: number | null
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  mounted: boolean
}

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  laptop: 1440,
}

function getScreenSize(width: number): ScreenSize {
  if (width < BREAKPOINTS.mobile) return 'mobile'
  if (width < BREAKPOINTS.tablet) return 'tablet'
  if (width < BREAKPOINTS.laptop) return 'laptop'
  return 'desktop'
}

export function useScreenSize(): UseScreenSizeReturn {
  const [mounted, setMounted] = useState(false)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)

    update()
    setMounted(true)

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const screenSize =
    width === null ? 'desktop' : getScreenSize(width)

  return {
    mounted,
    width,
    screenSize,
    isMobile: mounted && screenSize === 'mobile',
    isTablet: mounted && screenSize === 'tablet',
    isLaptop: mounted && screenSize === 'laptop',
    isDesktop: mounted && screenSize === 'desktop',
  }
}