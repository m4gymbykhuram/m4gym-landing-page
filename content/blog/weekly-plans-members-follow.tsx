import { ClipboardList } from 'lucide-react'
import { Callout } from '@/app/components/BlogParts'
import type { Post } from '@/lib/blog'

function Body() {
  return (
    <>
      <p>
        A perfect training plan that a member doesn’t follow is worth less than a simple one they do. Most coaches have written a great
        programme, handed it over, and found out a fortnight later that it was never opened. The plan was fine. It just didn’t fit the
        person’s week.
      </p>
      <p>Here is how to write weekly plans that members actually finish.</p>

      <h2>Start from their week, not your template</h2>
      <p>Before choosing a single exercise, ask three questions:</p>
      <ul>
        <li>
          <strong>Which days can you really train?</strong> Not the days they would like to. The days they can.
        </li>
        <li>
          <strong>How long do you have?</strong> Forty-five minutes on a work day is a different session from ninety on a Saturday.
        </li>
        <li>
          <strong>What gets in the way?</strong> Injuries, shift work, kit they don’t like, a machine they find intimidating.
        </li>
      </ul>
      <p>Then build the week around the answers. Three sessions that happen beat five that don’t.</p>

      <h2>Make every session obvious</h2>
      <p>A member alone on the floor should never have to guess. For each exercise, write:</p>
      <ul>
        <li>the exercise name, the one they will see on the machine or hear in the gym</li>
        <li>sets and reps, or a time for timed work like planks and carries</li>
        <li>the weight to start with, or “pick a weight you could lift three more times”</li>
        <li>rest between sets</li>
      </ul>
      <p>Keep sessions to five or six exercises. Long lists are where people start skipping.</p>

      <h2>One goal per week</h2>
      <p>
        Give each week one small, clear focus: add a set to the main lift, finish every session, or try the new exercise with good form.
        A member who knows what “good” looks like this week is far more likely to get there.
      </p>

      <h2>Progress a little, every week</h2>
      <p>
        The body adapts to what it is asked to do, so the plan has to ask a bit more over time. That doesn’t mean big jumps. A little more
        weight, one more rep, or one more set is enough. If a member finished everything easily, nudge it up. If they struggled, hold it,
        or ease off.
      </p>

      <h2>Read what actually happened</h2>
      <p>
        The most useful thing a coach can see is not the plan but the record: which sessions were done, which were skipped, and which were
        started but not finished. Skipped sessions on the same day each week usually mean the day is wrong, not the member. Unfinished
        sessions often mean the session is too long.
      </p>

      <h2>Use AI for the draft, not the decision</h2>
      <p>
        Drafting a fresh week for every member takes hours. AI is good at the first draft: it can take a member’s goal, days and recent
        workouts and propose a sensible week. The coach’s job is the part AI can’t do: knowing the person, spotting the problem, and making
        the call.
      </p>

      <Callout title="How M4GYM helps">
        <p>
          Coaches build each member’s week in the app, with Ask M4 drafting it from the member’s goal, schedule and history. The member
          follows it set by set, and the coach sees what was completed, skipped or left unfinished. Members get a reminder on the morning
          of a planned workout.
        </p>
      </Callout>
    </>
  )
}

export const post: Post = {
  slug: 'weekly-plans-members-follow',
  title: 'How to write a weekly plan members actually follow',
  description: 'The plan isn’t the problem; the fit is. A coach’s guide to weekly training that gets finished, week after week.',
  date: '2026-10-15',
  category: 'Coaching',
  readMinutes: 5,
  cover: 'Plans that get done.',
  icon: ClipboardList,
  tone: 'ink',
  Body,
}
