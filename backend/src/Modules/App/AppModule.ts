import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { UserModule } from '../user/userModule';
import { DisciplineModule } from '../discipline/discipline.module';
import { AuthModule } from '../auth/AuthModule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DisciplineModule,
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
