import { Check } from 'lucide-react'
import { formatPrice, limitLine, periodLabel, type PublicPlan } from '@/lib/plans'
import { links } from '@/lib/site'

export function isFreePlan(plan: PublicPlan) {
  return plan.price === 0 || plan.key === 'free'
}

/** One gym plan, with its live price and limits from the server. */
export function PlanCard({ plan }: { plan: PublicPlan }) {
  const isFree = isFreePlan(plan)
  const price = formatPrice(plan.price, plan.currency)
  const lines = [
    limitLine(plan.memberLimit, 'member', 'members'),
    limitLine(plan.trainerLimit, 'coach', 'coaches'),
    limitLine(plan.classLimit, 'class', 'classes'),
    limitLine(plan.equipmentLimit, 'equipment item', 'equipment items'),
    ...(plan.features?.length
      ? plan.features
      : isFree
        ? ['Included Coaching Credits', 'Optional AI top-ups']
        : ['Activity log of every change', 'Member export', 'Priority support']),
  ]
  const dark = plan.highlight
  return (
    <article className={`relative flex flex-col rounded-[var(--radius-sheet)] p-7 md:p-8 ${dark ? 'bg-[var(--surface-raised)] text-white ring-1 ring-[var(--lime)]/40' : 'sheet'}`}>
      <div className="flex items-baseline justify-between gap-3">
        {dark && <span className="badge badge-lime">Recommended</span>}
      </div>
      <h3 className={`text-xl font-bold leading-snug ${dark ? 'mt-4' : ''}`}>{plan.name}</h3>
      {plan.description && <p className={`mt-1 text-sm ${dark ? 'text-white/60' : 'text-[var(--text-muted)]'}`}>{plan.description}</p>}
      <p className="mt-8 flex items-baseline gap-2">
        <span className="display text-6xl tabular-nums">{price ?? '—'}</span>
        {!isFree && price && <span className={`text-sm font-medium ${dark ? 'text-white/60' : 'text-[var(--text-muted)]'}`}>/ {periodLabel(plan.billingPeriod)}</span>}
      </p>
      <ul className="mt-8 flex-1 space-y-2.5 text-[15px]">
        {lines.map((line) => (
          <li key={line} className={`flex gap-3 ${dark ? 'text-white/85' : 'text-[var(--text-secondary)]'}`}>
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-[var(--lime)]' : 'text-[var(--success)]'}`} strokeWidth={2.5} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
      <a href={links.signUp} className={`btn mt-8 w-full ${dark ? 'btn-lime' : 'btn-outline'}`}>
        {isFree ? 'Start free' : 'Choose this plan'}
      </a>
    </article>
  )
}
