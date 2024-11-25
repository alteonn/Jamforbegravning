import { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamforbegravning.se'

function generateSiteMap(articles: any[], companies: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Statiska sidor -->
      <url>
        <loc>${SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${SITE_URL}/hur-funkar-det</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/sok-foretag</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/vanliga-fragor</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${SITE_URL}/stader</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/artiklar</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/anslut-foretag</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>${SITE_URL}/checklista</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${SITE_URL}/begravningsprocess</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${SITE_URL}/forsakringsinventering</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>

      <!-- Artiklar -->
      ${articles
        .map(({ slug, updated_at }) => `
          <url>
            <loc>${SITE_URL}/artiklar/${slug}</loc>
            <lastmod>${updated_at}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
          </url>
        `)
        .join('')}

      <!-- Företag -->
      ${companies
        .map(({ id, updated_at }) => `
          <url>
            <loc>${SITE_URL}/sok-foretag/${id}</loc>
            <lastmod>${updated_at}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `)
        .join('')}
    </urlset>`
}

// Lägg till en default export för att tillfredsställa Next.js krav
export default function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Hämta alla artiklar
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  // Hämta alla företag
  const { data: companies } = await supabase
    .from('companies')
    .select('id, updated_at')
    .order('updated_at', { ascending: false })

  const sitemap = generateSiteMap(articles || [], companies || [])

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}