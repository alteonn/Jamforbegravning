import { BuildingOfficeIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function RealEstateAgents() {
  return (
    <ServicePage
      title="Fastighetsmäklare för dödsbo"
      description="Vi hjälper dig hitta erfarna mäklare som är specialiserade på försäljning av dödsbon. Få professionell hjälp med värdering och försäljning av fastigheter."
      icon={BuildingOfficeIcon}
      benefits={[
        "Specialiserade på dödsbon",
        "Kostnadsfri värdering",
        "Omfattande marknadsföring",
        "Juridisk kompetens",
        "Snabb och smidig process",
        "Transparent kommunikation"
      ]}
      services={[
        "Värdering av fastigheter",
        "Marknadsföring och visningar",
        "Budgivning och förhandling",
        "Kontraktsskrivning",
        "Samordning med jurister",
        "Rådgivning kring timing",
        "Hantering av dokumentation",
        "Samordning med andra parter",
        "Uppföljning efter försäljning"
      ]}
    />
  )
}