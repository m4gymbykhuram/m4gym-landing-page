'use client'

import CustomButton from '@/app/components/CustomButton'
import TitleWithLines from '@/app/components/TitleWithLines'
import { fadeUp } from '@/lib/motion-variants'
import { motion } from 'framer-motion'
import Image from 'next/image'

const FeaturesPage = () => {
  return (
    <div className="relative w-screen">
      <div
        className="relative bg-[#0A0A0B] z-10 w-full pt-28 md:px-20 md:pt-36 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 flex-1"
        style={{
          backgroundImage: "url('/assets/blogs-banner-bg.jpeg')",
          backgroundPosition: '100%',
          backgroundSize: 'cover',
        }}
      >
        <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4">
          <TitleWithLines title="Features" showLeftLine={false} />
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-anton text-center md:text-start text-4xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
          >
            Every part of your gym, in <br /> one system .
          </motion.h2>
          <p className="text-md text-[#858585] max-w-125">
            Stop switching between spreadsheets, WhatsApp groups, payment apps,
            and attendance sheets. M4GYM keeps your owners, managers, trainers,
            and members connected in one powerful workspace.
          </p>
          <CustomButton text="Explore Features" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="flex-1 relative flex items-center justify-center w-full max-w-2xl  lg:max-w-none"
        >
          <Image
            src={'/assets/feature-banner-group.png'}
            alt="features"
            height={600}
            width={600}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default FeaturesPage
