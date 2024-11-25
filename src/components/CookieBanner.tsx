import { useState, useEffect } from 'react'
import { FingerPrintIcon } from '@heroicons/react/24/outline'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-warm-100 shadow-lg animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center w-full sm:w-auto">
            <div className="flex-shrink-0">
              <FingerPrintIcon className="h-6 w-6 text-warm-700" />
            </div>
            <p className="ml-3 text-sm sm:text-base text-gray-600 pr-4">
              Vi använder cookies för att förbättra din upplevelse på vår webbplats. 
              Genom att fortsätta använda webbplatsen godkänner du användningen av cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="/cookies"
              className="text-sm text-warm-700 hover:text-warm-800 font-medium text-center sm:text-left"
            >
              Hantera cookies
            </a>
            <div className="flex gap-3 justify-center sm:justify-start">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium rounded-lg text-warm-700 bg-warm-50 hover:bg-warm-100 transition-colors duration-200 min-w-[80px]"
              >
                Neka
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-warm-700 hover:bg-warm-800 transition-colors duration-200 min-w-[80px]"
              >
                Acceptera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}