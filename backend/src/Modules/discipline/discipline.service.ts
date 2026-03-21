import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './discipline.entity';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) { }

  async create(data: any): Promise<Discipline> {
    const discipline = this.disciplineRepository.create({ codigo: data.codigo, corequisites: [], course: data.course, creditos: data.creditos, name: data.name, module: data.module, semester: data.semester, prerequisites: []});
    await this.disciplineRepository.save(discipline);
    return discipline
  }

  async findAll(): Promise<Discipline[]> {
    const data = await this.disciplineRepository.find({ relations: ['prerequisites', 'corequisites'] });

    const result: any = []

    for (const discipline of data) {
      result.push(
        {
          "codigo": discipline.codigo,
          "semestre": discipline.semester,
          "periodo": discipline.module,
          "nome": discipline.name,
          "creditos": discipline.creditos,
          "requisitos": discipline.prerequisites.map((value) => value.codigo),
          "correquisitos": discipline.corequisites.map((value) => value.codigo)
        }
      )
    }

    return result
  }

  async addRequisite(data: { requisite: number, codigoDisciplina: number }): Promise<void> {

    const { codigoDisciplina, requisite } = data

    const disciplina = await this.disciplineRepository.findOne({
      where: { codigo: codigoDisciplina },
      relations: ['prerequisites'],
    })

    const disciplinaRequisito = await this.disciplineRepository.findOneBy({ codigo: requisite })

    if (!disciplina) throw new NotFoundException(`Discipline with codigo ${codigoDisciplina} not found`)
    if (!disciplinaRequisito) throw new NotFoundException(`Requisite discipline with codigo ${requisite} not found`)

    const requisites = disciplina.prerequisites || []

    if (disciplinaRequisito) {
      const alreadyHas = requisites.some((d) => d.codigo === disciplinaRequisito.codigo)
      if (!alreadyHas) requisites.push(disciplinaRequisito)
    }

    disciplina.prerequisites = requisites
    await this.disciplineRepository.save(disciplina)
  }

  async addCoRequisite(data: { requisite: number, codigoDisciplina: number }): Promise<void> {

    const { codigoDisciplina, requisite } = data

    const disciplina = await this.disciplineRepository.findOne({
      where: { codigo: codigoDisciplina },
      relations: ['corequisites'],
    })

    const disciplinaRequisito = await this.disciplineRepository.findOneBy({ codigo: requisite })

    if (!disciplina) throw new NotFoundException(`Discipline with codigo ${codigoDisciplina} not found`)
    if (!disciplinaRequisito) throw new NotFoundException(`Corequisite discipline with codigo ${requisite} not found`)

    const requisites = disciplina.corequisites || []

    if (disciplinaRequisito) {
      const alreadyHas = requisites.some((d) => d.codigo === disciplinaRequisito.codigo)
      if (!alreadyHas) requisites.push(disciplinaRequisito)
    }

    disciplina.corequisites = requisites
    await this.disciplineRepository.save(disciplina)
  }

  async findById(id: string): Promise<Discipline> {
    const discipline = await this.disciplineRepository.findOne({
      where: { id },
      relations: ['prerequisites', 'corequisites', 'dependents'],
    });
    if (!discipline) throw new NotFoundException('Discipline not found');
    return discipline;
  }
}
