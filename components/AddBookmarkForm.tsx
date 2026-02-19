'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useCurrentUser } from '@/lib/UserContext'
import Loader from './Loader'
import { LinkIcon, Plus, Tag } from 'lucide-react'

export default function AddBookmarkForm() {
    const { userId, isLoading } = useCurrentUser()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const addBookmark = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg(null)

        if (!title.trim() || !url.trim()) {
            setErrorMsg('Fields cannot be empty')
            return
        }

        try {
            setLoading(true)
            const { error } = await supabase
                .from('bookmarks')
                .insert({ title, url, user_id: userId })

            if (error) throw error

            setTitle('')
            setUrl('')
        } catch (err: any) {
            setErrorMsg(err.message || 'Error adding bookmark')
        } finally {
            setLoading(false)
        }
    }

    if (isLoading)
        return null

    return (
        <div className="w-full px-2">
            <form onSubmit={addBookmark} className="flex flex-col md:flex-row items-end gap-6 md:gap-8 justify-center">

                <>
                    {/* title input*/}
                    <div className="relative flex-1 w-full group">
                        <div className='flex items-center'>
                            <Tag size={14} className="text-zinc-500 group-focus-within:text-zinc-900 transition-colors" />
                            <input
                                className="w-full bg-transparent border-none px-1 py-2 text-sm font-medium text-zinc-900 placeholder:text-zinc-300 focus:ring-0 outline-none transition-all"
                                placeholder="Bookmark Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200" /> */}
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-300 group-focus-within:w-full" />
                        </div>
                    </div>

                    {/* url input */}
                    <div className="relative flex-1 w-full group">
                        <div className='flex items-center '>
                            <div className="flex items-center gap-2 mb-1 px-1">
                                <LinkIcon size={14} className="text-zinc-500 group-focus-within:text-zinc-900 transition-colors" />
                            </div>
                            <input
                                className="w-full bg-transparent border-none px-1 py-2 text-sm font-medium text-zinc-900 placeholder:text-zinc-300 focus:ring-0 outline-none transition-all"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200" /> */}
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-300 group-focus-within:w-full" />
                        </div>
                    </div>
                </>

                <button
                    disabled={loading || (!title.trim() || !url.trim())}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:bg-blue-500 disabled:cursor-not-allowed"
                >
                    {!loading ?
                        <>
                            <Plus size={18} />
                            <span>Add Link</span>
                        </> :
                        <Loader size={18} />}
                </button>
            </form>
            {errorMsg && <p className="text-[10px] font-bold text-red-500 mt-4 uppercase tracking-tighter">{errorMsg}</p>}
        </div>
    )
}