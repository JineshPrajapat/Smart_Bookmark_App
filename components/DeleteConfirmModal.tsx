'use client'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/20  transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-sm rounded-4xl p-8 shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-black text-zinc-900 leading-tight mb-2">
          Delete Bookmark?
        </h3>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          Are you sure you want to remove <span className="font-bold text-zinc-800">"{title}"</span>? This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl text-sm font-bold bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-6 py-3 rounded-xl text-sm font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}