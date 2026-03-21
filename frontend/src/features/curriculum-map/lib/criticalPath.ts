import type { Subject } from '@/entities/subject'

export function computeCriticalPath(subjects: Subject[]): string[] {
  const subjectMap = new Map(subjects.map((s) => [s.id, s]))
  const depths = new Map<string, number>()

  // calcula a profundidade de cada nó recursivamente
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

  // encontra o nó de maior profundidade
  const maxDepth = Math.max(...depths.values())
  const deepestNode = subjects.find((s) => depths.get(s.id) === maxDepth)
  if (!deepestNode) return []

  // sobe a cadeia do nó mais profundo até a raiz
  function getChain(id: string): string[] {
    const subject = subjectMap.get(id)
    if (!subject || subject.prerequisites.length === 0) return [id]

    // entre os pré-requisitos, segue o de maior profundidade
    const deepestPrereq = subject.prerequisites.reduce((a, b) =>
      (depths.get(a) ?? 0) >= (depths.get(b) ?? 0) ? a : b
    )

    return [...getChain(deepestPrereq), id]
  }

  return getChain(deepestNode.id)
}