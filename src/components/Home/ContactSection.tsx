import { memo, useState } from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ZAPIER_CONTACT_WEBHOOK!, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      setShowConfirmation(true)
      setFormData({ name: '', email: '', message: '' })

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
    <section className="relative bg-warm-50 py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white rounded-r-[200px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
              Behöver du hjälp?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Vi finns här för att hjälpa dig hitta rätt begravningsbyrå och svara på dina frågor.
            </p>
            <div className="mt-8">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-6 w-6 mr-2" />
                <span>Öppettider: 08:00-20:00</span>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-warm-100">
              {showConfirmation && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg animate-fade-in">
                  Tack för ditt meddelande! Vi återkommer så snart som möjligt.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Namn
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-post
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Meddelande
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-warm-700 hover:bg-warm-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warm-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ContactSection)