import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { UserModule } from '../User/UserModule';
import { DisciplineModule } from '../discipline/discipline.module';
import { AuthModule } from '../Auth/AuthModule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';
import { ProgressModule } from '../Progress/ProgressModule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DisciplineModule,
    ProgressModule,
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
