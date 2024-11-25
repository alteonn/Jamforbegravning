import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

type Company = {
  id: number
  name: string
  city: string
  services: string[]
  verified: boolean
  created_at: string
}

const serviceTypes = [
  'Begravning',
  'Juridisk rådgivning',
  'Försäkringshantering',
  'Flytthjälp',
  'Städning',
  'Bouppteckning',
  'Dödsbo',
  'Gravsten',
  'Florist',
  'Catering'
]

export default function CompaniesManagement() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [verificationFilter, setVerificationFilter] = useState<boolean | null>(null)
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchCompanies()
  }, [])

  useEffect(() => {
    filterCompanies()
  }, [companies, searchTerm, selectedService, verificationFilter])

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

  const filterCompanies = () => {
    let filtered = [...companies]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Service filter
    if (selectedService) {
      filtered = filtered.filter(company => 
        company.services.includes(selectedService)
      )
    }

    // Verification filter
    if (verificationFilter !== null) {
      filtered = filtered.filter(company => 
        company.verified === verificationFilter
      )
    }

    setFilteredCompanies(filtered)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Är du säker på att du vill radera detta företag?')) return

    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setCompanies(companies.filter(company => company.id !== id))
    } catch (error) {
      console.error('Error deleting company:', error)
    }
  }

  const handleVerificationToggle = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('companies')
        .update({ verified: !currentStatus })
        .eq('id', id)

      if (error) throw error
      
      setCompanies(companies.map(company => 
        company.id === id ? { ...company, verified: !currentStatus } : company
      ))
    } catch (error) {
      console.error('Error updating company verification:', error)
    }
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedService('')
    setVerificationFilter(null)
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Hantera företag | Admin Dashboard</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-warm-700 hover:text-warm-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tillbaka till dashboard
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-stone-850">
            Hantera företag
          </h1>
          <Link
            href="/admin/companies/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-warm-700 hover:bg-warm-800"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nytt företag
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-warm-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Sök på företag eller stad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-warm-500 focus:border-warm-500"
              />
            </div>

            {/* Service Filter */}
            <div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-warm-500 focus:border-warm-500"
              >
                <option value="">Alla tjänster</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Verification Filter */}
            <div>
              <select
                value={verificationFilter === null ? '' : verificationFilter.toString()}
                onChange={(e) => {
                  const value = e.target.value
                  setVerificationFilter(value === '' ? null : value === 'true')
                }}
                className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-warm-500 focus:border-warm-500"
              >
                <option value="">Alla företag</option>
                <option value="true">Verifierade</option>
                <option value="false">Ej verifierade</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedService || verificationFilter !== null) && (
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-sm text-gray-500">Aktiva filter:</span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warm-100 text-warm-700">
                    Sökning: {searchTerm}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 hover:text-warm-900"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {selectedService && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warm-100 text-warm-700">
                    Tjänst: {selectedService}
                    <button
                      onClick={() => setSelectedService('')}
                      className="ml-2 hover:text-warm-900"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {verificationFilter !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warm-100 text-warm-700">
                    Status: {verificationFilter ? 'Verifierade' : 'Ej verifierade'}
                    <button
                      onClick={() => setVerificationFilter(null)}
                      className="ml-2 hover:text-warm-900"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-sm text-warm-700 hover:text-warm-800"
                >
                  Rensa alla filter
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700 mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-warm-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-warm-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Företag
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stad
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tjänster
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Åtgärder
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-warm-100">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {company.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.city}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {company.services.map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm-100 text-warm-800"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleVerificationToggle(company.id, company.verified)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            company.verified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {company.verified ? (
                            <>
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Verifierad
                            </>
                          ) : (
                            <>
                              <XMarkIcon className="h-4 w-4 mr-1" />
                              Ej verifierad
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/companies/${company.id}`}
                          className="text-warm-700 hover:text-warm-800 mr-4"
                        >
                          <PencilIcon className="h-5 w-5 inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(company.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredCompanies.length === 0 && (
                <div className="text-center py-12">
                  <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Inga företag hittades</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Försök med andra sökkriterier eller rensa filtren
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}