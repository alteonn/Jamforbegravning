import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { MapPinIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'

type Region = {
  name: string
  cities: string[]
}

const regions: Region[] = [
  {
    name: 'Blekinge',
    cities: ['Karlshamn', 'Karlskrona', 'Olofström', 'Ronneby', 'Sölvesborg']
  },
  {
    name: 'Dalarna',
    cities: ['Avesta', 'Borlänge', 'Falun', 'Gagnef', 'Hedemora', 'Leksand', 'Ludvika', 'Malung-Sälen', 'Mora', 'Orsa', 'Rättvik', 'Smedjebacken', 'Säter', 'Vansbro', 'Älvdalen']
  },
  {
    name: 'Gotland',
    cities: ['Gotland']
  },
  {
    name: 'Gävleborg',
    cities: ['Bollnäs', 'Gävle', 'Hofors', 'Hudiksvall', 'Ljusdal', 'Nordanstig', 'Ockelbo', 'Ovanåker', 'Sandviken', 'Söderhamn']
  },
  {
    name: 'Halland',
    cities: ['Falkenberg', 'Halmstad', 'Hylte', 'Kungsbacka', 'Varberg', 'Laholm']
  },
  {
    name: 'Jämtland',
    cities: ['Berg', 'Bräcke', 'Härjedalen', 'Krokom', 'Ragunda', 'Strömsund', 'Åre', 'Östersund']
  },
  {
    name: 'Jönköping',
    cities: ['Aneby', 'Eksjö', 'Gislaved', 'Gnosjö', 'Habo', 'Jönköping', 'Mullsjö', 'Nässjö', 'Sävsjö', 'Tranås', 'Vaggeryd', 'Vetlanda', 'Värnamo']
  },
  {
    name: 'Kalmar',
    cities: ['Borgholm', 'Emmaboda', 'Hultsfred', 'Högsby', 'Kalmar', 'Mönsterås', 'Mörbylånga', 'Nybro', 'Oskarshamn', 'Torsås', 'Vimmerby', 'Västervik']
  },
  {
    name: 'Kronoberg',
    cities: ['Alvesta', 'Lessebo', 'Ljungby', 'Markaryd', 'Tingsryd', 'Uppvidinge', 'Växjö', 'Älmhult']
  },
  {
    name: 'Norrbotten',
    cities: ['Arjeplog', 'Arvidsjaur', 'Boden', 'Gällivare', 'Haparanda', 'Jokkmokk', 'Kalix', 'Kiruna', 'Luleå', 'Pajala', 'Piteå', 'Älvsbyn', 'Överkalix', 'Övertorneå']
  },
  {
    name: 'Skåne',
    cities: ['Bjuv', 'Bromölla', 'Burlöv', 'Båstad', 'Eslöv', 'Helsingborg', 'Hässleholm', 'Höganäs', 'Hörby', 'Höör', 'Klippan', 'Kristianstad', 'Kävlinge', 'Landskrona', 'Lomma', 'Lund', 'Malmö', 'Osby', 'Perstorp', 'Simrishamn', 'Sjöbo', 'Skurup', 'Staffanstorp', 'Svalöv', 'Svedala', 'Tomelilla', 'Trelleborg', 'Vellinge', 'Ystad', 'Åstorp', 'Ängelholm', 'Örkelljunga', 'Östra Göinge']
  },
  {
    name: 'Stockholm',
    cities: ['Botkyrka', 'Danderyd', 'Ekerö', 'Haninge', 'Huddinge', 'Järfälla', 'Lidingö', 'Nacka', 'Norrtälje', 'Nykvarn', 'Nynäshamn', 'Salem', 'Sigtuna', 'Sollentuna', 'Solna', 'Stockholm', 'Sundbyberg', 'Södertälje', 'Tyresö', 'Täby', 'Upplands Väsby', 'Upplands-Bro', 'Vallentuna', 'Vaxholm', 'Värmdö', 'Österåker']
  },
  {
    name: 'Södermanland',
    cities: ['Eskilstuna', 'Flen', 'Gnesta', 'Katrineholm', 'Nyköping', 'Oxelösund', 'Strängnäs', 'Trosa', 'Vingåker']
  },
  {
    name: 'Uppsala',
    cities: ['Enköping', 'Heby', 'Håbo', 'Knivsta', 'Tierp', 'Uppsala', 'Älvkarleby', 'Östhammar']
  },
  {
    name: 'Värmland',
    cities: ['Arvika', 'Eda', 'Filipstad', 'Forshaga', 'Grums', 'Hagfors', 'Hammarö', 'Karlstad', 'Kil', 'Kristinehamn', 'Munkfors', 'Storfors', 'Sunne', 'Säffle', 'Torsby', 'Årjäng']
  },
  {
    name: 'Västerbotten',
    cities: ['Bjurholm', 'Dorotea', 'Lycksele', 'Malå', 'Nordmaling', 'Norsjö', 'Robertsfors', 'Skellefteå', 'Sorsele', 'Storuman', 'Umeå', 'Vilhelmina', 'Vindeln', 'Vännäs', 'Åsele']
  },
  {
    name: 'Västernorrland',
    cities: ['Härnösand', 'Kramfors', 'Sollefteå', 'Sundsvall', 'Timrå', 'Ånge', 'Örnsköldsvik']
  },
  {
    name: 'Västmanland',
    cities: ['Arboga', 'Fagersta', 'Hallstahammar', 'Kungsör', 'Köping', 'Norberg', 'Sala', 'Skinnskatteberg', 'Surahammar', 'Västerås']
  },
  {
    name: 'Västra Götaland',
    cities: ['Ale', 'Alingsås', 'Bengtsfors', 'Bollebygd', 'Borås', 'Dals-Ed', 'Essunga', 'Falköping', 'Färgelanda', 'Grästorp', 'Gullspång', 'Göteborg', 'Götene', 'Herrljunga', 'Hjo', 'Härryda', 'Karlsborg', 'Kungälv', 'Lerum', 'Lidköping', 'Lilla Edet', 'Lysekil', 'Mariestad', 'Mark', 'Mellerud', 'Munkedal', 'Mölndal', 'Orust', 'Partille', 'Skara', 'Skövde', 'Sotenäs', 'Stenungsund', 'Strömstad', 'Svenljunga', 'Tanum', 'Tibro', 'Tidaholm', 'Tjörn', 'Tranemo', 'Trollhättan', 'Töreboda', 'Uddevalla', 'Ulricehamn', 'Vara', 'Vårgårda', 'Vänersborg', 'Åmål', 'Öckerö']
  },
  {
    name: 'Örebro',
    cities: ['Askersund', 'Degerfors', 'Hallsberg', 'Hällefors', 'Karlskoga', 'Kumla', 'Laxå', 'Lekeberg', 'Lindesberg', 'Nora', 'Örebro', 'Ljusnarsberg']
  },
  {
    name: 'Östergötland',
    cities: ['Boxholm', 'Finspång', 'Kinda', 'Linköping', 'Mjölby', 'Motala', 'Norrköping', 'Söderköping', 'Vadstena', 'Valdemarsvik', 'Ydre', 'Åtvidaberg', 'Ödeshög']
  }
]

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredRegions = regions.map(region => ({
    ...region,
    cities: region.cities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(region => region.cities.length > 0)

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Städer | Jämför Begravning</title>
        <meta name="description" content="Hitta och jämför begravningsbyråer i olika städer runt om i Sverige." />
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
                Hitta tjänster i din stad
              </h1>
              <p className="text-xl text-gray-600">
                Vi hjälper dig att hitta kvalitetssäkrade begravningsbyråer och relaterade tjänster i hela Sverige
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="relative py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-warm-200 rounded-xl focus:ring-warm-500 focus:border-warm-500 text-gray-900 placeholder-gray-500"
                placeholder="Sök efter region eller stad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="relative py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {filteredRegions.map((region) => (
                <Disclosure key={region.name}>
                  {({ open }) => (
                    <div className="bg-white rounded-2xl shadow-lg border border-warm-100 hover:border-warm-200 transition-all duration-200">
                      <Disclosure.Button className="w-full px-8 py-6 text-left flex justify-between items-center">
                        <div className="flex items-center">
                          <MapPinIcon className="h-6 w-6 text-warm-700 mr-3" />
                          <span className="text-xl font-serif font-medium text-stone-850">
                            {region.name}
                            <span className="ml-2 text-sm text-gray-500">
                              ({region.cities.length} {region.cities.length === 1 ? 'stad' : 'städer'})
                            </span>
                          </span>
                        </div>
                        <ChevronDownIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-warm-700 transition-transform duration-200`}
                        />
                      </Disclosure.Button>
                      
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-8 pb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {region.cities.map((city) => (
                              <a
                                key={city}
                                href={`/stader/${city.toLowerCase()}`}
                                className="flex items-center space-x-2 text-gray-600 hover:text-warm-700 transition-colors duration-200 py-2"
                              >
                                <MapPinIcon className="h-5 w-5" />
                                <span>{city}</span>
                              </a>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              ))}
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