import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '../../components/Layout/Header'
import SearchSection from '../../components/Home/SearchSection'
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  HomeIcon,
  ScaleIcon,
  TruckIcon,
  SparklesIcon,
  HeartIcon,
  CakeIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import type { Company } from '@/types/database'

const serviceIcons = {
  'Begravning': HomeIcon,
  'Juridisk rådgivning': ScaleIcon,
  'Bouppteckning': ScaleIcon,
  'Flytthjälp': TruckIcon,
  'Städning': SparklesIcon,
  'Florist': HeartIcon,
  'Catering': CakeIcon,
  'Fastighetsmäklare': BuildingOfficeIcon,
  'Dödsbo': UserGroupIcon,
  'Gravsten': HomeIcon
} as const;

type ServiceType = keyof typeof serviceIcons;

export default function CompanyDetail() {
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (id) {
      fetchCompany()
    }
  }, [id])

  const fetchCompany = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setCompany(data as Company)
    } catch (error) {
      console.error('Error fetching company:', error)
      router.push('/sok-foretag')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700"></div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium text-stone-850">
              Företaget kunde inte hittas
            </h1>
            <div className="mt-6">
              <Link
                href="/sok-foretag"
                className="inline-flex items-center text-warm-700 hover:text-warm-800"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Tillbaka till företag
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>{company.name} | Jämför Begravning</title>
        <meta name="description" content={company.description} />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link
                href="/sok-foretag"
                className="inline-flex items-center text-warm-700 hover:text-warm-800"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Tillbaka till företag
              </Link>
            </div>

            <div className="max-w-3xl">
              {company.verified && (
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-warm-100 text-warm-700 mb-6">
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">Verifierat och kvalitetssäkrat företag</span>
                </div>
              )}

              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-6">
                {company.name}
              </h1>

              <div className="flex items-center text-gray-600 mb-8">
                <MapPinIcon className="h-6 w-6 mr-2" />
                <span className="text-xl">{company.city}</span>
              </div>

              <p className="text-xl text-gray-600">
                {company.description}
              </p>
            </div>
          </div>
        </section>

        {/* Verified Section */}
        {company.verified && (
          <section className="relative py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-warm-50 rounded-2xl p-8 border-2 border-warm-500">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-warm-700" />
                  <h2 className="ml-3 text-2xl font-serif font-medium text-stone-850">
                    Kontrollerat och verifierat företag
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-warm-700 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Kvalitetssäkrad verksamhet</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-warm-700 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Kontrollerade referenser</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-warm-700 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Verifierade uppgifter</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-medium text-stone-850 mb-12">
              Tjänster
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {company.services.map((service) => {
                const Icon = serviceIcons[service as ServiceType] ?? BuildingOfficeIcon;
                return (
                  <div
                    key={service}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-stone-850">
                      {service}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className={`bg-white rounded-3xl p-12 ${
                company.verified 
                  ? 'border-2 border-warm-500 shadow-xl' 
                  : 'border border-warm-100 shadow-lg'
              }`}
            >
              <h2 className="text-3xl font-serif font-medium text-stone-850 mb-8">
                Kontaktuppgifter
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <a 
                  href={`tel:${company.phone}`}
                  className="flex flex-col items-center p-6 bg-warm-50 rounded-2xl hover:bg-warm-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700 mb-4">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-stone-850 mb-1">Ring oss</span>
                  <span className="text-warm-700">{company.phone}</span>
                </a>

                <a 
                  href={`mailto:${company.email}`}
                  className="flex flex-col items-center p-6 bg-warm-50 rounded-2xl hover:bg-warm-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700 mb-4">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-stone-850 mb-1">Maila oss</span>
                  <span className="text-warm-700 text-center break-words max-w-full">{company.email}</span>
                </a>

                {company.website && (
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-6 bg-warm-50 rounded-2xl hover:bg-warm-100 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700 mb-4">
                      <GlobeAltIcon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium text-stone-850 mb-1">Besök hemsida</span>
                    <span className="text-warm-700">Klicka här</span>
                  </a>
                )}
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