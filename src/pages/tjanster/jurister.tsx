import { ScaleIcon } from '@heroicons/react/24/outline'
import ServicePage from '@/components/Service/ServicePage'

export default function Lawyers() {
  return (
    <ServicePage
      title="Jurister för dödsbo"
      description="Vi hjälper dig hitta erfarna jurister som kan assistera med alla juridiska aspekter kring ett dödsfall och dödsbo. Få professionell hjälp med bouppteckning och arvskifte."
      icon={ScaleIcon}
      benefits={[
        "Specialiserade på familjerätt och dödsbon",
        "Kvalificerad juridisk rådgivning",
        "Transparent prissättning",
        "Snabb handläggning",
        "Personlig service",
        "Bred erfarenhet av komplexa ärenden"
      ]}
      services={[
        "Bouppteckning",
        "Arvskifte",
        "Testamenten",
        "Juridisk rådgivning",
        "Boutredning",
        "Försäkringsärenden",
        "Fastighetsöverlåtelser",
        "Skattefrågor",
        "Tvistlösning"
      ]}
    />
  )
}