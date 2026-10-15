import { Dumbbell } from 'lucide-react'
import Link from 'next/link'
import { Callout } from '@/app/components/BlogParts'
import type { Post } from '@/lib/blog'
import { links } from '@/lib/site'

function Body() {
  return (
    <>
      <p>
        You don’t need a gym, a coach or a lot of equipment to start getting stronger. You need a plan you can follow, a few hours a week,
        and the patience to start lighter than you think. This guide covers the first four weeks of training on your own.
      </p>
      <p>
        <em>
          This is general fitness information, not medical advice. If you are pregnant, injured, or have a heart, blood pressure or other
          medical condition, talk to a doctor before you start.
        </em>
      </p>

      <h2>What you need</h2>
      <ul>
        <li>
          <strong>Three days a week</strong>, with a rest day between them. Monday, Wednesday and Friday is a classic for a reason.
        </li>
        <li>
          <strong>Forty minutes</strong> each time, including a warm-up.
        </li>
        <li>
          <strong>Whatever kit you have.</strong> Body weight is enough to start. A pair of dumbbells or a resistance band adds a lot.
        </li>
      </ul>

      <h2>The five movements</h2>
      <p>Nearly every strength programme is built from a handful of movement patterns. Cover these and you have trained the whole body:</p>
      <ol>
        <li>
          <strong>Squat</strong>: sit down and stand up. Bodyweight squats, or holding a dumbbell at your chest.
        </li>
        <li>
          <strong>Hinge</strong>: bend at the hips with a flat back. Glute bridges, or a dumbbell Romanian deadlift.
        </li>
        <li>
          <strong>Push</strong>: press away from you. Push-ups, against a wall or a table to start if you need to.
        </li>
        <li>
          <strong>Pull</strong>: draw towards you. One-arm dumbbell rows, or band rows tied to a door.
        </li>
        <li>
          <strong>Carry or brace</strong>: hold your middle still. Planks, or walking while holding something heavy.
        </li>
      </ol>

      <h2>Your first four weeks</h2>
      <p>Do all five movements each session. Rest about a minute between sets.</p>
      <ul>
        <li>
          <strong>Week 1:</strong> 2 sets of 8 to 10 reps, plank for 20 seconds. Choose an easy version of each. The goal is to learn the
          movements, not to be sore.
        </li>
        <li>
          <strong>Week 2:</strong> 3 sets of 8 to 10 reps, plank for 25 seconds.
        </li>
        <li>
          <strong>Week 3:</strong> 3 sets of 10 to 12 reps, plank for 30 seconds. If the top of the range felt easy last week, move to a
          slightly harder version or add a little weight.
        </li>
        <li>
          <strong>Week 4:</strong> 3 sets of 10 to 12 reps with the harder version, plank for 35 seconds.
        </li>
      </ul>

      <h2>How hard should it feel?</h2>
      <p>
        Finish each set feeling you could have done two or three more reps with good form. That is hard enough to make progress, and easy
        enough to keep your technique. If your form breaks down, the set is over.
      </p>

      <h2>Progress slowly, and write it down</h2>
      <p>
        Getting stronger comes from asking a little more over time: one more rep, a few more seconds, a slightly heavier weight. Write down
        what you did each session so you know what to beat next time. It is also the best motivation there is: in four weeks you will see
        how far you have come.
      </p>

      <h2>Rest is part of the plan</h2>
      <p>
        Muscles get stronger between sessions, not during them. Sleep well, eat enough protein, and take the rest days. Some muscle soreness
        a day or two after training is normal. Sharp pain, dizziness or chest pain is not: stop and get help.
      </p>

      <h2>After four weeks</h2>
      <p>
        Keep going with the same pattern, adding a little each week, or move to a plan that splits the body into different days. The best
        plan is still the one you will actually do.
      </p>

      <Callout title="Training without a gym?">
        <p>
          <Link href={links.coaching}>M4GYM personal coaching</Link> builds your week from your goal, the kit you have and the days you can
          train, then adjusts it as you go. You follow each workout set by set, and Ask M4 answers your questions along the way.
        </p>
      </Callout>
    </>
  )
}

export const post: Post = {
  slug: 'start-strength-training-on-your-own',
  title: 'Starting strength training on your own: the first four weeks',
  description: 'Five movements, three days a week, and how to progress safely. A plain-words plan for training without a gym.',
  date: '2026-10-15',
  category: 'Training',
  readMinutes: 6,
  cover: 'Your first four weeks.',
  icon: Dumbbell,
  tone: 'lime',
  Body,
}
