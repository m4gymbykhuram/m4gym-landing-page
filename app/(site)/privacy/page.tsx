import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, Section } from '../../components/LegalPage'
import { links, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What M4GYM collects, why, who can see it, and how to delete it.',
  alternates: { canonical: '/privacy' },
}

const SECTIONS = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'what-we-collect', title: 'What we collect' },
  { id: 'how-we-use-it', title: 'How we use it' },
  { id: 'ask-m4', title: 'Ask M4 and AI' },
  { id: 'who-sees-it', title: 'Who can see your data' },
  { id: 'providers', title: 'Service providers' },
  { id: 'retention', title: 'How long we keep it' },
  { id: 'your-rights', title: 'Your rights and choices' },
  { id: 'security', title: 'Security' },
  { id: 'children', title: 'Children' },
  { id: 'transfers', title: 'International transfers' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact us' },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={SECTIONS}
      intro={
        <p>
          This policy explains what M4GYM collects when you use the M4GYM app, the M4GYM web console and m4gym.com, why we collect
          it, who can see it, and how you can get a copy or have it deleted. We have tried to write it in plain words.
        </p>
      }
    >
      <Section id="who-we-are" title="Who we are">
        <p>
          M4GYM is operated by <strong>{site.company}</strong>, {site.country} (“we”, “us”). For questions about this policy or your
          data, email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
        <p>
          M4GYM is used in two ways. When you train at a gym that uses M4GYM, <strong>the gym decides how your gym data is used</strong>{' '}
          (it is the controller) and we process it on the gym’s behalf. Your own account, your body measurements, your personal training
          and anything you do without a gym are controlled by us.
        </p>
      </Section>

      <Section id="what-we-collect" title="What we collect">
        <table>
          <thead>
            <tr>
              <th>What</th>
              <th>Examples</th>
              <th>Where it comes from</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account</td>
              <td>Name, email address, password (held by Google Firebase, never by us), the sign-in provider you used</td>
              <td>You, or Apple or Google when you sign in with them</td>
            </tr>
            <tr>
              <td>Profile</td>
              <td>Photo, phone number, date of birth, gender</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Body and goals</td>
              <td>Height, weight over time, goal weight, training goal, days you can train, injuries or limits you tell us about</td>
              <td>You, during setup and when you log your weight</td>
            </tr>
            <tr>
              <td>Training</td>
              <td>Workout plans, finished workouts and sets, achievements, progress</td>
              <td>You, your coach, and Ask M4</td>
            </tr>
            <tr>
              <td>Gym activity</td>
              <td>Memberships and roles, check-ins, class bookings, appointments, issues you report, notes your coach keeps</td>
              <td>You and your gym’s staff</td>
            </tr>
            <tr>
              <td>Fees</td>
              <td>Membership fees your gym records as paid, the amount, method and date</td>
              <td>Your gym’s staff. We never see card numbers.</td>
            </tr>
            <tr>
              <td>Subscriptions</td>
              <td>Plan, status and renewal dates for a gym plan or personal coaching</td>
              <td>Whop, our payment provider</td>
            </tr>
            <tr>
              <td>Messages</td>
              <td>Support tickets and replies, Ask M4 conversations, announcements</td>
              <td>You, your gym and us</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Your position at the moment you check in, only if your gym requires check-in at the gym</td>
              <td>Your phone, with your permission</td>
            </tr>
            <tr>
              <td>Device and usage</td>
              <td>App version, device model, operating system, push token, crash reports, which screens are used</td>
              <td>Your device</td>
            </tr>
          </tbody>
        </table>
        <p>
          Body measurements, injuries and training goals can reveal information about your health. We collect them only to build and
          adjust your training, and only when you give them to us. You can leave any of them out.
        </p>
      </Section>

      <Section id="how-we-use-it" title="How we use it">
        <ul>
          <li>
            <strong>To provide M4GYM</strong>: run your account, your gym’s console, check-ins, classes, plans and progress. (Contract.)
          </li>
          <li>
            <strong>To build your training</strong>: generate and adjust weekly plans from your goal, schedule and history. (Contract,
            and your consent for health-related details.)
          </li>
          <li>
            <strong>To keep you informed</strong>: notifications and reminders about workouts, classes, appointments, fees and support
            replies. You can turn reminders off in the app. (Contract and legitimate interest.)
          </li>
          <li>
            <strong>To take payment</strong> for subscriptions, through Whop. (Contract.)
          </li>
          <li>
            <strong>To keep M4GYM working and safe</strong>: fix crashes, prevent abuse and fraud, and enforce our{' '}
            <Link href={links.terms}>Terms of Use</Link>. (Legitimate interest.)
          </li>
          <li>
            <strong>To improve M4GYM</strong>: understand which features are used, in aggregate. (Legitimate interest.)
          </li>
          <li>
            <strong>To answer you</strong> when you contact support. (Contract and legitimate interest.)
          </li>
        </ul>
        <p>We do not sell your personal data, and we do not use it for advertising.</p>
      </Section>

      <Section id="ask-m4" title="Ask M4 and AI">
        <p>
          Ask M4 and the plan builder use OpenAI’s models. To answer you, we send the question and the context needed to answer it,
          such as your goal, training days, recent workouts or, for gym staff, the gym records the question is about. Your name and email
          are not needed for this and are not sent where we can avoid it. Under its API terms OpenAI does not use this data to train its
          models.
        </p>
        <p>
          AI suggestions can be wrong. Your coach can review and change any plan, and nothing Ask M4 says is medical advice.
        </p>
      </Section>

      <Section id="who-sees-it" title="Who can see your data">
        <ul>
          <li>
            <strong>Your gym</strong>: the owner and managers of each gym you join see your profile, membership, check-ins, fees, bookings
            and the progress you share with the gym.
          </li>
          <li>
            <strong>Your coach</strong>: the coach assigned to you sees your goal, plans, workouts and progress so they can coach you.
          </li>
          <li>
            <strong>Other members</strong>: only what a gym chooses to show, such as a class list or a coach’s public profile. Your weight
            and training are never shown to other members.
          </li>
          <li>
            <strong>Our team</strong>: a small number of staff, when needed to run the service or answer a support request.
          </li>
          <li>
            <strong>Authorities</strong>: only when the law requires it, and we will push back on requests that are too broad.
          </li>
        </ul>
        <p>If you leave a gym, it no longer sees your new activity. Your own progress stays with your account.</p>
      </Section>

      <Section id="providers" title="Service providers">
        <p>We use these providers to run M4GYM. Each only gets what it needs for its job.</p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>What for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Firebase</td>
              <td>Sign-in, push notifications and app usage analytics</td>
            </tr>
            <tr>
              <td>Whop</td>
              <td>Subscription checkout and billing</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>Ask M4 and plan suggestions</td>
            </tr>
            <tr>
              <td>Cloudflare</td>
              <td>Hosting the web console and storing logos and profile photos</td>
            </tr>
            <tr>
              <td>Sentry</td>
              <td>Crash and error reports</td>
            </tr>
            <tr>
              <td>Titan Email</td>
              <td>Sending invitations and account emails</td>
            </tr>
            <tr>
              <td>Our cloud hosting provider</td>
              <td>Running our servers and database</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section id="retention" title="How long we keep it">
        <ul>
          <li>Your account and training data: while you have an account.</li>
          <li>When you delete your account: removed at once from our live systems, and from backups within 30 days.</li>
          <li>
            Fees a gym recorded for you: kept by the gym as part of its business records, without your name or contact details, after
            you delete your account.
          </li>
          <li>Crash reports: 90 days. Support tickets: until you delete your account.</li>
          <li>Anything we must keep by law, for as long as the law requires.</li>
        </ul>
      </Section>

      <Section id="your-rights" title="Your rights and choices">
        <p>Depending on where you live, you can ask us to:</p>
        <ul>
          <li>give you a copy of your data</li>
          <li>correct something that’s wrong (you can edit most of it yourself in the app)</li>
          <li>delete your data and your account</li>
          <li>restrict or object to some uses, or withdraw consent you gave</li>
          <li>send your data to you or someone else in a usable format</li>
        </ul>
        <p>
          To delete your account, follow the steps on <Link href={links.deleteAccount}>Delete your account</Link>. For anything else,
          email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from the address on your account. We answer within 30
          days. If your request is about data a gym controls, we will pass it to the gym and help them answer.
        </p>
        <p>
          You can turn off notifications and location access in your phone’s settings at any time. If you’re in the EU or UK you can
          also complain to your local data protection authority.
        </p>
      </Section>

      <Section id="security" title="Security">
        <p>
          Data is encrypted in transit. Passwords are handled by Google Firebase, never stored by us. Access to production data is limited
          to the people who need it. No system is perfectly secure, so if we learn of a breach that affects you, we will tell you and the
          relevant authorities as the law requires.
        </p>
      </Section>

      <Section id="children" title="Children">
        <p>
          M4GYM is not meant for children under 13, and we don’t knowingly collect their data. A gym that adds members under 18 is
          responsible for getting a parent’s or guardian’s consent where the law requires it. If you believe a child has given us data,
          email us and we will delete it.
        </p>
      </Section>

      <Section id="transfers" title="International transfers">
        <p>
          Our providers may process data in countries other than yours, including the United States. Where the law requires it, we rely on
          safeguards such as standard contractual clauses.
        </p>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <p>
          If we change this policy in a way that matters, we will tell you in the app or by email before the change takes effect. The date
          at the top always shows the latest version.
        </p>
      </Section>

      <Section id="contact" title="Contact us">
        <p>
          {site.company}, {site.country}
          <br />
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </p>
      </Section>
    </LegalPage>
  )
}
