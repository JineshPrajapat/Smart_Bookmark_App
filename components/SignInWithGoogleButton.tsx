'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { Chrome } from 'lucide-react'
import Loader from './Loader'

export default function SignInWithGoogleButton() {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

  const login = async () => {
    try {
      setIsRedirecting(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error)
        throw error
    }
    catch (error) {
      console.error('Login error:', error)
    }
    finally{
      setIsRedirecting(false)
    }
  }

  return (
    <button
      onClick={login}
      disabled={isRedirecting}
      className={`
        relative flex items-center justify-center gap-3 px-8 py-3 
        rounded-2xl font-bold text-sm tracking-wide transition-all duration-300
       bg-blue-600 disabled:bg-blue-200 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95 cursor-pointer disabled:cursor-not-allowed'
      `}
    >
      {isRedirecting ? (
        <>
          <Loader size={18} />
          <span>Redirecting to Google...</span>
        </>
      ) : (
        <>
          <Chrome size={18} />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  )
}
