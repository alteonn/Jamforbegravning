import { StarIcon } from '@heroicons/react/24/solid'

interface TestimonialsSectionProps {
  cityName?: string
}

const testimonials = [
  {
    name: 'Leif',
    services: ['Begravning', 'Städ', 'Försäkringsinventering'],
    text: 'Jag kunde enkelt jämföra olika företag, deras priser och tjänster, och fatta ett välgrundat beslut baserat på mina behov och budget. Hade tidigare erfarenhet kring att planera en begravning. Stora prisskillnader på marknaden så detta var en tacksam tjänst.',
  },
  {
    name: 'Henrik',
    services: ['Begravning', 'Flytt', 'Avsluta sociala medier'],
    text: 'Jag uppskattade verkligen den smidigheten från Jämförbegravning under denna svåra tid, fylla i ett formulär och få hjälp. Det gjorde hela processen betydligt enklare och mindre stressande för mig och min familj.',
  },
  {
    name: 'Karin',
    services: ['Begravning', 'Flytt', 'Städ'],
    text: 'Tack vare Jämförbegravning kunde jag spara tid och energi som annars skulle ha gått åt till att leta efter och kontakta olika företag på egen hand. Jag skulle starkt rekommendera Jämförbegravning till alla som söker en smidig och effektiv lösning för att jämföra företag och tjänster.',
  },
]

export default function TestimonialsSection({ cityName }: TestimonialsSectionProps) {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
            {cityName ? `Omdömen från ${cityName}` : 'Vad våra kunder säger'}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Omdömen från personer som använt vår tjänst
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-warm-100 flex items-center justify-center">
                    <span className="text-xl font-serif font-medium text-warm-700">
                      {testimonial.name[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-stone-850">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-warm-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {testimonial.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warm-100 text-warm-700"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}