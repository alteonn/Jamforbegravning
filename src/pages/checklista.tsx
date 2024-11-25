import Head from 'next/head'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  DocumentCheckIcon,
  HomeIcon,
  BanknotesIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserGroupIcon,
  HeartIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  GlobeAltIcon,
  KeyIcon,
  ArchiveBoxIcon,
  CreditCardIcon,
  NewspaperIcon,
  ComputerDesktopIcon,
  TrashIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const checklistSections = [
  {
    title: 'Dödsbo',
    icon: UserGroupIcon,
    items: [
      'Närmast anhöriga måste informeras snarast efter dödsfallet',
      'Släkt, vänner, arbetsgivare, kollegor och grannar',
      'Städbolag',
      'Epost kontakter',
      'Föreningar',
      'Hemtjänst'
    ],
    note: 'Du behöver inte informera myndigheter inom stat, kommun och landsting. De informeras automatiskt via Skatteverket.'
  },
  {
    title: 'Post och adressändring',
    icon: EnvelopeIcon,
    items: [
      'Anmäl eftersändning till den som tar hand om dödsboet',
      'Anmäl eller förläng eftersändning om det fortsätter att komma post till den avlidna',
      'Kontrollera att Skatteverket har rätt adress'
    ],
    contact: {
      website: 'www.adressandring.se',
      phone: '010-334 01 18'
    }
  },
  {
    title: 'Bouppteckning',
    icon: DocumentTextIcon,
    items: [
      'Avgör om du ska göra bouppteckningen själv eller anlita professionell hjälp',
      'Ta reda på om den avlidne hade särskilda önskemål om vem som ska sköta bouppteckningen',
      'Ta reda på om det finns ett nedtecknat hos Vita arkivet hos en Begravningsbyrå',
      'Gör en bodelning efter bouppteckningen, om den avlidne hade sambo och inte var gift',
      'Skriv en arvskiftes handling efter bouppteckningen är klar, om det finns flera arvingar',
      'Bouppteckningen ska skickas till Skatteverket senast 4 månader efter dödsfallet'
    ]
  },
  {
    title: 'Intyg och ersättning',
    icon: DocumentCheckIcon,
    items: [
      'Beställ dödsfallsintyg med släktutredning via Skatteupplysningen',
      'Skaffa vårdintyg om du ska ta hjälp av någon annan som inte finns med i släktutredningen',
      'Ta reda på om du har rätt till ekonomisk ersättning från grupplivförsäkring',
      'Ta reda på om du har rätt till ekonomisk ersättning från försäkringar',
      'Ta reda på om du har rätt till bostadsbidrag eller bostadsrättstillägg från Försäkringskassan',
      'Ta reda på om du som pensionär har rätt till bostadsrättstillägg från Pensionsmyndigheten'
    ],
    contact: {
      phone: '0771-567 567',
      note: 'Säg "beställ dödsfallsintyg" i talsvaret för att komma till rätt handläggare'
    }
  },
  {
    title: 'Begravning',
    icon: HeartIcon,
    items: [
      'Ta reda på om den avlidne hade särskilda önskemål om begravning',
      'Undersök olika alternativ på begravningsbyråer',
      'Ta reda på om den avlidne hade Livsarkiv med önskemål om sin begravning',
      'Ta reda på om det finns någon begravningsförsäkring',
      'Boka transport om begravningen ska ske på en annan ort',
      'Utforma och beställa dödsannons',
      'Välja och boka officiant eller präst',
      'Välja svepning',
      'Välja musik till begravningsceremonin',
      'Välja dekoration vid begravningsceremonin',
      'Välja och boka lokal för begravning',
      'Boka organist eller musiker',
      'Bjuda in gäster till begravning och minnesstund',
      'Beställa förtäring vid minnesstund',
      'Beställa blommor till begravningsceremonin',
      'Spara kvitton för utgifter i samband med begravning'
    ]
  },
  {
    title: 'Säga upp, överlåta eller sälja',
    icon: TrashIcon,
    items: [
      'Telefoni',
      'Avsluta streamingtjänster (Netflix, HBO, Viaplay, Cmore, Spotify m.m.)',
      'Avtal för el, sophämtning, internet och tv',
      'Hemförsäkring och andra försäkringar',
      'Medlemskap i föreningar',
      'Om den avlidne hade gravrätt, flytta över till den levande personen',
      'Hyresavtal',
      'Kontakta mäklare vid försäljning av bostad eller fritidshus',
      'Kontakta banken för att lösa eller skriva över bolån och lån',
      'Kontakta banken för att avsluta dödsboets bankkonton, ägarbevis och lagfart',
      'Ändra lagfart till annan person om den avlidne hade fastighet',
      'Ändra ägarbevis för den avlidnes fordon',
      'Makulera ID-kort och Pass'
    ]
  },
  {
    title: 'Sociala medier',
    icon: ComputerDesktopIcon,
    items: [
      'Blogg och personliga sidor på internet',
      'Facebook',
      'Instagram',
      'Snapchat',
      'LinkedIn',
      'Twitter',
      'Andra sociala medier'
    ]
  },
  {
    title: 'Hem och hushåll',
    icon: HomeIcon,
    items: [
      'Om den avlidne bodde ensam töm kylskåp, sopor och postlåda',
      'Ta hand om husdjur',
      'Om den avlidne bodde ensam sänk värmen i bostaden',
      'Om den avlidne bodde ensam förebygg inbrott exempelvis med timer till belysning',
      'Samla in reservnycklar',
      'Städa och tömma den dödes bostad',
      'Om flera personer bor på den avlidnes adress, kontakta hyresvärd',
      'Flytta eller avsluta försäkringar',
      'Kontakta mäklare för försäljning av den avlidnes bostad inför arvskifte'
    ]
  },
  {
    title: 'Vård och hjälpmedel',
    icon: ShieldCheckIcon,
    items: [
      'Hämta den avlidnes tillhörigheter på sjukhus',
      'Återlämna hjälpmedel och larm'
    ]
  }
]

