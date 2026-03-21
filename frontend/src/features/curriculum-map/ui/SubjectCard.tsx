import type { Subject } from '@/entities/subject'
import { cn } from '@/shared/lib/cn'

const statusStyles: Record<Subject['status'], string> = {
  completed: 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100',
  available: 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100',
  critical:  'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 ring-2 ring-amber-400 ring-offset-1',
  blocked:   'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
}

const badgeStyles: Record<Subject['status'], string> = {
  completed: 'bg-emerald-100 text-emerald-800',
  available: 'bg-blue-100 text-blue-800',
  critical:  'bg-amber-100 text-amber-800',
  blocked:   'bg-gray-200 text-gray-500',
}

const badgeLabels: Record<Subject['status'], string> = {
  completed: 'concluída',
  available: 'disponível',
  critical:  'crítico',
  blocked:   'bloqueada',
}

interface SubjectCardProps {
  subject: Subject
  onClick: (subject: Subject) => void
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const isBlocked = subject.status === 'blocked'

  return (
    <button
      onClick={() => !isBlocked && onClick(subject)}
      className={cn(
        'w-full text-left border rounded-lg p-2.5 transition-colors relative',
        statusStyles[subject.status]
      )}
    >
      {subject.status === 'completed' && (
        <span className="absolute top-1.5 right-2 text-emerald-600 text-xs">✓</span>
      )}
      <p className="font-mono text-[10px] opacity-60 mb-0.5">{subject.code}</p>
      <p className="text-xs font-medium leading-tight">{subject.name}</p>
      <span className={cn('inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded', badgeStyles[subject.status])}>
        {badgeLabels[subject.status]}
      </span>
    </button>
  )
}