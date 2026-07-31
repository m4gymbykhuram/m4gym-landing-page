import CustomButton from '../CustomButton'
import AnimatedHeading from './AnimatedHeading'

const TransformSection = () => {
  return (
    <section className="bg-[#111214] py-20 px-4 md:px-8">
      <div className="max-w-7xl flex flex-col items-center gap-6 mx-auto">
        <AnimatedHeading
          text="READY TO TRANSFORM YOUR GYM?"
          className="font-anton text-center uppercase text-3xl sm:text-4xl  xl:text-[44px] text-white leading-tight max-w-2xl"
        />
        <CustomButton text="Get Started For Free" className="cursor-pointer" />
      </div>
    </section>
  )
}

export default TransformSection
