import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { DisciplineModule } from '../discipline/discipline.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), DisciplineModule],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
