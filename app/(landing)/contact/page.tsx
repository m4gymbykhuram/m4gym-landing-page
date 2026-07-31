'use client'

import ContactSection from '@/app/components/contact/ContactSection'
import FAQSection from '@/app/components/contact/FAQSection'
import TitleWithLines from '@/app/components/TitleWithLines'
import { fadeUp } from '@/lib/motion-variants'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const sections = gsap.utils.toArray<HTMLElement>('.stack-panel')

      sections.forEach((panel, i) => {
        if (i === sections.length - 1) return

        const nextPanel = sections[i + 1]

        const shouldPin = panel.scrollHeight <= window.innerHeight

        if (shouldPin) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
          })
        }

        gsap.fromTo(
          panel,
          { scale: 1 },
          {
            scrollTrigger: {
              trigger: nextPanel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          },
        )
      })
    })

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)

    return () => {
      mm.revert()
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-screen">
      <div className="stack-panel relative z-10 w-full overflow-hidden origin-top will-change-transform bg-[#0A0A0B]">
        <section
          className="relative w-full bg-[#0A0A0B] flex flex-col items-center justify-center gap-4 pt-15 md:pt-0 h-80 lg:h-120 px-4 md:px-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,10,11,0.8), rgba(10,10,11,0.8)) ,url('/assets/contact_banner_bg.jpg')",
            backgroundPosition: '100%',
            backgroundSize: 'cover',
          }}
        >
          <TitleWithLines title="Get in Touch" />
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-anton text-center text-4xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
          >
            we are here to connect , <br /> listen & help
          </motion.h2>
          <p className="text-md text-[#858585] text-center max-w-120">
            Whether you have a question, want to explore a partnership, or are
            looking for ways to get involved, we’d love to hear from you.
          </p>
        </section>
      </div>

      <div className="stack-panel relative z-20 origin-top will-change-transform overflow-hidden">
        <ContactSection />
      </div>

      <div className="stack-panel relative z-30 origin-top will-change-transform overflow-hidden">
        <FAQSection />
      </div>
    </div>
  )
}

export default Page
