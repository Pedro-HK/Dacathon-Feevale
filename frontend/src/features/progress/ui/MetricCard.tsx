import { cn } from '@/shared/lib/cn'

interface MetricCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'teal' | 'amber' | 'purple' | 'default'
}

const accentStyles = {
  teal:    'text-emerald-700',
  amber:   'text-amber-700',
  purple:  'text-indigo-700',
  default: 'text-gray-900',
}

export function MetricCard({ label, value, sub, accent = 'default' }: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1.5">{label}</p>
      <p className={cn('text-2xl font-medium', accentStyles[accent])}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}