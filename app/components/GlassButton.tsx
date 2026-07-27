'use client'

import type { CSSProperties, ReactNode } from 'react'

const GlassButton = ({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) => {
  const glassStyle: CSSProperties = {
    background:
      'linear-gradient(100deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.07) 52%, rgba(255, 255, 255, 0.09) 100%)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    boxShadow: [
      'inset 0 1px 1px rgba(255, 255, 255, 0.46)',
      'inset 0 -1px 1px rgba(255, 255, 255, 0.12)',
      'inset 0 -18px 28px rgba(0, 0, 0, 0.12)',
      '0 10px 22px rgba(0, 0, 0, 0.24)',
    ].join(', '),
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative isolate overflow-hidden rounded-full border px-8 py-4
        font-archivo text-sm font-medium leading-none text-white
        backdrop-blur-xl transition-transform duration-300
        ${className}
      `}
      style={glassStyle}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/12 via-white/2 to-black/10" />
      <span className="pointer-events-none absolute inset-px rounded-full border border-white/6" />
      <span className="pointer-events-none absolute -left-6 top-0 h-full w-1/3 rounded-full bg-black/8 blur-xl" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default GlassButton
