export interface HowItWorksStep {
  id: string
  number: string
  title: string
  description: string
  image: string
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'create-gym',
    number: '01',
    title: 'Create Your Gym',
    description:
      'Set up your gym profile and branches. Add membership plans with prices and periods.',
    image:
      'images/Create Your Gym.png',
  },
  {
    id: 'add-members',
    number: '02',
    title: 'Add Members & Trainers',
    description:
      'Set up your gym profile and branches. Add membership plans with prices and periods.',
    image:
      'images/Add Members.png',
  },
  {
    id: 'run-day',
    number: '03',
    title: 'Run The Day',
    description:
      'Set up your gym profile and branches. Add membership plans with prices and periods.',
    image:
      'images/Run The Day.png',
  },
]
