import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getMe(userId: number) {
    return this.prisma.usuario.findUnique({ where: { id: userId } });
  }

  selectCourse(userId: number, course: string) {
    return this.prisma.matricula.create({
      data: {
        alunoId: userId,
        cursoId: parseInt(course),
        status: 'matriculado',
      },
    });
  }
}
