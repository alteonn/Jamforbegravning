import { ClockIcon, HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = {
  main: [
    { name: 'Hem', href: '/' },
    { name: 'Hur funkar det', href: '/hur-funkar-det' },
    { name: 'Sök företag', href: '/sok-foretag' },
    { name: 'Vanliga frågor', href: '/vanliga-fragor' },
    { name: 'Städer', href: '/stader' },
    { name: 'Artiklar', href: '/artiklar' },
    { name: 'Anslut företag', href: '/anslut-foretag' },
  ],
  services: [
    { name: 'Begravningsbyråer', href: '/tjanster/begravningsbyraer' },
    { name: 'Flyttfirmor', href: '/tjanster/flyttfirmor' },
    { name: 'Jurister', href: '/tjanster/jurister' },
    { name: 'Städfirmor', href: '/tjanster/stadfirmor' },
    { name: 'Florister', href: '/tjanster/florister' },
    { name: 'Catering', href: '/tjanster/catering' },
    { name: 'Fastighetsmäklare', href: '/tjanster/fastighetsmaklare' },
  ],
  resources: [
    { name: 'Begravningsprocess', href: '/begravningsprocess' },
    { name: 'Försäkringsinventering', href: '/forsakringsinventering' },
    { name: 'Checklista', href: '/checklista' },
  ],
  legal: [
    { name: 'Integritetspolicy', href: '/integritetspolicy' },
    { name: 'Användarvillkor', href: '/anvandarvillkor' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-warm-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-6 group">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-warm-100 text-warm-700 group-hover:bg-warm-200 transition-all duration-200 mr-2">
                <HeartIcon className="h-4 w-4" />
              </div>
              <span className="text-lg font-serif font-medium text-stone-850 group-hover:text-warm-700 transition-colors duration-200">
                Jämför<span className="text-warm-700">Begravning</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-6">
              Vi hjälper dig att hitta och jämföra kvalitetssäkrade företag för alla tjänster relaterade till ett dödsfall.
            </p>
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Öppettider: 08:00-20:00</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-warm-700">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Tjänster
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-warm-700">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-warm-700">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-warm-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} JämförBegravning. Alla rättigheter förbehållna.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mx-2">{'<>'}</span>
                <span>Utvecklad av</span>
                <a 
                  href="https://almfors.se" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-warm-700 hover:text-warm-800 ml-1"
                >
                  Almfors
                </a>
              </div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-warm-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}