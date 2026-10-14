import { site } from '@/lib/site'

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.59 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.47-.03-.01-2.3-.88-2.32-3.5ZM14.2 6.14c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.56-1.23Z" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M4.2 2.6c-.25.26-.4.67-.4 1.2v16.4c0 .53.15.94.4 1.2l.07.06 9.19-9.19v-.21L4.27 2.54l-.07.06Zm12.32 12.36-3.06-3.06v-.21l3.06-3.06.07.04 3.63 2.06c1.04.59 1.04 1.55 0 2.14l-3.63 2.06-.07.03Zm-.07.04-3.13-3.13-9.25 9.25c.34.36.9.4 1.54.05l10.84-6.17m0-6.29L5.61 2.59c-.64-.36-1.2-.32-1.54.05l9.25 9.24 3.13-3.13Z" />
    </svg>
  )
}

function StoreButton({ href, small, big, icon }: { href: string | null; small: string; big: string; icon: React.ReactNode }) {
  const body = (
    <>
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[11px] opacity-75">{href ? small : 'Coming soon to'}</span>
        <span className="block text-[15px] font-semibold">{big}</span>
      </span>
    </>
  )
  const className =
    'inline-flex h-13 min-w-40 items-center gap-2.5 rounded-[14px] bg-[var(--ink)] px-4 text-white ring-1 ring-white/10 transition-transform duration-200 active:scale-[0.97]'
  return href ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <span className={`${className} opacity-80`} aria-label={`${big}, coming soon`}>
      {body}
    </span>
  )
}

export function StoreButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <StoreButton href={site.appStoreUrl} small="Download on the" big="App Store" icon={<AppleGlyph />} />
      <StoreButton href={site.playStoreUrl} small="Get it on" big="Google Play" icon={<PlayGlyph />} />
    </div>
  )
}
