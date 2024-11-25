import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '../components/Layout/Header'
import SearchSection from '../components/Home/SearchSection'
import { 
  HeartIcon,
  HomeIcon,
  ScaleIcon,
  BanknotesIcon,
  DocumentTextIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'
import type { Article } from '@/types/database'

const categoryIcons: { [key: string]: React.ComponentType<any> } = {
  'ceremoni': HeartIcon,
  'begravning': HomeIcon,
  'juridik': ScaleIcon,
  'ekonomi': BanknotesIcon,
  'dokument': DocumentTextIcon,
  'efterlevande': UserGroupIcon,
  'fragor': QuestionMarkCircleIcon
}

const categories = [
  { id: 'ceremoni', name: 'Ceremoni' },
  { id: 'begravning', name: 'Begravning' },
  { id: 'juridik', name: 'Juridik' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'dokument', name: 'Dokument' },
  { id: 'efterlevande', name: 'Efterlevande' },
  { id: 'fragor', name: 'Vanliga frågor' }
]

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPreviewText = (content: string) => {
    // Remove markdown headers
    const withoutHeaders = content.replace(/#{1,6}\s[^\n]+/g, '')
    // Remove markdown links
    const withoutLinks = withoutHeaders.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove other markdown syntax
    const plainText = withoutLinks.replace(/[*_`~]/g, '')
    return plainText.substring(0, 150) + '...'
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Artiklar | Jämför Begravning</title>
        <meta name="description" content="Läs våra informativa artiklar om begravningar, ceremonier och praktiska råd." />
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
              <h1 className="text-4xl font-serif font-medium text-stone-850 sm:text-5xl mb-8">
                Artiklar och guider
              </h1>
              <p className="text-xl text-gray-600">
                Hitta svar på dina frågor och få värdefull information om begravningar och relaterade ämnen.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Sök artiklar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-warm-500 focus:border-warm-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full md:w-48 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-warm-500 focus:border-warm-500"
              >
                <option value="">Alla kategorier</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700 mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => {
                  const Icon = categoryIcons[article.category] || DocumentTextIcon
                  return (
                    <article
                      key={article.id}
                      className="bg-white rounded-2xl shadow-lg border border-warm-100 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Icon className="h-6 w-6 text-warm-700" />
                          <span className="ml-2 text-sm font-medium text-warm-700">
                            {categories.find(cat => cat.id === article.category)?.name || article.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-medium text-stone-850 mb-3">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-3">
                          {getPreviewText(article.content)}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {new Date(article.created_at).toLocaleDateString('sv-SE')}
                          </span>
                          <a
                            href={`/artiklar/${article.slug}`}
                            className="text-warm-700 hover:text-warm-800 font-medium"
                          >
                            Läs mer
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {!isLoading && filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Inga artiklar hittades</h3>
                <p className="text-gray-500">
                  Försök med andra sökord eller välj en annan kategori
                </p>
              </div>
            )}
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