import { HomeIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function FuneralHomes() {
  return (
    <ServicePage
      title="Begravningsbyråer"
      description="Vi hjälper dig hitta en begravningsbyrå som passar just dina önskemål och behov. Jämför priser och tjänster från kvalitetssäkrade begravningsbyråer i ditt område."
      icon={HomeIcon}
      benefits={[
        "Kostnadsfri jämförelse av begravningsbyråer",
        "Kvalitetssäkrade och erfarna byråer",
        "Personlig service och rådgivning",
        "Snabba svar på offertförfrågningar",
        "Transparent prisjämförelse",
        "Lokala begravningsbyråer i hela Sverige"
      ]}
      services={[
        "Planering och genomförande av begravningsceremoni",
        "Hjälp med alla praktiska arrangemang",
        "Rådgivning kring olika begravningsalternativ",
        "Transport och förvaring",
        "Kista och urna",
        "Dödsannons och minnessida",
        "Blommor och dekoration",
        "Bokning av lokal för ceremonin",
        "Hjälp med juridiska frågor"
      ]}
    />
  )
}