/**
 * A push notification as the phone shows it. The title and body are the
 * exact words the M4GYM server sends.
 */

export function Notification({ title, body, when = 'now' }: { title: string; body: string; when?: string }) {
  return (
    <div className="flex gap-3 rounded-[22px] bg-[var(--surface)] p-4 shadow-[var(--shadow-pop)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[var(--ink)] text-[11px] font-black text-[var(--lime)]" aria-hidden="true">
        M4
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold text-[var(--text-muted)]">M4GYM</p>
          <p className="text-xs tabular-nums text-[var(--text-faint)]">{when}</p>
        </div>
        <p className="mt-0.5 text-[15px] font-bold leading-snug">{title}</p>
        <p className="text-[15px] leading-snug text-[var(--text-secondary)]">{body}</p>
      </div>
    </div>
  )
}
