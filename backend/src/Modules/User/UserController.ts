import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { CurrentUser } from '../Guards/current-user.decorator';
import { UserService } from './UserService';
import { User } from './User.entity';

interface SelectCourseDto {
  course: string;
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  list(): Promise<number> {
    return this.userService.list();
  }
}
