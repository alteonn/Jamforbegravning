import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/Layout/Header'
import HeroSection from '../../components/City/HeroSection'
import SearchSection from '../../components/Home/SearchSection'
import ServicesSection from '../../components/Home/ServicesSection'
import ProcessSection from '../../components/Home/ProcessSection'
import TestimonialsSection from '../../components/Home/TestimonialsSection'
import FAQSection from '../../components/Home/FAQSection'
import Metadata from '@/components/SEO/Metadata'
import JsonLd from '@/components/SEO/JsonLd'

export default function CityPage() {
  const router = useRouter()
  const { city } = router.query
  
  // Capitalize city name for display
  const cityName = typeof city === 'string' 
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() 
    : ''

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/stader/${city}`
  const pageTitle = `Begravningsbyrå ${cityName}`
  const pageDescription = `Hitta och jämför begravningsbyråer i ${cityName}. Vi hjälper dig att hitta rätt begravningsbyrå och spara pengar. Få kostnadsfria offerter från kvalitetssäkrade byråer.`

  // Structured data for local business
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Begravningsbyråer i ${cityName}`,
    description: pageDescription,
    areaServed: {
      '@type': 'City',
      name: cityName,
      '@id': `https://sv.wikipedia.org/wiki/${cityName}`
    },
    url: canonicalUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SE',
      addressLocality: cityName
    }
  }

  // Breadcrumb structured data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': process.env.NEXT_PUBLIC_SITE_URL,
          name: 'Hem'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/stader`,
          name: 'Städer'
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@id': canonicalUrl,
          name: `Begravningsbyrå ${cityName}`
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Metadata 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        cityName={cityName}
        type="website"
      />

      <JsonLd type="LocalBusiness" data={localBusinessData} />
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />

      <Header />

      <main>
        <HeroSection cityName={cityName} />
        <ServicesSection cityName={cityName} />
        <ProcessSection />
        <TestimonialsSection cityName={cityName} />
        <FAQSection cityName={cityName} />
        <SearchSection />
      </main>
    </div>
  )
}