import { Controller, Get, Query } from '@nestjs/common';
import { DisciplineService } from './discipline.service';

@Controller('disciplines')
export class DisciplineController {
  constructor(private disciplineService: DisciplineService) {}

  @Get('available')
  async getAvailable(
    @Query('course') course: 'cc' | 'si' = 'cc',
    @Query('completed') completed: string = '',
  ) {
    const completedIds = completed ? completed.split(',').filter(Boolean) : [];
    return this.disciplineService.getAvailable(course, completedIds);
  }

  @Get('critical-path')
  async getCriticalPath(@Query('course') course: 'cc' | 'si' = 'cc') {
    return this.disciplineService.getCriticalPath(course);
  }

  @Get()
  async getAll() {
    return this.disciplineService.findAll();
  }
}
