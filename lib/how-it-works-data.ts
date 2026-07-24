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
      'https://images.unsplash.com/photo-1770513649465-2c60c8039806?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'add-members',
    number: '02',
    title: 'Add Members & Trainers',
    description:
      'Set up your gym profile and branches. Add membership plans with prices and periods.',
    image:
      'https://images.unsplash.com/photo-1623874106686-5be2b325c8f1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'run-day',
    number: '03',
    title: 'Run The Day',
    description:
      'Set up your gym profile and branches. Add membership plans with prices and periods.',
    image:
      'https://images.unsplash.com/photo-1613845205719-8c87760ab728?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]
