import Link from 'next/link'

/** The wordmark, with the lettering that reads on the current theme. */
export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <Link href="/" aria-label="M4GYM home" className="inline-flex shrink-0 items-center">
      <picture>
        <source srcSet="/m4gym-logo-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="/m4gym-logo-light.svg" alt="M4GYM" className={`${className} w-auto`} />
      </picture>
    </Link>
  )
}
