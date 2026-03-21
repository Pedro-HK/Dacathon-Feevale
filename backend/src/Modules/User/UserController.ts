import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { CurrentUser } from '../Guards/current-user.decorator';
import { UserService } from './UserService';
import type { Usuario } from '../../generated/client';

interface SelectCourseDto {
  course: string;
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: Usuario) {
    return this.userService.getMe(user.id);
  }

  @Post('select-course')
  selectCourse(@CurrentUser() user: Usuario, @Body() dto: SelectCourseDto) {
    return this.userService.selectCourse(user.id, dto.course);
  }
}
