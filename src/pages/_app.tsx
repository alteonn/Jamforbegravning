import type { AppProps } from 'next/app'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import '../styles/globals.css'
import Footer from '../components/Layout/Footer'
import CookieBanner from '../components/CookieBanner'
import LoadingSpinner from '../components/LoadingSpinner'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createClientComponentClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <div className="min-h-screen bg-warm-50">
        <Component {...pageProps} />
        <Footer />
        <CookieBanner />
      </div>
    </SessionContextProvider>
  )
}