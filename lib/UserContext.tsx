'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from './supabaseClient'

interface UserContextProps {
  userId: string | null
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextProps>({
  userId: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          // console.error('Failed to get user', error)
          setUserId(null)
          setIsAuthenticated(false)
          setUser(null)
        } else if (user) {
          setUserId(user.id)
          setIsAuthenticated(true)
          setUser(user);
        } else {
          setUserId(null)
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (err) {
        // console.error('Unexpected error getting user', err)
        setUserId(null)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    // Optional: subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        setIsAuthenticated(true)
      } else {
        setUserId(null)
        setIsAuthenticated(false)
        setUser(null)
      }
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUserId(null)
    setIsAuthenticated(false)
  }

  return (
    <UserContext.Provider value={{ userId, user, isAuthenticated, isLoading, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(UserContext)
