'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import CustomButton from '../CustomButton'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

function AnimatedNavLabel({
  label,
  isActive,
}: {
  label: string
  isActive: boolean
}) {
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`relative z-10 inline-flex items-center font-archivo font-semibold ${
        isActive ? 'text-black' : 'text-[#858585]'
      }`}
    >
      {label.split('').map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              rest: { y: 0 },
              hover: { y: '-100%' },
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.025,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          <motion.span
            className={`absolute left-0 top-0 inline-block ${
              isActive ? 'text-black' : 'text-white'
            }`}
            variants={{
              rest: { y: '100%' },
              hover: { y: 0 },
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.025,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')
  const pathname = usePathname()

  useEffect(() => {
    const matchedLink = navLinks.find((link) => {
      if (link.href === '/') {
        return pathname === '/'
      }
      if (link.href.startsWith('#')) return false

      return pathname.startsWith(link.href)
    })

    if (matchedLink) {
      setActiveTab(matchedLink.label)
    }
  }, [pathname])

  return (
    <header className="fixed backdrop-blur-2xl md:backdrop-blur-none top-0 left-0 right-0 z-50 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="bg-primary-gradient font-anton text-bg-base text-xl font-bold px-2 py-2 leading-none"
            aria-label="M4"
          >
            M4
          </span>
          <span className="font-anton text-white text-2xl tracking-widest uppercase">
            GYM
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-[#1A1A1A80] backdrop-blur-md rounded-full px-2 py-2 border border-[#2D2D2D]"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.label

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  window.scrollTo({ top: 0 })
                  setActiveTab(link.label)
                }}
                scroll={true}
                className="relative px-7 py-2.5 rounded-full text-md font-archivo font-semibold group overflow-hidden"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, #F5FF7A 0%, #DDEB18 100%)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                <AnimatedNavLabel label={link.label} isActive={isActive} />
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <CustomButton
            text="Get Started"
            variant="outline"
            onClick={() => {}}
            className="cursor-pointer"
          />
        </div>

        {/* Mobile burger */}
        <button
          id="mobile-menu-btn"
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-archivo font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#get-started"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-primary-gradient text-[#0a0a0a] font-archivo font-bold text-sm px-5 py-3 rounded-full"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
