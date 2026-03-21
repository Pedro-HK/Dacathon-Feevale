import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from '@/features/progress/model/useDashboard'
import { useProgressStore } from '@/features/curriculum-map/model/progressStore'
import { useCurriculumStore } from '@/features/curriculum-map/model/curriculumStore'
import { useUserStore } from '@/entities/user'
import { MetricCard } from '@/features/progress/ui/MetricCard'
import { TrailProgressBar } from '@/features/progress/ui/TrailProgressBar'
import { CriticalPathSummary } from '@/features/progress/ui/CriticalPathSummary'
import { AvailableSubjectsList } from '@/features/progress/ui/AvailableSubjectsList'
import { curriculumService } from '@/features/curriculum-map/api/curriculumService'

export function DashboardPage() {
  const navigate    = useNavigate()
  const currentUser = useUserStore((s) => s.currentUser)
  const { setCurriculum } = useCurriculumStore()
  const { completedIds }  = useProgressStore()
  const data = useDashboard()

  // carrega o currículo do usuário ao entrar no dashboard
  useEffect(() => {
    if (!currentUser) return
    curriculumService
      .getCurriculum(currentUser.course)
      .then(setCurriculum)
  }, [currentUser])

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Carregando...</p>
      </div>
    )
  }

  const firstName = currentUser?.name?.split(' ')[0] ?? 'Estudante'

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 px-6 h-13 flex items-center justify-between">
        <span className="text-sm font-medium">
          Course<span className="text-indigo-600">Mapper</span>
        </span>
        <nav className="flex items-center gap-1">
          <span className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md">
            Dashboard
          </span>
          <button
            onClick={() => navigate('/mapa-disciplinas')}
            className="px-3 py-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-50"
          >
            Mapa
          </button>
          <div className="ml-2 w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-medium text-indigo-700">
            {currentUser?.name?.slice(0, 2).toUpperCase() ?? '??'}
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Saudação */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-0.5">Bem-vindo de volta</p>
          <h1 className="text-xl font-medium text-gray-900">{firstName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {currentUser?.course === 'CC' ? 'Ciência da Computação' : 'Sistemas de Informação'}
            {' · '}
            {data.currentSemester}º semestre
          </p>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
          <MetricCard
            label="Progresso geral"
            value={`${data.progressPercent}%`}
            sub={`${data.completedCount} de ${data.totalCount} disciplinas`}
            accent="teal"
          />
          <MetricCard
            label="Semestres restantes"
            value={data.semestersRemaining}
            sub="pelo caminho crítico"
            accent="amber"
          />
          <MetricCard
            label="Disponíveis agora"
            value={data.availableSubjects.length}
            sub="para cursar"
            accent="purple"
          />
          <MetricCard
            label="Créditos concluídos"
            value={data.completedCredits}
            sub={`de ${data.totalCredits} totais`}
          />
        </div>

        {/* Progresso geral — barra */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-900">Progresso geral</h2>
            <span className="text-xs text-gray-400">
              {data.completedCount}/{data.totalCount} disciplinas
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${data.progressPercent}%` }}
            />
          </div>
          <h3 className="text-xs font-medium text-gray-500 mb-3">Por trilha</h3>
          <TrailProgressBar trails={data.trailProgress} />
        </div>

        {/* Grid inferior */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Disciplinas disponíveis */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">Disponíveis agora</h2>
              <span className="text-xs text-gray-400">
                {data.availableSubjects.length} disciplinas
              </span>
            </div>
            <AvailableSubjectsList subjects={data.availableSubjects} />
          </div>

          {/* Caminho crítico */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-900">Caminho crítico</h2>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                {data.semestersRemaining} sem. restantes
              </span>
            </div>
            <CriticalPathSummary
              subjects={data.criticalPathSubjects}
              completedIds={completedIds}
            />
          </div>

        </div>

        {/* CTA */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/mapa-disciplinas')}
            className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Abrir mapa de disciplinas →
          </button>
        </div>

      </div>
    </div>
  )
}