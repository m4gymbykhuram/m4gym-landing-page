import { Wallet } from 'lucide-react'
import { Callout } from '@/app/components/BlogParts'
import type { Post } from '@/lib/blog'

function Body() {
  return (
    <>
      <p>
        In most small gyms, fees are paid at the desk in cash or by bank transfer, and someone keeps track in a register, a spreadsheet or
        their head. When a fee goes overdue it is rarely because the member has decided not to pay. They forgot, they assumed someone else
        in the family paid, or nobody mentioned it. That is good news, because forgetting is easy to fix.
      </p>
      <p>Here are seven habits that keep fees coming in on time, without awkward conversations at the front desk.</p>

      <h2>1. Give every member one clear due date</h2>
      <p>
        Decide how your gym bills and stick to it. Either everyone pays on the same day of the month, or each member pays on the day they
        joined. Both work. What doesn’t work is a mix, because then nobody, staff included, knows who is due this week.
      </p>
      <p>Write the due date down when someone joins, and tell them it out loud. It is the single most useful thing you can do.</p>

      <h2>2. Know who is due before they walk in</h2>
      <p>
        Spend two minutes each morning looking at who is due this week and who is already late. When that person checks in, the desk can
        say “your fee is due on Friday” as a friendly reminder rather than chasing them weeks later.
      </p>

      <h2>3. Remind before the due date, not after</h2>
      <p>
        A message three days before a fee runs out feels like service. The same message a week after it ran out feels like a demand. Early
        reminders are the cheapest way to cut overdue fees, and most members appreciate them.
      </p>

      <h2>4. Make paying the easy part</h2>
      <p>
        If a member has to ask for your bank details every month, some won’t bother. Put the account details on a card at the desk and in
        your welcome message, accept the methods people actually use, and give a receipt every time. Paying should take less effort than
        forgetting.
      </p>

      <h2>5. Record every payment the moment it’s made</h2>
      <p>
        A list of who owes money is only useful if it is right. If payments are written up at the end of the week, the list is wrong for
        days, and the one time you remind someone who has already paid, you lose their trust in the list. Record it at the desk, while the
        member is still standing there.
      </p>

      <h2>6. Have a written grace period</h2>
      <p>
        Decide what happens when a fee is late: for example, seven days of grace, then classes are paused until it is paid. Tell members
        when they join and put it on the wall. A rule everyone knows about isn’t personal when you apply it.
      </p>

      <h2>7. Talk to the long-overdue in person, privately</h2>
      <p>
        For the few who are weeks behind, a short, private conversation works better than another message. Often there is a reason: money
        is tight this month, or they have been injured and stopped coming. Offering to pause a membership keeps a member you would
        otherwise lose.
      </p>

      <Callout title="How M4GYM helps">
        <p>
          Staff record a fee in a few seconds, by cash or bank transfer. The dashboard shows who is due this week and who is overdue, and
          members get a reminder three days before their fee runs out and the day after. Owners get a short summary every Monday morning.
        </p>
      </Callout>

      <h2>The short version</h2>
      <ul>
        <li>One due date per member, told to them when they join.</li>
        <li>Check who is due each morning, and remind before the date.</li>
        <li>Record payments straight away so the list stays right.</li>
        <li>Agree a grace period, and talk privately to anyone far behind.</li>
      </ul>
    </>
  )
}

export const post: Post = {
  slug: 'cut-overdue-gym-fees',
  title: 'Seven ways to cut overdue membership fees',
  description: 'Most overdue fees aren’t refusals, they’re forgotten. Seven habits that get small gyms paid on time.',
  date: '2026-10-15',
  category: 'Running a gym',
  readMinutes: 4,
  cover: 'Paid on time.',
  icon: Wallet,
  tone: 'lime',
  Body,
}
