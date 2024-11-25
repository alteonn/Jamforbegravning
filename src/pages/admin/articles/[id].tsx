import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import slugify from 'slugify'

const categories = [
  { id: 'ceremoni', name: 'Ceremoni' },
  { id: 'begravning', name: 'Begravning' },
  { id: 'juridik', name: 'Juridik' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'dokument', name: 'Dokument' },
  { id: 'efterlevande', name: 'Efterlevande' },
  { id: 'fragor', name: 'Vanliga frågor' },
]

export default function EditArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchArticle()
    }
  }, [id])

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
    } catch (error) {
      console.error('Error fetching article:', error)
      router.push('/admin/articles')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const slug = slugify(title, { lower: true, strict: true })
      
      const { error } = await supabase
        .from('articles')
        .update({
          title,
          content,
          category,
          slug,
          icon: `${category}-icon`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error

      router.push('/admin/articles')
    } catch (error) {
      console.error('Error updating article:', error)
      alert('Ett fel uppstod när artikeln skulle uppdateras')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Redigera artikel | Admin Dashboard</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin/articles"
            className="inline-flex items-center text-warm-700 hover:text-warm-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tillbaka till artiklar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
          <h1 className="text-3xl font-serif font-medium text-stone-850 mb-8">
            Redigera artikel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              >
                <option value="">Välj kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Innehåll
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-warm-700 hover:bg-warm-800 disabled:opacity-50"
              >
                {isSubmitting ? 'Sparar...' : 'Spara ändringar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}