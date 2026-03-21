import type { Subject, Trail } from '@/entities/subject'
import type { SubjectsByTrailAndSemester } from '../model/useCurriculumMap'
import { SubjectCard } from './SubjectCard'

const TRAIL_ORDER: Trail[] = ['developer', 'scientist', 'analyst', 'manager']
const TRAIL_LABELS: Record<Trail, string> = {
  developer: 'Desenvolvedor',
  scientist: 'Cientista',
  analyst:   'Analista',
  manager:   'Gestor',
}
const TRAIL_COLORS: Record<Trail, string> = {
  developer: 'text-indigo-700',
  scientist: 'text-emerald-700',
  analyst:   'text-amber-700',
  manager:   'text-gray-600',
}

interface CourseMapProps {
  subjectsByTrailAndSemester: SubjectsByTrailAndSemester
  totalSemesters: number
  currentSemester?: number
  onSubjectClick: (subject: Subject) => void
}

export function CourseMap({
  subjectsByTrailAndSemester,
  totalSemesters,
  currentSemester,
  onSubjectClick,
}: CourseMapProps) {
  const semesters = Array.from({ length: totalSemesters }, (_, i) => i + 1)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">

        {/* Cabeçalho de semestres */}
        <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="w-24 flex-shrink-0" />
          {semesters.map((sem) => (
            <div
              key={sem}
              className={`w-40 flex-shrink-0 py-2.5 text-center text-xs font-medium border-r border-gray-100
                ${sem === currentSemester ? 'text-indigo-600 bg-indigo-50/40' : 'text-gray-500'}`}
            >
              {sem}º semestre
              {sem === currentSemester && (
                <span className="ml-1 text-[10px] text-indigo-400">← atual</span>
              )}
            </div>
          ))}
        </div>

        {/* Grid de trilhas × semestres */}
        {TRAIL_ORDER.map((trail) => (
          <div key={trail} className="flex border-b border-gray-100">

            {/* Label da trilha */}
            <div className={`w-24 flex-shrink-0 flex items-center justify-end pr-3
              text-xs font-medium border-r border-gray-100 ${TRAIL_COLORS[trail]}`}>
              {TRAIL_LABELS[trail]}
            </div>

            {/* Células por semestre */}
            {semesters.map((sem) => {
              const subjects = subjectsByTrailAndSemester[trail]?.[sem] ?? []
              const isCurrent = sem === currentSemester

              return (
                <div
                  key={sem}
                  className={`w-40 flex-shrink-0 p-2 flex flex-col gap-2 border-r border-gray-100 min-h-[90px]
                    ${isCurrent ? 'bg-indigo-50/20' : ''}`}
                >
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onClick={onSubjectClick}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        ))}

      </div>
    </div>
  )
}