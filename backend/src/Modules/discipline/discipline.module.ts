import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';
import { DisciplineService } from './discipline.service';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
})
export class DisciplineModule {}
