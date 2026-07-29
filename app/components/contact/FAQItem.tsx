'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQItem as FAQItemType } from '@/lib/faq-data'

interface FAQItemProps {
  item: FAQItemType
  isOpen: boolean
  onToggle: () => void
}

export default function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="rounded-3xl bg-bg-elevated border border-[#2D2D2D] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-archivo font-semibold text-white text-base sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-white"
        >
          {isOpen ? (
            <Minus className="w-6 h-6" strokeWidth={2} />
          ) : (
            <Plus className="w-6 h-6" strokeWidth={2} />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 font-archivo text-white/50 text-sm sm:text-base leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
