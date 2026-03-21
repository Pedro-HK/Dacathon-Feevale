import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { DisciplineService } from '../discipline/discipline.service';
import { DagNode } from '../graph/dag';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private disciplineService: DisciplineService,
  ) {}

  async create(data: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(data);
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findByCode(code: 'cc' | 'si'): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { code } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async getGraphNodes(code: 'cc' | 'si'): Promise<DagNode<string>[]> {
    return this.disciplineService.getCourseGraph(code);
  }
}
