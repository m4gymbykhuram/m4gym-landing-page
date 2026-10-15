export interface FaqItem {
  q: string
  a: string
}

export interface FaqGroup {
  id: string
  title: string
  items: FaqItem[]
}

/** Every answered question, grouped. Pages show the group that fits them. */
export const FAQ: FaqGroup[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      {
        q: 'Who uses the website and who uses the app?',
        a: 'Owners and managers run the gym from the website. Coaches and members use the app on their phones, so nobody has to learn two tools.',
      },
      {
        q: 'Is there a free plan?',
        a: 'Yes. Free covers a small gym with no card needed. Paid plans raise the limits and add the activity log, member export and priority support.',
      },
      {
        q: 'How do I bring my existing members over?',
        a: 'Add them at the desk or invite them by email. Anyone can also find your gym’s public page and ask to join, and you approve the request.',
      },
      {
        q: 'Can I run more than one gym?',
        a: 'Yes. One account can own or manage several gyms, and you switch between them from the menu. Each gym has its own plan, members and staff.',
      },
    ],
  },
  {
    id: 'members',
    title: 'Members and check-in',
    items: [
      {
        q: 'How do members check in?',
        a: 'They tap Check in when they arrive, or show the QR code on their membership card and staff scan it at the desk. You can require them to be at the gym to check in.',
      },
      {
        q: 'What if a member’s phone has no signal at the gym?',
        a: 'The check-in is saved on the phone and sent as soon as the signal comes back, with the time they actually arrived. Finished workouts work the same way.',
      },
      {
        q: 'Can someone be a member of more than one gym?',
        a: 'Yes. A member has one M4GYM account. Their progress and achievements belong to them and count across every gym they train at.',
      },
      {
        q: 'Do members get reminders?',
        a: 'Yes, and each kind can be turned off in the app: the morning of a planned workout, before a class or appointment, before a fee runs out, and a nudge after a week without training.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Fees and billing',
    items: [
      {
        q: 'Do my members and coaches pay for the app?',
        a: 'No. The app is free for everyone at your gym; your plan covers it. Personal coaching is a separate, optional subscription for people training on their own.',
      },
      {
        q: 'Do you take payments from my members?',
        a: 'Not yet. You record the fees members pay you, by cash or bank transfer, and M4GYM keeps track of who has paid and who is overdue.',
      },
      {
        q: 'How is M4GYM billed?',
        a: 'Paid plans are billed monthly through Whop, our payment provider. Prices are shown before you subscribe.',
      },
      {
        q: 'Can I cancel any time?',
        a: 'Yes, from Billing in your console. You keep paid features until the end of the period you paid for, then the gym moves to the free plan. Nothing is deleted.',
      },
    ],
  },
  {
    id: 'coaching',
    title: 'Coaching and Ask M4',
    items: [
      {
        q: 'What is Ask M4?',
        a: 'An assistant built into M4GYM. Owners ask about their gym in plain words, coaches use it to draft weekly plans, and members ask about their training.',
      },
      {
        q: 'Does Ask M4 replace coaches?',
        a: 'No. It drafts; people decide. A coach reviews and changes every plan it suggests, and nothing it says is medical advice.',
      },
      {
        q: 'What is personal coaching?',
        a: 'The app for people who train without a gym. It builds your week from your goal, your kit and your days, and adjusts as you go. It starts with a free trial.',
      },
      {
        q: 'Can I keep my progress if I join a gym later?',
        a: 'Yes. Your weight history, streaks and achievements stay with your account when you join a gym.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data and privacy',
    items: [
      {
        q: 'What happens to my data if I leave?',
        a: 'It’s yours. Paid plans can export members to CSV, and you can delete your account at any time. Our Privacy Policy says exactly what we keep and why.',
      },
      {
        q: 'Who can see a member’s weight and training?',
        a: 'The member, their coach, and the gym’s owner and managers. Other members never see it.',
      },
      {
        q: 'How do I delete my account?',
        a: 'In the app: More, Settings, Privacy and data. On the web: Profile, Privacy and data. Gym owners close the gym or hand it over first.',
      },
    ],
  },
]

export function faqGroup(id: string) {
  return FAQ.find((group) => group.id === id)?.items ?? []
}

/** FAQPage structured data for the questions shown on a page. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
