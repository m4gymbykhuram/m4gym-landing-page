'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { pricingPlans } from '@/lib/pricing-data'
import BillingToggle from '../BillingToggle'
import PricingCard from '../PricingCard'
import SectionHeading from './SectionHeading'
import { useScreenSize } from '@/hooks/useScreenSize'
import AnimatedHeading from './AnimatedHeading'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function PricingSection() {
  const { isMobile, isTablet } = useScreenSize()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  )

  return (
    <section className="relative bg-[#111214] py-10 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4 md:mb-14 mt-2 md:mt-5">
          <div className="flex flex-col">
            <SectionHeading
              badge="Pricing Plans"
              align={isMobile || isTablet ? 'center' : 'left'}
            />
            <AnimatedHeading
              text=" Pricing Plans For Smart Automation"
              className="font-anton md:text-nowrap md:mx-auto lg:mx-0 text-3xl sm:text-4xl xl:text-[44px] text-white uppercase leading-tight max-w-lg text-center lg:text-start "
            />
          </div>

          <div className="flex flex-col items-center lg:items-end gap-2">
            <span className="font-archivo text-sm text-white/50">
              Choose options
            </span>
            <BillingToggle
              billingCycle={billingCycle}
              onChange={setBillingCycle}
            />
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              variants={fadeUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
