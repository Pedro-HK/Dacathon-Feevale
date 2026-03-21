import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressStore {
  completedIds: string[]
  addCompleted: (id: string) => void
  removeCompleted: (id: string) => void
  toggleCompleted: (id: string) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedIds: [],
      addCompleted: (id) =>
        set({ completedIds: [...get().completedIds, id] }),
      removeCompleted: (id) =>
        set({ completedIds: get().completedIds.filter((c) => c !== id) }),
      toggleCompleted: (id) => {
        const { completedIds, addCompleted, removeCompleted } = get()
        completedIds.includes(id) ? removeCompleted(id) : addCompleted(id)
      },
    }),
    { name: 'course-progress' }
  )
)