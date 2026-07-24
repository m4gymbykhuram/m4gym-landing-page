export interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    role: 'Owner',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote:
      "M4GYM gave me complete control over my business. From memberships and payments to staff scheduling and attendance, everything is managed in one place. We've reduced administrative work by more than half.",
  },
  {
    id: 't2',
    name: 'Jordan Lee',
    role: 'Trainer',
    image:
      'https://plus.unsplash.com/premium_photo-1663036880678-62ae2e87c4c1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote:
      'I can assign workout plans, track client progress, and manage my schedule without juggling multiple apps. It lets me focus on coaching instead of paperwork.',
  },
  {
    id: 't3',
    name: 'Amir Khan',
    role: 'Front Desk',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Aamir_Khan_at_Satyamev_Jayate_press_conference_13.jpg/250px-Aamir_Khan_at_Satyamev_Jayate_press_conference_13.jpg',
    quote:
      'Check-ins are instant now. I can pull up any member profile in seconds and handle walk-ins without slowing down the line.',
  },
  {
    id: 't4',
    name: 'Priya Nair',
    role: 'Member',
    image:
      'https://cdn.sanity.io/images/si2sjj3u/production/a3232092855bf3a1c5fc7ab38a4961f59061d57d-2920x1344.png?rect=180,0,2560,1344&w=1200&h=630&fm=webp',
    quote:
      'Booking classes and tracking my own progress used to be scattered across three apps. Now it is all in one clean dashboard.',
  },
]
