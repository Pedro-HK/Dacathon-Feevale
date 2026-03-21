import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { Discipline } from './discipline.entity';

@Controller('disciplines')
export class DisciplineController {
  constructor(private disciplineService: DisciplineService) {}

  @Post('')
  async createDiscipline(@Body() data: Partial<Discipline>): Promise<Discipline> {
    return this.disciplineService.create(data)
  }

  @Patch('')
  async addRequisite(@Body() data: {requisite: number, codigoDisciplina: number}): Promise<void> {
    return this.disciplineService.addRequisite(data)
  }

  @Get()
  async getAll() {
    return this.disciplineService.findAll();
  }
}
