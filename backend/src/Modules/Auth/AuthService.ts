import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../User/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: dto.email }, { enrollment: dto.enrollment }],
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      name: dto.name,
      enrollment: dto.enrollment,
      email: dto.email,
      course: dto.course,
      password: hash,
    });

    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { enrollment: dto.enrollment },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  generateToken(user: User) {
    const { password, ...safeUser } = user;
    return {
      token: this.jwt.sign({ sub: user.id }),
      user: safeUser,
    };
  }
}
