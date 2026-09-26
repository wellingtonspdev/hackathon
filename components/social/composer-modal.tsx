'use client';

import React from 'react';
import { X } from 'lucide-react';
import { PostComposer } from './post-composer';
import { Post } from '@/lib/types';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

export function ComposerModal({ isOpen, onClose, onPostCreated }: ComposerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl border border-[#E1E1E3] shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E1E1E3]">
          <h3 id="modal-title" className="font-semibold text-sm text-[#171717]">
            Nova Publicação Acadêmica
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#666666] hover:text-[#171717] hover:bg-stone-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Composer */}
        <div className="p-3">
          <PostComposer isModal onClose={onClose} onPostCreated={onPostCreated} />
        </div>
      </div>
    </div>
  );
}
