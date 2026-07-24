import Header from '@/app/components/landing/Header'
import Footer from '@/app/components/landing/Footer'
import SmoothScroll from '../components/SmoothScroll'
import 'lenis/dist/lenis.css'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="flex-1">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
