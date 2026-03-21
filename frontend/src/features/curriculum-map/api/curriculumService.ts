import type { Curriculum, Course } from '@/entities/curriculum'
import { fromRawList, type RawSubject } from '@/entities/subject'
import siData from '@/shared/data/si.json'
import ccData from '@/shared/data/cc.json'

const MOCK_DATA: Record<string, RawSubject[]> = {
  SI: siData as RawSubject[],
  CC: ccData as RawSubject[],
}

const COURSE_NAMES: Record<string, string> = {
  SI: 'Sistemas de Informação',
  CC: 'Ciência da Computação',
}

export const curriculumService = {
  listCourses: async (): Promise<{ id: Course; name: string }[]> => {
    await new Promise((r) => setTimeout(r, 100))
    return Object.keys(MOCK_DATA).map((id) => ({ id: id as Course, name: COURSE_NAMES[id] ?? id }))
  },

  getCurriculum: async (course: Course): Promise<Curriculum> => {
    await new Promise((r) => setTimeout(r, 150))
    return {
      id:       course,
      name:     COURSE_NAMES[course] ?? course,
      course,
      subjects: fromRawList(MOCK_DATA[course] ?? []),
    }
  },
}