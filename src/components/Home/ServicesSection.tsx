import { 
  HomeIcon, 
  ScaleIcon, 
  TruckIcon, 
  SparklesIcon,
  BuildingOfficeIcon,
  CakeIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface ServicesSectionProps {
  cityName?: string
}

const services = [
  {
    name: 'Begravningsbyrå',
    description: 'Hitta erfarna begravningsbyråer i ditt område',
    icon: HomeIcon,
  },
  {
    name: 'Jurist',
    description: 'Få hjälp med juridiska frågor och bouppteckning',
    icon: ScaleIcon,
  },
  {
    name: 'Flyttfirma',
    description: 'Professionell hjälp med flytt och transport',
    icon: TruckIcon,
  },
  {
    name: 'Städfirma',
    description: 'Städning och tömning av bostad',
    icon: SparklesIcon,
  },
  {
    name: 'Catering',
    description: 'Professionell catering för minnesstunden',
    icon: CakeIcon,
  },
  {
    name: 'Florist',
    description: 'Vackra blomsterarrangemang för ceremonin',
    icon: HeartIcon,
  },
  {
    name: 'Fastighetsmäklare',
    description: 'Professionell hjälp med försäljning av bostad',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Försäkringsinventering',
    description: 'Hjälp att hitta alla försäkringar',
    icon: UserGroupIcon,
  }
]

export default function ServicesSection({ cityName }: ServicesSectionProps) {
  return (
    <section id="services" className="relative bg-white py-12 sm:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-warm-50 rounded-r-[200px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
            {cityName ? `Våra tjänster i ${cityName}` : 'Våra tjänster'}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {cityName 
              ? `Vi hjälper dig att hitta rätt företag i ${cityName}`
              : 'Vi hjälper dig att hitta rätt företag för dina behov'}
          </p>
        </div>

        <div className="mt-8 sm:mt-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="relative group bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-warm-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-warm-100 text-warm-700 group-hover:bg-warm-200 transition-all duration-300">
                    <service.icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-stone-850 break-words w-full">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}