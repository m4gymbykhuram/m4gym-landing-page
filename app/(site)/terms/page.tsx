import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, Section } from '../../components/LegalPage'
import { links, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The agreement between you and M4GYM when you use the app, the web console and m4gym.com.',
  alternates: { canonical: '/terms' },
}

const SECTIONS = [
  { id: 'agreement', title: 'The agreement' },
  { id: 'eligibility', title: 'Who can use M4GYM' },
  { id: 'accounts', title: 'Your account' },
  { id: 'gyms', title: 'Gyms and their members' },
  { id: 'billing', title: 'Plans and billing' },
  { id: 'coaching', title: 'Personal coaching' },
  { id: 'health', title: 'Health and safety' },
  { id: 'ai', title: 'Ask M4 and AI content' },
  { id: 'acceptable-use', title: 'Acceptable use' },
  { id: 'content', title: 'Your content' },
  { id: 'service', title: 'Our service' },
  { id: 'termination', title: 'Suspension and closing accounts' },
  { id: 'liability', title: 'Disclaimers and liability' },
  { id: 'law', title: 'Governing law' },
  { id: 'changes', title: 'Changes and contact' },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      sections={SECTIONS}
      intro={
        <p>
          These terms are the agreement between you and {site.company} for the M4GYM app, the M4GYM web console and m4gym.com
          (together, “M4GYM”). Please read them; by creating an account or using M4GYM you agree to them.
        </p>
      }
    >
      <Section id="agreement" title="The agreement">
        <p>
          These terms, our <Link href={links.privacy}>Privacy Policy</Link> and any plan you choose make up the whole agreement. If you
          use M4GYM for a gym or business, you agree on its behalf and confirm you are allowed to.
        </p>
      </Section>

      <Section id="eligibility" title="Who can use M4GYM">
        <p>
          You must be at least 13 years old. If you are under 18, a parent or guardian must agree to these terms for you. You can’t use
          M4GYM if we have closed your account before or if the law forbids it.
        </p>
      </Section>

      <Section id="accounts" title="Your account">
        <ul>
          <li>Give accurate details and keep them up to date.</li>
          <li>Keep your sign-in safe. You are responsible for what happens under your account.</li>
          <li>
            Tell us straight away at <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> if you think someone else has used
            it.
          </li>
          <li>
            You can delete your account at any time. See <Link href={links.deleteAccount}>Delete your account</Link>.
          </li>
        </ul>
      </Section>

      <Section id="gyms" title="Gyms and their members">
        <p>If you run a gym on M4GYM (as an owner or manager):</p>
        <ul>
          <li>
            You are responsible for the members, coaches and staff you add, for having the right to add them, and for the information
            you record about them.
          </li>
          <li>
            You set and collect your own membership fees. M4GYM helps you record payments; it does not take payments from your members
            and is not a party to your agreements with them.
          </li>
          <li>You are responsible for your gym’s own terms, waivers and health and safety duties to members.</li>
          <li>
            For your members’ data, you are the controller and we process it for you under our Privacy Policy. You must handle it
            lawfully.
          </li>
        </ul>
        <p>
          If you are a member or coach at a gym, the gym decides what you can do there and can remove you from it. Your own account,
          progress and personal coaching are yours and stay with you.
        </p>
      </Section>

      <Section id="billing" title="Plans and billing">
        <ul>
          <li>
            Gyms can use the free plan within its limits. Paid plans raise the limits and add features, at the price shown when you
            subscribe.
          </li>
          <li>
            Subscriptions are sold and billed by <strong>Whop</strong>, our payment provider, and renew automatically each billing period
            until cancelled. Whop’s own terms also apply to the payment.
          </li>
          <li>
            You can cancel at any time. You keep paid features until the end of the period you paid for, then move to the free plan.
          </li>
          <li>Payments are not refundable except where the law says otherwise or we state otherwise in writing.</li>
          <li>We may change prices. We will tell you before a change applies to you, and it takes effect from your next renewal.</li>
          <li>Prices may not include taxes, which you pay where they apply.</li>
        </ul>
      </Section>

      <Section id="coaching" title="Personal coaching">
        <p>
          Personal coaching gives you plans and Ask M4 without a gym. It starts with a free trial (one week of training and a few
          Ask M4 messages). After that it is a paid subscription on the terms in Plans and billing above.
        </p>
      </Section>

      <Section id="health" title="Health and safety">
        <p>
          <strong>M4GYM is not medical advice.</strong> Plans, suggestions and Ask M4 answers are general fitness information. Talk to a
          doctor before starting a new training programme, especially if you are pregnant, injured, or have a medical condition. Stop
          and get help if you feel pain, dizziness or shortness of breath. You train at your own risk, and you are responsible for using
          equipment safely and within your ability.
        </p>
      </Section>

      <Section id="ai" title="Ask M4 and AI content">
        <p>
          Ask M4 and the plan builder generate content with AI. It can be inaccurate or incomplete. Check it before you rely on it, and
          don’t enter information you don’t want processed for this purpose. Coaches remain responsible for the plans they give members.
        </p>
      </Section>

      <Section id="acceptable-use" title="Acceptable use">
        <p>Don’t use M4GYM to:</p>
        <ul>
          <li>break the law or anyone’s rights, including privacy and intellectual property</li>
          <li>harass, threaten or harm anyone, or post hateful, sexual or violent content</li>
          <li>add people or their data without the right to</li>
          <li>send spam, or misuse invitations and announcements</li>
          <li>get around plan limits, access controls or security, or access other gyms’ data</li>
          <li>copy, scrape, reverse engineer or overload M4GYM, or resell it without our permission</li>
        </ul>
      </Section>

      <Section id="content" title="Your content">
        <p>
          You keep ownership of what you put into M4GYM, such as photos, notes and plans. You give us permission to host, store, process
          and show it only as needed to run M4GYM for you and the people you share it with. You confirm you have the right to give us that
          permission.
        </p>
      </Section>

      <Section id="service" title="Our service">
        <p>
          M4GYM, its software, design and brand belong to {site.company}. We may add, change or remove features. We work to keep M4GYM
          available but can’t promise it will always be uninterrupted or free of errors, and we may pause it for maintenance.
        </p>
      </Section>

      <Section id="termination" title="Suspension and closing accounts">
        <p>
          We may suspend or close an account, or a gym, that breaks these terms, puts others at risk, or that we must close by law. Where
          it is reasonable we will tell you first and give you a chance to fix the problem. You can stop using M4GYM and delete your account
          at any time.
        </p>
      </Section>

      <Section id="liability" title="Disclaimers and liability">
        <p>
          M4GYM is provided “as is”. As far as the law allows, we exclude implied warranties and are not liable for indirect or
          consequential loss, lost profits or lost data. Our total liability for any claim is limited to the amount you paid us in the 12
          months before the claim, or USD 100 if you paid nothing. Nothing in these terms limits liability that can’t be limited by law,
          or your rights as a consumer.
        </p>
        <p>
          If you use M4GYM for a business, you agree to cover our reasonable costs from claims caused by your breach of these terms or by
          the data you add.
        </p>
      </Section>

      <Section id="law" title="Governing law">
        <p>
          These terms are governed by the laws of {site.country}, and disputes go to its courts, unless the law where you live gives you
          the right to bring a claim there.
        </p>
      </Section>

      <Section id="changes" title="Changes and contact">
        <p>
          If we change these terms in a way that matters, we will tell you in the app or by email before the change takes effect. If you
          keep using M4GYM after that, the new terms apply. Questions:{' '}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </Section>
    </LegalPage>
  )
}
