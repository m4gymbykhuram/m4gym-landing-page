'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp } from '@/lib/motion-variants'
import TitleWithLines from '../TitleWithLines'

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-20 md:py-28 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,18,20,0.7), rgba(17,18,20,0.7)), url('/assets/features-section-bg.jpg')",
      }}
    >
      <div className="relative z-10 w-full flex flex-col items-center gap-12 lg:gap-8 flex-1">
        <TitleWithLines title="Features" variants={fadeUp} />
      </div>
    </section>
  )
}

export default Features
