import type { Subject } from '@/entities/subject'

export function computeCriticalPath(subjects: Subject[]): string[] {
  const subjectMap = new Map(subjects.map((s) => [s.id, s]))
  const depths = new Map<string, number>()

  function getDepth(id: string): number {
    if (depths.has(id)) return depths.get(id)!
    const subject = subjectMap.get(id)
    if (!subject || subject.prerequisites.length === 0) {
      depths.set(id, 0)
      return 0
    }
    const depth = 1 + Math.max(...subject.prerequisites.map(getDepth))
    depths.set(id, depth)
    return depth
  }

  subjects.forEach((s) => getDepth(s.id))

  const maxDepth = Math.max(...depths.values())
  return subjects
    .filter((s) => depths.get(s.id) === maxDepth)
    .map((s) => s.id)
}