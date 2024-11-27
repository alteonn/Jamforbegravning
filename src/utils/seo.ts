export const generateMetaTags = (page: {
    title: string
    description: string
    path: string
  }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    const url = `${baseUrl}${page.path}`
    const ogImage = `${baseUrl}/og-image.jpg`
  
    return {
      title: `${page.title} | Jämför Begravning`,
      description: page.description,
      canonical: url,
      openGraph: {
        title: page.title,
        description: page.description,
        url,
        images: [{ url: ogImage }],
        site_name: 'Jämför Begravning',
        locale: 'sv_SE',
        type: 'website',
      },
      twitter: {
        cardType: 'summary_large_image',
      },
    }
  }