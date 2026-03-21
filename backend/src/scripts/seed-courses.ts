import { readFileSync } from 'fs';
import { join } from 'path';
import AppDataSource from '../config/typeorm.config';
import { Discipline } from '../Modules/discipline/discipline.entity';

interface CourseRecord {
  codigo: number;
  semestre: number;
  periodo: string;
  nome: string;
  creditos: number;
  requisitos: number[];
  correquisitos: number[];
}

async function run() {
  const jsonPath = join(__dirname, '..', 'data', 'courses.json');
  const raw = readFileSync(jsonPath, 'utf-8');
  const courses: CourseRecord[] = JSON.parse(raw);

  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Discipline);

  console.log(`Seeding ${courses.length} disciplines...`);

  // 1) create base nodes (no relations yet)
  const entityMap = new Map<number, Discipline>();
  for (const item of courses) {
    const course = await repo.findOne({ where: { codigo: item.codigo } });

    const moduleValue = item.periodo; // kept as module
    const courseValue = item.periodo.toLowerCase().includes('cientista') ? 'si' : 'cc';

    const base = course
      ? Object.assign(course, {
          name: item.nome,
          codigo: item.codigo,
          creditos: item.creditos,
          semester: item.semestre,
          module: moduleValue,
          course: courseValue as 'cc' | 'si',
        })
      : repo.create({
          name: item.nome,
          codigo: item.codigo,
          creditos: item.creditos,
          semester: item.semestre,
          module: moduleValue,
          course: courseValue as 'cc' | 'si',
          prerequisites: [],
          corequisites: [],
        });

    const saved = await repo.save(base);
    entityMap.set(item.codigo, saved);
  }

  // 2) wire relations
  for (const item of courses) {
    const discipline = entityMap.get(item.codigo);
    if (!discipline) continue;

    discipline.prerequisites = (item.requisitos || [])
      .map((codigo) => entityMap.get(codigo))
      .filter(Boolean) as Discipline[];

    discipline.corequisites = (item.correquisitos || [])
      .map((codigo) => entityMap.get(codigo))
      .filter(Boolean) as Discipline[];

    await repo.save(discipline);
  }

  console.log('Seeding complete.');
  await AppDataSource.destroy();
}

run().catch((error) => {
  console.error('Seed failed:', error);
  AppDataSource.destroy().catch(() => void 0);
  process.exit(1);
});
