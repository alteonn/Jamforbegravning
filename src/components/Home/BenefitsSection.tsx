import { BanknotesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const benefits = [
  {
    title: 'Spara pengar',
    description: 'Genom att enkelt jämföra flera företag och tjänster kan du fatta bättre och snabbare beslut, få kunskap och spara pengar.',
    icon: BanknotesIcon,
  },
  {
    title: 'Tryggt',
    description: 'Vi kvalitetssäkrar att alla företag som är ansluta till oss har bra omdöme, har rätt tillstånd och är försäkrade.',
    icon: ShieldCheckIcon,
  },
]

export default function BenefitsSection() {
  return (
    <section className="relative bg-warm-50 py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white rounded-r-[200px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="relative bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute -top-6 left-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-warm-700 text-white shadow-lg">
                  <benefit.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-serif font-medium text-stone-850">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}