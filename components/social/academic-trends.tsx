import React from 'react';
import { TrendingUp, Sparkles, Award } from 'lucide-react';

export function AcademicTrends({ onTagClick }: { onTagClick?: (tag: string) => void }) {
  const trends = [
    { tag: '#HackathonFatec', category: 'Inovação & Maratona', posts: '1.4k posts' },
    { tag: '#DSM', category: 'Curso de DSM', posts: '890 posts' },
    { tag: '#IniciaçãoCientifica', category: 'Pesquisa CPS', posts: '620 posts' },
    { tag: '#VagasEstagio', category: 'Carreiras', posts: '1.1k posts' },
    { tag: '#TCC2026', category: 'Graduação', posts: '430 posts' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E1E1E3] p-4 shadow-xs">
      <h2 className="font-semibold text-sm text-[#171717] mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#B20000]" />
        Tópicos Acadêmicos em Alta
      </h2>

      <div className="flex flex-col divide-y divide-[#E1E1E3]/60">
        {trends.map((item) => (
          <button
            key={item.tag}
            onClick={() => onTagClick?.(item.tag)}
            className="py-2.5 px-1 flex flex-col text-left hover:bg-[#F5F5F5] rounded-lg transition-colors cursor-pointer group"
          >
            <span className="text-[11px] text-[#666666] font-medium">{item.category}</span>
            <span className="text-sm font-semibold text-[#171717] group-hover:text-[#B20000] transition-colors">
              {item.tag}
            </span>
            <span className="text-[11px] text-[#666666]">{item.posts}</span>
          </button>
        ))}
      </div>

      {/* Mini institucional banner */}
      <div className="mt-3 p-2.5 rounded-xl bg-[#FFF1F1] border border-[#B20000]/15 flex items-start gap-2 text-xs">
        <Sparkles className="w-4 h-4 text-[#B20000] shrink-0 mt-0.5" />
        <p className="text-[#171717]">
          Participe das discussões e compartilhe seus projetos com estudantes de todas as Fatecs de SP!
        </p>
      </div>
    </div>
  );
}
