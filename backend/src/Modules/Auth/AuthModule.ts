import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../Guards/jwt.strategy';
import { UserService } from '../User/UserService';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: 'secret' })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService],
})
export class AuthModule {}
