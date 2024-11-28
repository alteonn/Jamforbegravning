import { memo, useState } from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'

const serviceTypes = [
  { id: 'funeral', name: 'Begravningsbyrå' },
  { id: 'legal', name: 'Jurist' },
  { id: 'moving', name: 'Flyttfirma' },
  { id: 'cleaning', name: 'Städfirma' },
  { id: 'florist', name: 'Florist' },
  { id: 'catering', name: 'Catering' }
]

const additionalServices = [
  { id: 'insurance', name: 'Försäkringsinventering' },
  { id: 'tax', name: 'Deklaration' },
  { id: 'social', name: 'Avsluta sociala medier' },
  { id: 'obituary', name: 'Dödsannons' },
  { id: 'gravestone', name: 'Gravsten' },
  { id: 'realtor', name: 'Mäklare' }
]

const SearchSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    serviceType: '',
    budget: '',
    message: '',
    legalHelp: false,
    selectedServices: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Översätt servicetyper till svenska
    const serviceTypeTranslations: { [key: string]: string } = {
      'urn': 'Urnbegravning',
      'simple': 'Enkel begravning',
      'classic': 'Klassisk begravning',
      'premium': 'Stilfull begravning',
      'custom': 'Anpassad begravning'
    }

    // Översätt budget till svenska
    const budgetTranslations: { [key: string]: string } = {
      'Under 25 000 kr': 'Under 25 000 kr',
      '25 000 - 50 000 kr': '25 000 - 50 000 kr',
      'Över 50 000 kr': 'Över 50 000 kr'
    }

    // Översätt valda tjänster till svenska namn
    const selectedServiceNames = formData.selectedServices.map(id => {
      const service = [...serviceTypes, ...additionalServices].find(s => s.id === id)
      return service ? service.name : id
    })

    const payload = {
      form_type: 'search',
      namn: formData.name,
      telefon: formData.phone,
      epost: formData.email,
      stad: formData.city,
      begravningstyp: serviceTypeTranslations[formData.serviceType] || formData.serviceType,
      budget: budgetTranslations[formData.budget] || formData.budget,
      meddelande: formData.message || 'Inget meddelande angivet',
      juridisk_radgivning: formData.legalHelp ? 'Ja' : 'Nej',
      valda_tjanster: selectedServiceNames,
      tidstampel: new Date().toISOString(),
      status: 'Ny förfrågan',
      kalla: 'Webbformulär'
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ZAPIER_SEARCH_WEBHOOK!, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      setShowConfirmation(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        serviceType: '',
        budget: '',
        message: '',
        legalHelp: false,
        selectedServices: []
      })

      setTimeout(() => {
        setShowConfirmation(false)
      }, 5000)
    } catch (err) {
      setError('Ett fel uppstod. Vänligen försök igen.')
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div id="search" className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-medium text-stone-850 mb-8">
          Få kostnadsfria offerter
        </h2>

        {showConfirmation && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg animate-fade-in">
            Tack för din förfrågan! Vi kommer att kontakta dig inom kort.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Namn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>
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
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Stad
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500 pl-10"
                  placeholder="Ange stad"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                Typ av begravning
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              >
                <option value="">Välj typ</option>
                <option value="urn">Urnbegravning</option>
                <option value="simple">Enkel begravning</option>
                <option value="classic">Klassisk begravning</option>
                <option value="premium">Stilfull begravning</option>
                <option value="custom">Anpassad begravning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Jag vill även ha kostnadsförslag på följande tjänster
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[...serviceTypes, ...additionalServices].map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.id)}
                  className={`${
                    formData.selectedServices.includes(service.id)
                      ? 'bg-warm-700 text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-warm-50'
                  } px-3 py-2 text-sm font-medium border rounded-xl transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget (valfritt)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
            >
              <option value="">Välj budget</option>
              <option value="Under 25 000 kr">Under 25 000 kr</option>
              <option value="25 000 - 50 000 kr">25 000 - 50 000 kr</option>
              <option value="Över 50 000 kr">Över 50 000 kr</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Meddelande (valfritt)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
              placeholder="Skriv ditt meddelande här..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="legalHelp"
              name="legalHelp"
              checked={formData.legalHelp}
              onChange={(e) => setFormData(prev => ({ ...prev, legalHelp: e.target.checked }))}
              className="h-4 w-4 text-warm-700 focus:ring-warm-500 border-gray-300 rounded"
            />
            <label htmlFor="legalHelp" className="ml-2 block text-sm text-gray-700">
              Jag vill ha juridisk rådgivning
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-warm-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-warm-800'
            }`}
          >
            {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Genom att skicka in formuläret godkänner du att vi behandlar dina personuppgifter enligt GDPR.
          </p>
        </form>
      </div>
    </div>
  )
}

export default memo(SearchSection)