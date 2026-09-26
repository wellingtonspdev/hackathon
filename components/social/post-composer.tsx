'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Send, Hash, AtSign, Sparkles, Loader2 } from 'lucide-react';
import { UserRolePill } from './academic-badge';
import { Post } from '@/lib/types';

interface PostComposerProps {
  onPostCreated?: (newPost: Post) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export function PostComposer({ onPostCreated, isModal = false, onClose }: PostComposerProps) {
  const { currentUser } = useAuth();
  const [conteudo, setConteudo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const MAX_CHARS = 500;
  const remaining = MAX_CHARS - conteudo.length;
  const isOverLimit = remaining < 0;
  const canSubmit = conteudo.trim().length > 0 && !isOverLimit && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !currentUser) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: currentUser.id,
          conteudo: conteudo.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.post) {
        setConteudo('');
        onPostCreated?.(data.post);
        if (isModal) {
          onClose?.();
        }
      } else {
        setErrorMsg(data.error || 'Erro ao publicar no feed.');
      }
    } catch (err: any) {
      setErrorMsg('Erro de conexão ao enviar a publicação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertTag = (tag: string) => {
    setConteudo((prev) => `${prev} ${tag} `.trimStart());
  };

  if (!currentUser) return null;

  return (
    <div
      className={`bg-white rounded-2xl border border-[#E1E1E3] p-4 shadow-xs transition-all ${
        isModal ? '' : 'mb-4'
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* User Info Header */}
        <div className="flex items-center gap-3">
          {currentUser.foto_perfil ? (
            <img
              src={currentUser.foto_perfil}
              alt={currentUser.nome}
              className="w-10 h-10 rounded-full object-cover border border-[#B20000]/30 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {currentUser.nome.charAt(0)}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-[#171717]">{currentUser.nome}</span>
              <UserRolePill role={currentUser.tipo_usuario} curso={currentUser.curso} />
            </div>
            <span className="text-xs text-[#666666]">Compartilhe com a comunidade Fatec</span>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="O que está acontecendo na sua Fatec hoje? Projetos, dúvidas, eventos..."
            rows={isModal ? 4 : 3}
            maxLength={MAX_CHARS + 50}
            className="w-full resize-none p-3 text-sm text-[#171717] bg-[#F5F5F5]/60 border border-[#E1E1E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B20000] focus:border-transparent placeholder:text-[#666666]/70 transition-all"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-[#B20000] font-medium bg-[#FFF1F1] px-3 py-1.5 rounded-lg border border-[#B20000]/20">
            {errorMsg}
          </p>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#E1E1E3]/70">
          {/* Quick Tags Helpers */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => insertTag('#Fatec')}
              className="px-2 py-1 text-xs font-medium rounded-lg text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1] transition-colors flex items-center gap-0.5"
              title="Adicionar hashtag #Fatec"
            >
              <Hash className="w-3 h-3" />
              Fatec
            </button>
            <button
              type="button"
              onClick={() => insertTag('#HackathonFatec')}
              className="hidden sm:flex px-2 py-1 text-xs font-medium rounded-lg text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1] transition-colors items-center gap-0.5"
            >
              <Hash className="w-3 h-3" />
              Hackathon
            </button>
            <button
              type="button"
              onClick={() => insertTag('#IniciaçãoCientifica')}
              className="hidden sm:flex px-2 py-1 text-xs font-medium rounded-lg text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1] transition-colors items-center gap-0.5"
            >
              <Hash className="w-3 h-3" />
              Pesquisa
            </button>
          </div>

          {/* Counter and Submit Button */}
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium tabular-nums ${
                isOverLimit
                  ? 'text-red-600 font-bold'
                  : remaining <= 50
                  ? 'text-amber-600'
                  : 'text-[#666666]'
              }`}
            >
              {remaining}
            </span>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#B20000] hover:bg-[#8F0000] disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
