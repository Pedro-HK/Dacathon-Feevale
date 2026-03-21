import type { TrailProgress } from '../model/useDashboard'

const TRAIL_COLORS: Record<string, string> = {
  developer: 'bg-indigo-500',
  scientist: 'bg-emerald-500',
  analyst:   'bg-amber-500',
  manager:   'bg-gray-400',
}

const TRAIL_DOT: Record<string, string> = {
  developer: 'bg-indigo-500',
  scientist: 'bg-emerald-500',
  analyst:   'bg-amber-500',
  manager:   'bg-gray-400',
}

interface TrailProgressBarProps {
  trails: TrailProgress[]
}

export function TrailProgressBar({ trails }: TrailProgressBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {trails.map((t) => (
        <div key={t.trail} className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${TRAIL_DOT[t.trail]}`} />
          <span className="text-xs text-gray-500 w-24 flex-shrink-0">{t.label}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${TRAIL_COLORS[t.trail]}`}
              style={{ width: `${t.percent}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0">
            {t.percent}%
          </span>
        </div>
      ))}
    </div>
  )
}