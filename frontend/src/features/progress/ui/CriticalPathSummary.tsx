import type { Subject } from '@/entities/subject'
import { cn } from '@/shared/lib/cn'

interface CriticalPathSummaryProps {
  subjects: Subject[]
  completedIds: string[]
}

export function CriticalPathSummary({ subjects, completedIds }: CriticalPathSummaryProps) {
  const completedSet = new Set(completedIds)

  return (
    <div className="flex flex-col gap-1.5">
      {subjects.map((s, i) => {
        const done      = completedSet.has(s.id)
        const isLast    = i === subjects.length - 1

        return (
          <div key={s.id} className="flex items-center gap-2.5">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-medium',
                done
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : s.status === 'critical' || s.status === 'available'
                    ? 'bg-white border-amber-400 text-amber-600'
                    : 'bg-white border-gray-200 text-gray-300'
              )}>
                {done ? '✓' : i + 1}
              </div>
              {!isLast && (
                <div className={cn(
                  'w-px h-4 mt-0.5',
                  done ? 'bg-emerald-300' : 'bg-gray-200'
                )} />
              )}
            </div>
            <div className="pb-1">
              <p className={cn(
                'text-xs font-medium leading-tight',
                done ? 'text-emerald-700 line-through opacity-60' : 'text-gray-700'
              )}>
                {s.name}
              </p>
              <p className="text-[10px] text-gray-400">{s.semester}º semestre</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}