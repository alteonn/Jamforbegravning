interface JsonLdProps {
    type: 'Organization' | 'LocalBusiness' | 'Article' | 'FAQPage'
    data: any
  }
  
  export default function JsonLd({ type, data }: JsonLdProps) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type,
            ...data,
          }),
        }}
      />
    )
  }