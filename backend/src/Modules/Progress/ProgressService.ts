import { Injectable } from '@nestjs/common';
import { CurriculumService } from '../Curriculum/CurriculumService';
import { UserService } from '../User/UserService';

@Injectable()
export class ProgressService {
  constructor(
    // private prisma: PrismaService,
    private curriculum: CurriculumService,
    private userService: UserService,
  ) {}

  async markCompleted(userId: number, subjectId: string) {
    // return this.prisma.progress.create({
    //   data: { userId, subjectId },
    // });
  }

  async getCompletedIds(userId: number) {
    // const data = await this.prisma.progress.findMany({
    //   where: { userId },
    // });
    // return data.map((d) => d.subjectId);
  }

  async getAvailable(userId: number) {
    // const user = await this.userService.getMe(userId);
    // if (!user) throw new Error('User not found');
    // const completed = await this.getCompletedIds(userId);

    // return this.curriculum.getAvailable(user.curso, completed);
  }

  async getStats(userId: number) {
    // const user = await this.userService.getMe(userId);
    // if (!user) throw new Error('User not found');
    // const subjects = this.curriculum.getSubjects(user.curso);
    // const completed = await this.getCompletedIds(userId);

    // return {
    //   progress: completed.length / subjects.length,
    // };
  }

  // 🔥 RF12 – estimativa real
  async getRemainingTime(userId: number) {
    // const user = await this.userService.getMe(userId);
    // if (!user) throw new Error('User not found');
    // const completed = await this.getCompletedIds(userId);

    // const critical = this.curriculum.getCriticalPath(user.curso);

    // // remove já concluídas
    // const remaining = critical.filter((c) => !completed.includes(c.id));

    // // maior profundidade restante
    // const maxDepth = Math.max(...remaining.map((r) => r.depth));

    // return {
    //   semestersRemaining: maxDepth,
    // };
  }
}
