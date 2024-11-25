import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { 
  ShieldCheckIcon,
  DocumentCheckIcon,
  ClockIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentMagnifyingGlassIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    title: '40+ försäkringsbolag',
    description: 'Vi kontaktar alla relevanta försäkringsbolag för en komplett genomgång',
    icon: BuildingOfficeIcon,
  },
  {
    title: 'Arbetsgivare & förbund',
    description: 'Kontroll av tidigare arbetsgivare samt fack- och pensionärsförbund',
    icon: UserGroupIcon,
  },
  {
    title: 'Snabbt resultat',
    description: 'Inventeringen tar cirka 10 dagar att genomföra',
    icon: ClockIcon,
  },
  {
    title: 'Säker process',
    description: 'Vi säkerställer att alla relevanta försäkringsgivare kontrolleras',
    icon: ShieldCheckIcon,
  },
]

const steps = [
  {
    title: 'Kartläggning',
    description: 'Vi kartlägger den avlidnas potentiella försäkringsinnehav',
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    title: 'Kontroll',
    description: 'Systematisk kontroll av alla relevanta försäkringsgivare',
    icon: DocumentCheckIcon,
  },
  {
    title: 'Resultat',
    description: 'Komplett sammanställning av bekräftade försäkringar',
    icon: CheckCircleIcon,
  },
]

export default function InsuranceInventory() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Försäkringsinventering för Dödsbo | Jämför Begravning</title>
        <meta 
          name="description" 
          content="Få hjälp att hitta och kartlägga försäkringar efter ett dödsfall. Vi hjälper dig säkerställa att inga försäkringspengar går förlorade." 
        />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-8">
                Försäkringsinventering för Dödsbo
              </h1>
              <p className="text-xl text-gray-600">
                När en person avlider finns det ofta försäkringar som inte utbetalas automatiskt. 
                Vi hjälper dig att hitta och kartlägga alla försäkringar för att säkerställa att 
                inga pengar går förlorade.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700 mb-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-stone-850 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-medium text-stone-850">
                Så fungerar tjänsten
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                En enkel och effektiv process för att hitta alla försäkringar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-warm-100 text-warm-700">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="mt-6">
                      <span className="text-sm font-medium text-warm-700">Steg {index + 1}</span>
                      <h3 className="mt-2 text-xl font-medium text-stone-850">{step.title}</h3>
                      <p className="mt-3 text-base text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-warm-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <BanknotesIcon className="h-8 w-8 text-warm-700 mr-3" />
                    <h2 className="text-3xl font-serif font-medium text-stone-850">
                      Pris och fördelar
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-2xl font-medium text-stone-850">
                      2 795 kr
                    </p>
                    <p className="text-gray-600">
                      Kostnaden kan dras från dödsboets medel
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2" />
                        Komplett genomgång av alla försäkringar
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2" />
                        Gratis uppföljning via Cynk
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2" />
                        Kan användas upp till 10 år efter dödsfallet
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-warm-50 rounded-2xl p-8">
                  <h3 className="text-xl font-medium text-stone-850 mb-4">
                    Detta ingår i tjänsten
                  </h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2 mt-1 flex-shrink-0" />
                      <span>Kontroll av cirka 40 försäkringsbolag</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2 mt-1 flex-shrink-0" />
                      <span>Kontroll av tidigare arbetsgivare</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2 mt-1 flex-shrink-0" />
                      <span>Kontroll av fack- och pensionärsförbund</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2 mt-1 flex-shrink-0" />
                      <span>Kontroll av medlemsorganisationer</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-warm-700 mr-2 mt-1 flex-shrink-0" />
                      <span>Kontroll av begravningskassor</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchSection />
          </div>
        </section>
      </main>
    </div>
  )
}