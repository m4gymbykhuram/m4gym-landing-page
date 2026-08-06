'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // disable browser automatic scroll restoration to avoid it interfering
    if ('scrollRestoration' in history) {
      try {
        history.scrollRestoration = 'manual'
      } catch (e) {
        // ignore
      }
    }

    // helper to attempt multiple resets (native + lenis) spaced slightly apart
    const doReset = () => {
      try {
        // native snap
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        if (document.documentElement) document.documentElement.scrollTop = 0
        if (document.body) document.body.scrollTop = 0

        // if a global lenis instance exists, call its scrollTo with immediate flag
        const anyWin = window as any
        if (anyWin?.__lenis?.scrollTo) {
          try {
            anyWin.__lenis.scrollTo(0, { immediate: true })
          } catch (e) {
            // sometimes lenis API variations; try simple call
            try {
              anyWin.__lenis.scrollTo(0)
            } catch (err) {
              // ignore
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // Run immediately after paint, and retry shortly after to counter timing races
    requestAnimationFrame(() => {
      setTimeout(() => doReset(), 0)
      setTimeout(() => doReset(), 50)
      setTimeout(() => doReset(), 200)
    })

    return () => {
      // nothing to cleanup here
    }
  }, [pathname])

  return null
}
