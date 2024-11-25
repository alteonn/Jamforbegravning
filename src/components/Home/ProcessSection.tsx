import { 
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    name: 'Beskriv ert behov',
    description: 'Skicka en kostnadsfri förfrågan genom att fylla i formuläret och beskriva vilken sorts hjälp ni behöver.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Få offerter',
    description: 'Vi skickar er förfrågan till kvalitetssäkrade begravningsbyråer och företag som jobbar med den typ av tjänst ni efterfrågar.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Jämför',
    description: 'Jämför kvalifikationer och priser. Välj sedan den som passar dig bäst. Förfrågan är inte bindande.',
    icon: CheckCircleIcon,
  },
]

export default function ProcessSection() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-warm-100 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-warm-200 rounded-full opacity-50 transform translate-x-1/2 translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
            Så här fungerar det
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Tre enkla steg till rätt hjälp
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.name} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-warm-100 text-warm-700 group-hover:bg-warm-200 transition-all duration-300">
                    <step.icon className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <div className="mt-6">
                    <span className="text-sm font-medium text-warm-700">Steg {index + 1}</span>
                    <h3 className="mt-2 text-xl font-medium text-stone-850">{step.name}</h3>
                    <p className="mt-3 text-base text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}