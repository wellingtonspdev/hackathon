'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { UserCheck, Sparkles, ChevronDown } from 'lucide-react';

export function AppHeader() {
  const { currentUser, allUsers, switchUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E1E1E3] transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo Oficial */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-36 sm:w-44 flex items-center">
            <Image
              src="/brand/agentec/02_agentec_logo_principal_transparente.png"
              alt="AgenTEC - Conecta a Fatec."
              width={176}
              height={40}
              priority
              className="object-contain"
            />
          </div>
          <span className="hidden md:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-[#FFF1F1] text-[#B20000] border border-[#B20000]/20">
            Fatec / CPS
          </span>
        </div>

        {/* Profile / Demo Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 bg-[#F5F5F5] border border-[#E1E1E3] rounded-full pl-2 pr-3 py-1">
            {currentUser?.foto_perfil ? (
              <img
                src={currentUser.foto_perfil}
                alt={currentUser.nome}
                className="w-7 h-7 rounded-full object-cover border border-[#B20000]/30"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-xs">
                {currentUser?.nome?.charAt(0) || 'U'}
              </div>
            )}
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#171717] line-clamp-1 max-w-[110px] sm:max-w-[150px]">
                {currentUser?.nome || 'Carregando...'}
              </span>
              <span className="text-[10px] text-[#666666] capitalize">
                {currentUser?.tipo_usuario || 'Usuário'}
              </span>
            </div>

            {/* User switcher selector */}
            <div className="relative group ml-1">
              <select
                aria-label="Alternar perfil ativo para teste"
                value={currentUser?.id || ''}
                onChange={(e) => switchUser(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              >
                {allUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome} ({u.tipo_usuario})
                  </option>
                ))}
              </select>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E1E1E3] text-[#666666] pointer-events-none group-hover:border-[#B20000] group-hover:text-[#B20000] transition-colors">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
