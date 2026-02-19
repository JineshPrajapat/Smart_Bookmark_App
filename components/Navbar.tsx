'use client'
import Link from 'next/link'
import { useCurrentUser } from '@/lib/UserContext'
import { useRouter } from 'next/dist/client/components/navigation'

export default function Navbar() {
  const { isAuthenticated, user, isLoading, signOut } = useCurrentUser()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
      <div className="px-6 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-zinc-200">
              <span className="font-black text-sm tracking-tighter">SB</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-blue-600">SmartBookMark</span>
          </Link>

          <div className="flex items-center gap-6">
            {!isLoading && isAuthenticated && (
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-zinc-600">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold bg-zinc-100 px-3 py-1 rounded-full text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}