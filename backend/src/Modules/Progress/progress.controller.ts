import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../guards/current-user.decorator';
import { ProgressService } from './ProgressService';
import { User } from '../user/User.entity';

interface MarkCompletedDto {
  subjectId: string;
}

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('mark-completed')
  mark(@CurrentUser() user: User, @Body() dto: MarkCompletedDto) {
    return this.progressService.markCompleted(Number(user.id), dto.subjectId);
  }

  @Get()
  completed(@CurrentUser() user: User) {
    return this.progressService.getCompletedIds(Number(user.id));
  }

  @Get('available')
  available(@CurrentUser() user: User) {
    return this.progressService.getAvailable(Number(user.id));
  }

  @Get('stats')
  stats(@CurrentUser() user: User) {
    return this.progressService.getStats(Number(user.id));
  }

  @Get('remaining-time')
  remaining(@CurrentUser() user: User) {
    return this.progressService.getRemainingTime(Number(user.id));
  }
}
