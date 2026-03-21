export type SubjectStatus = 'blocked' | 'available' | 'critical' | 'completed'

export type Trail = 'developer' | 'scientist' | 'analyst' | 'manager'

export interface Subject {
  id: string
  code: string
  name: string
  semester: number
  trail: Trail
  credits: number
  prerequisites: string[]
  corequisites: string[]
  status: SubjectStatus
}

// Formato bruto do JSON
export interface RawSubject {
  codigo: number
  semestre: number
  periodo: string
  nome: string
  creditos: number
  requisitos: number[]
  correquisitos: number[]
}

const TRAIL_MAP: Record<string, Trail> = {
  desenvolvedor: 'developer',
  analista:      'analyst',
  gestor:        'manager',
  cientista:     'scientist',
}

export function fromRaw(raw: RawSubject): Subject {
  return {
    id:            String(raw.codigo),
    code:          String(raw.codigo),
    name:          raw.nome,
    semester:      raw.semestre,
    trail:         TRAIL_MAP[raw.periodo.toLowerCase()] ?? 'developer',
    credits:       raw.creditos,
    prerequisites: raw.requisitos.map(String),
    corequisites:  raw.correquisitos.map(String),
    status:        'blocked',
  }
}

export function fromRawList(raws: RawSubject[]): Subject[] {
  return raws.map(fromRaw)
}
//Agora coloca o JSON dentro do projeto em `src/shared/data/`: