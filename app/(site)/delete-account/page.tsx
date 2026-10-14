import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, Section } from '../../components/LegalPage'
import { links, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Delete your account',
  description: 'How to delete your M4GYM account and data, and what happens when you do.',
  alternates: { canonical: '/delete-account' },
}

const SECTIONS = [
  { id: 'in-the-app', title: 'In the app' },
  { id: 'on-the-web', title: 'On the web' },
  { id: 'by-email', title: 'By email' },
  { id: 'what-is-deleted', title: 'What is deleted' },
  { id: 'what-is-kept', title: 'What is kept' },
  { id: 'gym-owners', title: 'If you own a gym' },
  { id: 'subscriptions', title: 'Subscriptions' },
]

export default function DeleteAccountPage() {
  return (
    <LegalPage
      title="Delete your account"
      sections={SECTIONS}
      intro={
        <p>
          You can delete your M4GYM account and its data at any time, from the app, the web console or by email. Deleting is permanent
          and can’t be undone.
        </p>
      }
    >
      <Section id="in-the-app" title="In the app">
        <ol>
          <li>Open M4GYM and go to <strong>More</strong>, then <strong>Settings</strong>.</li>
          <li>Tap <strong>Privacy and data</strong>, then <strong>Delete account</strong>.</li>
          <li>Type DELETE to confirm, and sign in again if asked.</li>
        </ol>
      </Section>

      <Section id="on-the-web" title="On the web">
        <ol>
          <li>
            Sign in at <a href={links.signIn}>app.m4gym.com</a> and open <strong>Profile</strong> from the menu under your photo.
          </li>
          <li>Under <strong>Privacy and data</strong>, choose <strong>Delete account</strong> and confirm.</li>
        </ol>
      </Section>

      <Section id="by-email" title="By email">
        <p>
          If you can’t sign in, email <a href={`mailto:${site.supportEmail}?subject=Delete%20my%20account`}>{site.supportEmail}</a>{' '}
          from the address on your account with the subject “Delete my account”. We confirm it’s you, then delete the account within 7
          days.
        </p>
      </Section>

      <Section id="what-is-deleted" title="What is deleted">
        <ul>
          <li>Your sign-in and profile: name, email, photo, phone, date of birth and gender</li>
          <li>Your body measurements, weight history, goals and training details</li>
          <li>Your workout plans, finished workouts, achievements and progress</li>
          <li>Your Ask M4 conversations, notifications and support tickets</li>
          <li>Your memberships at every gym, your check-ins and class bookings, and your coach’s notes about you</li>
        </ul>
        <p>This happens at once in our live systems. Copies in backups are removed within 30 days.</p>
      </Section>

      <Section id="what-is-kept" title="What is kept">
        <ul>
          <li>
            Fees a gym recorded for you stay in that gym’s records for its accounts, without your name or contact details.
          </li>
          <li>
            Things you wrote into a gym’s shared records, like an equipment issue you reported or a comment on one, stay for the gym
            without your name.
          </li>
          <li>Anything we are required by law to keep, for as long as the law requires.</li>
        </ul>
      </Section>

      <Section id="gym-owners" title="If you own a gym">
        <p>
          A gym can’t be left without an owner. Before you delete your account, either make one of your managers the owner, or close the
          gym, which deletes the gym and all of its data. Both are in <strong>Settings</strong> in the web console, under{' '}
          <strong>Ownership</strong>.
        </p>
      </Section>

      <Section id="subscriptions" title="Subscriptions">
        <p>
          Deleting your account cancels personal coaching. A gym’s plan ends when the gym is closed. Payments already made are not
          refunded; see our <Link href={links.terms}>Terms of Use</Link>.
        </p>
      </Section>
    </LegalPage>
  )
}
