import type { Subject } from '@/entities/subject'
import { useCurriculumStore } from '../model/curriculumStore'
import { useProgressStore } from '../model/progressStore'
import { cn } from '@/shared/lib/cn'

const trailLabels: Record<Subject['trail'], string> = {
  developer: 'Desenvolvedor',
  scientist: 'Cientista',
  analyst:   'Analista',
  manager:   'Gestor',
}

interface SubjectModalProps {
  subject: Subject
  allSubjects: Subject[]
}

export function SubjectModal({ subject, allSubjects }: SubjectModalProps) {
  const setSelectedSubject = useCurriculumStore((s) => s.setSelectedSubject)
  const { completedIds, toggleCompleted } = useProgressStore()

  const isCompleted = completedIds.includes(subject.id)
  const subjectMap = new Map(allSubjects.map((s) => [s.id, s]))

  const unlocks = allSubjects.filter((s) =>
    s.prerequisites.includes(subject.id)
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={() => setSelectedSubject(null)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 w-full max-w-sm mx-4 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-base font-medium text-gray-900">{subject.name}</h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {subject.code} · {subject.semester}º sem · {trailLabels[subject.trail]}
            </p>
          </div>
          <button
            onClick={() => setSelectedSubject(null)}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none px-1"
          >
            ✕
          </button>
        </div>

        <hr className="border-gray-100 mb-3" />

        <Section title="Pré-requisitos">
          {subject.prerequisites.length === 0 ? (
            <Chip label="Nenhum" />
          ) : (
            subject.prerequisites.map((id) => {
              const s = subjectMap.get(id)
              const met = completedIds.includes(id)
              return (
                <Chip
                  key={id}
                  label={s ? `${s.code} ${s.name}` : id}
                  variant={met ? 'met' : 'unmet'}
                />
              )
            })
          )}
        </Section>

        <Section title="Correquisitos">
          {subject.corequisites.length === 0 ? (
            <Chip label="Nenhum" />
          ) : (
            subject.corequisites.map((id) => {
              const s = subjectMap.get(id)
              return <Chip key={id} label={s?.name ?? id} />
            })
          )}
        </Section>

        <Section title="Desbloqueia">
          {unlocks.length === 0 ? (
            <Chip label="Nenhuma" />
          ) : (
            unlocks.map((s) => <Chip key={s.id} label={s.name} />)
          )}
        </Section>

        <hr className="border-gray-100 my-3" />

        <button
          onClick={() => toggleCompleted(subject.id)}
          className={cn(
            'w-full py-2.5 rounded-xl text-sm font-medium transition-colors',
            isCompleted
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          )}
        >
          {isCompleted ? 'Remover conclusão' : 'Marcar como cursada'}
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">{title}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function Chip({ label, variant }: { label: string; variant?: 'met' | 'unmet' }) {
  return (
    <span className={cn(
      'text-xs px-2.5 py-1 rounded-full border',
      variant === 'met'   && 'bg-emerald-50 border-emerald-300 text-emerald-800',
      variant === 'unmet' && 'bg-red-50 border-red-300 text-red-700',
      !variant            && 'bg-gray-100 border-gray-200 text-gray-600'
    )}>
      {label}
    </span>
  )
}