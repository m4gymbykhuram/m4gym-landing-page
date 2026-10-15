import { Users } from 'lucide-react'
import { Callout } from '@/app/components/BlogParts'
import type { Post } from '@/lib/blog'

function Body() {
  return (
    <>
      <p>
        Every gym owner knows the pattern. A new member arrives full of energy, trains four times in the first week, twice in the second,
        once in the third, and then disappears. By the time their fee is due, they have already decided not to renew.
      </p>
      <p>
        The first month decides whether someone becomes a regular. People rarely leave because of the equipment or the price. They leave
        because they never quite worked out what to do, never felt anyone noticed them, and the habit never formed. All three can be fixed.
      </p>

      <h2>Week one: a plan and a person</h2>
      <p>
        Nothing makes a new member feel lost faster than standing in the middle of the floor wondering what to do next. Before they leave
        on day one, they should have two things:
      </p>
      <ul>
        <li>
          <strong>A coach who knows their name</strong> and what they are training for.
        </li>
        <li>
          <strong>A plan for the week</strong>, even a simple one: which days to come, and what to do when they get here.
        </li>
      </ul>
      <p>Ask about their goal, the days they can realistically train, and any injuries. Then build the first week around that answer.</p>

      <h2>Week two: notice them</h2>
      <p>
        Most drop-off starts in the second week, when the first rush wears off. This is when small signs of attention matter most. The coach
        checks how the first workouts went and adjusts anything that was too hard or too easy. The desk says hello by name. If someone
        planned three sessions and came once, a short, friendly message asking how they are doing goes a long way.
      </p>

      <h2>Week three: show progress</h2>
      <p>
        Results take longer than three weeks, but progress doesn’t. A heavier weight on a lift, a full workout finished, three weeks in a row
        of training: point these out. People keep doing things they can see themselves getting better at.
      </p>

      <h2>Week four: make it a routine</h2>
      <p>
        By the end of the month, the aim is that training is part of the member’s week, not something they have to decide to do. Fixed days
        help. So do classes, which add a time, a place and people who will notice if they don’t come. Before the first fee is due, have a
        short conversation about how the month went and what the next month looks like.
      </p>

      <h2>Watch the early warning signs</h2>
      <p>The members most likely to leave usually show it weeks before they cancel:</p>
      <ul>
        <li>Visits falling from week to week</li>
        <li>No visit at all for seven days or more</li>
        <li>Planned workouts started but not finished</li>
        <li>A fee that slips past its due date</li>
      </ul>
      <p>None of these needs a hard sell. A message from their coach is usually enough to bring someone back.</p>

      <Callout title="How M4GYM helps">
        <p>
          New members are matched to a coach and start with a plan straight away. Members see their streak and progress in the app, and if
          they go a week without training they get a friendly nudge. Owners can ask Ask M4 who hasn’t visited lately, in plain words.
        </p>
      </Callout>

      <h2>The short version</h2>
      <ol>
        <li>Day one: a coach and a plan.</li>
        <li>Week two: notice them, and adjust the plan.</li>
        <li>Week three: point out progress.</li>
        <li>Week four: fixed days, a class, and a chat before the first renewal.</li>
      </ol>
    </>
  )
}

export const post: Post = {
  slug: 'keep-new-gym-members',
  title: 'The first 30 days: how to keep new gym members',
  description: 'Most members who leave decide in their first month. A week-by-week guide to turning new joiners into regulars.',
  date: '2026-10-15',
  category: 'Running a gym',
  readMinutes: 5,
  cover: 'The first 30 days.',
  icon: Users,
  tone: 'stone',
  Body,
}
