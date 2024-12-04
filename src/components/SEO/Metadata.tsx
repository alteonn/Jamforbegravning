import Head from 'next/head'

interface MetadataProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  noindex?: boolean
  cityName?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  articleSection?: string
}

export default function Metadata({
  title,
  description,
  canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL,
  ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
  noindex = false,
  cityName,
  type = 'website',
  publishedTime,
  modifiedTime,
  articleSection
}: MetadataProps) {
  const fullTitle = cityName 
    ? `${title} ${cityName} | Jämför Begravning`
    : `${title} | Jämför Begravning`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Jämför Begravning" />
      <meta property="og:locale" content="sv_SE" />

      {/* Article-specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="sv-se" />

      {/* Geo Meta Tags for City Pages */}
      {cityName && (
        <>
          <meta name="geo.region" content="SE" />
          <meta name="geo.placename" content={cityName} />
        </>
      )}
    </Head>
  )
}