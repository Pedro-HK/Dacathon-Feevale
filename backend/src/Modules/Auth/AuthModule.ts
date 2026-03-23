import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtStrategy } from '../Guards/jwt.strategy';
import { UserModule } from '../User/UserModule';
import { User } from '../User/User.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET ?? 'secret' }),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
