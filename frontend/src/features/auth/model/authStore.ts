import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token:           null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: true }),
      logout:   ()      => set({ token: null, isAuthenticated: false }),
    }),
    { name: 'auth' }
  )
)