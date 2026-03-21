import type { Subject } from '@/entities/subject'
import { computeCriticalPath } from './criticalPath'

export function computeAvailability(
  subjects: Subject[],
  completedIds: string[]
): Subject[] {
  const completedSet = new Set(completedIds)
  const criticalIds = new Set(computeCriticalPath(subjects))

  return subjects.map((subject) => {
    if (completedSet.has(subject.id)) {
      return { ...subject, status: 'completed' }
    }

    const prereqsMet = subject.prerequisites.every((id) => completedSet.has(id))

    if (!prereqsMet) {
      return { ...subject, status: 'blocked' }
    }

    if (criticalIds.has(subject.id)) {
      return { ...subject, status: 'critical' }
    }

    return { ...subject, status: 'available' }
  })
}