'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import {
  Home,
  Compass,
  Bell,
  User,
  PenSquare,
  GraduationCap,
  Sparkles,
  Award,
} from 'lucide-react';
import { AcademicBadge } from '@/components/social/academic-badge';

interface SidebarProps {
  onOpenComposer?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function Sidebar({ onOpenComposer, activeTab = 'feed', setActiveTab }: SidebarProps) {
  const { currentUser } = useAuth();

  const navItems = [
    { id: 'feed', label: 'Início / Feed', icon: Home },
    { id: 'explore', label: 'Explorar Fatec', icon: Compass },
    { id: 'notifications', label: 'Notificações', icon: Bell, badge: '3' },
    { id: 'profile', label: 'Meu Perfil', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] sticky top-20 h-[calc(100vh-5.5rem)] justify-between pr-4 select-none">
      <div className="flex flex-col gap-6">
        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5" aria-label="Navegação Principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab?.(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                  isActive
                    ? 'bg-[#FFF1F1] text-[#B20000] font-semibold border-l-4 border-[#B20000]'
                    : 'text-[#171717] hover:bg-stone-100 hover:text-[#B20000]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-[#B20000]' : 'text-[#666666]'}`}
                  strokeWidth={isActive ? 2.2 : 1.75}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#B20000] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button "Publicar" */}
        <button
          onClick={onOpenComposer}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-[#B20000] hover:bg-[#8F0000] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B20000] focus:ring-offset-2 cursor-pointer"
        >
          <PenSquare className="w-4 h-4" strokeWidth={2} />
          <span>Publicar no Feed</span>
        </button>
      </div>

      {/* User Card & Institutional Footer */}
      <div className="flex flex-col gap-4 border-t border-[#E1E1E3] pt-4">
        {currentUser && (
          <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-[#E1E1E3] shadow-xs">
            <div className="flex items-center gap-2.5">
              {currentUser.foto_perfil ? (
                <img
                  src={currentUser.foto_perfil}
                  alt={currentUser.nome}
                  className="w-10 h-10 rounded-full object-cover border border-[#B20000]/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-sm">
                  {currentUser.nome.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#171717] truncate">{currentUser.nome}</p>
                <p className="text-xs text-[#666666] truncate">{currentUser.email}</p>
              </div>
            </div>

            {currentUser.badges && currentUser.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {currentUser.badges.slice(0, 2).map((b) => (
                  <AcademicBadge key={b.id} badge={b} size="sm" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CPS Institutional Footer */}
        <div className="flex items-center justify-between px-2 text-[11px] text-[#666666]">
          <span>Centro Paula Souza</span>
          <div className="h-5 w-16 relative">
            <Image
              src="/brand/cps/cps_logo_cor.png"
              alt="Centro Paula Souza"
              width={64}
              height={20}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
