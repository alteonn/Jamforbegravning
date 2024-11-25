import { CakeIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function Catering() {
  return (
    <ServicePage
      title="Catering för minnesstund"
      description="Vi hjälper dig hitta cateringföretag som kan arrangera en värdig minnesstund. Få professionell hjälp med mat och dryck som passar tillfället."
      icon={CakeIcon}
      benefits={[
        "Erfarna inom minnesstunder",
        "Anpassade menyer",
        "Flexibla lösningar",
        "Komplett service",
        "Hänsyn till allergier och preferenser",
        "Leverans och uppställning"
      ]}
      services={[
        "Kompletta bufféer",
        "Smörgåstårtor",
        "Kaffe och kaffebröd",
        "Uppdukning och servering",
        "Porslin och dukning",
        "Specialanpassade menyer",
        "Dryckesarrangemang",
        "Personal vid behov",
        "Städning efter minnesstunden"
      ]}
    />
  )
}