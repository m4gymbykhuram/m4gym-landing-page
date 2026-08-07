import FeatureCard from './FeatureCard'
import { ArchiveIcon } from 'lucide-react'
import Image from 'next/image'
import InventoryChart from '../animated-svgs/InventoryChart';

const InventoryCard = () => {
  return (
    <FeatureCard
      title="Inventory & Stock"
      description="Manage products, quantities and stock alerts."
      icon={<ArchiveIcon className="h-6 w-6 text-black" />}
    >
      {/* <Image
        src="/assets/inventory.png"
        width={900}
        height={500}
        className="h-70 md:h-44 xl:h-64  w-full rounded-2xl object-cover"
        alt="Inventory & Stock"
      /> */}

      <InventoryChart loop={true}  />
    </FeatureCard>
  )
}

export default InventoryCard
