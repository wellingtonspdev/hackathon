'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Usuario } from '@/lib/types';

interface AuthContextType {
  currentUser: Usuario | null;
  allUsers: Usuario[];
  switchUser: (userId: string) => void;
  isLoading: boolean;
  refreshUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [allUsers, setAllUsers] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success && data.users.length > 0) {
        setAllUsers(data.users);
        // Se ainda não tiver usuário salvo no localStorage, pega o primeiro (Ana Silva - aluna)
        const savedId = typeof window !== 'undefined' ? localStorage.getItem('agentec_user_id') : null;
        const selected = data.users.find((u: Usuario) => u.id === savedId) || data.users[0];
        setCurrentUser(selected);
      }
    } catch (e) {
      console.error('Falha ao carregar usuários:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const switchUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      if (typeof window !== 'undefined') {
        localStorage.setItem('agentec_user_id', found.id);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUser,
        isLoading,
        refreshUsers: fetchUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
