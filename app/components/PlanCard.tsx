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
        ? ['Ask M4: 5 messages a month']
        : ['Activity log of every change', 'Member export', 'Priority support']),
  ]
  return (
    <article
      className={`relative flex flex-col rounded-[var(--radius-card)] border bg-[var(--surface)] p-7 ${
        plan.highlight ? 'border-[var(--emphasis)] ring-1 ring-[var(--emphasis)]' : 'border-[var(--border-subtle)]'
      }`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-[var(--lime)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
          Most gyms pick this
        </span>
      )}
      <h3 className="text-lg font-bold">{plan.name}</h3>
      {plan.description && <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.description}</p>}
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="display text-5xl">{price ?? '—'}</span>
        {!isFree && price && <span className="text-sm text-[var(--text-muted)]">/ {periodLabel(plan.billingPeriod)}</span>}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--text-secondary)]">
        {lines.map((line) => (
          <li key={line} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" strokeWidth={2.25} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
      <a href={links.signUp} className={`btn mt-7 w-full ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>
        {isFree ? 'Start free' : `Start with ${plan.name}`}
      </a>
    </article>
  )
}
