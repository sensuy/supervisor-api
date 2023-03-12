import { DataSource } from "typeorm";
import { config } from 'dotenv';

config();


export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['./dist/modules/**/**/repositories/typeorm/*{.ts,.js}'],
  migrations: ['./dist/shared/migrations/*{.ts,.js}']
});