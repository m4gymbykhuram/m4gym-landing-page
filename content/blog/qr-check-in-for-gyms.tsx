import { Callout } from '@/app/components/BlogParts'
import type { Post } from '@/lib/blog'

function Body() {
  return (
    <>
      <p>
        The sign-in register at the front desk has been around as long as gyms have. It is simple and it costs nothing. But ask an owner
        what they actually learn from it, and the answer is usually “not much”. Handwriting is hard to read, pages go missing, and nobody
        has time to add up a month of entries.
      </p>
      <p>This post covers what a register misses, how phone check-in works, and how to switch over without upsetting anyone.</p>

      <h2>What a register can’t tell you</h2>
      <ul>
        <li>
          <strong>Who has stopped coming.</strong> The members most likely to cancel are the ones whose visits are slowly drying up. A
          register can’t show you that until you go looking.
        </li>
        <li>
          <strong>When the floor is busy.</strong> Knowing your busiest hours tells you when to have a coach on the floor and when to run
          classes.
        </li>
        <li>
          <strong>Whether someone is up to date.</strong> A name on paper doesn’t say whether their fee is paid.
        </li>
      </ul>

      <h2>Two ways to check in</h2>
      <p>Phone check-in usually works in one of two ways, and the best gyms offer both:</p>
      <ol>
        <li>
          <strong>The member taps Check in</strong> in the app when they arrive. It is fast and needs no staff. You can ask the phone to
          confirm the member is actually at the gym, so nobody checks in from home.
        </li>
        <li>
          <strong>The member shows a QR code</strong> on their digital membership card and the desk scans it. This suits busy front desks,
          and members who prefer someone to greet them.
        </li>
      </ol>

      <h2>What about bad signal?</h2>
      <p>
        Many gyms are in basements or behind thick walls. A good check-in system shouldn’t fail because a phone has one bar. The check-in
        should be saved on the phone and sent the moment the signal returns, with the time the member really arrived.
      </p>

      <h2>Making the switch</h2>
      <ol>
        <li>
          <strong>Run both for two weeks.</strong> Keep the register on the desk, but ask everyone to check in on their phone too.
        </li>
        <li>
          <strong>Help people install the app at the desk.</strong> Most members will do it in a minute if someone shows them.
        </li>
        <li>
          <strong>Keep a way in for everyone.</strong> Staff should be able to check a member in themselves, for the one who left their
          phone in the car.
        </li>
        <li>
          <strong>Then take the register away.</strong> After two weeks, nearly everyone has the habit.
        </li>
      </ol>

      <h2>What you get back</h2>
      <p>
        Once check-ins are recorded properly, the useful questions answer themselves: who trained today, who hasn’t been in for two weeks,
        and which hours are busiest.
      </p>

      <Callout title="How M4GYM does it">
        <p>
          Members check in from the app or show the QR code on their membership card at the desk. You can require them to be at the gym,
          and check-ins made without signal are sent when the phone reconnects. If a member hasn’t trained for a week, the app sends them one
          reminder.
        </p>
      </Callout>
    </>
  )
}

export const post: Post = {
  slug: 'qr-check-in-for-gyms',
  title: 'Moving from a paper sign-in book to QR check-in',
  description: 'What a paper register misses, the two ways phone check-in works, and how to switch over in two weeks.',
  date: '2026-10-15',
  category: 'Running a gym',
  readMinutes: 4,
  image: '/shots/app-member-card.webp',
  imageKind: 'phone',
  Body,
}
