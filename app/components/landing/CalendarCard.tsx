import FeatureCard from './FeatureCard'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'

const CalendarCard = () => {
  return (
    <FeatureCard
      title="The Calendar"
      description="Staff mark members present, or members self check-in. Everyone keeps a clean history."
      icon={<CalendarIcon className="h-6 w-6 text-black" />}
    >
      <Image
        src="/assets/calendar.png"
        width={900}
        height={500}
        className="h-70 md:h-44 xl:h-64 w-full rounded-2xl object-cover"
        alt="calender image"
      />
    </FeatureCard>
  )
}

export default CalendarCard
