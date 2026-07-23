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
              className="relative px-10 py-3  rounded-full text-sm font-archivo font-semibold"
            >
              {isActive && (
                <motion.span
                  layoutId="billing-toggle-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: `radial-gradient(120% 140% at 50% 20%, rgba(221,255,0,0.18) 0%, rgba(221,255,0,0.05) 45%, rgba(20,20,20,0) 75%), linear-gradient(#1a1a1a, #1a1a1a), linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 100%)`,
                    backgroundOrigin: 'border-box, border-box, border-box',
                    backgroundClip: 'padding-box, padding-box, border-box',
                    border: '1px solid transparent',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 capitalize ${
                  isActive ? 'text-primary' : 'text-white/50'
                }`}
              >
                {cycle}
              </span>
              {/* {cycle === 'yearly' && (
                <span className="text-xs font-archivo font-semibold bg-white/10 text-white/70 rounded-full px-2.5 py-1">
                  Save 30%
                </span>
              )} */}
            </button>
          )
        })}
      </div>
    </div>
  )
}
