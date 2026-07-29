import FeatureCard from './FeatureCard'
import { DumbbellIcon } from 'lucide-react'
import Image from 'next/image'

const EquipmentCard = () => {
  return (
    <FeatureCard
      title="Equipment & Maintenance"
      description="Track equipment condition and review maintenance history."
      icon={<DumbbellIcon className="h-6 w-6 text-black" />}
    >
      <Image
        src="/assets/equipment.png"
        width={500}
        height={500}
        className="h-70 md:h-44 xl:h-64 w-full rounded-2xl object-cover"
        alt="Equipment & Maintenance"
      />
    </FeatureCard>
  )
}

export default EquipmentCard
