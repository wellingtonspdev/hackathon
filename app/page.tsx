'use client';

import React, { useState } from 'react';
import { AppHeader } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FeedView } from '@/components/social/feed-view';
import { ProfileView } from '@/components/social/profile-view';
import { ExploreView } from '@/components/social/explore-view';
import { NotificationsView } from '@/components/social/notifications-view';
import { WhoToFollow } from '@/components/social/who-to-follow';
import { AcademicTrends } from '@/components/social/academic-trends';
import { ComposerModal } from '@/components/social/composer-modal';
import { Post } from '@/lib/types';

export default function SocialNetworkPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [isComposerModalOpen, setIsComposerModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setActiveTab('feed');
  };

  const handlePostCreated = (post: Post) => {
    // If modal was used, close and refresh
    setIsComposerModalOpen(false);
    setSelectedTag(null);
    setActiveTab('feed');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col text-[#171717]">
      {/* Header Institucional Fixo */}
      <AppHeader />

      {/* Container Principal em 3 Colunas */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 pt-4 pb-20 md:pb-8 flex justify-center gap-6">
        {/* Coluna 1: Sidebar Esquerda (Navegação Desktop) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'feed') setSelectedTag(null);
          }}
          onOpenComposer={() => setIsComposerModalOpen(true)}
        />

        {/* Coluna 2: Conteúdo Central (Feed / Telas) */}
        <section className="flex-1 max-w-[720px] min-w-0">
          {activeTab === 'feed' && (
            <FeedView
              selectedTag={selectedTag}
              onClearTag={() => setSelectedTag(null)}
              onOpenComposerModal={() => setIsComposerModalOpen(true)}
            />
          )}

          {activeTab === 'profile' && <ProfileView />}

          {activeTab === 'explore' && <ExploreView onSelectTag={handleTagClick} />}

          {activeTab === 'notifications' && <NotificationsView />}
        </section>

        {/* Coluna 3: Lateral Direita Contextual (Desktop >= 1024px) */}
        <aside className="hidden lg:flex flex-col w-[320px] sticky top-20 h-[calc(100vh-5.5rem)] gap-4 select-none">
          <WhoToFollow />
          <AcademicTrends onTagClick={handleTagClick} />
        </aside>
      </main>

      {/* Navegação Inferior Mobile */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'feed') setSelectedTag(null);
        }}
        onOpenComposer={() => setIsComposerModalOpen(true)}
      />

      {/* Modal de Publicação Flutuante */}
      <ComposerModal
        isOpen={isComposerModalOpen}
        onClose={() => setIsComposerModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
