import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'signup' | 'forgot-password' | 'reset-password';
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  openAuthModal: (view?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: 'login' | 'signup' | 'forgot-password' | 'reset-password') => void;
}

// Mock user for development
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  phone: '+1234567890',
  addresses: [],
  createdAt: new Date(),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authModalView: 'login',

      login: async (email: string, password: string) => {
        // Mock login - in real app, call backend API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          user: { ...mockUser, email },
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
      },

      signup: async (name: string, email: string, password: string) => {
        // Mock signup - in real app, call backend API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          user: { ...mockUser, name, email },
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      openAuthModal: (view = 'login') => {
        set({
          isAuthModalOpen: true,
          authModalView: view,
        });
      },

      closeAuthModal: () => {
        set({
          isAuthModalOpen: false,
        });
      },

      setAuthModalView: (view) => {
        set({ authModalView: view });
      },
    }),
    {
      name: 'auth-storage',
      partiallyPersist: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
