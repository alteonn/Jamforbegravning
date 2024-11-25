import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import slugify from 'slugify'

const categories = [
  { id: 'ceremoni', name: 'Ceremoni', icon: 'HeartIcon' },
  { id: 'begravning', name: 'Begravning', icon: 'HomeIcon' },
  { id: 'juridik', name: 'Juridik', icon: 'ScaleIcon' },
  { id: 'ekonomi', name: 'Ekonomi', icon: 'BanknotesIcon' },
  { id: 'dokument', name: 'Dokument', icon: 'DocumentTextIcon' },
  { id: 'efterlevande', name: 'Efterlevande', icon: 'UserGroupIcon' },
  { id: 'fragor', name: 'Vanliga frågor', icon: 'QuestionMarkCircleIcon' },
]

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    slug: '',
    icon: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'title') {
      // Generate slug from title
      const generatedSlug = slugify(value, { lower: true, strict: true })
      setFormData(prev => ({ ...prev, title: value, slug: generatedSlug }))
    } else if (name === 'category') {
      // Set icon based on category
      const category = categories.find(cat => cat.id === value)
      setFormData(prev => ({ ...prev, category: value, icon: category?.icon || '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('articles')
        .insert([formData])

      if (error) throw error

      router.push('/admin/articles')
    } catch (error) {
      console.error('Error creating article:', error)
      alert('Ett fel uppstod när artikeln skulle skapas')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Ny artikel | Admin Dashboard</title>
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
            Skapa ny artikel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500 bg-gray-50"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Genereras automatiskt från titeln, men kan redigeras vid behov
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
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
              {formData.icon && (
                <p className="mt-1 text-sm text-gray-500">
                  Vald ikon: {formData.icon}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Innehåll
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
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
                {isSubmitting ? 'Sparar...' : 'Spara artikel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}