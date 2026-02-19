'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase as supabaseClient } from '@/lib/supabaseClient'
import BookmarkItem from './BookmarkItem'
import Loader from './Loader'

interface Bookmark {
  id: string
  user_id: string
  title: string
  url: string
  created_at: string
}

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    const { data } = await supabaseClient
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
    setLoading(false)
  }, [userId]);

  useEffect(() => {
    fetchBookmarks()

    const channel = supabaseClient
      .channel(`bookmarks-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // console.log('Realtime payload:', payload)

          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          }

          if (payload.eventType === 'UPDATE') {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === (payload.new as Bookmark).id
                  ? (payload.new as Bookmark)
                  : b
              )
            )
          }

          if (payload.eventType === 'DELETE') {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== (payload.old as Bookmark).id)
            )
          }
        }
      )

      .subscribe((status) => {
        // console.log('Supabase Realtime status:', status)
      })

    // console.log("channel", channel)

    return () => {
      channel.unsubscribe()
    }
  }, [userId])


  if (loading) 
    return <Loader message="Loading bookmarks..." />

  if (!bookmarks.length) {
    return <p className="text-gray-500">No bookmarks yet. Add one above!</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
        />
      ))}
    </div>
  )
}
