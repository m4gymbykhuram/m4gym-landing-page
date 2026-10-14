import { site } from './site'

export interface PublicPlan {
  key: string
  name: string
  description?: string
  features?: string[]
  highlight: boolean
  price: number | null
  currency: string | null
  billingPeriod: string | null
  memberLimit: number | null
  trainerLimit: number | null
  classLimit: number | null
  equipmentLimit: number | null
  inventoryLimit: number | null
}

export interface PublicPricing {
  gym: PublicPlan[]
  personal: { name: string; price: number | null; currency: string | null; billingPeriod: string | null } | null
}

/**
 * Live prices from the M4GYM server, refreshed hourly. Whop owns the prices
 * and the admin console edits them, so the site never hard-codes a number.
 * Null when the server can't be reached; the page then says so plainly.
 */
export async function getPricing(): Promise<PublicPricing | null> {
  try {
    const response = await fetch(`${site.apiUrl}/public/plans`, { next: { revalidate: 3600 } })
    if (!response.ok) return null
    const body = (await response.json()) as { data?: PublicPricing }
    return body.data ?? null
  } catch {
    return null
  }
}

export function formatPrice(price: number | null, currency: string | null) {
  if (price == null) return null
  if (price === 0) return 'Free'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price)
}

export function periodLabel(billingPeriod: string | null) {
  const days = Number.parseInt(billingPeriod ?? '', 10)
  if (!billingPeriod || billingPeriod === 'month' || days === 30 || days === 31) return 'month'
  if (days === 365) return 'year'
  if (days === 7) return 'week'
  return billingPeriod
}

export function limitLine(limit: number | null, one: string, many: string) {
  if (limit == null) return `Unlimited ${many}`
  return `${new Intl.NumberFormat('en-US').format(limit)} ${limit === 1 ? one : many}`
}
