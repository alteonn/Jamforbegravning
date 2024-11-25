import Head from 'next/head'
import Header from '../components/Layout/Header'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Integritetspolicy | Jämför Begravning</title>
        <meta name="description" content="Information om hur vi hanterar och skyddar dina personuppgifter." />
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
                Integritetspolicy
              </h1>
              <p className="text-xl text-gray-600">
                Vi värnar om din personliga integritet och strävar efter att alltid skydda dina personuppgifter på bästa sätt.
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
                  <ShieldCheckIcon className="h-8 w-8 text-warm-700" />
                  <h2 className="text-2xl font-serif font-medium text-stone-850 ml-3">
                    Personuppgiftsansvarig
                  </h2>
                </div>
                <p>
                  Jämförbegravning.se är personuppgiftsansvarig för behandlingen av dina personuppgifter på denna webbplats.
                </p>
              </div>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Insamling av personuppgifter
                  </h2>
                  <p>
                    Vi samlar in personuppgifter som du frivilligt tillhandahåller när du:
                  </p>
                  <ul>
                    <li>Skickar in förfrågningar via våra formulär</li>
                    <li>Kontaktar oss via e-post eller telefon</li>
                    <li>Prenumererar på vårt nyhetsbrev</li>
                    <li>Använder vår webbplats</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Användning av personuppgifter
                  </h2>
                  <p>
                    Vi använder dina personuppgifter för att:
                  </p>
                  <ul>
                    <li>Förmedla kontakt med begravningsbyråer och andra relevanta företag</li>
                    <li>Besvara dina frågor och tillhandahålla kundsupport</li>
                    <li>Förbättra och utveckla våra tjänster</li>
                    <li>Skicka relevant information och erbjudanden</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Delning av personuppgifter
                  </h2>
                  <p>
                    Vi delar endast dina personuppgifter med:
                  </p>
                  <ul>
                    <li>Företag du väljer att få offert från</li>
                    <li>Underleverantörer som hjälper oss tillhandahålla våra tjänster</li>
                    <li>Myndigheter när lagen kräver det</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Lagring och säkerhet
                  </h2>
                  <p>
                    Vi lagrar dina personuppgifter så länge det är nödvändigt för att uppfylla ändamålen med behandlingen. Vi använder tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller manipulation.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Dina rättigheter
                  </h2>
                  <p>
                    Du har rätt att:
                  </p>
                  <ul>
                    <li>Få tillgång till dina personuppgifter</li>
                    <li>Begära rättelse av felaktiga uppgifter</li>
                    <li>Begära radering av uppgifter</li>
                    <li>Begära begränsning av behandling</li>
                    <li>Invända mot behandling</li>
                    <li>Begära dataportabilitet</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Cookies
                  </h2>
                  <p>
                    Vi använder cookies för att förbättra din upplevelse på vår webbplats. Du kan läsa mer om hur vi använder cookies i vår cookiepolicy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Kontakta oss
                  </h2>
                  <p>
                    Om du har frågor om vår integritetspolicy eller hur vi behandlar dina personuppgifter, är du välkommen att kontakta oss.
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