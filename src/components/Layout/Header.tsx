import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Hem', href: '/', icon: HomeIcon },
  { name: 'Hur funkar det', href: '/hur-funkar-det', icon: QuestionMarkCircleIcon },
  { name: 'Sök företag', href: '/sok-foretag', icon: BuildingOfficeIcon },
  { name: 'Vanliga frågor', href: '/vanliga-fragor', icon: QuestionMarkCircleIcon },
  { name: 'Städer', href: '/stader', icon: MapPinIcon },
  { name: 'Artiklar', href: '/artiklar', icon: DocumentTextIcon },
  { name: 'Anslut företag', href: '/anslut-foretag', icon: UserGroupIcon },
  { name: 'Begravningsprocess', href: '/begravningsprocess', icon: ClipboardDocumentListIcon },
  { name: 'Checklista', href: '/checklista', icon: CheckCircleIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = useSupabaseClient()
  const session = useSession()

  const isActivePage = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-warm-100 text-warm-700 group-hover:bg-warm-200 transition-all duration-200 mr-2">
                <HeartIcon className="h-4 w-4" />
              </div>
              <span className="text-lg font-serif font-medium text-stone-850 group-hover:text-warm-700 transition-colors duration-200">
                Jämför<span className="text-warm-700">Begravning</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navigation.slice(0, 7).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActivePage(item.href)
                    ? 'text-warm-700 bg-warm-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-warm-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="px-3 py-2 text-sm font-medium rounded-full text-gray-500 hover:text-gray-900 hover:bg-warm-50 transition-colors duration-200 flex items-center"
                >
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 text-sm font-medium rounded-full text-gray-500 hover:text-gray-900 hover:bg-warm-50 transition-colors duration-200 flex items-center"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Logga ut
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="px-3 py-2 text-sm font-medium rounded-full text-gray-500 hover:text-gray-900 hover:bg-warm-50 transition-colors duration-200 flex items-center"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logga in
              </Link>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-warm-50/95 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 h-16 border-b border-warm-100">
                <span className="text-lg font-serif font-medium text-warm-700">
                  Meny
                </span>
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="px-2 py-3 h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const active = isActivePage(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                          active
                            ? 'text-warm-700 bg-warm-50'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-warm-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    )
                  })}
                  {session ? (
                    <>
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-gray-500 hover:text-gray-900 hover:bg-warm-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserCircleIcon className="h-5 w-5 mr-3" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-gray-500 hover:text-gray-900 hover:bg-warm-50 w-full text-left"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        Logga ut
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/admin/login"
                      className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-gray-500 hover:text-gray-900 hover:bg-warm-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                      Logga in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}