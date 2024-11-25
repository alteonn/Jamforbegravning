import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Layout/Header'
import { 
  CheckCircleIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    title: 'Inga startavgifter',
    description: 'Inga startavgifter eller extra kostnader för leads',
    icon: CheckCircleIcon,
  },
  {
    title: 'Ingen bindningstid',
    description: 'Ingen bindningstid eller uppsägningstid. Avsluta när du vill',
    icon: ClockIcon,
  },
  {
    title: 'Flexibelt system',
    description: 'Välj antal förfrågningar och typ av leads du vill ha',
    icon: ChartBarIcon,
  },
  {
    title: 'Kvalitetssäkrat',
    description: 'Alla förfrågningar behandlas enligt GDPR',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Personlig kontakt',
    description: 'Direktkontakt med potentiella kunder',
    icon: UserGroupIcon,
  },
  {
    title: 'Enkelt system',
    description: 'Få leads direkt till din e-post',
    icon: DocumentCheckIcon,
  },
]

export default function JoinNetwork() {
  const [formData, setFormData] = useState({
    company: '',
    orgNumber: '',
    contactPerson: '',
    phone: '',
    email: '',
    serviceArea: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    }

    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/20475824/2rkmwsj/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      setShowConfirmation(true)
      setFormData({
        company: '',
        orgNumber: '',
        contactPerson: '',
        phone: '',
        email: '',
        serviceArea: '',
        message: ''
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
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Anslut företag | Jämför Begravning</title>
        <meta name="description" content="Gå med i vårt nätverk och få fler kunder. Vi hjälper företag att växa genom kvalificerade leads." />
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
                Gå med i vårt nätverk
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Är du ett företag med speciell kompetens inom ert område? Vill ni få fler kunder?
              </p>
              <p className="text-xl text-gray-600">
                Anslut ert företag till vår tjänst och börja få fler uppdrag redan idag.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-warm-100 text-warm-700 mb-6">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-stone-850 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-warm-100">
              <h2 className="text-2xl font-serif font-medium text-stone-850 mb-8">
                Intresseanmälan
              </h2>

              {showConfirmation && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg animate-fade-in">
                  Tack för din intresseanmälan! Vi kommer att kontakta dig inom kort.
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
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Företagsnamn
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="orgNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Organisationsnummer
                    </label>
                    <input
                      type="text"
                      id="orgNumber"
                      name="orgNumber"
                      value={formData.orgNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orgNumber: e.target.value }))}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                      Kontaktperson
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefonnummer
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

                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700 mb-2">
                    Geografiskt verksamhetsområde
                  </label>
                  <input
                    type="text"
                    id="serviceArea"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceArea: e.target.value }))}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                    placeholder="T.ex. Stockholm med omnejd"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Meddelande
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                    placeholder="Berätta mer om ert företag och vilka tjänster ni erbjuder..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-warm-700 text-white py-4 px-8 rounded-xl font-medium hover:bg-warm-800 transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka intresseanmälan'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Genom att skicka in formuläret godkänner du att vi behandlar dina personuppgifter enligt GDPR.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}