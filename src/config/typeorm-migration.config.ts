import { DataSource } from "typeorm";
import { config } from 'dotenv';

config();


export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['./dist/src/modules/**/**/repositories/typeorm/entities/*{.ts,.js}'],
  migrations: ['./dist/src/shared/migrations/*{.ts,.js}']
});