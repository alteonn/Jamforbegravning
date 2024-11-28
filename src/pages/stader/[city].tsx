import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/Layout/Header'
import HeroSection from '../../components/City/HeroSection'
import SearchSection from '../../components/Home/SearchSection'
import ServicesSection from '../../components/Home/ServicesSection'
import ProcessSection from '../../components/Home/ProcessSection'
import TestimonialsSection from '../../components/Home/TestimonialsSection'
import FAQSection from '../../components/Home/FAQSection'
import JsonLd from '@/components/SEO/JsonLd'

export default function CityPage() {
  const router = useRouter()
  const { city } = router.query
  
  // Capitalize city name for display
  const cityName = typeof city === 'string' 
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() 
    : ''

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/stader/${city}`

  // Structured data for local business
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Begravningsbyråer i ${cityName}`,
    description: `Hitta och jämför begravningsbyråer i ${cityName}. Vi hjälper dig att hitta rätt begravningsbyrå och spara pengar.`,
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

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>{`Begravningsbyrå ${cityName} | Jämför priser & tjänster | Jämför Begravning`}</title>
        <meta 
          name="description" 
          content={`Hitta och jämför begravningsbyråer i ${cityName}. Vi hjälper dig att hitta rätt begravningsbyrå och spara pengar. Få kostnadsfria offerter från kvalitetssäkrade byråer.`}
        />
        <meta property="og:title" content={`Begravningsbyrå ${cityName} | Jämför Begravning`} />
        <meta 
          property="og:description" 
          content={`Hitta och jämför begravningsbyråer i ${cityName}. Vi hjälper dig att hitta rätt begravningsbyrå och spara pengar.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Jämför Begravning" />
        <meta property="og:locale" content="sv_SE" />

        {/* Geo Meta Tags */}
        <meta name="geo.region" content="SE" />
        <meta name="geo.placename" content={cityName} />
        
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <JsonLd type="LocalBusiness" data={localBusinessData} />

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