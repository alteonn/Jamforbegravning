import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = useSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    
    setError('')
    setIsLoading(true)
    console.log('Starting login process...')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      })

      if (signInError) {
        throw signInError
      }

      if (data?.user) {
        console.log('Login successful, redirecting...')
        window.location.href = '/admin/dashboard'
        return
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError('Felaktigt e-post eller lösenord')
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Head>
        <title>Admin Login | Jämför Begravning</title>
      </Head>

      <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-warm-700 hover:text-warm-800"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Tillbaka till startsidan
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-warm-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-medium text-stone-850">
                Admin Login
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-post
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Lösenord
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-gray-300 shadow-sm focus:border-warm-500 focus:ring-warm-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-warm-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-warm-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Loggar in...
                  </div>
                ) : (
                  'Logga in'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}