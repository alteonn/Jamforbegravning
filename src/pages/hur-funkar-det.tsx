import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { 
  ClipboardDocumentCheckIcon, 
  UserIcon, 
  HeartIcon,
  DocumentTextIcon,
  HomeIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  TruckIcon,
  SparklesIcon,
  CakeIcon
} from '@heroicons/react/24/outline'

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
    name: 'Fastighetsmäklare',
    description: 'Professionell hjälp med försäljning av bostad',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Florist',
    description: 'Vackra blomsterarrangemang för ceremonin',
    icon: HeartIcon,
  },
  {
    name: 'Catering',
    description: 'Catering för minnesstund',
    icon: CakeIcon,
  }
]

const additionalServices = [
  {
    name: 'Försäkringsinventering',
    description: 'Hjälp att hitta alla försäkringar',
    icon: DocumentTextIcon,
  },
  {
    name: 'Deklaration',
    description: 'Hjälp med deklaration och ekonomi',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Avsluta sociala medier',
    description: 'Hjälp att avsluta digitala tjänster',
    icon: UserGroupIcon,
  }
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Hur funkar det? | Jämför Begravning</title>
        <meta name="description" content="Lär dig hur Jämförbegravning.se hjälper dig spara tid, kraft och pengar när det behövs som mest." />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-850 mb-6 sm:mb-8">
                Hur fungerar det?
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Du förtjänar att ha kontroll över begravningen, det ska inte betyda att det inte kan göras på ett enklare sätt.
              </p>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Jämförbegravning.se hjälper dig spara tid, kraft och pengar i när det behövs som mest.
              </p>
              <p className="text-lg sm:text-xl text-gray-600">
                Du behöver inte längre kontakta företag efter företag för att hitta vad som passar dig, utan att kosta en förmögenhet.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="relative bg-warm-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-warm-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-warm-100 text-warm-700 mb-6">
                  <ClipboardDocumentCheckIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-850 mb-4">Fyll i formuläret</h3>
                <p className="text-gray-600">
                  Fyll i vårt formulär utifrån dina önskemål. Vi matchar sedan din förfrågan med företag i ditt område. Du väljer själv om du vill bli kontaktad via telefon eller e-post.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-warm-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-warm-100 text-warm-700 mb-6">
                  <PhoneIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-850 mb-4">Bli kontaktad</h3>
                <p className="text-gray-600">
                  Efter din förfrågan matchas den mot relevanta företag i ditt område. Du väljer kontaktmetod och vilka företag du vill samarbeta med. Tjänsten är kostnadsfri och inte bindande.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-warm-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-warm-100 text-warm-700 mb-6">
                  <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-850 mb-4">Underlätta processen</h3>
                <p className="text-gray-600">
                  Du behöver inte ringa runt eller maila längre. Med ett enda formulär kan du hitta och jämföra företag och priser, oavsett var du befinner dig.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-850 text-center mb-12 sm:mb-16">
              Vi hjälper dig hitta och jämföra
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
              {services.map((service) => (
                <div 
                  key={service.name}
                  className="bg-warm-50 rounded-2xl p-4 sm:p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <service.icon className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-3 sm:mb-4 text-warm-700" />
                  <span className="text-base sm:text-lg font-medium text-stone-850">{service.name}</span>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-850 text-center mb-6 sm:mb-8">
              Du kan även få hjälp med
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              {additionalServices.map((service) => (
                <div
                  key={service.name}
                  className="bg-warm-50 rounded-2xl p-4 sm:p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <service.icon className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-3 sm:mb-4 text-warm-700" />
                  <span className="text-base sm:text-lg font-medium text-stone-850">{service.name}</span>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchSection />
          </div>
        </section>
      </main>
    </div>
  )
}