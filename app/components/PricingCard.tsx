'use client'

import { motion, Variants } from 'framer-motion'
import { CheckCircle2, ChevronsRight } from 'lucide-react'
import { PricingPlan } from '../../lib/pricing-data'
import SlidingPrice from './SlidingPrice'
import CustomButton from './CustomButton'

interface PricingCardProps {
  plan: PricingPlan
  billingCycle: 'monthly' | 'yearly'
  variants?: Variants
}

export default function PricingCard({
  plan,
  billingCycle,
  variants,
}: PricingCardProps) {
  const Icon = plan.icon
  const isFree = plan.monthlyPrice === 'Free'
  const price =
    billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  const isPreferred = plan.preferred

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl p-6 border overflow-hidden"
      style={{
        borderColor: isPreferred
          ? 'rgba(221,255,61,0.25)'
          : 'rgba(255,255,255,0.06)',
        background: isPreferred
          ? 'radial-gradient(120% 100% at 50% 0%, rgba(221,255,61,0.08) 0%, #141414 55%)'
          : '#1A1A1A',
        boxShadow: isPreferred ? '0px 10px 43px 0px #DDEB1840 inset' : '',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: '3rem',
            height: '3rem',
            backgroundImage: `linear-gradient(#111214, #111214), linear-gradient(180deg, #666666 0%, #000000 100%)`,
            backgroundOrigin: 'border-box, border-box',
            backgroundClip: 'padding-box, border-box',
            border: '1px solid transparent',
          }}
        >
          <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
        </div>

        {isPreferred && (
          <span className="text-xs font-archivo font-semibold text-white/80 bg-white/10 border border-white/10 rounded-full px-3 py-1.5">
            Preferred
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <SlidingPrice
          value={price}
          className="font-anton text-2xl text-white uppercase"
        />

        {!isFree && (
          <span className="font-anton text-sm text-white uppercase tracking-wide ml-2">
            ({plan.priceSuffix})
          </span>
        )}
        {isFree && (
          <span className="font-anton text-sm text-white uppercase tracking-wide ml-2">
            (Forever)
          </span>
        )}
      </div>

      {/* CTA */}

      <CustomButton
        text={plan.ctaText}
        bg={'white'}
        className="w-full text-xs cursor-pointer text-center p-0!"
        circleBg={'#DCFF57'}
        arrowColor={'black'}
        animate={true}
        textCenter
      />

      <p className="font-archivo text-sm text-white/60 my-5">
        {plan.description}
      </p>

      {/* Features */}
      <div className="rounded-xl bg-black/40 border border-white/5 p-5">
        <p className="font-archivo text-sm font-semibold text-white mb-4">
          What included:
        </p>
        <ul className="space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <CheckCircle2
                className="w-4 h-4 text-white shrink-0"
                strokeWidth={2}
              />
              <span className="font-archivo text-sm text-white">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
