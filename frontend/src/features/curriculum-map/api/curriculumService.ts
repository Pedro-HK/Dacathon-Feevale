import type { Curriculum, Course } from '@/entities/curriculum'
import { fromRawList, type RawSubject } from '@/entities/subject'
import siData from '@/shared/data/sistemas-de-informação.json'

// Quando o backend estiver pronto, apaga esse mock
// e descomenta a versão com httpClient abaixo
const MOCK_DATA: Record<string, RawSubject[]> = {
  SI: siData as RawSubject[],
  CC: siData as RawSubject[], // trocar pelo JSON de CC quando tiver
}

export const curriculumService = {
  getCurriculum: async (course: Course): Promise<Curriculum> => {
    // --- versão mock (JSON local) ---
    await new Promise((r) => setTimeout(r, 150)) // simula latência
    return {
      id:       course,
      name:     course === 'SI' ? 'Sistemas de Informação' : 'Ciência da Computação',
      course,
      subjects: fromRawList(MOCK_DATA[course]),
    }

    // --- versão real (descomentar quando backend estiver pronto) ---
    // const { data } = await httpClient.get<RawSubject[]>(`/curricula/${course}`)
    // return { id: course, name: ..., course, subjects: fromRawList(data) }
  },
}