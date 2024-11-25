import { memo } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { 
  HomeIcon,
  HeartIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ScaleIcon,
  TruckIcon,
  SparklesIcon,
  CakeIcon
} from '@heroicons/react/24/outline'

const HeroSection = () => {
  const scrollToSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  }

  const icons = [
    HomeIcon,
    HeartIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ScaleIcon,
    TruckIcon,
    SparklesIcon,
    CakeIcon
  ]

  return (
    <div className="relative overflow-hidden bg-warm-50">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-100/50 rounded-l-[100px] sm:rounded-l-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left pt-12 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight font-medium text-stone-850">
              Jämför begravningsbyråer och företag
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Kostnadsfri tjänst som hjälper dig att hitta och jämföra olika begravningsbyråer och företag relaterat till ett dödsfall.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#search"
                onClick={scrollToSearch}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-base font-medium rounded-full text-white bg-warm-700 hover:bg-warm-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Sök begravningsbyrå</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#search"
                onClick={scrollToSearch}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-base font-medium rounded-full text-warm-700 bg-white border-2 border-warm-200 hover:bg-warm-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Få offert</span>
              </a>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full hidden lg:block">
            <div className="absolute inset-0 bg-warm-100 rounded-[30px] sm:rounded-[60px] transform rotate-3" />
            <div className="absolute inset-0 bg-white rounded-[30px] sm:rounded-[60px] transform -rotate-3">
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-warm-50 relative">
                  {/* Ikoner i en grid */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-8 p-8">
                    {icons.map((Icon, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <Icon className="h-8 w-8 text-warm-200/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HeroSection)