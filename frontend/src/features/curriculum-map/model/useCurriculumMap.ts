import { useMemo } from 'react'
import { useCurriculumStore } from './curriculumStore'
import { useProgressStore } from './progressStore'
import { computeAvailability } from '../lib/availabilityCalc'
import type { Subject, Trail } from '@/entities/subject'

export type SubjectsByTrailAndSemester = Record<Trail, Record<number, Subject[]>>

export function useCurriculumMap() {
  const { curriculum, selectedSubject, setSelectedSubject, activeCourse, setActiveCourse } =
    useCurriculumStore()
  const { completedIds, toggleCompleted } = useProgressStore()

  const subjects = useMemo(() => {
    if (!curriculum) return []
    return computeAvailability(curriculum.subjects, completedIds)
  }, [curriculum, completedIds])

  const subjectsByTrailAndSemester = useMemo(() => {
    return subjects.reduce<SubjectsByTrailAndSemester>((acc, subject) => {
      if (!acc[subject.trail]) acc[subject.trail] = {}
      if (!acc[subject.trail][subject.semester]) acc[subject.trail][subject.semester] = []
      acc[subject.trail][subject.semester].push(subject)
      return acc
    }, {} as SubjectsByTrailAndSemester)
  }, [subjects])

  const totalSemesters = useMemo(() => {
    if (!subjects.length) return 0
    return Math.max(...subjects.map((s) => s.semester))
  }, [subjects])

  return {
    subjects,
    subjectsByTrailAndSemester,
    totalSemesters,
    selectedSubject,
    selectSubject: setSelectedSubject,
    toggleCompleted,
    activeCourse,
    setActiveCourse,
  }
}