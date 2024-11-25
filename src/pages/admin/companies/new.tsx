import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

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
  'Catering',
  'Fastighetsmäklare'
]

export default function NewCompany() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    services: [] as string[],
    verified: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('companies')
        .insert([formData])

      if (error) throw error

      router.push('/admin/companies')
    } catch (error) {
      console.error('Error creating company:', error)
      alert('Ett fel uppstod när företaget skulle skapas')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Nytt företag | Admin Dashboard</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin/companies"
            className="inline-flex items-center text-warm-700 hover:text-warm-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tillbaka till företag
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
          <h1 className="text-3xl font-serif font-medium text-stone-850 mb-8">
            Lägg till nytt företag
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Företagsnamn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Stad
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivning
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Hemsida
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tjänster
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`${
                      formData.services.includes(service)
                        ? 'bg-warm-700 text-white border-transparent'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-warm-50'
                    } px-4 py-2 border rounded-xl text-sm font-medium transition-all duration-200`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                name="verified"
                checked={formData.verified}
                onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                className="h-4 w-4 text-warm-700 focus:ring-warm-500 border-gray-300 rounded"
              />
              <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
                Verifiera företaget
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-warm-700 hover:bg-warm-800 disabled:opacity-50"
              >
                {isSubmitting ? 'Sparar...' : 'Spara företag'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}