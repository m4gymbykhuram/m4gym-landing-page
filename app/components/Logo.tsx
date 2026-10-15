import Image from 'next/image'
import Link from 'next/link'

/** The wordmark, in its version for dark backgrounds. */
export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <Link href="/" aria-label="M4GYM home" className="inline-flex shrink-0 items-center">
      <Image src="/m4gym-logo-dark.svg" alt="M4GYM" width={132} height={40} priority className={`${className} w-auto`} />
    </Link>
  )
}
