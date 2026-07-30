'use client'

import { motion } from 'framer-motion'

interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly'
  onChange: (cycle: 'monthly' | 'yearly') => void
}

export default function BillingToggle({
  billingCycle,
  onChange,
}: BillingToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center bg-bg-card/80 rounded-full p-1 border border-white/6">
        {(['monthly', 'yearly'] as const).map((cycle) => {
          const isActive = billingCycle === cycle
          return (
            <button
              key={cycle}
              onClick={() => onChange(cycle)}
              className="relative px-2 md:px-4 w-38 md:w-45 py-3  rounded-full text-sm font-archivo font-semibold"
            >
              {isActive && (
                <motion.span
                  layoutId="billing-toggle-pill"
                  className="absolute inset-0 rounded-full active-tab-bg"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 capitalize ${
                  isActive ? 'text-black' : 'text-white/50'
                }`}
              >
                {cycle}
              </span>
              {cycle === 'yearly' && (
                <span className="relative text-xs font-archivo font-semibold text-[#858585] bg-bg-card ml-2 z-50 rounded-full p-1 border border-white/6 px-2.5">
                  Save 30%
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
