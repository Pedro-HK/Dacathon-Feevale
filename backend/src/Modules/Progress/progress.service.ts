import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService';
import { DisciplineService } from '../discipline/discipline.service';
import { getProgressPercentage } from '../graph/dag';

@Injectable()
export class ProgressService {
  constructor(
    private userService: UserService,
    private disciplineService: DisciplineService,
  ) {}

  private completedByUser = new Map<number, Set<string>>();

  async markCompleted(userId: number, subjectId: string) {
    const completed = this.completedByUser.get(userId) ?? new Set<string>();
    completed.add(subjectId);
    this.completedByUser.set(userId, completed);
    return { userId, subjectId };
  }

  async getCompletedIds(userId: number) {
    const completed = this.completedByUser.get(userId) ?? new Set<string>();
    return Array.from(completed);
  }

  async getAvailable(userId: number) {
    const completed = await this.getCompletedIds(userId);
    const course = 'cc' as const;
    return this.disciplineService.getAvailable(course, completed);
  }

  async getStats(userId: number) {
    const completed = await this.getCompletedIds(userId);
    const course = 'cc' as const;
    const graph = await this.disciplineService.getCourseGraph(course);
    const total = graph.length;
    const percentage = getProgressPercentage(completed, total);
    return { completed: completed.length, total, percentage };
  }

  async getRemainingTime(userId: number) {
    const completed = await this.getCompletedIds(userId);
    const course = 'cc' as const;
    const criticalPath = await this.disciplineService.getCriticalPath(course);
    const remaining = criticalPath.filter((id: string) => !completed.includes(id));
    return {
      criticalPath,
      remaining,
      semestersRemaining: remaining.length,
    };
  }
}
