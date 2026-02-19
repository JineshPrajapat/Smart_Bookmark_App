import { redirect } from 'next/dist/server/api-utils'
import { createClient } from './supabaseServer'

export async function getServerUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('Server: Failed to get user', error)
    return null
  }

  return user
}
