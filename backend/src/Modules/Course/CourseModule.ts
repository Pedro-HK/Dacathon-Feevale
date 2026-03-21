import { Module } from '@nestjs/common';
import { CourseController } from './CourseController';
import { CourseService } from './CourseService';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
