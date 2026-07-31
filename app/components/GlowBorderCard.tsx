'use client'

import { type ReactNode, type ElementType } from 'react'

interface GlowBorderCardProps {
  children?: ReactNode
  as?: ElementType
  className?: string
  src?: string // for image usage
  alt?: string
}

export default function GlowBorderCard({
  children,
  as: Tag = 'div',
  className = '',
  src,
  alt = '',
}: GlowBorderCardProps) {
  const baseClasses = `overflow-hidden rounded-xl border border-transparent animate-border [background:linear-gradient(45deg,#0A0A0B,--theme(--color-neutral-900)_50%,#0A0A0B)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-primary/.15)_80%,--theme(--color-primary)_86%,--theme(--color-primary/.6)_90%,--theme(--color-primary)_94%,--theme(--color-primary/.15))_border-box]`

  if (src) {
    return (
      <Tag
        as={undefined}
        className={`${baseClasses} object-fill w-full h-full ${className}`}
      >
        <img src={src} alt={alt} className="w-full h-full rounded-xl" />
      </Tag>
    )
  }

  return <Tag className={`${baseClasses} ${className}`}>{children}</Tag>
}
