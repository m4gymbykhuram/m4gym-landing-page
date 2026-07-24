export interface FAQItem {
  id: string
  question: string
  answer: string
}

export type FAQCategory = 'owner' | 'member' | 'trainer'

export const faqCategories: { id: FAQCategory; label: string }[] = [
  { id: 'owner', label: 'Owner' },
  { id: 'member', label: 'Member' },
  { id: 'trainer', label: 'Trainer' },
]

export const faqData: Record<FAQCategory, FAQItem[]> = {
  owner: [
    {
      id: 'owner-1',
      question: 'What is this platform used for?',
      answer:
        'M4GYM is an all-in-one gym management platform that helps gym owners, managers, trainers, and members manage daily operations from a single dashboard.',
    },
    {
      id: 'owner-2',
      question: 'Who can use M4GYM?',
      answer:
        'M4GYM is built for gym owners, managers, front-desk staff, trainers, and members, with a dedicated dashboard experience tailored to each role.',
    },
    {
      id: 'owner-3',
      question: 'Can I manage multiple gym branches?',
      answer:
        'Yes. Owners can create and switch between multiple branches, each with its own staff, members, and membership plans, all from one account.',
    },
    {
      id: 'owner-4',
      question: 'How does attendance tracking work?',
      answer:
        'Attendance is logged automatically at check-in through the front-desk dashboard or QR scan, and owners can view real-time attendance reports per branch.',
    },
    {
      id: 'owner-5',
      question: 'Can I see revenue and billing reports?',
      answer:
        'Owners get access to detailed revenue dashboards, including monthly recurring revenue, overdue payments, and per-branch financial breakdowns.',
    },
  ],
  member: [
    {
      id: 'member-1',
      question: 'How do I book a class?',
      answer:
        'Members can browse available classes by day and trainer, then reserve a spot directly from their dashboard or mobile app.',
    },
    {
      id: 'member-2',
      question: 'Can I track my own progress?',
      answer:
        'Yes. Members have access to a personal dashboard showing workout history, attendance streaks, and progress toward their fitness goals.',
    },
    {
      id: 'member-3',
      question: 'How do I renew or upgrade my membership?',
      answer:
        'Membership renewals and upgrades can be handled directly from your account settings, with prorated billing applied automatically.',
    },
    {
      id: 'member-4',
      question: 'Can I message my trainer through the platform?',
      answer:
        'Members can send direct messages to their assigned trainer for questions about workout plans or scheduling changes.',
    },
    {
      id: 'member-5',
      question: 'Is there a mobile app?',
      answer:
        'Yes, M4GYM is available on iOS and Android so members can check schedules, book classes, and track progress on the go.',
    },
  ],
  trainer: [
    {
      id: 'trainer-1',
      question: 'Can trainers create workout plans?',
      answer:
        'Trainers can build custom workout plans for individual members or reusable templates for group classes, all managed from their dashboard.',
    },
    {
      id: 'trainer-2',
      question: 'How do I track client progress?',
      answer:
        'Each client profile includes a progress log where trainers can record measurements, workout completion, and personal notes over time.',
    },
    {
      id: 'trainer-3',
      question: 'Can I manage my own class schedule?',
      answer:
        'Trainers have full control over their class calendar, including setting availability, capacity limits, and blocking off time off.',
    },
    {
      id: 'trainer-4',
      question: 'How do I get paid through the platform?',
      answer:
        'Trainer payouts are calculated based on sessions completed or classes taught, and can be reviewed in the trainer earnings dashboard.',
    },
    {
      id: 'trainer-5',
      question: 'Can I communicate with gym owners or managers?',
      answer:
        'Yes, trainers can message gym management directly through the platform for scheduling requests or operational questions.',
    },
  ],
}
