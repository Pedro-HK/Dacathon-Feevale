import { Module } from '@nestjs/common';
import { CurriculumService } from './CurriculumService';

@Module({
  providers: [CurriculumService],
  exports: [CurriculumService],
})
export class CurriculumModule {}
