'use client'

import { useRef, useState, MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'

type Tab = { id: string | number; label: string }

type Props = {
  tabs: Tab[]
  activeTab: number
  setActiveTab: (index: number) => void
}

export default function TabBar({ tabs, activeTab, setActiveTab }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStartLeft = useRef(0)
  const hasDraggedSignificantly = useRef(false)

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    hasDraggedSignificantly.current = false
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft
    scrollStartLeft.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - dragStartX.current

    if (Math.abs(walk) > 5) {
      hasDraggedSignificantly.current = true
    }

    scrollRef.current.scrollLeft = scrollStartLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleTabClick = (index: number) => {
    // Ignore the click if it was actually the end of a drag gesture
    if (hasDraggedSignificantly.current) {
      hasDraggedSignificantly.current = false
      return
    }
    setActiveTab(index)
  }

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative flex items-center gap-1 max-w-full w-fit mx-auto bg-transparent sm:bg-bg-card border-0 sm:border sm:border-white/8 rounded-full p-0 sm:p-1.5 pr-0 mb-8 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
      role="tablist"
      aria-label="Feature tabs"
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          aria-selected={activeTab === i}
          aria-controls={`panel-${tab.id}`}
          onClick={() => handleTabClick(i)}
          className={`
            relative shrink-0 snap-center px-6 sm:px-10 py-3 sm:py-4 rounded-full font-archivo font-medium text-sm sm:text-md
            transition-colors duration-200 whitespace-nowrap cursor-pointer
            ${
              activeTab === i
                ? 'bg-linear-to-b from-[#111214]/18 to-[#dde118]/18 text-white shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }
          `}
        >
          {activeTab === i && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-full bg-[#1e1e0e] border border-primary/20"
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            />
          )}
          <span className="relative z-10 pointer-events-none">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
