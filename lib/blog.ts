import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'
import { post as overdueFees } from '@/content/blog/cut-overdue-gym-fees'
import { post as firstThirtyDays } from '@/content/blog/keep-new-gym-members'
import { post as qrCheckIn } from '@/content/blog/qr-check-in-for-gyms'
import { post as weeklyPlan } from '@/content/blog/weekly-plans-members-follow'
import { post as strengthAtHome } from '@/content/blog/start-strength-training-on-your-own'

export type PostCategory = 'Running a gym' | 'Coaching' | 'Training'

export interface Post {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-10-15. */
  date: string
  category: PostCategory
  readMinutes: number
  /** Two to four words set large on the cover. */
  cover: string
  icon: LucideIcon
  tone: 'lime' | 'ink' | 'stone'
  Body: ComponentType
}

/** Newest first. Add a post by writing a file in content/blog and listing it here. */
export const POSTS: Post[] = [strengthAtHome, weeklyPlan, firstThirtyDays, qrCheckIn, overdueFees].sort(
  (a, b) => b.date.localeCompare(a.date),
)

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug)
}

/** Others from the same category first, then the newest of the rest. */
export function relatedPosts(post: Post, count = 2) {
  const others = POSTS.filter((other) => other.slug !== post.slug)
  return [...others.filter((other) => other.category === post.category), ...others.filter((other) => other.category !== post.category)].slice(
    0,
    count,
  )
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))
}
