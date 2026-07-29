import { Testimonial } from '@/lib/testimonials-data'

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start gap-6">
      <div className="text-center space-y-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 md:w-30 md:h-30 rounded-2xl object-cover shrink-0"
        />
        <span className="font-anton text-md text-primary uppercase tracking-wide">
          {testimonial.role}
        </span>
      </div>

      <div className="text-center md:text-start">
        <img
          src={'/assets/quotes_icon.png'}
          alt={'qoutes'}
          className="mx-auto md:mx-0 w-4 md:w-8 h-auto mb-4"
        />
        <p className="font-archivo text-white/70 text-base leading-relaxed mb-4 max-w-md">
          {testimonial.quote}
        </p>
      </div>
    </div>
  )
}
