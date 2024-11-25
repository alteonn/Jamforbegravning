import { TruckIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function MovingCompanies() {
  return (
    <ServicePage
      title="Flyttfirmor för dödsbo"
      description="Vi hjälper dig hitta professionella flyttfirmor som är specialiserade på hantering av dödsbon. Få hjälp med allt från packning till transport och förvaring."
      icon={TruckIcon}
      benefits={[
        "Specialiserade på dödsbon",
        "Försäkrade transporter",
        "Erfaren och utbildad personal",
        "Flexibla lösningar",
        "Säker hantering av värdesaker",
        "Snabb och effektiv service"
      ]}
      services={[
        "Packning och uppmärkning",
        "Transport av bohag",
        "Magasinering",
        "Sortering av bohag",
        "Bortforsling till återvinning",
        "Städning efter flytt",
        "Värdering av föremål",
        "Dokumentation av bohag",
        "Specialtransporter av värdesaker"
      ]}
    />
  )
}