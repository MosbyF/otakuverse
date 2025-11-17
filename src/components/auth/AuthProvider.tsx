'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { LoginDialog } from './LoginDialog';
import { useUser } from '@/firebase';

interface AuthContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isUserLoading } = useUser();

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const value = useMemo(
    () => ({
      isLoginOpen,
      openLogin,
      closeLogin,
      isAuthenticated: !!user,
      isAuthLoading: isUserLoading,
    }),
    [isLoginOpen, user, isUserLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginDialog isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
