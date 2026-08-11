'use client'

import { motion, Variants } from 'framer-motion'
import { fadeUp } from '@/lib/motion-variants'
import TitleWithLines from '../TitleWithLines'
import CalendarCard from './CalendarCard'
import PaymentCard from './PaymentCard'
import EquipmentCard from './EquipmentCard'
import InventoryCard from './InventoryCard'
import CustomButton from '../CustomButton'
import AnimatedHeading from './AnimatedHeading'

/* ── Parent grid: fires once, staggers children on entry ── */
const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

/* ── Card reveal — no per-card transition override, so every
   card shares the exact same duration/easing ── */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-cover bg-center py-10 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,18,20,0.7), rgba(17,18,20,0.7)), url('/assets/features-section-bg.jpg')",
      }}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col items-center gap-4 lg:gap-8">
        {/* Badge */}
        <TitleWithLines title="Features" variants={fadeUp} />

        {/* Animated heading */}
        <AnimatedHeading
          text="Every part of your **gym** in one system"
          className="text-3xl sm:text-4xl xl:text-[44px]"
        />

        {/* Grid of feature cards */}
        <div className="mx-auto max-w-7xl p-3 md:px-2">
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Card 1 — large left */}
            <motion.div className="md:col-span-8" variants={cardVariants}>
              <CalendarCard />
            </motion.div>

            {/* Card 2 — small right */}
            <motion.div className="md:col-span-4" variants={cardVariants}>
              <PaymentCard />
            </motion.div>

            {/* Card 3 — small left */}
            <motion.div className="md:col-span-4" variants={cardVariants}>
              <EquipmentCard />
            </motion.div>

            {/* Card 4 — large right */}
            <motion.div className="md:col-span-8" variants={cardVariants}>
              <InventoryCard />
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <CustomButton
            text="Explore More Features"
            href="/features"
            className="cursor-pointer"
            animate={true}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Features