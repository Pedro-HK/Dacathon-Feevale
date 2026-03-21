import { create } from 'zustand'
import type { Curriculum, Course } from '@/entities/curriculum'
import type { Subject } from '@/entities/subject'

interface CurriculumStore {
  curriculum: Curriculum | null
  activeCourse: Course
  selectedSubject: Subject | null
  setCurriculum: (c: Curriculum) => void
  setActiveCourse: (course: Course) => void
  setSelectedSubject: (s: Subject | null) => void
  availableCourses: { id: Course; name: string }[]
  setAvailableCourses: (courses: { id: Course; name: string }[]) => void
}

export const useCurriculumStore = create<CurriculumStore>((set) => ({
  curriculum: null,
  activeCourse: 'CC',
  selectedSubject: null,
  setCurriculum: (curriculum) => set({ curriculum }),
  setActiveCourse: (activeCourse) => set({ activeCourse }),
  setSelectedSubject: (selectedSubject) => set({ selectedSubject }),
  availableCourses: [],
  setAvailableCourses: (availableCourses) => set({ availableCourses }),
}))