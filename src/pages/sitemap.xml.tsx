import { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamforbegravning.se'

function generateSiteMap(articles: any[], companies: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <!-- Static Pages -->
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

      <!-- Articles -->
      ${articles
        .map(({ slug, updated_at, title }) => {
          const escapedTitle = title.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
          
          return `
            <url>
              <loc>${SITE_URL}/artiklar/${slug}</loc>
              <lastmod>${new Date(updated_at).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.6</priority>
              <news:news>
                <news:publication>
                  <news:name>Jämför Begravning</news:name>
                  <news:language>sv</news:language>
                </news:publication>
                <news:publication_date>${new Date(updated_at).toISOString()}</news:publication_date>
                <news:title>${escapedTitle}</news:title>
              </news:news>
            </url>
          `
        })
        .join('')}

      <!-- Companies and Cities -->
      ${companies
        .map(({ id, updated_at, city, name }) => {
          const escapedName = name.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
          
          return `
            <url>
              <loc>${SITE_URL}/sok-foretag/${id}</loc>
              <lastmod>${new Date(updated_at).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
              <news:news>
                <news:publication>
                  <news:name>Jämför Begravning</news:name>
                  <news:language>sv</news:language>
                </news:publication>
                <news:publication_date>${new Date(updated_at).toISOString()}</news:publication_date>
                <news:title>${escapedName} i ${city}</news:title>
              </news:news>
            </url>
            <url>
              <loc>${SITE_URL}/stader/${city.toLowerCase()}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join('')}
    </urlset>`
}

export default function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch all articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at, title')
    .order('updated_at', { ascending: false })

  // Fetch all companies
  const { data: companies } = await supabase
    .from('companies')
    .select('id, updated_at, city, name')
    .order('updated_at', { ascending: false })

  const sitemap = generateSiteMap(articles || [], companies || [])

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}