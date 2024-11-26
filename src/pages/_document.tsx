import { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang="sv">
      <Head>
        <link
          rel="preconnect" 
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect" 
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FDF8F6" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#FDF8F6" />
        <meta name="theme-color" content="#FDF8F6" />
        <meta name="description" content="Jämför begravningsbyråer och företag - Kostnadsfri tjänst som hjälper dig hitta rätt" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}