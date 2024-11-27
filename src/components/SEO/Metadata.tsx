import Head from 'next/head'

interface MetadataProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  noindex?: boolean
}

export default function Metadata({
  title,
  description,
  canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL,
  ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
  noindex = false
}: MetadataProps) {
  const fullTitle = `${title} | Jämför Begravning`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Jämför Begravning" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Language */}
      <meta property="og:locale" content="sv_SE" />
      <meta httpEquiv="content-language" content="sv-se" />
    </Head>
  )
}