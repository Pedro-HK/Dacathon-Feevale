import type { Subject } from '../subject'

export type Course = 'CC' | 'SI'

export interface Curriculum {
  id: string
  name: string
  course: Course
  subjects: Subject[]
}