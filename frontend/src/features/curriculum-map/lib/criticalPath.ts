import type { Subject } from '@/entities/subject'

// criticalPath.ts — versão corrigida
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

  // encontra o nó mais profundo
  const maxDepth = Math.max(...depths.values())
  const deepestId = subjects.find((s) => depths.get(s.id) === maxDepth)?.id
  if (!deepestId) return []

  // sobe a cadeia de volta até a raiz
  function getChain(id: string): string[] {
    const subject = subjectMap.get(id)
    if (!subject || subject.prerequisites.length === 0) return [id]
    const deepestPrereq = subject.prerequisites
      .sort((a, b) => (depths.get(b) ?? 0) - (depths.get(a) ?? 0))[0]
    return [...getChain(deepestPrereq), id]
  }

  return getChain(deepestId)
}