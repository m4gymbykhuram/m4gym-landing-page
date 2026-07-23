import { Zap, Rocket, Gem, LucideIcon } from 'lucide-react'

export interface PricingPlan {
  id: string
  icon: LucideIcon
  name: string
  monthlyPrice: string
  yearlyPrice: string
  priceSuffix: string
  description: string
  ctaText: string
  preferred?: boolean
  features: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    icon: Zap,
    name: 'Free (Forever)',
    monthlyPrice: 'Free',
    yearlyPrice: 'Free',
    priceSuffix: '',
    description: 'The perfect start for the small business.',
    ctaText: 'Get Started For Free',
    features: [
      'Unified dashboard for cash and crypto',
      'Real-time balance & transaction history',
      'Secure payments and transfers',
      'Basic analytics for spending overview',
      'Standard customer support',
    ],
  },
  {
    id: 'pro',
    icon: Rocket,
    name: 'Pro',
    monthlyPrice: '$9.99',
    yearlyPrice: '$6.99',
    priceSuffix: 'Per Month',
    description: 'The perfect start for the small business.',
    ctaText: 'Upgrade To Pro',
    preferred: true,
    features: [
      'Unified dashboard for cash and crypto',
      'Real-time balance & transaction history',
      'Secure payments and transfers',
      'Basic analytics for spending overview',
      'Standard customer support',
    ],
  },
  {
    id: 'elite',
    icon: Gem,
    name: 'Elite',
    monthlyPrice: '$19.99',
    yearlyPrice: '$13.99',
    priceSuffix: 'Per Month',
    description: 'The perfect start for the small business.',
    ctaText: 'Go Elite',
    features: [
      'Unified dashboard for cash and crypto',
      'Real-time balance & transaction history',
      'Secure payments and transfers',
      'Basic analytics for spending overview',
      'Standard customer support',
    ],
  },
]
