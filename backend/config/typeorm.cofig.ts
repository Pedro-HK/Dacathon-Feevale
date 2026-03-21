import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const isDev = process.env.NODE_ENV === 'development';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: process.env.DB_SPECIFIC_MIGRATION
    ? [join(__dirname, '..', 'database', 'migrations', process.env.DB_SPECIFIC_MIGRATION)]
    : [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
  synchronize: isDev,
  autoLoadEntities: true,
  ...(process.env.NODE_ENV !== 'development' && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

const configService = new ConfigService();

const dataSourceEntities = isDev
  ? [join(__dirname, '..', '**', '*.entity.ts')]
  : [join(__dirname, '..', '**', '*.entity.js')];

const dataSourceMigrations = isDev
  ? [join(__dirname, '..', 'database', 'migrations', '*.ts')]
  : [join(__dirname, '..', 'database', 'migrations', '*.js')];

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(String(configService.get<number | string>('DB_PORT') || '5432'), 10),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: dataSourceEntities,
  migrations: process.env.DB_SPECIFIC_MIGRATION
    ? [join(__dirname, '..', 'database', 'migrations', process.env.DB_SPECIFIC_MIGRATION)]
    : dataSourceMigrations,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: isDev,
  logging: isDev,
  ...(process.env.NODE_ENV !== 'development' && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;