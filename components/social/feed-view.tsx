'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { PostComposer } from './post-composer';
import { Sparkles, Users, RefreshCw, Filter, X } from 'lucide-react';

import { MOCK_POSTS } from '@/lib/mock-data';

interface FeedViewProps {
  onOpenComposerModal?: () => void;
  selectedTag?: string | null;
  onClearTag?: () => void;
}

export function FeedView({ onOpenComposerModal, selectedTag, onClearTag }: FeedViewProps) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = async (isManualRefresh = false) => {
    if (!currentUser) return;
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch(`/api/feed?tab=${activeTab}&userId=${currentUser.id}`);
      if (!res.ok) throw new Error('API não disponível');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
        return;
      }
    } catch {
      // Fallback para mock posts em modo estático / GitHub Pages
      if (activeTab === 'following') {
        setPosts(MOCK_POSTS.slice(0, 2));
      } else {
        setPosts(MOCK_POSTS);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [activeTab, currentUser?.id]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostDeleted = (deletedPostId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== deletedPostId));
  };

  // Filtra por hashtag selecionada se houver
  const filteredPosts = selectedTag
    ? posts.filter((p) => p.conteudo.toLowerCase().includes(selectedTag.toLowerCase()))
    : posts;

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto min-w-0">
      {/* Abas do Feed ("Para você" e "Seguindo") */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-x sm:border border-b border-[#E1E1E3] sm:rounded-2xl mb-3 shadow-xs">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-1">
            <button
              onClick={() => setActiveTab('for-you')}
              className={`flex-1 py-3.5 text-center text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === 'for-you' ? 'text-[#B20000]' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" strokeWidth={activeTab === 'for-you' ? 2.2 : 1.75} />
                <span>Para você</span>
              </div>
              {activeTab === 'for-you' && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#B20000] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-3.5 text-center text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === 'following'
                  ? 'text-[#B20000]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Users className="w-4 h-4" strokeWidth={activeTab === 'following' ? 2.2 : 1.75} />
                <span>Seguindo</span>
              </div>
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#B20000] rounded-full" />
              )}
            </button>
          </div>

          <button
            onClick={() => fetchFeed(true)}
            disabled={refreshing}
            className="p-2 text-[#666666] hover:text-[#B20000] rounded-lg hover:bg-[#FFF1F1] transition-colors cursor-pointer"
            title="Atualizar Feed"
            aria-label="Atualizar Feed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#B20000]' : ''}`} />
          </button>
        </div>

        {/* Filtro Ativo de Tag */}
        {selectedTag && (
          <div className="px-4 py-2 bg-[#FFF1F1] border-t border-[#B20000]/20 flex items-center justify-between text-xs">
            <span className="text-[#B20000] font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrando por: <strong>{selectedTag}</strong>
            </span>
            <button
              onClick={onClearTag}
              className="text-[#666666] hover:text-[#B20000] flex items-center gap-1 cursor-pointer"
            >
              <span>Limpar filtro</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Composer de Post embutido (Desktop e Telas Maiores) */}
      <div className="hidden sm:block">
        <PostComposer onPostCreated={handlePostCreated} />
      </div>

      {/* Lista de Publicações */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E1E1E3] p-5 shadow-xs animate-pulse flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-stone-200" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-32 bg-stone-200 rounded" />
                  <div className="h-3 w-20 bg-stone-100 rounded" />
                </div>
              </div>
              <div className="h-4 w-full bg-stone-100 rounded" />
              <div className="h-4 w-5/6 bg-stone-100 rounded" />
              <div className="h-8 w-1/3 bg-stone-100 rounded-lg mt-2" />
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E1E1E3] p-8 text-center shadow-xs flex flex-col items-center justify-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src="/brand/agentec/03_agentec_simbolo_jacare_transparente.png"
              alt="Mascote AgenTEC"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <div className="max-w-md">
            <h3 className="font-semibold text-base text-[#171717]">
              {activeTab === 'following'
                ? 'Nenhuma publicação de quem você segue ainda'
                : 'Ainda não há posts por aqui'}
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              {activeTab === 'following'
                ? 'Siga mais colegas, professores ou empresas da Fatec para ver suas publicações aqui!'
                : 'Seja o primeiro a compartilhar um projeto, tirar uma dúvida ou publicar novidades acadêmicas!'}
            </p>
          </div>
          <button
            onClick={onOpenComposerModal}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#B20000] hover:bg-[#8F0000] transition-colors cursor-pointer shadow-xs"
          >
            Publicar no Feed
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
