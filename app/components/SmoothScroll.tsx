'use client'

import { ReactNode, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // ✅ Create GSAP ScrollSmoother
    const smoother = ScrollSmoother.create({
      smooth: 2,          // 2s smoothing
      effects: true,      // allow [data-speed] parallax if you want
      normalizeScroll: true,
      wrapper: '#smooth-wrapper', 
      content: '#smooth-content',
    })

    return () => {
      smoother.kill() // cleanup on unmount
    }
  }, [])

  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  )
}