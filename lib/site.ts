/** Everything the site links to, in one place. */
export const site = {
  name: 'M4GYM',
  url: 'https://m4gym.com',
  company: 'Lead Softwares',
  country: 'Pakistan',
  supportEmail: 'support@m4gym.com',
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.m4gym.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://server.m4gym.com/api/v1',
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  legalUpdated: '14 October 2026',
} as const

export const links = {
  signUp: `${site.appUrl}/auth?mode=signup`,
  signIn: `${site.appUrl}/auth`,
  features: '/features',
  pricing: '/pricing',
  coaching: '/personal-coaching',
  download: '/download',
  faq: '/faq',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  deleteAccount: '/delete-account',
  support: '/support',
}

/** A mailto link with the subject filled in, so requests arrive sorted. */
export function mailto(subject: string) {
  return `mailto:${site.supportEmail}?subject=${encodeURIComponent(subject)}`
}
