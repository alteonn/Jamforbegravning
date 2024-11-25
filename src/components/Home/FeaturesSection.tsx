import { BanknotesIcon, HeartIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Personlig service',
    description: 'Vi hjälper dig hitta en begravningsbyrå som passar just dina önskemål.',
    icon: HeartIcon,
  },
  {
    name: 'Kostnadsfri tjänst',
    description: 'Vår tjänst är helt gratis att använda för dig som söker begravningsbyrå.',
    icon: BanknotesIcon,
  },
  {
    name: 'Enkelt att jämföra',
    description: 'Jämför priser och tjänster från olika begravningsbyråer på ett överskådligt sätt.',
    icon: LightBulbIcon,
  },
  {
    name: 'Kvalitetssäkrade byråer',
    description: 'Alla begravningsbyråer i vårt nätverk är noggrant utvalda och kvalitetssäkrade.',
    icon: UserGroupIcon,
  },
]

export default function FeaturesSection() {
  return (
    <div className="relative bg-white py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-warm-100 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-warm-200 rounded-full opacity-50 transform translate-x-1/2 translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
            Varför välja oss?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Vi gör det enklare att hitta rätt begravningsbyrå
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-warm-100 text-warm-700 group-hover:bg-warm-200 transition-all duration-300 transform group-hover:-translate-y-1">
                    <feature.icon className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-stone-850">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}