import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { UserModule } from '../user/UserModule';
import { DisciplineModule } from '../discipline/discipline.module';
import { CourseModule } from '../course/course.module';
import { ProgressModule } from '../progress/progress.module';
import { JwtStrategy } from '../guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [
    // AuthModule,
    UserModule,
    // DisciplineModule,
    // CourseModule,
    // ProgressModule,
    // PassportModule,
    // JwtModule.register({ secret: 'secret' }),
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
