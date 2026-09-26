'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { SuggestionUser } from '@/lib/types';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';
import { AcademicBadge, UserRolePill } from './academic-badge';

export function WhoToFollow() {
  const { currentUser } = useAuth();
  const [suggestions, setSuggestions] = useState<SuggestionUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadSuggestions() {
      if (!currentUser) return;
      try {
        const res = await fetch(`/api/users/suggestions?userId=${currentUser.id}`);
        const data = await res.json();
        if (isMounted && data.success) {
          setSuggestions(data.suggestions || []);
        }
      } catch (e) {
        console.error('Erro ao buscar sugestões:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadSuggestions();
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const handleToggleFollow = async (targetUser: SuggestionUser) => {
    if (!currentUser || processingId) return;

    setProcessingId(targetUser.id);
    const novoStatus = !targetUser.seguindo;

    // Atualização otimista
    setSuggestions((prev) =>
      prev.map((u) => (u.id === targetUser.id ? { ...u, seguindo: novoStatus } : u))
    );

    try {
      const res = await fetch('/api/users/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seguidorId: currentUser.id,
          seguidoId: targetUser.id,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        // Reverte
        setSuggestions((prev) =>
          prev.map((u) => (u.id === targetUser.id ? { ...u, seguindo: !novoStatus } : u))
        );
      }
    } catch {
      setSuggestions((prev) =>
        prev.map((u) => (u.id === targetUser.id ? { ...u, seguindo: !novoStatus } : u))
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E1E1E3] p-4 shadow-xs">
      <h2 className="font-semibold text-sm text-[#171717] mb-3 flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-[#B20000]" />
        Quem seguir na Fatec
      </h2>

      {loading ? (
        <div className="py-4 flex items-center justify-center text-xs text-[#666666] gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#B20000]" />
          <span>Carregando conexões...</span>
        </div>
      ) : suggestions.length === 0 ? (
        <p className="text-xs text-[#666666] py-2">
          Você já segue os principais perfis sugeridos da Fatec!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.foto_perfil ? (
                  <img
                    src={user.foto_perfil}
                    alt={user.nome}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#B20000]/20"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#B20000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {user.nome.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-xs text-[#171717] truncate">{user.nome}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <UserRolePill role={user.tipo_usuario} curso={user.curso} />
                  </div>
                </div>
              </div>

              {/* Botão Seguir / Seguindo */}
              <button
                onClick={() => handleToggleFollow(user)}
                disabled={processingId === user.id}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  user.seguindo
                    ? 'bg-[#FFF1F1] text-[#B20000] border border-[#B20000]/30 hover:bg-red-100'
                    : 'bg-[#B20000] text-white hover:bg-[#8F0000]'
                }`}
              >
                {user.seguindo ? 'Seguindo' : 'Seguir'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
