import { Module } from '@nestjs/common';
import { CourseController } from './CourseController';
import { CourseService } from './CourseService';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
})
export class CourseModule {}
