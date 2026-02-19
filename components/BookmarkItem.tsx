'use client'
import { supabase } from '@/lib/supabaseClient'
import { Trash2, ExternalLink } from 'lucide-react'
import { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function BookmarkItem({ bookmark }: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteBookmark = async () => {
    try {
      if (!bookmark?.id) {
        console.warn('Bookmark ID is missing. Cannot delete.')
        return
      }

      const { data, error } = await supabase.from('bookmarks').delete().eq('id', bookmark.id);
      // console.log("data", data)

      if (error) {
        console.error('Failed to delete bookmark:', error.message)
        return
      }

      if (!data) {
        console.warn('No bookmark deleted. It may have already been removed.')
        return
      }

      return;

    }
    catch (err) {
      console.error('Unexpected error while deleting bookmark:', err)
    }
  }
  return (
    <>
      <div className="group bg-white border border-zinc-200 rounded-3xl p-5 hover:shadow-2xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <span className="text-zinc-400 group-hover:text-blue-600 font-bold uppercase text-xs">
                {bookmark.url.replace('https://', '').charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {bookmark.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Saved on</span>
            <span className="text-xs text-zinc-600">{new Date(bookmark.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex gap-2">
            <a href={bookmark.url} target="_blank" className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-all">
              <ExternalLink className="w-4 h-4" />
            </a>
            <button onClick={()=>  setIsModalOpen(true)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all cursor-pointer">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteBookmark}
        title={bookmark.title}
      />
    </>
  );
}