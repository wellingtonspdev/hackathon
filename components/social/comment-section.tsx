'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Comentario } from '@/lib/types';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { AcademicBadge, UserRolePill } from './academic-badge';

interface CommentSectionProps {
  postId: string;
  onCommentAdded?: () => void;
}

export function CommentSection({ postId, onCommentAdded }: CommentSectionProps) {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchComments() {
      try {
        const res = await fetch(`/api/posts/${postId}/comments`);
        const data = await res.json();
        if (isMounted && data.success) {
          setComments(data.comments || []);
        }
      } catch (e) {
        console.error('Erro ao carregar comentários:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || submitting) return;

    setSubmitting(true);
    const content = newComment.trim();

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: currentUser.id,
          conteudo: content,
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => [...prev, data.comment]);
        setNewComment('');
        onCommentAdded?.();
      }
    } catch (err) {
      console.error('Erro ao postar comentário:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return 'agora';
      if (diffMin < 60) return `há ${diffMin} min`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `há ${diffHours}h`;
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch {
      return '';
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-[#E1E1E3]/80 flex flex-col gap-3">
      {/* Input de Novo Comentário */}
      {currentUser && (
        <form onSubmit={handleAddComment} className="flex items-center gap-2">
          {currentUser.foto_perfil ? (
            <img
              src={currentUser.foto_perfil}
              alt={currentUser.nome}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#B20000]/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.nome.charAt(0)}
            </div>
          )}

          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva uma resposta construtiva..."
            className="flex-1 text-xs sm:text-sm bg-[#F5F5F5] border border-[#E1E1E3] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B20000] focus:border-transparent text-[#171717] placeholder:text-[#666666]"
          />

          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="w-8 h-8 rounded-full bg-[#B20000] hover:bg-[#8F0000] disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
            aria-label="Enviar resposta"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </form>
      )}

      {/* Lista de Comentários */}
      {loading ? (
        <div className="flex items-center justify-center py-4 text-xs text-[#666666] gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#B20000]" />
          <span>Carregando comentários acadêmicos...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-3 text-xs text-[#666666]">
          Nenhuma resposta ainda. Seja o primeiro a interagir!
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F5F5F5]/60 border border-[#E1E1E3]/50 text-xs sm:text-sm"
            >
              {comment.autor.foto_perfil ? (
                <img
                  src={comment.autor.foto_perfil}
                  alt={comment.autor.nome}
                  className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {comment.autor.nome.charAt(0)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-xs text-[#171717]">
                    {comment.autor.nome}
                  </span>
                  <UserRolePill
                    role={comment.autor.tipo_usuario}
                    curso={comment.autor.curso}
                  />
                  <span className="text-[10px] text-[#666666]">
                    • {formatDate(comment.criado_em)}
                  </span>
                </div>

                <p className="text-xs text-[#171717] mt-1 whitespace-pre-wrap break-words">
                  {comment.conteudo}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
