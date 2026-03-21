import { Controller, Get } from '@nestjs/common';
import { UserService } from './UserService';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  list(): Promise<number> {
    return this.userService.list();
  }
}
