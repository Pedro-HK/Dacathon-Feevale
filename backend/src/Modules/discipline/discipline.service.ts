import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './discipline.entity';
import { DagNode, getAvailableDisciplines, getCriticalPath } from '../graph/dag';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  async create(data: Partial<Discipline>): Promise<Discipline> {
    const discipline = this.disciplineRepository.create(data);
    return this.disciplineRepository.save(discipline);
  }

  async findAll(): Promise<Discipline[]> {
    return this.disciplineRepository.find({ relations: ['prerequisites', 'corequisites'] });
  }

  async findById(id: string): Promise<Discipline> {
    const discipline = await this.disciplineRepository.findOne({
      where: { id },
      relations: ['prerequisites', 'corequisites', 'dependents'],
    });
    if (!discipline) throw new NotFoundException('Discipline not found');
    return discipline;
  }

  async getCourseGraph(course: 'cc' | 'si'): Promise<DagNode<string>[]> {
    const disciplines = await this.disciplineRepository.find({
      where: { course },
      relations: ['prerequisites'],
    });
    return disciplines.map((discipline) => ({
      id: discipline.id,
      dependencies: discipline.prerequisites?.map((p) => p.id) ?? [],
    }));
  }

  async getAvailable(course: 'cc' | 'si', completedIds: string[]): Promise<string[]> {
    const graph = await this.getCourseGraph(course);
    return getAvailableDisciplines(completedIds, graph);
  }

  async getCriticalPath(course: 'cc' | 'si'): Promise<string[]> {
    const graph = await this.getCourseGraph(course);
    return getCriticalPath(graph);
  }
}
