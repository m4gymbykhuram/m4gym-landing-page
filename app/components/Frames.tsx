import Image from 'next/image'

/** A real screenshot of the web console inside a minimal browser window. */
export function BrowserFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--border-solid)] bg-[var(--surface)] shadow-[var(--shadow-dialog)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[var(--border-subtle)] px-3.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-hover)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-hover)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-hover)]" />
        <span className="ml-3 rounded-md bg-[var(--surface-raised)] px-2.5 py-0.5 text-[11px] text-[var(--text-muted)]">app.m4gym.com</span>
      </div>
      <Image src={src} alt={alt} width={1920} height={1200} priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" className="block h-auto w-full" />
    </div>
  )
}

/** A real screenshot of the app inside a phone outline. */
export function PhoneFrame({ src, alt, className = '', priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`rounded-[40px] bg-[var(--ink)] p-[6px] shadow-[var(--shadow-device)] ring-1 ring-white/10 ${className}`}>
      <div className="overflow-hidden rounded-[34px] bg-[var(--ground)]">
        <Image src={src} alt={alt} width={750} height={1631} priority={priority} sizes="(min-width: 1024px) 18rem, 60vw" className="block h-auto w-full" />
      </div>
    </div>
  )
}
