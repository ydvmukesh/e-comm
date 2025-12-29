import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  authModalOpen: boolean
  setAuthModalOpen: (open: boolean) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      authModalOpen: false,

      setAuthModalOpen: (open) => {
        set({ authModalOpen: open })
      },

      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
        }

        set({
          user: mockUser,
          isAuthenticated: true,
          authModalOpen: false,
        })
      },

      signup: async (email, password, name) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
        }

        set({
          user: mockUser,
          isAuthenticated: true,
          authModalOpen: false,
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          authModalOpen: false,
        })
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          })
        }
      },
    }),
    {
      name: 'elegance-auth-storage',
    }
  )
)
