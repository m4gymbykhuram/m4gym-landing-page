'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqCategories, faqData, FAQCategory } from '@/lib/faq-data'
import FAQItemComponent from './FAQItem'
import TitleWithLines from '../TitleWithLines'
import { useScreenSize } from '@/hooks/useScreenSize'

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('owner')
  const [openId, setOpenId] = useState<string | null>(faqData.owner[0].id)
  const { isMobile, isTablet } = useScreenSize()

  const handleCategoryChange = (category: FAQCategory) => {
    setActiveCategory(category)
    setOpenId(faqData[category][0].id) // open first question of new category by default
  }

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="bg-[#0A0A0B] py-10 lg:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: heading + category tabs */}
        <div>
          <TitleWithLines
            title="Frequently Asked Questions"
            showRightLine
            showLeftLine={isMobile || isTablet ? true : false}
          />

          <h2 className="font-anton text-3xl md:text-3xl sm:text-4xl text-white uppercase mt-4 mb-10 leading-tight text-center md:text-start">
            Helpful Answers To Get You Started Faster.
          </h2>

          <div className="flex flex-col items-center md:items-start gap-4">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`text-left font-archivo text-lg transition-colors duration-300 w-fit ${
                  activeCategory === category.id
                    ? 'text-primary font-semibold'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: FAQ list */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {faqData[activeCategory].map((item) => (
                <FAQItemComponent
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
