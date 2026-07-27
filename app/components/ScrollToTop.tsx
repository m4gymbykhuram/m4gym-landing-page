'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Run immediately
    scrollToTop()

    // Run again after a tiny delay (fixes most client navigation cases)
    const timeout = setTimeout(scrollToTop, 10)

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
