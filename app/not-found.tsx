import Link from 'next/link'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-site py-28 text-center">
        <h1 className="headline text-6xl">This page doesn’t exist.</h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">The link may be old, or it was typed wrong.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to M4GYM
        </Link>
      </main>
      <Footer />
    </>
  )
}
