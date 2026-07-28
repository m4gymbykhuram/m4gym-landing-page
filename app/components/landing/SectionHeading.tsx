import { fadeUp, slideLeft } from '@/lib/motion-variants'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionHeading({
  badge,
  title,
  align = 'left',
}: {
  badge: string
  title?: string
  align?: 'left' | 'center' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-end' : ''}`}
    >
      <motion.div variants={slideLeft} className="flex items-start gap-2">
        <span className="w-60 bg-linear-to-r from-primary to-[#0A0A0B] text-bg-base text-start font-archivo font-bold text-xs md:text-sm px-4 py-2 md:py-4 rounded-xl uppercase tracking-widest">
          {badge}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-anton text-3xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
      >
        {title}
      </motion.h2>
    </motion.div>
  )
}
