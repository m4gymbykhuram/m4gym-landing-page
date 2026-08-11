import type { Metadata } from 'next'
import HeroSection from '@/app/components/HeroSection'
import MarqueeStrip from '@/app/components/landing/MarqueeStrip'
import WhatInsited from '@/app/components/landing/WhatInsited'
import WhatWeOffer from '../components/landing/WhatWeOffer'
import Features from '../components/landing/Features'
import PricingSection from '../components/landing/PricingSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import Testimonials from '../components/landing/Testimonials'
import TransformSection from '../components/landing/TransformSection'
import HorizontalCardGallery from '../components/HorizontalCardGallery';

export const metadata: Metadata = {
  title: 'M4 GYM – Run Your Entire Gym From One Place',
  description:
    'M4 GYM is a powerful all-in-one gym management platform. Manage members, staff, classes, payments and more — from a single dashboard.',
  openGraph: {
    title: 'M4 GYM – Run Your Entire Gym From One Place',
    description:
      'The all-in-one gym management platform for owners, managers, trainers and members.',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <main className={"overflow-hidden"}>
      <HeroSection />
      <MarqueeStrip />
      <WhatInsited />
      <WhatWeOffer />
      <HorizontalCardGallery />
      <Features />
      <HowItWorksSection />
      <PricingSection />
      <Testimonials />
      <TransformSection />
    </main>
  )
}
