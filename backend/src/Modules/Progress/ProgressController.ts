import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../Guards/current-user.decorator';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { User } from '../User/User.entity';
import { ProgressService } from './ProgressService';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async getProgress(@CurrentUser() user: User) {
    const completedIds = await this.progressService.getCompletedIds(user.id);
    return { completedIds };
  }

  @Put(':subjectId')
  async markCompleted(@CurrentUser() user: User, @Param('subjectId') subjectId: string) {
    const completedIds = await this.progressService.markCompleted(user.id, subjectId);
    return { completedIds };
  }

  @Delete(':subjectId')
  async unmarkCompleted(@CurrentUser() user: User, @Param('subjectId') subjectId: string) {
    const completedIds = await this.progressService.unmarkCompleted(user.id, subjectId);
    return { completedIds };
  }
}
