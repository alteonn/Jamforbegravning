import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '../../components/Layout/Header'
import SearchSection from '../../components/Home/SearchSection'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import type { Article } from '@/types/database'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const categories = [
  { id: 'ceremoni', name: 'Ceremoni' },
  { id: 'begravning', name: 'Begravning' },
  { id: 'juridik', name: 'Juridik' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'dokument', name: 'Dokument' },
  { id: 'efterlevande', name: 'Efterlevande' },
  { id: 'fragor', name: 'Vanliga frågor' }
]

export default function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { slug } = router.query
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      setArticle(data)
    } catch (error) {
      console.error('Error fetching article:', error)
      router.push('/artiklar')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium text-stone-850">
              Artikeln kunde inte hittas
            </h1>
            <div className="mt-6">
              <Link
                href="/artiklar"
                className="inline-flex items-center text-warm-700 hover:text-warm-800"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Tillbaka till artiklar
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categoryName = categories.find(cat => cat.id === article.category)?.name || article.category

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>{article.title} | Jämför Begravning</title>
        <meta name="description" content={article.content.substring(0, 155)} />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-warm-50 rounded-l-[200px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-8">
                <Link
                  href="/artiklar"
                  className="inline-flex items-center text-warm-700 hover:text-warm-800"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Tillbaka till artiklar
                </Link>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warm-100 text-warm-700 mb-6">
                {categoryName}
              </span>

              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-8">
                {article.title}
              </h1>

              <div className="text-sm text-gray-500">
                Publicerad {new Date(article.created_at).toLocaleDateString('sv-SE')}
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="relative py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-warm-100">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-stone-850 prose-p:text-gray-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchSection />
          </div>
        </section>
      </main>
    </div>
  )
}