import Head from 'next/head'
import Header from '../components/Layout/Header'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

const cookieTypes = [
  {
    name: 'Nödvändiga cookies',
    description: 'Dessa cookies är nödvändiga för att webbplatsen ska fungera och kan inte stängas av i våra system.',
    required: true
  },
  {
    name: 'Analys cookies',
    description: 'Hjälper oss att förstå hur besökare interagerar med webbplatsen genom att samla in och rapportera information anonymt.',
    required: false
  },
  {
    name: 'Funktionella cookies',
    description: 'Möjliggör förbättrad funktionalitet och personanpassning, såsom live chat och andra användbara funktioner.',
    required: false
  },
  {
    name: 'Marknadsföring cookies',
    description: 'Används för att spåra besökare på olika webbplatser i syfte att visa relevanta annonser.',
    required: false
  }
]

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Cookie Policy | Jämför Begravning</title>
        <meta name="description" content="Information om hur vi använder cookies på vår webbplats." />
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
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-600">
                Vi värnar om din integritet och är transparenta med hur vi samlar in och använder data.
                Här förklarar vi hur vi använder cookies och vilka val du har.
              </p>
            </div>
          </div>
        </section>

        {/* Cookie Types Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cookieTypes.map((type) => (
                <div
                  key={type.name}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-stone-850">
                      {type.name}
                    </h3>
                    {type.required ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warm-100 text-warm-700">
                        Krävs
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-warm-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warm-700"></div>
                      </label>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-warm-50 rounded-3xl p-12">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-warm-100 text-warm-700">
                    <ShieldCheckIcon className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Din integritet är viktig
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Vi använder cookies och liknande tekniker för att förbättra din upplevelse, 
                    analysera trafik och anpassa innehåll. Du kan när som helst ändra dina 
                    cookie-inställningar genom att klicka på "Hantera cookies" i sidfoten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}