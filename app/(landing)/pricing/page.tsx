'use client'

import BillingToggle from '@/app/components/BillingToggle'
import PricingSection from '@/app/components/landing/PricingSection'
import PricingCard from '@/app/components/PricingCard'
import TitleWithLines from '@/app/components/TitleWithLines'
import { containerVariants, fadeUp } from '@/lib/motion-variants'
import { pricingPlans } from '@/lib/pricing-data'
import { motion } from 'framer-motion'
import { useState } from 'react'
import EveryPlanIncludesBanner from './EveryPlanIncludesBanner'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  )
  return (
    <div className="relative w-screen">
      <section
        className="relative bg-[#0A0A0B] flex flex-col items-center justify-center gap-4 h-130 px-4 md:px-8"
        style={{
          backgroundImage: "url('/assets/pricing-banner-bg.jpeg')",
          backgroundPosition: '100%',
          backgroundSize: 'cover',
        }}
      >
        <TitleWithLines title="Pricing & Plans" />
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="font-anton text-center text-4xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
        >
          Pick the plan that <br /> suits you best
        </motion.h2>
        <div
          className="inline-flex items-center rounded-full px-6 py-3 border"
          style={{
            background: '#141414',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <span className="font-archivo text-sm text-white/50">
            * All plans include a free trial.
          </span>
        </div>
      </section>
      <div className="relative max-w-7xl mx-auto flex flex-col items-center space-y-8 -top-20">
        <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
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
        <EveryPlanIncludesBanner />
      </div>
    </div>
  )
}

export default PricingPage
