'use client';

import React, { useState } from 'react';
import { Post } from '@/lib/types';
import { useAuth } from '@/context/auth-context';
import {
  Heart,
  MessageCircle,
  Share2,
  Trash2,
  Check,
} from 'lucide-react';
import { AcademicBadge, UserRolePill } from './academic-badge';
import { CommentSection } from './comment-section';

interface PostCardProps {
  post: Post;
  onPostDeleted?: (postId: string) => void;
}

export function PostCard({ post, onPostDeleted }: PostCardProps) {
  const { currentUser } = useAuth();
  const [curtido, setCurtido] = useState(post.curtido_pelo_usuario);
  const [totalCurtidas, setTotalCurtidas] = useState(post.total_curtidas);
  const [totalComentarios, setTotalComentarios] = useState(post.total_comentarios);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAuthor = currentUser?.id === post.usuario_id;

  const handleLike = async () => {
    if (!currentUser || isLiking) return;

    // Atualização otimista imediata
    const novoStatus = !curtido;
    setCurtido(novoStatus);
    setTotalCurtidas((prev) => (novoStatus ? prev + 1 : Math.max(0, prev - 1)));
    setIsLiking(true);

    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: currentUser.id }),
      });
      const data = await res.json();
      if (data.success) {
        setCurtido(data.curtido);
        setTotalCurtidas(data.total_curtidas);
      } else {
        // Reverte em caso de erro
        setCurtido(!novoStatus);
        setTotalCurtidas((prev) => (!novoStatus ? prev + 1 : Math.max(0, prev - 1)));
      }
    } catch {
      setCurtido(!novoStatus);
      setTotalCurtidas((prev) => (!novoStatus ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!currentUser || !isAuthor || isDeleting) return;
    if (!confirm('Deseja realmente excluir esta publicação?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}?userId=${currentUser.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        onPostDeleted?.(post.id);
      } else {
        alert(data.error || 'Erro ao excluir a publicação.');
      }
    } catch {
      alert('Erro de conexão ao excluir a publicação.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return 'agora';
      if (diffMin < 60) return `há ${diffMin}m`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `há ${diffHours}h`;
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch {
      return '';
    }
  };

  // Destaca hashtags e menções
  const renderFormattedContent = (text: string) => {
    const words = text.split(/(\s+)/);
    return words.map((word, i) => {
      if (word.startsWith('#')) {
        return (
          <span key={i} className="text-[#B20000] font-medium hover:underline cursor-pointer">
            {word}
          </span>
        );
      }
      if (word.startsWith('@')) {
        return (
          <span key={i} className="text-[#B20000] font-medium hover:underline cursor-pointer">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <article
      id={`post-${post.id}`}
      className="bg-white rounded-2xl border border-[#E1E1E3] p-4 sm:p-5 shadow-xs transition-all hover:border-[#E1E1E3]/90 relative"
    >
      {/* Cabeçalho do Autor */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {post.autor.foto_perfil ? (
            <img
              src={post.autor.foto_perfil}
              alt={post.autor.nome}
              className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#B20000]/20"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-base shrink-0">
              {post.autor.nome.charAt(0)}
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm sm:text-base text-[#171717]">
                {post.autor.nome}
              </span>
              <UserRolePill role={post.autor.tipo_usuario} curso={post.autor.curso} />
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-[#666666]">{formatDate(post.criado_em)}</span>
              {post.autor.curso && (
                <>
                  <span className="text-xs text-[#666666]">•</span>
                  <span className="text-xs text-[#666666] line-clamp-1">{post.autor.curso}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ação de Excluir (Autor) */}
        {isAuthor && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 rounded-lg text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1] transition-colors cursor-pointer"
            title="Excluir minha publicação"
            aria-label="Excluir publicação"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Badges de Conquista Acadêmica do Autor */}
      {post.autor.badges && post.autor.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5 pl-14">
          {post.autor.badges.map((badge) => (
            <AcademicBadge key={badge.id} badge={badge} size="sm" />
          ))}
        </div>
      )}

      {/* Corpo da Publicação */}
      <div className="mt-3 pl-0 sm:pl-14 text-sm sm:text-base text-[#171717] leading-relaxed whitespace-pre-wrap break-words">
        {renderFormattedContent(post.conteudo)}
      </div>

      {/* Barra de Ações do Post */}
      <div className="mt-4 pt-3 border-t border-[#E1E1E3]/70 pl-0 sm:pl-14 flex items-center justify-between text-xs sm:text-sm">
        {/* Curtir */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-all cursor-pointer ${
            curtido
              ? 'text-[#B20000] font-semibold bg-[#FFF1F1]'
              : 'text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1]'
          }`}
          aria-label={curtido ? 'Descurtir' : 'Curtir'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              curtido ? 'fill-[#B20000] text-[#B20000]' : 'text-[#666666]'
            }`}
            strokeWidth={curtido ? 2 : 1.75}
          />
          <span className="tabular-nums">{totalCurtidas}</span>
        </button>

        {/* Comentários */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-all cursor-pointer ${
            showComments
              ? 'text-[#B20000] font-semibold bg-[#FFF1F1]'
              : 'text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1]'
          }`}
          aria-label="Comentários"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          <span className="tabular-nums">{totalComentarios}</span>
        </button>

        {/* Compartilhar */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-[#666666] hover:text-[#B20000] hover:bg-[#FFF1F1] transition-all cursor-pointer"
          title="Copiar link da publicação"
          aria-label="Compartilhar"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" strokeWidth={1.75} />
              <span>Compartilhar</span>
            </>
          )}
        </button>
      </div>

      {/* Gaveta de Comentários */}
      {showComments && (
        <CommentSection
          postId={post.id}
          onCommentAdded={() => setTotalComentarios((c) => c + 1)}
        />
      )}
    </article>
  );
}
