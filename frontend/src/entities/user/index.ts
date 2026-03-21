import { create } from 'zustand'
import type { Course } from '../curriculum'

export interface User {
  id: string
  name: string
  enrollment: string
  email: string
  course: Course
}

interface UserStore {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}))