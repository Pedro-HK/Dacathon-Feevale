import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/User.entity';

@Injectable()
export class AuthService {
  constructor(
    // private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // const hash = await bcrypt.hash(dto.senha, 10);

    // const user = await this.prisma.usuario.create({
    //   data: { ...dto, senha: hash },
    // });

    // return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    // const user = await this.prisma.usuario.findUnique({
    //   where: { email: dto.email },
    // });

    // if (!user || !(await bcrypt.compare(dto.senha, user.senha))) {
    //   throw new UnauthorizedException();
    // }

    // return this.generateToken(user);
  }

  generateToken(user: User) {
    return {
      access_token: this.jwt.sign({ sub: user.id }),
    };
  }
}
