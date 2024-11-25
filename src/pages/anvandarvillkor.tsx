import Head from 'next/head'
import Header from '../components/Layout/Header'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function Terms() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Användarvillkor | Jämför Begravning</title>
        <meta name="description" content="Användarvillkor för användning av Jämförbegravning.se:s tjänster." />
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
                Användarvillkor
              </h1>
              <p className="text-xl text-gray-600">
                Genom att använda vår tjänst godkänner du dessa användarvillkor. Läs dem noggrant innan du använder tjänsten.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 mb-8">
                <div className="flex items-center mb-6">
                  <DocumentTextIcon className="h-8 w-8 text-warm-700" />
                  <h2 className="text-2xl font-serif font-medium text-stone-850 ml-3">
                    Allmänna villkor
                  </h2>
                </div>
                <p>
                  Dessa villkor reglerar din användning av Jämförbegravning.se och våra tjänster. Genom att använda vår tjänst accepterar du dessa villkor i sin helhet.
                </p>
              </div>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Tjänstebeskrivning
                  </h2>
                  <p>
                    Jämförbegravning.se är en kostnadsfri tjänst som hjälper användare att:
                  </p>
                  <ul>
                    <li>Hitta och jämföra begravningsbyråer</li>
                    <li>Få offerter från kvalitetssäkrade företag</li>
                    <li>Få information om begravningstjänster</li>
                    <li>Få stöd i processen kring ett dödsfall</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Användning av tjänsten
                  </h2>
                  <p>
                    När du använder vår tjänst förbinder du dig att:
                  </p>
                  <ul>
                    <li>Lämna korrekta och sanningsenliga uppgifter</li>
                    <li>Inte missbruka tjänsten eller använda den för olagliga ändamål</li>
                    <li>Inte sprida skadlig kod eller störa tjänstens funktionalitet</li>
                    <li>Respektera andra användares integritet</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Ansvarsbegränsning
                  </h2>
                  <p>
                    Jämförbegravning.se:
                  </p>
                  <ul>
                    <li>Är en förmedlingstjänst och ansvarar inte för tjänster som utförs av anslutna företag</li>
                    <li>Garanterar inte tillgänglighet eller att tjänsten är fri från fel</li>
                    <li>Ansvarar inte för indirekta skador som kan uppstå vid användning av tjänsten</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Immateriella rättigheter
                  </h2>
                  <p>
                    Allt innehåll på webbplatsen, inklusive men inte begränsat till texter, bilder, logotyper och design, är skyddat av upphovsrätt och andra immateriella rättigheter som tillhör Jämförbegravning.se eller våra partners.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Priser och betalning
                  </h2>
                  <p>
                    Vår tjänst är kostnadsfri för privatpersoner. Företag som vill ansluta sig till tjänsten betalar enligt separat överenskommelse.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Ändringar i villkoren
                  </h2>
                  <p>
                    Vi förbehåller oss rätten att när som helst ändra dessa villkor. Väsentliga ändringar meddelas via webbplatsen och/eller e-post.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Tillämplig lag
                  </h2>
                  <p>
                    Dessa villkor regleras av svensk lag. Tvister ska avgöras av svensk domstol.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Kontakt
                  </h2>
                  <p>
                    Om du har frågor om dessa användarvillkor är du välkommen att kontakta oss.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}