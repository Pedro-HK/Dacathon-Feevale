import { Module } from '@nestjs/common';
import { ProgressService } from './ProgressService';
import { CurriculumModule } from '../curriculum/CurriculumModule';
import { UserModule } from '../user/UserModule';
import { ProgressController } from './progress.controller';

@Module({
  imports: [CurriculumModule, UserModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
