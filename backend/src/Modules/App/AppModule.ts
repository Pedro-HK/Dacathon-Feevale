import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { AuthModule } from '../Auth/AuthModule';
import { UserModule } from '../User/UserModule';
import { CourseModule } from '../Course/CourseModule';
import { CurriculumModule } from '../Curriculum/CurriculumModule';
import { ProgressModule } from '../Progress/ProgressModule';
import { JwtStrategy } from '../Guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.cofig';

@Module({
  imports: [
    // AuthModule,
    UserModule,
    // CourseModule,
    // CurriculumModule,
    // ProgressModule,
    // PassportModule,
    // JwtModule.register({ secret: 'secret' }),
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
