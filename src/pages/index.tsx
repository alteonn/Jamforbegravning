import Head from 'next/head'
import Header from '../components/Layout/Header'
import HeroSection from '../components/Home/HeroSection'
import SearchSection from '../components/Home/SearchSection'
import ServicesSection from '../components/Home/ServicesSection'
import BenefitsSection from '../components/Home/BenefitsSection'
import ProcessSection from '../components/Home/ProcessSection'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import FAQSection from '../components/Home/FAQSection'
import ContactSection from '../components/Home/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Jämför Begravning - Hitta rätt begravningsbyrå</title>
        <meta name="description" content="Kostnadsfri tjänst som hjälper dig att hitta och jämföra olika begravningsbyråer och företag relaterat till ett dödsfall." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <SearchSection />
        <ContactSection />
      </main>
    </div>
  )
}