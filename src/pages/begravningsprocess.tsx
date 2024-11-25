import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { 
  ClipboardDocumentListIcon,
  UserIcon,
  HeartIcon,
  DocumentTextIcon,
  HomeIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    title: 'Dödsfall',
    description: 'En läkare konstaterar dödsfallet och utfärdar ett dödsbevis.',
    icon: UserIcon,
  },
  {
    title: 'Fastställer dödsorsaken',
    description: 'Läkaren utfärdar ett dödsorsaksintyg och avgör om vidare utredning behövs.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Dödsbädd',
    description: 'Den avlidna görs i ordning av vårdpersonal innan anhöriga tillkallas.',
    icon: HeartIcon,
  },
  {
    title: 'Kontakta Begravningsbyrå',
    description: 'Anhöriga kontaktar en begravningsbyrå för planering av begravningen.',
    icon: PhoneIcon,
  },
  {
    title: 'Bårhus och svepning',
    description: 'Den avlidna förvaras i bårhus tills svepning och kistläggning.',
    icon: HomeIcon,
  },
  {
    title: 'Bisättning',
    description: 'Kistan transporteras till bisättningslokal i väntan på ceremoni.',
    icon: MapPinIcon,
  },
  {
    title: 'Visning',
    description: 'Anhöriga får möjlighet till ett personligt avsked.',
    icon: UserGroupIcon,
  },
  {
    title: 'Begravning',
    description: 'Begravningsceremoni enligt önskad ordning.',
    icon: ClipboardDocumentListIcon,
  },
  {
    title: 'Minnesstund',
    description: 'Gästerna samlas för att minnas den avlidna.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: 'Gravsättning',
    description: 'Den avlidna gravsätts enligt vald metod.',
    icon: ClockIcon,
  },
]

export default function FuneralProcess() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Begravningsprocess | Jämför Begravning</title>
        <meta name="description" content="En guide genom hela begravningsprocessen - från dödsfall till gravsättning." />
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
                Begravningsprocess
              </h1>
              <p className="text-xl text-gray-600">
                Det är en uppsjö av känslor när någon går bort. Förutom sorgen och saknaden ska även tusen andra frågor hanteras. Här går vi igenom steg för hur det går till och vad du kan få för hjälp utav en begravningsbyrå.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-medium text-stone-850 text-center mb-16">
              Vad händer när någon går bort?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="ml-4 text-sm font-medium text-warm-700">Steg {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium text-stone-850 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vita Arkivet Section */}
        <section className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-warm-50 rounded-3xl p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-medium text-stone-850 mb-8">
                  Finns det ett Vita Arkiv för den avlidna?
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Det vita arkivet fylls i personligen och innehåller önskemål kring vad som ska hända efter döden.
                    Önskemål kring hur begravningscermonin skall gå till, om det önskas vissa psalmer, utformande av gravsten, kista eller liknande.
                  </p>
                  <p>
                    Till skillnad från ett testamente är det inte juridiskt bindande att följa det som finns antecknat i det vita arkivet men det är den dödas sista önskningar så det är starkt rekommenderat att följa önskemålen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Matters Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-medium text-stone-850 text-center mb-16">
              Praktiska saker att ta hand om
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
                <h3 className="text-xl font-medium text-stone-850 mb-4">Eftersändning av post</h3>
                <p className="text-gray-600 mb-4">
                  Ordna eftersändning av post till anhörig och meddela adressändring till närstående.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Anmäl eftersändning till Svensk Adressändring</p>
                  <p>Telefon: 0771-97 98 99</p>
                  <p>www.adressandring.se</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
                <h3 className="text-xl font-medium text-stone-850 mb-4">Försäkringar</h3>
                <p className="text-gray-600 mb-4">
                  Kolla upp vilka försäkringar den avlidna hade och avsluta dem. Gör en försäkringsinventering för att inte missa eventuella utbetalningar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-warm-50 rounded-3xl p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-medium text-stone-850 mb-8">
                  Det är smärtsamt att mista en närstående
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                  Sorg är svårt att beskriva men går djupare än att känna sig ledsen och kan upplevas som en djup smärta i hela kroppen. Alla reagerar olika på sorg och det är viktigt att få stöd i sorgeprocessen.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="text-lg font-medium text-stone-850 mb-2">Någon att tala med</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>SAMS - Samarbete för människor i sorg</li>
                      <li>Randiga Huset - www.randigahuset.se</li>
                      <li>VIMIL - Vi som mist någon mitt i livet</li>
                      <li>VSFB - Vi Som Förlorat Barn</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-850 mb-2">Stödorganisationer</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Febe - Nätverk för föräldrar som förlorat barn</li>
                      <li>RAV - Riksorganisationen för anhöriga till våldsdödade</li>
                      <li>SPES - Riksförbundet för SuicidPrevention</li>
                    </ul>
                  </div>
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