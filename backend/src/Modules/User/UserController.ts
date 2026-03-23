import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './User.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  list(): Promise<number> {
    return this.userService.list();
  }

  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }
}
