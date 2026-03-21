import { useMemo } from 'react'
import { useProgressStore } from '@/features/curriculum-map/model/progressStore'
import { useCurriculumStore } from '@/features/curriculum-map/model/curriculumStore'
import { computeCriticalPath } from '@/features/curriculum-map/lib/criticalPath'
import { computeAvailability } from '@/features/curriculum-map/lib/availabilityCalc'
import type { Subject, Trail } from '@/entities/subject'

export type TrailProgress = {
  trail: Trail
  label: string
  completed: number
  total: number
  percent: number
}

export type DashboardData = {
  // RF11
  completedCount: number
  totalCount: number
  progressPercent: number
  completedCredits: number
  totalCredits: number

  // RF12
  semestersRemaining: number
  currentSemester: number

  // extras
  availableSubjects: Subject[]
  trailProgress: TrailProgress[]
  criticalPathSubjects: Subject[]
}

const TRAIL_LABELS: Record<Trail, string> = {
  developer: 'Desenvolvedor',
  scientist: 'Cientista',
  analyst:   'Analista',
  manager:   'Gestor',
}

export function useDashboard(): DashboardData | null {
  const { curriculum } = useCurriculumStore()
  const { completedIds } = useProgressStore()

  return useMemo(() => {
    if (!curriculum) return null

    const subjects = computeAvailability(curriculum.subjects, completedIds)
    const completedSet = new Set(completedIds)

    // RF11 — progresso geral
    const completedCount  = completedIds.length
    const totalCount      = subjects.length
    const progressPercent = totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0

    // créditos
    const completedCredits = subjects
      .filter((s) => completedSet.has(s.id))
      .reduce((acc, s) => acc + s.credits, 0)
    const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0)

    // semestre atual — maior semestre entre as concluídas, ou 1
    const currentSemester = completedIds.length > 0
      ? Math.max(
          ...subjects
            .filter((s) => completedSet.has(s.id))
            .map((s) => s.semester)
        )
      : 1

    // RF12 — semestres restantes via caminho crítico
    const criticalIds      = computeCriticalPath(subjects)
    const criticalSubjects = criticalIds
      .map((id) => subjects.find((s) => s.id === id))
      .filter((s): s is Subject => s !== undefined)

    const remainingCritical = criticalSubjects.filter(
      (s) => !completedSet.has(s.id)
    )
    const maxRemainingDepth = remainingCritical.length > 0
      ? Math.max(...remainingCritical.map((s) => s.semester))
      : 0
    const semestersRemaining = Math.max(0, maxRemainingDepth - currentSemester)

    // disciplinas disponíveis agora
    const availableSubjects = subjects.filter(
      (s) => s.status === 'available' || s.status === 'critical'
    )

    // progresso por trilha
    const trailMap = new Map<Trail, { completed: number; total: number; credits: number }>()
    subjects.forEach((s) => {
      const entry = trailMap.get(s.trail) ?? { completed: 0, total: 0, credits: 0 }
      entry.total++
      if (completedSet.has(s.id)) entry.completed++
      trailMap.set(s.trail, entry)
    })

    const trailProgress: TrailProgress[] = Array.from(trailMap.entries()).map(
      ([trail, { completed, total }]) => ({
        trail,
        label:   TRAIL_LABELS[trail],
        completed,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      })
    )

    return {
      completedCount,
      totalCount,
      progressPercent,
      completedCredits,
      totalCredits,
      semestersRemaining,
      currentSemester,
      availableSubjects,
      trailProgress,
      criticalPathSubjects: criticalSubjects,
    }
  }, [curriculum, completedIds])
}