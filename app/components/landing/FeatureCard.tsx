type CardProps = {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
}

export default function FeatureCard({
  title,
  description,
  icon,
  children,
}: CardProps) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#111214] p-3 h-full">
      <div className="overflow-hidden rounded-3xl">{children}</div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7FF33]">
          {icon}
        </div>
        <h3 className="font-anton md:text-lg text-xl uppercase text-white">
          {title}
        </h3>
      </div>
      <p className="mt-2 max-w-120 md:text-sm lg:text-lg lg:leading-8 text-white/55">
        {description}
      </p>
    </div>
  )
}
