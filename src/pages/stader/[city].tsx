import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/Layout/Header'
import HeroSection from '../../components/City/HeroSection'
import SearchSection from '../../components/Home/SearchSection'
import ServicesSection from '../../components/Home/ServicesSection'
import ProcessSection from '../../components/Home/ProcessSection'
import TestimonialsSection from '../../components/Home/TestimonialsSection'
import FAQSection from '../../components/Home/FAQSection'

export default function CityPage() {
  const router = useRouter()
  const { city } = router.query
  
  // Capitalize city name for display
  const cityName = typeof city === 'string' 
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() 
    : ''

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Begravningsbyrå {cityName} | Jämför Begravning</title>
        <meta 
          name="description" 
          content={`Hitta och jämför begravningsbyråer i ${cityName}. Vi hjälper dig att hitta rätt begravningsbyrå och spara pengar.`} 
        />
      </Head>

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