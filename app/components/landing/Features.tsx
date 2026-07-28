'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp } from '@/lib/motion-variants'
import TitleWithLines from '../TitleWithLines'
import CalendarCard from './CalendarCard'
import PaymentCard from './PaymentCard'
import EquipmentCard from './EquipmentCard'
import InventoryCard from './InventoryCard'
import CustomButton from '../CustomButton'

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-10 md:py-28 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,18,20,0.7), rgba(17,18,20,0.7)), url('/assets/features-section-bg.jpg')",
      }}
    >
      <div className="relative z-10 w-full flex flex-col items-center gap-4 lg:gap-8 flex-1">
        <TitleWithLines title="Features" variants={fadeUp} />
        <h2 className="font-anton text-center uppercase text-3xl sm:text-4xl xl:text-[44px] text-white leading-tight max-w-2xl">
          Every part of your <span className="text-primary">gym</span>, in one
          system
        </h2>

        <section className="mx-auto max-w-7xl p-3 md:px-2">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Calendar */}
            <div className="lg:col-span-8">
              <CalendarCard />
            </div>

            {/* Payment */}
            <div className="lg:col-span-4">
              <PaymentCard />
            </div>

            {/* Equipment */}
            <div className="lg:col-span-4">
              <EquipmentCard />
            </div>

            {/* Inventory */}
            <div className="lg:col-span-8">
              <InventoryCard />
            </div>
          </div>
        </section>

        <CustomButton text="Explore More Features" className="cursor-pointer" />
      </div>
    </section>
  )
}

export default Features
