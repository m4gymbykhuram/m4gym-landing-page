import { Testimonial } from '@/lib/testimonials-data'
import { Quote } from 'lucide-react'

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="text-center space-y-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-30 h-30 rounded-2xl object-cover shrink-0"
        />
        <span className="font-anton text-md text-primary uppercase tracking-wide">
          {testimonial.role}
        </span>
      </div>

      <div>
        <img
          src={'/assets/quotes_icon.png'}
          alt={'qoutes'}
          className="w-8 h-auto mb-4"
        />
        <p className="font-archivo text-white/70 text-base leading-relaxed mb-4 max-w-md">
          {testimonial.quote}
        </p>
      </div>
    </div>
  )
}
