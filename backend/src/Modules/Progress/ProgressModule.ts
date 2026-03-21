import { Module } from '@nestjs/common';
import { ProgressController } from './ProgressController';
import { ProgressService } from './ProgressService';
import { PrismaService } from '../prisma.service';
import { CurriculumModule } from '../Curriculum/CurriculumModule';
import { UserModule } from '../User/UserModule';

@Module({
  imports: [CurriculumModule, UserModule],
  controllers: [ProgressController],
  providers: [ProgressService, PrismaService],
})
export class ProgressModule {}
