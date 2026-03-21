import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  autoLoadEntities: true,
  synchronize: true
};

const configService = new ConfigService();

const dataSourceEntities =[join(__dirname, '..', '**', '*.entity.ts')]

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(String(configService.get<number | string>('DB_PORT') || '5432'), 10),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: dataSourceEntities,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: true
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;