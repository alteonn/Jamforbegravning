import { useState, memo } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface FAQSectionProps {
  cityName?: string
}

const faqs = [
  {
    question: 'Vad är Jämförbegravning?',
    answer: 'Jämförbegravning är en kostnadsfri digital tjänst där du får hjälp med allt relaterat till ett dödsfall, enkelt och tryggt. Vi vet hur jobbigt det kan vara att ordna allt kring hanteringen utav en bortgång. Därför har vi samlat allt på ett och samma ställe.'
  },
  {
    question: 'Hur kontrollerar jämförbegravning kvaliteten på företagen?',
    answer: 'Jämförbegravning arbetar uteslutande med erfarna, professionella begravningsbyråer och företag som har kunskap kring att hjälpa till med tjänster relaterade till ett dödsbo. Vi gör efter varje genomförd tjänst en mindre kundundersökning för att säkerställa kvaliteten.'
  },
  {
    question: 'Vad kan jag få prisförslag på?',
    answer: 'Begravningsbyråer, Mäklare, Jurist, Flytt & Städ, Florister och Catering. Vi hjälper även till med försäkringsinventering, deklaration och att avsluta sociala medier.'
  },
  {
    question: 'Vad hjälper en begravningsbyrå till med?',
    answer: 'Hos en begravningsbyrå kan du få hjälp med bland annat boka en begravningsceremoni, arrangera en minnesstund, köpa blommor, göra bouppteckning, tömma dödsbon och få svar på juridiska frågor. Du måste inte välja alla tjänster som erbjuds.'
  },
  {
    question: 'Är det gratis att använda tjänsten?',
    answer: 'Ja, det är helt kostnadsfritt att använda vår tjänst. Vi tar inte betalt av privatpersoner som söker hjälp.'
  },
  {
    question: 'Hur snabbt får jag svar?',
    answer: 'Normalt får du svar inom 24 timmar. I akuta fall kan vi hjälpa dig snabbare.'
  },
  {
    question: 'Måste jag välja något av företagen?',
    answer: 'Nej, du har ingen skyldighet att välja något av företagen som kontaktar dig. Du väljer helt fritt om du vill gå vidare med någon av offerterna.'
  },
  {
    question: 'Hur hanteras mina personuppgifter?',
    answer: 'Vi värnar om din integritet och följer GDPR. Dina uppgifter delas endast med de företag du väljer att få offert från och raderas när de inte längre behövs.'
  }
]

const FAQSection = ({ cityName }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
      </div>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-medium text-stone-850 sm:text-4xl">
            {cityName ? `Vanliga frågor om begravning i ${cityName}` : 'Vanliga frågor'}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Här hittar du svar på de vanligaste frågorna
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-warm-100 hover:border-warm-200 transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="text-lg font-medium text-stone-850">{faq.question}</span>
                <ChevronDownIcon
                  className={`${
                    openIndex === index ? 'transform rotate-180' : ''
                  } w-5 h-5 text-warm-700 transition-transform duration-200`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(FAQSection)