import { Check } from 'lucide-react'

const includedFeatures = [
  'Member & trainer records',
  'Daily attendance tracking',
  'Payment records & overdue alerts',
  'Role-based staff access',
  'Equipment & complaint tracking',
  'Public gym profile',
]

export default function EveryPlanIncludesBanner() {
  const half = Math.ceil(includedFeatures.length / 2)
  const columnOne = includedFeatures.slice(0, half)
  const columnTwo = includedFeatures.slice(half)

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden px-8 md:px-12 py-10 md:py-12"
      style={{
      backgroundImage: 'url(/assets/plans-bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-16">
        {/* Left: heading */}
        <div className="max-w-xs shrink-0">
          <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase mb-3 leading-tight text-center md:text-start">
            Every Plan Includes
          </h3>
          <p className="font-archivo text-white/60 text-sm sm:text-base leading-relaxed text-center md:text-start">
            The core system is never paywalled, plans only change scale.
          </p>
        </div>

        {/* Right: two-column checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
          {[columnOne, columnTwo].map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check
                    className="w-4 h-4 text-white shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="font-archivo text-white text-sm sm:text-base whitespace-nowrap">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
