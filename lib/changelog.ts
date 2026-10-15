export interface ChangeItem {
  title: string
  detail?: string
  area: 'Web console' | 'App' | 'Everywhere'
}

export interface Release {
  /** ISO date the changes went out. */
  date: string
  items: ChangeItem[]
}

/** What has shipped, newest first. Written from the commit history of the server, web console and app. */
export const CHANGELOG: Release[] = [
  {
    date: '2026-10-14',
    items: [
      {
        title: 'Reminders for workouts, classes, appointments and fees',
        detail:
          'Members hear about a planned workout at 8:00, a class an hour before, and a fee three days before it runs out. Owners get a fee summary every Monday. Each kind can be turned off in Settings.',
        area: 'Everywhere',
      },
      {
        title: 'Check-ins and workouts survive a bad signal',
        detail: 'If the phone is offline, the check-in or finished workout is kept and sent with its original time when the signal returns.',
        area: 'App',
      },
      {
        title: 'Delete your account, close a gym, or hand it over',
        detail: 'From Settings in the app or Profile on the web. Owners hand the gym to a manager or close it first.',
        area: 'Everywhere',
      },
      {
        title: 'Invitation links open the app',
        detail: 'Tapping an invitation on a phone with M4GYM installed opens the invitation in the app.',
        area: 'App',
      },
      {
        title: 'Equipment as a table, with each machine’s next service date',
        area: 'Web console',
      },
      {
        title: 'Timed exercises fit small screens',
        detail: 'Set circles wrap onto a second line instead of running off the edge.',
        area: 'App',
      },
    ],
  },
  {
    date: '2026-10-13',
    items: [
      { title: 'Coaches can save edits to a member’s plan from the app', area: 'App' },
      { title: 'The setup checklist ticks itself off from your real coaches, classes and equipment', area: 'Web console' },
      { title: 'Public coach pages hide empty fields and show specialties', area: 'Web console' },
      { title: 'Achievements read naturally, such as “First workout done”', area: 'Everywhere' },
      { title: 'Coach home says “A free day” when nothing is booked', area: 'App' },
    ],
  },
  {
    date: '2026-10-11',
    items: [
      {
        title: 'One-to-one sessions in the app',
        detail: 'Coaches book sessions with a client; members can ask to move them.',
        area: 'App',
      },
      { title: 'Class pages: members book or cancel, coaches mark who came', area: 'App' },
      { title: 'Notifications grouped by day', area: 'Everywhere' },
      { title: 'Members at risk include a phone number to call', area: 'Everywhere' },
      { title: 'Support tickets read as a conversation', area: 'Web console' },
    ],
  },
  {
    date: '2026-10-10',
    items: [
      {
        title: 'Front desk: add members with their first fee and check them in by QR card',
        area: 'Everywhere',
      },
      { title: 'Printable membership cards', area: 'Web console' },
      { title: 'Progress: weight trend toward a goal and twelve weeks of training', area: 'App' },
      { title: 'Week view for the schedule', area: 'Web console' },
      { title: 'Shop sales take stock off the shelf, sold by quantity', area: 'Web console' },
      { title: 'Record payments from the app', area: 'App' },
    ],
  },
]

export function formatReleaseDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))
}
