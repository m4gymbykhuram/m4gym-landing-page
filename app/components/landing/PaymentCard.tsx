import FeatureCard from './FeatureCard'
import { WalletIcon } from 'lucide-react'
import Image from 'next/image'

const PaymentCard = () => {
  return (
    <FeatureCard
      title="Payment Records"
      description="Record manual payments and see who paid, who owes."
      icon={<WalletIcon className="h-6 w-6 text-black" />}
    >
      <Image
        src="/assets/payment_records.png"
        width={500}
        height={500}
        className="h-70 md:h-44 xl:h-64 w-full rounded-2xl object-cover"
        alt="payment records"
      />
    </FeatureCard>
  )
}

export default PaymentCard
