import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly usersRepository: Repository<User>) { }

  list(): Promise<number> {
    return this.usersRepository.count()
  }
}