export default function Checklist() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Checklista | Jämför Begravning</title>
        <meta name="description" content="En omfattande checklista för vad som behöver göras vid ett dödsfall." />
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
                Checklista
              </h1>
              <p className="text-xl text-gray-600">
                Vi förstår att det är mycket att hålla koll på vid ett dödsfall och det är lätt att glömma saker. 
                Här har vi samlat allt som behöver göras samt kontaktuppgifter till relevanta företag och institut.
              </p>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="relative py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {checklistSections.map((section) => (
                <Disclosure key={section.title} as="div">
                  {({ open }) => (
                    <div className="bg-white rounded-2xl shadow-lg border border-warm-100 hover:border-warm-200 transition-all duration-200">
                      <Disclosure.Button className="w-full px-8 py-6 text-left flex justify-between items-center">
                        <div className="flex items-center">
                          <section.icon className="h-6 w-6 text-warm-700 mr-4" />
                          <span className="text-xl font-serif font-medium text-stone-850">
                            {section.title}
                          </span>
                        </div>
                        <ChevronDownIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-warm-700 transition-transform duration-200`}
                        />
                      </Disclosure.Button>
                      
                      <Disclosure.Panel className="px-8 pb-6">
                        <ul className="space-y-3 mb-4">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 rounded-full border-2 border-warm-200 flex items-center justify-center mt-0.5">
                                <div className="h-3 w-3 rounded-full bg-warm-100"></div>
                              </div>
                              <span className="ml-3 text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {section.note && (
                          <div className="mt-4 p-4 bg-warm-50 rounded-lg">
                            <p className="text-sm text-gray-600">{section.note}</p>
                          </div>
                        )}

                        {section.contact && (
                          <div className="mt-4 border-t border-warm-100 pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Kontaktuppgifter:</h4>
                            {section.contact.website && (
                              <p className="text-sm text-gray-600">
                                <GlobeAltIcon className="h-4 w-4 inline mr-2" />
                                {section.contact.website}
                              </p>
                            )}
                            {section.contact.phone && (
                              <p className="text-sm text-gray-600">
                                <PhoneIcon className="h-4 w-4 inline mr-2" />
                                {section.contact.phone}
                                {section.contact.note && (
                                  <span className="text-gray-500 ml-2">({section.contact.note})</span>
                                )}
                              </p>
                            )}
                          </div>
                        )}
                      </Disclosure.Panel>
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