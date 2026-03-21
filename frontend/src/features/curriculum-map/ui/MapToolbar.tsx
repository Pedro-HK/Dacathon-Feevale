import type { Course } from '@/entities/curriculum'
import { cn } from '@/shared/lib/cn'

const LEGEND = [
  { color: 'bg-emerald-300', label: 'Concluída' },
  { color: 'bg-blue-300',   label: 'Disponível' },
  { color: 'bg-amber-400',  label: 'Caminho crítico' },
  { color: 'bg-gray-300',   label: 'Bloqueada' },
]

interface MapToolbarProps {
  activeCourse: Course
  onCourseChange: (course: Course) => void
}

export function MapToolbar({ activeCourse, onCourseChange }: MapToolbarProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-gray-100 flex-wrap">
      <div className="flex gap-1.5">
        {(['CC', 'SI'] as Course[]).map((course) => (
          <button
            key={course}
            onClick={() => onCourseChange(course)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
              activeCourse === course
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            )}
          >
            {course}
          </button>
        ))}
      </div>

      <div className="w-px h-4 bg-gray-200" />

      <div className="flex items-center gap-3 ml-auto flex-wrap">
        {LEGEND.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={cn('w-2.5 h-2.5 rounded-sm', color)} />
            <span className="text-[11px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}