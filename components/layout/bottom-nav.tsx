'use client';

import React from 'react';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenComposer: () => void;
}

export function BottomNav({ activeTab, setActiveTab, onOpenComposer }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação Inferior Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E1E1E3] pb-[env(safe-area-inset-bottom,0px)] shadow-lg"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {/* Início / Feed */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'feed' ? 'text-[#B20000]' : 'text-[#666666] hover:text-[#171717]'
          }`}
          aria-label="Início"
        >
          <Home className="w-5 h-5" strokeWidth={activeTab === 'feed' ? 2.2 : 1.75} />
          <span className="text-[10px] font-medium mt-0.5">Início</span>
        </button>

        {/* Explorar */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'explore' ? 'text-[#B20000]' : 'text-[#666666] hover:text-[#171717]'
          }`}
          aria-label="Explorar"
        >
          <Compass className="w-5 h-5" strokeWidth={activeTab === 'explore' ? 2.2 : 1.75} />
          <span className="text-[10px] font-medium mt-0.5">Explorar</span>
        </button>

        {/* Botão Central de Publicação com Destaque Vermelho */}
        <button
          onClick={onOpenComposer}
          className="relative -top-3 w-12 h-12 rounded-full bg-[#B20000] hover:bg-[#8F0000] active:scale-95 text-white flex items-center justify-center shadow-md transition-transform focus:outline-none focus:ring-4 focus:ring-[#B20000]/30 cursor-pointer"
          aria-label="Nova Publicação"
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Notificações */}
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] rounded-lg transition-colors relative ${
            activeTab === 'notifications' ? 'text-[#B20000]' : 'text-[#666666] hover:text-[#171717]'
          }`}
          aria-label="Notificações"
        >
          <div className="relative">
            <Bell className="w-5 h-5" strokeWidth={activeTab === 'notifications' ? 2.2 : 1.75} />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#B20000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <span className="text-[10px] font-medium mt-0.5">Avisos</span>
        </button>

        {/* Perfil */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'profile' ? 'text-[#B20000]' : 'text-[#666666] hover:text-[#171717]'
          }`}
          aria-label="Perfil"
        >
          <User className="w-5 h-5" strokeWidth={activeTab === 'profile' ? 2.2 : 1.75} />
          <span className="text-[10px] font-medium mt-0.5">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
