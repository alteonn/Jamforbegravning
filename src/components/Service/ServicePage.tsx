import Head from 'next/head'
import Header from '../Layout/Header'
import SearchSection from '../Home/SearchSection'
import { 
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface ServicePageProps {
  title: string
  description: string
  benefits: string[]
  services: string[]
  icon: React.ComponentType<any>
}

export default function ServicePage({ title, description, benefits, services, icon: Icon }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>{title} | Jämför Begravning</title>
        <meta name="description" content={description} />
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
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-warm-100 text-warm-700">
                  <Icon className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-8">
                {title}
              </h1>
              <p className="text-xl text-gray-600">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
              <div className="flex items-center mb-8">
                <ShieldCheckIcon className="h-8 w-8 text-warm-700" />
                <h2 className="ml-3 text-2xl font-serif font-medium text-stone-850">
                  Fördelar med vår tjänst
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-warm-700 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative bg-warm-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-medium text-stone-850 mb-8">
              Detta kan vi hjälpa dig med
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100"
                >
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-warm-700 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{service}</span>
                  </div>
                </div>
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