import { useEffect } from 'react'
import { useCurriculumMap } from '@/features/curriculum-map/model/useCurriculumMap'
import { useCurriculumStore } from '@/features/curriculum-map/model/curriculumStore'
import { CourseMap } from '@/features/curriculum-map/ui/CourseMap'
import { MapToolbar } from '@/features/curriculum-map/ui/MapToolbar'
import { SubjectModal } from '@/features/curriculum-map/ui/SubjectModal'
import { useUserStore } from '@/entities/user'
import { curriculumService } from '@/features/curriculum-map/api/curriculumService'

export default function CurriculumMapPage() {
  const { setCurriculum } = useCurriculumStore()
  const currentUser = useUserStore((s) => s.currentUser)

  const {
    subjects,
    subjectsByTrailAndSemester,
    totalSemesters,
    selectedSubject,
    selectSubject,
    activeCourse,
    setActiveCourse,
  } = useCurriculumMap()

  useEffect(() => {
    curriculumService.getCurriculum(activeCourse).then(setCurriculum)
  }, [activeCourse])

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* Navbar */}
      <header className="flex items-center justify-between px-5 h-13 bg-white border-b border-gray-100">
        <span className="text-sm font-medium">
          Course<span className="text-indigo-600">Mapper</span>
        </span>
        <nav className="flex items-center gap-1">
          <a href="/dashboard" className="px-3 py-1.5 text-xs text-gray-500 rounded-md hover:bg-gray-50">
            Dashboard
          </a>
          <span className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md">
            Mapa
          </span>
          <div className="ml-2 w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-medium text-indigo-700">
            {currentUser?.name?.slice(0, 2).toUpperCase() ?? 'LS'}
          </div>
        </nav>
      </header>

      <MapToolbar activeCourse={activeCourse} onCourseChange={setActiveCourse} />

      <main className="flex-1 overflow-auto">
        {subjects.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Carregando currículo...
          </div>
        ) : (
          <CourseMap
            subjectsByTrailAndSemester={subjectsByTrailAndSemester}
            totalSemesters={totalSemesters}
            currentSemester={currentUser ? 5 : undefined}
            onSubjectClick={selectSubject}
          />
        )}
      </main>

      {selectedSubject && (
        <SubjectModal subject={selectedSubject} allSubjects={subjects} />
      )}

    </div>
  )
}