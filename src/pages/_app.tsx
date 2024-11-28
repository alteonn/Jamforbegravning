import type { AppProps } from 'next/app'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Footer from '../components/Layout/Footer'
import CookieBanner from '../components/CookieBanner'
import LoadingSpinner from '../components/LoadingSpinner'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createClientComponentClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="android-chrome" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="android-chrome" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div className="min-h-screen bg-warm-50">
        <Component {...pageProps} />
        <Footer />
        <CookieBanner />
      </div>
    </SessionContextProvider>
  )
}