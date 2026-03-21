import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './CourseService';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.courseService.getById(id);
  }
}
