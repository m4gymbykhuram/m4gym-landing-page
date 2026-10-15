import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'M4GYM — Gym management, coaching and member app',
    template: '%s · M4GYM',
  },
  description:
    'Run members, fees, check-ins, classes and coaching from one place. M4GYM gives gym owners a web console and their coaches and members an app.',
  applicationName: 'M4GYM',
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: 'M4GYM',
    url: site.url,
    title: 'M4GYM — Gym management, coaching and member app',
    description: 'Members, fees, check-ins, classes and coaching for gyms, in one place.',
    images: [{ url: '/shots/web-dashboard.webp', width: 1920, height: 1200, alt: 'The M4GYM owner dashboard' }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#0e0f0b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
