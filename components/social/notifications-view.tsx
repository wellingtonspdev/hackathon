'use client';

import React from 'react';
import { Heart, MessageCircle, UserPlus, Award } from 'lucide-react';

export function NotificationsView() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      icon: Heart,
      iconColor: 'text-[#B20000]',
      title: 'Prof. Carlos Mendes curtiu sua publicação sobre a AgenTEC.',
      time: 'há 10 min',
      unread: true,
    },
    {
      id: 2,
      type: 'comment',
      icon: MessageCircle,
      iconColor: 'text-blue-600',
      title: 'Lucas Oliveira respondeu ao seu comentário no post do Hackathon.',
      time: 'há 45 min',
      unread: true,
    },
    {
      id: 3,
      type: 'badge',
      icon: Award,
      iconColor: 'text-amber-500',
      title: 'Você recebeu o badge "Campeão Hackathon" atribuído pela Comissão AgenTEC.',
      time: 'há 2 horas',
      unread: true,
    },
    {
      id: 4,
      type: 'follow',
      icon: UserPlus,
      iconColor: 'text-emerald-600',
      title: 'TechLab Inovação CPS começou a seguir você.',
      time: 'ontem',
      unread: false,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto min-w-0 bg-white rounded-2xl border border-[#E1E1E3] p-5 shadow-xs">
      <h2 className="font-semibold text-base text-[#171717] mb-4">Notificações Acadêmicas</h2>

      <div className="flex flex-col divide-y divide-[#E1E1E3]/70">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`py-3.5 px-2 flex items-start gap-3 rounded-xl transition-colors ${
                item.unread ? 'bg-[#FFF1F1]/40' : 'hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="p-2 rounded-full bg-white border border-[#E1E1E3] shadow-xs shrink-0">
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-[#171717] font-medium leading-snug">
                  {item.title}
                </p>
                <span className="text-[11px] text-[#666666] mt-0.5 block">{item.time}</span>
              </div>

              {item.unread && (
                <div className="w-2 h-2 rounded-full bg-[#B20000] shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
