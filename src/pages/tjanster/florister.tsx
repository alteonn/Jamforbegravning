import { HeartIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function Florists() {
  return (
    <ServicePage
      title="Florister för begravning"
      description="Vi hjälper dig hitta erfarna florister som kan skapa vackra och personliga blomsterarrangemang för begravningsceremonin. Få professionell hjälp med att hedra minnet av den avlidne."
      icon={HeartIcon}
      benefits={[
        "Specialiserade på begravningsblommor",
        "Personlig rådgivning",
        "Bred erfarenhet av ceremonier",
        "Flexibla leveransmöjligheter",
        "Hänsyn till särskilda önskemål",
        "Kvalitetsgaranti på blommor"
      ]}
      services={[
        "Kisttäcken",
        "Handbuketter",
        "Kransar och hjärtan",
        "Dekorationer för ceremonilokalen",
        "Säsongsanpassade arrangemang",
        "Personliga blomsterarrangemang",
        "Leverans till ceremonilokal",
        "Rådgivning kring blomsterval",
        "Specialarrangemang efter önskemål"
      ]}
    />
  )
}