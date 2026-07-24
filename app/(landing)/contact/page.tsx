'use client'

import ContactSection from '@/app/components/contact/ContactSection'
import FAQSection from '@/app/components/contact/FAQSection'
import Footer from '@/app/components/landing/Footer'
import TitleWithLines from '@/app/components/TitleWithLines'
import { fadeUp } from '@/lib/motion-variants'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <div className="relative w-screen h-screen">
      <section
        className="relative bg-[#0A0A0B] flex flex-col items-center justify-center gap-4 h-130 px-4 md:px-8"
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
      <ContactSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default page
