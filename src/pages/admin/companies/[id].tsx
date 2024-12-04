import { useState, useEffect } from 'react'
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

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'converted' | 'lost'
  notes: string
  created_at: string
  updated_at: string
}

type CompanyData = {
  name: string
  city: string
  description: string
  phone: string
  email: string
  website: string
  services: string[]
  verified: boolean
  internal_notes: string
  leads: Lead[]
}

export default function EditCompany() {
  const [formData, setFormData] = useState<CompanyData>({
    name: '',
    city: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    services: [],
    verified: false,
    internal_notes: '',
    leads: []
  })
  const [newLead, setNewLead] = useState<Omit<Lead, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    email: '',
    phone: '',
    status: 'new',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'leads'>('details')
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { id } = router.query

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

      setFormData({
        ...data,
        leads: data.leads || []
      })
    } catch (error) {
      console.error('Error fetching company:', error)
      router.push('/admin/companies')
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.phone) {
      alert('Vänligen fyll i namn, e-post och telefon')
      return
    }

    const lead: Lead = {
      ...newLead,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setFormData(prev => ({
      ...prev,
      leads: [...prev.leads, lead]
    }))

    setNewLead({
      name: '',
      email: '',
      phone: '',
      status: 'new',
      notes: ''
    })
  }

  const handleUpdateLeadStatus = (leadId: string, status: Lead['status']) => {
    setFormData(prev => ({
      ...prev,
      leads: prev.leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status, updated_at: new Date().toISOString() }
          : lead
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('companies')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error

      router.push('/admin/companies')
    } catch (error) {
      console.error('Error updating company:', error)
      alert('Ett fel uppstod när företaget skulle uppdateras')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Redigera företag | Admin Dashboard</title>
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
            Redigera företag
          </h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-b-2 border-warm-700 text-warm-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Företagsuppgifter
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'leads'
                  ? 'border-b-2 border-warm-700 text-warm-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('leads')}
            >
              Leads
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'details' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="md:col-span-2">
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

                <div>
                  <label htmlFor="internal_notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Interna anteckningar
                  </label>
                  <textarea
                    id="internal_notes"
                    name="internal_notes"
                    value={formData.internal_notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500 bg-yellow-50"
                    placeholder="Anteckningar som endast är synliga för admin..."
                  />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {/* Add New Lead Form */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-stone-850 mb-4">Lägg till ny lead</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Namn"
                      value={newLead.name}
                      onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                      className="rounded-lg border-gray-300"
                    />
                    <input
                      type="email"
                      placeholder="E-post"
                      value={newLead.email}
                      onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                      className="rounded-lg border-gray-300"
                    />
                    <input
                      type="tel"
                      placeholder="Telefon"
                      value={newLead.phone}
                      onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                      className="rounded-lg border-gray-300"
                    />
                    <textarea
                      placeholder="Anteckningar"
                      value={newLead.notes}
                      onChange={(e) => setNewLead(prev => ({ ...prev, notes: e.target.value }))}
                      className="rounded-lg border-gray-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLead}
                    className="bg-warm-700 text-white px-4 py-2 rounded-lg hover:bg-warm-800"
                  >
                    Lägg till lead
                  </button>
                </div>

                {/* Leads List */}
                <div className="space-y-4">
                  {formData.leads.map((lead) => (
                    <div key={lead.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-stone-850">{lead.name}</h4>
                          <p className="text-sm text-gray-600">{lead.email} • {lead.phone}</p>
                        </div>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className="rounded-lg border-gray-300 text-sm"
                        >
                          <option value="new">Ny</option>
                          <option value="contacted">Kontaktad</option>
                          <option value="converted">Konverterad</option>
                          <option value="lost">Förlorad</option>
                        </select>
                      </div>
                      {lead.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {lead.notes}
                        </p>
                      )}
                      <div className="mt-2 text-xs text-gray-500">
                        Skapad: {new Date(lead.created_at).toLocaleDateString('sv-SE')}
                        {lead.updated_at !== lead.created_at && 
                          ` • Uppdaterad: ${new Date(lead.updated_at).toLocaleDateString('sv-SE')}`
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-warm-700 hover:bg-warm-800 disabled:opacity-50"
              >
                {isSubmitting ? 'Sparar...' : 'Spara ändringar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}