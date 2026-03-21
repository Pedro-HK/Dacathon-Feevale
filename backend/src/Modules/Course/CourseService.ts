import { Injectable } from '@nestjs/common';
import courses from '../../data/courses.json';

export interface Subject {
  id: string;
  name: string;
  prerequisites: string[];
}

export interface Course {
  id: string;
  name: string;
  subjects: Subject[];
}

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  getAll(): Course[] {
    return this.courses;
  }

  getById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }
}
