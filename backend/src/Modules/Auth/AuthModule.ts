import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtStrategy } from '../guards/jwt.strategy';
import { UserModule } from '../user/userModule';
import { User } from '../user/User.entity';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: 'secret' }), UserModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
