'use client'

import { useScreenSize } from '@/hooks/useScreenSize'
import { useState } from 'react'

const CATEGORIES = [
  'All',
  'Gym Management',
  'Business Growth',
  'Member Experience',
  'Analytics',
]

export default function CategorySidebar({
  onSelect,
}: {
  onSelect?: (category: string) => void
}) {
  const [active, setActive] = useState('All')
  const { isMobile, isTablet } = useScreenSize()

  const handleClick = (category: string) => {
    setActive(category)
    onSelect?.(category)
  }

  return (
    <div className="w-full lg:max-w-55 shrink-0">
      <span
        className="mb-8 hidden lg:inline-block rounded-full  px-5 py-2 text-sm font-medium text-primary"
        style={{
          background:
            'linear-gradient(180deg, rgba(125, 133, 14, 0.1) 0%, rgba(221, 235, 24, 0.1) 100%)',
        }}
      >
        Blogs by category
      </span>

      <ul
        className={
          isMobile || isTablet
            ? 'flex flex-row gap-2 overflow-x-auto scrollbar-hide px-4'
            : 'flex flex-col gap-1'
        }
      >
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              onClick={() => handleClick(category)}
              className={`flex w-full items-center gap-3 border-l-2 py-2 px-4 text-left text-base transition-colors text-nowrap ${
                active === category
                  ? 'border-primary text-white'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
