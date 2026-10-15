import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'
import { site } from '@/lib/site'

const PAGES: Array<[path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly']> = [
  ['', 1, 'monthly'],
  ['/features', 0.9, 'monthly'],
  ['/pricing', 0.9, 'monthly'],
  ['/personal-coaching', 0.8, 'monthly'],
  ['/download', 0.7, 'monthly'],
  ['/blog', 0.7, 'weekly'],
  ['/faq', 0.6, 'monthly'],
  ['/about', 0.5, 'yearly'],
  ['/contact', 0.5, 'yearly'],
  ['/support', 0.5, 'yearly'],
  ['/privacy', 0.3, 'yearly'],
  ['/terms', 0.3, 'yearly'],
  ['/delete-account', 0.3, 'yearly'],
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, priority, changeFrequency })),
    ...POSTS.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date,
      priority: 0.6,
      changeFrequency: 'yearly' as const,
    })),
  ]
}
