import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { CurrentUser } from '../Guards/current-user.decorator';
import { ProgressService } from './ProgressService';
import type { Usuario } from '../../generated/client';

interface MarkCompletedDto {
  subjectId: string;
}

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('mark-completed')
  mark(@CurrentUser() user: Usuario, @Body() dto: MarkCompletedDto) {
    return this.progressService.markCompleted(user.id, dto.subjectId);
  }

  @Get()
  completed(@CurrentUser() user: Usuario) {
    return this.progressService.getCompletedIds(user.id);
  }

  @Get('available')
  available(@CurrentUser() user: Usuario) {
    return this.progressService.getAvailable(user.id);
  }

  @Get('stats')
  stats(@CurrentUser() user: Usuario) {
    return this.progressService.getStats(user.id);
  }

  @Get('remaining-time')
  remaining(@CurrentUser() user: Usuario) {
    return this.progressService.getRemainingTime(user.id);
  }
}
