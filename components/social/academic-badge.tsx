import React from 'react';
import { Badge as BadgeType, TipoUsuario } from '@/lib/types';
import { Award, GraduationCap, Building2, ShieldCheck, Sparkles } from 'lucide-react';

interface AcademicBadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md';
}

export function AcademicBadge({ badge, size = 'sm' }: AcademicBadgeProps) {
  const isSm = size === 'sm';

  return (
    <span
      title={badge.descricao || badge.nome}
      className={`inline-flex items-center gap-1 font-medium rounded-full transition-colors cursor-default ${
        isSm ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      }`}
      style={{
        backgroundColor: `${badge.cor_icone}15`,
        color: badge.cor_icone,
        border: `1px solid ${badge.cor_icone}30`,
      }}
    >
      <Award className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={2} />
      <span>{badge.nome}</span>
    </span>
  );
}

export function UserRolePill({
  role,
  curso,
}: {
  role: TipoUsuario;
  curso?: string | null;
}) {
  switch (role) {
    case 'professor':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-[#FFF1F1] text-[#B20000] border border-[#B20000]/20">
          <GraduationCap className="w-3 h-3" strokeWidth={2} />
          Professor(a) Fatec
        </span>
      );
    case 'empresa':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          <Building2 className="w-3 h-3" strokeWidth={2} />
          Parceiro CPS
        </span>
      );
    case 'master':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <ShieldCheck className="w-3 h-3" strokeWidth={2} />
          Administração
        </span>
      );
    case 'aluno':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-stone-100 text-stone-700 border border-stone-200">
          <Sparkles className="w-3 h-3 text-[#B20000]" strokeWidth={2} />
          {curso || 'Aluno Fatec'}
        </span>
      );
  }
}
