import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtStrategy } from '../guards/jwt.strategy';
import { UserService } from '../user/UserService';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: 'secret' })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
