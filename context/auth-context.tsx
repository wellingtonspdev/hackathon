'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Usuario } from '@/lib/types';

import { MOCK_USERS } from '@/lib/mock-data';

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
      if (!res.ok) throw new Error('API não disponível');
      const data = await res.json();
      if (data.success && data.users.length > 0) {
        setAllUsers(data.users);
        const savedId = typeof window !== 'undefined' ? localStorage.getItem('agentec_user_id') : null;
        const selected = data.users.find((u: Usuario) => u.id === savedId) || data.users[0];
        setCurrentUser(selected);
        return;
      }
    } catch {
      // Fallback para mock em ambientes estáticos como GitHub Pages
      setAllUsers(MOCK_USERS);
      const savedId = typeof window !== 'undefined' ? localStorage.getItem('agentec_user_id') : null;
      const selected = MOCK_USERS.find((u: Usuario) => u.id === savedId) || MOCK_USERS[0];
      setCurrentUser(selected);
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
