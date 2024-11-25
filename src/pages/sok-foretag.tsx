import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { BuildingOfficeIcon, MagnifyingGlassIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import type { Company } from '@/types/database'

export default function SearchCompanies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCompanies(data || [])
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = !selectedService || company.services.includes(selectedService)
    const matchesCity = !selectedCity || company.city.toLowerCase().includes(selectedCity.toLowerCase())
    return matchesSearch && matchesService && matchesCity
  })

  const handleContactClick = (e: React.MouseEvent, type: 'phone' | 'email', value: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (type === 'phone') {
      window.location.href = `tel:${value}`
    } else {
      window.location.href = `mailto:${value}`
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Sök företag | Jämför Begravning</title>
        <meta name="description" content="Hitta och jämför begravningsbyråer och relaterade tjänster i ditt område." />
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
              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-6">
                Sök företag
              </h1>
              <p className="text-xl text-gray-600">
                Hitta kvalitetssäkrade företag som kan hjälpa dig med allt från begravning till bouppteckning.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Sök företag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-warm-500 focus:border-warm-500"
                />
              </div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="block w-full md:w-48 py-3 pl-3 pr-10 border border-gray-300 rounded-xl focus:ring-warm-500 focus:border-warm-500"
              >
                <option value="">Alla tjänster</option>
                <option value="Begravning">Begravning</option>
                <option value="Juridisk rådgivning">Juridisk rådgivning</option>
                <option value="Fastighetsmäklare">Fastighetsmäklare</option>
                <option value="Flytthjälp">Flytthjälp</option>
                <option value="Städning">Städning</option>
                <option value="Florist">Florist</option>
                <option value="Catering">Catering</option>
              </select>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Sök stad..."
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="block w-full md:w-48 pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-warm-500 focus:border-warm-500"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700 mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCompanies.map((company) => (
                  <Link
                    key={company.id}
                    href={`/sok-foretag/${company.id}`}
                    className={`block transition-all duration-300 transform hover:-translate-y-1 ${
                      company.verified 
                        ? 'bg-white rounded-2xl shadow-lg border-2 border-warm-500' 
                        : 'bg-white rounded-2xl shadow border border-warm-100'
                    }`}
                  >
                    <div className="p-6">
                      {company.verified && (
                        <div className="flex items-center mb-4 text-warm-700">
                          <ShieldCheckIcon className="h-6 w-6 mr-2" />
                          <span className="text-sm font-medium">Verifierat företag</span>
                        </div>
                      )}
                      <div className="flex items-center mb-4">
                        <BuildingOfficeIcon className="h-8 w-8 text-warm-700" />
                        <h2 className="ml-3 text-xl font-medium text-stone-850">
                          {company.name}
                        </h2>
                      </div>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        <span>{company.city}</span>
                      </div>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {company.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {company.services.map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warm-100 text-warm-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={(e) => handleContactClick(e, 'phone', company.phone)}
                          className="flex items-center text-warm-700 hover:text-warm-800"
                        >
                          <PhoneIcon className="h-5 w-5 mr-2" />
                          {company.phone}
                        </button>
                        <button 
                          onClick={(e) => handleContactClick(e, 'email', company.email)}
                          className="flex items-center text-warm-700 hover:text-warm-800"
                        >
                          <EnvelopeIcon className="h-5 w-5 mr-2" />
                          {company.email}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!isLoading && filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Inga företag hittades</h3>
                <p className="text-gray-500">
                  Försök med andra sökord eller välj en annan stad
                </p>
              </div>
            )}
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