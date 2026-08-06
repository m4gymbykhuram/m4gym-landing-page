'use client'

import { ReactNode, useEffect } from 'react'
import {  ScrollTrigger, ScrollSmoother } from '@/lib/gsap' // ← shared, single-instance import

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
    })

    // Re-measure once everything (images, fonts, late layout shifts) has
    // actually settled — production asset timing differs from dev.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    // Also catch late image loads that fire after window 'load' in some cases
    const raf = requestAnimationFrame(() => {
      setTimeout(refresh, 300)
    })

    return () => {
      window.removeEventListener('load', refresh)
      cancelAnimationFrame(raf)
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  )
}