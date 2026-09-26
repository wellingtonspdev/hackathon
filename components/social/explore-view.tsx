'use client';

import React, { useState } from 'react';
import { Search, Compass, BookOpen, Users, Sparkles, Hash } from 'lucide-react';
import { AcademicTrends } from './academic-trends';
import { WhoToFollow } from './who-to-follow';

interface ExploreViewProps {
  onSelectTag: (tag: string) => void;
}

export function ExploreView({ onSelectTag }: ExploreViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const communities = [
    {
      name: 'DSM - Desenvolvimento de Software',
      members: '3.4k membros',
      tag: '#DSM',
      description: 'Discussões técnicas, projetos em Next.js, Cloud, Mobile e IA.',
    },
    {
      name: 'Iniciação Científica & Artigos CPS',
      members: '1.2k membros',
      tag: '#IniciaçãoCientifica',
      description: 'Publicações científicas, bolsas de pesquisa e grupos de estudos.',
    },
    {
      name: 'Hackathon & Competições Fatec',
      members: '2.8k membros',
      tag: '#HackathonFatec',
      description: 'Formação de equipes para maratonas de programação e ideação.',
    },
    {
      name: 'Oportunidades & Estágios Tech',
      members: '4.1k membros',
      tag: '#VagasEstagio',
      description: 'Vagas exclusivas de empresas parceiras do Centro Paula Souza.',
    },
  ];

  const filteredCommunities = searchTerm
    ? communities.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : communities;

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto min-w-0 gap-4">
      {/* Search Input */}
      <div className="bg-white rounded-2xl border border-[#E1E1E3] p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por tópicos, hashtags (#DSM, #Hackathon) ou cursos..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F5] border border-[#E1E1E3] rounded-xl text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B20000] focus:border-transparent placeholder:text-[#666666]"
          />
        </div>
      </div>

      {/* Comunidades em Destaque */}
      <div className="bg-white rounded-2xl border border-[#E1E1E3] p-5 shadow-xs">
        <h2 className="font-semibold text-sm text-[#171717] mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#B20000]" />
          Comunidades Acadêmicas Oficiais
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCommunities.map((c) => (
            <div
              key={c.tag}
              onClick={() => onSelectTag(c.tag)}
              className="p-3.5 rounded-xl border border-[#E1E1E3] hover:border-[#B20000]/40 hover:bg-[#FFF1F1]/30 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#B20000]">{c.tag}</span>
                <h3 className="font-semibold text-xs text-[#171717] mt-1 line-clamp-1">{c.name}</h3>
                <p className="text-[11px] text-[#666666] mt-1 line-clamp-2">{c.description}</p>
              </div>
              <span className="text-[10px] text-stone-500 font-medium mt-3">{c.members}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bloco de tendências para mobile */}
      <div className="block lg:hidden">
        <AcademicTrends onTagClick={onSelectTag} />
      </div>
    </div>
  );
}
