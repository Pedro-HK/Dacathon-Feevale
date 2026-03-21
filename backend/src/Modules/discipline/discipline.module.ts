import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
})
export class DisciplineModule {}
