import { SparklesIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function CleaningCompanies() {
  return (
    <ServicePage
      title="Städfirmor för dödsbo"
      description="Vi hjälper dig hitta professionella städfirmor som är specialiserade på dödsbon. Få hjälp med tömning, städning och sanering av bostaden."
      icon={SparklesIcon}
      benefits={[
        "Specialiserade på dödsbon",
        "Miljövänlig hantering",
        "Noggrann dokumentation",
        "Försäkrade tjänster",
        "Diskret och respektfullt arbete",
        "Kompletta städlösningar"
      ]}
      services={[
        "Tömning av bostad",
        "Flyttstädning",
        "Sanering vid behov",
        "Sortering av bohag",
        "Återvinning och källsortering",
        "Bortforsling av möbler",
        "Rengöring av alla utrymmen",
        "Fönsterputs",
        "Dokumentation med bilder"
      ]}
    />
  )
}