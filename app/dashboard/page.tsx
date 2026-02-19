import { redirect } from 'next/navigation'
import AddBookmarkForm from '@/components/AddBookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { getServerUser } from '@/lib/getServerUser'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard | Smart Bookmark App",
  description: "Keep your links organized",
};

export default async function Dashboard() {
  const user = await getServerUser()
  if (!user) redirect('/')

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-violet-100/40 blur-[120px] pointer-events-none -z-10" />
      
      {/* Header */}
      <header className="pt-10 mb-8">
        <h2 className="text-4xl font-extrabold text-slate-900  tracking-tight">My Bookmarks</h2>
        <p className="text-slate-500 mt-2 text-lg">Your curated corner of the internet.</p>
      </header>

      {/* Add boookmark */}
      <div className="sticky top-17 z-40 mb-10">
        <div className="bg-white/90 backdrop-blur-2xl p-2 rounded-2xl sm:rounded-3xl md:rounded-full border hover:border-zinc-400 border-zinc-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
          <AddBookmarkForm />
        </div>
      </div>
      
      {/* bookmark list */}
      <div className="relative">
        <BookmarkList userId={user.id} />
      </div>
    </div>
  )
}