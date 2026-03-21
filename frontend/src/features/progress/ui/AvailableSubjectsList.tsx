import type { Subject } from '@/entities/subject'
import { cn } from '@/shared/lib/cn'

const TRAIL_LABELS: Record<string, string> = {
  developer: 'Desenvolvedor',
  scientist: 'Cientista',
  analyst:   'Analista',
  manager:   'Gestor',
}

const TRAIL_PILL: Record<string, string> = {
  developer: 'bg-indigo-50 text-indigo-700',
  scientist: 'bg-emerald-50 text-emerald-700',
  analyst:   'bg-amber-50 text-amber-700',
  manager:   'bg-gray-100 text-gray-600',
}

interface AvailableSubjectsListProps {
  subjects: Subject[]
}

export function AvailableSubjectsList({ subjects }: AvailableSubjectsListProps) {
  if (subjects.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        Nenhuma disciplina disponível no momento
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {subjects.map((s) => (
        <div
          key={s.id}
          className={cn(
            'p-2.5 rounded-lg border',
            s.status === 'critical'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-gray-100'
          )}
        >
          <p className="font-mono text-[10px] text-gray-400 mb-0.5">{s.code}</p>
          <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-2">{s.name}</p>
          <span className={cn(
            'inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded font-medium',
            TRAIL_PILL[s.trail]
          )}>
            {TRAIL_LABELS[s.trail]}
          </span>
        </div>
      ))}
    </div>
  )
}