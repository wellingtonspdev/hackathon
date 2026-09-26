'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { AcademicBadge, UserRolePill } from './academic-badge';
import { GraduationCap, Mail, Calendar, Award, BookOpen, Users } from 'lucide-react';

export function ProfileView() {
  const { currentUser } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadUserPosts() {
      if (!currentUser) return;
      try {
        const res = await fetch(`/api/feed?tab=for-you&userId=${currentUser.id}`);
        const data = await res.json();
        if (isMounted && data.success) {
          // Filtra posts deste usuário
          const myPosts = (data.posts as Post[]).filter((p) => p.usuario_id === currentUser.id);
          setUserPosts(myPosts);
        }
      } catch (err) {
        console.error('Erro ao buscar posts do perfil:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadUserPosts();
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto min-w-0 gap-4">
      {/* Profile Card Header */}
      <div className="bg-white rounded-2xl border border-[#E1E1E3] overflow-hidden shadow-xs">
        {/* Banner institucional Fatec */}
        <div className="h-28 bg-gradient-to-r from-[#B20000] via-[#8F0000] to-stone-900 relative">
          <div className="absolute right-4 bottom-2 text-white/20 font-bold text-3xl select-none">
            AgenTEC
          </div>
        </div>

        <div className="px-5 pb-5 pt-0 relative">
          {/* Avatar sobreposto ao banner */}
          <div className="flex items-end justify-between -mt-12 mb-3">
            {currentUser.foto_perfil ? (
              <img
                src={currentUser.foto_perfil}
                alt={currentUser.nome}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-3xl border-4 border-white shadow-md">
                {currentUser.nome.charAt(0)}
              </div>
            )}

            <div className="flex items-center gap-2">
              <UserRolePill role={currentUser.tipo_usuario} curso={currentUser.curso} />
            </div>
          </div>

          {/* Nome e Bio */}
          <div>
            <h1 className="text-xl font-bold text-[#171717]">{currentUser.nome}</h1>
            <p className="text-xs text-[#666666] flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {currentUser.email}
            </p>

            {currentUser.curso && (
              <p className="text-xs font-medium text-[#171717] flex items-center gap-1.5 mt-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B20000]" />
                {currentUser.curso}
              </p>
            )}

            {currentUser.bio && (
              <p className="text-sm text-[#171717] mt-3 leading-relaxed bg-[#F5F5F5] p-3 rounded-xl border border-[#E1E1E3]">
                {currentUser.bio}
              </p>
            )}
          </div>

          {/* Badges de Conquista */}
          {currentUser.badges && currentUser.badges.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#E1E1E3]">
              <h2 className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B20000]" />
                Badges & Honras Acadêmicas
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((b) => (
                  <div key={b.id} className="flex flex-col">
                    <AcademicBadge badge={b} size="md" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Publicações do Usuário */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-[#171717] px-1">
          Minhas Publicações no Feed ({userPosts.length})
        </h2>

        {loading ? (
          <div className="bg-white rounded-2xl border border-[#E1E1E3] p-6 text-center text-xs text-[#666666]">
            Carregando publicações do perfil...
          </div>
        ) : userPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E1E1E3] p-8 text-center text-xs text-[#666666]">
            Você ainda não publicou nada no feed da AgenTEC.
          </div>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostDeleted={(id) => setUserPosts((prev) => prev.filter((p) => p.id !== id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
