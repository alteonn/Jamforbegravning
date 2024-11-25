import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'Hur fungerar Jämförbegravning.se?',
    answer: 'Du beskriver vad du vill hjälp med i vårt formulär. Din förfrågan matchas sedan mot företag som är ansluta till Jämförbegravning.se. Två upp till tre intresserade företag per bransch kan kontakta dig via telefon eller e-post. Din förfrågan är inte bindande.'
  },
  {
    question: 'Är det gratis att skicka en förfrågan?',
    answer: 'Jämförbegravning.se är en kostnadsfri tjänst.'
  },
  {
    question: 'Hur hanteras mina kontaktuppgifter?',
    answer: 'Dina kontaktuppgifter blir endast synliga för företag som är ansluta till oss och som vill lämna en offert till dig. Dina kontaktuppgifter hanteras med sekretess och lämnas aldrig ut offentligt eller till tredje part.'
  },
  {
    question: 'När får jag svar på min förfrågan?',
    answer: 'När din förfrågan skickats in så matchas den mot företag i ditt område inom några timmar.'
  },
  {
    question: 'Är ansluta företag kontrollerade?',
    answer: 'Vi kontrollerar alla våra ansluta företag och vi ställer höga krav på vilka som får använda Jämförbegravning.se'
  },
  {
    question: 'Får jag ett färdigt offert?',
    answer: 'Vi förmedlar enbart en första kontakt med företag. Beroende på hur dina önskemål ser ut kan det vara svårt för företagen att ge ett färdigt kostnadsförslag utan att först ta en dialog över telefon eller e-post.'
  }
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Vanliga frågor | Jämför Begravning</title>
        <meta name="description" content="Hitta svar på vanliga frågor om våra tjänster och hur Jämförbegravning.se fungerar." />
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
                Vanliga frågor
              </h1>
              <p className="text-xl text-gray-600">
                Här finns svaren på de vanligaste frågorna
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question}>
                  {({ open }) => (
                    <div className="bg-white rounded-2xl shadow-lg border border-warm-100 hover:border-warm-200 transition-all duration-200">
                      <Disclosure.Button className="w-full px-8 py-6 text-left flex justify-between items-center">
                        <span className="text-lg font-medium text-stone-850">{faq.question}</span>
                        <ChevronDownIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-warm-700 transition-transform duration-200`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-8 pb-6">
                        <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-warm-50 rounded-3xl p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-warm-100 text-warm-700">
                    <ShieldCheckIcon className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium text-stone-850 mb-4">
                    Kvalitetssäkrade företag
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Vi samarbetar endast med noggrant utvalda och kontrollerade företag för att säkerställa att du får bästa möjliga service och trygghet.
                  </p>
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