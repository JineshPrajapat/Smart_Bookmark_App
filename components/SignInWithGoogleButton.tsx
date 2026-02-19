'use client'
import { supabase } from '@/lib/supabaseClient'

export default function SignInWithGoogleButton() {
  const login = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

  }


  return (
    <button
      onClick={login}
      className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer hover:scale-110 duration-300 hover:shadow-blue-900"
    >
      Sign in with Google
    </button>
  )
}
