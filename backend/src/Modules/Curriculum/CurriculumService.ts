import { Injectable } from '@nestjs/common';
import cursos from '../../data/courses.json';

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
export class CurriculumService {
  private courses: Course[] = [];

  getAll(): Course[] {
    return this.courses;
  }

  getCourse(courseId: string): Course | undefined {
    return this.courses.find((c) => c.id === courseId);
  }

  getSubjects(courseId: string): Subject[] {
    const course = this.getCourse(courseId);
    return course ? course.subjects : [];
  }

  isUnlocked(subject: Subject, completed: string[]): boolean {
    return subject.prerequisites.every((p) => completed.includes(p));
  }

  getAvailable(courseId: string, completed: string[]): Subject[] {
    return this.getSubjects(courseId).filter(
      (s) => !completed.includes(s.id) && this.isUnlocked(s, completed),
    );
  }

  getCriticalPath(courseId: string): { id: string; depth: number }[] {
    const subjects = this.getSubjects(courseId);

    const memo = new Map<string, number>();

    const dfs = (id: string): number => {
      if (memo.has(id)) return memo.get(id)!;

      const subject = subjects.find((s) => s.id === id);
      if (!subject) return 0;

      if (!subject.prerequisites.length) {
        memo.set(id, 1);
        return 1;
      }

      const max = Math.max(...subject.prerequisites.map((p) => dfs(p)));

      memo.set(id, max + 1);
      return max + 1;
    };

    return subjects.map((s) => ({
      id: s.id,
      depth: dfs(s.id),
    }));
  }
}
