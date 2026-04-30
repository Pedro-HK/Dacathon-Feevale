import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './ProgressController';
import { ProgressService } from './ProgressService';
import { User } from '../User/User.entity';
import { Discipline } from '../discipline/discipline.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Discipline])],
    controllers: [ProgressController],
    providers: [ProgressService],
    exports: [ProgressService],
})
export class ProgressModule {}