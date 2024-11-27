export const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jämför Begravning',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    description: 'Kostnadsfri tjänst som hjälper dig att hitta och jämföra olika begravningsbyråer och företag relaterat till ett dödsfall.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SE',
      addressLocality: 'Solna',
      addressRegion: 'Solna',
      postalCode: '169 79',
      streetAddress: 'Solna'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Swedish', 'English']
    }
  })
  
  export const generateLocalBusinessSchema = (company: any) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressCountry: 'SE'
    },
    telephone: company.phone,
    email: company.email,
    url: company.website
  })