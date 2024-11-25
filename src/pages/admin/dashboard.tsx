import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { 
  DocumentTextIcon, 
  BuildingOfficeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = useSupabaseClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        window.location.href = '/admin/login'
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    } catch (error) {
      console.error('Auth error:', error)
      window.location.href = '/admin/login'
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-700"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Admin Dashboard | Jämför Begravning</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-warm-700 hover:text-warm-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tillbaka till startsidan
          </Link>
        </div>

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-stone-850">
            Admin Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="text-warm-700 hover:text-warm-800"
          >
            Logga ut
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/admin/articles"
            className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-8 w-8 text-warm-700" />
              <h2 className="ml-3 text-xl font-medium text-stone-850">
                Hantera artiklar
              </h2>
            </div>
            <p className="text-gray-600">
              Skapa och redigera artiklar för webbplatsen
            </p>
          </Link>

          <Link
            href="/admin/companies"
            className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-warm-700" />
              <h2 className="ml-3 text-xl font-medium text-stone-850">
                Hantera företag
              </h2>
            </div>
            <p className="text-gray-600">
              Lägg till och redigera företag i databasen
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}