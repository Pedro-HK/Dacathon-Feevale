import { Module } from '@nestjs/common';
import { ProgressController } from './ProgressController';
import { ProgressService } from './ProgressService';
import { UserModule } from '../user/UserModule';
import { DisciplineModule } from '../discipline/discipline.module';

@Module({
  imports: [UserModule, DisciplineModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
