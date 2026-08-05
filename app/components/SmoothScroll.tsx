'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: any
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // expose lenis to window for global access (so other utilities can call scrollTo)
    try {
      window.__lenis = lenis
    } catch (e) {
      // ignore if window is not writable
    }

    function raf(time: number) {
      // guard in case lenis was destroyed while an RAF was queued
      if (lenisRef.current) lenisRef.current.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    // start the loop and store the id so it can be cancelled
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      // cancel any pending RAF to stop the loop
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null

      // destroy lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }

      // remove global reference
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete window.__lenis
      } catch (e) {
        // ignore
      }
    }
  }, [])

  return <>{children}</>
}
