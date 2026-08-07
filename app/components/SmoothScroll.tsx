'use client'

import { ReactNode, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handle = () => setIsMobile(mq.matches)
    handle()
    if (mq.addEventListener) mq.addEventListener('change', handle)
    else mq.addListener(handle)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle)
      else mq.removeListener(handle)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return // skip smoothing on mobile, but DOM structure stays identical

    const smoother = ScrollSmoother.create({
      smooth: 1.1,
      effects: true,
      normalizeScroll: true,
      wrapper: '#landing-wrapper',
      content: '#landing-content',
    })

    return () => {
      smoother.kill()
    }
  }, [isMobile])

  // Same wrapper/content structure ALWAYS renders — only the ScrollSmoother
  // instance is conditionally created/destroyed above. This avoids ever
  // unmounting and remounting the entire children tree.
  return (
    <div id="landing-wrapper" className="overflow-hidden">
      <div id="landing-content">{children}</div>
    </div>
  )
}