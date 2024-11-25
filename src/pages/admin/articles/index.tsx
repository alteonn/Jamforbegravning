import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

type Article = {
  id: number
  title: string
  category: string
  created_at: string
  slug: string
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

  const handleDelete = async (id: number) => {
    if (!confirm('Är du säker på att du vill radera denna artikel?')) return

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setArticles(articles.filter(article => article.id !== id))
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Hantera artiklar | Admin Dashboard</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-warm-700 hover:text-warm-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tillbaka till dashboard
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-stone-850">
            Hantera artiklar
          </h1>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-warm-700 hover:bg-warm-800"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Ny artikel
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700 mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-warm-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-warm-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Titel
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skapad
                    </th>
                    <th className="px-6 py-3 bg-warm-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Åtgärder
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-warm-100">
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {article.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warm-100 text-warm-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString('sv-SE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-warm-700 hover:text-warm-800 mr-4"
                        >
                          <PencilIcon className="h-5 w-5 inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}